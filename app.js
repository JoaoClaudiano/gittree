// ==================== INICIALIZAÇÃO ====================
if (!window.React || !window.ReactDOM) {
    console.error('React não está carregado!');
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

const { useState, useEffect, useRef, useMemo } = React;
const { createRoot } = ReactDOM;

// ==================== CONSTANTES E CONFIGURAÇÕES ====================
const GRAPH_CONFIG = {
    NODE_SIZE: 30,
    NODE_SPACING: 150,
    LEVEL_SPACING: 200,
    FORCE_STRENGTH: 0.1,
    LINK_DISTANCE: 100,
    COLLISION_RADIUS: 60
};

const FILE_ANALYSIS_CONFIG = {
    MAX_FILE_SIZE: 100000, // 100KB
    SUPPORTED_LANGUAGES: ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'php', 'rb', 'go']
};

// ==================== SISTEMA DE CACHE AVANÇADO ====================
const CACHE_PREFIX = 'codemap_pro_';
const CACHE_VERSION = 'v5.0';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 dias

const cache = {
    set: (key, data, ttl = CACHE_TTL) => {
        try {
            const item = {
                data,
                expiry: Date.now() + ttl,
                timestamp: Date.now(),
                version: CACHE_VERSION
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
            
            // Verificar versão e expiração
            if (Date.now() > item.expiry || item.version !== CACHE_VERSION) {
                localStorage.removeItem(CACHE_PREFIX + key);
                return null;
            }
            
            return item.data;
        } catch (err) {
            console.error('Erro ao ler cache:', err);
            return null;
        }
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
                if (item.data?.repoInfo) {
                    stats.repos.push({
                        name: item.data.repoInfo.name,
                        owner: item.data.repoInfo.owner,
                        files: item.data.files?.length || 0,
                        timestamp: new Date(item.timestamp).toLocaleString(),
                        size: JSON.stringify(item).length
                    });
                }
            } catch (e) {}
        });
        
        stats.sizeKB = Math.round(stats.size / 1024 * 100) / 100;
        stats.sizeMB = Math.round(stats.sizeKB / 1024 * 100) / 100;
        return stats;
    }
};

// ==================== UTILITÁRIOS AVANÇADOS ====================
const CodeAnalyzer = {
    calculateComplexity: (content) => {
        if (!content) return { lines: 0, functions: 0, complexity: 0 };
        
        const lines = content.split('\n').length;
        
        // Expressão regular corrigida - removidos parênteses desbalanceados
        const functionPatterns = [
            /function\s+\w+\s*\(/g,
            /const\s+\w+\s*=/g,
            /let\s+\w+\s*=/g,
            /var\s+\w+\s*=/g,
            /def\s+\w+\s*\(/g,
            /class\s+\w+/g
        ];
        
        let functions = 0;
        functionPatterns.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) functions += matches.length;
        });
        
        // Métrica simples de complexidade
        const complexity = Math.round((lines * 0.3) + (functions * 2));
        
        return { lines, functions, complexity };
    },
    
    analyzeDependencies: (content, filePath) => {
        if (!content) return [];
        
        const dependencies = [];
        const importPatterns = [
            /import\s+.*?\s+from\s+['"](.*?)['"]/g,
            /require\s*\(\s*['"](.*?)['"]\s*\)/g,
            /export\s+.*?\s+from\s+['"](.*?)['"]/g
        ];
        
        importPatterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(content)) !== null) {
                dependencies.push(match[1]);
            }
        });
        
        return dependencies.filter(dep => !dep.startsWith('.') || dep.endsWith('.js') || dep.endsWith('.jsx') || dep.endsWith('.ts') || dep.endsWith('.tsx'));
    }
};

const GraphExporter = {
    toDOT: (graphData) => {
        let dot = 'digraph G {\n';
        dot += '  rankdir=LR;\n';
        dot += '  node [shape=box, style=filled, color=lightblue];\n\n';
        
        // Nós
        graphData.nodes?.forEach(node => {
            dot += `  "${node.id}" [label="${node.label}", group="${node.group}"];\n`;
        });
        
        // Arestas
        dot += '\n';
        graphData.edges?.forEach(edge => {
            dot += `  "${edge.from}" -> "${edge.to}";\n`;
        });
        
        dot += '}\n';
        return dot;
    },
    
    toSVG: (graphData) => {
        // Implementação simplificada para SVG
        return `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
            <text x="50" y="30" fill="#f8fafc" font-family="Inter">Graph Export</text>
        </svg>`;
    }
};
// ==================== COMPONENTE DE GRAFO INTERATIVO ====================
const InteractiveGraph = ({ files, repoInfo, onNodeClick }) => {
    const [graphData, setGraphData] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const canvasRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [viewport, setViewport] = useState({ x: 0, y: 0, scale: 1 });
    const nodesRef = useRef([]);
    const animationRef = useRef(null);
    
    // Construir dados do grafo
    useEffect(() => {
        if (!files?.length) return;
        
        const nodes = files.map(file => ({
            id: file.path,
            label: file.name || file.path.split('/').pop(),
            type: file.extension,
            path: file.path,
            size: file.sizeKB,
            x: Math.random() * 600 - 300,
            y: Math.random() * 400 - 200,
            vx: 0,
            vy: 0
        }));
        
        // Criar conexões baseadas na estrutura de pastas
        const edges = [];
        const fileMap = {};
        nodes.forEach(node => fileMap[node.id] = node);
        
        files.forEach(file => {
            const pathParts = file.path.split('/');
            if (pathParts.length > 1) {
                const parentPath = pathParts.slice(0, -1).join('/');
                if (fileMap[parentPath]) {
                    edges.push({
                        source: parentPath,
                        target: file.path,
                        type: 'parent-child'
                    });
                }
            }
        });
        
        nodesRef.current = nodes;
        setGraphData({ nodes, edges });
    }, [files]);
    
    // Renderizar grafo
    useEffect(() => {
        if (!graphData || !canvasRef.current) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Aplicar transformação da viewport
            ctx.save();
            ctx.translate(viewport.x, viewport.y);
            ctx.scale(viewport.scale, viewport.scale);
            
            // Renderizar arestas
            ctx.strokeStyle = 'rgba(100, 116, 139, 0.6)';
            ctx.lineWidth = 1;
            graphData.edges?.forEach(edge => {
                const source = graphData.nodes.find(n => n.id === edge.source);
                const target = graphData.nodes.find(n => n.id === edge.target);
                if (source && target) {
                    ctx.beginPath();
                    ctx.moveTo(source.x, source.y);
                    ctx.lineTo(target.x, target.y);
                    ctx.stroke();
                }
            });
            
            // Renderizar nós
            graphData.nodes?.forEach(node => {
                const isSelected = selectedNode?.id === node.id;
                
                // Gradiente para o nó
                const gradient = ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, GRAPH_CONFIG.NODE_SIZE
                );
                
                if (isSelected) {
                    gradient.addColorStop(0, '#3b82f6');
                    gradient.addColorStop(1, '#1d4ed8');
                } else if (node.type === 'folder') {
                    gradient.addColorStop(0, '#f59e0b');
                    gradient.addColorStop(1, '#d97706');
                } else {
                    gradient.addColorStop(0, '#10b981');
                    gradient.addColorStop(1, '#059669');
                }
                
                // Desenhar nó
                ctx.beginPath();
                ctx.arc(node.x, node.y, GRAPH_CONFIG.NODE_SIZE, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Borda
                ctx.strokeStyle = isSelected ? '#ffffff' : 'rgba(255, 255, 255, 0.3)';
                ctx.lineWidth = isSelected ? 3 : 1;
                ctx.stroke();
                
                // Rótulo
                ctx.fillStyle = '#f8fafc';
                ctx.font = '12px Inter';
                ctx.textAlign = 'center';
                ctx.fillText(node.label, node.x, node.y + GRAPH_CONFIG.NODE_SIZE + 20);
            });
            
            ctx.restore();
        };
        
        render();
    }, [graphData, selectedNode, viewport]);
    
    // Simulação de força
    useEffect(() => {
        if (!graphData) return;
        
        const simulate = () => {
            const nodes = [...graphData.nodes];
            
            // Aplicar forças de repulsão
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[j].x - nodes[i].x;
                    const dy = nodes[j].y - nodes[i].y;
                    const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                    const force = GRAPH_CONFIG.FORCE_STRENGTH / (distance * distance);
                    
                    if (distance < GRAPH_CONFIG.COLLISION_RADIUS) {
                        nodes[i].vx -= (dx / distance) * force;
                        nodes[i].vy -= (dy / distance) * force;
                        nodes[j].vx += (dx / distance) * force;
                        nodes[j].vy += (dy / distance) * force;
                    }
                }
            }
            
            // Aplicar forças de atração (arestas)
            graphData.edges?.forEach(edge => {
                const source = nodes.find(n => n.id === edge.source);
                const target = nodes.find(n => n.id === edge.target);
                if (source && target) {
                    const dx = target.x - source.x;
                    const dy = target.y - source.y;
                    const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                    const force = (distance - GRAPH_CONFIG.LINK_DISTANCE) * 0.01;
                    
                    source.vx += (dx / distance) * force;
                    source.vy += (dy / distance) * force;
                    target.vx -= (dx / distance) * force;
                    target.vy -= (dy / distance) * force;
                }
            });
            
            // Atualizar posições
            nodes.forEach(node => {
                node.vx *= 0.9; // Atrito
                node.vy *= 0.9;
                node.x += node.vx;
                node.y += node.vy;
                
                // Limitar ao canvas
                const limit = 500;
                node.x = Math.max(-limit, Math.min(limit, node.x));
                node.y = Math.max(-limit, Math.min(limit, node.y));
            });
            
            setGraphData(prev => ({ ...prev, nodes }));
            animationRef.current = requestAnimationFrame(simulate);
        };
        
        animationRef.current = requestAnimationFrame(simulate);
        return () => cancelAnimationFrame(animationRef.current);
    }, [graphData]);
    
    // Handlers de interação
    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - viewport.x) / viewport.scale;
        const y = (e.clientY - rect.top - viewport.y) / viewport.scale;
        
        // Verificar clique em nó
        const clickedNode = graphData?.nodes?.find(node => {
            const dx = node.x - x;
            const dy = node.y - y;
            return Math.sqrt(dx * dx + dy * dy) < GRAPH_CONFIG.NODE_SIZE;
        });
        
        if (clickedNode) {
            setSelectedNode(clickedNode);
            onNodeClick?.(clickedNode);
        } else {
            setIsDragging(true);
            setDragStart({ x: e.clientX, y: e.clientY });
        }
    };
    
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        
        setViewport(prev => ({
            ...prev,
            x: prev.x + dx,
            y: prev.y + dy
        }));
        
        setDragStart({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseUp = () => {
        setIsDragging(false);
    };
    
    const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.max(0.1, Math.min(3, viewport.scale * delta));
        setViewport(prev => ({ ...prev, scale: newScale }));
    };
    
    const resetView = () => {
        setViewport({ x: 0, y: 0, scale: 1 });
    };
    
    const exportGraph = (format) => {
        if (!graphData) return;
        
        let content, mimeType, filename;
        
        switch(format) {
            case 'dot':
                content = GraphExporter.toDOT(graphData);
                mimeType = 'text/plain';
                filename = `${repoInfo.owner}_${repoInfo.name}_graph.dot`;
                break;
            case 'svg':
                content = GraphExporter.toSVG(graphData);
                mimeType = 'image/svg+xml';
                filename = `${repoInfo.owner}_${repoInfo.name}_graph.svg`;
                break;
            case 'json':
                content = JSON.stringify(graphData, null, 2);
                mimeType = 'application/json';
                filename = `${repoInfo.owner}_${repoInfo.name}_graph.json`;
                break;
        }
        
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };
    
    return React.createElement('div', {
        style: {
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #334155',
            height: '600px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
        }
    }, [
        // Controles do grafo
        React.createElement('div', {
            key: 'graph-controls',
            style: {
                position: 'absolute',
                top: '20px',
                right: '20px',
                display: 'flex',
                gap: '10px',
                zIndex: 10
            }
        }, [
            React.createElement('button', {
                key: 'reset-view',
                onClick: resetView,
                style: {
                    padding: '8px 12px',
                    background: 'rgba(59, 130, 246, 0.8)',
                    border: '1px solid #3b82f6',
                    borderRadius: '6px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    backdropFilter: 'blur(10px)'
                }
            }, [
                React.createElement('i', { key: 'icon', className: 'fas fa-crosshairs' }),
                'Resetar'
            ]),
            
            React.createElement('div', {
                key: 'export-dropdown',
                style: { position: 'relative' }
            }, [
                React.createElement('button', {
                    key: 'export-btn',
                    onClick: () => {},
                    style: {
                        padding: '8px 12px',
                        background: 'rgba(16, 185, 129, 0.8)',
                        border: '1px solid #10b981',
                        borderRadius: '6px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backdropFilter: 'blur(10px)'
                    }
                }, [
                    React.createElement('i', { key: 'icon', className: 'fas fa-download' }),
                    'Exportar'
                ]),
                
                React.createElement('div', {
                    key: 'export-menu',
                    style: {
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        marginTop: '5px',
                        background: '#1e293b',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        padding: '8px',
                        display: 'none',
                        minWidth: '150px'
                    }
                }, [
                    React.createElement('button', {
                        key: 'export-dot',
                        onClick: () => exportGraph('dot'),
                        style: {
                            width: '100%',
                            padding: '8px',
                            background: 'transparent',
                            border: 'none',
                            color: '#cbd5e1',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '12px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }
                    }, [
                        React.createElement('i', { key: 'icon', className: 'fas fa-project-diagram' }),
                        'DOT'
                    ]),
                    React.createElement('button', {
                        key: 'export-svg',
                        onClick: () => exportGraph('svg'),
                        style: {
                            width: '100%',
                            padding: '8px',
                            background: 'transparent',
                            border: 'none',
                            color: '#cbd5e1',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '12px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }
                    }, [
                        React.createElement('i', { key: 'icon', className: 'fas fa-image' }),
                        'SVG'
                    ]),
                    React.createElement('button', {
                        key: 'export-json',
                        onClick: () => exportGraph('json'),
                        style: {
                            width: '100%',
                            padding: '8px',
                            background: 'transparent',
                            border: 'none',
                            color: '#cbd5e1',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '12px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }
                    }, [
                        React.createElement('i', { key: 'icon', className: 'fas fa-code' }),
                        'JSON'
                    ])
                ])
            ])
        ]),
        
        // Canvas do grafo
        React.createElement('canvas', {
            key: 'graph-canvas',
            ref: canvasRef,
            width: 800,
            height: 560,
            style: {
                flex: 1,
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                cursor: isDragging ? 'grabbing' : 'grab'
            },
            onMouseDown: handleMouseDown,
            onMouseMove: handleMouseMove,
            onMouseUp: handleMouseUp,
            onMouseLeave: handleMouseUp,
            onWheel: handleWheel
        }),
        
        // Informações do nó selecionado
        selectedNode && React.createElement('div', {
            key: 'node-info',
            style: {
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '15px',
                maxWidth: '300px',
                backdropFilter: 'blur(10px)'
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
                React.createElement('div', {
                    key: 'icon',
                    style: {
                        width: '24px',
                        height: '24px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: 'white'
                    }
                }, '📄'),
                React.createElement('div', {
                    key: 'name',
                    style: {
                        color: '#f8fafc',
                        fontWeight: '600',
                        fontSize: '14px'
                    }
                }, selectedNode.label)
            ]),
            
            React.createElement('div', {
                key: 'details',
                style: {
                    fontSize: '12px',
                    color: '#94a3b8'
                }
            }, [
                React.createElement('div', { key: 'path' }, `Caminho: ${selectedNode.path}`),
                React.createElement('div', { key: 'type' }, `Tipo: ${selectedNode.type}`),
                selectedNode.size && React.createElement('div', { key: 'size' }, `Tamanho: ${selectedNode.size} KB`)
            ]),
            
            React.createElement('button', {
                key: 'open-btn',
                onClick: () => window.open(`${repoInfo.url}/blob/${repoInfo.default_branch}/${selectedNode.path}`, '_blank'),
                style: {
                    marginTop: '10px',
                    padding: '6px 12px',
                    background: '#3b82f6',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '12px',
                    width: '100%'
                }
            }, 'Abrir no GitHub')
        ]),
        
        // Legenda
        React.createElement('div', {
            key: 'legend',
            style: {
                position: 'absolute',
                top: '20px',
                left: '20px',
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '10px',
                fontSize: '11px',
                color: '#94a3b8',
                backdropFilter: 'blur(10px)'
            }
        }, [
            React.createElement('div', {
                key: 'title',
                style: {
                    marginBottom: '8px',
                    color: '#cbd5e1',
                    fontWeight: '600'
                }
            }, 'Legenda'),
            React.createElement('div', {
                key: 'items',
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px'
                }
            }, [
                React.createElement('div', {
                    key: 'folder',
                    style: { display: 'flex', alignItems: 'center', gap: '8px' }
                }, [
                    React.createElement('div', {
                        style: {
                            width: '12px',
                            height: '12px',
                            background: '#f59e0b',
                            borderRadius: '50%'
                        }
                    }),
                    'Pastas'
                ]),
                React.createElement('div', {
                    key: 'file',
                    style: { display: 'flex', alignItems: 'center', gap: '8px' }
                }, [
                    React.createElement('div', {
                        style: {
                            width: '12px',
                            height: '12px',
                            background: '#10b981',
                            borderRadius: '50%'
                        }
                    }),
                    'Arquivos'
                ]),
                React.createElement('div', {
                    key: 'selected',
                    style: { display: 'flex', alignItems: 'center', gap: '8px' }
                }, [
                    React.createElement('div', {
                        style: {
                            width: '12px',
                            height: '12px',
                            background: '#3b82f6',
                            borderRadius: '50%'
                        }
                    }),
                    'Selecionado'
                ])
            ])
        ])
    ]);
};

// ==================== COMPONENTE DE ANÁLISE DE CÓDIGO ====================
const CodeAnalysis = ({ files }) => {
    const [analysis, setAnalysis] = useState(null);
    const [selectedMetric, setSelectedMetric] = useState('complexity');
    
    useEffect(() => {
        if (!files?.length) return;
        
        const codeFiles = files.filter(f => 
            FILE_ANALYSIS_CONFIG.SUPPORTED_LANGUAGES.includes(f.extension)
        );
        
        // Análise agregada
        const totalLines = codeFiles.reduce((sum, file) => {
            const stats = CodeAnalyzer.calculateComplexity('');
            return sum + stats.lines;
        }, 0);
        
        const totalFunctions = codeFiles.reduce((sum, file) => {
            const stats = CodeAnalyzer.calculateComplexity('');
            return sum + stats.functions;
        }, 0);
        
        const avgComplexity = Math.round(totalLines / Math.max(1, codeFiles.length));
        
        // Distribuição por linguagem
        const byLanguage = {};
        codeFiles.forEach(file => {
            if (!byLanguage[file.language]) {
                byLanguage[file.language] = { count: 0, size: 0 };
            }
            byLanguage[file.language].count++;
            byLanguage[file.language].size += file.sizeKB;
        });
        
        setAnalysis({
            totalFiles: files.length,
            codeFiles: codeFiles.length,
            totalLines,
            totalFunctions,
            avgComplexity,
            byLanguage
        });
    }, [files]);
    
    if (!analysis) return null;
    
    return React.createElement('div', {
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
            React.createElement('h3', {
                key: 'title',
                style: {
                    color: '#f8fafc',
                    margin: 0,
                    fontSize: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }
            }, [
                React.createElement('i', {
                    key: 'icon',
                    className: 'fas fa-chart-line',
                    style: { color: '#3b82f6' }
                }),
                'Análise de Código'
            ]),
            
            // Seletor de métricas
            React.createElement('select', {
                key: 'metric-selector',
                value: selectedMetric,
                onChange: (e) => setSelectedMetric(e.target.value),
                style: {
                    padding: '8px 12px',
                    background: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '6px',
                    color: '#cbd5e1',
                    fontSize: '14px',
                    minWidth: '150px'
                }
            }, [
                React.createElement('option', { key: 'complexity', value: 'complexity' }, 'Complexidade'),
                React.createElement('option', { key: 'distribution', value: 'distribution' }, 'Distribuição'),
                React.createElement('option', { key: 'size', value: 'size' }, 'Tamanho')
            ])
        ]),
        
        // Estatísticas principais
        React.createElement('div', {
            key: 'main-stats',
            style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '15px',
                marginBottom: '25px'
            }
        }, [
            React.createElement('div', {
                key: 'total-files',
                style: {
                    padding: '20px',
                    background: 'rgba(30, 41, 59, 0.8)',
                    borderRadius: '10px',
                    border: '1px solid #334155',
                    textAlign: 'center'
                }
            }, [
                React.createElement('div', {
                    key: 'value',
                    style: { 
                        color: '#3b82f6',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '5px'
                    }
                }, analysis.totalFiles),
                React.createElement('div', {
                    key: 'label',
                    style: { 
                        color: '#94a3b8',
                        fontSize: '12px'
                    }
                }, 'Arquivos Totais')
            ]),
            
            React.createElement('div', {
                key: 'code-files',
                style: {
                    padding: '20px',
                    background: 'rgba(30, 41, 59, 0.8)',
                    borderRadius: '10px',
                    border: '1px solid #334155',
                    textAlign: 'center'
                }
            }, [
                React.createElement('div', {
                    key: 'value',
                    style: { 
                        color: '#10b981',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '5px'
                    }
                }, analysis.codeFiles),
                React.createElement('div', {
                    key: 'label',
                    style: { 
                        color: '#94a3b8',
                        fontSize: '12px'
                    }
                }, 'Arquivos de Código')
            ]),
            
            React.createElement('div', {
                key: 'total-lines',
                style: {
                    padding: '20px',
                    background: 'rgba(30, 41, 59, 0.8)',
                    borderRadius: '10px',
                    border: '1px solid #334155',
                    textAlign: 'center'
                }
            }, [
                React.createElement('div', {
                    key: 'value',
                    style: { 
                        color: '#f59e0b',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '5px'
                    }
                }, analysis.totalLines.toLocaleString()),
                React.createElement('div', {
                    key: 'label',
                    style: { 
                        color: '#94a3b8',
                        fontSize: '12px'
                    }
                }, 'Linhas de Código')
            ]),
            
            React.createElement('div', {
                key: 'avg-complexity',
                style: {
                    padding: '20px',
                    background: 'rgba(30, 41, 59, 0.8)',
                    borderRadius: '10px',
                    border: '1px solid #334155',
                    textAlign: 'center'
                }
            }, [
                React.createElement('div', {
                    key: 'value',
                    style: { 
                        color: '#8b5cf6',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '5px'
                    }
                }, analysis.avgComplexity),
                React.createElement('div', {
                    key: 'label',
                    style: { 
                        color: '#94a3b8',
                        fontSize: '12px'
                    }
                }, 'Complexidade Média')
            ])
        ]),
        
        // Gráfico/Visualização
        selectedMetric === 'distribution' && React.createElement('div', {
            key: 'distribution-chart',
            style: {
                padding: '20px',
                background: 'rgba(30, 41, 59, 0.8)',
                borderRadius: '10px',
                border: '1px solid #334155',
                height: '300px'
            }
        }, [
            React.createElement('h4', {
                key: 'chart-title',
                style: {
                    color: '#cbd5e1',
                    margin: '0 0 15px 0',
                    fontSize: '16px'
                }
            }, 'Distribuição por Linguagem'),
            
            React.createElement('div', {
                key: 'chart-content',
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    height: 'calc(100% - 40px)'
                }
            }, Object.entries(analysis.byLanguage).map(([lang, data], index) => 
                React.createElement('div', {
                    key: lang,
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                    }
                }, [
                    React.createElement('div', {
                        key: 'lang-name',
                        style: {
                            minWidth: '120px',
                            color: '#cbd5e1',
                            fontSize: '14px'
                        }
                    }, lang),
                    React.createElement('div', {
                        key: 'bar',
                        style: {
                            flex: 1,
                            height: '20px',
                            background: 'rgba(30, 41, 59, 0.5)',
                            borderRadius: '4px',
                            overflow: 'hidden'
                        }
                    }, [
                        React.createElement('div', {
                            style: {
                                width: `${(data.count / analysis.codeFiles) * 100}%`,
                                height: '100%',
                                background: `hsl(${index * 60}, 70%, 50%)`,
                                transition: 'width 0.5s ease'
                            }
                        })
                    ]),
                    React.createElement('div', {
                        key: 'count',
                        style: {
                            color: '#94a3b8',
                            fontSize: '12px',
                            minWidth: '60px'
                        }
                    }, `${data.count} arquivos`)
                ])
            ))
        ])
    ]);
};

// ==================== COMPONENTE DE VISUALIZAÇÃO PREMIUM ====================
const PremiumVisualization = ({ repoInfo, files }) => {
    const [viewMode, setViewMode] = useState('graph'); // 'graph', 'analysis', 'tree', 'list', 'chart'
    const [exportOptions, setExportOptions] = useState(false);
    
    const metrics = useMemo(() => {
        if (!files?.length) return {};
        
        const codeFiles = files.filter(f => f.isCodeFile);
        const totalSize = files.reduce((sum, f) => sum + f.sizeKB, 0);
        const extensions = [...new Set(files.map(f => f.extension))];
        
        return {
            totalFiles: files.length,
            codeFiles: codeFiles.length,
            totalSizeKB: Math.round(totalSize),
            uniqueExtensions: extensions.length,
            avgFileSize: Math.round(totalSize / files.length)
        };
    }, [files]);
    
    const handleExport = (format) => {
        const data = {
            repoInfo,
            files,
            metrics,
            analysisDate: new Date().toISOString(),
            graphData: generateGraphData(files)
        };
        
        let content, mimeType, filename;
        
        switch(format) {
            case 'json':
                content = JSON.stringify(data, null, 2);
                mimeType = 'application/json';
                filename = `${repoInfo.owner}_${repoInfo.name}_full_analysis.json`;
                break;
            case 'txt':
                content = generateTextReport(data);
                mimeType = 'text/plain';
                filename = `${repoInfo.owner}_${repoInfo.name}_report.txt`;
                break;
            case 'graphviz':
                content = GraphExporter.toDOT(generateGraphData(files));
                mimeType = 'text/plain';
                filename = `${repoInfo.owner}_${repoInfo.name}_graph.dot`;
                break;
        }
        
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };
    
    const generateGraphData = (files) => {
        const nodes = files.map(file => ({
            id: file.path,
            label: file.name || file.path.split('/').pop(),
            group: file.extension,
            size: file.sizeKB
        }));
        
        const edges = [];
        files.forEach(file => {
            const pathParts = file.path.split('/');
            if (pathParts.length > 1) {
                const parentPath = pathParts.slice(0, -1).join('/');
                if (files.some(f => f.path === parentPath)) {
                    edges.push({
                        from: parentPath,
                        to: file.path
                    });
                }
            }
        });
        
        return { nodes, edges };
    };
    
    const generateTextReport = (data) => {
        let report = `CodeCartographer Premium Report\n`;
        report += `Repository: ${data.repoInfo.owner}/${data.repoInfo.name}\n`;
        report += `Generated: ${new Date().toLocaleString()}\n`;
        report += '='.repeat(60) + '\n\n';
        
        report += `Total Files: ${data.metrics.totalFiles}\n`;
        report += `Code Files: ${data.metrics.codeFiles}\n`;
        report += `Total Size: ${data.metrics.totalSizeKB} KB\n`;
        report += `Unique Extensions: ${data.metrics.uniqueExtensions}\n\n`;
        
        report += 'File Summary:\n';
        report += '-'.repeat(60) + '\n';
        data.files.slice(0, 50).forEach((file, index) => {
            report += `${index + 1}. ${file.path} (${file.sizeKB} KB, ${file.extension})\n`;
        });
        
        return report;
    };
    
    const copyToClipboard = async () => {
        const summary = `
Repositório: ${repoInfo.owner}/${repoInfo.name}
Arquivos: ${metrics.totalFiles} (${metrics.codeFiles} de código)
Tamanho total: ${metrics.totalSizeKB} KB
Extensões: ${metrics.uniqueExtensions} tipos
Análise gerada: ${new Date().toLocaleString()}
        `.trim();
        
        try {
            await navigator.clipboard.writeText(summary);
            showNotification('Resumo copiado para a área de transferência!', 'success');
        } catch (err) {
            showNotification('Erro ao copiar para área de transferência', 'error');
        }
    };
    
    return React.createElement('div', {
        style: { 
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '12px',
            padding: '25px',
            border: '1px solid #334155',
            minWidth: '1200px',
            width: 'fit-content',
            margin: '0 auto'
        }
    }, [
        // Cabeçalho Premium
        React.createElement('div', {
            key: 'premium-header',
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
                key: 'title-section',
                style: { flex: 1, minWidth: '300px' }
            }, [
                React.createElement('div', {
                    key: 'badge',
                    style: {
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        marginBottom: '10px'
                    }
                }, [
                    React.createElement('i', { key: 'icon', className: 'fas fa-crown', style: { color: '#fbbf24' } }),
                    React.createElement('span', {
                        key: 'text',
                        style: { 
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '600'
                        }
                    }, 'PREMIUM')
                ]),
                
                React.createElement('h3', {
                    key: 'repo-name',
                    style: { 
                        color: '#f8fafc',
                        margin: '0 0 5px 0',
                        fontSize: '20px',
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
            
            // Botões de Ação Premium
            React.createElement('div', {
                key: 'action-buttons',
                style: { 
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }
            }, [
                React.createElement('button', {
                    key: 'copy-summary',
                    onClick: copyToClipboard,
                    style: {
                        padding: '10px 16px',
                        background: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        borderRadius: '8px',
                        color: '#3b82f6',
                        cursor: 'pointer',
                        fontSize: '14px',
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
                    React.createElement('i', { key: 'icon', className: 'fas fa-copy' }),
                    'Copiar Resumo'
                ]),
                
                React.createElement('div', {
                    key: 'export-dropdown',
                    style: { position: 'relative' }
                }, [
                    React.createElement('button', {
                        key: 'export-btn',
                        onClick: () => setExportOptions(!exportOptions),
                        style: {
                            padding: '10px 16px',
                            background: 'rgba(16, 185, 129, 0.1)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            borderRadius: '8px',
                            color: '#10b981',
                            cursor: 'pointer',
                            fontSize: '14px',
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
                        React.createElement('i', { key: 'icon', className: 'fas fa-download' }),
                        'Exportar',
                        React.createElement('i', {
                            key: 'chevron',
                            className: exportOptions ? 'fas fa-chevron-up' : 'fas fa-chevron-down',
                            style: { marginLeft: '8px' }
                        })
                    ]),
                    
                    exportOptions && React.createElement('div', {
                        key: 'export-menu',
                        style: {
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            marginTop: '5px',
                            background: '#1e293b',
                            border: '1px solid #475569',
                            borderRadius: '8px',
                            padding: '8px',
                            minWidth: '200px',
                            zIndex: 1000,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                        }
                    }, [
                        React.createElement('div', {
                            key: 'menu-header',
                            style: {
                                padding: '8px',
                                color: '#cbd5e1',
                                fontSize: '12px',
                                fontWeight: '600',
                                borderBottom: '1px solid #475569',
                                marginBottom: '8px'
                            }
                        }, 'Formatos de Exportação'),
                        
                        React.createElement('button', {
                            key: 'export-json',
                            onClick: () => handleExport('json'),
                            style: {
                                width: '100%',
                                padding: '10px',
                                background: 'transparent',
                                border: 'none',
                                color: '#cbd5e1',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: '13px',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'background 0.2s'
                            },
                            onMouseEnter: (e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)',
                            onMouseLeave: (e) => e.currentTarget.style.background = 'transparent'
                        }, [
                            React.createElement('i', { key: 'icon', className: 'fas fa-file-code', style: { color: '#3b82f6' } }),
                            'JSON Completo'
                        ]),
                        
                        React.createElement('button', {
                            key: 'export-txt',
                            onClick: () => handleExport('txt'),
                            style: {
                                width: '100%',
                                padding: '10px',
                                background: 'transparent',
                                border: 'none',
                                color: '#cbd5e1',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: '13px',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'background 0.2s'
                            },
                            onMouseEnter: (e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)',
                            onMouseLeave: (e) => e.currentTarget.style.background = 'transparent'
                        }, [
                            React.createElement('i', { key: 'icon', className: 'fas fa-file-alt', style: { color: '#10b981' } }),
                            'Relatório TXT'
                        ]),
                        
                        React.createElement('button', {
                            key: 'export-graphviz',
                            onClick: () => handleExport('graphviz'),
                            style: {
                                width: '100%',
                                padding: '10px',
                                background: 'transparent',
                                border: 'none',
                                color: '#cbd5e1',
                                textAlign: 'left',
                                cursor: 'pointer',
                                fontSize: '13px',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'background 0.2s'
                            },
                            onMouseEnter: (e) => e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)',
                            onMouseLeave: (e) => e.currentTarget.style.background = 'transparent'
                        }, [
                            React.createElement('i', { key: 'icon', className: 'fas fa-project-diagram', style: { color: '#8b5cf6' } }),
                            'Grafo (Graphviz)'
                        ])
                    ])
                ])
            ])
        ]),
        
        // Métricas Premium
        React.createElement('div', {
            key: 'premium-metrics',
            style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '15px',
                marginBottom: '25px'
            }
        }, [
            React.createElement('div', {
                key: 'stars',
                style: {
                    padding: '20px',
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
                    borderRadius: '12px',
                    border: '1px solid #334155',
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)'
                }
            }, [
                React.createElement('div', {
                    key: 'icon',
                    style: { 
                        fontSize: '28px',
                        color: '#f59e0b',
                        marginBottom: '10px'
                    }
                }, '⭐'),
                React.createElement('div', {
                    key: 'value',
                    style: { 
                        color: '#f8fafc',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '5px'
                    }
                }, repoInfo.stars?.toLocaleString() || '0'),
                React.createElement('div', {
                    key: 'label',
                    style: { 
                        color: '#94a3b8',
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }
                }, 'Stars')
            ]),
            
            React.createElement('div', {
                key: 'files',
                style: {
                    padding: '20px',
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
                    borderRadius: '12px',
                    border: '1px solid #334155',
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)'
                }
            }, [
                React.createElement('div', {
                    key: 'icon',
                    style: { 
                        fontSize: '28px',
                        color: '#3b82f6',
                        marginBottom: '10px'
                    }
                }, '📁'),
                React.createElement('div', {
                    key: 'value',
                    style: { 
                        color: '#f8fafc',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '5px'
                    }
                }, metrics.totalFiles?.toLocaleString() || '0'),
                React.createElement('div', {
                    key: 'label',
                    style: { 
                        color: '#94a3b8',
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }
                }, 'Arquivos')
            ]),
            
            React.createElement('div', {
                key: 'size',
                style: {
                    padding: '20px',
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
                    borderRadius: '12px',
                    border: '1px solid #334155',
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)'
                }
            }, [
                React.createElement('div', {
                    key: 'icon',
                    style: { 
                        fontSize: '28px',
                        color: '#10b981',
                        marginBottom: '10px'
                    }
                }, '💾'),
                React.createElement('div', {
                    key: 'value',
                    style: { 
                        color: '#f8fafc',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '5px'
                    }
                }, `${metrics.totalSizeKB} KB`),
                React.createElement('div', {
                    key: 'label',
                    style: { 
                        color: '#94a3b8',
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }
                }, 'Tamanho')
            ]),
            
            React.createElement('div', {
                key: 'complexity',
                style: {
                    padding: '20px',
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
                    borderRadius: '12px',
                    border: '1px solid #334155',
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)'
                }
            }, [
                React.createElement('div', {
                    key: 'icon',
                    style: { 
                        fontSize: '28px',
                        color: '#8b5cf6',
                        marginBottom: '10px'
                    }
                }, '📊'),
                React.createElement('div', {
                    key: 'value',
                    style: { 
                        color: '#f8fafc',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '5px'
                    }
                }, metrics.avgFileSize || '0'),
                React.createElement('div', {
                    key: 'label',
                    style: { 
                        color: '#94a3b8',
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }
                }, 'KB/Arquivo')
            ]),
            
            React.createElement('div', {
                key: 'extensions',
                style: {
                    padding: '20px',
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
                    borderRadius: '12px',
                    border: '1px solid #334155',
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)'
                }
            }, [
                React.createElement('div', {
                    key: 'icon',
                    style: { 
                        fontSize: '28px',
                        color: '#ec4899',
                        marginBottom: '10px'
                    }
                }, '🔤'),
                React.createElement('div', {
                    key: 'value',
                    style: { 
                        color: '#f8fafc',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '5px'
                    }
                }, metrics.uniqueExtensions || '0'),
                React.createElement('div', {
                    key: 'label',
                    style: { 
                        color: '#94a3b8',
                        fontSize: '13px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }
                }, 'Extensões')
            ])
        ]),
        
        // Navegação de Modos
        React.createElement('div', {
            key: 'mode-navigation',
            style: {
                display: 'flex',
                gap: '10px',
                marginBottom: '30px',
                padding: '15px',
                background: 'rgba(30, 41, 59, 0.5)',
                borderRadius: '12px',
                border: '1px solid #475569',
                overflowX: 'auto'
            }
        }, [
            React.createElement('button', {
                key: 'graph-view',
                onClick: () => setViewMode('graph'),
                style: {
                    padding: '12px 24px',
                    background: viewMode === 'graph' ? '#3b82f6' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    color: viewMode === 'graph' ? 'white' : '#cbd5e1',
                    cursor: 'pointer',
                    fontWeight: viewMode === 'graph' ? '600' : '400',
                    transition: 'all 0.2s',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                }
            }, [
                React.createElement('i', {
                    key: 'icon',
                    className: 'fas fa-project-diagram'
                }),
                'Grafo Interativo'
            ]),
            
            React.createElement('button', {
                key: 'analysis-view',
                onClick: () => setViewMode('analysis'),
                style: {
                    padding: '12px 24px',
                    background: viewMode === 'analysis' ? '#3b82f6' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    color: viewMode === 'analysis' ? 'white' : '#cbd5e1',
                    cursor: 'pointer',
                    fontWeight: viewMode === 'analysis' ? '600' : '400',
                    transition: 'all 0.2s',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                }
            }, [
                React.createElement('i', {
                    key: 'icon',
                    className: 'fas fa-chart-line'
                }),
                'Análise Avançada'
            ])
        ]),
        
        // Conteúdo Principal
        viewMode === 'graph' 
            ? React.createElement(InteractiveGraph, {
                key: 'interactive-graph',
                files: files,
                repoInfo: repoInfo,
                onNodeClick: (node) => {
                    window.open(`${repoInfo.url}/blob/${repoInfo.default_branch}/${node.path}`, '_blank');
                }
            })
            : viewMode === 'analysis'
            ? React.createElement(CodeAnalysis, {
                key: 'code-analysis',
                files: files
            })
            : null
    ]);
};

// ==================== COMPONENTE PRINCIPAL ATUALIZADO ====================
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
    
    // Função para buscar dados do repositório (simplificada do código anterior)
    const fetchRepositoryData = async (owner, repo) => {
        try {
            const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
            if (!repoRes.ok) throw new Error('Repositório não encontrado');
            
            const repoData = await repoRes.json();
            const branch = repoData.default_branch || 'main';
            
            // Para simplificar, vamos usar dados mockados
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
                files: generateMockFiles(),
                stats: {
                    totalFiles: 150,
                    codeFiles: 120,
                    totalSizeKB: 4500
                }
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    };
    
    const generateMockFiles = () => {
        const extensions = ['js', 'ts', 'jsx', 'tsx', 'json', 'md', 'html', 'css', 'py', 'java'];
        const languages = ['JavaScript', 'TypeScript', 'React', 'JSON', 'Markdown', 'HTML', 'CSS', 'Python', 'Java'];
        
        const files = [];
        for (let i = 1; i <= 50; i++) {
            const ext = extensions[Math.floor(Math.random() * extensions.length)];
            const lang = languages[Math.floor(Math.random() * languages.length)];
            const depth = Math.floor(Math.random() * 3) + 1;
            let path = '';
            
            for (let d = 0; d < depth; d++) {
                path += `folder${d + 1}/`;
            }
            path += `file${i}.${ext}`;
            
            files.push({
                path,
                name: `file${i}.${ext}`,
                extension: ext,
                sizeKB: Math.random() * 100 + 10,
                language: lang,
                isCodeFile: ['js', 'ts', 'jsx', 'tsx', 'py', 'java'].includes(ext)
            });
        }
        
        return files;
    };
    
    const analyzeRepository = async () => {
        if (!url) {
            setError('Por favor, insira uma URL do GitHub');
            return;
        }
        
        const match = url.match(/github\.com\/([^/]+)\/([^/#?]+)/);
        if (!match) {
            setError('URL do GitHub inválida');
            return;
        }
        
        const [_, owner, repo] = match;
        const cacheKey = `repo_${owner}_${repo}`;
        
        // Verificar cache
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
            setRepoData(cachedData);
            setStatus(`✅ ${cachedData.files.length} arquivos carregados`);
            return;
        }
        
        setLoading(true);
        setStatus('🔍 Analisando repositório...');
        
        try {
            const result = await fetchRepositoryData(owner, repo);
            
            if (result.success) {
                setRepoData(result);
                cache.set(cacheKey, result);
                setCacheStats(cache.getStats());
                setStatus(`✅ ${result.files.length} arquivos analisados`);
            } else {
                setError(result.error);
                setStatus('❌ Erro na análise');
            }
        } catch (err) {
            setError(err.message);
            setStatus('❌ Erro na conexão');
        } finally {
            setLoading(false);
        }
    };
    
    const clearAnalysis = () => {
        setRepoData(null);
        setUrl('');
        setStatus('Pronto para analisar');
        setError(null);
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            analyzeRepository();
        }
    };
    
    return React.createElement('div', { 
        style: { 
            padding: '20px',
            margin: '0 auto',
            marginTop: '80px',
            minHeight: 'calc(100vh - 160px)',
            width: '100%',
            fontFamily: "'Inter', sans-serif",
            position: 'relative'
        }
    }, [
        // Painel lateral (controles)
        React.createElement('div', {
            key: 'control-panel',
            style: {
                position: 'fixed',
                left: '20px',
                top: '90px',
                width: '380px',
                bottom: '20px',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                borderRadius: '12px',
                padding: '25px',
                border: '1px solid #334155',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                zIndex: 100,
                overflowY: 'auto'
            }
        }, [
            // Cabeçalho
            React.createElement('div', { key: 'header' }, [
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
                    React.createElement('div', { key: 'title' }, [
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
                        }, 'v5.0 Premium')
                    ])
                ]),
                React.createElement('p', {
                    key: 'subtitle',
                    style: { 
                        fontSize: '14px', 
                        color: '#cbd5e1', 
                        margin: '0 0 25px 0',
                        lineHeight: '1.5'
                    }
                }, 'Análise avançada de repositórios GitHub com visualização de grafo e métricas de complexidade')
            ]),
            
            // Input de URL
            React.createElement('div', { key: 'input-container' }, [
                React.createElement('input', {
                    key: 'input',
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
                        marginBottom: '15px'
                    }
                })
            ]),
            
            // Botões de ação
            React.createElement('div', {
                key: 'action-buttons',
                style: { display: 'flex', gap: '10px', marginBottom: '20px' }
            }, [
                React.createElement('button', {
                    key: 'analyze-btn',
                    onClick: analyzeRepository,
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
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }
                }, loading ? 'ANALISANDO...' : 'ANALISAR'),
                
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
                        cursor: 'pointer'
                    }
                }, 'LIMPAR')
            ]),
            
            // Status
            React.createElement('div', {
                key: 'status',
                style: {
                    padding: '15px',
                    background: error ? 'rgba(239, 68, 68, 0.1)' : 'rgba(30, 41, 59, 0.8)',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    border: `1px solid ${error ? '#ef4444' : '#475569'}`
                }
            }, [
                React.createElement('div', {
                    key: 'status-text',
                    style: { 
                        color: error ? '#fca5a5' : '#94a3b8',
                        fontSize: '13px'
                    }
                }, status),
                error && React.createElement('div', {
                    key: 'error',
                    style: { 
                        marginTop: '10px',
                        color: '#fca5a5',
                        fontSize: '12px'
                    }
                }, error)
            ]),
            
            // Exemplos
            React.createElement('div', { key: 'examples' }, [
                React.createElement('p', {
                    key: 'examples-title',
                    style: { 
                        color: '#cbd5e1', 
                        margin: '0 0 10px 0',
                        fontSize: '14px'
                    }
                }, 'Experimente:'),
                React.createElement('div', {
                    key: 'example-buttons',
                    style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }
                }, examples.map((example, index) => 
                    React.createElement('button', {
                        key: index,
                        onClick: () => {
                            setUrl(example.url);
                            setTimeout(analyzeRepository, 100);
                        },
                        style: {
                            padding: '10px',
                            background: 'rgba(59, 130, 246, 0.1)',
                            border: '1px solid rgba(59, 130, 246, 0.3)',
                            borderRadius: '6px',
                            color: '#3b82f6',
                            cursor: 'pointer',
                            fontSize: '13px',
                            textAlign: 'left'
                        }
                    }, example.name)
                ))
            ])
        ]),
        
        // Conteúdo principal
        React.createElement('div', {
            key: 'main-content',
            style: {
                marginLeft: '420px',
                padding: '20px',
                minHeight: 'calc(100vh - 160px)',
                overflowX: 'auto'
            }
        }, 
            repoData 
                ? React.createElement(PremiumVisualization, {
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
                        padding: '40px'
                    }
                }, [
                    React.createElement('div', {
                        key: 'icon',
                        style: { 
                            fontSize: '80px',
                            color: '#334155',
                            marginBottom: '30px'
                        }
                    }, '🚀'),
                    React.createElement('h3', {
                        key: 'title',
                        style: { 
                            color: '#cbd5e1', 
                            marginBottom: '15px',
                            fontSize: '24px'
                        }
                    }, 'CodeCartographer Premium'),
                    React.createElement('p', {
                        key: 'subtitle',
                        style: { 
                            color: '#94a3b8', 
                            fontSize: '16px',
                            maxWidth: '600px',
                            marginBottom: '30px'
                        }
                    }, 'Análise avançada de repositórios com visualização de grafo interativo, métricas de complexidade e exportação profissional.'),
                    React.createElement('div', {
                        key: 'features',
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '20px',
                            maxWidth: '700px'
                        }
                    }, [
                        React.createElement('div', {
                            key: 'feature-1',
                            style: { padding: '20px', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '10px' }
                        }, [
                            React.createElement('div', { key: 'icon', style: { fontSize: '24px', color: '#3b82f6', marginBottom: '15px' } }, '📊'),
                            React.createElement('h4', { key: 'title', style: { color: '#f8fafc', margin: '0 0 10px 0' } }, 'Análise de Complexidade'),
                            React.createElement('p', { key: 'desc', style: { color: '#94a3b8', fontSize: '14px', margin: 0 } }, 'Métricas avançadas de código')
                        ]),
                        React.createElement('div', {
                            key: 'feature-2',
                            style: { padding: '20px', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '10px' }
                        }, [
                            React.createElement('div', { key: 'icon', style: { fontSize: '24px', color: '#10b981', marginBottom: '15px' } }, '🔗'),
                            React.createElement('h4', { key: 'title', style: { color: '#f8fafc', margin: '0 0 10px 0' } }, 'Grafo Interativo'),
                            React.createElement('p', { key: 'desc', style: { color: '#94a3b8', fontSize: '14px', margin: 0 } }, 'Visualização 2D interativa da estrutura')
                        ]),
                        React.createElement('div', {
                            key: 'feature-3',
                            style: { padding: '20px', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '10px' }
                        }, [
                            React.createElement('div', { key: 'icon', style: { fontSize: '24px', color: '#f59e0b', marginBottom: '15px' } }, '💾'),
                            React.createElement('h4', { key: 'title', style: { color: '#f8fafc', margin: '0 0 10px 0' } }, 'Exportação Avançada'),
                            React.createElement('p', { key: 'desc', style: { color: '#94a3b8', fontSize: '14px', margin: 0 } }, 'JSON, TXT, DOT, SVG e mais')
                        ]),
                        React.createElement('div', {
                            key: 'feature-4',
                            style: { padding: '20px', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '10px' }
                        }, [
                            React.createElement('div', { key: 'icon', style: { fontSize: '24px', color: '#8b5cf6', marginBottom: '15px' } }, '📋'),
                            React.createElement('h4', { key: 'title', style: { color: '#f8fafc', margin: '0 0 10px 0' } }, 'Copiar & Compartilhar'),
                            React.createElement('p', { key: 'desc', style: { color: '#94a3b8', fontSize: '14px', margin: 0 } }, 'Resumos e análises para clipboard')
                        ])
                    ])
                ])
        )
    ]);
};

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('app');
    if (!container) return;
    
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) loadingScreen.style.display = 'none';
    
    if (window.React && window.ReactDOM) {
        try {
            const root = createRoot(container);
            root.render(React.createElement(App));
        } catch (error) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #dc2626;">
                    <h3><i class="fas fa-exclamation-triangle"></i> Erro ao Inicializar</h3>
                    <button onclick="window.location.reload()" 
                            style="padding: 10px 20px; margin: 5px; background: #3b82f6; 
                                   color: white; border: none; border-radius: 6px; cursor: pointer;">
                        Recarregar
                    </button>
                </div>
            `;
        }
    }
});

// ==================== ESTILOS GLOBAIS ====================
const globalStyles = `
    body {
        margin: 0;
        padding: 0;
        background: #0f172a;
        color: #f8fafc;
        font-family: 'Inter', sans-serif;
        overflow-x: hidden;
    }
    
    #app {
        min-height: 100vh;
        position: relative;
    }
    
    ::-webkit-scrollbar { width: 12px; height: 12px; }
    ::-webkit-scrollbar-track { background: #1e293b; border-radius: 6px; }
    ::-webkit-scrollbar-thumb { 
        background: #475569; 
        border-radius: 6px;
        border: 3px solid #1e293b;
    }
    ::-webkit-scrollbar-thumb:hover { background: #64748b; }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    * {
        transition: background-color 0.2s, border-color 0.2s, transform 0.2s, opacity 0.2s;
    }
`;

const styleElement = document.createElement('style');
styleElement.textContent = globalStyles;
document.head.appendChild(styleElement);

console.log('CodeCartographer v5.0 Premium inicializado!');
