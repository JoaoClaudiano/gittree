// UI functions – theme, loading states, status messages, cache display

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
    const themeToggle = document.getElementById('themeToggle');
    const ICON_MOON = '<svg width="1em" height="1em" class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
    const ICON_SUN  = '<svg width="1em" height="1em" class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    if (isLight) {
        themeToggle.innerHTML = ICON_SUN;
        themeToggle.title = t('themeToggleLight');
    } else {
        themeToggle.innerHTML = ICON_MOON;
        themeToggle.title = t('themeToggleDark');
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

function showLoading(show) {
    const loading = document.getElementById('loadingState');
    const btn = document.getElementById('analyzeBtn');

    showSkeletonInTree(show);

    if (loading) loading.classList.toggle('hidden', !show);
    if (btn) {
        btn.disabled = show;
        btn.innerHTML = '';
        const icon = document.createElement('i');
        icon.className = show ? 'fas fa-spinner fa-spin' : 'fas fa-eye';
        const span = document.createElement('span');
        span.textContent = show ? t('btnLoading') : t('btnVisualize');
        btn.appendChild(icon);
        btn.appendChild(document.createTextNode(' '));
        btn.appendChild(span);
    }
}

function showStatus(message, type = 'info') {
    const box = document.getElementById('statusBox');
    const text = document.getElementById('statusText');

    if (!box || !text) return;

    // Whitelist type to ensure only safe class names are injected into the DOM
    const validTypes = ['info', 'success', 'error', 'warning'];
    const safeType = validTypes.includes(type) ? type : 'info';

    box.className = 'status-box';
    box.classList.add(safeType);

    const icons = {
        info: 'fa-info-circle',
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle'
    };

    text.innerHTML = '';
    const statusIcon = document.createElement('i');
    statusIcon.className = 'fas ' + icons[safeType];
    text.appendChild(statusIcon);
    text.appendChild(document.createTextNode(' ' + message));
}

function showSkeletonInTree(show) {
    const treeContainer = document.getElementById('treeContainer');
    if (!treeContainer) return;

    if (show) {
        treeContainer.innerHTML = '';
        const skeleton = createSkeletonScreen();
        treeContainer.appendChild(skeleton);
    } else {
        const skeleton = treeContainer.querySelector('.skeleton-container');
        if (skeleton) {
            skeleton.remove();
        }
    }
}

function createSkeletonScreen() {
    const container = document.createElement('div');
    container.className = 'skeleton-container';
    container.setAttribute('aria-hidden', 'true');

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

    items.forEach((item) => {
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

function updateCacheStatus() {
    const cacheStatus = document.getElementById('cacheStatus');
    if (!cacheStatus) return;

    let totalChars = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        totalChars += key.length + value.length;
    }

    // Each JS character is 2 bytes (UTF-16)
    const totalBytes = totalChars * 2;
    let sizeLabel;
    if (totalBytes === 0) {
        sizeLabel = '0 KB';
    } else if (totalBytes < 1024) {
        sizeLabel = totalBytes + ' B';
    } else {
        sizeLabel = (totalBytes / 1024).toFixed(1) + ' KB';
    }
    cacheStatus.innerHTML = '';
    const dbIcon = document.createElement('i');
    dbIcon.className = 'fas fa-database';
    cacheStatus.appendChild(dbIcon);
    cacheStatus.appendChild(document.createTextNode(' ' + t('cacheLabel').replace('{size}', sizeLabel)));
}

function showAppContent() {
    const app = document.getElementById('app');
    if (app) app.classList.remove('no-repo');
}

function loadDefaultRepo() {
    const lastRepo = localStorage.getItem('last-repo');
    if (lastRepo) {
        document.getElementById('repoInput').value = lastRepo;
    }
}

function initCache() {
    updateCacheStatus();
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

function copyTreeAsText() {
    const treeContainer = document.getElementById('treeContainer');
    if (!treeContainer) {
        showStatus(t('statusNoTree'), 'warning');
        return;
    }

    function collectTreeNodes(node, depth = 0, lines = []) {
        const children = node.querySelector('.tree-node-children');
        const header = node.querySelector('.tree-node-header');

        if (header) {
            const icon = header.querySelector('.tree-icon');
            const nameElem = header.querySelector('.tree-name');
            const isFolder = header.classList.contains('folder');

            if (nameElem) {
                const prefix = depth === 0 ? '' : '  '.repeat(depth - 1) + (children ? '├── ' : '└── ');
                const name = nameElem.textContent;
                const suffix = isFolder ? '/' : '';
                lines.push(prefix + name + suffix);
            }
        }

        if (children && children.dataset.expanded === 'true') {
            const childNodes = children.querySelectorAll(':scope > .tree-node');
            childNodes.forEach(child => collectTreeNodes(child, depth + 1, lines));
        }

        return lines;
    }

    const allNodes = treeContainer.querySelectorAll(':scope > .tree-node');
    let allLines = [];

    allNodes.forEach(node => {
        allLines = collectTreeNodes(node, 0, allLines);
    });

    if (allLines.length === 0) {
        showStatus(t('statusEmptyTree'), 'warning');
        return;
    }

    const textToCopy = allLines.join('\n');
    navigator.clipboard.writeText(textToCopy)
        .then(() => showStatus(t('statusCopied'), 'success'))
        .catch(err => {
            console.error('Erro ao copiar:', err);
            showStatus(t('statusCopyError'), 'error');
        });
}
