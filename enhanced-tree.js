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
    
    // Check if React is available
    if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
        // Fallback to vanilla JS implementation
        renderAISidebarVanilla();
        return;
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

// Vanilla JS implementation of AI Sidebar
function renderAISidebarVanilla() {
    const container = document.getElementById('aiSidebarContainer');
    if (!container) return;
    
    if (!window.GitTree2026.aiSidebarOpen) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = `
        <div class="ai-sidebar-overlay" style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 50; display: flex; justify-content: flex-end;">
            <div class="ai-sidebar" style="width: 384px; height: 100%; background: rgba(26, 29, 41, 0.95); backdrop-filter: blur(20px); border-left: 1px solid rgba(0, 212, 255, 0.2); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); display: flex; flex-direction: column; animation: slideInRight 0.3s ease-out;">
                <div class="p-6" style="padding: 1.5rem; border-bottom: 1px solid rgba(55, 65, 81, 0.5);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h2 style="font-size: 1.25rem; font-weight: bold; color: white; display: flex; align-items: center; gap: 0.5rem;">
                            <span style="font-size: 1.5rem;">🤖</span>
                            AI Navigator
                        </h2>
                        <button id="closeAISidebar" style="color: rgb(156, 163, 175); background: none; border: none; padding: 0.5rem; cursor: pointer; border-radius: 0.5rem; font-size: 1.25rem;">✕</button>
                    </div>
                    <p style="font-size: 0.875rem; color: rgb(156, 163, 175);">Semantic code architecture search</p>
                </div>
                
                <div style="padding: 1.5rem; border-bottom: 1px solid rgba(55, 65, 81, 0.5);">
                    <div style="position: relative;">
                        <input type="text" id="aiSearchInput" placeholder="Search: auth, api, tests..." style="width: 100%; padding: 0.75rem 1rem; background: rgba(17, 24, 39, 0.5); border: 1px solid rgb(55, 65, 81); border-radius: 0.5rem; color: white; font-size: 0.875rem;">
                        <button id="aiSearchBtn" style="position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%); padding: 0.375rem 1rem; background: #00d4ff; color: black; font-weight: 600; border: none; border-radius: 0.375rem; cursor: pointer;">🔍</button>
                    </div>
                    <div style="margin-top: 0.75rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${['auth', 'api', 'test', 'config', 'ui'].map(term => 
                            `<button class="ai-suggestion-btn" data-term="${term}" style="padding: 0.25rem 0.75rem; font-size: 0.75rem; background: rgba(31, 41, 55, 0.5); color: rgb(209, 213, 219); border: 1px solid rgb(55, 65, 81); border-radius: 9999px; cursor: pointer;">${term}</button>`
                        ).join('')}
                    </div>
                </div>
                
                <div id="aiSearchResults" style="flex: 1; overflow-y: auto; padding: 1.5rem;">
                    <div style="text-align: center; color: rgb(107, 114, 128); padding: 2rem 0;">
                        <div style="font-size: 2.25rem; margin-bottom: 0.5rem;">💡</div>
                        <p>Try searching for architecture patterns like "auth", "api", or "tests"</p>
                    </div>
                </div>
            </div>
        </div>
        <style>
            @keyframes slideInRight {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
        </style>
    `;
    
    // Add event listeners
    const closeBtn = document.getElementById('closeAISidebar');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            window.GitTree2026.aiSidebarOpen = false;
            renderAISidebar();
        });
    }
    
    const overlay = container.querySelector('.ai-sidebar-overlay');
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                window.GitTree2026.aiSidebarOpen = false;
                renderAISidebar();
            }
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('aiSearchInput');
    const searchBtn = document.getElementById('aiSearchBtn');
    
    if (searchInput && searchBtn) {
        const performSearch = () => {
            const query = searchInput.value.trim();
            if (!query) return;
            
            // Simple search implementation
            const results = searchInTree(query);
            displaySearchResults(results);
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }
    
    // Suggestion buttons
    const suggestionBtns = container.querySelectorAll('.ai-suggestion-btn');
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const term = btn.getAttribute('data-term');
            if (searchInput) {
                searchInput.value = term;
                const results = searchInTree(term);
                displaySearchResults(results);
            }
        });
    });
}

function searchInTree(query) {
    // Simple search implementation
    const results = [];
    const lowerQuery = query.toLowerCase();
    
    // Search in current tree data if available
    if (window.currentTreeData && window.currentTreeData.pathMap) {
        window.currentTreeData.pathMap.forEach((node, path) => {
            if (path.toLowerCase().includes(lowerQuery)) {
                results.push({
                    path: path,
                    type: node.type,
                    name: node.name
                });
            }
        });
    }
    
    return results.slice(0, 10);
}

function displaySearchResults(results) {
    const resultsContainer = document.getElementById('aiSearchResults');
    if (!resultsContainer) return;
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div style="text-align: center; color: rgb(156, 163, 175); padding: 2rem 0;">
                <div style="font-size: 2.25rem; margin-bottom: 0.5rem;">🔍</div>
                <p>No results found</p>
            </div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = results.map((result, idx) => `
        <div class="search-result-item" data-path="${result.path}" style="padding: 0.75rem; background: rgba(17, 24, 39, 0.3); border: 1px solid rgba(55, 65, 81, 0.3); border-radius: 0.5rem; margin-bottom: 0.5rem; cursor: pointer; transition: all 0.2s; animation: fadeIn 0.3s ease-out ${idx * 50}ms both;">
            <div style="font-size: 0.75rem; color: #00d4ff; margin-bottom: 0.25rem; display: flex; align-items: center; gap: 0.25rem;">
                <span>${result.type === 'folder' ? '📁' : '📄'}</span>
                ${result.type}
            </div>
            <div style="font-size: 0.875rem; color: white; font-family: monospace; word-break: break-all;">${result.path}</div>
        </div>
    `).join('');
    
    // Add click handlers
    const items = resultsContainer.querySelectorAll('.search-result-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const path = item.getAttribute('data-path');
            expandAndScrollToPath(path);
        });
        
        item.addEventListener('mouseenter', () => {
            item.style.background = 'rgba(31, 41, 55, 0.5)';
            item.style.borderColor = 'rgba(0, 212, 255, 0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.background = 'rgba(17, 24, 39, 0.3)';
            item.style.borderColor = 'rgba(55, 65, 81, 0.3)';
        });
    });
}

// Render Bento Metadata Panel
function renderBentoPanel() {
    const container = document.getElementById('bentoMetadataContainer');
    if (!container) {
        const div = document.createElement('div');
        div.id = 'bentoMetadataContainer';
        document.body.appendChild(div);
    }
    
    // Check if React is available
    if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
        // Fallback to vanilla JS implementation
        renderBentoPanelVanilla();
        return;
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
    
    container.innerHTML = `
        <div class="bento-panel-overlay" style="position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 40; display: flex; align-items: center; justify-content: center; padding: 1rem;">
            <div class="bento-panel" style="width: 100%; max-width: 48rem; background: rgba(26, 29, 41, 0.95); backdrop-filter: blur(40px); border-radius: 1rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid rgba(0, 212, 255, 0.2); overflow: hidden; animation: slideUpFade 0.4s ease-out; max-height: 90vh; overflow-y: auto;">
                <div class="bento-header" style="padding: 1.5rem; border-bottom: 1px solid rgba(55, 65, 81, 0.5); background: linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, rgba(0, 163, 204, 0.03) 100%);">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="display: flex; align-items: start; gap: 1rem;">
                            <div style="font-size: 2.25rem;">${getFileIcon(file.extension)}</div>
                            <div>
                                <h2 style="font-size: 1.5rem; font-weight: bold; color: white; margin-bottom: 0.25rem; word-break: break-all;">${file.name}</h2>
                                <p style="font-size: 0.875rem; color: rgb(156, 163, 175); font-family: monospace; word-break: break-all;">${file.path}</p>
                            </div>
                        </div>
                        <button id="closeBentoPanel" style="color: rgb(156, 163, 175); background: none; border: none; padding: 0.5rem; cursor: pointer; border-radius: 0.5rem; font-size: 1.25rem;">✕</button>
                    </div>
                </div>
                
                <div style="padding: 1.5rem;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div style="padding: 1.5rem; background: linear-gradient(135deg, rgba(17, 24, 39, 0.5) 0%, rgba(31, 41, 55, 0.3) 100%); border-radius: 0.75rem; border: 1px solid rgba(55, 65, 81, 0.5);">
                            <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: rgb(156, 163, 175); margin-bottom: 0.5rem;">💾 File Size</div>
                            <div style="font-size: 1.875rem; font-weight: bold; color: white;">${formatFileSize(file.sizeKB || 0)}</div>
                        </div>
                        
                        <div style="padding: 1.5rem; background: linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, rgba(29, 78, 216, 0.2) 100%); border-radius: 0.75rem; border: 1px solid rgba(59, 130, 246, 0.3);">
                            <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: rgb(147, 197, 253); margin-bottom: 0.5rem;">🏷️ Extension</div>
                            <div style="font-size: 1.5rem; font-weight: bold; color: white; font-family: monospace;">.${file.extension || 'unknown'}</div>
                        </div>
                        
                        <div style="padding: 1.5rem; background: linear-gradient(135deg, rgba(88, 28, 135, 0.3) 0%, rgba(107, 33, 168, 0.2) 100%); border-radius: 0.75rem; border: 1px solid rgba(168, 85, 247, 0.3);">
                            <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: rgb(216, 180, 254); margin-bottom: 0.5rem;">💻 Language</div>
                            <div style="font-size: 1.5rem; font-weight: bold; color: white;">${file.language || 'Unknown'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style>
            @keyframes slideUpFade {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        </style>
    `;
    
    // Add event listeners
    const closeBtn = document.getElementById('closeBentoPanel');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            window.GitTree2026.bentoMetadataPanelOpen = false;
            renderBentoPanel();
        });
    }
    
    const overlay = container.querySelector('.bento-panel-overlay');
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                window.GitTree2026.bentoMetadataPanelOpen = false;
                renderBentoPanel();
            }
        });
    }
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
        skeletonContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: #94a3b8;">Carregando estrutura...</div>';
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
    // Ensure FileTree is available
    if (!window.FileTree) {
        console.error('FileTree component not found');
        return null;
    }
    
    return React.createElement(window.FileTree, {
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
