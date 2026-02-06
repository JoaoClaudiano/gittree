// ==================== RECURSIVE STAGGERED SKELETON LOADER ====================
// Component for loading state with shimmer effect and varied indentation

const SkeletonTreeNode = ({ level = 0, type = 'folder', delay = 0 }) => {
    const indentWidth = level * 24;
    const isFolder = type === 'folder';
    
    return React.createElement('div', {
        className: 'skeleton-node animate-pulse',
        style: {
            marginLeft: `${indentWidth}px`,
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animationDelay: `${delay}ms`,
            opacity: 0,
            animation: `fadeIn 0.3s ease-in ${delay}ms forwards`
        }
    }, [
        // Icon skeleton
        React.createElement('div', {
            key: 'icon',
            className: 'skeleton-shimmer',
            style: {
                width: '16px',
                height: '16px',
                borderRadius: '2px',
                background: 'linear-gradient(90deg, rgba(148, 163, 184, 0.1) 0%, rgba(148, 163, 184, 0.2) 50%, rgba(148, 163, 184, 0.1) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite'
            }
        }),
        // Text skeleton
        React.createElement('div', {
            key: 'text',
            className: 'skeleton-shimmer',
            style: {
                width: isFolder ? `${120 + Math.random() * 80}px` : `${80 + Math.random() * 120}px`,
                height: '16px',
                borderRadius: '4px',
                background: 'linear-gradient(90deg, rgba(148, 163, 184, 0.1) 0%, rgba(148, 163, 184, 0.2) 50%, rgba(148, 163, 184, 0.1) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite'
            }
        })
    ]);
};

const RecursiveSkeletonTree = ({ depth = 3, itemsPerLevel = [3, 4, 5] }) => {
    const generateSkeletonTree = (currentDepth, maxDepth, parentDelay = 0) => {
        if (currentDepth > maxDepth) return null;
        
        const items = itemsPerLevel[currentDepth] || 3;
        const nodes = [];
        
        for (let i = 0; i < items; i++) {
            const delay = parentDelay + (i * 100);
            const isFolder = Math.random() > 0.3 && currentDepth < maxDepth;
            
            nodes.push(React.createElement(SkeletonTreeNode, {
                key: `node-${currentDepth}-${i}`,
                level: currentDepth,
                type: isFolder ? 'folder' : 'file',
                delay: delay
            }));
            
            // Recursively add children for folders
            if (isFolder && currentDepth < maxDepth) {
                const children = generateSkeletonTree(currentDepth + 1, maxDepth, delay);
                if (children) {
                    nodes.push(...children);
                }
            }
        }
        
        return nodes;
    };
    
    return React.createElement('div', {
        className: 'skeleton-tree-container',
        style: {
            padding: '16px'
        }
    }, [
        React.createElement('style', {
            key: 'skeleton-styles'
        }, `
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
        `),
        ...generateSkeletonTree(0, depth)
    ]);
};

// Export for use in main application
window.RecursiveSkeletonTree = RecursiveSkeletonTree;
