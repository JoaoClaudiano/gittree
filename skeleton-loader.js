// ==================== RECURSIVE STAGGERED SKELETON LOADER ====================
// Vanilla JS implementation with shimmer effect and varied indentation

function createSkeletonNode(level = 0, type = 'folder', delay = 0) {
    const indentWidth = level * 24;
    const isFolder = type === 'folder';
    
    const node = document.createElement('div');
    node.className = 'skeleton-node';
    node.style.cssText = `
        margin-left: ${indentWidth}px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        animation-delay: ${delay}ms;
        opacity: 0;
        animation: fadeIn 0.3s ease-in ${delay}ms forwards;
    `;
    
    // Icon skeleton
    const icon = document.createElement('div');
    icon.className = 'skeleton-shimmer';
    icon.style.cssText = `
        width: 16px;
        height: 16px;
        border-radius: 2px;
        background: linear-gradient(90deg, rgba(148, 163, 184, 0.1) 0%, rgba(148, 163, 184, 0.2) 50%, rgba(148, 163, 184, 0.1) 100%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
    `;
    
    // Text skeleton
    const text = document.createElement('div');
    text.className = 'skeleton-shimmer';
    const width = isFolder ? (120 + Math.random() * 80) : (80 + Math.random() * 120);
    text.style.cssText = `
        width: ${width}px;
        height: 16px;
        border-radius: 4px;
        background: linear-gradient(90deg, rgba(148, 163, 184, 0.1) 0%, rgba(148, 163, 184, 0.2) 50%, rgba(148, 163, 184, 0.1) 100%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
    `;
    
    node.appendChild(icon);
    node.appendChild(text);
    
    return node;
}

function createSkeletonTree(depth = 3, itemsPerLevel = [3, 4, 5]) {
    const container = document.createElement('div');
    container.className = 'skeleton-tree-container';
    container.style.padding = '16px';
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        .skeleton-node {
            will-change: opacity;
        }
    `;
    container.appendChild(style);
    
    function generateSkeletonTree(currentDepth, maxDepth, parentDelay = 0) {
        const nodes = [];
        const items = itemsPerLevel[currentDepth] || 3;
        
        for (let i = 0; i < items; i++) {
            const delay = parentDelay + (i * 100);
            const isFolder = Math.random() > 0.3 && currentDepth < maxDepth;
            
            nodes.push(createSkeletonNode(currentDepth, isFolder ? 'folder' : 'file', delay));
            
            // Recursively add children for folders
            if (isFolder && currentDepth < maxDepth) {
                const children = generateSkeletonTree(currentDepth + 1, maxDepth, delay);
                nodes.push(...children);
            }
        }
        
        return nodes;
    }
    
    const nodes = generateSkeletonTree(0, depth);
    nodes.forEach(node => container.appendChild(node));
    
    return container;
}

// Export for use in main application
window.createSkeletonTree = createSkeletonTree;
window.RecursiveSkeletonTree = createSkeletonTree; // Backward compatibility
