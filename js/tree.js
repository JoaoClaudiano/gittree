// Tree building and rendering functions

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

    const root = buildFileTree(treeData.tree);
    treeContainer.innerHTML = '';
    renderTreeNode(treeContainer, root);

    setTimeout(() => {
        attachTreeEvents();
        expandFirstLevel();
    }, 100);
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
