// Main entry point – app initialization and control wiring

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    initTheme();
    initViews();
    initControls();
    initCache();
    initSidebarToggle();
    initKeyboardShortcuts();
    initMobileDrawer();
    loadDefaultRepo();
    if (typeof updateRateLimitDisplay === 'function') updateRateLimitDisplay();
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

// ---- Keyboard Shortcuts Help Panel ----
let _shortcutsPanelOpen = false;

function showShortcutsPanel() {
    if (_shortcutsPanelOpen) { closeShortcutsPanel(); return; }
    _shortcutsPanelOpen = true;

    const overlay = document.createElement('div');
    overlay.className = 'shortcuts-overlay';
    overlay.id = 'shortcutsOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'shortcutsTitle');

    const panel = document.createElement('div');
    panel.className = 'shortcuts-panel';

    const header = document.createElement('div');
    header.className = 'shortcuts-header';

    const title = document.createElement('div');
    title.className = 'shortcuts-title';
    title.id = 'shortcutsTitle';
    title.innerHTML = '<i class="fas fa-keyboard" aria-hidden="true"></i> ' + t('shortcutsTitle');

    const closeBtn = document.createElement('button');
    closeBtn.className = 'shortcuts-close';
    closeBtn.setAttribute('aria-label', 'Close shortcuts panel');
    closeBtn.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
    closeBtn.addEventListener('click', closeShortcutsPanel);

    header.appendChild(title);
    header.appendChild(closeBtn);

    const grid = document.createElement('div');
    grid.className = 'shortcuts-grid';

    const shortcuts = [
        { desc: t('shortcutFocusInput'),  keys: ['Ctrl', 'K'] },
        { desc: t('shortcutSearch'),      keys: ['/'] },
        { desc: t('shortcutExpand'),      keys: ['Ctrl', '⇧', 'E'] },
        { desc: t('shortcutCollapse'),    keys: ['Ctrl', '⇧', 'L'] },
        { desc: t('shortcutCopy'),        keys: ['Ctrl', '⇧', 'C'] },
        { desc: t('shortcutClose'),       keys: ['Esc'] },
        { desc: t('shortcutHelp'),        keys: ['?'] },
    ];

    shortcuts.forEach(function (s) {
        const row = document.createElement('div');
        row.className = 'shortcut-row';

        const desc = document.createElement('span');
        desc.className = 'shortcut-desc';
        desc.textContent = s.desc;

        const keysEl = document.createElement('div');
        keysEl.className = 'shortcut-keys';

        s.keys.forEach(function (k, idx) {
            if (idx > 0) {
                const plus = document.createElement('span');
                plus.className = 'shortcut-plus';
                plus.textContent = '+';
                keysEl.appendChild(plus);
            }
            const keyEl = document.createElement('kbd');
            keyEl.className = 'shortcut-key';
            keyEl.textContent = k;
            keysEl.appendChild(keyEl);
        });

        row.appendChild(desc);
        row.appendChild(keysEl);
        grid.appendChild(row);
    });

    panel.appendChild(header);
    panel.appendChild(grid);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeShortcutsPanel();
    });

    closeBtn.focus();
}

function closeShortcutsPanel() {
    const overlay = document.getElementById('shortcutsOverlay');
    if (overlay) overlay.remove();
    _shortcutsPanelOpen = false;
}

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        const activeElementTag = document.activeElement && document.activeElement.tagName;
        const isTyping = activeElementTag === 'INPUT' || activeElementTag === 'TEXTAREA' || activeElementTag === 'SELECT';

        // Ctrl+K — focus repo input (global, even when typing elsewhere)
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            const input = document.getElementById('repoInput');
            if (input) { input.focus(); input.select(); }
            return;
        }

        if (!isTyping) {
            // ? — show shortcuts panel
            if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                showShortcutsPanel();
                return;
            }

            // / — focus tree search
            if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                const treeSearch = document.getElementById('treeSearch');
                if (treeSearch) { treeSearch.focus(); treeSearch.select(); }
                return;
            }
        }

        // Escape — close open modals
        if (e.key === 'Escape') {
            if (_shortcutsPanelOpen) { closeShortcutsPanel(); return; }
            if (window.GitTree2026 && window.GitTree2026.bentoMetadataPanelOpen) {
                window.GitTree2026.bentoMetadataPanelOpen = false;
                if (typeof renderBentoPanel === 'function') renderBentoPanel();
            }
            if (typeof closeRecentReposDropdown === 'function') closeRecentReposDropdown();
        }

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

// ---- Share URL ----
function shareCurrentRepo() {
    const input = document.getElementById('repoInput');
    if (!input || !input.value.trim()) {
        if (typeof showToast === 'function') showToast(t('shareNoRepo'), 'warning');
        else showStatus(t('shareNoRepo'), 'warning');
        return;
    }
    try {
        const { owner, repo } = extractRepoInfo(input.value.trim());
        const url = window.location.origin + window.location.pathname + '?repo=' + encodeURIComponent(owner + '/' + repo);
        navigator.clipboard.writeText(url)
            .then(() => {
                if (typeof showToast === 'function') showToast(t('shareCopied'), 'success');
                else showStatus(t('shareCopied'), 'success');
            })
            .catch(() => showStatus(url, 'info'));
    } catch (err) {
        showStatus(err.message, 'error');
    }
}

// ---- Mobile Bottom Sheet ----
function initMobileDrawer() {
    const fab = document.getElementById('mobileSidebarFab');
    const drawer = document.getElementById('mobileSidebarDrawer');
    const drawerOverlay = document.getElementById('mobileDrawerOverlay');
    const closeBtn = document.getElementById('mobileDrawerClose');

    if (!fab || !drawer) return;

    function openDrawer() {
        drawer.classList.add('open');
        if (drawerOverlay) drawerOverlay.classList.add('open');
        fab.classList.add('hidden');
        drawer.setAttribute('aria-hidden', 'false');
    }

    function closeDrawer() {
        drawer.classList.remove('open');
        if (drawerOverlay) drawerOverlay.classList.remove('open');
        fab.classList.remove('hidden');
        drawer.setAttribute('aria-hidden', 'true');
    }

    fab.addEventListener('click', openDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    const mobileVisualizeBtn = document.getElementById('mobileVisualizeBtn');
    if (mobileVisualizeBtn) {
        mobileVisualizeBtn.addEventListener('click', function () {
            const mobileInput = document.getElementById('mobileRepoInput');
            const desktopInput = document.getElementById('repoInput');
            if (mobileInput && desktopInput) desktopInput.value = mobileInput.value;
            closeDrawer();
            analyzeRepository();
        });
    }

    // Swipe-to-close: track touch movement on the drawer handle
    let touchStartY = 0;
    drawer.addEventListener('touchstart', function (e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    drawer.addEventListener('touchend', function (e) {
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (dy > 60) closeDrawer();
    }, { passive: true });
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
    const shareBtn = document.getElementById('shareBtn');
    const shortcutsBtn = document.getElementById('shortcutsBtn');

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
                    if (typeof showToast === 'function') showToast(t('statusPasted'), 'success');
                    else showStatus(t('statusPasted'), 'success');
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
                // Preserve user preferences; only remove repository cache entries
                const preserve = new Set(['gittree-theme', 'gittree-language', 'cookie_consent', 'cookie_analytics', 'cookie_marketing', 'gittree-recent-repos']);
                const toRemove = [];
                const len = localStorage.length;
                for (let i = 0; i < len; i++) {
                    const key = localStorage.key(i);
                    if (!preserve.has(key)) toRemove.push(key);
                }
                toRemove.forEach(key => localStorage.removeItem(key));
                updateCacheStatus();
                if (typeof showToast === 'function') showToast(t('statusCacheCleared'), 'success');
                else showStatus(t('statusCacheCleared'), 'success');
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

    if (shareBtn) {
        shareBtn.addEventListener('click', shareCurrentRepo);
    }

    if (shortcutsBtn) {
        shortcutsBtn.addEventListener('click', showShortcutsPanel);
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
