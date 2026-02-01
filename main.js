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
            const root = ReactDOM.createRoot(container);
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
