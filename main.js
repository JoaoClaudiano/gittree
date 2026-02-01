// main.js - CodeCartographer v4.0 (Corrigido para tratamento melhor de repositórios)
document.addEventListener('DOMContentLoaded', () => {
    console.log('CodeCartographer v4.0 inicializando...');
    initApp();
});

function initApp() {
    initTheme();
    initViews();
    initControls();
    initCache();
    loadDefaultRepo();
    
    console.log('✅ CodeCartographer v4.0 inicializado');
}

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    const savedTheme = localStorage.getItem('codecartographer-theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        updateThemeIcon(true);
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        localStorage.setItem('codecartographer-theme', isLight ? 'light' : 'dark');
        updateThemeIcon(isLight);
    });
}

function updateThemeIcon(isLight) {
    const icon = document.querySelector('#themeToggle i');
    if (isLight) {
        icon.className = 'fas fa-sun';
        document.querySelector('#themeToggle').title = 'Alternar para tema escuro';
    } else {
        icon.className = 'fas fa-moon';
        document.querySelector('#themeToggle').title = 'Alternar para tema claro';
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
        });
    });
}

function initControls() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const repoInput = document.getElementById('repoInput');
    const clearCacheBtn = document.getElementById('clearCacheBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const expandAllBtn = document.getElementById('expandAllBtn');
    const collapseAllBtn = document.getElementById('collapseAllBtn');
    const treeSearch = document.getElementById('treeSearch');
    
    if (analyzeBtn && repoInput) {
        analyzeBtn.addEventListener('click', analyzeRepository);
        repoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') analyzeRepository();
        });
    }
    
    if (clearCacheBtn) {
        clearCacheBtn.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja limpar todo o cache?')) {
                localStorage.clear();
                updateCacheStatus();
                showStatus('Cache limpo com sucesso!', 'success');
            }
        });
    }
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            analyzeRepository();
        });
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
    
    // Adicionar sugestões de repositórios populares
    addPopularRepoSuggestions();
}

function addPopularRepoSuggestions() {
    const input = document.getElementById('repoInput');
    if (!input) return;
    
    // Criar datalist para sugestões
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
        'JoaoClaudiano/geocsv' // Repositório do usuário
    ];
    
    popularRepos.forEach(repo => {
        const option = document.createElement('option');
        option.value = repo;
        datalist.appendChild(option);
    });
    
    // Adicionar datalist ao input
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

// FUNÇÃO MELHORADA: Extração mais robusta
function extractRepoInfo(input) {
    if (!input || input.trim() === '') {
        throw new Error('Digite um repositório GitHub');
    }
    
    let repo = input.trim();
    
    // Remover trailing slash
    if (repo.endsWith('/')) {
        repo = repo.slice(0, -1);
    }
    
    // Caso 1: URL completa do GitHub
    if (repo.includes('github.com/')) {
        const match = repo.match(/github\.com\/([^\/]+\/[^\/\?#]+)/);
        if (match && match[1]) {
            repo = match[1].replace(/\.git$/, '');
        } else {
            throw new Error('URL do GitHub inválida');
        }
    }
    
    // Caso 2: Apenas usuário (vamos sugerir repositórios)
    if (!repo.includes('/')) {
        throw new Error('Digite no formato: usuário/repositório');
    }
    
    // Remover branch/tag se especificado (usuário/repo@branch ou usuário/repo:branch)
    repo = repo.split('@')[0].split(':')[0];
    
    // Verificar formato final
    const parts = repo.split('/');
    if (parts.length !== 2) {
        throw new Error('Formato inválido. Use: usuário/repositório');
    }
    
    const owner = parts[0].trim();
    const repoName = parts[1].trim();
    
    if (!owner || !repoName) {
        throw new Error('Usuário e repositório não podem estar vazios');
    }
    
    return {
        owner: owner,
        repo: repoName,
        fullName: owner + '/' + repoName
    };
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
            console.log('Repositório extraído:', repoInfo);
        } catch (error) {
            showStatus(error.message, 'error');
            showLoading(false);
            return;
        }
        
        // Salvar no histórico
        localStorage.setItem('last-repo', inputValue);
        
        // Verificar se é o repositório do usuário com erro de digitação
        if (repoInfo.repo === 'geocsvps' && repoInfo.owner === 'JoaoClaudiano') {
            showStatus('Verificando repositório...', 'warning');
            
            // Tentar corrigir automaticamente
            const correctedRepo = await tryCorrectRepoName(repoInfo.owner, repoInfo.repo);
            if (correctedRepo) {
                showStatus(`Corrigindo para: ${correctedRepo}`, 'info');
                repoInfo.repo = correctedRepo;
                repoInfo.fullName = `${repoInfo.owner}/${correctedRepo}`;
                repoInput.value = repoInfo.fullName;
            }
        }
        
        showStatus(`Buscando ${repoInfo.fullName}...`, 'info');
        
        // Obter dados do repositório
        const repoData = await fetchGitHubRepo(repoInfo.owner, repoInfo.repo);
        if (!repoData) {
            throw new Error('Repositório não encontrado');
        }
        
        // Atualizar interface
        updateRepoInfo(repoData);
        showStatus('Obtendo estrutura...', 'info');
        
        // Obter árvore
        const treeData = await fetchCompleteTree(repoInfo.owner, repoInfo.repo, repoData.default_branch);
        if (!treeData || !treeData.tree || treeData.tree.length === 0) {
            throw new Error('Não foi possível obter a estrutura');
        }
        
        showStatus(`Processando ${treeData.tree.length} itens...`, 'info');
        
        // Renderizar árvore
        renderTree(treeData);
        showStatus('Análise concluída!', 'success');
        
        // Atualizar métricas
        updateMetrics(treeData);
        updateCacheStatus();
        
    } catch (error) {
        console.error('Erro na análise:', error);
        
        // Tratamento de erros específicos
        if (error.message.includes('404') || error.message.includes('não encontrado')) {
            showStatus('Repositório não encontrado. Verifique o nome.', 'error');
            
            // Sugerir possíveis correções
            const repoInput = document.getElementById('repoInput');
            const value = repoInput.value.trim();
            if (value.includes('geocsvps')) {
                setTimeout(() => {
                    showStatus('Tente: JoaoClaudiano/geocsv', 'info');
                }, 2000);
            }
        } else if (error.message.includes('403') || error.message.includes('Limite')) {
            showStatus('Limite de requisições excedido. Tente novamente mais tarde.', 'error');
        } else {
            showStatus(`Erro: ${error.message}`, 'error');
        }
    } finally {
        showLoading(false);
    }
}

// NOVA FUNÇÃO: Tentar corrigir nome do repositório
async function tryCorrectRepoName(owner, repo) {
    const commonErrors = {
        'geocsvps': 'geocsv',
        'geocsvs': 'geocsv',
        'geoscv': 'geocsv',
        'geosvc': 'geocsv'
    };
    
    // Verificar se há erro comum
    if (commonErrors[repo.toLowerCase()]) {
        return commonErrors[repo.toLowerCase()];
    }
    
    // Tentar buscar repositórios do usuário para sugerir
    try {
        const response = await fetch(`https://api.github.com/users/${owner}/repos?per_page=100`);
        if (response.ok) {
            const repos = await response.json();
            const repoNames = repos.map(r => r.name);
            
            // Encontrar repositório mais similar
            const suggestions = findSimilarRepoNames(repo, repoNames);
            if (suggestions.length > 0) {
                return suggestions[0];
            }
        }
    } catch (error) {
        console.warn('Não foi possível buscar repositórios do usuário:', error);
    }
    
    return null;
}

function findSimilarRepoNames(input, repoList) {
    input = input.toLowerCase();
    const suggestions = [];
    
    for (const repo of repoList) {
        const repoLower = repo.toLowerCase();
        
        // Verificar se é substring
        if (repoLower.includes(input) || input.includes(repoLower)) {
            suggestions.push(repo);
            continue;
        }
        
        // Verificar similaridade (diferença de um caractere)
        if (Math.abs(repoLower.length - input.length) <= 2) {
            let diff = 0;
            const maxLen = Math.max(repoLower.length, input.length);
            
            for (let i = 0; i < maxLen; i++) {
                if (repoLower[i] !== input[i]) diff++;
                if (diff > 2) break;
            }
            
            if (diff <= 2) {
                suggestions.push(repo);
            }
        }
    }
    
    return suggestions.slice(0, 3); // Retorna até 3 sugestões
}

async function fetchGitHubRepo(owner, repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        console.log(`Status da resposta: ${response.status}`);
        
        if (response.status === 404) {
            throw new Error('Repositório não encontrado (404)');
        }
        
        if (response.status === 403) {
            // Verificar se é limite de rate limit
            const rateLimit = response.headers.get('X-RateLimit-Remaining');
            if (rateLimit === '0') {
                throw new Error('Limite de requisições excedido. Tente novamente em 1 hora.');
            }
            throw new Error('Acesso não autorizado (403)');
        }
        
        if (response.status === 401) {
            throw new Error('Acesso não autorizado. O repositório pode ser privado.');
        }
        
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Verificar se é um repositório válido
        if (!data.name || !data.owner) {
            throw new Error('Resposta inválida da API do GitHub');
        }
        
        return {
            name: data.name,
            full_name: data.full_name,
            description: data.description || 'Sem descrição',
            stars: data.stargazers_count || 0,
            forks: data.forks_count || 0,
            watchers: data.watchers_count || 0,
            default_branch: data.default_branch || 'main',
            size: data.size || 0,
            owner: {
                login: data.owner.login,
                avatar_url: data.owner.avatar_url
            },
            html_url: data.html_url,
            created_at: data.created_at,
            updated_at: data.updated_at
        };
    } catch (error) {
        console.error('Erro em fetchGitHubRepo:', error);
        throw error;
    }
}

async function fetchCompleteTree(owner, repo, branch) {
    try {
        // Obter SHA do commit mais recente
        const commitsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${branch}`);
        
        if (!commitsResponse.ok) {
            throw new Error(`Erro ao buscar commits: ${commitsResponse.status}`);
        }
        
        const commitData = await commitsResponse.json();
        const treeSha = commitData.commit.tree.sha;
        
        // Tentar obter árvore recursiva
        const treeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`);
        
        if (!treeResponse.ok) {
            // Se falhar, tentar sem recursivo
            const simpleTreeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSha}`);
            if (!simpleTreeResponse.ok) {
                throw new Error('Não foi possível obter a estrutura do repositório');
            }
            return await simpleTreeResponse.json();
        }
        
        const treeData = await treeResponse.json();
        
        // Se a árvore foi truncada, avisar
        if (treeData.truncated) {
            showStatus('Repositório muito grande. Alguns arquivos podem não estar visíveis.', 'warning');
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
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function renderTree(treeData) {
    const treeContainer = document.getElementById('treeContainer');
    if (!treeContainer || !treeData.tree) return;
    
    console.log(`Total de itens: ${treeData.tree.length}`);
    
    // Construir árvore hierárquica
    const root = buildFileTree(treeData.tree);
    
    // Limpar container
    treeContainer.innerHTML = '';
    
    // Renderizar
    renderTreeNode(treeContainer, root);
    
    // Adicionar eventos
    setTimeout(() => {
        attachTreeEvents();
        
        // Expandir primeiro nível por padrão
        expandFirstLevel();
    }, 100);
}

function buildFileTree(files) {
    const root = { name: '/', type: 'folder', children: [], path: '' };
    const nodeMap = new Map();
    nodeMap.set('', root);
    
    // Processar cada arquivo/pasta
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
                
                // Adicionar ao pai
                const parent = nodeMap.get(parentPath);
                if (parent) {
                    parent.children.push(node);
                }
            }
        }
    });
    
    // Ordenar filhos de cada nó
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
    if (!node || depth > 10) return; // Limitar profundidade para performance
    
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
    if (isFolder && hasChildren) {
        icon.classList.add('collapsed');
    }
    
    const name = document.createElement('span');
    name.className = 'tree-name';
    name.textContent = node.name;
    
    const badge = document.createElement('span');
    badge.className = 'tree-badge';
    badge.textContent = isFolder ? 'pasta' : 'arquivo';
    
    // Contador para pastas
    if (isFolder && hasChildren) {
        const count = document.createElement('span');
        count.className = 'tree-count';
        count.textContent = `(${node.children.length})`;
        header.appendChild(count);
    }
    
    // Tamanho para arquivos
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
    
    // Renderizar filhos para pastas
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
    // Pastas expansíveis
    document.querySelectorAll('.tree-node-header.folder').forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const node = header.closest('.tree-node');
            const children = node.querySelector('.tree-node-children');
            const icon = header.querySelector('.tree-icon');
            
            if (children) {
                const isExpanded = children.dataset.expanded === 'true';
                
                if (isExpanded) {
                    // Recolher
                    children.dataset.expanded = 'false';
                    children.classList.remove('expanded');
                    icon.classList.remove('expanded');
                    icon.classList.add('collapsed');
                } else {
                    // Expandir
                    children.dataset.expanded = 'true';
                    children.classList.add('expanded');
                    icon.classList.remove('collapsed');
                    icon.classList.add('expanded');
                }
            }
        });
    });
    
    // Arquivos clicáveis
    document.querySelectorAll('.tree-node-header.file').forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            const path = header.closest('.tree-node').dataset.path;
            console.log('Arquivo:', path);
            // Aqui poderia abrir preview do arquivo
        });
    });
}

function expandFirstLevel() {
    const firstLevelFolders = document.querySelectorAll('.tree-node > .tree-node-children');
    firstLevelFolders.forEach(container => {
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
    const containers = document.querySelectorAll('.tree-node-children');
    const icons = document.querySelectorAll('.tree-node-header.folder .tree-icon');
    
    containers.forEach(container => {
        container.dataset.expanded = expand.toString();
        container.classList.toggle('expanded', expand);
    });
    
    icons.forEach(icon => {
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
    
    // Primeiro ocultar tudo
    nodes.forEach(node => node.style.display = 'none');
    
    // Mostrar correspondências
    nodes.forEach(node => {
        const header = node.querySelector('.tree-node-header');
        if (header) {
            const name = header.querySelector('.tree-name')?.textContent.toLowerCase() || '';
            if (name.includes(searchTerm)) {
                node.style.display = '';
                
                // Expandir pais
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
        }
    });
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
}

function getFileTypes(files) {
    const types = new Set();
    files.forEach(file => {
        const match = file.path.match(/\.([^.]+)$/);
        types.add(match ? match[1].toLowerCase() : 'sem extensão');
    });
    return Array.from(types);
}

function showLoading(show) {
    const loading = document.getElementById('loadingState');
    const btn = document.getElementById('analyzeBtn');
    
    if (loading) loading.classList.toggle('hidden', !show);
    if (btn) {
        btn.disabled = show;
        btn.innerHTML = show 
            ? '<i class="fas fa-spinner fa-spin"></i> <span>Analisando...</span>'
            : '<i class="fas fa-search"></i> <span>Analisar</span>';
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

// Funções de teste
function testRepo(repo) {
    document.getElementById('repoInput').value = repo;
    analyzeRepository();
}

// Adicionar sugestão automática
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

// Expor para console
window.CodeCartographer = {
    test: testRepo,
    analyze: analyzeRepository
};

console.log('CodeCartographer v4.0 carregado!');
console.log('Teste com: CodeCartographer.test("facebook/react")');
