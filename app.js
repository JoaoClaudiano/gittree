const { useState, useCallback, useEffect, useRef } = React;
const { createRoot } = ReactDOM;

// Verificar se ReactFlow está disponível
console.log('ReactFlow global:', window.ReactFlow);

// Se ReactFlow não estiver disponível globalmente, vamos carregar manualmente
if (!window.ReactFlow) {
    console.error('ReactFlow não está carregado!');
}

function App() {
    const [url, setUrl] = useState('');
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [status, setStatus] = useState('Pronto para analisar');
    const [repoBase, setRepoBase] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const reactFlowWrapper = useRef(null);

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

    const onNodeClick = useCallback((event, node) => {
        if (repoBase) {
            window.open(`${repoBase}/blob/main/${node.id}`, '_blank');
        }
    }, [repoBase]);

    const analyzeGithub = async () => {
        if (!url) {
            setError('Por favor, insira uma URL do GitHub');
            return;
        }

        const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) {
            setError('URL do GitHub inválida. Formato esperado: https://github.com/usuario/repositorio');
            return;
        }

        setLoading(true);
        setStatus('🔍 Conectando ao GitHub...');
        setError(null);

        try {
            const [_, owner, repo] = match;
            const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`;
            
            console.log('Buscando dados da API:', apiUrl);
            
            const res = await fetch(apiUrl, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!res.ok) {
                if (res.status === 404) {
                    // Tentar com a branch master se main não existir
                    const res2 = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/master?recursive=1`, {
                        headers: {
                            'Accept': 'application/vnd.github.v3+json'
                        }
                    });
                    
                    if (!res2.ok) {
                        throw new Error('Repositório não encontrado. Verifique se o nome está correto.');
                    }
                    
                    const data = await res2.json();
                    processRepositoryData(data, owner, repo);
                    return;
                } else if (res.status === 403) {
                    throw new Error('Limite de requisições excedido. Tente novamente mais tarde.');
                }
                throw new Error(`Erro ${res.status}: ${res.statusText}`);
            }

            const data = await res.json();
            processRepositoryData(data, owner, repo);
            
        } catch (err) {
            console.error('Erro:', err);
            setError(err.message);
            setStatus('❌ Erro na conexão');
            setNodes([]);
            setEdges([]);
            setLoading(false);
        }
    };

    const processRepositoryData = (data, owner, repo) => {
        if (!data.tree) {
            throw new Error('Estrutura do repositório não encontrada');
        }

        const files = data.tree
            .filter(f => f.type === 'blob' && f.path.match(/\.(js|ts|jsx|tsx|css|scss|json|md|html|py|java|cpp|cs)$/))
            .filter(f => !f.path.includes('node_modules') && !f.path.includes('dist') && !f.path.includes('build'))
            .slice(0, 50);

        if (files.length === 0) {
            setError('Nenhum arquivo de código encontrado no repositório');
            setNodes([]);
            setStatus('⚠️ Nenhum arquivo encontrado');
            setLoading(false);
            return;
        }

        setRepoBase(`https://github.com/${owner}/${repo}`);

        // Criar layout em grid
        const columns = Math.min(Math.ceil(Math.sqrt(files.length)), 6);
        const newNodes = files.map((f, i) => {
            const column = i % columns;
            const row = Math.floor(i / columns);
            
            return {
                id: f.path,
                data: { 
                    label: f.path.split('/').pop(),
                },
                position: { 
                    x: column * 180 + 50, 
                    y: row * 120 + 50 
                },
                style: { 
                    background: getFileColor(f.path), 
                    color: '#fff', 
                    borderRadius: '6px', 
                    padding: '10px', 
                    width: 140, 
                    fontSize: '11px', 
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                }
            };
        });

        setNodes(newNodes);
        setEdges([]);
        setStatus(`✅ ${files.length} arquivos mapeados com sucesso!`);
        setLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            analyzeGithub();
        }
    };

    // Verificar se ReactFlow está disponível
    const ReactFlowComponent = window.ReactFlow?.ReactFlow;
    const Background = window.ReactFlow?.Background;
    const Controls = window.ReactFlow?.Controls;

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div className="ui-layer">
                <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#f8fafc' }}>GitHub Repository Mapper</h3>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0' }}>
                        Insira a URL de um repositório GitHub para visualizar sua estrutura
                    </p>
                </div>
                
                <div className="input-group">
                    <input 
                        placeholder="https://github.com/usuario/projeto" 
                        value={url} 
                        onChange={e => setUrl(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                    />
                    <button 
                        onClick={analyzeGithub}
                        disabled={loading}
                    >
                        {loading ? 'PROCESSANDO...' : 'GERAR MAPA'}
                    </button>
                </div>
                
                <div className={`status-box ${error ? 'error' : ''}`}>
                    <strong>Status:</strong> {status}
                    {error && (
                        <div style={{ marginTop: '8px', fontSize: '13px' }}>
                            {error}
                        </div>
                    )}
                </div>
                
                {nodes.length > 0 && (
                    <div className="tip-box">
                        <strong>Dica:</strong> Clique em qualquer arquivo para abrir no GitHub
                        <div style={{ marginTop: '5px' }}>
                            {nodes.length} arquivos mapeados
                        </div>
                    </div>
                )}
            </div>

            {ReactFlowComponent ? (
                <ReactFlowComponent 
                    nodes={nodes} 
                    edges={edges} 
                    onNodeClick={onNodeClick}
                    fitView
                    fitViewOptions={{ padding: 0.2 }}
                    nodesDraggable={true}
                    nodesConnectable={false}
                    zoomOnScroll={true}
                    panOnScroll={true}
                    style={{ background: '#0f172a' }}
                >
                    {Background && <Background color="#1e293b" gap={30} size={1} />}
                    {Controls && <Controls />}
                </ReactFlowComponent>
            ) : (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    color: '#94a3b8'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '20px', marginBottom: '10px' }}>⚠️</div>
                        <div>ReactFlow não carregou corretamente.</div>
                        <div style={{ fontSize: '12px', marginTop: '5px' }}>
                            Recarregue a página ou verifique sua conexão.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Renderização
const container = document.getElementById('app');
if (container) {
    try {
        const root = createRoot(container);
        root.render(<App />);
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
