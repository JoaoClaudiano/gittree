// main.js - CodeCartographer v4.0 Professional
// Versão corrigida para nova estrutura

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, inicializando CodeCartographer...');
    
    // Verificar se o container #app existe
    const app = document.getElementById('app');
    if (!app) {
        console.error('Container #app não encontrado! Criando fallback...');
        // Criar fallback
        const fallbackApp = document.createElement('div');
        fallbackApp.id = 'app';
        fallbackApp.className = 'app-main';
        document.body.appendChild(fallbackApp);
    }
    
    // Inicializar a aplicação
    initCodeCartographer();
    
    console.log('CodeCartographer v4.0 Professional inicializado com sucesso!');
});

function initCodeCartographer() {
    // Inicialização do tema
    initTheme();
    
    // Inicializar controles de visualização
    initViewControls();
    
    // Inicializar eventos dos botões
    initButtons();
    
    // Inicializar cache
    initCache();
    
    // Testar funcionalidades
    testComponents();
}

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Verificar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
    }
    
    // Atualizar ícone
    updateThemeIcon();
    
    // Evento de toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const isLight = body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            updateThemeIcon();
        });
    }
    
    function updateThemeIcon() {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            themeToggle.title = 'Alternar para tema escuro';
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            themeToggle.title = 'Alternar para tema claro';
        }
    }
}

function initViewControls() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const viewContainers = document.querySelectorAll('.view-container');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.getAttribute('data-view');
            
            // Atualizar botões ativos
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Mostrar container correspondente
            viewContainers.forEach(container => {
                container.classList.remove('active');
                if (container.id === `${view}View`) {
                    container.classList.add('active');
                }
            });
            
            // Disparar evento personalizado
            const event = new CustomEvent('viewChanged', { detail: { view } });
            document.dispatchEvent(event);
        });
    });
}

function initButtons() {
    // Botão de análise
    const analyzeBtn = document.getElementById('analyzeBtn');
    const repoInput = document.getElementById('repoInput');
    const statusBox = document.getElementById('statusBox');
    const statusText = document.getElementById('statusText');
    
    if (analyzeBtn && repoInput) {
        analyzeBtn.addEventListener('click', async () => {
            const repo = repoInput.value.trim();
            if (!repo) {
                showStatus('Por favor, digite um repositório', 'error');
                return;
            }
            
            showStatus(`Analisando ${repo}...`, 'loading');
            analyzeBtn.disabled = true;
            
            try {
                // Simulação de análise
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Aqui você integraria com github-api.js
                const result = await simulateAnalysis(repo);
                
                showStatus('Análise concluída!', 'success');
                updateResults(result);
                
            } catch (error) {
                showStatus(`Erro: ${error.message}`, 'error');
            } finally {
                analyzeBtn.disabled = false;
            }
        });
        
        // Permitir Enter no input
        repoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                analyzeBtn.click();
            }
        });
    }
    
    // Botão limpar cache
    const clearCacheBtn = document.getElementById('clearCacheBtn');
    if (clearCacheBtn) {
        clearCacheBtn.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja limpar o cache?')) {
                localStorage.clear();
                showStatus('Cache limpo com sucesso', 'success');
                updateCacheDisplay();
            }
        });
    }
    
    // Botão atualizar
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            const repo = repoInput?.value.trim();
            if (repo) {
                analyzeBtn?.click();
            } else {
                showStatus('Digite um repositório para atualizar', 'warning');
            }
        });
    }
    
    // Botões de exportação
    const exportBtns = ['exportJSONBtn', 'exportPNGBtn', 'exportCSVBtn'];
    exportBtns.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', () => {
                const format = btnId.replace('export', '').replace('Btn', '').toLowerCase();
                showStatus(`Exportando como ${format}...`, 'loading');
                setTimeout(() => {
                    showStatus(`Exportação ${format} concluída`, 'success');
                }, 1000);
            });
        }
    });
    
    // Controles da árvore
    const collapseBtn = document.getElementById('collapseAllBtn');
    const expandBtn = document.getElementById('expandAllBtn');
    const treeSearch = document.getElementById('treeSearch');
    
    if (collapseBtn) {
        collapseBtn.addEventListener('click', () => {
            // Implementar recolher tudo
            console.log('Recolhendo árvore...');
        });
    }
    
    if (expandBtn) {
        expandBtn.addEventListener('click', () => {
            // Implementar expandir tudo
            console.log('Expandindo árvore...');
        });
    }
    
    if (treeSearch) {
        treeSearch.addEventListener('input', (e) => {
            // Implementar busca na árvore
            console.log('Buscando:', e.target.value);
        });
    }
}

function initCache() {
    updateCacheDisplay();
    
    // Monitorar mudanças no cache
    window.addEventListener('storage', updateCacheDisplay);
}

function updateCacheDisplay() {
    const cacheStatus = document.getElementById('cacheStatus');
    if (!cacheStatus) return;
    
    let totalSize = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        totalSize += (key.length + value.length) * 2; // UTF-16
    }
    
    const sizeInMB = (totalSize / 1024 / 1024).toFixed(2);
    cacheStatus.innerHTML = `<i class="fas fa-circle"></i> Cache: ${sizeInMB}MB`;
}

function showStatus(message, type = 'info') {
    const statusBox = document.getElementById('statusBox');
    const statusText = document.getElementById('statusText');
    
    if (!statusBox || !statusText) return;
    
    statusText.textContent = message;
    
    // Reset classes
    statusBox.className = 'status-box';
    
    // Adicionar classe baseada no tipo
    if (type === 'error') {
        statusBox.classList.add('error');
    } else if (type === 'success') {
        statusBox.classList.add('success');
    } else if (type === 'warning') {
        statusBox.classList.add('warning');
    } else if (type === 'loading') {
        statusText.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${message}`;
    }
}

function simulateAnalysis(repo) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                files: 42,
                size: '1.2 MB',
                languages: ['JavaScript', 'HTML', 'CSS'],
                dependencies: ['axios@1.4.0', 'chart.js@4.3.0'],
                structure: {
                    name: repo,
                    type: 'folder',
                    children: [
                        { name: 'src', type: 'folder' },
                        { name: 'public', type: 'folder' },
                        { name: 'package.json', type: 'file', size: '1.2 KB' }
                    ]
                }
            });
        }, 1000);
    });
}

function updateResults(data) {
    // Atualizar contadores no footer
    const fileCount = document.getElementById('fileCount');
    const repoSize = document.getElementById('repoSize');
    
    if (fileCount) fileCount.textContent = `${data.files} arquivos`;
    if (repoSize) repoSize.textContent = data.size;
    
    // Atualizar métricas
    updateMetrics(data);
    
    // Atualizar árvore
    updateTree(data.structure);
}

function updateMetrics(data) {
    const metricsGrid = document.getElementById('metricsGrid');
    if (!metricsGrid) return;
    
    const metrics = [
        { label: 'Arquivos', value: data.files, icon: 'fa-file' },
        { label: 'Tamanho', value: data.size, icon: 'fa-database' },
        { label: 'Linguagens', value: data.languages.length, icon: 'fa-code' },
        { label: 'Dependências', value: data.dependencies.length, icon: 'fa-box' }
    ];
    
    metricsGrid.innerHTML = metrics.map(metric => `
        <div class="metric-card">
            <div class="metric-value">
                <i class="fas ${metric.icon}"></i>
                ${metric.value}
            </div>
            <div class="metric-label">${metric.label}</div>
        </div>
    `).join('');
}

function updateTree(structure) {
    const treeContainer = document.getElementById('treeContainer');
    if (!treeContainer) return;
    
    treeContainer.innerHTML = `
        <div class="tree-node">
            <div class="tree-node-header folder">
                <i class="fas fa-folder-open"></i>
                <span class="tree-name">${structure.name}</span>
                <span class="tree-badge">${structure.type}</span>
            </div>
            <div class="tree-node-children">
                ${structure.children.map(child => `
                    <div class="tree-node">
                        <div class="tree-node-header ${child.type}">
                            <i class="fas ${child.type === 'folder' ? 'fa-folder' : 'fa-file'}"></i>
                            <span class="tree-name">${child.name}</span>
                            ${child.size ? `<span class="tree-size">${child.size}</span>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function testComponents() {
    // Testar se todos os componentes estão carregados
    console.log('Testando componentes...');
    
    const requiredIds = [
        'themeToggle', 'analyzeBtn', 'repoInput',
        'clearCacheBtn', 'refreshBtn', 'statusBox'
    ];
    
    requiredIds.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Elemento #${id} não encontrado`);
        } else {
            console.log(`✓ ${id} OK`);
        }
    });
    
    // Verificar se as bibliotecas externas estão carregadas
    if (typeof Chart !== 'undefined') {
        console.log('✓ Chart.js carregado');
    } else {
        console.warn('Chart.js não encontrado');
    }
    
    if (typeof d3 !== 'undefined') {
        console.log('✓ D3.js carregado');
    } else {
        console.warn('D3.js não encontrado');
    }
}

// Exportar para uso global (se necessário)
window.CodeCartographer = {
    init: initCodeCartographer,
    showStatus: showStatus,
    analyze: simulateAnalysis
};
