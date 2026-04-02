// Utility functions – no DOM or API dependencies

function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
}

function extractRepoInfo(input) {
    if (!input || input.trim() === '') {
        throw new Error('Digite um repositório GitHub');
    }

    let repo = input.trim();

    if (repo.endsWith('/')) repo = repo.slice(0, -1);

    if (repo.includes('github.com/')) {
        const match = repo.match(/github\.com\/([^\/]+\/[^\/\?#]+)/);
        if (match && match[1]) {
            repo = match[1].replace(/\.git$/, '');
        } else {
            throw new Error('URL do GitHub inválida');
        }
    }

    if (!repo.includes('/')) {
        throw new Error('Use: usuário/repositório');
    }

    repo = repo.split('@')[0].split(':')[0];

    const parts = repo.split('/');
    if (parts.length !== 2) {
        throw new Error('Formato inválido');
    }

    const owner = parts[0].trim();
    const repoName = parts[1].trim();

    if (!owner || !repoName) {
        throw new Error('Usuário/repositório não podem estar vazios');
    }

    return { owner, repo: repoName, fullName: owner + '/' + repoName };
}

function findSimilarRepoNames(input, repoList) {
    input = input.toLowerCase();
    const suggestions = [];

    for (const repo of repoList) {
        const repoLower = repo.toLowerCase();
        if (repoLower.includes(input) || input.includes(repoLower)) {
            suggestions.push(repo);
            continue;
        }

        if (Math.abs(repoLower.length - input.length) <= 2) {
            let diff = 0;
            const maxLen = Math.max(repoLower.length, input.length);
            for (let i = 0; i < maxLen; i++) {
                if (repoLower[i] !== input[i]) diff++;
                if (diff > 2) break;
            }
            if (diff <= 2) suggestions.push(repo);
        }
    }

    return suggestions.slice(0, 3);
}

function convertToCSV(treeData) {
    if (!treeData.tree) return '';

    const headers = ['path', 'type', 'size', 'sha'];
    const rows = treeData.tree.map(item => [
        `"${item.path}"`,
        item.type,
        item.size || 0,
        `"${item.sha || ''}"`
    ]);

    return [headers.join(',')].concat(rows.map(row => row.join(','))).join('\n');
}
