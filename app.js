// ==================== INICIALIZAÇÃO ====================
// Verificar se React está disponível
if (!window.React || !window.ReactDOM) {
    console.error('React não está carregado! Verifique a ordem dos scripts.');
    document.getElementById('app').innerHTML = `
        <div style="text-align: center; padding: 40px; color: #ef4444;">
            <h3><i class="fas fa-exclamation-triangle"></i> Erro de Dependência</h3>
            <p>As bibliotecas React não foram carregadas corretamente.</p>
            <button onclick="window.location.reload()" 
                    style="padding: 10px 20px; margin-top: 20px; background: #3b82f6; 
                           color: white; border: none; border-radius: 6px; cursor: pointer;">
                Recarregar Página
            </button>
        </div>
    `;
    throw new Error('React não disponível');
}

const { useState, useEffect, useRef } = React;
const { createRoot } = ReactDOM;

// ==================== FUNÇÕES UTILITÁRIAS GLOBAIS ====================
const getFileIcon = (extension) => {
    const icons = {
        'js': 'JS', 'jsx': 'JSX',
        'ts': 'TS', 'tsx': 'TSX',
        'css': 'CSS', 'scss': 'SCSS', 'less': 'LESS',
        'json': '{}', 'md': 'MD',
        'html': 'HTML', 'vue': 'VUE',
        'svelte': 'SVL', 'py': 'PY',
        'java': 'JAVA', 'rb': 'RB',
        'php': 'PHP', 'go': 'GO',
        'rs': 'RUST', 'cpp': 'C++', 'c': 'C'
    };
    return icons[extension] || '📄';
};

const getFileLanguage = (path) => {
    const ext = path.split('.').pop().toLowerCase();
    const languages = {
        'js': 'JavaScript',
        'jsx': 'JavaScript (React)',
        'ts': 'TypeScript',
        'tsx': 'TypeScript (React)',
        'css': 'CSS',
        'scss': 'SCSS',
        'less': 'LESS',
        'json': 'JSON',
        'md': 'Markdown',
        'html': 'HTML',
        'vue': 'Vue.js',
        'svelte': 'Svelte',
        'py': 'Python',
        'java': 'Java',
        'rb': 'Ruby',
        'php': 'PHP',
        'go': 'Go',
        'rs': 'Rust',
        'cpp': 'C++',
        'c': 'C'
    };
    return languages[ext] || ext.toUpperCase();
};

// ==================== SISTEMA DE CACHE ====================
const CACHE_PREFIX = 'codemap_';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 horas

const cache = {
    set: (key, data, ttl = CACHE_TTL) => {
        try {
            const item = {
                data,
                expiry: Date.now() + ttl,
                timestamp: Date.now()
            };
            localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
            console.log(`Cache salvo: ${key}`);
            return true;
        } catch (err) {
            console.error('Erro ao salvar cache:', err);
            return false;
        }
    },
    
    get: (key) => {
        try {
            const itemStr = localStorage.getItem(CACHE_PREFIX + key);
            if (!itemStr) return null;
            
            const item = JSON.parse(itemStr);
            if (Date.now() > item.expiry) {
                localStorage.removeItem(CACHE_PREFIX + key);
                console.log(`Cache expirado: ${key}`);
                return null;
            }
            
            console.log(`Cache carregado: ${key}`);
            return item.data;
        } catch (err) {
            console.error('Erro ao ler cache:', err);
            return null;
        }
    },
    
    remove: (key) => {
        localStorage.removeItem(CACHE_PREFIX + key);
        console.log(`Cache removido: ${key}`);
    },
    
    clear: () => {
        const keys = Object.keys(localStorage);
        let count = 0;
        keys.forEach(key => {
            if (key.startsWith(CACHE_PREFIX)) {
                localStorage.removeItem(key);
                count++;
            }
        });
        console.log(`Cache limpo: ${count} itens removidos`);
        return count;
    },
    
    getStats: () => {
        const keys = Object.keys(localStorage);
        const cacheKeys = keys.filter(key => key.startsWith(CACHE_PREFIX));
        const stats = {
            total: cacheKeys.length,
            size: 0,
            repos: []
        };
        
        cacheKeys.forEach(key => {
            try {
                const item = JSON.parse(localStorage.getItem(key));
                stats.size += JSON.stringify(item).length;
                if (item.data && item.data.repoInfo) {
                    stats.repos.push({
                        name: item.data.repoInfo.name,
                        owner: item.data.repoInfo.owner,
                        files: item.data.files ? item.data.files.length : 0,
                        timestamp: new Date(item.timestamp).toLocaleDateString()
                    });
                }
            } catch (e) {
                console.warn(`Item inválido no cache: ${key}`);
            }
        });
        
        stats.sizeKB = Math.round(stats.size / 1024 * 100) / 100;
        stats.sizeMB = Math.round(stats.sizeKB / 1024 * 100) / 100;
        return stats;
    }
};

// ==================== UTILITÁRIOS ====================
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        background: ${type === 'success' ? '#10b981' : 
                     type === 'error' ? '#ef4444' : 
                     type === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: white;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                           type === 'error' ? 'exclamation-circle' : 
                           type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// ==================== ANÁLISE DE REPOSITÓRIO ====================
const fetchRepositoryData = async (owner, repo) => {
    console.log(`Buscando dados do repositório: ${owner}/${repo}`);
    
    try {
        // 1. Informações básicas do repositório
        const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: { 
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'CodeCartographer/1.0'
            }
        });
        
        if (!repoRes.ok) {
            if (repoRes.status === 404) {
                throw new Error('Repositório não encontrado');
            }
            throw new Error(`GitHub API: ${repoRes.status} ${repoRes.statusText}`);
        }
        
        const repoData = await repoRes.json();
        console.log('Repositório encontrado:', repoData.name);
        
        // 2. Buscar estrutura de arquivos
        const branch = repoData.default_branch || 'main';
        const treeRes = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`, {
            headers: { 
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'CodeCartographer/1.0'
            }
        });
        
        if (!treeRes.ok) {
            if (treeRes.status === 403) {
                throw new Error('Limite de requisições excedido. Tente novamente mais tarde.');
            }
            throw new Error(`Erro ao buscar árvore: ${treeRes.status}`);
        }
        
        const treeData = await treeRes.json();
        
        if (!treeData.tree || treeData.tree.length === 0) {
            throw new Error('Repositório vazio ou sem arquivos visíveis');
        }
        
        // 3. Processar arquivos
        const files = treeData.tree
            .filter(item => item.type === 'blob')
            .map(item => {
                const extension = item.path.split('.').pop().toLowerCase();
                return {
                    ...item,
                    path: item.path,
                    extension: extension,
                    sizeKB: item.size ? Math.round(item.size / 1024 * 10) / 10 : 0,
                    language: getFileLanguage(item.path),
                    isCodeFile: ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'rb', 'php', 'go'].includes(extension)
                };
            })
            .filter(file => {
                const path = file.path.toLowerCase();
                // Filtrar pastas desnecessárias
                return !path.includes('node_modules') && 
                       !path.includes('dist') && 
                       !path.includes('build') &&
                       !path.includes('.git') &&
                       !path.startsWith('.') &&
                       !path.endsWith('.lock') &&
                       !path.endsWith('.log');
            });
        
        console.log(`${files.length} arquivos processados`);
        
        return {
            success: true,
            repoInfo: {
                name: repoData.name,
                description: repoData.description,
                stars: repoData.stargazers_count,
                forks: repoData.forks_count,
                language: repoData.language,
                owner: repoData.owner.login,
                default_branch: branch,
                url: repoData.html_url
            },
            files: files,
            stats: {
                totalFiles: files.length,
                codeFiles: files.filter(f => f.isCodeFile).length,
                totalSizeKB: files.reduce((sum, f) => sum + f.sizeKB, 0)
            }
        };
        
    } catch (error) {
        console.error('Erro no fetchRepositoryData:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// ==================== COMPONENTE DE LISTA DE ARQUIVOS ====================
const FileList = ({ files, onFileClick }) => {
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all');
    
    const filteredFiles = files.filter(file => {
        const matchesSearch = file.path.toLowerCase().includes(search.toLowerCase());
        const matchesType = filterType === 'all' || 
                           (filterType === 'code' && file.isCodeFile) ||
                           (filterType === 'other' && !file.isCodeFile);
        return matchesSearch && matchesType;
    });
    
    const fileTypes = {
        'js': filteredFiles.filter(f => f.extension === 'js').length,
        'ts': filteredFiles.filter(f => f.extension === 'ts' || f.extension === 'tsx').length,
        'css': filteredFiles.filter(f => ['css', 'scss', 'less'].includes(f.extension)).length,
        'json': filteredFiles.filter(f => f.extension === 'json').length,
        'md': filteredFiles.filter(f => f.extension === 'md').length,
        'other': filteredFiles.filter(f => !['js', 'ts', 'tsx', 'css', 'scss', 'less', 'json', 'md'].includes(f.extension)).length
    };
    
    return React.createElement('div', { 
        className: 'file-list-container',
        style: { 
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #334155',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }
    }, [
        // Controles
        React.createElement('div', {
            key: 'controls',
            style: { 
                display: 'flex',
                gap: '10px',
                marginBottom: '20px',
                flexWrap: 'wrap'
            }
        }, [
            React.createElement('div', {
                key: 'search',
                style: { flex: 1, minWidth: '200px' }
            }, [
                React.createElement('input', {
                    key: 'search-input',
                    type: 'text',
                    placeholder: '🔍 Buscar arquivos...',
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    style: {
                        width: '100%',
                        padding: '10px 15px',
                        background: '#1e293b',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#f8fafc',
                        fontSize: '14px'
                    }
                })
            ]),
            
            React.createElement('select', {
                key: 'filter',
                value: filterType,
                onChange: (e) => setFilterType(e.target.value),
                style: {
                    padding: '10px 15px',
                    background: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#cbd5e1',
                    fontSize: '14px',
                    minWidth: '150px'
                }
            }, [
                React.createElement('option', { key: 'all', value: 'all' }, '📁 Todos os arquivos'),
                React.createElement('option', { key: 'code', value: 'code' }, '💻 Arquivos de código'),
                React.createElement('option', { key: 'other', value: 'other' }, '📄 Outros arquivos')
            ])
        ]),
        
        // Estatísticas
        React.createElement('div', {
            key: 'stats',
            style: {
                display: 'flex',
                gap: '10px',
                marginBottom: '20px',
                flexWrap: 'wrap'
            }
        }, [
            React.createElement('div', {
                key: 'total',
                style: {
                    padding: '8px 15px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '6px',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    fontSize: '12px'
                }
            }, [
                React.createElement('span', { 
                    key: 'label',
                    style: { color: '#94a3b8' }
                }, 'Total: '),
                React.createElement('span', { 
                    key: 'value',
                    style: { color: '#3b82f6', fontWeight: 'bold' }
                }, filteredFiles.length)
            ]),
            
            Object.entries(fileTypes)
                .filter(([type, count]) => count > 0)
                .map(([type, count]) => 
                    React.createElement('div', {
                        key: type,
                        style: {
                            padding: '8px 15px',
                            background: 'rgba(100, 116, 139, 0.1)',
                            borderRadius: '6px',
                            border: '1px solid rgba(100, 116, 139, 0.3)',
                            fontSize: '12px'
                        }
                    }, [
                        React.createElement('span', { 
                            key: 'label',
                            style: { color: '#94a3b8' }
                        }, `${type}: `),
                        React.createElement('span', { 
                            key: 'value',
                            style: { color: '#cbd5e1', fontWeight: 'bold' }
                        }, count)
                    ])
                )
        ]),
        
        // Lista de arquivos
        React.createElement('div', {
            key: 'list-container',
            style: {
                flex: 1,
                overflowY: 'auto',
                paddingRight: '5px'
            }
        }, 
            filteredFiles.length === 0 
                ? React.createElement('div', {
                    key: 'empty',
                    style: { 
                        textAlign: 'center', 
                        padding: '40px 20px',
                        color: '#94a3b8' 
                    }
                }, [
                    React.createElement('i', {
                        key: 'icon',
                        className: 'fas fa-search',
                        style: { fontSize: '40px', marginBottom: '15px', opacity: 0.5 }
                    }),
                    React.createElement('p', { key: 'text' }, 
                        search ? 'Nenhum arquivo encontrado' : 'Nenhum arquivo para mostrar'
                    )
                ])
                : filteredFiles.map((file, index) => 
                    React.createElement('div', {
                        key: index,
                        className: 'file-item',
                        onClick: () => onFileClick && onFileClick(file),
                        style: {
                            padding: '12px 15px',
                            marginBottom: '8px',
                            background: 'rgba(30, 41, 59, 0.8)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            border: '1px solid transparent',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        },
                        onMouseEnter: (e) => {
                            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                            e.currentTarget.style.borderColor = '#3b82f6';
                        },
                        onMouseLeave: (e) => {
                            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)';
                            e.currentTarget.style.borderColor = 'transparent';
                        }
                    }, [
                        React.createElement('div', {
                            key: 'icon',
                            style: {
                                width: '36px',
                                height: '36px',
                                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#3b82f6'
                            }
                        }, getFileIcon(file.extension)),
                        
                        React.createElement('div', {
                            key: 'info',
                            style: { flex: 1 }
                        }, [
                            React.createElement('div', {
                                key: 'name',
                                style: { 
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: '13px',
                                    color: '#f8fafc',
                                    marginBottom: '4px',
                                    wordBreak: 'break-all'
                                }
                            }, file.path),
                            React.createElement('div', {
                                key: 'details',
                                style: { 
                                    display: 'flex',
                                    gap: '15px',
                                    fontSize: '11px',
                                    color: '#94a3b8'
                                }
                            }, [
                                React.createElement('span', { key: 'size' }, `${file.sizeKB} KB`),
                                React.createElement('span', { key: 'lang' }, file.language),
                                React.createElement('span', { key: 'type' }, 
                                    file.isCodeFile ? '💻 Código' : '📄 Documento'
                                )
                            ])
                        ]),
                        
                        React.createElement('button', {
                            key: 'view',
                            onClick: (e) => {
                                e.stopPropagation();
                                window.open(`https://github.com/${file.repoInfo?.owner}/${file.repoInfo?.name}/blob/main/${file.path}`, '_blank');
                            },
                            style: {
                                padding: '6px 12px',
                                background: 'transparent',
                                border: '1px solid #475569',
                                borderRadius: '6px',
                                color: '#94a3b8',
                                fontSize: '11px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            },
                            onMouseEnter: (e) => {
                                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                                e.currentTarget.style.color = '#3b82f6';
                                e.currentTarget.style.borderColor = '#3b82f6';
                            },
                            onMouseLeave: (e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#94a3b8';
                                e.currentTarget.style.borderColor = '#475569';
                            }
                        }, 'Abrir')
                    ])
                )
        )
    ]);
};

// ==================== COMPONENTE DE VISUALIZAÇÃO ====================
const RepositoryVisualization = ({ repoInfo, files }) => {
    const [viewMode, setViewMode] = useState('list'); // 'list', 'chart', 'graph'
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    
    // Estatísticas para gráficos
    const fileExtensions = files.reduce((acc, file) => {
        acc[file.extension] = (acc[file.extension] || 0) + 1;
        return acc;
    }, {});
    
    const topExtensions = Object.entries(fileExtensions)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);
    
    // Criar gráfico
    useEffect(() => {
        if (viewMode === 'chart' && chartRef.current && topExtensions.length > 0) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: topExtensions.map(([ext]) => ext.toUpperCase()),
                    datasets: [{
                        data: topExtensions.map(([, count]) => count),
                        backgroundColor: [
                            '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
                            '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
                        ],
                        borderWidth: 2,
                        borderColor: '#0f172a'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                color: '#cbd5e1',
                                font: {
                                    family: "'Inter', sans-serif",
                                    size: 12
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Distribuição de Tipos de Arquivo',
                            color: '#f8fafc',
                            font: {
                                family: "'Inter', sans-serif",
                                size: 14,
                                weight: '600'
                            }
                        }
                    }
                }
            });
        }
        
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [viewMode, topExtensions]);
    
    return React.createElement('div', {
        className: 'visualization-container',
        style: { 
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '12px',
            padding: '25px',
            border: '1px solid #334155'
        }
    }, [
        // Cabeçalho
        React.createElement('div', {
            key: 'header',
            style: { 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '25px'
            }
        }, [
            React.createElement('div', {
                key: 'title'
            }, [
                React.createElement('h3', {
                    key: 'repo-name',
                    style: { 
                        color: '#f8fafc',
                        margin: '0 0 5px 0',
                        fontSize: '18px'
                    }
                }, [
                    React.createElement('i', {
                        key: 'icon',
                        className: 'fas fa-code-branch',
                        style: { color: '#3b82f6', marginRight: '10px' }
                    }),
                    `${repoInfo.owner}/${repoInfo.name}`
                ]),
                repoInfo.description && React.createElement('p', {
                    key: 'description',
                    style: { 
                        color: '#94a3b8',
                        margin: '0',
                        fontSize: '14px',
                        maxWidth: '600px'
                    }
                }, repoInfo.description)
            ]),
            
            React.createElement('div', {
                key: 'stats',
                style: { 
                    display: 'flex',
                    gap: '15px',
                    alignItems: 'center'
                }
            }, [
                React.createElement('div', {
                    key: 'stars',
                    style: { textAlign: 'center' }
                }, [
                    React.createElement('div', {
                        key: 'count',
                        style: { 
                            color: '#f8fafc',
                            fontSize: '18px',
                            fontWeight: 'bold'
                        }
                    }, repoInfo.stars),
                    React.createElement('div', {
                        key: 'label',
                        style: { 
                            color: '#94a3b8',
                            fontSize: '12px'
                        }
                    }, '⭐ Stars')
                ]),
                React.createElement('div', {
                    key: 'forks',
                    style: { textAlign: 'center' }
                }, [
                    React.createElement('div', {
                        key: 'count',
                        style: { 
                            color: '#f8fafc',
                            fontSize: '18px',
                            fontWeight: 'bold'
                        }
                    }, repoInfo.forks),
                    React.createElement('div', {
                        key: 'label',
                        style: { 
                            color: '#94a3b8',
                            fontSize: '12px'
                        }
                    }, '🍴 Forks')
                ]),
                React.createElement('div', {
                    key: 'files',
                    style: { textAlign: 'center' }
                }, [
                    React.createElement('div', {
                        key: 'count',
                        style: { 
                            color: '#f8fafc',
                            fontSize: '18px',
                            fontWeight: 'bold'
                        }
                    }, files.length),
                    React.createElement('div', {
                        key: 'label',
                        style: { 
                            color: '#94a3b8',
                            fontSize: '12px'
                        }
                    }, '📁 Arquivos')
                ])
            ])
        ]),
        
        // Modos de visualização
        React.createElement('div', {
            key: 'view-tabs',
            style: {
                display: 'flex',
                gap: '10px',
                marginBottom: '25px',
                borderBottom: '1px solid #334155',
                paddingBottom: '10px'
            }
        }, [
            React.createElement('button', {
                key: 'list-view',
                onClick: () => setViewMode('list'),
                style: {
                    padding: '10px 20px',
                    background: viewMode === 'list' ? '#3b82f6' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    color: viewMode === 'list' ? 'white' : '#cbd5e1',
                    cursor: 'pointer',
                    fontWeight: viewMode === 'list' ? '600' : '400',
                    transition: 'all 0.2s'
                }
            }, [
                React.createElement('i', {
                    key: 'icon',
                    className: 'fas fa-list',
                    style: { marginRight: '8px' }
                }),
                'Lista de Arquivos'
            ]),
            
            React.createElement('button', {
                key: 'chart-view',
                onClick: () => setViewMode('chart'),
                style: {
                    padding: '10px 20px',
                    background: viewMode === 'chart' ? '#3b82f6' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    color: viewMode === 'chart' ? 'white' : '#cbd5e1',
                    cursor: 'pointer',
                    fontWeight: viewMode === 'chart' ? '600' : '400',
                    transition: 'all 0.2s'
                }
            }, [
                React.createElement('i', {
                    key: 'icon',
                    className: 'fas fa-chart-pie',
                    style: { marginRight: '8px' }
                }),
                'Gráficos'
            ])
        ]),
        
        // Conteúdo baseado no modo
        viewMode === 'list' 
            ? React.createElement(FileList, {
                key: 'file-list',
                files: files.map(f => ({ ...f, repoInfo })),
                onFileClick: (file) => {
                    window.open(`${repoInfo.url}/blob/${repoInfo.default_branch}/${file.path}`, '_blank');
                }
            })
            : React.createElement('div', {
                key: 'chart-view',
                style: { minHeight: '400px' }
            }, [
                React.createElement('div', {
                    key: 'chart-container',
                    style: { 
                        background: '#1e293b',
                        borderRadius: '8px',
                        padding: '20px',
                        height: '400px'
                    }
                }, [
                    React.createElement('canvas', {
                        key: 'chart',
                        ref: chartRef
                    })
                ])
            ])
    ]);
};

// ==================== COMPONENTE PRINCIPAL ====================
function App() {
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState('Pronto para analisar');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [repoData, setRepoData] = useState(null);
    const [cacheStats, setCacheStats] = useState(() => cache.getStats());
    const [showCachePanel, setShowCachePanel] = useState(false);
    
    // Exemplos de repositórios
    const examples = [
        { name: 'React', url: 'https://github.com/facebook/react' },
        { name: 'Vue.js', url: 'https://github.com/vuejs/vue' },
        { name: 'VS Code', url: 'https://github.com/microsoft/vscode' },
        { name: 'Next.js', url: 'https://github.com/vercel/next.js' }
    ];
    
    // Analisar repositório
    const analyzeRepository = async (githubUrl = null) => {
        const urlToAnalyze = githubUrl || url;
        
        if (!urlToAnalyze) {
            setError('Por favor, insira uma URL do GitHub');
            return;
        }
        
        // Extrair owner/repo da URL
        const match = urlToAnalyze.match(/github\.com\/([^/]+)\/([^/#?]+)/);
        if (!match) {
            setError('URL do GitHub inválida. Formato: https://github.com/usuario/repositorio');
            return;
        }
        
        const [_, owner, repo] = match;
        const repoKey = `${owner}/${repo}`;
        
        // Verificar cache primeiro
        const cacheKey = `repo_${owner}_${repo}`;
        const cachedData = cache.get(cacheKey);
        
        if (cachedData) {
            console.log('Carregando do cache:', cacheKey);
            setStatus('📦 Carregando dados do cache...');
            setTimeout(() => {
                setRepoData(cachedData);
                setStatus(`✅ ${cachedData.files.length} arquivos carregados (cache)`);
                setError(null);
                showNotification('Dados carregados do cache!', 'success');
                setCacheStats(cache.getStats());
            }, 300);
            return;
        }
        
        // Buscar da API
        setLoading(true);
        setStatus('🔍 Conectando ao GitHub...');
        setError(null);
        
        try {
            const result = await fetchRepositoryData(owner, repo);
            
            if (result.success) {
                setRepoData(result);
                
                // Salvar no cache
                cache.set(cacheKey, result);
                setCacheStats(cache.getStats());
                
                setStatus(`✅ ${result.files.length} arquivos analisados com sucesso!`);
                showNotification('Análise concluída e salva no cache!', 'success');
            } else {
                setError(result.error);
                setStatus('❌ Erro na análise');
                showNotification(result.error, 'error');
            }
        } catch (err) {
            console.error('Erro na análise:', err);
            setError(err.message);
            setStatus('❌ Erro na conexão');
            showNotification('Erro ao conectar com GitHub: ' + err.message, 'error');
        } finally {
            setLoading(false);
        }
    };
    
    // Limpar análise atual
    const clearAnalysis = () => {
        setRepoData(null);
        setUrl('');
        setStatus('Pronto para analisar');
        setError(null);
    };
    
    // Tecla Enter para análise
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            analyzeRepository();
        }
    };
    
    // Atualizar estatísticas de cache
    useEffect(() => {
        const updateCacheStats = () => {
            setCacheStats(cache.getStats());
        };
        
        window.addEventListener('cacheCleared', updateCacheStats);
        return () => window.removeEventListener('cacheCleared', updateCacheStats);
    }, []);
    
    return React.createElement('div', { 
        className: 'app-container',
        style: { 
            padding: '20px',
            maxWidth: '1400px',
            margin: '0 auto',
            marginTop: '80px',
            minHeight: 'calc(100vh - 160px)'
        }
    }, [
        // Painel lateral esquerdo (controles)
        React.createElement('div', {
            key: 'control-panel',
            style: {
                position: 'fixed',
                left: '20px',
                top: '90px',
                width: '380px',
                bottom: '100px',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                borderRadius: '12px',
                padding: '25px',
                border: '1px solid #334155',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                zIndex: 100,
                overflowY: 'auto'
            }
        }, [
            // Título
            React.createElement('div', {
                key: 'panel-header',
                style: { marginBottom: '25px' }
            }, [
                React.createElement('h2', {
                    key: 'title',
                    style: { 
                        color: '#f8fafc',
                        margin: '0 0 10px 0',
                        fontSize: '22px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }
                }, [
                    React.createElement('i', {
                        key: 'icon',
                        className: 'fas fa-project-diagram',
                        style: { color: '#3b82f6' }
                    }),
                    'Code Dependency Tree'
                ]),
                React.createElement('p', {
                    key: 'subtitle',
                    style: { 
                        fontSize: '14px', 
                        color: '#94a3b8', 
                        margin: '0',
                        lineHeight: '1.5'
                    }
                }, 'Visualize a estrutura e dependências de qualquer repositório GitHub')
            ]),
            
            // Input de URL
            React.createElement('div', {
                key: 'input-container',
                style: { marginBottom: '20px' }
            }, [
                React.createElement('label', {
                    key: 'label',
                    htmlFor: 'github-url',
                    style: { 
                        display: 'block',
                        color: '#cbd5e1',
                        marginBottom: '8px',
                        fontSize: '14px',
                        fontWeight: '500'
                    }
                }, 'URL do Repositório GitHub'),
                React.createElement('input', {
                    key: 'input',
                    id: 'github-url',
                    type: 'text',
                    placeholder: 'https://github.com/usuario/repositorio',
                    value: url,
                    onChange: (e) => setUrl(e.target.value),
                    onKeyPress: handleKeyPress,
                    disabled: loading,
                    style: {
                        width: '100%',
                        padding: '12px 15px',
                        background: '#1e293b',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#f8fafc',
                        fontSize: '14px',
                        fontFamily: "'Inter', sans-serif"
                    }
                })
            ]),
            
            // Botões de ação
            React.createElement('div', {
                key: 'action-buttons',
                style: { 
                    display: 'flex',
                    gap: '10px',
                    marginBottom: '25px'
                }
            }, [
                React.createElement('button', {
                    key: 'analyze-btn',
                    onClick: () => analyzeRepository(),
                    disabled: loading || !url,
                    style: {
                        flex: 1,
                        padding: '14px 20px',
                        background: loading ? '#475569' : '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                    }
                }, loading ? [
                    React.createElement('i', {
                        key: 'spinner',
                        className: 'fas fa-spinner fa-spin'
                    }),
                    'ANALISANDO...'
                ] : [
                    React.createElement('i', {
                        key: 'icon',
                        className: 'fas fa-rocket'
                    }),
                    'ANALISAR'
                ]),
                
                repoData && React.createElement('button', {
                    key: 'clear-btn',
                    onClick: clearAnalysis,
                    style: {
                        padding: '14px 20px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }
                }, [
                    React.createElement('i', {
                        key: 'icon',
                        className: 'fas fa-trash-alt'
                    }),
                    'LIMPAR'
                ])
            ]),
            
            // Status
            React.createElement('div', {
                key: 'status-container',
                style: {
                    padding: '15px',
                    background: error ? 'rgba(239, 68, 68, 0.1)' : 'rgba(30, 41, 59, 0.8)',
                    borderRadius: '8px',
                    marginBottom: '25px',
                    border: `1px solid ${error ? '#ef4444' : '#475569'}`
                }
            }, [
                React.createElement('div', {
                    key: 'status-header',
                    style: { 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: error ? '10px' : '0'
                    }
                }, [
                    React.createElement('strong', {
                        key: 'label',
                        style: { 
                            color: error ? '#fca5a5' : '#cbd5e1',
                            fontSize: '14px'
                        }
                    }, 'Status:'),
                    React.createElement('span', {
                        key: 'text',
                        style: { 
                            color: error ? '#fca5a5' : '#94a3b8',
                            fontSize: '14px'
                        }
                    }, status)
                ]),
                
                error && React.createElement('div', {
                    key: 'error-message',
                    style: { 
                        marginTop: '10px', 
                        padding: '10px',
                        background: 'rgba(239, 68, 68, 0.2)',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#fca5a5'
                    }
                }, [
                    React.createElement('i', {
                        key: 'icon',
                        className: 'fas fa-exclamation-circle',
                        style: { marginRight: '8px' }
                    }),
                    error
                ])
            ]),
            
            // Cache Info
            React.createElement('div', {
                key: 'cache-info',
                style: {
                    marginBottom: '25px'
                }
            }, [
                React.createElement('div', {
                    key: 'cache-header',
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '15px'
                    }
                }, [
                    React.createElement('h4', {
                        key: 'title',
                        style: { 
                            color: '#cbd5e1',
                            margin: '0',
                            fontSize: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                    }
                }, [
                    React.createElement('i', {
                        key: 'icon',
                        className: 'fas fa-database',
                        style: { color: '#10b981' }
                    }),
                    'Cache Local'
                ]),
                React.createElement('button', {
                    key: 'toggle-btn',
                    onClick: () => setShowCachePanel(!showCachePanel),
                    style: {
                        background: 'transparent',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        fontSize: '12px'
                    }
                }, showCachePanel ? 'Ocultar' : 'Mostrar')
            ]),
            
            showCachePanel && React.createElement('div', {
                key: 'cache-details',
                style: {
                    background: 'rgba(30, 41, 59, 0.8)',
                    borderRadius: '8px',
                    padding: '15px',
                    border: '1px solid #475569'
                }
            }, [
                React.createElement('div', {
                    key: 'stats',
                    style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '10px',
                        marginBottom: '15px'
                    }
                }, [
                    React.createElement('div', {
                        key: 'total',
                        style: { textAlign: 'center' }
                    }, [
                        React.createElement('div', {
                            key: 'value',
                            style: { 
                                color: '#3b82f6',
                                fontSize: '20px',
                                fontWeight: 'bold'
                            }
                        }, cacheStats.total),
                        React.createElement('div', {
                            key: 'label',
                            style: { 
                                color: '#94a3b8',
                                fontSize: '12px'
                            }
                        }, 'Repositórios')
                    ]),
                    React.createElement('div', {
                        key: 'size',
                        style: { textAlign: 'center' }
                    }, [
                        React.createElement('div', {
                            key: 'value',
                            style: { 
                                color: '#10b981',
                                fontSize: '20px',
                                fontWeight: 'bold'
                            }
                        }, cacheStats.sizeMB || '0'),
                        React.createElement('div', {
                            key: 'label',
                            style: { 
                                color: '#94a3b8',
                                fontSize: '12px'
                            }
                        }, 'MB Armazenados')
                    ])
                ]),
                
                cacheStats.repos.length > 0 && React.createElement('div', {
                    key: 'repo-list'
                }, [
                    React.createElement('div', {
                        key: 'list-title',
                        style: {
                            color: '#cbd5e1',
                            fontSize: '13px',
                            marginBottom: '10px'
                        }
                    }, 'Repositórios em cache:'),
                    React.createElement('div', {
                        key: 'repo-items',
                        style: { maxHeight: '150px', overflowY: 'auto' }
                    }, cacheStats.repos.map((repo, index) => 
                        React.createElement('div', {
                            key: index,
                            style: {
                                padding: '8px 10px',
                                background: 'rgba(15, 23, 42, 0.5)',
                                borderRadius: '6px',
                                marginBottom: '5px',
                                fontSize: '12px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }
                        }, [
                            React.createElement('span', {
                                key: 'name',
                                style: { color: '#cbd5e1' }
                            }, `${repo.owner}/${repo.name}`),
                            React.createElement('span', {
                                key: 'files',
                                style: { color: '#94a3b8', fontSize: '11px' }
                            }, `${repo.files} arquivos`)
                        ])
                    ))
                ])
            ])
        ]),
        
        // Exemplos rápidos
        React.createElement('div', {
            key: 'examples-section',
            style: { marginTop: '25px' }
        }, [
            React.createElement('p', {
                key: 'label',
                style: { 
                    color: '#94a3b8', 
                    fontSize: '14px',
                    marginBottom: '12px'
                }
            }, 'Experimente com:'),
            React.createElement('div', {
                key: 'example-buttons',
                style: { 
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                }
            }, examples.map((example, index) => 
                React.createElement('button', {
                    key: `example-${index}`,
                    onClick: () => {
                        setUrl(example.url);
                        setTimeout(() => analyzeRepository(example.url), 100);
                    },
                    style: {
                        padding: '8px 15px',
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: '#3b82f6',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        transition: 'all 0.2s',
                        flex: '1 0 calc(50% - 4px)'
                    },
                    onMouseEnter: (e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                        e.currentTarget.style.borderColor = '#3b82f6';
                    },
                    onMouseLeave: (e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                    }
                }, example.name)
            ))
        ]),
        
        // Informações
        React.createElement('div', {
            key: 'info-section',
            style: {
                marginTop: '25px',
                padding: '15px',
                background: 'rgba(59, 130, 246, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(59, 130, 246, 0.1)'
            }
        }, [
            React.createElement('p', {
                key: 'info-text',
                style: { 
                    color: '#94a3b8', 
                    fontSize: '12px',
                    margin: '0',
                    lineHeight: '1.6'
                }
            }, [
                React.createElement('i', {
                    key: 'icon',
                    className: 'fas fa-info-circle',
                    style: { marginRight: '8px', color: '#3b82f6' }
                }),
                'Esta ferramenta analisa a estrutura de repositórios GitHub. Os dados são armazenados localmente no seu navegador.'
            ])
        ])
    ]),
    
    // Área principal de conteúdo
    React.createElement('div', {
        key: 'main-content',
        style: {
            marginLeft: '420px',
            minHeight: 'calc(100vh - 160px)'
        }
    }, 
        repoData 
            ? React.createElement(RepositoryVisualization, {
                key: 'visualization',
                repoInfo: repoData.repoInfo,
                files: repoData.files
            })
            : React.createElement('div', {
                key: 'empty-state',
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 200px)',
                    textAlign: 'center',
                    padding: '40px 20px'
                }
            }, [
                React.createElement('div', {
                    key: 'icon',
                    style: { 
                        fontSize: '80px',
                        color: '#334155',
                        marginBottom: '30px',
                        opacity: '0.5'
                    }
                }, '🌳'),
                React.createElement('h3', {
                    key: 'title',
                    style: { 
                        color: '#cbd5e1', 
                        marginBottom: '15px',
                        fontSize: '22px'
                    }
                }, 'Visualize Dependências de Código'),
                React.createElement('p', {
                    key: 'subtitle',
                    style: { 
                        color: '#94a3b8', 
                        fontSize: '16px',
                        maxWidth: '600px',
                        marginBottom: '30px',
                        lineHeight: '1.6'
                    }
                }, 'Cole uma URL do GitHub para visualizar a estrutura de arquivos, dependências e métricas do repositório.'),
                React.createElement('div', {
                    key: 'features',
                    style: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '20px',
                        maxWidth: '700px',
                        marginTop: '40px'
                    }
                }, [
                    React.createElement('div', {
                        key: 'feature-1',
                        style: {
                            padding: '20px',
                            background: 'rgba(30, 41, 59, 0.8)',
                            borderRadius: '10px',
                            border: '1px solid #334155'
                        }
                    }, [
                        React.createElement('div', {
                            key: 'icon',
                            style: {
                                fontSize: '24px',
                                color: '#3b82f6',
                                marginBottom: '15px'
                            }
                        }, '📊'),
                        React.createElement('h4', {
                            key: 'title',
                            style: { 
                                color: '#f8fafc',
                                margin: '0 0 10px 0'
                            }
                        }, 'Análise de Estrutura'),
                        React.createElement('p', {
                            key: 'desc',
                            style: { 
                                color: '#94a3b8',
                                fontSize: '14px',
                                margin: '0'
                            }
                        }, 'Visualize a organização de arquivos e pastas do repositório')
                    ]),
                    React.createElement('div', {
                        key: 'feature-2',
                        style: {
                            padding: '20px',
                            background: 'rgba(30, 41, 59, 0.8)',
                            borderRadius: '10px',
                            border: '1px solid #334155'
                        }
                    }, [
                        React.createElement('div', {
                            key: 'icon',
                            style: {
                                fontSize: '24px',
                                color: '#10b981',
                                marginBottom: '15px'
                            }
                        }, '📈'),
                        React.createElement('h4', {
                            key: 'title',
                            style: { 
                                color: '#f8fafc',
                                margin: '0 0 10px 0'
                            }
                        }, 'Métricas e Estatísticas'),
                        React.createElement('p', {
                            key: 'desc',
                            style: { 
                                color: '#94a3b8',
                                fontSize: '14px',
                                margin: '0'
                            }
                        }, 'Distribuição de tipos de arquivos e informações do projeto')
                    ]),
                    React.createElement('div', {
                        key: 'feature-3',
                        style: {
                            padding: '20px',
                            background: 'rgba(30, 41, 59, 0.8)',
                            borderRadius: '10px',
                            border: '1px solid #334155'
                        }
                    }, [
                        React.createElement('div', {
                            key: 'icon',
                            style: {
                                fontSize: '24px',
                                color: '#f59e0b',
                                marginBottom: '15px'
                            }
                        }, '💾'),
                        React.createElement('h4', {
                            key: 'title',
                            style: { 
                                color: '#f8fafc',
                                margin: '0 0 10px 0'
                            }
                        }, 'Cache Local'),
                        React.createElement('p', {
                            key: 'desc',
                            style: { 
                                color: '#94a3b8',
                                fontSize: '14px',
                                margin: '0'
                            }
                        }, 'Análises salvas localmente para acesso rápido e offline')
                    ]),
                    React.createElement('div', {
                        key: 'feature-4',
                        style: {
                            padding: '20px',
                            background: 'rgba(30, 41, 59, 0.8)',
                            borderRadius: '10px',
                            border: '1px solid #334155'
                        }
                    }, [
                        React.createElement('div', {
                            key: 'icon',
                            style: {
                                fontSize: '24px',
                                color: '#8b5cf6',
                                marginBottom: '15px'
                            }
                        }, '🚀'),
                        React.createElement('h4', {
                            key: 'title',
                            style: { 
                                color: '#f8fafc',
                                margin: '0 0 10px 0'
                            }
                        }, 'Desempenho'),
                        React.createElement('p', {
                            key: 'desc',
                            style: { 
                                color: '#94a3b8',
                                fontSize: '14px',
                                margin: '0'
                            }
                        }, 'Interface otimizada para análise rápida de grandes repositórios')
                    ])
                ])
            ])
    )
]);
}

// ==================== INICIALIZAÇÃO DA APLICAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, inicializando CodeCartographer...');
    
    const container = document.getElementById('app');
    if (!container) {
        console.error('Container #app não encontrado!');
        return;
    }
    
    // Remover tela de carregamento inicial
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
    
    if (window.React && window.ReactDOM) {
        console.log('React disponível, renderizando aplicação...');
        try {
            const root = createRoot(container);
            root.render(React.createElement(App));
            console.log('Aplicação renderizada com sucesso!');
            
            // Adicionar classe para indicar que o React está pronto
            container.classList.add('react-root');
            
        } catch (error) {
            console.error('Erro ao renderizar React:', error);
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #dc2626;">
                    <h3><i class="fas fa-exclamation-triangle"></i> Erro ao Inicializar</h3>
                    <p style="margin: 15px 0; color: #94a3b8;">Detalhes: ${error.message}</p>
                    <div style="margin-top: 25px;">
                        <button onclick="window.location.reload()" 
                                style="padding: 10px 20px; margin: 5px; background: #3b82f6; 
                                       color: white; border: none; border-radius: 6px; cursor: pointer;">
                            <i class="fas fa-redo"></i> Recarregar
                        </button>
                        <button onclick="localStorage.clear(); window.location.reload()" 
                                style="padding: 10px 20px; margin: 5px; background: #ef4444; 
                                       color: white; border: none; border-radius: 6px; cursor: pointer;">
                            <i class="fas fa-trash"></i> Limpar Cache e Recarregar
                        </button>
                    </div>
                </div>
            `;
        }
    } else {
        console.error('React não está disponível!');
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #ef4444;">
                <h3><i class="fas fa-exclamation-triangle"></i> Dependências Não Carregadas</h3>
                <p style="margin: 15px 0; color: #94a3b8;">
                    As bibliotecas React não foram carregadas corretamente.
                </p>
                <button onclick="window.location.reload()" 
                        style="padding: 10px 20px; margin-top: 20px; background: #3b82f6; 
                               color: white; border: none; border-radius: 6px; cursor: pointer;">
                    Tentar Novamente
                </button>
            </div>
        `;
    }
});

// Adicionar estilos globais
const globalStyles = `
    .react-root { min-height: 100vh; }
    
    /* Scrollbar customizada */
    ::-webkit-scrollbar { width: 10px; height: 10px; }
    ::-webkit-scrollbar-track { background: #1e293b; border-radius: 5px; }
    ::-webkit-scrollbar-thumb { 
        background: #475569; 
        border-radius: 5px;
        border: 2px solid #1e293b;
    }
    ::-webkit-scrollbar-thumb:hover { background: #64748b; }
    
    /* Animações */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .file-item { animation: fadeIn 0.3s ease; }
    
    /* Tema claro */
    .light-theme {
        background: #f8fafc;
        color: #1e293b;
    }
    
    .light-theme .main-header {
        background: white;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .light-theme .main-footer {
        background: #f1f5f9;
        border-top: 1px solid #e2e8f0;
    }
`;

// Injetar estilos globais
const styleElement = document.createElement('style');
styleElement.textContent = globalStyles;
document.head.appendChild(styleElement);

console.log('CodeCartographer v4.0 inicializado com sucesso!');
