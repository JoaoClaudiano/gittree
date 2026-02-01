// main.js - CodeCartographer v4.0 (Funcional com árvore expansível)
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
            const repo = repoInput?.value.trim();
            if (repo) {
                analyzeRepository();
            } else {
                showStatus('Digite um repositório para recarregar', 'warning');
            }
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

async function analyzeRepository() {
    const repoInput = document.getElementById('repoInput');
    const repo = repoInput.value.trim();
    
    if (!repo || !repo.includes('/')) {
        showStatus('Formato inválido. Use: usuário/repositório', 'error');
        return;
    }
    
    showLoading(true);
    showStatus('Conectando ao GitHub...', 'info');
    
    try {
        // Salvar repositório atual
        localStorage.setItem('last-repo', repo);
        
        // Obter dados do repositório
        const repoData = await fetchGitHubRepo(repo);
        if (!repoData) {
            throw new Error('Repositório não encontrado');
        }
        
        // Atualizar interface
        updateRepoInfo(repoData);
        showStatus('Obtendo estrutura de arquivos...', 'info');
        
        // Obter estrutura da árvore
        const treeData = await fetchGitHubTree(repo, repoData.default_branch);
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
    } finally {
        showLoading(false);
    }
}

async function fetchGitHubRepo(repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        if (!response.ok) throw new Error('Repositório não encontrado');
        
        const data = await response.json();
        return {
            name: data.name,
            full_name: data.full_name,
            description: data.description || 'Sem descrição',
            stars: data.stargazers_count,
            forks: data.forks_count,
            watchers: data.watchers_count,
            default_branch: data.default_branch,
            size: data.size
        };
    } catch (error) {
        throw error;
    }
}

async function fetchGitHubTree(repo, branch) {
    try {
        // Primeiro, obter o SHA do commit mais recente
        const commitsResponse = await fetch(`https://api.github.com/repos/${repo}/commits/${branch}`);
        if (!commitsResponse.ok) throw new Error('Branch não encontrada');
        
        const commitData = await commitsResponse.json();
        const treeSha = commitData.commit.tree.sha;
        
        // Obter a árvore recursivamente
        const treeResponse = await fetch(`https://api.github.com/repos/${repo}/git/trees/${treeSha}?recursive=1`);
        if (!treeResponse.ok) throw new Error('Estrutura não disponível');
        
        return await treeResponse.json();
    } catch (error) {
        throw error;
    }
}

function updateRepoInfo(repoData) {
    document.getElementById('repoTitle').textContent = repoData.full_name;
    document.getElementById('repoDescription').textContent = repoData.description;
    
    const statsHTML = `
        <span class="stat-item"><i class="fas fa-star"></i> ${repoData.stars}</span>
        <span class="stat-item"><i class="fas fa-code-branch"></i> ${repoData.forks}</span>
        <span class="stat-item"><i class="fas fa-eye"></i> ${repoData.watchers}</span>
    `;
    document.getElementById('repoStats').innerHTML = statsHTML;
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
        
        node.closest('.tree-node').style.display = isMatch ? '' : 'none';
        
        // Se encontrou, expandir pais
        if (isMatch && searchTerm !== '') {
            expandParents(node.closest('.tree-node'));
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
    const sizeKB = Math.round(totalSize / 1024);
    
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
                <div class="metric-value">${sizeKB} KB</div>
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
    
    // Atualizar texto
    if (type === 'info') {
        statusText.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
    } else if (type === 'success') {
        statusText.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    } else if (type === 'error') {
        statusText.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    } else if (type === 'warning') {
        statusText.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
    }
}

// Exportar funções para uso global (opcional)
window.CodeCartographer = {
    init: initApp,
    analyze: analyzeRepository,
    expandAll: () => expandAllTreeNodes(true),
    collapseAll: () => expandAllTreeNodes(false)
};
