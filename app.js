const { useState, useEffect, useCallback } = React;

function App() {
    const [ready, setReady] = useState(false);
    const [url, setUrl] = useState('');
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [status, setStatus] = useState('Aguardando link...');

    useEffect(() => {
        const check = setInterval(() => {
            if (window.ReactFlow) {
                setReady(true);
                clearInterval(check);
            }
        }, 300);
        return () => clearInterval(check);
    }, []);

    if (!ready) return <div className="loading-screen">INICIALIZANDO ENGINE...</div>;

    const RF = window.ReactFlow.default || window.ReactFlow;
    const { Background, Controls, MarkerType } = window.ReactFlow;

    const analyze = async () => {
        setStatus('🔍 Acessando GitHub...');
        const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) return alert("URL inválida");
        
        const [_, owner, repo] = match;
        
        try {
            // 1. Pega a estrutura de arquivos (recursiva)
            const treeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`).then(r => r.json());
            const allFiles = treeRes.tree.filter(f => (f.path.endsWith('.js') || f.path.endsWith('.ts')) && !f.path.includes('node_modules'));
            
            // Limitamos a 25 arquivos para não travar o browser no processamento inicial
            const limitedFiles = allFiles.slice(0, 25);
            const discoveredNodes = [];
            const discoveredEdges = [];

            setStatus(`📂 Analisando ${limitedFiles.length} arquivos...`);

            for (const file of limitedFiles) {
                const contentRes = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/main/${file.path}`);
                const content = await contentRes.text();
                
                const fileName = file.path.split('/').pop();
                discoveredNodes.push({
                    id: file.path,
                    data: { label: fileName },
                    position: { x: Math.random() * 600, y: Math.random() * 400 },
                    style: { background: '#3b82f6', color: '#fff', padding: '10px', borderRadius: '8px', fontSize: '10px', width: 120, border: 'none' }
                });

                // Regex para detectar imports: import ... from './outro-arquivo'
                const importRegex = /from\s+['"](?:\.\/|\.\.\/)([^'"]+)['"]/g;
                let m;
                while ((m = importRegex.exec(content)) !== null) {
                    const targetName = m[1].split('/').pop(); // Simplificação para o MVP
                    discoveredEdges.push({
                        id: `e-${file.path}-${targetName}`,
                        source: file.path,
                        target: targetName, // Temporário, ajustaremos abaixo
                        animated: true,
                        markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' },
                        style: { stroke: '#64748b' }
                    });
                }
            }

            // Refina as conexões: garante que o target existe nos nós encontrados
            const finalEdges = discoveredEdges.map(edge => {
                const targetNode = discoveredNodes.find(n => n.id.includes(edge.target));
                return targetNode ? { ...edge, target: targetNode.id } : null;
            }).filter(e => e !== null);

            setNodes(discoveredNodes);
            setEdges(finalEdges);
            setStatus('✅ Mapa gerado com sucesso!');

        } catch (err) {
            console.error(err);
            setStatus('❌ Erro ao processar repositório.');
        }
    };

    return (
        <div style={{ width: '100vw', height: 'calc(100vh - 95px)' }}>
            <div id="ui-layer">
                <div className="input-group">
                    <label style={{fontSize: '11px', fontWeight: 'bold', color: '#3b82f6'}}>REPOSITÓRIO GITHUB</label>
                    <input 
                        type="text" 
                        placeholder="https://github.com/usuario/projeto" 
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button onClick={analyze}>GERAR MAPA</button>
                </div>
                <div className="status-box">
                    <strong>Status:</strong> {status}<br/>
                    <strong>Nós:</strong> {nodes.length} | <strong>Conexões:</strong> {edges.length}
                </div>
            </div>

            <RF nodes={nodes} edges={edges} fitView>
                <Background color="#1e293b" gap={20} />
                <Controls />
            </RF>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
