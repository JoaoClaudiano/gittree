const { useState, useEffect, useRef } = React;
const { createRoot } = ReactDOM;

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
                return null;
            }
            
            return item.data;
        } catch (err) {
            console.error('Erro ao ler cache:', err);
            return null;
        }
    },
    
    remove: (key) => {
        localStorage.removeItem(CACHE_PREFIX + key);
    },
    
    clear: () => {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(CACHE_PREFIX)) {
                localStorage.removeItem(key);
            }
        });
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
                        timestamp: item.timestamp
                    });
                }
            } catch (e) {}
        });
        
        stats.sizeKB = Math.round(stats.size / 1024 * 100) / 100;
        return stats;
    }
};

// ==================== FUNÇÕES DE EXPORTAÇÃO ====================
const exportUtils = {
    exportAsImage: async (elementId, filename) => {
        try {
            const element = document.getElementById(elementId);
            if (!element || !window.html2canvas) {
                throw new Error('Elemento ou biblioteca não disponível');
            }
            
            const canvas = await html2canvas(element, {
                backgroundColor: getComputedStyle(document.body).backgroundColor,
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: true
            });
            
            const link = document.createElement('a');
            link.download = filename || 'codecartographer-export.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            return true;
        } catch (err) {
            console.error('Erro ao exportar imagem:', err);
            throw err;
        }
    },
    
    exportAsJSON: (data, filename) => {
        try {
            const jsonStr = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = filename || 'codecartographer-data.json';
            link.click();
            
            setTimeout(() => URL.revokeObjectURL(url), 100);
            return true;
        } catch (err) {
            console.error('Erro ao exportar JSON:', err);
            throw err;
        }
    },
    
    exportMetricsAsCSV: (metrics) => {
        try {
            const headers = ['Métrica', 'Valor', 'Unidade'];
            const rows = [
                ['Total de Arquivos', metrics.totalFiles, 'arquivos'],
                ['Tamanho Total', metrics.totalSizeKB, 'KB'],
                ['Arquivos JavaScript', metrics.byExtension.js || 0, 'arquivos'],
                ['Arquivos TypeScript', metrics.byExtension.ts || 0, 'arquivos'],
                ['Arquivos CSS', metrics.byExtension.css || 0, 'arquivos'],
                ['Arquivos JSON', metrics.byExtension.json || 0, 'arquivos'],
                ['Arquivos Markdown', metrics.byExtension.md || 0, 'arquivos'],
                ['Arquivos HTML', metrics.byExtension.html || 0, 'arquivos'],
                ['Linguagem Principal', metrics.mainLanguage, ''],
                ['Data da Análise', new Date().toISOString(), '']
            ];
            
            const csvContent = [
                headers.join(','),
                ...rows.map(row => row.join(','))
            ].join('\n');
            
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = 'metrics-export.csv';
            link.click();
            
            setTimeout(() => URL.revokeObjectURL(url), 100);
            return true;
        } catch (err) {
            console.error('Erro ao exportar CSV:', err);
            throw err;
        }
    }
};

// ==================== CÁLCULO DE MÉTRICAS ====================
const metricsCalculator = {
    calculateBasicMetrics: (files) => {
        if (!files || files.length === 0) return null;
        
        const metrics = {
            totalFiles: files.length,
            totalSizeKB: files.reduce((sum, f) => sum + (f.sizeKB || 0), 0),
            byExtension: {},
            mainLanguage: 'N/A'
        };
        
        // Contar por extensão
        files.forEach(f => {
            const ext = f.extension;
            metrics.byExtension[ext] = (metrics.byExtension[ext] || 0) + 1;
        });
        
        // Determinar linguagem principal
        const extensionPriority = {
            'js': 10, 'jsx': 10, 'ts': 9, 'tsx': 9,
            'py': 8, 'java': 7, 'cpp': 6, 'c': 6,
            'cs': 5, 'php': 4, 'rb': 3, 'go': 2,
            'rs': 1
        };
        
        let mainExt = '';
        let maxCount = 0;
        
        Object.entries(metrics.byExtension).forEach(([ext, count]) => {
            if (count > maxCount || (count === maxCount && (extensionPriority[ext] || 0) > (extensionPriority[mainExt] || 0))) {
                maxCount = count;
                mainExt = ext;
            }
        });
        
        const languageMap = {
            'js': 'JavaScript', 'jsx': 'JavaScript (React)',
            'ts': 'TypeScript', 'tsx': 'TypeScript (React)',
            'py': 'Python', 'java': 'Java',
            'cpp': 'C++', 'c': 'C', 'cs': 'C#',
            'php': 'PHP', 'rb': 'Ruby',
            'go': 'Go', 'rs': 'Rust',
            'css': 'CSS', 'scss': 'SCSS',
            'html': 'HTML', 'json': 'JSON',
            'md': 'Markdown'
        };
        
        metrics.mainLanguage = languageMap[mainExt] || mainExt.toUpperCase() || 'Várias';
        
        return metrics;
    },
    
    calculateDependencyMetrics: (dependencies) => {
        if (!dependencies) return null;
        
        const { nodes, edges, stats } = dependencies;
        
        return {
            totalNodes: nodes.length,
            totalEdges: edges.length,
            analyzedFiles: stats.analyzedFiles,
            totalDependencies: stats.totalDependencies,
            internalDeps: stats.internalDeps,
            externalDeps: stats.externalDeps,
            avgDepsPerFile: stats.totalDependencies / Math.max(stats.analyzedFiles, 1),
            mostConnectedNode: nodes.reduce((max, node) => 
                (node.importedBy?.length || 0) > (max.importedBy?.length || 0) ? node : max
            , nodes[0] || {})
        };
    },
    
    calculateComplexityMetrics: (files) => {
        // Métricas simplificadas de complexidade
        const metrics = {
            avgFileSizeKB: 0,
            largestFile: null,
            fileSizeDistribution: {
                small: 0,   // < 10KB
                medium: 0,  // 10-100KB
                large: 0,   // 100-500KB
                xlarge: 0   // > 500KB
            },
            extensionDiversity: 0
        };
        
        if (!files || files.length === 0) return metrics;
        
        // Tamanho médio
        metrics.avgFileSizeKB = files.reduce((sum, f) => sum + (f.sizeKB || 0), 0) / files.length;
        
        // Maior arquivo
        metrics.largestFile = files.reduce((max, f) => 
            (f.sizeKB || 0) > (max.sizeKB || 0) ? f : max
        , files[0]);
        
        // Distribuição de tamanhos
        files.forEach(f => {
            const size = f.sizeKB || 0;
            if (size < 10) metrics.fileSizeDistribution.small++;
            else if (size < 100) metrics.fileSizeDistribution.medium++;
            else if (size < 500) metrics.fileSizeDistribution.large++;
            else metrics.fileSizeDistribution.xlarge++;
        });
        
        // Diversidade de extensões (índice de Shannon)
        const total = files.length;
        const extensionCounts = {};
        files.forEach(f => {
            const ext = f.extension;
            extensionCounts[ext] = (extensionCounts[ext] || 0) + 1;
        });
        
        let diversity = 0;
        Object.values(extensionCounts).forEach(count => {
            const p = count / total;
            diversity -= p * Math.log(p);
        });
        
        metrics.extensionDiversity = isNaN(diversity) ? 0 : Math.round(diversity * 100) / 100;
        
        return metrics;
    }
};

// ==================== COMPONENTES DE CONTROLE ====================
const CacheControls = ({ onClearCache, onLoadFromCache, cacheStats, hasCache }) => {
    return React.createElement('div', { className: 'cache-controls' }, [
        React.createElement('button', {
            key: 'load-cache',
            onClick: onLoadFromCache,
            disabled: !hasCache,
            title: hasCache ? 'Carregar análise do cache' : 'Nenhum cache disponível'
        }, [
            React.createElement('i', { key: 'icon', className: 'fas fa-database' }),
            ' Carregar do Cache'
        ]),
        
        React.createElement('button', {
            key: 'clear-cache',
            onClick: onClearCache,
            disabled: !hasCache,
            title: 'Limpar todo o cache'
        }, [
            React.createElement('i', { key: 'icon', className: 'fas fa-trash-alt' }),
            ' Limpar Cache'
        ])
    ]);
};

const ExportControls = ({ onExportImage, onExportJSON, onExportCSV, hasData, repoInfo }) => {
    return React.createElement('div', { className: 'export-controls' }, [
        React.createElement('button', {
            key: 'export-image',
            onClick: onExportImage,
            disabled: !hasData,
            title: 'Exportar visualização como imagem PNG'
        }, [
            React.createElement('i', { key: 'icon', className: 'fas fa-camera' }),
            ' Exportar Imagem'
        ]),
        
        React.createElement('button', {
            key: 'export-json',
            onClick: onExportJSON,
            disabled: !hasData,
            title: 'Exportar dados completos como JSON'
        }, [
            React.createElement('i', { key: 'icon', className: 'fas fa-file-code' }),
            ' Exportar JSON'
        ]),
        
        React.createElement('button', {
            key: 'export-csv',
            onClick: onExportCSV,
            disabled: !hasData,
            title: 'Exportar métricas como CSV'
        }, [
            React.createElement('i', { key: 'icon', className: 'fas fa-file-csv' }),
            ' Exportar CSV'
        ])
    ]);
};

const MetricsDashboard = ({ basicMetrics, dependencyMetrics, complexityMetrics }) => {
    const [activeTab, setActiveTab] = useState('basic');
    
    const renderBasicMetrics = () => {
        if (!basicMetrics) return null;
        
        return React.createElement('div', { className: 'metrics-grid' }, [
            React.createElement('div', { 
                key: 'total-files',
                className: 'metric-card'
            }, [
                React.createElement('div', { key: 'value', className: 'metric-value' }, basicMetrics.totalFiles),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Arquivos Totais')
            ]),
            
            React.createElement('div', { 
                key: 'total-size',
                className: 'metric-card secondary'
            }, [
                React.createElement('div', { key: 'value', className: 'metric-value' }, 
                    Math.round(basicMetrics.totalSizeKB) + ' KB'),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Tamanho Total')
            ]),
            
            React.createElement('div', { 
                key: 'main-lang',
                className: 'metric-card warning'
            }, [
                React.createElement('div', { key: 'value', className: 'metric-value' }, basicMetrics.mainLanguage),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Linguagem Principal')
            ]),
            
            React.createElement('div', { 
                key: 'js-files',
                className: 'metric-card'
            }, [
                React.createElement('div', { key: 'value', className: 'metric-value' }, basicMetrics.byExtension.js || 0),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Arquivos JS')
            ]),
            
            React.createElement('div', { 
                key: 'ts-files',
                className: 'metric-card secondary'
            }, [
                React.createElement('div', { key: 'value', className: 'metric-value' }, basicMetrics.byExtension.ts || 0),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Arquivos TS')
            ]),
            
            React.createElement('div', { 
                key: 'css-files',
                className: 'metric-card warning'
            }, [
                React.createElement('div', { key: 'value', className: 'metric-value' }, 
                    (basicMetrics.byExtension.css || 0) + (basicMetrics.byExtension.scss || 0)),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Arquivos CSS')
            ])
        ]);
    };
    
    const renderDependencyMetrics = () => {
        if (!dependencyMetrics) return null;
        
        return React.createElement('div', { className: 'metrics-grid' }, [
            React.createElement('div', { 
                key: 'analyzed-files',
                className: 'metric-card'
            }, [
                React.createElement('div', { key: 'value', className: 'metric-value' }, dependencyMetrics.analyzedFiles),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Arquivos Analisados')
            ]),
            
            React.createElement('div', { 
                key: 'total-deps',
                className: 'metric-card secondary'
            }, [
                React.createElement('div', { key: 'value', className: 'metric-value' }, dependencyMetrics.totalDependencies),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Dependências Totais')
            ]),
            
            React.createElement('div', { 
                key: 'avg-deps',
                className: 'metric-card warning'
            }, [
                React.createElement('div', { key: 'value', className: 'metric-value' }, 
                    Math.round(dependencyMetrics.avgDepsPerFile * 10) / 10),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Deps por Arquivo')
            ]),
            
            React.createElement('div', { 
                key: 'internal-deps',
                className: 'metric-card success'
            }, [
                React.createElement('div', { key: 'value', className: 'metric-value' }, dependencyMetrics.internalDeps),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Deps Internas')
            ]),
            
            React.createElement('div', { 
                key: 'external-deps',
                className: 'metric-card danger'
            }, [
                React.createElement('div', { key: 'value', className: 'metric-value' }, dependencyMetrics.externalDeps),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Deps Externas')
            ]),
            
            React.createElement('div', { 
                key: 'most-connected',
                className: 'metric-card'
            }, [
                React.createElement('div', { 
                    key: 'value', 
                    className: 'metric-value',
                    title: dependencyMetrics.mostConnectedNode.path
                }, dependencyMetrics.mostConnectedNode.label?.substring(0, 12) + '...'),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Arquivo Mais Conectado')
            ])
        ]);
    };
    
    const renderComplexityMetrics = () => {
        if (!complexityMetrics) return null;
        
        return React.createElement('div', { className: 'metrics-grid' }, [
            React.createElement('div', { 
                key: 'avg-size',
                className: 'metric-card'
            }, [
                React.createElement('div', { key: 'value', className: 'metric-value' }, 
                    Math.round(complexityMetrics.avgFileSizeKB) + ' KB'),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Tamanho Médio')
            ]),
            
            React.createElement('div', { 
                key: 'largest-file',
                className: 'metric-card secondary'
            }, [
                React.createElement('div', { 
                    key: 'value', 
                    className: 'metric-value',
                    title: complexityMetrics.largestFile?.path
                }, complexityMetrics.largestFile ? 
                    Math.round(complexityMetrics.largestFile.sizeKB) + ' KB' : 'N/A'),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Maior Arquivo')
            ]),
            
            React.createElement('div', { 
                key: 'diversity',
                className: 'metric-card warning'
            }, [
                React.createElement('div', { key: 'value', className: 'metric-value' }, 
                    complexityMetrics.extensionDiversity),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Diversidade de Tipos')
            ]),
            
            React.createElement('div', { 
                key: 'small-files',
                className: 'metric-card success'
            }, [
                React.createElement('div', { key: 'value', className: 'metric-value' }, 
                    complexityMetrics.fileSizeDistribution.small),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Arquivos < 10KB')
            ]),
            
            React.createElement('div', { 
                key: 'medium-files',
                className: 'metric-card'
            }, [
                React.createElement('div', { key: 'value', className: 'metric-value' }, 
                    complexityMetrics.fileSizeDistribution.medium),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Arquivos 10-100KB')
            ]),
            
            React.createElement('div', { 
                key: 'large-files',
                className: 'metric-card danger'
            }, [
                React.createElement('div', { key: 'value', className: 'metric-value' }, 
                    complexityMetrics.fileSizeDistribution.large + complexityMetrics.fileSizeDistribution.xlarge),
                React.createElement('div', { key: 'label', className: 'metric-label' }, 'Arquivos > 100KB')
            ])
        ]);
    };
    
    return React.createElement('div', { className: 'metrics-dashboard' }, [
        React.createElement('div', { key: 'header', className: 'metrics-header' }, [
            React.createElement('h4', { key: 'title' }, [
                React.createElement('i', { key: 'icon', className: 'fas fa-chart-bar' }),
                ' Dashboard de Métricas'
            ]),
            
            React.createElement('div', { key: 'tabs', className: 'view-toggle', style: { margin: 0 } }, [
                React.createElement('button', {
                    key: 'basic-tab',
                    className: activeTab === 'basic' ? 'active' : '',
                    onClick: () => setActiveTab('basic')
                }, 'Básicas'),
                React.createElement('button', {
                    key: 'deps-tab',
                    className: activeTab === 'deps' ? 'active' : '',
                    onClick: () => setActiveTab('deps')
                }, 'Dependências'),
                React.createElement('button', {
                    key: 'complexity-tab',
                    className: activeTab === 'complexity' ? 'active' : '',
                    onClick: () => setActiveTab('complexity')
                }, 'Complexidade')
            ])
        ]),
        
        activeTab === 'basic' && renderBasicMetrics(),
        activeTab === 'deps' && renderDependencyMetrics(),
        activeTab === 'complexity' && renderComplexityMetrics()
    ]);
};

// ==================== COMPONENTE TREE NODE ====================
const TreeNode = ({ node, repoBase, level = 0, searchTerm = '', onNodeClick, highlightNodes = [] }) => {
    const [isOpen, setIsOpen] = useState(level < 2);
    const hasChildren = node.children && node.children.length > 0;
    const isFolder = node.type === 'folder';
    const isHighlighted = highlightNodes.includes(node.id);
    
    const isVisible = !searchTerm || 
        node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (node.children && node.children.some(child => 
            child.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    
    if (!isVisible && searchTerm) return null;
    
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
            className: `tree-node-header ${isFolder ? 'folder' : 'file'} ${isHighlighted ? 'highlighted' : ''}`,
            onClick: () => {
                if (isFolder) {
                    setIsOpen(!isOpen);
                } else if (onNodeClick) {
                    onNodeClick(node);
                }
            },
            style: { 
                cursor: isFolder ? 'pointer' : 'default',
                background: isHighlighted ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                border: isHighlighted ? '1px solid rgba(59, 130, 246, 0.3)' : 'none'
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
            }, '🔗')
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
                onNodeClick: onNodeClick,
                highlightNodes: highlightNodes
            })
        ))
    ]);
};

// ==================== FUNÇÕES AUXILIARES ====================
const buildFileTree = (files) => {
    const root = { 
        id: 'root', 
        name: 'Repositório', 
        type: 'folder', 
        children: [],
        fullPath: ''
    };
    const pathMap = { '': root };
    
    const sortedFiles = [...files].sort((a, b) => a.path.localeCompare(b.path));
    
    sortedFiles.forEach(file => {
        const parts = file.path.split('/');
        let currentPath = '';
        
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
        
        const parentPath = parts.slice(0, -1).join('/') || '';
        const fileNode = {
            id: file.path,
            name: parts[parts.length - 1],
            type: 'file',
            fullPath: file.path,
            size: file.sizeKB || Math.round((file.size || 1024) / 1024),
            language: file.language
        };
        pathMap[parentPath].children.push(fileNode);
    });
    
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

// ==================== ANÁLISE DE DEPENDÊNCIAS ====================
const analyzeDependencies = async (files, owner, repo, branch) => {
    console.log('Iniciando análise de dependências...');
    
    const dependencies = {
        nodes: [],
        edges: [],
        stats: {
            totalFiles: 0,
            analyzedFiles: 0,
            totalDependencies: 0,
            externalDeps: 0,
            internalDeps: 0
        }
    };
    
    // Criar nós para cada arquivo
    files.slice(0, 100).forEach(file => { // Limitar a 100 arquivos para performance
        dependencies.nodes.push({
            id: file.path,
            label: file.path.split('/').pop(),
            path: file.path,
            type: 'file',
            extension: file.extension,
            language: file.language,
            imports: [],
            importedBy: [],
            group: getLanguageGroup(file.extension)
        });
    });
    
    dependencies.stats.totalFiles = dependencies.nodes.length;
    
    // Analisar conteúdo dos arquivos para encontrar imports
    for (let i = 0; i < Math.min(dependencies.nodes.length, 30); i++) { // Limitar análise
        const node = dependencies.nodes[i];
        
        try {
            const contentRes = await fetch(
                `https://api.github.com/repos/${owner}/${repo}/contents/${node.path}?ref=${branch}`,
                { 
                    headers: { 
                        'Accept': 'application/vnd.github.v3.raw',
                        'Authorization': '' // API pública tem limite
                    }
                }
            );
            
            if (!contentRes.ok) continue;
            
            const content = await contentRes.text();
            dependencies.stats.analyzedFiles++;
            
            // Padrões de import (simplificado)
            const importPatterns = [
                /from\s+['"](.+?)['"]/g,        // ES6 import
                /require\s*\(\s*['"](.+?)['"]/g, // CommonJS require
                /import\s+['"](.+?)['"]/g,       // ES6 import side-effect
                /import\s*\(['"](.+?)['"]\)/g    // Dynamic import
            ];
            
            const foundImports = [];
            
            importPatterns.forEach(pattern => {
                let match;
                while ((match = pattern.exec(content)) !== null) {
                    const importPath = match[1];
                    if (importPath) {
                        foundImports.push(importPath);
                        dependencies.stats.totalDependencies++;
                        
                        // Classificar como interno ou externo
                        if (importPath.startsWith('.') || importPath.startsWith('/')) {
                            dependencies.stats.internalDeps++;
                        } else {
                            dependencies.stats.externalDeps++;
                        }
                    }
                }
            });
            
            node.imports = foundImports;
            
            // Encontrar arquivo correspondente para cada import
            foundImports.forEach(importPath => {
                const targetFile = resolveImportPath(importPath, node.path, dependencies.nodes);
                if (targetFile) {
                    dependencies.edges.push({
                        from: node.id,
                        to: targetFile.id,
                        id: `${node.id}->${targetFile.id}`,
                        arrows: 'to',
                        color: { color: '#3b82f6', opacity: 0.6 }
                    });
                    
                    // Adicionar relação importedBy
                    if (!targetFile.importedBy) targetFile.importedBy = [];
                    targetFile.importedBy.push(node.id);
                }
            });
            
        } catch (err) {
            console.warn(`Erro ao analisar ${node.path}:`, err);
        }
    }
    
    console.log('Análise completa:', dependencies.stats);
    return dependencies;
};

const resolveImportPath = (importPath, sourcePath, allNodes) => {
    const sourceDir = sourcePath.substring(0, sourcePath.lastIndexOf('/'));
    
    const possiblePaths = [
        importPath,
        `${importPath}.js`,
        `${importPath}.ts`,
        `${importPath}/index.js`,
        `${importPath}/index.ts`,
        `${sourceDir}/${importPath}`,
        `${sourceDir}/${importPath}.js`,
        `${sourceDir}/${importPath}.ts`
    ];
    
    for (const path of possiblePaths) {
        const exactMatch = allNodes.find(n => n.path === path);
        if (exactMatch) return exactMatch;
        
        const partialMatch = allNodes.find(n => 
            n.path.includes(path.replace('./', '').replace('../', ''))
        );
        if (partialMatch) return partialMatch;
    }
    
    return null;
};

const getLanguageGroup = (extension) => {
    const groups = {
        'js': 1, 'jsx': 1,
        'ts': 2, 'tsx': 2,
        'css': 3, 'scss': 3, 'less': 3,
        'json': 4,
        'md': 5,
        'html': 6,
        'py': 7,
        'java': 8,
        'cpp': 9, 'c': 9,
        'cs': 10
    };
    return groups[extension] || 0;
};

// ==================== COMPONENTE GRÁFICO DE DEPENDÊNCIAS ====================
const DependencyGraph = ({ dependencies, onNodeClick, highlightedNode }) => {
    const graphRef = useRef(null);
    const networkRef = useRef(null);
    
    useEffect(() => {
        if (!graphRef.current || !dependencies || dependencies.nodes.length === 0) return;
        
        if (networkRef.current) {
            networkRef.current.destroy();
        }
        
        const nodes = new vis.DataSet(
            dependencies.nodes.map(node => ({
                id: node.id,
                label: node.label.length > 20 ? node.label.substring(0, 20) + '...' : node.label,
                title: `
                    <strong>${node.path}</strong><br/>
                    Tipo: ${node.extension}<br/>
                    Importa: ${node.imports?.length || 0} arquivos<br/>
                    Importado por: ${node.importedBy?.length || 0} arquivos
                `,
                group: node.group,
                color: getNodeColor(node.extension),
                shape: 'box',
                font: { color: '#ffffff', size: 12 },
                margin: 10,
                borderWidth: highlightedNode === node.id ? 3 : 1,
                borderColor: highlightedNode === node.id ? '#f59e0b' : '#475569',
                shadow: highlightedNode === node.id
            }))
        );
        
        const edges = new vis.DataSet(dependencies.edges);
        
        const container = graphRef.current;
        const data = { nodes, edges };
        
        const options = {
            nodes: {
                shape: 'box',
                size: 30,
                font: {
                    size: 12,
                    color: '#ffffff',
                    strokeWidth: 0
                },
                borderWidth: 2,
                shadow: true
            },
            edges: {
                arrows: {
                    to: {
                        enabled: true,
                        scaleFactor: 0.5
                    }
                },
                color: {
                    color: '#3b82f6',
                    opacity: 0.6,
                    highlight: '#f59e0b'
                },
                smooth: {
                    type: 'continuous',
                    roundness: 0.5
                },
                width: 1.5,
                hoverWidth: 2.5
            },
            physics: {
                enabled: true,
                stabilization: true,
                barnesHut: {
                    gravitationalConstant: -2000,
                    centralGravity: 0.3,
                    springLength: 150,
                    springConstant: 0.04,
                    damping: 0.09
                }
            },
            interaction: {
                hover: true,
                tooltipDelay: 200,
                hideEdgesOnDrag: true,
                navigationButtons: true,
                keyboard: true
            },
            groups: {
                0: { color: { background: '#6b7280', border: '#4b5563' } },
                1: { color: { background: '#3b82f6', border: '#1d4ed8' } },
                2: { color: { background: '#1d4ed8', border: '#1e40af' } },
                3: { color: { background: '#8b5cf6', border: '#7c3aed' } },
                4: { color: { background: '#f59e0b', border: '#d97706' } },
                5: { color: { background: '#10b981', border: '#059669' } },
                6: { color: { background: '#ef4444', border: '#dc2626' } },
                7: { color: { background: '#3b82f6', border: '#1d4ed8' } },
                8: { color: { background: '#dc2626', border: '#b91c1c' } },
                9: { color: { background: '#059669', border: '#047857' } },
                10: { color: { background: '#4f46e5', border: '#4338ca' } }
            }
        };
        
        networkRef.current = new vis.Network(container, data, options);
        
        networkRef.current.on('click', (params) => {
            if (params.nodes.length > 0 && onNodeClick) {
                const nodeId = params.nodes[0];
                const node = dependencies.nodes.find(n => n.id === nodeId);
                if (node) onNodeClick(node);
            }
        });
        
        networkRef.current.on('doubleClick', (params) => {
            if (params.nodes.length > 0) {
                networkRef.current.fit({
                    nodes: [params.nodes[0]],
                    animation: { duration: 500 }
                });
            }
        });
        
        setTimeout(() => {
            networkRef.current.fit({ animation: { duration: 1000 } });
        }, 500);
        
        return () => {
            if (networkRef.current) {
                networkRef.current.destroy();
            }
        };
    }, [dependencies, highlightedNode]);
    
    const getNodeColor = (extension) => {
        const colors = {
            'js': '#3b82f6', 'jsx': '#06b6d4',
            'ts': '#1d4ed8', 'tsx': '#1e40af',
            'css': '#8b5cf6', 'scss': '#7c3aed',
            'json': '#f59e0b',
            'md': '#10b981',
            'html': '#ef4444',
            'py': '#3b82f6',
            'java': '#dc2626',
            'cpp': '#059669', 'c': '#059669',
            'cs': '#4f46e5'
        };
        return colors[extension] || '#6b7280';
    };
    
    return React.createElement('div', {
        id: 'dependencyGraph',
        ref: graphRef,
        style: { width: '100%', height: '100%' }
    });
};

// ==================== COMPONENTE PRINCIPAL APP ====================
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
    
    const [dependencies, setDependencies] = useState(null);
    const [analyzingDeps, setAnalyzingDeps] = useState(false);
    const [activeView, setActiveView] = useState('tree');
    const [highlightedNode, setHighlightedNode] = useState(null);
    const [depsStats, setDepsStats] = useState(null);
    
    // Novos estados para cache e métricas
    const [cacheStats, setCacheStats] = useState(() => cache.getStats());
    const [basicMetrics, setBasicMetrics] = useState(null);
    const [dependencyMetrics, setDependencyMetrics] = useState(null);
    const [complexityMetrics, setComplexityMetrics] = useState(null);
    const [showNotification, setShowNotification] = useState(null);
    
    const showNotificationMessage = (message, type = 'info', duration = 3000) => {
        setShowNotification({ message, type });
        setTimeout(() => setShowNotification(null), duration);
    };
    
    const getFileLanguage = (path) => {
        const ext = path.split('.').pop().toLowerCase();
        const languages = {
            'js': 'JavaScript', 'jsx': 'JavaScript React',
            'ts': 'TypeScript', 'tsx': 'TypeScript React',
            'css': 'CSS', 'scss': 'SCSS', 'less': 'LESS',
            'json': 'JSON',
            'md': 'Markdown',
            'html': 'HTML',
            'py': 'Python',
            'java': 'Java',
            'cpp': 'C++', 'c': 'C',
            'cs': 'C#',
            'php': 'PHP',
            'rb': 'Ruby',
            'go': 'Go',
            'rs': 'Rust'
        };
        return languages[ext] || ext.toUpperCase();
    };
    
    const analyzeGithub = async (githubUrl = null, forceRefresh = false) => {
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
        
        // Verificar cache se não for refresh forçado
        if (!forceRefresh && lastUrl === currentRepo && files.length > 0) {
            setStatus('Repositório já carregado');
            return;
        }
        
        const cacheKey = `repo_${currentRepo.replace(/[^a-zA-Z0-9]/g, '_')}`;
        const cachedData = cache.get(cacheKey);
        
        if (!forceRefresh && cachedData) {
            setStatus('📦 Carregando do cache...');
            setTimeout(() => {
                setFiles(cachedData.files);
                setFileTree(buildFileTree(cachedData.files));
                setRepoInfo(cachedData.repoInfo);
                setRepoBase(cachedData.repoBase);
                setLastUrl(currentRepo);
                updateMetrics(cachedData.files, null);
                setStatus(`✅ ${cachedData.files.length} arquivos (do cache)`);
                showNotificationMessage('Dados carregados do cache!', 'success');
            }, 100);
            return;
        }
        
        setLoading(true);
        setStatus('🔍 Conectando ao GitHub...');
        setError(null);
        setLastUrl(currentRepo);
        setSearchTerm('');
        setDependencies(null);
        setActiveView('tree');
        
        try {
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
            const repoInfoData = {
                name: repoData.name,
                description: repoData.description,
                stars: repoData.stargazers_count,
                forks: repoData.forks_count,
                language: repoData.language,
                owner: repoData.owner.login,
                default_branch: repoData.default_branch
            };
            
            setRepoInfo(repoInfoData);
            
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
            
            const fileList = data.tree
                .filter(f => f.type === 'blob')
                .map(f => ({
                    ...f,
                    path: f.path,
                    extension: f.path.split('.').pop().toLowerCase(),
                    sizeKB: Math.round((f.size || 1024) / 1024 * 10) / 10,
                    language: getFileLanguage(f.path)
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
            
            const repoBaseUrl = `https://github.com/${owner}/${repo}`;
            setRepoBase(repoBaseUrl);
            setFiles(fileList);
            
            const tree = buildFileTree(fileList);
            setFileTree(tree);
            
            // Salvar no cache
            const cacheData = {
                files: fileList,
                repoInfo: repoInfoData,
                repoBase: repoBaseUrl,
                timestamp: Date.now()
            };
            
            if (cache.set(cacheKey, cacheData)) {
                setCacheStats(cache.getStats());
                showNotificationMessage('Análise salva no cache!', 'success');
            }
            
            updateMetrics(fileList, null);
            
            setStatus(`✅ ${fileList.length} arquivos carregados! Clique em "Analisar Dependências"`);
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
    
    const updateMetrics = (filesData, depsData) => {
        if (filesData) {
            const basic = metricsCalculator.calculateBasicMetrics(filesData);
            const complexity = metricsCalculator.calculateComplexityMetrics(filesData);
            setBasicMetrics(basic);
            setComplexityMetrics(complexity);
        }
        
        if (depsData) {
            const depsMetrics = metricsCalculator.calculateDependencyMetrics(depsData);
            setDependencyMetrics(depsMetrics);
            setDepsStats(depsData.stats);
        }
    };
    
    const analyzeDependenciesForRepo = async () => {
        if (!repoInfo || files.length === 0) return;
        
        setAnalyzingDeps(true);
        setStatus('🔍 Analisando dependências...');
        
        try {
            const [owner, repo] = lastUrl.split('/');
            const branch = repoInfo.default_branch || 'main';
            
            const deps = await analyzeDependencies(files, owner, repo, branch);
            setDependencies(deps);
            updateMetrics(null, deps);
            setActiveView('deps');
            setStatus(`✅ ${deps.stats.analyzedFiles} arquivos analisados, ${deps.stats.totalDependencies} dependências encontradas`);
        } catch (err) {
            console.error('Erro na análise de dependências:', err);
            setError('Erro ao analisar dependências: ' + err.message);
            setStatus('❌ Falha na análise de dependências');
        } finally {
            setAnalyzingDeps(false);
        }
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            analyzeGithub();
        }
    };
    
    const handleFileClick = (node) => {
        if (repoBase && node.type === 'file') {
            window.open(`${repoBase}/blob/main/${node.fullPath}`, '_blank');
        }
    };
    
    const handleGraphNodeClick = (node) => {
        setHighlightedNode(node.id);
        setTimeout(() => {
            const element = document.querySelector(`[data-node-id="${node.id}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };
    
    const handleClearCache = () => {
        if (confirm('Tem certeza que deseja limpar todo o cache? Isso removerá todas as análises salvas.')) {
            cache.clear();
            setCacheStats(cache.getStats());
            showNotificationMessage('Cache limpo com sucesso!', 'success');
        }
    };
    
    const handleLoadFromCache = () => {
        if (!lastUrl) {
            showNotificationMessage('Digite uma URL primeiro', 'warning');
            return;
        }
        
        const cacheKey = `repo_${lastUrl.replace(/[^a-zA-Z0-9]/g, '_')}`;
        const cachedData = cache.get(cacheKey);
        
        if (cachedData) {
            setFiles(cachedData.files);
            setFileTree(buildFileTree(cachedData.files));
            setRepoInfo(cachedData.repoInfo);
            setRepoBase(cachedData.repoBase);
            updateMetrics(cachedData.files, null);
            setStatus(`✅ ${cachedData.files.length} arquivos (do cache)`);
            showNotificationMessage('Dados carregados do cache!', 'success');
        } else {
            showNotificationMessage('Nenhum cache encontrado para este repositório', 'warning');
        }
    };
    
    const handleExportImage = async () => {
        try {
            const elementId = activeView === 'tree' ? 'tree-view' : 'dependencyGraph';
            const filename = repoInfo ? 
                `codemap-${repoInfo.owner}-${repoInfo.name}-${activeView}.png` : 
                'codemap-export.png';
            
            await exportUtils.exportAsImage(elementId, filename);
            showNotificationMessage('Imagem exportada com sucesso!', 'success');
        } catch (err) {
            showNotificationMessage('Erro ao exportar imagem: ' + err.message, 'error');
        }
    };
    
    const handleExportJSON = () => {
        try {
            const exportData = {
                repoInfo,
                files,
                fileTree,
                dependencies,
                basicMetrics,
                dependencyMetrics,
                complexityMetrics,
                exportDate: new Date().toISOString(),
                version: 'CodeCartographer v4.0'
            };
            
            const filename = repoInfo ? 
                `${repoInfo.owner}-${repoInfo.name}-analysis.json` : 
                'codecartographer-analysis.json';
            
            exportUtils.exportAsJSON(exportData, filename);
            showNotificationMessage('JSON exportado com sucesso!', 'success');
        } catch (err) {
            showNotificationMessage('Erro ao exportar JSON: ' + err.message, 'error');
        }
    };
    
    const handleExportCSV = () => {
        try {
            if (!basicMetrics) {
                throw new Error('Nenhuma métrica disponível para exportar');
            }
            
            exportUtils.exportMetricsAsCSV(basicMetrics);
            showNotificationMessage('CSV exportado com sucesso!', 'success');
        } catch (err) {
            showNotificationMessage('Erro ao exportar CSV: ' + err.message, 'error');
        }
    };
    
    const examples = [
        { name: 'React', url: 'https://github.com/facebook/react' },
        { name: 'Vue.js', url: 'https://github.com/vuejs/vue' },
        { name: 'VS Code', url: 'https://github.com/microsoft/vscode' },
        { name: 'Next.js', url: 'https://github.com/vercel/next.js' }
    ];
    
    const renderGraphLegend = () => {
        const languageGroups = [
            { name: 'JavaScript', color: '#3b82f6', group: 1 },
            { name: 'TypeScript', color: '#1d4ed8', group: 2 },
            { name: 'CSS/SASS', color: '#8b5cf6', group: 3 },
            { name: 'JSON', color: '#f59e0b', group: 4 },
            { name: 'Markdown', color: '#10b981', group: 5 },
            { name: 'HTML', color: '#ef4444', group: 6 }
        ];
        
        return React.createElement('div', { className: 'deps-legend' }, [
            React.createElement('div', {
                key: 'title',
                style: { fontWeight: 'bold', marginBottom: '10px', fontSize: '12px' }
            }, 'Legenda de Cores'),
            ...languageGroups.map(lang => 
                React.createElement('div', { key: lang.name, className: 'deps-legend-item' }, [
                    React.createElement('div', {
                        key: 'color',
                        className: 'deps-legend-color',
                        style: { background: lang.color }
                    }),
                    React.createElement('span', { key: 'name' }, lang.name)
                ])
            )
        ]);
    };
    
    const renderCacheIndicator = () => {
        const hasCache = cacheStats && cacheStats.total > 0;
        
        return React.createElement('div', { className: 'cache-indicator' }, [
            React.createElement('div', {
                key: 'dot',
                className: `cache-dot ${hasCache ? '' : 'inactive'}`,
                title: hasCache ? 'Cache disponível' : 'Cache vazio'
            }),
            React.createElement('span', { key: 'text' }, 
                hasCache ? `${cacheStats.total} repositórios em cache` : 'Cache vazio'
            )
        ]);
    };
    
    return React.createElement('div', { 
        style: { width: '100%', height: '100%', position: 'relative' } 
    }, [
        // Notificação
        showNotification && React.createElement('div', {
            key: 'notification',
            className: `notification ${showNotification.type}`,
            style: { 
                position: 'fixed', 
                top: '80px', 
                right: '20px', 
                zIndex: 10000 
            }
        }, [
            React.createElement('i', {
                key: 'icon',
                className: `fas fa-${showNotification.type === 'success' ? 'check-circle' : 
                             showNotification.type === 'error' ? 'exclamation-circle' : 
                             'info-circle'}`
            }),
            React.createElement('span', { key: 'message' }, showNotification.message),
            React.createElement('span', {
                key: 'close',
                className: 'notification-close',
                onClick: () => setShowNotification(null)
            }, '×')
        ]),
        
        // UI Layer
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
                }, 'CodeCartographer Pro'),
                React.createElement('p', { 
                    key: 'subtitle',
                    style: { fontSize: '12px', color: '#94a3b8', margin: '0' }
                }, 'Análise visual completa de repositórios GitHub')
            ]),
            
            // View Toggle
            files.length > 0 && React.createElement('div', {
                key: 'view-toggle',
                className: 'view-toggle'
            }, [
                React.createElement('button', {
                    key: 'tree-view',
                    className: activeView === 'tree' ? 'active' : '',
                    onClick: () => setActiveView('tree')
                }, '🌳 Visualização em Árvore'),
                React.createElement('button', {
                    key: 'deps-view',
                    className: activeView === 'deps' ? 'active' : '',
                    onClick: () => {
                        if (!dependencies && !analyzingDeps) {
                            analyzeDependenciesForRepo();
                        } else {
                            setActiveView('deps');
                        }
                    },
                    disabled: analyzingDeps
                }, analyzingDeps ? '🔍 Analisando...' : '🔗 Mapa de Dependências'),
                React.createElement('button', {
                    key: 'metrics-view',
                    className: activeView === 'metrics' ? 'active' : '',
                    onClick: () => setActiveView('metrics'),
                    disabled: !basicMetrics
                }, '📊 Dashboard')
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
                    disabled: loading || analyzingDeps
                }),
                React.createElement('button', { 
                    key: 'button',
                    onClick: () => analyzeGithub(),
                    disabled: loading || analyzingDeps,
                    title: 'Analisar repositório'
                }, loading ? [
                    React.createElement('span', { key: 'spinner', className: 'loading-spinner' }),
                    'ANALISANDO...'
                ] : [
                    React.createElement('i', { key: 'icon', className: 'fas fa-rocket' }),
                    ' ANALISAR'
                ]),
                React.createElement('button', {
                    key: 'refresh',
                    onClick: () => analyzeGithub(null, true),
                    disabled: loading || analyzingDeps || !lastUrl,
                    title: 'Forçar atualização (ignorar cache)',
                    style: { padding: '12px', minWidth: 'auto' }
                }, [
                    React.createElement('i', { key: 'icon', className: 'fas fa-sync-alt' })
                ])
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
            
            // Controles de Cache
            React.createElement(CacheControls, {
                key: 'cache-controls',
                onClearCache: handleClearCache,
                onLoadFromCache: handleLoadFromCache,
                cacheStats: cacheStats,
                hasCache: cacheStats && cacheStats.total > 0
            }),
            
            // Controles de Exportação
            files.length > 0 && React.createElement(ExportControls, {
                key: 'export-controls',
                onExportImage: handleExportImage,
                onExportJSON: handleExportJSON,
                onExportCSV: handleExportCSV,
                hasData: files.length > 0,
                repoInfo: repoInfo
            }),
            
            // Indicador de Cache
            React.createElement(renderCacheIndicator, { key: 'cache-indicator' }),
            
            // Dashboard de Métricas (se disponível)
            basicMetrics && activeView === 'metrics' && React.createElement(MetricsDashboard, {
                key: 'metrics-dashboard',
                basicMetrics: basicMetrics,
                dependencyMetrics: dependencyMetrics,
                complexityMetrics: complexityMetrics
            }),
            
            // Informações do Repositório
            repoInfo && activeView !== 'metrics' && React.createElement('div', {
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
            
            // Exemplos (apenas se não houver dados)
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
        
        // Visualização em Árvore
        fileTree && activeView === 'tree' && React.createElement('div', {
            key: 'tree-container',
            className: 'tree-container'
        }, [
            React.createElement('div', {
                key: 'tree-view',
                id: 'tree-view',
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
                        onClick: () => setExpandedAll(!expandedAll)
                    }, expandedAll ? 'Recolher Tudo' : 'Expandir Tudo'),
                    React.createElement('button', {
                        key: 'deps-btn',
                        onClick: analyzeDependenciesForRepo,
                        disabled: analyzingDeps
                    }, analyzingDeps ? '🔍 Analisando...' : '🔗 Analisar Dependências')
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
                        onNodeClick: handleFileClick,
                        highlightNodes: highlightedNode ? [highlightedNode] : []
                    })
                ])
            ])
        ]),
        
        // Visualização de Dependências
        activeView === 'deps' && React.createElement('div', {
            key: 'deps-container',
            className: 'dependencies-container active'
        }, [
            analyzingDeps ? React.createElement('div', {
                key: 'loading',
                className: 'deps-loading'
            }, [
                React.createElement('div', {
                    key: 'spinner',
                    className: 'deps-loading-spinner'
                }),
                React.createElement('div', { key: 'text' }, 'Analisando dependências...'),
                React.createElement('div', { 
                    key: 'subtext',
                    style: { fontSize: '12px', marginTop: '10px', color: '#64748b' }
                }, 'Isso pode levar alguns minutos dependendo do tamanho do repositório')
            ]) : dependencies ? [
                React.createElement('div', {
                    key: 'controls',
                    className: 'deps-controls'
                }, [
                    React.createElement('button', {
                        key: 'back',
                        onClick: () => setActiveView('tree')
                    }, '← Voltar para Árvore'),
                    React.createElement('button', {
                        key: 'refresh',
                        onClick: analyzeDependenciesForRepo
                    }, '🔄 Reanalisar'),
                    React.createElement('div', {
                        key: 'info',
                        className: 'deps-info'
                    }, [
                        React.createElement('span', { key: 'nodes' }, `📦 ${dependencies.nodes.length} arquivos`),
                        React.createElement('span', { key: 'edges' }, `🔗 ${dependencies.edges.length} conexões`),
                        React.createElement('span', { key: 'stats' }, `📊 ${depsStats.analyzedFiles} analisados`)
                    ])
                ]),
                
                React.createElement(DependencyGraph, {
                    key: 'graph',
                    dependencies: dependencies,
                    onNodeClick: handleGraphNodeClick,
                    highlightedNode: highlightedNode
                }),
                
                renderGraphLegend()
            ] : React.createElement('div', {
                key: 'empty',
                className: 'deps-loading'
            }, [
                React.createElement('div', { 
                    key: 'icon',
                    style: { fontSize: '48px', marginBottom: '15px', opacity: 0.5 }
                }, '🔗'),
                React.createElement('div', { key: 'text' }, 'Nenhuma análise de dependências disponível'),
                React.createElement('button', {
                    key: 'analyze-btn',
                    onClick: analyzeDependenciesForRepo,
                    disabled: analyzingDeps || files.length === 0,
                    style: {
                        padding: '10px 20px',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        marginTop: '15px',
                        fontSize: '14px'
                    }
                }, analyzingDeps ? 'Analisando...' : '🔍 Analisar Dependências')
            ])
        ]),
        
        // Dashboard de Métricas (view separada)
        activeView === 'metrics' && basicMetrics && React.createElement('div', {
            key: 'metrics-container',
            className: 'tree-container'
        }, [
            React.createElement('div', {
                key: 'metrics-view',
                className: 'tree-view',
                style: { maxHeight: 'calc(100vh - 120px)', overflow: 'auto' }
            }, [
                React.createElement('div', {
                    key: 'controls',
                    className: 'tree-controls'
                }, [
                    React.createElement('button', {
                        key: 'back',
                        onClick: () => setActiveView('tree'),
                        style: { background: '#475569' }
                    }, '← Voltar para Árvore'),
                    React.createElement('button', {
                        key: 'export-all',
                        onClick: handleExportCSV,
                        style: { background: '#10b981' }
                    }, '📊 Exportar Todas as Métricas')
                ]),
                
                React.createElement(MetricsDashboard, {
                    key: 'dashboard',
                    basicMetrics: basicMetrics,
                    dependencyMetrics: dependencyMetrics,
                    complexityMetrics: complexityMetrics
                }),
                
                // Gráficos adicionais podem ser adicionados aqui
                React.createElement('div', {
                    key: 'charts-container',
                    className: 'chart-container',
                    style: { marginTop: '20px' }
                }, [
                    React.createElement('h4', {
                        key: 'title',
                        style: { marginBottom: '15px' }
                    }, 'Distribuição por Tipo de Arquivo'),
                    React.createElement('div', {
                        key: 'chart',
                        id: 'fileTypeChart',
                        style: { height: '200px', position: 'relative' }
                    }, [
                        React.createElement('canvas', {
                            key: 'canvas',
                            id: 'fileTypeCanvas',
                            style: { width: '100%', height: '100%' }
                        })
                    ])
                ])
            ])
        ])
    ]);
}

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('app');
    if (container && React && ReactDOM) {
        try {
            const root = createRoot(container);
            root.render(React.createElement(App));
            
            // Atualizar cache stats periodicamente
            setInterval(() => {
                const cacheStats = cache.getStats();
                const cacheStatus = document.getElementById('cacheStatus');
                if (cacheStatus && cacheStats.total > 0) {
                    cacheStatus.innerHTML = 
                        `<i class="fas fa-database"></i> ${cacheStats.total} repos em cache (${cacheStats.sizeKB} KB)`;
                }
            }, 30000);
            
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
    }
});