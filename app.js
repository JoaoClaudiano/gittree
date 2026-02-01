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
        font-family: 'Inter', sans-serif;
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

// Função para exportar dados como JSON
const exportAsJSON = (data, filename) => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${filename}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
};

// Função para exportar dados como TXT
const exportAsTXT = (data, filename) => {
    let txtContent = `CodeCartographer Analysis - ${filename}\n`;
    txtContent += `Generated: ${new Date().toLocaleString()}\n`;
    txtContent += '='.repeat(60) + '\n\n';
    
    if (data.repoInfo) {
        txtContent += `REPOSITORY: ${data.repoInfo.owner}/${data.repoInfo.name}\n`;
        txtContent += `Description: ${data.repoInfo.description || 'N/A'}\n`;
        txtContent += `Stars: ${data.repoInfo.stars} | Forks: ${data.repoInfo.forks}\n`;
        txtContent += `Language: ${data.repoInfo.language || 'Multiple'}\n`;
        txtContent += '='.repeat(60) + '\n\n';
    }
    
    if (data.files) {
        txtContent += `TOTAL FILES: ${data.files.length}\n\n`;
        txtContent += 'FILE LIST:\n';
        txtContent += '-'.repeat(60) + '\n';
        
        data.files.forEach((file, index) => {
            txtContent += `${index + 1}. ${file.path}\n`;
            txtContent += `   Type: ${file.language} | Size: ${file.sizeKB} KB\n`;
            txtContent += `   Extension: .${file.extension}\n`;
            txtContent += '-'.repeat(40) + '\n';
        });
    }
    
    const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(txtContent);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `${filename}.txt`);
    linkElement.click();
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

// ==================== COMPONENTE DE ÁRVORE DE ARQUIVOS ====================
const FileTree = ({ files, onFileClick }) => {
    const [expandedFolders, setExpandedFolders] = useState({});
    const [search, setSearch] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    
    // Construir estrutura de árvore
    const buildTree = () => {
        const tree = {};
        
        files.forEach(file => {
            const parts = file.path.split('/');
            let current = tree;
            
            parts.forEach((part, index) => {
                const isFile = index === parts.length - 1;
                
                if (!current[part]) {
                    current[part] = {
                        name: part,
                        type: isFile ? 'file' : 'folder',
                        path: parts.slice(0, index + 1).join('/'),
                        children: {},
                        expanded: expandedFolders[parts.slice(0, index + 1).join('/')] || false,
                        isCodeFile: isFile ? file.isCodeFile : false,
                        extension: isFile ? file.extension : null,
                        sizeKB: isFile ? file.sizeKB : 0,
                        language: isFile ? file.language : null,
                        fileData: isFile ? file : null
                    };
                }
                
                if (!isFile) {
                    current = current[part].children;
                }
            });
        });
        
        return tree;
    };
    
    // Renderizar árvore
    const renderTree = (node, level = 0, fullPath = '') => {
        if (!node) return null;
        
        const nodeEntries = Object.entries(node);
        const filteredEntries = search 
            ? nodeEntries.filter(([key, value]) => 
                value.name.toLowerCase().includes(search.toLowerCase()) ||
                (value.type === 'file' && value.path.toLowerCase().includes(search.toLowerCase()))
              )
            : nodeEntries;
        
        if (filteredEntries.length === 0) return null;
        
        return filteredEntries.map(([key, item]) => {
            const isSelected = selectedFile?.path === item.path;
            const indent = level * 24;
            
            if (item.type === 'folder') {
                const hasChildren = Object.keys(item.children).length > 0;
                const isExpanded = expandedFolders[item.path] || false;
                
                return React.createElement('div', {
                    key: item.path,
                    style: {
                        marginLeft: `${indent}px`,
                        marginBottom: '2px'
                    }
                }, [
                    // Pasta
                    React.createElement('div', {
                        key: 'folder',
                        style: {
                            padding: '6px 10px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s',
                            background: isSelected ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                            border: isSelected ? '1px solid #3b82f6' : '1px solid transparent'
                        },
                        onClick: () => {
                            if (hasChildren) {
                                setExpandedFolders(prev => ({
                                    ...prev,
                                    [item.path]: !isExpanded
                                }));
                            }
                        },
                        onMouseEnter: (e) => {
                            if (!isSelected) {
                                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                            }
                        },
                        onMouseLeave: (e) => {
                            if (!isSelected) {
                                e.currentTarget.style.background = 'transparent';
                            }
                        }
                    }, [
                        React.createElement('i', {
                            key: 'icon',
                            className: isExpanded ? 'fas fa-folder-open' : 'fas fa-folder',
                            style: { 
                                color: '#f59e0b',
                                fontSize: '14px',
                                width: '20px'
                            }
                        }),
                        React.createElement('span', {
                            key: 'name',
                            style: {
                                color: '#f8fafc',
                                fontSize: '14px',
                                fontWeight: '500',
                                fontFamily: "'Inter', sans-serif"
                            }
                        }, item.name),
                        hasChildren && React.createElement('span', {
                            key: 'count',
                            style: {
                                marginLeft: 'auto',
                                fontSize: '11px',
                                color: '#94a3b8',
                                background: 'rgba(30, 41, 59, 0.8)',
                                padding: '2px 8px',
                                borderRadius: '10px'
                            }
                        }, Object.keys(item.children).length)
                    ]),
                    
                    // Conteúdo da pasta (recursivo)
                    isExpanded && hasChildren && React.createElement('div', {
                        key: 'children',
                        style: {
                            marginLeft: '20px',
                            borderLeft: '1px dashed #475569',
                            paddingLeft: '4px'
                        }
                    }, renderTree(item.children, level + 1, item.path))
                ]);
            } else {
                // Arquivo
                return React.createElement('div', {
                    key: item.path,
                    style: {
                        marginLeft: `${indent}px`,
                        marginBottom: '2px'
                    }
                }, [
                    React.createElement('div', {
                        key: 'file',
                        style: {
                            padding: '6px 10px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s',
                            background: isSelected ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                            border: isSelected ? '1px solid #3b82f6' : '1px solid transparent'
                        },
                        onClick: () => {
                            setSelectedFile(item);
                            if (onFileClick) onFileClick(item.fileData);
                        },
                        onMouseEnter: (e) => {
                            if (!isSelected) {
                                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                            }
                        },
                        onMouseLeave: (e) => {
                            if (!isSelected) {
                                e.currentTarget.style.background = 'transparent';
                            }
                        }
                    }, [
                        React.createElement('div', {
                            key: 'icon',
                            style: {
                                width: '20px',
                                height: '20px',
                                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: '#3b82f6'
                            }
                        }, getFileIcon(item.extension)),
                        React.createElement('span', {
                            key: 'name',
                            style: {
                                color: '#cbd5e1',
                                fontSize: '13px',
                                fontFamily: "'JetBrains Mono', monospace",
                                flex: 1
                            }
                        }, item.name),
                        React.createElement('span', {
                            key: 'size',
                            style: {
                                fontSize: '11px',
                                color: '#94a3b8',
                                marginLeft: 'auto'
                            }
                        }, `${item.sizeKB} KB`)
                    ])
                ]);
            }
        });
    };
    
    const tree = buildTree();
    
    // Funções para expandir/colapsar tudo
    const expandAll = () => {
        const newExpanded = {};
        const expandRecursive = (node, path = '') => {
            Object.entries(node).forEach(([key, item]) => {
                if (item.type === 'folder' && Object.keys(item.children).length > 0) {
                    newExpanded[item.path] = true;
                    expandRecursive(item.children, item.path);
                }
            });
        };
        expandRecursive(tree);
        setExpandedFolders(newExpanded);
    };
    
    const collapseAll = () => {
        setExpandedFolders({});
        setSelectedFile(null);
    };
    
    return React.createElement('div', {
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
        // Controles da árvore
        React.createElement('div', {
            key: 'controls',
            style: {
                display: 'flex',
                gap: '10px',
                marginBottom: '20px',
                flexWrap: 'wrap',
                alignItems: 'center'
            }
        }, [
            React.createElement('div', {
                key: 'search',
                style: { flex: 1, minWidth: '200px' }
            }, [
                React.createElement('input', {
                    key: 'search-input',
                    type: 'text',
                    placeholder: '🔍 Buscar na árvore...',
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    style: {
                        width: '100%',
                        padding: '10px 15px',
                        background: '#1e293b',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#f8fafc',
                        fontSize: '14px',
                        fontFamily: "'Inter', sans-serif"
                    }
                })
            ]),
            
            React.createElement('button', {
                key: 'expand-all',
                onClick: expandAll,
                title: 'Expandir todas as pastas',
                style: {
                    padding: '8px 12px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '6px',
                    color: '#3b82f6',
                    cursor: 'pointer',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }
            }, [
                React.createElement('i', { key: 'icon', className: 'fas fa-expand-alt' }),
                'Expandir'
            ]),
            
            React.createElement('button', {
                key: 'collapse-all',
                onClick: collapseAll,
                title: 'Colapsar todas as pastas',
                style: {
                    padding: '8px 12px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '6px',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }
            }, [
                React.createElement('i', { key: 'icon', className: 'fas fa-compress-alt' }),
                'Colapsar'
            ])
        ]),
        
        // Informações da seleção
        selectedFile && React.createElement('div', {
            key: 'selection-info',
            style: {
                padding: '12px',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '8px',
                marginBottom: '15px',
                border: '1px solid rgba(59, 130, 246, 0.3)'
            }
        }, [
            React.createElement('div', {
                key: 'header',
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                }
            }, [
                React.createElement('div', {
                    key: 'title',
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }
                }, [
                    React.createElement('i', {
                        key: 'icon',
                        className: 'fas fa-file',
                        style: { color: '#3b82f6' }
                    }),
                    React.createElement('span', {
                        key: 'filename',
                        style: {
                            fontFamily: "'JetBrains Mono', monospace",
                            color: '#f8fafc',
                            fontSize: '13px'
                        }
                    }, selectedFile.name)
                ]),
                React.createElement('button', {
                    key: 'open',
                    onClick: () => {
                        if (onFileClick) onFileClick(selectedFile.fileData);
                    },
                    style: {
                        padding: '4px 8px',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '11px',
                        cursor: 'pointer'
                    }
                }, 'Abrir no GitHub')
            ]),
            React.createElement('div', {
                key: 'details',
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '8px',
                    fontSize: '12px',
                    color: '#94a3b8'
                }
            }, [
                React.createElement('div', { key: 'path' }, `Caminho: ${selectedFile.path}`),
                React.createElement('div', { key: 'size' }, `Tamanho: ${selectedFile.sizeKB} KB`),
                React.createElement('div', { key: 'type' }, `Tipo: ${selectedFile.language}`),
                React.createElement('div', { key: 'ext' }, `Extensão: .${selectedFile.extension}`)
            ])
        ]),
        
        // Árvore
        React.createElement('div', {
            key: 'tree-container',
            style: {
                flex: 1,
                overflowY: 'auto',
                padding: '5px'
            }
        }, renderTree(tree))
    ]);
};

// ==================== COMPONENTE DE LISTA DE ARQUIVOS ====================
const FileList = ({ files, onFileClick }) => {
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [showHorizontal, setShowHorizontal] = useState(false);
    const [sortBy, setSortBy] = useState('name'); // 'name', 'size', 'type'
    
    const filteredFiles = files.filter(file => {
        const matchesSearch = file.path.toLowerCase().includes(search.toLowerCase());
        const matchesType = filterType === 'all' || 
                           (filterType === 'code' && file.isCodeFile) ||
                           (filterType === 'other' && !file.isCodeFile);
        return matchesSearch && matchesType;
    });
    
    // Ordenar arquivos
    const sortedFiles = [...filteredFiles].sort((a, b) => {
        switch (sortBy) {
            case 'size':
                return b.sizeKB - a.sizeKB;
            case 'type':
                return a.extension.localeCompare(b.extension);
            case 'name':
            default:
                return a.path.localeCompare(b.path);
        }
    });
    
    const toggleView = () => {
        setShowHorizontal(!showHorizontal);
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
            flexDirection: 'column',
            minWidth: '600px'
        }
    }, [
        // Controles
        React.createElement('div', {
            key: 'controls',
            style: { 
                display: 'flex',
                gap: '10px',
                marginBottom: '20px',
                flexWrap: 'wrap',
                alignItems: 'center'
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
            ]),
            
            React.createElement('select', {
                key: 'sort',
                value: sortBy,
                onChange: (e) => setSortBy(e.target.value),
                style: {
                    padding: '10px 15px',
                    background: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#cbd5e1',
                    fontSize: '14px',
                    minWidth: '120px'
                }
            }, [
                React.createElement('option', { key: 'name', value: 'name' }, 'Ordenar por nome'),
                React.createElement('option', { key: 'size', value: 'size' }, 'Ordenar por tamanho'),
                React.createElement('option', { key: 'type', value: 'type' }, 'Ordenar por tipo')
            ]),
            
            React.createElement('button', {
                key: 'toggle-view',
                onClick: toggleView,
                title: showHorizontal ? 'Mudar para visualização vertical' : 'Mudar para visualização horizontal',
                style: {
                    padding: '10px 15px',
                    background: showHorizontal ? '#3b82f6' : '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: showHorizontal ? 'white' : '#cbd5e1',
                    cursor: 'pointer',
                    fontSize: '14px'
                }
            }, [
                React.createElement('i', {
                    key: 'icon',
                    className: showHorizontal ? 'fas fa-list' : 'fas fa-th-large'
                }),
                showHorizontal ? ' Vertical' : ' Horizontal'
            ])
        ]),
        
        // Estatísticas
        React.createElement('div', {
            key: 'stats',
            style: {
                padding: '12px',
                background: 'rgba(30, 41, 59, 0.8)',
                borderRadius: '8px',
                marginBottom: '15px',
                border: '1px solid #475569',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px'
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
                }, sortedFiles.length),
                React.createElement('div', {
                    key: 'label',
                    style: { 
                        color: '#94a3b8',
                        fontSize: '12px'
                    }
                }, 'Arquivos')
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
                }, Math.round(sortedFiles.reduce((sum, f) => sum + f.sizeKB, 0))),
                React.createElement('div', {
                    key: 'label',
                    style: { 
                        color: '#94a3b8',
                        fontSize: '12px'
                    }
                }, 'KB Total')
            ]),
            React.createElement('div', {
                key: 'types',
                style: { textAlign: 'center' }
            }, [
                React.createElement('div', {
                    key: 'value',
                    style: { 
                        color: '#f59e0b',
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }
                }, new Set(sortedFiles.map(f => f.extension)).size),
                React.createElement('div', {
                    key: 'label',
                    style: { 
                        color: '#94a3b8',
                        fontSize: '12px'
                    }
                }, 'Tipos')
            ])
        ]),
        
        // Lista de arquivos
        React.createElement('div', {
            key: 'list-container',
            className: showHorizontal ? 'horizontal-scroll-container' : '',
            style: {
                flex: 1,
                overflowY: showHorizontal ? 'hidden' : 'auto',
                overflowX: showHorizontal ? 'auto' : 'hidden',
                paddingRight: '5px'
            }
        }, 
            sortedFiles.length === 0 
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
                : sortedFiles.map((file, index) => 
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
                                onFileClick && onFileClick(file);
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
    const [viewMode, setViewMode] = useState('tree'); // 'tree', 'list', 'chart'
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
                type: 'doughnut',
                data: {
                    labels: topExtensions.map(([ext]) => ext.toUpperCase()),
                    datasets: [{
                        data: topExtensions.map(([, count]) => count),
                        backgroundColor: [
                            '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
                            '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
                        ],
                        borderWidth: 2,
                        borderColor: '#0f172a',
                        hoverOffset: 15
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                color: '#cbd5e1',
                                font: {
                                    family: "'Inter', sans-serif",
                                    size: 12
                                },
                                padding: 15
                            }
                        },
                        title: {
                            display: true,
                            text: 'Distribuição de Tipos de Arquivo',
                            color: '#f8fafc',
                            font: {
                                family: "'Inter', sans-serif",
                                size: 16,
                                weight: '600'
                            },
                            padding: 20
                        },
                        tooltip: {
                            backgroundColor: 'rgba(15, 23, 42, 0.95)',
                            titleColor: '#f8fafc',
                            bodyColor: '#cbd5e1',
                            borderColor: '#475569',
                            borderWidth: 1,
                            cornerRadius: 6,
                            displayColors: true
                        }
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true
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
    
    // Funções de exportação
    const handleExportJSON = () => {
        const data = {
            repoInfo,
            files,
            analysisDate: new Date().toISOString(),
            stats: {
                totalFiles: files.length,
                codeFiles: files.filter(f => f.isCodeFile).length,
                totalSizeKB: files.reduce((sum, f) => sum + f.sizeKB, 0),
                uniqueExtensions: Object.keys(fileExtensions).length
            }
        };
        exportAsJSON(data, `${repoInfo.owner}_${repoInfo.name}_analysis`);
        showNotification('Análise exportada como JSON!', 'success');
    };
    
    const handleExportTXT = () => {
        const data = {
            repoInfo,
            files,
            analysisDate: new Date().toISOString()
        };
        exportAsTXT(data, `${repoInfo.owner}_${repoInfo.name}_analysis`);
        showNotification('Análise exportada como TXT!', 'success');
    };
    
    return React.createElement('div', {
        className: 'visualization-container',
        style: { 
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '12px',
            padding: '25px',
            border: '1px solid #334155',
            minWidth: '1200px',
            width: 'fit-content',
            overflowX: 'auto',
            overflowY: 'hidden'
        }
    }, [
        // Cabeçalho com ações
        React.createElement('div', {
            key: 'header',
            style: { 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '25px',
                flexWrap: 'wrap',
                gap: '15px'
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
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }
                }, [
                    React.createElement('i', {
                        key: 'icon',
                        className: 'fas fa-code-branch',
                        style: { color: '#3b82f6' }
                    }),
                    `${repoInfo.owner}/${repoInfo.name}`
                ]),
                repoInfo.description && React.createElement('p', {
                    key: 'description',
                    style: { 
                        color: '#94a3b8',
                        margin: '0',
                        fontSize: '14px',
                        maxWidth: '800px'
                    }
                }, repoInfo.description)
            ]),
            
            // Botões de exportação
            React.createElement('div', {
                key: 'export-buttons',
                style: { 
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                }
            }, [
                React.createElement('button', {
                    key: 'export-json',
                    onClick: handleExportJSON,
                    title: 'Exportar análise como JSON',
                    style: {
                        padding: '8px 15px',
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '6px',
                        color: '#3b82f6',
                        cursor: 'pointer',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s'
                    },
                    onMouseEnter: (e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                        e.currentTarget.style.borderColor = '#3b82f6';
                    },
                    onMouseLeave: (e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                    }
                }, [
                    React.createElement('i', { key: 'icon', className: 'fas fa-file-code' }),
                    'JSON'
                ]),
                
                React.createElement('button', {
                    key: 'export-txt',
                    onClick: handleExportTXT,
                    title: 'Exportar análise como texto',
                    style: {
                        padding: '8px 15px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: '6px',
                        color: '#10b981',
                        cursor: 'pointer',
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s'
                    },
                    onMouseEnter: (e) => {
                        e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)';
                        e.currentTarget.style.borderColor = '#10b981';
                    },
                    onMouseLeave: (e) => {
                        e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                    }
                }, [
                    React.createElement('i', { key: 'icon', className: 'fas fa-file-alt' }),
                    'TXT'
                ])
            ])
        ]),
        
        // Estatísticas rápidas
        React.createElement('div', {
            key: 'quick-stats',
            style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '15px',
                marginBottom: '25px'
            }
        }, [
            React.createElement('div', {
                key: 'stars',
                style: {
                    padding: '15px',
                    background: 'rgba(30, 41, 59, 0.8)',
                    borderRadius: '10px',
                    border: '1px solid #334155',
                    textAlign: 'center'
                }
            }, [
                React.createElement('div', {
                    key: 'icon',
                    style: { 
                        fontSize: '24px',
                        color: '#f59e0b',
                        marginBottom: '8px'
                    }
                }, '⭐'),
                React.createElement('div', {
                    key: 'value',
                    style: { 
                        color: '#f8fafc',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        marginBottom: '4px'
                    }
                }, repoInfo.stars.toLocaleString()),
                React.createElement('div', {
                    key: 'label',
                    style: { 
                        color: '#94a3b8',
                        fontSize: '12px'
                    }
                }, 'Stars')
            ]),
            
            React.createElement('div', {
                key: 'forks',
                style: {
                    padding: '15px',
                    background: 'rgba(30, 41, 59, 0.8)',
                    borderRadius: '10px',
                    border: '1px solid #334155',
                    textAlign: 'center'
                }
            }, [
                React.createElement('div', {
                    key: 'icon',
                    style: { 
                        fontSize: '24px',
                        color: '#10b981',
                        marginBottom: '8px'
                    }
                }, '🍴'),
                React.createElement('div', {
                    key: 'value',
                    style: { 
                        color: '#f8fafc',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        marginBottom: '4px'
                    }
                }, repoInfo.forks.toLocaleString()),
                React.createElement('div', {
                    key: 'label',
                    style: { 
                        color: '#94a3b8',
                        fontSize: '12px'
                    }
                }, 'Forks')
            ]),
            
            React.createElement('div', {
                key: 'files',
                style: {
                    padding: '15px',
                    background: 'rgba(30, 41, 59, 0.8)',
                    borderRadius: '10px',
                    border: '1px solid #334155',
                    textAlign: 'center'
                }
            }, [
                React.createElement('div', {
                    key: 'icon',
                    style: { 
                        fontSize: '24px',
                        color: '#3b82f6',
                        marginBottom: '8px'
                    }
                }, '📁'),
                React.createElement('div', {
                    key: 'value',
                    style: { 
                        color: '#f8fafc',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        marginBottom: '4px'
                    }
                }, files.length.toLocaleString()),
                React.createElement('div', {
                    key: 'label',
                    style: { 
                        color: '#94a3b8',
                        fontSize: '12px'
                    }
                }, 'Arquivos')
            ]),
            
            React.createElement('div', {
                key: 'language',
                style: {
                    padding: '15px',
                    background: 'rgba(30, 41, 59, 0.8)',
                    borderRadius: '10px',
                    border: '1px solid #334155',
                    textAlign: 'center'
                }
            }, [
                React.createElement('div', {
                    key: 'icon',
                    style: { 
                        fontSize: '24px',
                        color: '#8b5cf6',
                        marginBottom: '8px'
                    }
                }, '💻'),
                React.createElement('div', {
                    key: 'value',
                    style: { 
                        color: '#f8fafc',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        marginBottom: '4px'
                    }
                }, repoInfo.language || 'Várias'),
                React.createElement('div', {
                    key: 'label',
                    style: { 
                        color: '#94a3b8',
                        fontSize: '12px'
                    }
                }, 'Linguagem')
            ])
        ]),
        
        // Modos de visualização
        React.createElement('div', {
            key: 'view-tabs',
            style: {
                display: 'flex',
                gap: '8px',
                marginBottom: '25px',
                borderBottom: '1px solid #334155',
                paddingBottom: '15px'
            }
        }, [
            React.createElement('button', {
                key: 'tree-view',
                onClick: () => setViewMode('tree'),
                style: {
                    padding: '12px 24px',
                    background: viewMode === 'tree' ? '#3b82f6' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    color: viewMode === 'tree' ? 'white' : '#cbd5e1',
                    cursor: 'pointer',
                    fontWeight: viewMode === 'tree' ? '600' : '400',
                    transition: 'all 0.2s',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }
            }, [
                React.createElement('i', {
                    key: 'icon',
                    className: 'fas fa-tree'
                }),
                'Árvore'
            ]),
            
            React.createElement('button', {
                key: 'list-view',
                onClick: () => setViewMode('list'),
                style: {
                    padding: '12px 24px',
                    background: viewMode === 'list' ? '#3b82f6' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    color: viewMode === 'list' ? 'white' : '#cbd5e1',
                    cursor: 'pointer',
                    fontWeight: viewMode === 'list' ? '600' : '400',
                    transition: 'all 0.2s',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }
            }, [
                React.createElement('i', {
                    key: 'icon',
                    className: 'fas fa-list'
                }),
                'Lista'
            ]),
            
            React.createElement('button', {
                key: 'chart-view',
                onClick: () => setViewMode('chart'),
                style: {
                    padding: '12px 24px',
                    background: viewMode === 'chart' ? '#3b82f6' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    color: viewMode === 'chart' ? 'white' : '#cbd5e1',
                    cursor: 'pointer',
                    fontWeight: viewMode === 'chart' ? '600' : '400',
                    transition: 'all 0.2s',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }
            }, [
                React.createElement('i', {
                    key: 'icon',
                    className: 'fas fa-chart-pie'
                }),
                'Gráficos'
            ])
        ]),
        
        // Conteúdo baseado no modo
        viewMode === 'tree' 
            ? React.createElement('div', {
                key: 'tree-container',
                style: { minHeight: '500px' }
            }, [
                React.createElement(FileTree, {
                    key: 'file-tree',
                    files: files,
                    onFileClick: (file) => {
                        window.open(`${repoInfo.url}/blob/${repoInfo.default_branch}/${file.path}`, '_blank');
                    }
                })
            ])
            : viewMode === 'list'
            ? React.createElement('div', {
                key: 'list-container',
                style: { minHeight: '500px' }
            }, [
                React.createElement(FileList, {
                    key: 'file-list',
                    files: files,
                    onFileClick: (file) => {
                        window.open(`${repoInfo.url}/blob/${repoInfo.default_branch}/${file.path}`, '_blank');
                    }
                })
            ])
            : React.createElement('div', {
                key: 'chart-container',
                style: { minHeight: '500px' }
            }, [
                React.createElement('div', {
                    key: 'chart-wrapper',
                    style: { 
                        background: '#1e293b',
                        borderRadius: '12px',
                        padding: '25px',
                        border: '1px solid #334155',
                        height: '500px',
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }, [
                    React.createElement('div', {
                        key: 'chart-title',
                        style: {
                            marginBottom: '20px',
                            textAlign: 'center'
                        }
                    }, [
                        React.createElement('h4', {
                            key: 'title',
                            style: { 
                                color: '#f8fafc',
                                margin: '0 0 8px 0',
                                fontSize: '16px'
                            }
                        }, '📊 Distribuição de Tipos de Arquivo'),
                        React.createElement('p', {
                            key: 'subtitle',
                            style: { 
                                color: '#94a3b8',
                                margin: '0',
                                fontSize: '13px'
                            }
                        }, `Total de ${files.length} arquivos analisados`)
                    ]),
                    React.createElement('div', {
                        key: 'chart-inner',
                        style: { flex: 1 }
                    }, [
                        React.createElement('canvas', {
                            key: 'chart',
                            ref: chartRef
                        })
                    ])
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
            maxWidth: 'none',
            margin: '0 auto',
            marginTop: '80px',
            minHeight: 'calc(100vh - 160px)',
            width: '100%',
            overflowX: 'auto',
            fontFamily: "'Inter', sans-serif"
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
            // Cabeçalho do painel
            React.createElement('div', {
                key: 'panel-header',
                style: { marginBottom: '25px' }
            }, [
                React.createElement('div', {
                    key: 'logo',
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '15px'
                    }
                }, [
                    React.createElement('div', {
                        key: 'icon',
                        style: {
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px',
                            color: 'white'
                        }
                    }, '🗺️'),
                    React.createElement('div', {
                        key: 'title'
                    }, [
                        React.createElement('h2', {
                            key: 'name',
                            style: { 
                                color: '#f8fafc',
                                margin: '0',
                                fontSize: '20px',
                                fontWeight: '700'
                            }
                        }, 'CodeCartographer'),
                        React.createElement('p', {
                            key: 'version',
                            style: { 
                                fontSize: '12px', 
                                color: '#94a3b8', 
                                margin: '0'
                            }
                        }, 'v4.0 Professional')
                    ])
                ]),
                React.createElement('p', {
                    key: 'subtitle',
                    style: { 
                        fontSize: '14px', 
                        color: '#cbd5e1', 
                        margin: '0',
                        lineHeight: '1.5'
                    }
                }, 'Visualize e analise a estrutura de repositórios GitHub')
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
                }, [
                    React.createElement('i', {
                        key: 'icon',
                        className: 'fas fa-link',
                        style: { marginRight: '8px', color: '#3b82f6' }
                    }),
                    'URL do Repositório'
                ]),
                React.createElement('div', {
                    key: 'input-wrapper',
                    style: { position: 'relative' }
                }, [
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
                            padding: '12px 15px 12px 40px',
                            background: '#1e293b',
                            border: '1px solid #475569',
                            borderRadius: '8px',
                            color: '#f8fafc',
                            fontSize: '14px',
                            fontFamily: "'Inter', sans-serif",
                            transition: 'border 0.2s'
                        }
                    }),
                    React.createElement('i', {
                        key: 'input-icon',
                        className: 'fab fa-github',
                        style: {
                            position: 'absolute',
                            left: '15px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#94a3b8'
                        }
                    })
                ])
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
                        background: loading ? '#475569' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
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
                        gap: '10px',
                        boxShadow: loading ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.3)'
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
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
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
                    border: `1px solid ${error ? '#ef4444' : '#475569'}`,
                    transition: 'all 0.3s'
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
                    React.createElement('div', {
                        key: 'status-icon',
                        style: {
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: error ? '#ef4444' : loading ? '#f59e0b' : '#10b981',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            color: 'white'
                        }
                    }, loading ? '⌛' : error ? '❌' : '✅'),
                    React.createElement('div', {
                        key: 'status-text',
                        style: { flex: 1 }
                    }, [
                        React.createElement('strong', {
                            key: 'label',
                            style: { 
                                color: error ? '#fca5a5' : '#cbd5e1',
                                fontSize: '14px',
                                display: 'block',
                                marginBottom: '4px'
                            }
                        }, 'Status:'),
                        React.createElement('span', {
                            key: 'text',
                            style: { 
                                color: error ? '#fca5a5' : '#94a3b8',
                                fontSize: '13px',
                                display: 'block'
                            }
                        }, status)
                    ])
                ]),
                
                error && React.createElement('div', {
                    key: 'error-message',
                    style: { 
                        marginTop: '10px', 
                        padding: '10px',
                        background: 'rgba(239, 68, 68, 0.2)',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#fca5a5',
                        borderLeft: '3px solid #ef4444'
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
                        marginBottom: '15px',
                        cursor: 'pointer',
                        padding: '10px',
                        borderRadius: '8px',
                        background: 'rgba(30, 41, 59, 0.5)',
                        transition: 'background 0.2s'
                    },
                    onClick: () => setShowCachePanel(!showCachePanel),
                    onMouseEnter: (e) => e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)',
                    onMouseLeave: (e) => e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)'
                }, [
                    React.createElement('div', {
                        key: 'title',
                        style: { 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }
                    }, [
                        React.createElement('div', {
                            key: 'icon',
                            style: {
                                width: '32px',
                                height: '32px',
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '14px'
                            }
                        }, '💾'),
                        React.createElement('div', {
                            key: 'text'
                        }, [
                            React.createElement('div', {
                                key: 'label',
                                style: { 
                                    color: '#cbd5e1',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }
                            }, 'Cache Local'),
                            React.createElement('div', {
                                key: 'summary',
                                style: { 
                                    color: '#94a3b8',
                                    fontSize: '12px'
                                }
                            }, `${cacheStats.total} repositórios`)
                        ])
                    ]),
                    React.createElement('i', {
                        key: 'chevron',
                        className: showCachePanel ? 'fas fa-chevron-up' : 'fas fa-chevron-down',
                        style: { color: '#94a3b8' }
                    })
                ]),
                
                showCachePanel && React.createElement('div', {
                    key: 'cache-details',
                    style: {
                        background: 'rgba(15, 23, 42, 0.5)',
                        borderRadius: '8px',
                        padding: '15px',
                        border: '1px solid #475569',
                        animation: 'fadeIn 0.3s ease'
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
                            }, cacheStats.sizeMB ? `${cacheStats.sizeMB} MB` : '0 MB'),
                            React.createElement('div', {
                                key: 'label',
                                style: { 
                                    color: '#94a3b8',
                                    fontSize: '12px'
                                }
                            }, 'Armazenados')
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
                                marginBottom: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }
                        }, [
                            React.createElement('i', { key: 'icon', className: 'fas fa-history' }),
                            'Análises Recentes:'
                        ]),
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
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                },
                                onClick: () => {
                                    setUrl(`https://github.com/${repo.owner}/${repo.name}`);
                                    setTimeout(() => analyzeRepository(), 100);
                                },
                                onMouseEnter: (e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)',
                                onMouseLeave: (e) => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.5)'
                            }, [
                                React.createElement('span', {
                                    key: 'name',
                                    style: { 
                                        color: '#cbd5e1',
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontSize: '11px'
                                    }
                                }, `${repo.owner}/${repo.name}`),
                                React.createElement('div', {
                                    key: 'info',
                                    style: { 
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }
                                }, [
                                    React.createElement('span', {
                                        key: 'files',
                                        style: { 
                                            color: '#94a3b8', 
                                            fontSize: '11px',
                                            background: 'rgba(30, 41, 59, 0.8)',
                                            padding: '2px 6px',
                                            borderRadius: '4px'
                                        }
                                    }, `${repo.files} arquivos`),
                                    React.createElement('span', {
                                        key: 'date',
                                        style: { 
                                            color: '#64748b', 
                                            fontSize: '10px'
                                        }
                                    }, repo.timestamp)
                                ])
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
                React.createElement('div', {
                    key: 'header',
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '12px'
                    }
                }, [
                    React.createElement('div', {
                        key: 'icon',
                        style: {
                            width: '24px',
                            height: '24px',
                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '12px'
                        }
                    }, '🚀'),
                    React.createElement('span', {
                        key: 'label',
                        style: { 
                            color: '#cbd5e1', 
                            fontSize: '14px',
                            fontWeight: '500'
                        }
                    }, 'Experimente com:')
                ]),
                React.createElement('div', {
                    key: 'example-buttons',
                    style: { 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
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
                            padding: '10px 12px',
                            background: 'rgba(59, 130, 246, 0.1)',
                            color: '#3b82f6',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            transition: 'all 0.2s',
                            textAlign: 'left',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                        },
                        onMouseEnter: (e) => {
                            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                            e.currentTarget.style.borderColor = '#3b82f6';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.2)';
                        },
                        onMouseLeave: (e) => {
                            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }
                    }, [
                        React.createElement('span', {
                            key: 'name',
                            style: { 
                                fontWeight: '600',
                                fontSize: '13px'
                            }
                        }, example.name),
                        React.createElement('span', {
                            key: 'url',
                            style: { 
                                fontSize: '11px',
                                color: '#94a3b8',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }
                        }, example.url.replace('https://github.com/', ''))
                    ])
                ))
            ]),
            
            // Informações
            React.createElement('div', {
                key: 'info-section',
                style: {
                    marginTop: '25px',
                    padding: '15px',
                    background: 'rgba(59, 130, 246, 0.05)',
                    borderRadius: '10px',
                    border: '1px solid rgba(59, 130, 246, 0.1)'
                }
            }, [
                React.createElement('div', {
                    key: 'header',
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '10px'
                    }
                }, [
                    React.createElement('i', {
                        key: 'icon',
                        className: 'fas fa-info-circle',
                        style: { color: '#3b82f6', fontSize: '16px' }
                    }),
                    React.createElement('span', {
                        key: 'title',
                        style: { 
                            color: '#cbd5e1', 
                            fontSize: '14px',
                            fontWeight: '500'
                        }
                    }, 'Sobre esta ferramenta')
                ]),
                React.createElement('p', {
                    key: 'info-text',
                    style: { 
                        color: '#94a3b8', 
                        fontSize: '12px',
                        margin: '0',
                        lineHeight: '1.6'
                    }
                }, 'O CodeCartographer analisa a estrutura de repositórios GitHub, exibindo arquivos em formato de árvore, lista ou gráficos. Os dados são armazenados localmente no seu navegador para acesso rápido.')
            ])
        ]),
        
        // Área principal de conteúdo
        React.createElement('div', {
            key: 'main-content',
            className: 'main-content-area',
            style: {
                marginLeft: '420px',
                minHeight: 'calc(100vh - 160px)',
                overflowX: 'scroll',
                overflowY: 'hidden',
                paddingRight: '20px',
                width: 'fit-content',
                minWidth: 'calc(100vw - 440px)'
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
                        padding: '40px 20px',
                        minWidth: '800px'
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
                    }, '🗺️'),
                    React.createElement('h3', {
                        key: 'title',
                        style: { 
                            color: '#cbd5e1', 
                            marginBottom: '15px',
                            fontSize: '24px',
                            fontWeight: '600'
                        }
                    }, 'Bem-vindo ao CodeCartographer'),
                    React.createElement('p', {
                        key: 'subtitle',
                        style: { 
                            color: '#94a3b8', 
                            fontSize: '16px',
                            maxWidth: '600px',
                            marginBottom: '30px',
                            lineHeight: '1.6'
                        }
                    }, 'Cole uma URL do GitHub para visualizar a estrutura completa do repositório em formato de árvore, lista ou gráficos.'),
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
                                border: '1px solid #334155',
                                transition: 'transform 0.2s'
                            },
                            onMouseEnter: (e) => e.currentTarget.style.transform = 'translateY(-5px)',
                            onMouseLeave: (e) => e.currentTarget.style.transform = 'translateY(0)'
                        }, [
                            React.createElement('div', {
                                key: 'icon',
                                style: {
                                    fontSize: '24px',
                                    color: '#3b82f6',
                                    marginBottom: '15px'
                                }
                            }, '🌳'),
                            React.createElement('h4', {
                                key: 'title',
                                style: { 
                                    color: '#f8fafc',
                                    margin: '0 0 10px 0',
                                    fontSize: '16px'
                                }
                            }, 'Visualização em Árvore'),
                            React.createElement('p', {
                                key: 'desc',
                                style: { 
                                    color: '#94a3b8',
                                    fontSize: '14px',
                                    margin: '0'
                                }
                            }, 'Explore a estrutura hierárquica de pastas e arquivos')
                        ]),
                        React.createElement('div', {
                            key: 'feature-2',
                            style: {
                                padding: '20px',
                                background: 'rgba(30, 41, 59, 0.8)',
                                borderRadius: '10px',
                                border: '1px solid #334155',
                                transition: 'transform 0.2s'
                            },
                            onMouseEnter: (e) => e.currentTarget.style.transform = 'translateY(-5px)',
                            onMouseLeave: (e) => e.currentTarget.style.transform = 'translateY(0)'
                        }, [
                            React.createElement('div', {
                                key: 'icon',
                                style: {
                                    fontSize: '24px',
                                    color: '#10b981',
                                    marginBottom: '15px'
                                }
                            }, '📊'),
                            React.createElement('h4', {
                                key: 'title',
                                style: { 
                                    color: '#f8fafc',
                                    margin: '0 0 10px 0',
                                    fontSize: '16px'
                                }
                            }, 'Análise de Dados'),
                            React.createElement('p', {
                                key: 'desc',
                                style: { 
                                    color: '#94a3b8',
                                    fontSize: '14px',
                                    margin: '0'
                                }
                            }, 'Métricas detalhadas e gráficos de distribuição')
                        ]),
                        React.createElement('div', {
                            key: 'feature-3',
                            style: {
                                padding: '20px',
                                background: 'rgba(30, 41, 59, 0.8)',
                                borderRadius: '10px',
                                border: '1px solid #334155',
                                transition: 'transform 0.2s'
                            },
                            onMouseEnter: (e) => e.currentTarget.style.transform = 'translateY(-5px)',
                            onMouseLeave: (e) => e.currentTarget.style.transform = 'translateY(0)'
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
                                    margin: '0 0 10px 0',
                                    fontSize: '16px'
                                }
                            }, 'Cache Inteligente'),
                            React.createElement('p', {
                                key: 'desc',
                                style: { 
                                    color: '#94a3b8',
                                    fontSize: '14px',
                                    margin: '0'
                                }
                            }, 'Análises salvas localmente para acesso rápido')
                        ]),
                        React.createElement('div', {
                            key: 'feature-4',
                            style: {
                                padding: '20px',
                                background: 'rgba(30, 41, 59, 0.8)',
                                borderRadius: '10px',
                                border: '1px solid #334155',
                                transition: 'transform 0.2s'
                            },
                            onMouseEnter: (e) => e.currentTarget.style.transform = 'translateY(-5px)',
                            onMouseLeave: (e) => e.currentTarget.style.transform = 'translateY(0)'
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
                                    margin: '0 0 10px 0',
                                    fontSize: '16px'
                                }
                            }, 'Exportação'),
                            React.createElement('p', {
                                key: 'desc',
                                style: { 
                                    color: '#94a3b8',
                                    fontSize: '14px',
                                    margin: '0'
                                }
                            }, 'Exporte análises em JSON ou TXT para uso externo')
                        ])
                    ])
                ])
        )
    ]);
};

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

// ==================== ESTILOS GLOBAIS ====================
const globalStyles = `
    .react-root { 
        min-height: 100vh;
        overflow-x: auto;
        font-family: 'Inter', sans-serif;
    }
    
    /* Scrollbar customizada */
    ::-webkit-scrollbar { width: 12px; height: 12px; }
    ::-webkit-scrollbar-track { background: #1e293b; border-radius: 6px; }
    ::-webkit-scrollbar-thumb { 
        background: #475569; 
        border-radius: 6px;
        border: 3px solid #1e293b;
    }
    ::-webkit-scrollbar-thumb:hover { background: #64748b; }
    
    /* Container principal com scroll horizontal */
    .horizontal-scroll-container {
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        padding: 15px 0;
        scrollbar-width: thin;
        scrollbar-color: #475569 #1e293b;
    }
    
    .horizontal-scroll-container::-webkit-scrollbar {
        height: 10px;
    }
    
    .horizontal-scroll-container::-webkit-scrollbar-track {
        background: #1e293b;
        border-radius: 5px;
    }
    
    .horizontal-scroll-container::-webkit-scrollbar-thumb {
        background: #475569;
        border-radius: 5px;
    }
    
    .horizontal-scroll-container::-webkit-scrollbar-thumb:hover {
        background: #64748b;
    }
    
    /* Itens dentro do container horizontal */
    .horizontal-item {
        display: inline-block;
        vertical-align: top;
        margin-right: 20px;
        white-space: normal;
    }
    
    /* Para a lista de arquivos com nomes longos */
    .file-name-horizontal {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 300px;
    }
    
    /* Animações */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(-20px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
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
    
    /* LAYOUT RESPONSIVO */
    @media (max-width: 1400px) {
        .visualization-container {
            min-width: 1100px;
        }
    }
    
    @media (max-width: 1200px) {
        .visualization-container {
            min-width: 1000px;
        }
    }
    
    @media (max-width: 992px) {
        .control-panel {
            position: relative !important;
            width: 100% !important;
            margin-bottom: 20px;
        }
        
        .main-content-area {
            margin-left: 0 !important;
            width: 100% !important;
        }
    }
    
    /* Estilo para o container de visualização */
    .visualization-container {
        min-width: 1200px;
        width: fit-content;
    }
    
    /* Forçar scroll horizontal na área principal */
    .main-content-area {
        overflow-x: scroll !important;
        overflow-y: hidden !important;
    }
    
    body {
        overflow-x: auto;
        margin: 0;
        padding: 0;
        background: #0f172a;
        color: #f8fafc;
    }
    
    /* Estilos para inputs e botões */
    input, button, select {
        font-family: 'Inter', sans-serif;
    }
    
    input:focus, button:focus, select:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }
    
    /* Tooltips */
    [title] {
        position: relative;
    }
    
    [title]:hover::after {
        content: attr(title);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(15, 23, 42, 0.95);
        color: #f8fafc;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
        border: 1px solid #334155;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    
    /* Transições suaves */
    * {
        transition: background-color 0.2s, border-color 0.2s, transform 0.2s, opacity 0.2s;
    }
`;

// Injetar estilos globais
const styleElement = document.createElement('style');
styleElement.textContent = globalStyles;
document.head.appendChild(styleElement);

console.log('CodeCartographer v4.0 Professional inicializado com sucesso!');
