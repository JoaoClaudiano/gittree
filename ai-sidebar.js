// ==================== AI AGENTIC NAVIGATOR SIDEBAR ====================
// AI-powered semantic search and navigation

const AISidebar = ({ treeData, onNavigate, isOpen, onClose }) => {
    const [query, setQuery] = React.useState('');
    const [results, setResults] = React.useState([]);
    const [isSearching, setIsSearching] = React.useState(false);
    const inputRef = React.useRef(null);
    
    // Semantic mapping for common architectural terms
    const semanticMappings = {
        'auth': ['auth', 'authentication', 'login', 'passport', 'jwt', 'oauth', 'session'],
        'database': ['db', 'database', 'models', 'schema', 'migrations', 'sql', 'mongodb', 'postgres'],
        'api': ['api', 'routes', 'endpoints', 'controllers', 'rest', 'graphql'],
        'test': ['test', 'spec', '__tests__', 'testing', 'jest', 'mocha', 'cypress'],
        'config': ['config', 'configuration', 'settings', 'env', 'environment'],
        'ui': ['ui', 'components', 'views', 'pages', 'templates', 'frontend'],
        'middleware': ['middleware', 'interceptor', 'plugins', 'hooks'],
        'utils': ['utils', 'helpers', 'common', 'shared', 'lib', 'utilities'],
        'docs': ['docs', 'documentation', 'readme', 'wiki'],
        'assets': ['assets', 'static', 'public', 'images', 'styles', 'css']
    };
    
    // Find architecture paths matching semantic query
    const findArchitecture = (searchQuery) => {
        if (!searchQuery.trim() || !treeData) {
            setResults([]);
            return;
        }
        
        setIsSearching(true);
        
        // Normalize query
        const normalizedQuery = searchQuery.toLowerCase().trim();
        
        // Get semantic expansions
        let searchTerms = [normalizedQuery];
        for (const [key, synonyms] of Object.entries(semanticMappings)) {
            if (key.includes(normalizedQuery) || synonyms.some(s => s.includes(normalizedQuery))) {
                searchTerms = [...searchTerms, ...synonyms];
                break;
            }
        }
        
        // Search through tree data
        const matches = [];
        const searchInPath = (path) => {
            const pathLower = path.toLowerCase();
            return searchTerms.some(term => pathLower.includes(term));
        };
        
        if (treeData.pathMap) {
            treeData.pathMap.forEach((node, path) => {
                if (searchInPath(path)) {
                    matches.push({
                        path: path,
                        type: node.type,
                        name: node.name,
                        relevance: calculateRelevance(path, searchTerms)
                    });
                }
            });
        }
        
        // Sort by relevance
        matches.sort((a, b) => b.relevance - a.relevance);
        
        setResults(matches.slice(0, 10)); // Limit to top 10 results
        setIsSearching(false);
        
        // Auto-expand matching paths
        if (matches.length > 0 && onNavigate) {
            matches.slice(0, 5).forEach(match => {
                onNavigate(match.path);
            });
        }
    };
    
    const calculateRelevance = (path, terms) => {
        let score = 0;
        const pathLower = path.toLowerCase();
        const parts = pathLower.split('/');
        
        terms.forEach(term => {
            // Exact match in filename
            if (parts[parts.length - 1] === term) score += 10;
            // Contains in filename
            else if (parts[parts.length - 1].includes(term)) score += 5;
            // Exact match in any path component
            else if (parts.includes(term)) score += 3;
            // Contains in path
            else if (pathLower.includes(term)) score += 1;
        });
        
        return score;
    };
    
    const handleSearch = (e) => {
        e.preventDefault();
        findArchitecture(query);
    };
    
    React.useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);
    
    if (!isOpen) return null;
    
    return React.createElement('div', {
        className: 'ai-sidebar-overlay fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end',
        onClick: onClose
    }, 
        React.createElement('div', {
            className: 'ai-sidebar relative w-96 h-full backdrop-blur-xl bg-deep-charcoal/90 border-l border-neon-blue/20 shadow-2xl flex flex-col',
            onClick: (e) => e.stopPropagation(),
            style: {
                animation: 'slideInRight 0.3s ease-out'
            }
        }, [
            // Header
            React.createElement('div', {
                key: 'header',
                className: 'p-6 border-b border-gray-700/50 glassmorphism-header'
            }, [
                React.createElement('div', {
                    key: 'title-row',
                    className: 'flex justify-between items-center mb-4'
                }, [
                    React.createElement('h2', {
                        key: 'title',
                        className: 'text-xl font-bold text-white flex items-center gap-2'
                    }, [
                        React.createElement('span', {
                            key: 'icon',
                            className: 'text-2xl'
                        }, '🤖'),
                        'AI Navigator'
                    ]),
                    React.createElement('button', {
                        key: 'close',
                        onClick: onClose,
                        className: 'text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg',
                        'aria-label': 'Close AI Navigator'
                    }, '✕')
                ]),
                React.createElement('p', {
                    key: 'subtitle',
                    className: 'text-sm text-gray-400'
                }, 'Semantic code architecture search')
            ]),
            
            // Search Form
            React.createElement('form', {
                key: 'search-form',
                onSubmit: handleSearch,
                className: 'p-6 border-b border-gray-700/50'
            }, [
                React.createElement('div', {
                    key: 'input-wrapper',
                    className: 'relative'
                }, [
                    React.createElement('input', {
                        key: 'input',
                        ref: inputRef,
                        type: 'text',
                        value: query,
                        onChange: (e) => setQuery(e.target.value),
                        placeholder: 'Search: auth, api, tests...',
                        className: 'w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all',
                        'aria-label': 'AI semantic search input'
                    }),
                    React.createElement('button', {
                        key: 'search-btn',
                        type: 'submit',
                        className: 'absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-neon-blue hover:bg-neon-blue-glow text-black font-semibold rounded-md transition-all transform hover:scale-105',
                        'aria-label': 'Search'
                    }, '🔍')
                ]),
                React.createElement('div', {
                    key: 'suggestions',
                    className: 'mt-3 flex flex-wrap gap-2'
                }, [
                    ['auth', 'api', 'test', 'config', 'ui'].map(term =>
                        React.createElement('button', {
                            key: term,
                            type: 'button',
                            onClick: () => {
                                setQuery(term);
                                findArchitecture(term);
                            },
                            className: 'px-3 py-1 text-xs bg-gray-800/50 hover:bg-gray-700 text-gray-300 rounded-full border border-gray-700 transition-colors',
                            'aria-label': `Search for ${term}`
                        }, term)
                    )
                ])
            ]),
            
            // Results
            React.createElement('div', {
                key: 'results',
                className: 'flex-1 overflow-y-auto p-6'
            }, [
                isSearching ? 
                    React.createElement('div', {
                        key: 'loading',
                        className: 'text-center text-gray-400 py-8'
                    }, 'Searching...') :
                results.length > 0 ?
                    React.createElement('div', {
                        key: 'results-list',
                        className: 'space-y-2'
                    }, results.map((result, idx) =>
                        React.createElement('div', {
                            key: result.path,
                            className: 'p-3 bg-gray-900/30 hover:bg-gray-800/50 rounded-lg border border-gray-700/30 hover:border-neon-blue/30 cursor-pointer transition-all group',
                            onClick: () => onNavigate && onNavigate(result.path),
                            style: {
                                animation: `fadeIn 0.3s ease-out ${idx * 50}ms both`
                            },
                            role: 'button',
                            tabIndex: 0,
                            'aria-label': `Navigate to ${result.path}`,
                            onKeyDown: (e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onNavigate && onNavigate(result.path);
                                }
                            }
                        }, [
                            React.createElement('div', {
                                key: 'type',
                                className: 'text-xs text-neon-blue mb-1 flex items-center gap-1'
                            }, [
                                React.createElement('span', { key: 'icon' }, result.type === 'folder' ? '📁' : '📄'),
                                result.type
                            ]),
                            React.createElement('div', {
                                key: 'path',
                                className: 'text-sm text-white group-hover:text-neon-blue transition-colors font-mono break-all'
                            }, result.path),
                            React.createElement('div', {
                                key: 'relevance',
                                className: 'mt-1 text-xs text-gray-500'
                            }, `Relevance: ${result.relevance}`)
                        ])
                    )) :
                query ? 
                    React.createElement('div', {
                        key: 'no-results',
                        className: 'text-center text-gray-400 py-8'
                    }, [
                        React.createElement('div', {
                            key: 'icon',
                            className: 'text-4xl mb-2'
                        }, '🔍'),
                        React.createElement('p', {
                            key: 'text'
                        }, 'No results found')
                    ]) :
                    React.createElement('div', {
                        key: 'empty',
                        className: 'text-center text-gray-500 py-8'
                    }, [
                        React.createElement('div', {
                            key: 'icon',
                            className: 'text-4xl mb-2'
                        }, '💡'),
                        React.createElement('p', {
                            key: 'text'
                        }, 'Try searching for architecture patterns like "auth", "api", or "tests"')
                    ])
            ]),
            
            // Styles
            React.createElement('style', {
                key: 'ai-sidebar-styles'
            }, `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .glassmorphism-header {
                    background: linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(0, 163, 204, 0.02) 100%);
                    backdrop-filter: blur(10px);
                }
            `)
        ])
    );
};

// Export for use in main application
window.AISidebar = AISidebar;
