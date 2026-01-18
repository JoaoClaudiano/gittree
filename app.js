const { useState, useEffect } = React;

function App() {
    const [ready, setReady] = useState(false);
    const [url, setUrl] = useState('');
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [status, setStatus] = useState('Pronto para escanear');

    useEffect(() => {
        const check = setInterval(() => {
            if (window.ReactFlow) {
                setReady(true);
                clearInterval(check);
            }
        }, 500);
        return () => clearInterval(check);
    }, []);

    if (!ready) return <div className="loading-screen">CARREGANDO MOTOR GRÁFICO...</div>;

    const RF = window.ReactFlow.default || window.ReactFlow;
    const { Background, Controls, MarkerType } = window.ReactFlow;

    const analyze = async () => {
        setStatus('🔍 Conectando à API do GitHub...');
        const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) return alert("Por favor, cole uma URL válida do GitHub");
        
        const [_, owner, repo] = match;
        
        try {
            const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`).then(r => r.json());
            if(!treeRes.tree) throw new Error("Não foi possível ler a árvore.");

            const sourceFiles = treeRes.tree.filter(f => 
                (f.path.endsWith('.js') || f.path.endsWith('.ts') || f.path.endsWith('.jsx')) && 
                !f.path.includes('node_modules')
            ).slice(0, 30);

            const newNodes = [];
            const newEdges = [];

            // Layout em Grade Simples
            sourceFiles.forEach((file, index) => {
                const x = (index % 5) * 200;
                const y = Math.floor(index / 5) * 150;
                const fileName = file.path.split('/').pop();

                newNodes.push({
                    id: file.path,
                    data: { label: fileName },
                    position: { x, y },
                    style: { 
                        background: '#3b82f6', 
                        color: '#fff', 
                        padding: '10px', 
                        borderRadius: '8px', 
                        fontSize: '11px', 
                        width: 140,
                        textAlign: 'center',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                    }
                });
            });

            // Simulando conexões (Edges) para este MVP
            // No futuro, aqui entra o fetch de conteúdo que fizemos antes
            sourceFiles.forEach((file, index) => {
                if (index > 0 && index < 10) {
                    newEdges.push({
                        id: `e-${index}`,
                        source: sourceFiles[0].path, // Conecta quase tudo ao primeiro arquivo (ex: App.js)
                        target: file.path,
                        animated: true,
                        markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' },
                        style: { stroke: '#3b82f6' }
                    });
                }
            });

            setNodes(newNodes);
            setEdges(newEdges);
            setStatus(`✅ ${newNodes.length} arquivos mapeados.`);

        } catch (err) {
            setStatus('❌ Erro: Verifique se o repo é público.');
        }
    };

    return (
        <div style={{ width: '100vw', height: 'calc(100vh - 95px)' }}>
            <div id="ui-layer">
                <div className="input-group">
                    <label style={{fontSize: '10px', letterSpacing: '1px', color: '#60a5fa'}}>REPOSITÓRIO</label>
                    <input 
                        placeholder="https://github.com/joaoclaudiano/legacymap" 
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button onClick={analyze}>GERAR MAPA VISUAL</button>
                </div>
                <div className="status-box">
                    <strong>Status:</strong> <span style={{color: '#fff'}}>{status}</span>
                </div>
            </div>

            <RF nodes={nodes} edges={edges} fitView>
                <Background color="#334155" gap={20} />
                <Controls />
            </RF>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
