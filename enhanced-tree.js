// ==================== ENHANCED TREE INTEGRATION 2026 ====================
// Integration layer for new features: AI Navigator, Bento Panel, Impact Highlighting, Skeleton Loading

// State management for new features
window.GitTree2026 = {
    aiSidebarOpen: false,
    bentoMetadataPanelOpen: false,
    selectedFile: null,
    treeData: null,
    impactHighlightFiles: new Set(),
    isLoading: false
};

// Initialize new features
function initGitTree2026Features() {
    console.log('🚀 Initializing GitTree 2026 Features...');
    
    // AI Navigator Button
    const aiNavBtn = document.getElementById('aiNavigatorBtn');
    if (aiNavBtn) {
        aiNavBtn.addEventListener('click', () => {
            window.GitTree2026.aiSidebarOpen = !window.GitTree2026.aiSidebarOpen;
            renderAISidebar();
        });
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to open AI Navigator
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            window.GitTree2026.aiSidebarOpen = true;
            renderAISidebar();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            window.GitTree2026.aiSidebarOpen = false;
            window.GitTree2026.bentoMetadataPanelOpen = false;
            renderAISidebar();
            renderBentoPanel();
        }
    });
    
    console.log('✅ GitTree 2026 Features initialized');
}

// Render AI Sidebar
function renderAISidebar() {
    const container = document.getElementById('aiSidebarContainer');
    if (!container) {
        // Create container if it doesn't exist
        const div = document.createElement('div');
        div.id = 'aiSidebarContainer';
        document.body.appendChild(div);
    }
    
    const root = ReactDOM.createRoot(document.getElementById('aiSidebarContainer'));
    root.render(
        React.createElement(window.AISidebar, {
            treeData: window.GitTree2026.treeData,
            isOpen: window.GitTree2026.aiSidebarOpen,
            onClose: () => {
                window.GitTree2026.aiSidebarOpen = false;
                renderAISidebar();
            },
            onNavigate: (path) => {
                console.log('Navigate to:', path);
                // Expand path in tree and scroll to it
                expandAndScrollToPath(path);
            }
        })
    );
}

// Render Bento Metadata Panel
function renderBentoPanel() {
    const container = document.getElementById('bentoMetadataContainer');
    if (!container) {
        const div = document.createElement('div');
        div.id = 'bentoMetadataContainer';
        document.body.appendChild(div);
    }
    
    const root = ReactDOM.createRoot(document.getElementById('bentoMetadataContainer'));
    root.render(
        React.createElement(window.BentoMetadataPanel, {
            file: window.GitTree2026.selectedFile,
            repoInfo: window.currentRepoInfo,
            isOpen: window.GitTree2026.bentoMetadataPanelOpen,
            onClose: () => {
                window.GitTree2026.bentoMetadataPanelOpen = false;
                renderBentoPanel();
            }
        })
    );
}

// Show skeleton loader during loading
function showSkeletonLoader() {
    const treeView = document.getElementById('treeView');
    if (!treeView) return;
    
    const skeletonContainer = document.createElement('div');
    skeletonContainer.id = 'skeletonLoaderContainer';
    treeView.appendChild(skeletonContainer);
    
    const root = ReactDOM.createRoot(skeletonContainer);
    root.render(
        React.createElement(window.RecursiveSkeletonTree, {
            depth: 3,
            itemsPerLevel: [4, 5, 6]
        })
    );
}

// Hide skeleton loader
function hideSkeletonLoader() {
    const skeletonContainer = document.getElementById('skeletonLoaderContainer');
    if (skeletonContainer) {
        skeletonContainer.remove();
    }
}

// Add impact highlighting to modified files
function setImpactHighlight(modifiedFiles) {
    // modifiedFiles should be an array of file paths
    window.GitTree2026.impactHighlightFiles = new Set(modifiedFiles);
    updateTreeWithImpactHighlight();
}

// Update tree with impact highlighting
function updateTreeWithImpactHighlight() {
    const treeItems = document.querySelectorAll('.tree-item, .tree-folder');
    
    treeItems.forEach(item => {
        const path = item.getAttribute('data-path');
        if (path && window.GitTree2026.impactHighlightFiles.has(path)) {
            // Determine impact level (could be based on changes, lines modified, etc.)
            const impactLevel = 'high'; // Default to high for now
            
            item.classList.remove('file-impact-low', 'file-impact-medium', 'file-impact-high');
            item.classList.add(`file-impact-${impactLevel}`);
            
            // Add glow effect
            item.style.setProperty('--glow-color', 'rgba(0, 212, 255, 0.4)');
        } else {
            item.classList.remove('file-impact-low', 'file-impact-medium', 'file-impact-high');
        }
    });
}

// Expand and scroll to a path in the tree
function expandAndScrollToPath(path) {
    // Split path into components
    const parts = path.split('/');
    let currentPath = '';
    
    // Expand each folder in the path
    for (let i = 0; i < parts.length - 1; i++) {
        currentPath += (i > 0 ? '/' : '') + parts[i];
        const folder = document.querySelector(`[data-path="${currentPath}"]`);
        if (folder) {
            folder.setAttribute('aria-expanded', 'true');
            // Trigger expansion if it's a folder toggle
            const toggle = folder.querySelector('.folder-toggle');
            if (toggle) {
                toggle.click();
            }
        }
    }
    
    // Scroll to the target
    setTimeout(() => {
        const target = document.querySelector(`[data-path="${path}"]`);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.focus();
            
            // Highlight briefly
            target.style.transition = 'background 0.3s ease';
            target.style.background = 'rgba(0, 212, 255, 0.3)';
            setTimeout(() => {
                target.style.background = '';
            }, 2000);
        }
    }, 300);
}

// Enhanced file click handler with Bento panel
function handleFileClickWithBento(file) {
    window.GitTree2026.selectedFile = file;
    window.GitTree2026.bentoMetadataPanelOpen = true;
    renderBentoPanel();
}

// Memoized tree component wrapper
const MemoizedTreeWrapper = React.memo(({ files, repoInfo }) => {
    return React.createElement(window.FileTree || FileTree, {
        files: files,
        repoInfo: repoInfo,
        onFileClick: handleFileClickWithBento
    });
});

// Export enhanced functions
window.initGitTree2026Features = initGitTree2026Features;
window.showSkeletonLoader = showSkeletonLoader;
window.hideSkeletonLoader = hideSkeletonLoader;
window.setImpactHighlight = setImpactHighlight;
window.renderAISidebar = renderAISidebar;
window.renderBentoPanel = renderBentoPanel;
window.handleFileClickWithBento = handleFileClickWithBento;
window.MemoizedTreeWrapper = MemoizedTreeWrapper;

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGitTree2026Features);
} else {
    initGitTree2026Features();
}
