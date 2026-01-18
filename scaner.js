const { crunch } = require('dependency-cruiser');
const fs = require('fs');

// Configuração: mude 'src' para a pasta que deseja analisar no seu projeto
const ARRAY_DE_DIRETORIOS = ['src']; 

try {
  console.log('🔍 Analisando dependências...');
  const analysis = crunch(ARRAY_DE_DIRETORIOS, {
    exclude: 'node_modules',
    outputType: 'json'
  });

  const output = analysis.output;

  const nodes = output.modules.map((mod, index) => ({
    id: mod.source,
    data: { label: mod.source.split('/').pop() },
    position: { x: Math.random() * 800, y: Math.random() * 600 },
    style: { background: mod.source.includes('index') ? '#ff4081' : '#3f51b5', color: '#fff' }
  }));

  const edges = [];
  output.modules.forEach(mod => {
    mod.dependencies.forEach(dep => {
      edges.push({
        id: `e-${mod.source}-${dep.resolved}`,
        source: mod.source,
        target: dep.resolved,
        animated: true,
        style: { stroke: '#888' }
      });
    });
  });

  const finalData = { nodes, edges };
  fs.writeFileSync('data.json', JSON.stringify(finalData, null, 2));
  console.log('✅ Sucesso! O arquivo data.json foi criado.');
} catch (err) {
  console.error('❌ Erro:', err);
}
