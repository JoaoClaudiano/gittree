// ==================== ACCESSIBILITY ENHANCEMENTS ====================
// Add keyboard navigation and aria-labels to existing components

(function() {
    'use strict';
    
    // Wait for components to be loaded
    function initAccessibility() {
        if (typeof FileTree === 'undefined') {
            console.log('Waiting for FileTree component...');
            setTimeout(initAccessibility, 100);
            return;
        }
        
        console.log('🎯 Enhancing accessibility...');
    
    // Add keyboard navigation support to tree items
    document.addEventListener('click', function(e) {
        const treeItem = e.target.closest('[data-tree-item]');
        if (treeItem) {
            treeItem.setAttribute('tabindex', '0');
            treeItem.setAttribute('role', 'treeitem');
            
            const isFolder = treeItem.getAttribute('data-type') === 'folder';
            const path = treeItem.getAttribute('data-path');
            const name = treeItem.getAttribute('data-name') || path;
            
            if (isFolder) {
                const isExpanded = treeItem.getAttribute('aria-expanded') === 'true';
                treeItem.setAttribute('aria-label', `${name} folder, ${isExpanded ? 'expanded' : 'collapsed'}`);
            } else {
                treeItem.setAttribute('aria-label', `${name} file`);
            }
        }
    });
    
    // Add keyboard event handlers
    document.addEventListener('keydown', function(e) {
        const focusedItem = document.activeElement;
        if (!focusedItem || !focusedItem.hasAttribute('data-tree-item')) {
            return;
        }
        
        const isFolder = focusedItem.getAttribute('data-type') === 'folder';
        const isExpanded = focusedItem.getAttribute('aria-expanded') === 'true';
        
        switch(e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                focusedItem.click();
                break;
                
            case 'ArrowRight':
                e.preventDefault();
                if (isFolder && !isExpanded) {
                    // Expand folder
                    focusedItem.click();
                } else {
                    // Move to first child
                    const nextSibling = focusedItem.nextElementSibling;
                    if (nextSibling && nextSibling.hasAttribute('data-tree-item')) {
                        nextSibling.focus();
                    }
                }
                break;
                
            case 'ArrowLeft':
                e.preventDefault();
                if (isFolder && isExpanded) {
                    // Collapse folder
                    focusedItem.click();
                } else {
                    // Move to parent
                    const parent = focusedItem.parentElement?.closest('[data-tree-item]');
                    if (parent) {
                        parent.focus();
                    }
                }
                break;
                
            case 'ArrowDown':
                e.preventDefault();
                // Move to next visible item
                const allItems = Array.from(document.querySelectorAll('[data-tree-item]'));
                const currentIndex = allItems.indexOf(focusedItem);
                if (currentIndex < allItems.length - 1) {
                    allItems[currentIndex + 1].focus();
                }
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                // Move to previous visible item
                const allItemsUp = Array.from(document.querySelectorAll('[data-tree-item]'));
                const currentIndexUp = allItemsUp.indexOf(focusedItem);
                if (currentIndexUp > 0) {
                    allItemsUp[currentIndexUp - 1].focus();
                }
                break;
                
            case 'Home':
                e.preventDefault();
                // Move to first item
                const firstItem = document.querySelector('[data-tree-item]');
                if (firstItem) firstItem.focus();
                break;
                
            case 'End':
                e.preventDefault();
                // Move to last item
                const items = document.querySelectorAll('[data-tree-item]');
                const lastItem = items[items.length - 1];
                if (lastItem) lastItem.focus();
                break;
        }
    });
    
    // Enhance buttons with proper aria labels
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
        const text = button.textContent.trim();
        const icon = button.querySelector('i');
        if (text && !button.hasAttribute('aria-label')) {
            button.setAttribute('aria-label', text);
        }
    });
    
    // Add role="tree" to tree container
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) {
                    // Check if it's a tree container
                    if (node.id === 'treeView' || node.classList?.contains('tree-container')) {
                        node.setAttribute('role', 'tree');
                        node.setAttribute('aria-label', 'Repository file tree');
                    }
                }
            });
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('✅ Accessibility enhancements applied');
}

// Start initialization
initAccessibility();
})();
