const { useState, useEffect } = React;
const { createRoot } = ReactDOM;

// Componente TreeNode - Renderiza um nó da árvore (pasta ou arquivo)
const TreeNode = ({ node, repoBase, level = 0, searchTerm = '', onNodeClick }) => {
    const [isOpen, setIsOpen] = useState(level < 2); // Pastas iniciais abertas até nível 2
    const hasChildren = node.children && node.children.length > 0;
    const isFolder = node.type === 'folder';
    
    // Verificar se o nó ou seus filhos correspondem à busca
    const isVisible = !searchTerm || 
        node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (node.children && node.children.some(child => 
            child.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    
    if (!isVisible && searchTerm) return null;
    
    // Contar quantos filhos são visíveis (para badge)
    const visibleChildren = searchTerm && node.children ? 
        node.children.filter(child => 
            child.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).length : 
        (node.children ? node.children.length : 0);
    
    return React.createElement('div', {
        className: 'tree-node',
        style: { 
            marginLeft: `${level * 20}px`,
            display: searchTerm && !isVisible ? 'none' : 'block'
        }
    }, [
        React.createElement('div', {
            key: 'header',
            className: `tree-node-header ${isFolder ? 'folder' : 'file'}`,
            onClick: () => {
                if (isFolder) {
                    setIsOpen(!isOpen);
                } else if (onNodeClick) {
                    onNodeClick(node);
                }
            },
            style: { 
                cursor: isFolder ? 'pointer' : 'default'
            }
        }, [
            isFolder ? React.createElement('span', {
                key: 'folder-icon',
                className: 'tree-icon'
            }, isOpen ? '📂' : '📁') : React.createElement('span', {
                key: 'file-icon',
                className: 'tree-icon'
            }, '📄'),
            
            React.createElement('span', {
                key: 'name',
                className: 'tree-name',
                title: node.fullPath || node.name
            }, node.name),
            
            isFolder && visibleChildren > 0 && React.createElement('span', {
                key: 'badge',
                className: 'tree-badge'
            }, visibleChildren),
            
            !isFolder && repoBase && React.createElement('span', {
                key: 'link',
                className: 'tree-link',
                onClick: (e) => {
                    e.stopPropagation();
                    window.open(`${repoBase}/blob/main/${node.fullPath}`, '_blank');
                },
                title: 'Abrir no GitHub'
            }, '🔗'),
            
            node.size && React.createElement('span', {
                key: 'size',
                style: { 
                    marginLeft: '8px', 
                    fontSize: '11px', 
                    color: '#94a3b8',
                    flexShrink: 0
                }
            }, `${node.size} KB`)
        ]),
        
        isOpen && hasChildren && React.createElement('div', {
            key: 'children',
            className: 'tree-node-children'
        }, node.children.map(childNode => 
            React.createElement(TreeNode, {
                key: childNode.id,
                node: childNode,
                repoBase: repoBase,
                level: level + 1,
                searchTerm: searchTerm,
                onNodeClick: onNodeClick
            })
        ))
    ]);
};

// Função para construir a árvore de arquivos a partir da lista plana
const buildFileTree = (files) => {
    const root = { 
        id: 'root', 
        name: 'Repositório', 
        type: 'folder', 
        children: [],
        fullPath: ''
    };
    const pathMap = { '': root };
    
    // Ordenar arquivos por caminho para processamento consistente
    const sortedFiles = [...files].sort((a, b) => a.path.localeCompare(b.path));
    
    sortedFiles.forEach(file => {
        const parts = file.path.split('/');
        let currentPath = '';
        
        // Criar pastas intermediárias
        for (let i = 0; i < parts.length - 1; i++) {
            const folderPath = parts.slice(0, i + 1).join('/');
            if (!pathMap[folderPath]) {
                pathMap[folderPath] = {
                    id: folderPath,
                    name: parts[i],
                    type: 'folder',
                    children: [],
                    fullPath: folderPath
                };
                const parentPath = parts.slice(0, i).join('/') || '';
                pathMap[parentPath].children.push(pathMap[folderPath]);
            }
            currentPath = folderPath;
        }
        
        // Adicionar arquivo
        const parentPath = parts.slice(0, -1).join('/') || '';
        const fileNode = {
            id: file.path,
            name: parts[parts.length - 1],
            type: 'file',
            fullPath: file.path,
            size: file.sizeKB || Math.round((file.size || 1024) / 1024)
        };
        pathMap[parentPath].children.push(fileNode);
    });
    
    // Ordenar: pastas primeiro, depois arquivos, ambos em ordem alfabética
    const sortTree = (node) => {
        if (node.children) {
            node.children.sort((a, b) => {
                if (a.type === b.type) return a.name.localeCompare(b.name);
                return a.type === 'folder' ? -1 : 1;
            });
            node.children.forEach(sortTree);
        }
        return node;
    };
    
    return sortTree(root);
};

// Componente principal App
function App() {
    const [url, setUrl] = useState('');
    const [files, setFiles] = useState([]);
    const [fileTree, setFileTree] = useState(null);
    const [status, setStatus] = useState('Pronto para analisar');
    const [repoBase, setRepoBase] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [repoInfo, setRepoInfo] = useState(null);
    const [lastUrl, setLastUrl] = useState('');
    const [expandedAll, setExpandedAll] = useState(true);
    
    // Cores para diferentes tipos de arquivos
    const getFileColor = (path) => {
        const colorMap = {
            '.ts': '#1e40af',
            '.tsx': '#1d4ed8',
            '.jsx': '#06b6d4',
            '.js': '#3b82f6',
            '.css': '#8b5cf6',
            '.scss': '#7c3aed',
            '.json': '#f59e0b',
            '.md': '#10b981',
            '.html': '#ef4444',
            '.py': '#3b82f6',
            '.java': '#dc2626',
            '.cpp': '#059669',
            '.cs': '#4f46e5'
        };
        
        for (const [ext, color] of Object.entries(colorMap)) {
            if (path.endsWith(ext)) return color;
        }
        return '#6b7280';
    };
    
    // Função principal para analisar o repositório
    const analyzeGithub = async (githubUrl = null) => {
        const urlToAnalyze = githubUrl || url;
        if (!urlToAnalyze) {
            setError('Por favor, insira uma URL do GitHub');
            return;
        }
        
        const match = urlToAnalyze.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) {
            setError('URL do GitHub inválida. Formato: https://github.com/usuario/repositorio');
            return;
        }
        
        const [_, owner, repo] = match;
        const currentRepo = `${owner}/${repo}`;
        
        // Evitar requisições duplicadas
        if (lastUrl === currentRepo && files.length > 0) {
            setStatus('Repositório já carregado');
            return;
        }
        
        setLoading(true);
        setStatus('🔍 Conectando ao GitHub...');
        setError(null);
        setLastUrl(currentRepo);
        setSearchTerm('');
        
        try {
            // Primeiro, obter informações do repositório
            const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
                headers: { 'Accept': 'application/vnd.github.v3+json' }
            });
            
            if (!repoRes.ok) {
                if (repoRes.status === 404) {
                    throw new Error('Repositório não encontrado');
                }
                throw new Error(`Erro ${repoRes.status}: ${repoRes.statusText}`);
            }
            
            const repoData = await repoRes.json();
            setRepoInfo({
                name: repoData.name,
                description: repoData.description,
                stars: repoData.stargazers_count,
                forks: repoData.forks_count,
                language: repoData.language,
                owner: repoData.owner.login,
                default_branch: repoData.default_branch
            });
            
            // Obter estrutura do repositório
            const branch = repoData.default_branch || 'main';
            const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
            
            console.log('Buscando dados da API:', apiUrl);
            
            const res = await fetch(apiUrl, {
                headers: { 'Accept': 'application/vnd.github.v3+json' }
            });
            
            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error('Branch principal não encontrada');
                } else if (res.status === 403) {
                    throw new Error('Limite de requisições excedido. Aguarde alguns minutos.');
                }
                throw new Error(`Erro ${res.status}: ${res.statusText}`);
            }
            
            const data = await res.json();
            
            if (!data.tree) {
                throw new Error('Estrutura do repositório não encontrada');
            }
            
            // Processar arquivos
            const fileList = data.tree
                .filter(f => f.type === 'blob')
                .map(f => ({
                    ...f,
                    path: f.path,
                    extension: f.path.split('.').pop().toLowerCase(),
                    sizeKB: Math.round((f.size || 1024) / 1024 * 10) / 10
                }))
                .filter(f => {
                    const path = f.path.toLowerCase();
                    return !path.includes('node_modules') && 
                           !path.includes('dist') && 
                           !path.includes('build') &&
                           !path.includes('.git') &&
                           !path.startsWith('.');
                });
            
            if (fileList.length === 0) {
                setError('Nenhum arquivo encontrado no repositório');
                setFiles([]);
                setFileTree(null);
                setStatus('⚠️ Repositório vazio ou sem arquivos visíveis');
                setLoading(false);
                return;
            }
            
            setRepoBase(`https://github.com/${owner}/${repo}`);
            setFiles(fileList);
            
            // Construir árvore de arquivos
            const tree = buildFileTree(fileList);
            setFileTree(tree);
            
            setStatus(`✅ ${fileList.length} arquivos organizados em árvore!`);
            setLoading(false);
            
        } catch (err) {
            console.error('Erro:', err);
            setError(err.message);
            setStatus('❌ Erro na conexão');
            setFiles([]);
            setFileTree(null);
            setLoading(false);
        }
    };
    
    // Handler para tecla Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            analyzeGithub();
        }
    };
    
    // Handler para clique em arquivo
    const handleFileClick = (node) => {
        if (repoBase && node.type === 'file') {
            window.open(`${repoBase}/blob/main/${node.fullPath}`, '_blank');
        }
    };
    
    // Expandir/colapsar todos os nós
    const toggleExpandAll = () => {
        setExpandedAll(!expandedAll);
        // Nota: Em uma implementação mais complexa, você controlaria o estado de cada nó
    };
    
    // Calcular estatísticas
    const calculateStats = () => {
        if (!files.length) return null;
        
        const stats = {
            totalFiles: files.length,
            totalSizeKB: files.reduce((sum, f) => sum + (f.sizeKB || 0), 0),
            byExtension: {}
        };
        
        files.forEach(f => {
            const ext = f.extension;
            stats.byExtension[ext] = (stats.byExtension[ext] || 0) + 1;
        });
        
        return stats;
    };
    
    const stats = calculateStats();
    
    // Exemplos de repositórios
    const examples = [
        { name: 'React', url: 'https://github.com/facebook/react' },
        { name: 'Vue.js', url: 'https://github.com/vuejs/vue' },
        { name: 'VS Code', url: 'https://github.com/microsoft/vscode' },
        { name: 'Next.js', url: 'https://github.com/vercel/next.js' }
    ];
    
    // Renderizar interface
    return React.createElement('div', { 
        style: { width: '100%', height: '100%', position: 'relative' } 
    }, [
        // UI Layer (controles)
        React.createElement('div', { 
            key: 'ui-layer',
            className: 'ui-layer'
        }, [
            React.createElement('div', { 
                key: 'header',
                style: { marginBottom: '15px' }
            }, [
                React.createElement('h3', { 
                    key: 'title',
                    style: { margin: '0 0 10px 0', color: '#f8fafc' }
                }, 'GitHub Repository Tree'),
                React.createElement('p', { 
                    key: 'subtitle',
                    style: { fontSize: '12px', color: '#94a3b8', margin: '0' }
                }, 'Visualize a estrutura de pastas de qualquer repositório GitHub')
            ]),
            
            React.createElement('div', { 
                key: 'input-group',
                className: 'input-group'
            }, [
                React.createElement('input', { 
                    key: 'input',
                    placeholder: 'https://github.com/usuario/projeto',
                    value: url,
                    onChange: e => setUrl(e.target.value),
                    onKeyPress: handleKeyPress,
                    disabled: loading
                }),
                React.createElement('button', { 
                    key: 'button',
                    onClick: () => analyzeGithub(),
                    disabled: loading
                }, loading ? [
                    React.createElement('span', {
                        key: 'spinner',
                        className: 'loading-spinner'
                    }),
                    'ANALISANDO...'
                ] : '🌳 GERAR ÁRVORE')
            ]),
            
            React.createElement('div', { 
                key: 'status-box',
                className: `status-box ${error ? 'error' : ''}`
            }, [
                React.createElement('strong', { key: 'label' }, 'Status: '),
                status,
                error && React.createElement('div', { 
                    key: 'error',
                    style: { marginTop: '8px', fontSize: '13px' }
                }, error)
            ]),
            
            repoInfo && React.createElement('div', {
                key: 'repo-info',
                className: 'file-stats'
            }, [
                React.createElement('div', {
                    key: 'name',
                    style: { fontWeight: 'bold', marginBottom: '5px' }
                }, `${repoInfo.owner}/${repoInfo.name}`),
                repoInfo.description && React.createElement('div', {
                    key: 'desc',
                    style: { fontSize: '11px', marginBottom: '5px', color: '#cbd5e1' }
                }, repoInfo.description),
                React.createElement('div', {
                    key: 'stats',
                    className: 'stats-grid'
                }, [
                    React.createElement('div', { key: 'lang', className: 'stat-item' }, [
                        React.createElement('span', { key: 'label' }, 'Linguagem:'),
                        React.createElement('span', { key: 'value', className: 'stat-value' }, repoInfo.language || 'Várias')
                    ]),
                    React.createElement('div', { key: 'stars', className: 'stat-item' }, [
                        React.createElement('span', { key: 'label' }, '⭐ Stars:'),
                        React.createElement('span', { key: 'value', className: 'stat-value' }, repoInfo.stars)
                    ]),
                    React.createElement('div', { key: 'forks', className: 'stat-item' }, [
                        React.createElement('span', { key: 'label' }, '🍴 Forks:'),
                        React.createElement('span', { key: 'value', className: 'stat-value' }, repoInfo.forks)
                    ]),
                    React.createElement('div', { key: 'files', className: 'stat-item' }, [
                        React.createElement('span', { key: 'label' }, '📁 Arquivos:'),
                        React.createElement('span', { key: 'value', className: 'stat-value' }, files.length)
                    ])
                ])
            ]),
            
            files.length === 0 && React.createElement('div', {
                key: 'examples',
                style: { marginTop: '15px' }
            }, [
                React.createElement('p', {
                    key: 'label',
                    style: { fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }
                }, 'Experimente com:'),
                React.createElement('div', {
                    key: 'buttons',
                    style: { display: 'flex', flexWrap: 'wrap', gap: '6px' }
                }, examples.map((example, i) =>
                    React.createElement('button', {
                        key: `example-${i}`,
                        style: {
                            padding: '6px 10px',
                            background: 'rgba(30, 41, 59, 0.8)',
                            color: '#cbd5e1',
                            border: '1px solid #475569',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '11px',
                            transition: 'all 0.2s'
                        },
                        onMouseEnter: (e) => {
                            e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                            e.currentTarget.style.borderColor = '#3b82f6';
                        },
                        onMouseLeave: (e) => {
                            e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)';
                            e.currentTarget.style.borderColor = '#475569';
                        },
                        onClick: () => {
                            setUrl(example.url);
                            setTimeout(() => analyzeGithub(example.url), 100);
                        }
                    }, example.name)
                ))
            ])
        ]),
        
        // Árvore de arquivos (se houver dados)
        fileTree && React.createElement('div', {
            key: 'tree-container',
            className: 'tree-container'
        }, [
            React.createElement('div', {
                key: 'tree-view',
                className: 'tree-view'
            }, [
                React.createElement('div', {
                    key: 'controls',
                    className: 'tree-controls'
                }, [
                    React.createElement('input', {
                        key: 'search',
                        type: 'text',
                        className: 'tree-search',
                        placeholder: '🔍 Buscar arquivos ou pastas...',
                        value: searchTerm,
                        onChange: e => setSearchTerm(e.target.value)
                    }),
                    React.createElement('button', {
                        key: 'expand',
                        onClick: toggleExpandAll
                    }, expandedAll ? 'Recolher Tudo' : 'Expandir Tudo'),
                    React.createElement('button', {
                        key: 'refresh',
                        onClick: () => analyzeGithub()
                    }, '🔄 Atualizar')
                ]),
                
                React.createElement('div', {
                    key: 'tree-content',
                    style: { maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }
                }, [
                    React.createElement(TreeNode, {
                        key: 'tree-root',
                        node: fileTree,
                        repoBase: repoBase,
                        searchTerm: searchTerm,
                        onNodeClick: handleFileClick
                    })
                ])
            ])
        ])
    ]);
}

// Inicializar a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('app');
    if (container && React && ReactDOM) {
        try {
            const root = createRoot(container);
            root.render(React.createElement(App));
        } catch (error) {
            console.error('Erro ao renderizar aplicação:', error);
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #dc2626;">
                    <h3>Erro ao carregar a aplicação</h3>
                    <p>${error.message}</p>
                    <button onclick="window.location.reload()" style="padding: 10px 20px; margin-top: 20px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
                        Recarregar Página
                    </button>
                </div>
            `;
        }
    } else {
        console.error('React ou container não encontrados');
    }
});