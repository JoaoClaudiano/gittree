// ==================== ENHANCED TREE INTEGRATION 2026 ====================
// Integration layer for new features: Bento Panel, Impact Highlighting, Skeleton Loading

// State management for new features
window.GitTree2026 = {
    bentoMetadataPanelOpen: false,
    selectedFile: null,
    treeData: null,
    impactHighlightFiles: new Set(),
    isLoading: false,
    initialized: false
};

// Initialize new features
function initGitTree2026Features() {
    // Prevent double initialization
    if (window.GitTree2026.initialized) {
        return;
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape to close modals
        if (e.key === 'Escape') {
            window.GitTree2026.bentoMetadataPanelOpen = false;
            renderBentoPanel();
        }
    });

    window.GitTree2026.initialized = true;
}

// Render Bento Metadata Panel
function renderBentoPanel() {
    const container = document.getElementById('bentoMetadataContainer');
    if (!container) {
        const div = document.createElement('div');
        div.id = 'bentoMetadataContainer';
        document.body.appendChild(div);
    }
    
    renderBentoPanelVanilla();
}

// Vanilla JS implementation of Bento Panel
function renderBentoPanelVanilla() {
    const container = document.getElementById('bentoMetadataContainer');
    if (!container) return;

    if (!window.GitTree2026.bentoMetadataPanelOpen || !window.GitTree2026.selectedFile) {
        container.innerHTML = '';
        return;
    }

    const file = window.GitTree2026.selectedFile;
    const formatFileSize = (sizeKB) => {
        if (sizeKB < 1) return `${Math.round(sizeKB * 1024)} B`;
        if (sizeKB < 1024) return `${sizeKB.toFixed(2)} KB`;
        return `${(sizeKB / 1024).toFixed(2)} MB`;
    };

    const getFileIcon = (extension) => {
        const iconMap = {
            'js': '📜', 'jsx': '⚛️', 'ts': '💠', 'tsx': '⚛️',
            'py': '🐍', 'java': '☕', 'go': '🔷',
            'css': '🎨', 'scss': '🎨', 'html': '🌐',
            'json': '📋', 'xml': '📋', 'yaml': '📋', 'yml': '📋',
            'md': '📝', 'txt': '📄'
        };
        return iconMap[extension] || '📄';
    };

    container.innerHTML = '';

    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'bento-panel-overlay';
    overlay.style.cssText = 'position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 40; display: flex; align-items: center; justify-content: center; padding: 1rem;';

    // Panel
    const panel = document.createElement('div');
    panel.className = 'bento-panel';
    panel.style.cssText = 'width: 100%; max-width: 48rem; background: rgba(26, 29, 41, 0.95); backdrop-filter: blur(40px); border-radius: 1rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid rgba(0, 212, 255, 0.2); overflow: hidden; animation: slideUpFade 0.4s ease-out; max-height: 90vh; overflow-y: auto;';

    // Header
    const header = document.createElement('div');
    header.className = 'bento-header';
    header.style.cssText = 'padding: 1.5rem; border-bottom: 1px solid rgba(55, 65, 81, 0.5); background: linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, rgba(0, 163, 204, 0.03) 100%);';

    const headerRow = document.createElement('div');
    headerRow.style.cssText = 'display: flex; justify-content: space-between; align-items: start;';

    const fileInfo = document.createElement('div');
    fileInfo.style.cssText = 'display: flex; align-items: start; gap: 1rem;';

    const iconEl = document.createElement('div');
    iconEl.style.cssText = 'font-size: 2.25rem;';
    iconEl.textContent = getFileIcon(file.extension);

    const nameMeta = document.createElement('div');

    const nameEl = document.createElement('h2');
    nameEl.style.cssText = 'font-size: 1.5rem; font-weight: bold; color: white; margin-bottom: 0.25rem; word-break: break-all;';
    nameEl.textContent = file.name;

    const pathEl = document.createElement('p');
    pathEl.style.cssText = 'font-size: 0.875rem; color: rgb(156, 163, 175); font-family: monospace; word-break: break-all;';
    pathEl.textContent = file.path;

    nameMeta.appendChild(nameEl);
    nameMeta.appendChild(pathEl);
    fileInfo.appendChild(iconEl);
    fileInfo.appendChild(nameMeta);

    const closeBtn = document.createElement('button');
    closeBtn.id = 'closeBentoPanel';
    closeBtn.style.cssText = 'color: rgb(156, 163, 175); background: none; border: none; padding: 0.5rem; cursor: pointer; border-radius: 0.5rem; font-size: 1.25rem;';
    closeBtn.textContent = '✕';

    headerRow.appendChild(fileInfo);
    headerRow.appendChild(closeBtn);
    header.appendChild(headerRow);

    // Body
    const body = document.createElement('div');
    body.style.cssText = 'padding: 1.5rem;';

    const cardsGrid = document.createElement('div');
    cardsGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;';

    const cardDefs = [
        {
            bg: 'linear-gradient(135deg, rgba(17, 24, 39, 0.5) 0%, rgba(31, 41, 55, 0.3) 100%)',
            border: 'rgba(55, 65, 81, 0.5)',
            labelColor: 'rgb(156, 163, 175)',
            label: t('bentoFileSize'),
            value: formatFileSize(file.sizeKB || 0),
            valueStyle: 'font-size: 1.875rem; font-weight: bold; color: white;'
        },
        {
            bg: 'linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, rgba(29, 78, 216, 0.2) 100%)',
            border: 'rgba(59, 130, 246, 0.3)',
            labelColor: 'rgb(147, 197, 253)',
            label: t('bentoExtension'),
            value: '.' + (file.extension || 'unknown'),
            valueStyle: 'font-size: 1.5rem; font-weight: bold; color: white; font-family: monospace;'
        },
        {
            bg: 'linear-gradient(135deg, rgba(88, 28, 135, 0.3) 0%, rgba(107, 33, 168, 0.2) 100%)',
            border: 'rgba(168, 85, 247, 0.3)',
            labelColor: 'rgb(216, 180, 254)',
            label: t('bentoLanguage'),
            value: file.language || t('unknownLanguage'),
            valueStyle: 'font-size: 1.5rem; font-weight: bold; color: white;'
        }
    ];

    cardDefs.forEach(function (def) {
        const card = document.createElement('div');
        card.style.cssText = `padding: 1.5rem; background: ${def.bg}; border-radius: 0.75rem; border: 1px solid ${def.border};`;

        const lbl = document.createElement('div');
        lbl.style.cssText = `font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: ${def.labelColor}; margin-bottom: 0.5rem;`;
        lbl.textContent = def.label;

        const val = document.createElement('div');
        val.style.cssText = def.valueStyle;
        val.textContent = def.value;

        card.appendChild(lbl);
        card.appendChild(val);
        cardsGrid.appendChild(card);
    });

    body.appendChild(cardsGrid);
    panel.appendChild(header);
    panel.appendChild(body);
    overlay.appendChild(panel);
    container.appendChild(overlay);

    // Add event listeners using the already-created DOM references
    closeBtn.addEventListener('click', () => {
        window.GitTree2026.bentoMetadataPanelOpen = false;
        renderBentoPanel();
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            window.GitTree2026.bentoMetadataPanelOpen = false;
            renderBentoPanel();
        }
    });
}

// Show skeleton loader during loading
function showSkeletonLoader() {
    const treeView = document.getElementById('treeView');
    if (!treeView) return;
    
    // Remove existing skeleton if any
    hideSkeletonLoader();
    
    const skeletonContainer = document.createElement('div');
    skeletonContainer.id = 'skeletonLoaderContainer';
    
    // Create skeleton tree (vanilla JS version)
    if (typeof window.createSkeletonTree === 'function') {
        const skeleton = window.createSkeletonTree(3, [4, 5, 6]);
        skeletonContainer.appendChild(skeleton);
    } else {
        // Simple fallback
        const fallback = document.createElement('div');
        fallback.style.cssText = 'padding: 20px; text-align: center; color: #94a3b8;';
        fallback.textContent = t('statusLoading');
        skeletonContainer.appendChild(fallback);
    }
    
    treeView.appendChild(skeletonContainer);
}

// Hide skeleton loader
function hideSkeletonLoader() {
    const skeletonContainer = document.getElementById('skeletonLoaderContainer');
    if (skeletonContainer) {
        skeletonContainer.remove();
    }
}

// Export enhanced functions
window.initGitTree2026Features = initGitTree2026Features;
window.showSkeletonLoader = showSkeletonLoader;
window.hideSkeletonLoader = hideSkeletonLoader;
window.renderBentoPanel = renderBentoPanel;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGitTree2026Features);
} else {
    initGitTree2026Features();
}
