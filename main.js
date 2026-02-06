// GitTree v1.0 - Visualizador de Estrutura GitHub
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌳 GitTree v1.0 inicializando...');
    initApp();
});

function initApp() {
    initTheme();
    initViews();
    initControls();
    initCache();
    loadDefaultRepo();
    
    console.log('✅ GitTree v1.0 inicializado');
}

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('gittree-theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        updateThemeIcon(true);
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        localStorage.setItem('gittree-theme', isLight ? 'light' : 'dark');
        updateThemeIcon(isLight);
    });
}

function updateThemeIcon(isLight) {
    const icon = document.querySelector('#themeToggle i');
    if (isLight) {
        icon.className = 'fas fa-sun';
        themeToggle.title = 'Alternar para tema escuro';
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.title = 'Alternar para tema claro';
    }
}

function initViews() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const viewSections = document.querySelectorAll('.view-section');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.dataset.view;
            
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            viewSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${view}View`) {
                    section.classList.add('active');
                }
            });
            
            if (view === 'metrics') {
                updateMetricsDisplay();
            }
        });
    });
}

function initControls() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const repoInput = document.getElementById('repoInput');
    const pasteBtn = document.getElementById('pasteBtn');
    const clearCacheBtn = document.getElementById('clearCacheBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const expandAllBtn = document.getElementById('expandAllBtn');
    const collapseAllBtn = document.getElementById('collapseAllBtn');
    const treeSearch = document.getElementById('treeSearch');
    const exportJSONBtn = document.getElementById('exportJSONBtn');
    const exportCSVBtn = document.getElementById('exportCSVBtn');
    const copyTreeBtn = document.getElementById('copyTreeBtn');
    
    if (analyzeBtn && repoInput) {
        analyzeBtn.addEventListener('click', analyzeRepository);
        repoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') analyzeRepository();
        });
    }
    
    if (pasteBtn && repoInput) {
        pasteBtn.addEventListener('click', async () => {
            try {
                const text = await navigator.clipboard.readText();
                if (text) {
                    repoInput.value = text;
                    showStatus('Link colado!', 'success');
                    repoInput.focus();
                }
            } catch (err) {
                console.error('Falha ao colar:', err);
                showStatus('Não foi possível acessar a área de transferência', 'error');
            }
        });
    }
    
    if (clearCacheBtn) {
        clearCacheBtn.addEventListener('click', () => {
            if (confirm('Limpar todo o cache?')) {
                localStorage.clear();
                updateCacheStatus();
                showStatus('Cache limpo com sucesso!', 'success');
            }
        });
    }
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', analyzeRepository);
    }
    
    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', () => expandAllTreeNodes(true));
    }
    
    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', () => expandAllTreeNodes(false));
    }
    
    if (treeSearch) {
        treeSearch.addEventListener('input', (e) => {
            searchTree(e.target.value);
        });
    }
    
    if (exportJSONBtn) {
        exportJSONBtn.addEventListener('click', () => {
            exportData('json');
        });
    }
    
    if (exportCSVBtn) {
        exportCSVBtn.addEventListener('click', () => {
            exportData('csv');
        });
    }
    
    if (copyTreeBtn) {
        copyTreeBtn.addEventListener('click', copyTreeAsText);
    }
    
    addPopularRepoSuggestions();
}

function copyTreeAsText() {
    const treeContainer = document.getElementById('treeContainer');
    if (!treeContainer) {
        showStatus('Nenhuma árvore para copiar', 'warning');
        return;
    }
    
    // Função recursiva para coletar a estrutura
    function collectTreeNodes(node, depth = 0, lines = []) {
        const children = node.querySelector('.tree-node-children');
        const header = node.querySelector('.tree-node-header');
        
        if (header) {
            const icon = header.querySelector('.tree-icon');
            const nameElem = header.querySelector('.tree-name');
            const isFolder = header.classList.contains('folder');
            const isExpanded = icon && icon.classList.contains('expanded');
            
            if (nameElem) {
                const prefix = depth === 0 ? '' : '  '.repeat(depth - 1) + (children ? '├── ' : '└── ');
                const name = nameElem.textContent;
                const suffix = isFolder ? '/' : '';
                lines.push(prefix + name + suffix);
            }
        }
        
        // Se for pasta expandida, processa filhos
        if (children && children.dataset.expanded === 'true') {
            const childNodes = children.querySelectorAll(':scope > .tree-node');
            childNodes.forEach(child => collectTreeNodes(child, depth + 1, lines));
        }
        
        return lines;
    }
    
    // Coletar todas as linhas - apenas nós de nível superior
    const allNodes = treeContainer.querySelectorAll(':scope > .tree-node');
    let allLines = [];
    
    allNodes.forEach(node => {
        allLines = collectTreeNodes(node, 0, allLines);
    });
    
    if (allLines.length === 0) {
        showStatus('Árvore vazia', 'warning');
        return;
    }
    
    // Copiar para clipboard
    const textToCopy = allLines.join('\n');
    navigator.clipboard.writeText(textToCopy)
        .then(() => showStatus('Estrutura copiada como texto!', 'success'))
        .catch(err => {
            console.error('Erro ao copiar:', err);
            showStatus('Erro ao copiar', 'error');
        });
}

function addPopularRepoSuggestions() {
    const input = document.getElementById('repoInput');
    if (!input) return;
    
    const datalist = document.createElement('datalist');
    datalist.id = 'repoSuggestions';
    
    const popularRepos = [
        'facebook/react',
        'vuejs/vue',
        'angular/angular',
        'sveltejs/svelte',
        'nodejs/node',
        'microsoft/vscode',
        'torvalds/linux',
        'python/cpython',
        'tensorflow/tensorflow',
        'pytorch/pytorch',
        'JoaoClaudiano/geocsv'
    ];
    
    popularRepos.forEach(repo => {
        const option = document.createElement('option');
        option.value = repo;
        datalist.appendChild(option);
    });
    
    input.setAttribute('list', 'repoSuggestions');
    document.body.appendChild(datalist);
}

function initCache() {
    updateCacheStatus();
}

function updateCacheStatus() {
    const cacheStatus = document.getElementById('cacheStatus');
    if (!cacheStatus) return;
    
    let totalSize = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        totalSize += key.length + value.length;
    }
    
    const sizeKB = Math.round(totalSize / 1024);
    cacheStatus.innerHTML = `<i class="fas fa-database"></i> Cache: ${sizeKB}KB`;
}

function loadDefaultRepo() {
    const lastRepo = localStorage.getItem('last-repo');
    if (lastRepo) {
        document.getElementById('repoInput').value = lastRepo;
    }
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

async function analyzeRepository() {
    const repoInput = document.getElementById('repoInput');
    const inputValue = repoInput.value.trim();
    
    if (!inputValue) {
        showStatus('Digite um repositório GitHub', 'error');
        return;
    }
    
    showLoading(true);
    showStatus('Processando...', 'info');
    
    try {
        let repoInfo;
        try {
            repoInfo = extractRepoInfo(inputValue);
        } catch (error) {
            showStatus(error.message, 'error');
            showLoading(false);
            return;
        }
        
        localStorage.setItem('last-repo', inputValue);
        
        if (repoInfo.repo === 'geocsvps' && repoInfo.owner === 'JoaoClaudiano') {
            const corrected = await tryCorrectRepoName(repoInfo.owner, repoInfo.repo);
            if (corrected) {
                showStatus(`Corrigindo para: ${corrected}`, 'info');
                repoInfo.repo = corrected;
                repoInfo.fullName = `${repoInfo.owner}/${corrected}`;
                repoInput.value = repoInfo.fullName;
            }
        }
        
        showStatus(`Buscando ${repoInfo.fullName}...`, 'info');
        
        const repoData = await fetchGitHubRepo(repoInfo.owner, repoInfo.repo);
        if (!repoData) {
            throw new Error('Repositório não encontrado');
        }
        
        updateRepoInfo(repoData);
        showStatus('Obtendo estrutura...', 'info');
        
        const treeData = await fetchCompleteTree(repoInfo.owner, repoInfo.repo, repoData.default_branch);
        if (!treeData?.tree?.length) {
            throw new Error('Não foi possível obter a estrutura');
        }
        
        showStatus(`Processando ${treeData.tree.length} itens...`, 'info');
        
        renderTree(treeData);
        updateMetrics(treeData);
        updateCacheStatus();
        
        showStatus('Estrutura carregada!', 'success');
        
    } catch (error) {
        console.error('Erro:', error);
        
        if (error.message.includes('404') || error.message.includes('não encontrado')) {
            showStatus('Repositório não encontrado', 'error');
            if (repoInput.value.includes('geocsvps')) {
                setTimeout(() => {
                    showStatus('Tente: JoaoClaudiano/geocsv', 'info');
                }, 2000);
            }
        } else if (error.message.includes('403') || error.message.includes('Limite')) {
            showStatus('Limite de requisições excedido', 'error');
        } else {
            showStatus(`Erro: ${error.message}`, 'error');
        }
    } finally {
        showLoading(false);
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
            showStatus('Repositório muito grande. Estrutura pode estar incompleta.', 'warning');
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
        stats.innerHTML = `
            <span class="stat-item"><i class="fas fa-star"></i> ${formatNumber(repoData.stars)}</span>
            <span class="stat-item"><i class="fas fa-code-branch"></i> ${formatNumber(repoData.forks)}</span>
            <span class="stat-item"><i class="fas fa-eye"></i> ${formatNumber(repoData.watchers)}</span>
        `;
    }
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
}

function renderTree(treeData) {
    const treeContainer = document.getElementById('treeContainer');
    if (!treeContainer || !treeData.tree) return;
    
    const root = buildFileTree(treeData.tree);
    treeContainer.innerHTML = '';
    renderTreeNode(treeContainer, root);
    
    setTimeout(() => {
        attachTreeEvents();
        expandFirstLevel();
    }, 100);
}

function buildFileTree(files) {
    const root = { name: '/', type: 'folder', children: [], path: '' };
    const nodeMap = new Map();
    nodeMap.set('', root);
    
    files.forEach(item => {
        const pathParts = item.path.split('/');
        let currentPath = '';
        
        for (let i = 0; i < pathParts.length; i++) {
            const part = pathParts[i];
            const path = pathParts.slice(0, i + 1).join('/');
            const parentPath = pathParts.slice(0, i).join('/');
            
            if (!nodeMap.has(path)) {
                const isLast = i === pathParts.length - 1;
                const node = {
                    name: part,
                    type: isLast ? (item.type === 'blob' ? 'file' : 'folder') : 'folder',
                    children: [],
                    path: path,
                    size: isLast ? (item.size || 0) : 0,
                    sha: isLast ? (item.sha || '') : ''
                };
                
                nodeMap.set(path, node);
                const parent = nodeMap.get(parentPath);
                if (parent) parent.children.push(node);
            }
        }
    });
    
    nodeMap.forEach(node => {
        if (node.children.length > 0) {
            node.children.sort((a, b) => {
                if (a.type === 'folder' && b.type !== 'folder') return -1;
                if (a.type !== 'folder' && b.type === 'folder') return 1;
                return a.name.localeCompare(b.name);
            });
        }
    });
    
    return root;
}

function renderTreeNode(container, node, depth = 0) {
    if (!node || depth > 10) return;
    
    const isFolder = node.type === 'folder';
    const hasChildren = node.children && node.children.length > 0;
    
    const nodeElement = document.createElement('div');
    nodeElement.className = 'tree-node';
    nodeElement.dataset.path = node.path;
    
    const header = document.createElement('div');
    header.className = `tree-node-header ${node.type}`;
    header.title = node.path || node.name;
    
    const icon = document.createElement('i');
    icon.className = `tree-icon fas ${isFolder ? 'fa-folder' : 'fa-file'}`;
    if (isFolder && hasChildren) icon.classList.add('collapsed');
    
    const name = document.createElement('span');
    name.className = 'tree-name';
    name.textContent = node.name;
    
    const badge = document.createElement('span');
    badge.className = 'tree-badge';
    badge.textContent = isFolder ? 'pasta' : 'arquivo';
    
    if (isFolder && hasChildren) {
        const count = document.createElement('span');
        count.className = 'tree-count';
        count.textContent = `(${node.children.length})`;
        header.appendChild(count);
    }
    
    if (!isFolder && node.size > 0) {
        const size = document.createElement('span');
        size.className = 'tree-size';
        size.textContent = formatBytes(node.size);
        header.appendChild(size);
    }
    
    header.appendChild(icon);
    header.appendChild(name);
    header.appendChild(badge);
    nodeElement.appendChild(header);
    
    if (isFolder && hasChildren) {
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'tree-node-children';
        childrenContainer.dataset.expanded = 'false';
        
        node.children.forEach(child => {
            renderTreeNode(childrenContainer, child, depth + 1);
        });
        
        nodeElement.appendChild(childrenContainer);
    }
    
    container.appendChild(nodeElement);
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function attachTreeEvents() {
    document.querySelectorAll('.tree-node-header.folder').forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            const node = header.closest('.tree-node');
            const children = node.querySelector('.tree-node-children');
            const icon = header.querySelector('.tree-icon');
            
            if (children) {
                const isExpanded = children.dataset.expanded === 'true';
                if (isExpanded) {
                    children.dataset.expanded = 'false';
                    children.classList.remove('expanded');
                    icon.classList.remove('expanded');
                    icon.classList.add('collapsed');
                } else {
                    children.dataset.expanded = 'true';
                    children.classList.add('expanded');
                    icon.classList.remove('collapsed');
                    icon.classList.add('expanded');
                }
            }
        });
    });
}

function expandFirstLevel() {
    document.querySelectorAll('.tree-node > .tree-node-children').forEach(container => {
        const header = container.parentElement.querySelector('.tree-node-header');
        const icon = header?.querySelector('.tree-icon');
        if (container && header && icon) {
            container.dataset.expanded = 'true';
            container.classList.add('expanded');
            icon.classList.remove('collapsed');
            icon.classList.add('expanded');
        }
    });
}

function expandAllTreeNodes(expand = true) {
    document.querySelectorAll('.tree-node-children').forEach(container => {
        container.dataset.expanded = expand.toString();
        container.classList.toggle('expanded', expand);
    });
    
    document.querySelectorAll('.tree-node-header.folder .tree-icon').forEach(icon => {
        icon.classList.toggle('collapsed', !expand);
        icon.classList.toggle('expanded', expand);
    });
}

function searchTree(query) {
    const nodes = document.querySelectorAll('.tree-node');
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
        nodes.forEach(node => node.style.display = '');
        return;
    }
    
    nodes.forEach(node => node.style.display = 'none');
    
    nodes.forEach(node => {
        const header = node.querySelector('.tree-node-header');
        if (header) {
            const name = header.querySelector('.tree-name')?.textContent.toLowerCase() || '';
            if (name.includes(searchTerm)) {
                node.style.display = '';
                expandParents(node);
            }
        }
    });
}

function expandParents(node) {
    let parent = node.parentElement;
    while (parent && parent.classList.contains('tree-node')) {
        const children = parent.querySelector('.tree-node-children');
        const icon = parent.querySelector('.tree-icon');
        if (children && icon) {
            children.dataset.expanded = 'true';
            children.classList.add('expanded');
            icon.classList.remove('collapsed');
            icon.classList.add('expanded');
        }
        parent = parent.parentElement;
    }
}

function updateMetrics(treeData) {
    const files = treeData.tree.filter(item => item.type === 'blob');
    const folders = treeData.tree.filter(item => item.type === 'tree');
    const totalSize = files.reduce((sum, file) => sum + (file.size || 0), 0);
    
    const metricsPreview = document.getElementById('metricsPreview');
    if (metricsPreview) {
        const grid = metricsPreview.querySelector('.metrics-grid');
        grid.innerHTML = `
            <div class="metric-card">
                <div class="metric-value">${files.length}</div>
                <div class="metric-label">Arquivos</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${folders.length}</div>
                <div class="metric-label">Pastas</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${formatBytes(totalSize)}</div>
                <div class="metric-label">Tamanho</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${getFileTypes(files).length}</div>
                <div class="metric-label">Tipos</div>
            </div>
        `;
    }
    
    // Salvar dados para uso no gráfico
    window.currentTreeData = treeData;
    
    // Se estiver na aba de métricas, atualizar o gráfico imediatamente
    if (document.querySelector('.view-btn[data-view="metrics"]')?.classList.contains('active')) {
        updateMetricsDisplay();
    }
}

// NOVA FUNÇÃO: Gerar gráfico de distribuição de arquivos
function generateFileTypesChart(files) {
    const fileTypesChartEl = document.getElementById('fileTypesChart');
    if (!fileTypesChartEl) return;
    
    // Destruir gráfico anterior se existir
    if (window.fileChart instanceof Chart) {
        window.fileChart.destroy();
    }
    
    // Se não houver arquivos, mostrar mensagem
    if (files.length === 0) {
        fileTypesChartEl.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 300px; color: var(--dark-subtext);">
                <i class="fas fa-chart-pie" style="font-size: 48px; opacity: 0.5; margin-bottom: 15px;"></i>
                <p>Nenhum arquivo para mostrar</p>
            </div>
        `;
        return;
    }
    
    // Contar tipos de arquivo
    const typeCounts = {};
    files.forEach(file => {
        const match = file.path.match(/\.([^.]+)$/);
        const type = match ? match[1].toUpperCase() : 'OUTROS';
        typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    
    // Ordenar por quantidade (mais comuns primeiro)
    const sortedTypes = Object.entries(typeCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8); // Pegar apenas os 8 mais comuns
    
    // Preparar dados para o gráfico
    const labels = sortedTypes.map(([type]) => type);
    const data = sortedTypes.map(([, count]) => count);
    
    // Cores para o gráfico
    const colors = [
        'rgba(59, 130, 246, 0.8)',   // Azul
        'rgba(16, 185, 129, 0.8)',   // Verde
        'rgba(245, 158, 11, 0.8)',   // Amarelo
        'rgba(239, 68, 68, 0.8)',    // Vermelho
        'rgba(139, 92, 246, 0.8)',   // Roxo
        'rgba(236, 72, 153, 0.8)',   // Rosa
        'rgba(6, 182, 212, 0.8)',    // Ciano
        'rgba(132, 204, 22, 0.8)'    // Lima
    ];
    
    // Criar canvas para o gráfico
    fileTypesChartEl.innerHTML = `
        <div style="position: relative; height: 300px; width: 100%;">
            <canvas id="fileDistributionChart"></canvas>
        </div>
    `;
    
    // Aguardar um pouco para o DOM atualizar
    setTimeout(() => {
        const ctx = document.getElementById('fileDistributionChart').getContext('2d');
        
        window.fileChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderColor: colors.map(color => color.replace('0.8', '1')),
                    borderWidth: 2,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: 'var(--dark-text)',
                            font: {
                                family: "'Inter', sans-serif",
                                size: 12
                            },
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        titleColor: 'var(--dark-text)',
                        bodyColor: 'var(--dark-subtext)',
                        borderColor: 'var(--dark-border)',
                        borderWidth: 1,
                        cornerRadius: 6,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${context.label}: ${value} arquivos (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '60%',
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 1000
                }
            }
        });
    }, 100);
}

function updateMetricsDisplay() {
    if (!window.currentTreeData) {
        // Mostrar mensagem se não há dados
        const fileTypesChart = document.getElementById('fileTypesChart');
        if (fileTypesChart) {
            fileTypesChart.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 300px; color: var(--dark-subtext);">
                    <i class="fas fa-chart-pie" style="font-size: 48px; opacity: 0.5; margin-bottom: 15px;"></i>
                    <p>Analise um repositório para ver o gráfico</p>
                </div>
            `;
        }
        return;
    }
    
    const treeData = window.currentTreeData;
    const files = treeData.tree.filter(item => item.type === 'blob');
    const folders = treeData.tree.filter(item => item.type === 'tree');
    const totalSize = files.reduce((sum, file) => sum + (file.size || 0), 0);
    
    const fileTypes = getFileTypes(files);
    
    // 1. Atualizar estatísticas (parte já existente)
    const statsDisplay = document.getElementById('statsDisplay');
    if (statsDisplay) {
        statsDisplay.innerHTML = `
            <div class="stats-grid">
                <div class="metric-card">
                    <div class="metric-value">${files.length}</div>
                    <div class="metric-label">Total de Arquivos</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">${folders.length}</div>
                    <div class="metric-label">Total de Pastas</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">${formatBytes(totalSize)}</div>
                    <div class="metric-label">Tamanho Total</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">${fileTypes.length}</div>
                    <div class="metric-label">Tipos de Arquivo</div>
                </div>
            </div>
            ${fileTypes.length > 0 ? `
                <div style="margin-top: 20px; text-align: left; width: 100%;">
                    <h5 style="color: var(--dark-subtext); margin-bottom: 10px;">Tipos de Arquivo:</h5>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${fileTypes.map(type => `
                            <span style="background: rgba(16, 185, 129, 0.1); color: var(--primary); 
                                  padding: 4px 12px; border-radius: 20px; font-size: 12px;">
                                ${type}
                            </span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;
    }
    
    // 2. GERAR GRÁFICO REAL - NOVA FUNCIONALIDADE
    generateFileTypesChart(files);
}

function getFileTypes(files) {
    const types = new Set();
    files.forEach(file => {
        const match = file.path.match(/\.([^.]+)$/);
        types.add(match ? match[1].toLowerCase() : 'sem extensão');
    });
    return Array.from(types).sort();
}

function exportData(format) {
    if (!window.currentTreeData) {
        showStatus('Nenhum dado para exportar', 'warning');
        return;
    }
    
    showStatus(`Exportando como ${format.toUpperCase()}...`, 'info');
    
    setTimeout(() => {
        showStatus(`Exportação ${format.toUpperCase()} concluída', 'success`);
        
        const dataStr = format === 'json' 
            ? JSON.stringify(window.currentTreeData, null, 2)
            : convertToCSV(window.currentTreeData);
        
        const dataBlob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/csv' });
        const url = URL.createObjectURL(dataBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gittree-export-${Date.now()}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 1000);
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

function createSkeletonScreen() {
    const container = document.createElement('div');
    container.className = 'skeleton-container';
    container.setAttribute('aria-hidden', 'true');
    
    // Configuration for tree structure simulation
    const items = [
        { level: 0, width: 75 },
        { level: 1, width: 65 },
        { level: 1, width: 80 },
        { level: 2, width: 60 },
        { level: 2, width: 70 },
        { level: 1, width: 85 },
        { level: 0, width: 90 },
        { level: 1, width: 70 },
        { level: 1, width: 65 },
        { level: 2, width: 75 },
        { level: 0, width: 80 },
        { level: 1, width: 70 }
    ];
    
    items.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = `skeleton-tree-item level-${item.level}`;
        
        const icon = document.createElement('div');
        icon.className = 'skeleton-icon';
        
        const bar = document.createElement('div');
        bar.className = `skeleton-bar width-${item.width}`;
        
        row.appendChild(icon);
        row.appendChild(bar);
        container.appendChild(row);
    });
    
    return container;
}

function showSkeletonInTree(show) {
    const treeContainer = document.getElementById('treeContainer');
    if (!treeContainer) return;
    
    if (show) {
        // Clear existing content and show skeleton
        treeContainer.innerHTML = '';
        const skeleton = createSkeletonScreen();
        treeContainer.appendChild(skeleton);
    } else {
        // Remove skeleton - actual content will be added by renderTree
        const skeleton = treeContainer.querySelector('.skeleton-container');
        if (skeleton) {
            skeleton.remove();
        }
    }
}

function showLoading(show) {
    const loading = document.getElementById('loadingState');
    const btn = document.getElementById('analyzeBtn');
    
    // Show/hide skeleton in tree view
    showSkeletonInTree(show);
    
    if (loading) loading.classList.toggle('hidden', !show);
    if (btn) {
        btn.disabled = show;
        btn.innerHTML = show 
            ? '<i class="fas fa-spinner fa-spin"></i> <span>Carregando...</span>'
            : '<i class="fas fa-eye"></i> <span>Visualizar</span>';
    }
}

function showStatus(message, type = 'info') {
    const box = document.getElementById('statusBox');
    const text = document.getElementById('statusText');
    
    if (!box || !text) return;
    
    box.className = 'status-box';
    box.classList.add(type);
    
    const icons = {
        info: 'fa-info-circle',
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    text.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${message}`;
}

function testRepo(repo) {
    document.getElementById('repoInput').value = repo;
    analyzeRepository();
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('repoInput');
    if (input) {
        input.addEventListener('blur', () => {
            const value = input.value.trim();
            if (value && value.includes('geocsvps')) {
                showStatus('Sugestão: tente "JoaoClaudiano/geocsv"', 'info');
            }
        });
    }
});

window.GitTree = {
    test: testRepo,
    analyze: analyzeRepository
};

console.log('🌳 GitTree v1.0 carregado!');
console.log('Teste com: GitTree.test("facebook/react")');
