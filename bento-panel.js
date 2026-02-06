// ==================== BENTO GRID METADATA PANEL ====================
// Modern metadata display with Glassmorphism

const BentoMetadataPanel = ({ file, repoInfo, isOpen, onClose }) => {
    if (!isOpen || !file) return null;
    
    // Mock commit data (in real app, would fetch from GitHub API)
    const mockCommitData = {
        author: 'GitHub User',
        date: new Date().toLocaleDateString('pt-BR'),
        message: 'Last commit message'
    };
    
    // Calculate language contribution (mock data)
    const languageStats = {
        'JavaScript': 45,
        'CSS': 25,
        'HTML': 20,
        'Other': 10
    };
    
    const getFileIcon = (extension) => {
        const iconMap = {
            'js': '📜', 'jsx': '⚛️', 'ts': '💠', 'tsx': '⚛️',
            'py': '🐍', 'java': '☕', 'go': '🔷',
            'css': '🎨', 'scss': '🎨', 'html': '🌐',
            'json': '📋', 'xml': '📋', 'yaml': '📋', 'yml': '📋',
            'md': '📝', 'txt': '📄',
            'png': '🖼️', 'jpg': '🖼️', 'svg': '🎨', 'gif': '🖼️',
            'mp4': '🎬', 'mp3': '🎵'
        };
        return iconMap[extension] || '📄';
    };
    
    const formatFileSize = (sizeKB) => {
        if (sizeKB < 1) return `${Math.round(sizeKB * 1024)} B`;
        if (sizeKB < 1024) return `${sizeKB.toFixed(2)} KB`;
        return `${(sizeKB / 1024).toFixed(2)} MB`;
    };
    
    return React.createElement('div', {
        className: 'bento-panel-overlay fixed inset-0 bg-black bg-opacity-40 z-40 flex items-end md:items-center justify-center p-4',
        onClick: onClose
    },
        React.createElement('div', {
            className: 'bento-panel relative w-full max-w-3xl bg-deep-charcoal/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-neon-blue/20 overflow-hidden',
            onClick: (e) => e.stopPropagation(),
            style: {
                animation: 'slideUpFade 0.4s ease-out',
                maxHeight: '90vh'
            }
        }, [
            // Header with glassmorphism
            React.createElement('div', {
                key: 'header',
                className: 'bento-header p-6 border-b border-gray-700/50 relative overflow-hidden'
            }, [
                // Glassmorphism background
                React.createElement('div', {
                    key: 'glass-bg',
                    className: 'absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-transparent',
                    style: {
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)'
                    }
                }),
                React.createElement('div', {
                    key: 'header-content',
                    className: 'relative z-10 flex justify-between items-start'
                }, [
                    React.createElement('div', {
                        key: 'title-section',
                        className: 'flex items-start gap-4'
                    }, [
                        React.createElement('div', {
                            key: 'icon',
                            className: 'text-4xl'
                        }, getFileIcon(file.extension)),
                        React.createElement('div', {
                            key: 'info'
                        }, [
                            React.createElement('h2', {
                                key: 'name',
                                className: 'text-2xl font-bold text-white mb-1 break-all'
                            }, file.name),
                            React.createElement('p', {
                                key: 'path',
                                className: 'text-sm text-gray-400 font-mono break-all'
                            }, file.path)
                        ])
                    ]),
                    React.createElement('button', {
                        key: 'close',
                        onClick: onClose,
                        className: 'text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg',
                        'aria-label': 'Close metadata panel'
                    }, '✕')
                ])
            ]),
            
            // Bento Grid Content
            React.createElement('div', {
                key: 'content',
                className: 'p-6 overflow-y-auto',
                style: { maxHeight: 'calc(90vh - 140px)' }
            }, [
                React.createElement('div', {
                    key: 'bento-grid',
                    className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                }, [
                    // Card 1: File Size (large)
                    React.createElement('div', {
                        key: 'size-card',
                        className: 'bento-card md:col-span-2 lg:col-span-1 p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-xl border border-gray-700/50 hover:border-neon-blue/30 transition-all backdrop-blur-sm',
                        style: {
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                        }
                    }, [
                        React.createElement('div', {
                            key: 'label',
                            className: 'text-xs uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-2'
                        }, [
                            React.createElement('span', { key: 'icon' }, '💾'),
                            'File Size'
                        ]),
                        React.createElement('div', {
                            key: 'value',
                            className: 'text-3xl font-bold text-white'
                        }, formatFileSize(file.sizeKB || 0)),
                        React.createElement('div', {
                            key: 'bar',
                            className: 'mt-3 h-2 bg-gray-800 rounded-full overflow-hidden'
                        },
                            React.createElement('div', {
                                className: 'h-full bg-gradient-to-r from-neon-blue to-neon-blue-glow',
                                style: {
                                    width: `${Math.min((file.sizeKB || 0) / 100 * 100, 100)}%`,
                                    boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
                                }
                            })
                        )
                    ]),
                    
                    // Card 2: File Extension
                    React.createElement('div', {
                        key: 'ext-card',
                        className: 'bento-card p-6 bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl border border-blue-700/30 hover:border-neon-blue/50 transition-all backdrop-blur-sm'
                    }, [
                        React.createElement('div', {
                            key: 'label',
                            className: 'text-xs uppercase tracking-wider text-blue-300 mb-2 flex items-center gap-2'
                        }, [
                            React.createElement('span', { key: 'icon' }, '🏷️'),
                            'Extension'
                        ]),
                        React.createElement('div', {
                            key: 'value',
                            className: 'text-2xl font-bold text-white font-mono'
                        }, `.${file.extension || 'unknown'}`)
                    ]),
                    
                    // Card 3: Language
                    React.createElement('div', {
                        key: 'lang-card',
                        className: 'bento-card p-6 bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-xl border border-purple-700/30 hover:border-purple-500/50 transition-all backdrop-blur-sm'
                    }, [
                        React.createElement('div', {
                            key: 'label',
                            className: 'text-xs uppercase tracking-wider text-purple-300 mb-2 flex items-center gap-2'
                        }, [
                            React.createElement('span', { key: 'icon' }, '💻'),
                            'Language'
                        ]),
                        React.createElement('div', {
                            key: 'value',
                            className: 'text-2xl font-bold text-white'
                        }, file.language || 'Unknown')
                    ]),
                    
                    // Card 4: Last Commit (large - spans 2 columns)
                    React.createElement('div', {
                        key: 'commit-card',
                        className: 'bento-card md:col-span-2 p-6 bg-gradient-to-br from-green-900/20 to-gray-900/40 rounded-xl border border-green-700/30 hover:border-green-500/40 transition-all backdrop-blur-sm'
                    }, [
                        React.createElement('div', {
                            key: 'label',
                            className: 'text-xs uppercase tracking-wider text-green-300 mb-3 flex items-center gap-2'
                        }, [
                            React.createElement('span', { key: 'icon' }, '📝'),
                            'Last Commit'
                        ]),
                        React.createElement('div', {
                            key: 'commit-info',
                            className: 'space-y-2'
                        }, [
                            React.createElement('div', {
                                key: 'author',
                                className: 'flex items-center gap-2'
                            }, [
                                React.createElement('span', {
                                    key: 'avatar',
                                    className: 'w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm'
                                }, '👤'),
                                React.createElement('span', {
                                    key: 'name',
                                    className: 'text-white font-medium'
                                }, mockCommitData.author)
                            ]),
                            React.createElement('div', {
                                key: 'date',
                                className: 'text-sm text-gray-400'
                            }, `📅 ${mockCommitData.date}`)
                        ])
                    ]),
                    
                    // Card 5: Language Distribution (large - spans all columns)
                    React.createElement('div', {
                        key: 'lang-dist-card',
                        className: 'bento-card md:col-span-2 lg:col-span-3 p-6 bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-xl border border-gray-700/50 hover:border-neon-blue/30 transition-all backdrop-blur-sm'
                    }, [
                        React.createElement('div', {
                            key: 'label',
                            className: 'text-xs uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2'
                        }, [
                            React.createElement('span', { key: 'icon' }, '📊'),
                            'Repository Language Distribution'
                        ]),
                        React.createElement('div', {
                            key: 'bars',
                            className: 'space-y-3'
                        }, Object.entries(languageStats).map(([lang, percent]) =>
                            React.createElement('div', {
                                key: lang,
                                className: 'space-y-1'
                            }, [
                                React.createElement('div', {
                                    key: 'lang-header',
                                    className: 'flex justify-between text-sm'
                                }, [
                                    React.createElement('span', {
                                        key: 'name',
                                        className: 'text-gray-300'
                                    }, lang),
                                    React.createElement('span', {
                                        key: 'percent',
                                        className: 'text-neon-blue font-semibold'
                                    }, `${percent}%`)
                                ]),
                                React.createElement('div', {
                                    key: 'bar',
                                    className: 'h-2 bg-gray-800 rounded-full overflow-hidden'
                                },
                                    React.createElement('div', {
                                        className: 'h-full bg-gradient-to-r from-neon-blue to-blue-400 transition-all duration-500',
                                        style: {
                                            width: `${percent}%`,
                                            boxShadow: '0 0 8px rgba(0, 212, 255, 0.4)'
                                        }
                                    })
                                )
                            ])
                        ))
                    ])
                ])
            ]),
            
            // Styles
            React.createElement('style', {
                key: 'bento-styles'
            }, `
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
                .bento-card {
                    transition: all 0.3s ease;
                }
                .bento-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 40px rgba(0, 212, 255, 0.15);
                }
                .bento-header {
                    background: linear-gradient(135deg, rgba(0, 212, 255, 0.08) 0%, rgba(0, 163, 204, 0.03) 100%);
                }
            `)
        ])
    );
};

// Export for use in main application
window.BentoMetadataPanel = BentoMetadataPanel;
