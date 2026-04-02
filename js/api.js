// GitHub API functions – fetch repo data and tree structure

async function fetchGitHubRepo(owner, repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
        });

        if (response.status === 404) throw new Error('Repositório não encontrado (404)');
        if (response.status === 403) {
            const rateLimit = response.headers.get('X-RateLimit-Remaining');
            if (rateLimit === '0') throw new Error('Limite de requisições excedido');
            throw new Error('Acesso não autorizado (403)');
        }
        if (response.status === 401) throw new Error('Repositório pode ser privado');
        if (!response.ok) throw new Error(`Erro ${response.status}`);

        const data = await response.json();
        if (!data.name || !data.owner) throw new Error('Resposta inválida');

        return {
            name: data.name,
            full_name: data.full_name,
            description: data.description || 'Sem descrição',
            stars: data.stargazers_count || 0,
            forks: data.forks_count || 0,
            watchers: data.watchers_count || 0,
            default_branch: data.default_branch || 'main',
            size: data.size || 0,
            owner: { login: data.owner.login, avatar_url: data.owner.avatar_url }
        };
    } catch (error) {
        throw error;
    }
}

async function fetchCompleteTree(owner, repo, branch) {
    try {
        const commitsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${branch}`);
        if (!commitsResponse.ok) throw new Error('Erro ao buscar commits');

        const commitData = await commitsResponse.json();
        const treeSha = commitData.commit.tree.sha;

        const treeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`);

        if (!treeResponse.ok) {
            const simpleResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSha}`);
            if (!simpleResponse.ok) throw new Error('Não foi possível obter a estrutura');
            return await simpleResponse.json();
        }

        const treeData = await treeResponse.json();
        if (treeData.truncated) {
            showStatus(t('statusTruncated'), 'warning');
        }

        return treeData;
    } catch (error) {
        throw error;
    }
}

function updateRepoInfo(repoData) {
    const title = document.getElementById('repoTitle');
    const description = document.getElementById('repoDescription');
    const stats = document.getElementById('repoStats');

    if (title) title.textContent = repoData.full_name;
    if (description) description.textContent = repoData.description;

    if (stats) {
        stats.innerHTML = '';
        const statDefs = [
            { icon: 'fa-star',        value: formatNumber(repoData.stars) },
            { icon: 'fa-code-branch', value: formatNumber(repoData.forks) },
            { icon: 'fa-eye',         value: formatNumber(repoData.watchers) }
        ];
        statDefs.forEach(function (def) {
            const span = document.createElement('span');
            span.className = 'stat-item';
            const icon = document.createElement('i');
            icon.className = 'fas ' + def.icon;
            span.appendChild(icon);
            span.appendChild(document.createTextNode(' ' + def.value));
            stats.appendChild(span);
        });
    }
}

async function tryCorrectRepoName(owner, repo) {
    const commonErrors = {
        'geocsvps': 'geocsv',
        'geocsvs': 'geocsv',
        'geoscv': 'geocsv',
        'geosvc': 'geocsv'
    };

    if (commonErrors[repo.toLowerCase()]) {
        return commonErrors[repo.toLowerCase()];
    }

    try {
        const response = await fetch(`https://api.github.com/users/${owner}/repos?per_page=100`);
        if (response.ok) {
            const repos = await response.json();
            const repoNames = repos.map(r => r.name);
            const suggestions = findSimilarRepoNames(repo, repoNames);
            if (suggestions.length > 0) return suggestions[0];
        }
    } catch (error) {
        console.warn('Não foi possível buscar repositórios:', error);
    }

    return null;
}

async function analyzeRepository() {
    const repoInput = document.getElementById('repoInput');
    const inputValue = repoInput.value.trim();

    if (!inputValue) {
        showStatus(t('statusDefault'), 'error');
        return;
    }

    showLoading(true);
    showStatus(t('statusAnalyzing'), 'info');

    if (typeof window.showSkeletonLoader === 'function') {
        window.showSkeletonLoader();
    }

    try {
        let repoInfo;
        try {
            repoInfo = extractRepoInfo(inputValue);
        } catch (error) {
            showStatus(error.message, 'error');
            showLoading(false);
            if (typeof window.hideSkeletonLoader === 'function') {
                window.hideSkeletonLoader();
            }
            return;
        }

        localStorage.setItem('last-repo', inputValue);

        if (repoInfo.repo === 'geocsvps' && repoInfo.owner === 'JoaoClaudiano') {
            const corrected = await tryCorrectRepoName(repoInfo.owner, repoInfo.repo);
            if (corrected) {
                showStatus(`${t('statusCorrecting')} ${corrected}`, 'info');
                repoInfo.repo = corrected;
                repoInfo.fullName = `${repoInfo.owner}/${corrected}`;
                repoInput.value = repoInfo.fullName;
            }
        }

        showStatus(`${t('statusFetching')} ${repoInfo.fullName}...`, 'info');

        const repoData = await fetchGitHubRepo(repoInfo.owner, repoInfo.repo);
        if (!repoData) {
            throw new Error('Repositório não encontrado');
        }

        updateRepoInfo(repoData);
        showStatus(t('statusLoading'), 'info');

        const treeData = await fetchCompleteTree(repoInfo.owner, repoInfo.repo, repoData.default_branch);
        if (!treeData?.tree?.length) {
            throw new Error('Não foi possível obter a estrutura');
        }

        showStatus(t('statusProcessingItems').replace('{n}', treeData.tree.length), 'info');

        if (typeof window.hideSkeletonLoader === 'function') {
            window.hideSkeletonLoader();
        }

        renderTree(treeData);
        updateMetrics(treeData);
        updateCacheStatus();

        if (window.GitTree2026) {
            window.GitTree2026.treeData = window.currentTreeData;
        }

        showStatus(t('statusSuccess'), 'success');

    } catch (error) {
        console.error('Erro:', error);

        if (typeof window.hideSkeletonLoader === 'function') {
            window.hideSkeletonLoader();
        }

        if (error.message.includes('404') || error.message.includes('não encontrado')) {
            showStatus(t('statusNotFound'), 'error');
            if (repoInput.value.includes('geocsvps')) {
                setTimeout(() => {
                    showStatus('Tente: JoaoClaudiano/geocsv', 'info');
                }, 2000);
            }
        } else if (error.message.includes('403') || error.message.includes('Limite')) {
            showStatus(t('statusRateLimit'), 'error');
        } else {
            showStatus(`${t('statusError')}: ${error.message}`, 'error');
        }
    } finally {
        showLoading(false);
    }
}
