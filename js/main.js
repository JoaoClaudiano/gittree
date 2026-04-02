// Main entry point – app initialization and control wiring

document.addEventListener('DOMContentLoaded', () => {
    console.log('🌳 GitTree v1.0 inicializando...');
    initApp();
});

function initApp() {
    initTheme();
    initViews();
    initControls();
    initCache();
    initSidebarToggle();
    initKeyboardShortcuts();
    loadDefaultRepo();

    console.log('✅ GitTree v1.0 inicializado');
}

function initSidebarToggle() {
    const toggleBtn = document.getElementById('sidebarToggleBtn');
    const collapsible = document.getElementById('sidebarCollapsible');
    if (!toggleBtn || !collapsible) return;

    toggleBtn.addEventListener('click', () => {
        const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', String(!expanded));
        collapsible.classList.toggle('expanded', !expanded);
        const label = toggleBtn.querySelector('span');
        if (label) {
            label.textContent = !expanded ? 'Hide Controls' : 'Show Controls';
        }
    });
}

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        const activeElementTag = document.activeElement && document.activeElement.tagName;
        const isTyping = activeElementTag === 'INPUT' || activeElementTag === 'TEXTAREA' || activeElementTag === 'SELECT';

        if (e.ctrlKey && e.shiftKey && !isTyping) {
            switch (e.key.toUpperCase()) {
                case 'C':
                    e.preventDefault();
                    copyTreeAsText();
                    break;
                case 'E':
                    e.preventDefault();
                    expandAllTreeNodes(true);
                    break;
                case 'L':
                    e.preventDefault();
                    expandAllTreeNodes(false);
                    break;
            }
        }
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
                    showStatus(t('statusPasted'), 'success');
                    repoInput.focus();
                }
            } catch (err) {
                console.error('Falha ao colar:', err);
                showStatus(t('statusClipboardError'), 'error');
            }
        });
    }

    if (clearCacheBtn) {
        clearCacheBtn.addEventListener('click', () => {
            if (confirm(t('confirmClearCache'))) {
                localStorage.clear();
                updateCacheStatus();
                showStatus(t('statusCacheCleared'), 'success');
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

    // Inline suggestion for common typo
    const input = document.getElementById('repoInput');
    if (input) {
        input.addEventListener('blur', () => {
            const value = input.value.trim();
            if (value && value.includes('geocsvps')) {
                showStatus('Sugestão: tente "JoaoClaudiano/geocsv"', 'info');
            }
        });
    }
}

function testRepo(repo) {
    document.getElementById('repoInput').value = repo;
    analyzeRepository();
}

window.GitTree = {
    test: testRepo,
    analyze: analyzeRepository
};

console.log('🌳 GitTree v1.0 carregado!');
console.log('Teste com: GitTree.test("facebook/react")');
