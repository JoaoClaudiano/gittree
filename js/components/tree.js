// Tree building and rendering functions

// Stores pending children for lazy rendering (populated in renderTreeNode, consumed on expand)
const _lazyChildren = new WeakMap();

// Track total items in the current tree to guard expensive operations on large repos
let _totalTreeItems = 0;
const LARGE_REPO_THRESHOLD = 5000;

// Language color map – mirrors GitHub's linguist colors
const LANG_COLORS = {
    js:    '#f1e05a', jsx:   '#f1e05a', mjs:  '#f1e05a', cjs: '#f1e05a',
    ts:    '#3178c6', tsx:   '#3178c6',
    py:    '#3572A5',
    rb:    '#701516',
    java:  '#b07219',
    go:    '#00ADD8',
    rs:    '#dea584',
    cpp:   '#f34b7d', cc:   '#f34b7d', cxx: '#f34b7d',
    c:     '#555555', h:    '#555555',
    cs:    '#239120',
    php:   '#4F5D95',
    swift: '#F05138',
    kt:    '#A97BFF', kts:  '#A97BFF',
    r:     '#198CE7',
    scala: '#c22d40',
    dart:  '#00B4AB',
    lua:   '#000080',
    pl:    '#0298c3',
    sh:    '#89e051',  bash: '#89e051', zsh: '#89e051',
    html:  '#e34c26',
    css:   '#563d7c',
    scss:  '#c6538c', sass: '#c6538c',
    less:  '#1d365d',
    vue:   '#41b883',
    svelte:'#FF3E00',
    json:  '#cbcb41',
    yaml:  '#cb171e', yml: '#cb171e',
    xml:   '#0060ac',
    md:    '#083fa1', mdx: '#083fa1',
    sql:   '#e38c00',
    dockerfile: '#384d54',
    makefile:   '#427819',
    gradle:     '#02303a',
    toml:  '#9c4221',
    lock:  '#94a3b8',
};

function _getLangColor(filename) {
    if (!filename) return null;
    const lower = filename.toLowerCase();
    // Special whole-name matches
    if (lower === 'dockerfile') return LANG_COLORS['dockerfile'];
    if (lower === 'makefile')   return LANG_COLORS['makefile'];
    if (lower === 'gemfile')    return LANG_COLORS['rb'];
    if (lower.endsWith('.lock')) return LANG_COLORS['lock'];

    const parts = lower.split('.');
    if (parts.length < 2) return null;
    const ext = parts[parts.length - 1];
    return LANG_COLORS[ext] || null;
}

function buildFileTree(files) {
    const root = { name: '/', type: 'folder', children: [], path: '' };
    const nodeMap = new Map();
    nodeMap.set('', root);

    files.forEach(item => {
        const pathParts = item.path.split('/');

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

function renderTree(treeData) {
    const treeContainer = document.getElementById('treeContainer');
    if (!treeContainer || !treeData.tree) return;

    _totalTreeItems = treeData.tree.length;

    const root = buildFileTree(treeData.tree);
    treeContainer.innerHTML = '';

    // Use event delegation: one listener handles all folder clicks, including lazily rendered ones
    treeContainer.removeEventListener('click', _handleTreeNodeClick);
    treeContainer.addEventListener('click', _handleTreeNodeClick);

    renderTreeNode(treeContainer, root);

    // Reset breadcrumb to root
    updateBreadcrumb([]);

    setTimeout(() => {
        expandFirstLevel();
    }, 0);
}

function _renderLazyChildren(childrenContainer) {
    if (childrenContainer.dataset.lazy !== 'true') return;
    const lazyData = _lazyChildren.get(childrenContainer);
    if (lazyData) {
        lazyData.children.forEach(child => renderTreeNode(childrenContainer, child, lazyData.depth + 1));
        _lazyChildren.delete(childrenContainer);
    }
    delete childrenContainer.dataset.lazy;
}

function _handleTreeNodeClick(e) {
    // File click: open detail panel
    const fileHeader = e.target.closest('.tree-node-header.file');
    if (fileHeader) {
        e.stopPropagation();
        const node = fileHeader.closest('.tree-node');
        const path = node ? node.dataset.path : '';
        const name = fileHeader.querySelector('.tree-name') ? fileHeader.querySelector('.tree-name').textContent : '';
        const sizeEl = fileHeader.querySelector('.tree-size');
        const sizeText = sizeEl ? sizeEl.textContent : '0 B';

        // Parse size back to bytes (approximate, for display)
        const ext = name.includes('.') ? name.split('.').pop().toLowerCase() : '';
        const langColor = _getLangColor(name);

        if (window.GitTree2026) {
            window.GitTree2026.selectedFile = {
                name: name,
                path: path,
                extension: ext,
                sizeKB: 0,
                sizeDisplay: sizeText,
                language: ext ? ext.toUpperCase() : t('unknownLanguage'),
                langColor: langColor,
                githubUrl: _buildGithubUrl(path)
            };
            window.GitTree2026.bentoMetadataPanelOpen = true;
            if (typeof renderBentoPanel === 'function') renderBentoPanel();
        }
        return;
    }

    const header = e.target.closest('.tree-node-header.folder');
    if (!header) return;
    e.stopPropagation();

    const node = header.closest('.tree-node');
    const children = node.querySelector(':scope > .tree-node-children');
    const icon = header.querySelector('.tree-icon');

    if (!children) return;

    // Update breadcrumb path on folder expand
    const folderPath = node.dataset.path || '';
    const isExpanded = children.dataset.expanded === 'true';

    if (!isExpanded) {
        // Render children lazily on first expand
        _renderLazyChildren(children);
        children.dataset.expanded = 'true';
        children.classList.add('expanded');
        // Pin at 0 so the transition always starts from the correct value,
        // then animate to the actual content height for a smooth expansion.
        children.style.maxHeight = '0';
        const targetHeight = children.scrollHeight;
        children.style.maxHeight = targetHeight + 'px';
        children.addEventListener('transitionend', function onExpanded() {
            children.removeEventListener('transitionend', onExpanded);
            // Remove the inline constraint so nested expansions can grow freely.
            if (children.dataset.expanded === 'true') {
                children.style.maxHeight = '';
            }
        });
        icon.classList.remove('collapsed');
        icon.classList.add('expanded');

        // Update breadcrumb to reflect expanded folder
        if (folderPath) {
            updateBreadcrumb(folderPath.split('/'));
        }
    } else {
        // Lock at the real rendered height before animating to 0 so the
        // collapse always starts from the correct value (not from 5000px).
        children.style.maxHeight = children.scrollHeight + 'px';
        children.dataset.expanded = 'false';
        children.classList.remove('expanded');
        // Double rAF ensures the locked height is committed before we set 0.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                children.style.maxHeight = '0';
            });
        });
        icon.classList.remove('expanded');
        icon.classList.add('collapsed');
    }
}

function _buildGithubUrl(path) {
    const repoInput = document.getElementById('repoInput');
    if (!repoInput || !repoInput.value) return '#';
    const val = repoInput.value.trim();
    // strip https://github.com/ prefix if present
    const clean = val.replace(/^https?:\/\/github\.com\//, '').replace(/\.git$/, '');
    if (!clean.includes('/')) return '#';
    return 'https://github.com/' + clean + '/blob/HEAD/' + path;
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
    header.setAttribute('tabindex', '0');
    header.setAttribute('role', 'button');
    header.setAttribute('aria-label', isFolder
        ? (node.name + ' — folder, ' + (node.children ? node.children.length : 0) + ' items')
        : (node.name + ' — file' + (node.size > 0 ? ', ' + formatBytes(node.size) : '')));

    const langColor = isFolder ? null : _getLangColor(node.name);

    const icon = document.createElement('i');
    icon.className = `tree-icon fas ${isFolder ? 'fa-folder' : 'fa-file'}`;
    if (isFolder && hasChildren) icon.classList.add('collapsed');
    if (!isFolder && langColor) {
        icon.style.color = langColor;
    }

    // Language dot for files
    if (!isFolder && langColor) {
        const dot = document.createElement('span');
        dot.className = 'lang-dot';
        dot.style.background = langColor;
        dot.setAttribute('aria-hidden', 'true');
        header.appendChild(icon);
        header.appendChild(dot);
    } else {
        header.appendChild(icon);
    }

    const name = document.createElement('span');
    name.className = 'tree-name';
    name.textContent = node.name;

    const badge = document.createElement('span');
    badge.className = 'tree-badge';
    badge.setAttribute('data-i18n', isFolder ? 'treeBadgeFolder' : 'treeBadgeFile');
    badge.textContent = t(isFolder ? 'treeBadgeFolder' : 'treeBadgeFile');

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

    header.appendChild(name);
    header.appendChild(badge);
    nodeElement.appendChild(header);

    if (isFolder && hasChildren) {
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'tree-node-children';
        childrenContainer.dataset.expanded = 'false';

        // Store children for lazy rendering — DOM nodes are only created when the folder is opened
        childrenContainer.dataset.lazy = 'true';
        _lazyChildren.set(childrenContainer, { children: node.children, depth });

        nodeElement.appendChild(childrenContainer);
    }

    container.appendChild(nodeElement);
}

// attachTreeEvents is a no-op: click handling is done via event delegation set up in renderTree
function attachTreeEvents() {}

function expandFirstLevel() {
    const treeContainer = document.getElementById('treeContainer');
    if (!treeContainer) return;

    // Only expand direct children of the root node (one level deep)
    treeContainer.querySelectorAll(':scope > .tree-node > .tree-node-children').forEach(container => {
        _renderLazyChildren(container);

        const header = container.parentElement.querySelector('.tree-node-header');
        const icon = header?.querySelector('.tree-icon');
        if (header && icon) {
            container.dataset.expanded = 'true';
            container.classList.add('expanded');
            icon.classList.remove('collapsed');
            icon.classList.add('expanded');
        }
    });
}

function expandAllTreeNodes(expand = true) {
    if (expand && _totalTreeItems > LARGE_REPO_THRESHOLD) {
        showStatus(t('statusLargeRepoExpandAll') || 'Repository too large to expand fully. Click folders to navigate or use search.', 'warning');
        return;
    }

    if (expand) {
        // Iteratively render all lazy containers so every node becomes visible
        let lazyContainers = document.querySelectorAll('.tree-node-children[data-lazy="true"]');
        while (lazyContainers.length > 0) {
            lazyContainers.forEach(container => _renderLazyChildren(container));
            lazyContainers = document.querySelectorAll('.tree-node-children[data-lazy="true"]');
        }
    }

    // Disable CSS transitions for the bulk operation so there is no
    // artificial delay or abruptness from the max-height animation.
    const noTransition = document.createElement('style');
    noTransition.textContent = '.tree-node-children { transition: none !important; }';
    document.head.appendChild(noTransition);

    document.querySelectorAll('.tree-node-children').forEach(container => {
        container.style.maxHeight = ''; // Clear any JS-driven inline styles
        container.dataset.expanded = expand.toString();
        container.classList.toggle('expanded', expand);
    });

    document.querySelectorAll('.tree-node-header.folder .tree-icon').forEach(icon => {
        icon.classList.toggle('collapsed', !expand);
        icon.classList.toggle('expanded', expand);
    });

    // Re-enable transitions after the browser has painted the new state.
    requestAnimationFrame(() => {
        document.head.removeChild(noTransition);
    });
}

function searchTree(query) {
    const searchTerm = query.toLowerCase().trim();

    // Render all lazy children first so search covers the entire tree
    let lazyContainers = document.querySelectorAll('.tree-node-children[data-lazy="true"]');
    while (lazyContainers.length > 0) {
        lazyContainers.forEach(container => _renderLazyChildren(container));
        lazyContainers = document.querySelectorAll('.tree-node-children[data-lazy="true"]');
    }

    const nodes = document.querySelectorAll('.tree-node');

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
    let el = node.parentElement;
    while (el) {
        if (el.classList.contains('tree-node-children')) {
            const parentNode = el.parentElement;
            const icon = parentNode?.querySelector(':scope > .tree-node-header .tree-icon');
            el.dataset.expanded = 'true';
            el.classList.add('expanded');
            // Clear any inline max-height so the .expanded CSS rule takes effect immediately.
            el.style.maxHeight = '';
            if (icon) {
                icon.classList.remove('collapsed');
                icon.classList.add('expanded');
            }
        }
        // Ancestor tree-node elements were hidden by searchTree; make them visible.
        if (el.classList.contains('tree-node')) {
            el.style.display = '';
        }
        if (el.id === 'treeContainer') break;
        el = el.parentElement;
    }
}

// ---- Breadcrumb ----
function updateBreadcrumb(pathParts) {
    const bc = document.getElementById('treeBreadcrumb');
    if (!bc) return;

    bc.innerHTML = '';

    // Root item
    const rootBtn = document.createElement('button');
    rootBtn.className = 'tree-breadcrumb-item' + (pathParts.length === 0 ? ' active' : '');
    rootBtn.setAttribute('aria-label', t('breadcrumbRoot'));
    rootBtn.innerHTML = '<i class="fas fa-home" aria-hidden="true"></i> ' + t('breadcrumbRoot');
    rootBtn.addEventListener('click', function () {
        if (pathParts.length > 0) updateBreadcrumb([]);
    });
    bc.appendChild(rootBtn);

    pathParts.forEach(function (part, idx) {
        const sep = document.createElement('span');
        sep.className = 'tree-breadcrumb-sep';
        sep.setAttribute('aria-hidden', 'true');
        sep.textContent = '/';
        bc.appendChild(sep);

        const btn = document.createElement('button');
        const isLast = idx === pathParts.length - 1;
        btn.className = 'tree-breadcrumb-item' + (isLast ? ' active' : '');
        btn.textContent = part;
        if (!isLast) {
            const slicedPath = pathParts.slice(0, idx + 1);
            btn.addEventListener('click', function () { updateBreadcrumb(slicedPath); });
        }
        bc.appendChild(btn);
    });
}

function buildFileTree(files) {
    const root = { name: '/', type: 'folder', children: [], path: '' };
    const nodeMap = new Map();
    nodeMap.set('', root);

    files.forEach(item => {
        const pathParts = item.path.split('/');

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

function renderTree(treeData) {
    const treeContainer = document.getElementById('treeContainer');
    if (!treeContainer || !treeData.tree) return;

    _totalTreeItems = treeData.tree.length;

    const root = buildFileTree(treeData.tree);
    treeContainer.innerHTML = '';

    // Use event delegation: one listener handles all folder clicks, including lazily rendered ones
    treeContainer.removeEventListener('click', _handleTreeNodeClick);
    treeContainer.addEventListener('click', _handleTreeNodeClick);

    renderTreeNode(treeContainer, root);

    setTimeout(() => {
        expandFirstLevel();
    }, 0);
}

function _renderLazyChildren(childrenContainer) {
    if (childrenContainer.dataset.lazy !== 'true') return;
    const lazyData = _lazyChildren.get(childrenContainer);
    if (lazyData) {
        lazyData.children.forEach(child => renderTreeNode(childrenContainer, child, lazyData.depth + 1));
        _lazyChildren.delete(childrenContainer);
    }
    delete childrenContainer.dataset.lazy;
}

function _handleTreeNodeClick(e) {
    const header = e.target.closest('.tree-node-header.folder');
    if (!header) return;
    e.stopPropagation();

    const node = header.closest('.tree-node');
    const children = node.querySelector(':scope > .tree-node-children');
    const icon = header.querySelector('.tree-icon');

    if (!children) return;

    const isExpanded = children.dataset.expanded === 'true';
    if (!isExpanded) {
        // Render children lazily on first expand
        _renderLazyChildren(children);
        children.dataset.expanded = 'true';
        children.classList.add('expanded');
        // Pin at 0 so the transition always starts from the correct value,
        // then animate to the actual content height for a smooth expansion.
        children.style.maxHeight = '0';
        const targetHeight = children.scrollHeight;
        children.style.maxHeight = targetHeight + 'px';
        children.addEventListener('transitionend', function onExpanded() {
            children.removeEventListener('transitionend', onExpanded);
            // Remove the inline constraint so nested expansions can grow freely.
            if (children.dataset.expanded === 'true') {
                children.style.maxHeight = '';
            }
        });
        icon.classList.remove('collapsed');
        icon.classList.add('expanded');
    } else {
        // Lock at the real rendered height before animating to 0 so the
        // collapse always starts from the correct value (not from 5000px).
        children.style.maxHeight = children.scrollHeight + 'px';
        children.dataset.expanded = 'false';
        children.classList.remove('expanded');
        // Double rAF ensures the locked height is committed before we set 0.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                children.style.maxHeight = '0';
            });
        });
        icon.classList.remove('expanded');
        icon.classList.add('collapsed');
    }
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
    badge.setAttribute('data-i18n', isFolder ? 'treeBadgeFolder' : 'treeBadgeFile');
    badge.textContent = t(isFolder ? 'treeBadgeFolder' : 'treeBadgeFile');

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

        // Store children for lazy rendering — DOM nodes are only created when the folder is opened
        childrenContainer.dataset.lazy = 'true';
        _lazyChildren.set(childrenContainer, { children: node.children, depth });

        nodeElement.appendChild(childrenContainer);
    }

    container.appendChild(nodeElement);
}

// attachTreeEvents is a no-op: click handling is done via event delegation set up in renderTree
function attachTreeEvents() {}

function expandFirstLevel() {
    const treeContainer = document.getElementById('treeContainer');
    if (!treeContainer) return;

    // Only expand direct children of the root node (one level deep)
    treeContainer.querySelectorAll(':scope > .tree-node > .tree-node-children').forEach(container => {
        _renderLazyChildren(container);

        const header = container.parentElement.querySelector('.tree-node-header');
        const icon = header?.querySelector('.tree-icon');
        if (header && icon) {
            container.dataset.expanded = 'true';
            container.classList.add('expanded');
            icon.classList.remove('collapsed');
            icon.classList.add('expanded');
        }
    });
}

function expandAllTreeNodes(expand = true) {
    if (expand && _totalTreeItems > LARGE_REPO_THRESHOLD) {
        showStatus(t('statusLargeRepoExpandAll') || 'Repository too large to expand fully. Click folders to navigate or use search.', 'warning');
        return;
    }

    if (expand) {
        // Iteratively render all lazy containers so every node becomes visible
        let lazyContainers = document.querySelectorAll('.tree-node-children[data-lazy="true"]');
        while (lazyContainers.length > 0) {
            lazyContainers.forEach(container => _renderLazyChildren(container));
            lazyContainers = document.querySelectorAll('.tree-node-children[data-lazy="true"]');
        }
    }

    // Disable CSS transitions for the bulk operation so there is no
    // artificial delay or abruptness from the max-height animation.
    const noTransition = document.createElement('style');
    noTransition.textContent = '.tree-node-children { transition: none !important; }';
    document.head.appendChild(noTransition);

    document.querySelectorAll('.tree-node-children').forEach(container => {
        container.style.maxHeight = ''; // Clear any JS-driven inline styles
        container.dataset.expanded = expand.toString();
        container.classList.toggle('expanded', expand);
    });

    document.querySelectorAll('.tree-node-header.folder .tree-icon').forEach(icon => {
        icon.classList.toggle('collapsed', !expand);
        icon.classList.toggle('expanded', expand);
    });

    // Re-enable transitions after the browser has painted the new state.
    requestAnimationFrame(() => {
        document.head.removeChild(noTransition);
    });
}

function searchTree(query) {
    const searchTerm = query.toLowerCase().trim();

    // Render all lazy children first so search covers the entire tree
    let lazyContainers = document.querySelectorAll('.tree-node-children[data-lazy="true"]');
    while (lazyContainers.length > 0) {
        lazyContainers.forEach(container => _renderLazyChildren(container));
        lazyContainers = document.querySelectorAll('.tree-node-children[data-lazy="true"]');
    }

    const nodes = document.querySelectorAll('.tree-node');

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
    let el = node.parentElement;
    while (el) {
        if (el.classList.contains('tree-node-children')) {
            const parentNode = el.parentElement;
            const icon = parentNode?.querySelector(':scope > .tree-node-header .tree-icon');
            el.dataset.expanded = 'true';
            el.classList.add('expanded');
            // Clear any inline max-height so the .expanded CSS rule takes effect immediately.
            el.style.maxHeight = '';
            if (icon) {
                icon.classList.remove('collapsed');
                icon.classList.add('expanded');
            }
        }
        // Ancestor tree-node elements were hidden by searchTree; make them visible.
        if (el.classList.contains('tree-node')) {
            el.style.display = '';
        }
        if (el.id === 'treeContainer') break;
        el = el.parentElement;
    }
}
