// main.js - CodeCartographer v4.0 (Corrigido para tratamento de URLs)
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
    
    // Carregar tema salvo
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
            
            // Atualizar botões ativos
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Atualizar views visíveis
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
    
    // Análise do repositório
    if (analyzeBtn && repoInput) {
        analyzeBtn.addEventListener('click', analyzeRepository);
        repoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') analyzeRepository();
        });
    }
    
    // Limpar cache
    if (clearCacheBtn) {
        clearCacheBtn.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja limpar todo o cache?')) {
                localStorage.clear();
                updateCacheStatus();
                showStatus('Cache limpo com sucesso!', 'success');
            }
        });
    }
    
    // Recarregar
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            analyzeRepository();
        });
    }
    
    // Controles da árvore
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
    // Tentar carregar último repositório analisado
    const lastRepo = localStorage.getItem('last-repo');
    if (lastRepo) {
        document.getElementById('repoInput').value = lastRepo;
    }
}

// FUNÇÃO CORRIGIDA: Extrai usuário/repositório de diferentes formatos
function extractRepoInfo(input) {
    // Limpar espaços
    let repo = input.trim();
    
    // Remover trailing slash
    if (repo.endsWith('/')) {
        repo = repo.slice(0, -1);
    }
    
    // Se for uma URL completa do GitHub
    if (repo.includes('github.com/')) {
        // Extrair parte após github.com/
        const match = repo.match(/github\.com\/([^\/]+\/[^\/\?#]+)/);
        if (match && match[1]) {
            // Remover .git se presente
            repo = match[1].replace(/\.git$/, '');
        }
    }
    
    // Verificar se tem formato correto
    const parts = repo.split('/');
    if (parts.length !== 2) {
        throw new Error('Formato inválido. Use: usuário/repositório');
    }
    
    return {
        owner: parts[0],
        repo: parts[1],
        fullName: parts[0] + '/' + parts[1]
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
    showStatus('Processando entrada...', 'info');
    
    try {
        // Extrair informações do repositório
        let repoInfo;
        try {
            repoInfo = extractRepoInfo(inputValue);
        } catch (error) {
            showStatus(error.message, 'error');
            showLoading(false);
            return;
        }
        
        // Salvar repositório atual
        localStorage.setItem('last-repo', inputValue);
        
        // Atualizar status
        showStatus(`Buscando ${repoInfo.fullName}...`, 'info');
        
        // Obter dados do repositório
        const repoData = await fetchGitHubRepo(repoInfo.owner, repoInfo.repo);
        if (!repoData) {
            throw new Error('Repositório não encontrado ou privado');
        }
        
        // Atualizar interface
        updateRepoInfo(repoData);
        showStatus('Obtendo estrutura de arquivos...', 'info');
        
        // Obter estrutura da árvore
        const treeData = await fetchGitHubTree(repoInfo.owner, repoInfo.repo, repoData.default_branch);
        if (!treeData) {
            throw new Error('Não foi possível obter a estrutura');
        }
        
        // Renderizar árvore
        renderTree(treeData);
        showStatus('Análise concluída!', 'success');
        
        // Atualizar métricas
        updateMetrics(treeData);
        
        // Atualizar cache
        updateCacheStatus();
        
    } catch (error) {
        console.error('Erro na análise:', error);
        showStatus(`Erro: ${error.message}`, 'error');
        
        // Mostrar dica para usuários
        if (error.message.includes('não encontrado')) {
            setTimeout(() => {
                showStatus('Dica: Use formato "usuário/repositório" (ex: facebook/react)', 'info');
            }, 2000);
        }
    } finally {
        showLoading(false);
    }
}

async function fetchGitHubRepo(owner, repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        
        if (response.status === 404) {
            throw new Error('Repositório não encontrado');
        }
        
        if (response.status === 403) {
            throw new Error('Limite de requisições excedido. Tente novamente mais tarde.');
        }
        
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        return {
            name: data.name,
            full_name: data.full_name,
            description: data.description || 'Sem descrição',
            stars: data.stargazers_count,
            forks: data.forks_count,
            watchers: data.watchers_count,
            default_branch: data.default_branch,
            size: data.size,
            owner: {
                login: data.owner.login,
                avatar_url: data.owner.avatar_url
            }
        };
    } catch (error) {
        throw error;
    }
}

async function fetchGitHubTree(owner, repo, branch) {
    try {
        // Primeiro, obter o SHA do commit mais recente
        const commitsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${branch}`);
        
        if (!commitsResponse.ok) {
            if (commitsResponse.status === 404) {
                throw new Error('Branch não encontrada');
            }
            throw new Error('Erro ao buscar commits');
        }
        
        const commitData = await commitsResponse.json();
        const treeSha = commitData.commit.tree.sha;
        
        // Obter a árvore recursivamente
        const treeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`);
        
        if (!treeResponse.ok) {
            throw new Error('Não foi possível obter a estrutura do repositório');
        }
        
        return await treeResponse.json();
    } catch (error) {
        throw error;
    }
}

function updateRepoInfo(repoData) {
    document.getElementById('repoTitle').textContent = repoData.full_name;
    document.getElementById('repoDescription').textContent = repoData.description;
    
    const statsHTML = `
        <span class="stat-item"><i class="fas fa-star"></i> ${formatNumber(repoData.stars)}</span>
        <span class="stat-item"><i class="fas fa-code-branch"></i> ${formatNumber(repoData.forks)}</span>
        <span class="stat-item"><i class="fas fa-eye"></i> ${formatNumber(repoData.watchers)}</span>
    `;
    document.getElementById('repoStats').innerHTML = statsHTML;
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function renderTree(treeData) {
    const treeContainer = document.getElementById('treeContainer');
    if (!treeContainer || !treeData.tree) return;
    
    // Organizar arquivos em estrutura hierárquica
    const fileTree = buildFileTree(treeData.tree);
    
    // Limpar container
    treeContainer.innerHTML = '';
    
    // Renderizar árvore
    renderTreeNode(treeContainer, fileTree);
    
    // Adicionar eventos de clique
    setTimeout(() => {
        attachTreeEvents();
    }, 100);
}

function buildFileTree(files) {
    const root = { name: 'root', type: 'folder', children: [], path: '' };
    
    files.forEach(file => {
        const pathParts = file.path.split('/');
        let current = root;
        
        for (let i = 0; i < pathParts.length; i++) {
            const part = pathParts[i];
            const isLast = i === pathParts.length - 1;
            
            let child = current.children.find(c => c.name === part);
            
            if (!child) {
                child = {
                    name: part,
                    type: isLast ? (file.type === 'blob' ? 'file' : 'folder') : 'folder',
                    children: [],
                    path: pathParts.slice(0, i + 1).join('/'),
                    size: file.size || 0,
                    sha: file.sha
                };
                current.children.push(child);
            }
            
            current = child;
        }
    });
    
    return root.children[0] || root;
}

function renderTreeNode(container, node, depth = 0) {
    const isFolder = node.type === 'folder';
    const hasChildren = node.children && node.children.length > 0;
    
    const nodeElement = document.createElement('div');
    nodeElement.className = 'tree-node';
    nodeElement.dataset.path = node.path;
    
    const header = document.createElement('div');
    header.className = `tree-node-header ${node.type}`;
    
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
    
    // Adicionar tamanho para arquivos
    if (!isFolder && node.size > 0) {
        const sizeSpan = document.createElement('span');
        sizeSpan.className = 'tree-size';
        sizeSpan.textContent = formatBytes(node.size);
        header.appendChild(sizeSpan);
    }
    
    header.appendChild(icon);
    header.appendChild(name);
    header.appendChild(badge);
    
    nodeElement.appendChild(header);
    
    if (isFolder && hasChildren) {
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'tree-node-children';
        childrenContainer.dataset.expanded = 'false';
        
        // Ordenar: pastas primeiro, depois arquivos
        node.children.sort((a, b) => {
            if (a.type === 'folder' && b.type !== 'folder') return -1;
            if (a.type !== 'folder' && b.type === 'folder') return 1;
            return a.name.localeCompare(b.name);
        });
        
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
            
            const nodeElement = header.closest('.tree-node');
            const childrenContainer = nodeElement.querySelector('.tree-node-children');
            const icon = header.querySelector('.tree-icon');
            
            if (childrenContainer) {
                const isExpanded = childrenContainer.dataset.expanded === 'true';
                
                if (isExpanded) {
                    // Recolher
                    childrenContainer.dataset.expanded = 'false';
                    childrenContainer.classList.remove('expanded');
                    icon.classList.remove('expanded');
                    icon.classList.add('collapsed');
                } else {
                    // Expandir
                    childrenContainer.dataset.expanded = 'true';
                    childrenContainer.classList.add('expanded');
                    icon.classList.remove('collapsed');
                    icon.classList.add('expanded');
                }
            }
        });
    });
    
    // Evento para arquivos (opcional)
    document.querySelectorAll('.tree-node-header.file').forEach(header => {
        header.addEventListener('click', (e) => {
            e.stopPropagation();
            const nodeElement = header.closest('.tree-node');
            const path = nodeElement.dataset.path;
            console.log('Arquivo clicado:', path);
            // Aqui você pode adicionar funcionalidade para visualizar arquivos
        });
    });
}

function expandAllTreeNodes(expand = true) {
    const childrenContainers = document.querySelectorAll('.tree-node-children');
    const icons = document.querySelectorAll('.tree-node-header.folder .tree-icon');
    
    childrenContainers.forEach(container => {
        container.dataset.expanded = expand.toString();
        if (expand) {
            container.classList.add('expanded');
        } else {
            container.classList.remove('expanded');
        }
    });
    
    icons.forEach(icon => {
        if (expand) {
            icon.classList.remove('collapsed');
            icon.classList.add('expanded');
        } else {
            icon.classList.remove('expanded');
            icon.classList.add('collapsed');
        }
    });
}

function searchTree(query) {
    const nodes = document.querySelectorAll('.tree-node-header');
    const searchTerm = query.toLowerCase();
    
    nodes.forEach(node => {
        const nodeName = node.querySelector('.tree-name').textContent.toLowerCase();
        const isMatch = searchTerm === '' || nodeName.includes(searchTerm);
        
        const treeNode = node.closest('.tree-node');
        treeNode.style.display = isMatch ? '' : 'none';
        
        // Se encontrou, expandir pais
        if (isMatch && searchTerm !== '') {
            expandParents(treeNode);
        }
    });
}

function expandParents(node) {
    let current = node;
    while (current) {
        const childrenContainer = current.querySelector('.tree-node-children');
        const icon = current.querySelector('.tree-icon');
        
        if (childrenContainer) {
            childrenContainer.dataset.expanded = 'true';
            childrenContainer.classList.add('expanded');
            if (icon) {
                icon.classList.remove('collapsed');
                icon.classList.add('expanded');
            }
        }
        
        current = current.parentElement.closest('.tree-node');
    }
}

function updateMetrics(treeData) {
    const files = treeData.tree.filter(item => item.type === 'blob');
    const folders = treeData.tree.filter(item => item.type === 'tree');
    
    const totalSize = files.reduce((sum, file) => sum + (file.size || 0), 0);
    
    const metricsPreview = document.getElementById('metricsPreview');
    if (metricsPreview) {
        const metricsGrid = metricsPreview.querySelector('.metrics-grid');
        metricsGrid.innerHTML = `
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
    const extensions = new Set();
    files.forEach(file => {
        const match = file.path.match(/\.([^.]+)$/);
        if (match) {
            extensions.add(match[1]);
        } else {
            extensions.add('sem extensão');
        }
    });
    return Array.from(extensions);
}

function showLoading(show) {
    const loadingState = document.getElementById('loadingState');
    if (loadingState) {
        loadingState.classList.toggle('hidden', !show);
    }
    
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) {
        analyzeBtn.disabled = show;
    }
}

function showStatus(message, type = 'info') {
    const statusBox = document.getElementById('statusBox');
    const statusText = document.getElementById('statusText');
    
    if (!statusBox || !statusText) return;
    
    // Reset classes
    statusBox.className = 'status-box';
    statusBox.classList.add(type);
    
    // Atualizar texto com ícone
    const icons = {
        info: 'fa-info-circle',
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    statusText.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${message}`;
}

// Exportar funções para uso global (opcional)
window.CodeCartographer = {
    init: initApp,
    analyze: analyzeRepository,
    expandAll: () => expandAllTreeNodes(true),
    collapseAll: () => expandAllTreeNodes(false),
    extractRepoInfo: extractRepoInfo
};

// Função auxiliar para teste rápido
function testRepo(repo) {
    document.getElementById('repoInput').value = repo;
    analyzeRepository();
}

// Adicione isto para permitir testes via console
console.log('CodeCartographer v4.0 carregado!');
console.log('Use testRepo("facebook/react") para testar rapidamente.');
