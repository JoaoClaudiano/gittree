// GitTree i18n - Internationalization System
// Supports: English, Portuguese, Spanish, French, Italian, Japanese, Korean, Chinese

const translations = {
    en: {
        // SEO Meta Tags
        pageTitle: "GitTree - GitHub Repository Structure Visualizer | Explore Repositories",
        metaDescription: "GitTree - Visualize and analyze the structure of any GitHub repository. Explore directory trees, code metrics, and real-time statistics. Free tool for developers.",
        metaKeywords: "github, repository, tree, visualizer, code structure, github explorer, developer tools, open source, code analysis, repository metrics",
        
        // Header & Navigation
        logoText: "GitTree",
        navVisualizer: "Visualizer",
        navAbout: "About",
        navGuide: "Guide",
        navContact: "Contact",
        themeToggleLight: "Switch to dark theme",
        themeToggleDark: "Switch to light theme",
        
        // Main Interface
        sectionTitle: "GitHub Visualizer",
        inputPlaceholder: "username/repository or full GitHub URL",
        btnPaste: "Paste",
        btnVisualize: "Visualize",
        statusDefault: "Enter a GitHub repository",
        
        // Controls
        controlsVisualization: "Visualization",
        btnTree: "Tree",
        btnMetrics: "Metrics",
        btnCache: "Cache",
        controlsActions: "Actions",
        btnRefresh: "Refresh",
        btnClearCache: "Clear Cache",
        btnExpandAll: "Expand All",
        btnCollapseAll: "Collapse All",
        controlsExport: "Export",
        btnExportJSON: "JSON",
        btnExportCSV: "CSV",
        btnCopyTree: "Copy",
        
        // Search
        searchPlaceholder: "Search files and folders...",
        
        // Metrics
        metricsTitle: "Repository Metrics",
        metricsLoading: "Loading metrics...",
        metricTotalFiles: "Total Files",
        metricTotalDirs: "Directories",
        metricTotalSize: "Total Size",
        metricDepth: "Max Depth",
        metricLargestFile: "Largest File",
        
        // File Distribution
        distributionTitle: "File Distribution by Type",
        fileTypesTitle: "File Types",
        
        // Status Messages
        statusAnalyzing: "Analyzing repository...",
        statusLoading: "Loading structure...",
        statusSuccess: "Repository loaded successfully!",
        statusError: "Error loading repository",
        statusPasted: "Link pasted!",
        statusCacheCleared: "Cache cleared!",
        statusCopied: "Copied to clipboard!",
        statusExported: "Exported successfully!",
        
        // Accessibility
        accessibilityTitle: "Accessibility",
        accessibilityHighContrast: "High Contrast",
        accessibilityIncrease: "A+ Increase font",
        accessibilityDecrease: "A- Decrease font",
        accessibilityReset: "Default font",
        
        // Footer
        footerPrivacy: "Privacy Policy",
        footerTerms: "Terms of Use",
        footerAbout: "About",
        footerGuide: "Guide",
        footerContact: "Contact",
        footerRights: "All rights reserved",
        
        // Cookie Banner
        cookieMessage: "We use cookies to improve your experience. By continuing, you agree to our",
        cookieAccept: "Accept",
        cookieReject: "Reject",
        
        // Version Tag
        versionTooltip: "What does this version do? See the complete changelog",
        
        // Institutional Pages - Common
        backToTool: "Back to Tool",
        
        // About Page
        aboutTitle: "About GitTree",
        aboutSubtitle: "Free, open-source tool to instantly explore GitHub repository structures",
        aboutMission: "What is GitTree?",
        aboutMissionText: "GitTree is a free web tool that transforms any public GitHub repository into an interactive visualization. Explore directory structures, analyze code metrics, and understand project organization — all without cloning.",
        aboutFeature1Title: "Visual Exploration",
        aboutFeature1Desc: "Navigate the full repository tree in an intuitive, interactive format",
        aboutFeature2Title: "Detailed Metrics",
        aboutFeature2Desc: "Statistics, file distribution charts, and GitHub data in one place",
        aboutFeature3Title: "No Setup Required",
        aboutFeature3Desc: "Just paste a GitHub URL — no registration, no installation",
        aboutFeature4Title: "Export & Share",
        aboutFeature4Desc: "Export structure as JSON, CSV, or copy as text for documentation",
        aboutHistory: "History",
        aboutHistoryText1: "GitTree was born from a simple idea: to allow any developer to instantly visualize the file structure of a GitHub repository, without needing to clone it. Navigating unfamiliar codebases can be time-consuming — GitTree makes it fast and effortless.",
        aboutHistoryText2: "Created in 2025 by João Claudiano, GitTree started as a personal project and has grown into a free, open-source tool used by developers worldwide. Our goal is to make repository exploration as simple and accessible as possible.",
        aboutTeam: "Our Team",
        aboutTeamFounder: "João Claudiano",
        aboutTeamFounderRole: "Project Creator & Maintainer",
        aboutTeamFounderDesc: "Fullstack Developer · ADHD 🧠💡",
        aboutTeamCommunity: "Community",
        aboutTeamCommunityDesc: "Contributors & Users",
        aboutTeamCommunityText: "You're part of this journey! Every feedback, suggestion and use of the tool helps us improve.",
        aboutTechnology: "Technology",
        aboutTechnologyText: "GitTree is built with modern and reliable technologies:",
        aboutTechFrontend: "Frontend",
        aboutTechFrontendDesc: "HTML5, CSS3, JavaScript (ES6+)",
        aboutTechAPIs: "APIs",
        aboutTechAPIsDesc: "GitHub REST API v3",
        aboutTechHosting: "Hosting",
        aboutTechHostingDesc: "GitHub Pages",
        aboutTechDesign: "Design",
        aboutTechDesignDesc: "CSS Custom Properties for themes",
        aboutOpenSource: "🌐 Open Source:",
        aboutOpenSourceText: "GitTree is open-source and available on GitHub. Contributions are welcome!",
        aboutContributeText: "GitTree is fully open-source. You can fork it, report issues, and submit pull requests on GitHub.",
        aboutViewGitHub: "View on GitHub",
        aboutContactSupport: "Contact & Support",
        aboutContactText: "Need help or have a suggestion? Get in touch:",
        aboutContactEmail: "📧 Email:",
        aboutContactGitHub: "🐙 GitHub:",
        aboutContactIssues: "📄 Issues:",
        aboutContactIssuesText: "Report problems or suggest features",
        aboutExploreMore: "Explore More",
        aboutLinkGuide: "User Guide",
        aboutLinkGuideDesc: "Learn how to use all features of GitTree",
        aboutLinkContact: "Contact",
        aboutLinkContactDesc: "Get in touch with the team",
        aboutLinkToolDesc: "Use the tool now — it's free",
        aboutFooter: "© 2026 GitTree · Connecting developers around the world · 🌳",
        
        // Contact Page
        contactTitle: "Contact",
        contactText: "This channel is available for questions, improvement suggestions and communication of any technical problems related to GitTree.",
        contactBusinessHours: "Business Hours:",
        contactBusinessHoursText: "Monday to Friday, from 9am to 6pm (Brasilia time)",
        contactResponseTime: "Average response time:",
        contactResponseTimeText: "24-48 hours",
        contactOtherChannels: "Other Channels",
        contactOtherChannelsText: "You can also follow us through:",
        contactGitHub: "GitHub:",
        contactProjectIssues: "Project Issues:",
        contactProjectIssuesText: "Report bugs or suggest features",
        contactImportantInfo: "Important Information",
        contactWhatWeDontOffer: "🚫 What we DON'T offer:",
        contactNoIndividualSupport: "Individual technical support",
        contactNoLiveChat: "Real-time support (live chat)",
        contactNoPersonalizedConsulting: "Personalized consulting",
        contactNoPrivateRepos: "Private repository analysis",
        contactWhatWeOffer: "✅ What we offer:",
        contactToolQuestions: "Answers about how the tool works",
        contactSuggestions: "Accepting improvement suggestions",
        contactBugFixes: "Bug fixes reported",
        contactPrivacyQuestions: "Clarifications about privacy and terms",
        contactFooter: "© GitTree · Connecting developers · 🌳",

        // Guide Page
        guideTitle: "GitTree User Guide",
        guideSubtitle: "Learn how to use all the features of the GitHub repository visualization tool",
        guideFooter: "© GitTree · Free tool for developers · 🌳",

        // Privacy Policy Page
        privacyTitle: "Privacy Policy",
        privacySubtitle: "Last updated: January 18, 2026",
        privacyFooter: "© GitTree · Privacy by default · Transparency by design",

        // Terms of Use Page
        termsTitle: "Terms of Use",
        termsSubtitle: "Last updated: January 18, 2026",
        termsFooter: "© GitTree · Responsible use · Transparency",

        // 404 Page
        notFoundTitle: "Page Not Found",
        notFoundText: "The page you are looking for does not exist or has been moved.",
        notFoundBtn: "Back to GitTree",
        notFoundFooter: "© GitTree · Connecting developers around the world · 🌳",

        // Dynamic UI strings (main.js / enhanced-tree.js)
        treeBadgeFolder: "folder",
        treeBadgeFile: "file",
        chartNoFiles: "No files to show",
        chartFilesUnit: "files",
        treeOther: "OTHER",
        unknownLanguage: "Unknown",

        // Guide Page – Section 1: What is GitTree?
        guideWhatIsTitle: "What is GitTree?",
        guideWhatIsText: "GitTree is a free web tool that transforms GitHub repositories into interactive visualizations, allowing you to explore file structures, analyze metrics, and understand code organization intuitively.",
        guideFeature1Title: "Visual Analysis",
        guideFeature1Desc: "See the complete repository structure in tree format",
        guideFeature2Title: "Detailed Metrics",
        guideFeature2Desc: "Statistics and charts about files and folders",
        guideFeature3Title: "Easy to Use",
        guideFeature3Desc: "Just paste the GitHub URL and start exploring",

        // Guide Page – Section 2: Getting Started
        guideGettingStartedTitle: "Getting Started in 3 Steps",
        guideStep1Title: "Paste the GitHub URL",
        guideStep1Text: "In the main field on the home page, paste any public GitHub repository URL.",
        guideStep1FormatsLabel: "Accepted formats:",
        guideStep2Title: "Click \"Visualize\"",
        guideStep2Text: "The tool will fetch the complete repository structure and process all information. The process may take a few seconds depending on the repository size.",
        guideStep3Title: "Explore the Results",
        guideStep3Text: "Navigate between the \"Tree\" and \"Metrics\" tabs to explore different views of the repository data.",

        // Guide Page – Section 3: Main Features
        guideFeaturesTitle: "Main Features",
        guideTreeViewTitle: "Tree View",
        guideTreeViewText: "Explore the hierarchical structure of folders and files:",
        guideTreeItem1: "Click on folders to expand/collapse",
        guideTreeItem2: "Use the search to find specific files",
        guideTreeItem3: "Expand/Collapse buttons to control the entire tree",
        guideTreeItem4: "Copy structure as text or Markdown",
        guideTreeTipLabel: "Tip:",
        guideTreeTipText: "Use the \"Copy Text\" button in the toolbar to copy the structure in ASCII format and paste it in documentation.",
        guideMetricsTabTitle: "Metrics Tab",
        guideMetricsTabText: "Get insights about the repository:",
        guideMetricsItem1: "File and folder count",
        guideMetricsItem2: "Total repository size",
        guideMetricsItem3: "Distribution chart by file type",
        guideMetricsItem4: "GitHub statistics (stars, forks, watchers)",

        // Guide Page – Section 4: Buttons
        guideButtonsTitle: "What does each button do?",
        guideInputFieldTitle: "Input Field",
        guideBtn1Title: "Paste",
        guideBtn1Desc: "Automatically pastes the repository link from the clipboard. Useful when you just copied a GitHub URL.",
        guideBtn2Title: "Visualize",
        guideBtn2Desc: "Starts the repository analysis. Fetches the complete structure and processes all file and folder information.",
        guideVisualizationTitle: "Visualization",
        guideBtn3Title: "Tree",
        guideBtn3Desc: "Shows the repository structure in hierarchical tree format. Allows expanding and navigating through all directories and files.",
        guideBtn4Title: "Metrics",
        guideBtn4Desc: "Displays statistics and charts about the repository, including file count, total size, type distribution, and GitHub data.",
        guideToolsTitle: "Tools",
        guideBtn5Title: "Clear Cache",
        guideBtn5Desc: "Removes all repositories saved in the local cache. Use when you want to free up space or force a new analysis.",
        guideBtn6Title: "Reload",
        guideBtn6Desc: "Forces a new analysis of the current repository, ignoring the cache. Useful to see recent updates in the repository.",
        guideExportTitle: "Export",
        guideBtn7Desc: "Exports the complete structure in JSON format. Ideal for programmatic analysis or integration with other tools.",
        guideBtn8Desc: "Exports the file list in CSV format (spreadsheet). Perfect for analysis in Excel, Google Sheets, or other data tools.",
        guideTreeToolbarTitle: "Tree Toolbar",
        guideBtn9Title: "Copy Text",
        guideBtn9Desc: "Copies the tree structure in ASCII text format. Useful to include in documentation, READMEs, or to share the structure.",
        guideBtn10Title: "Expand",
        guideBtn10Desc: "Expands all directories in the tree at once. Shows the complete repository structure.",
        guideBtn11Title: "Collapse",
        guideBtn11Desc: "Collapses all directories, showing only the root level. Useful for a simplified overview.",
        guideOtherControlsTitle: "Other Controls",
        guideBtn12Title: "Toggle Theme",
        guideBtn12Desc: "Button in the upper right corner that switches between light and dark theme. Your preference is saved automatically.",
        guideBtn13Title: "Search Files",
        guideBtn13Desc: "Search field above the tree to filter files in real time. Type any part of the file name or path.",
        guideButtonsTipLabel: "Quick Tip:",
        guideButtonsTipText: "Hover over any button to see a quick description (tooltip) of what it does!",

        // Guide Page – Section 5: Advanced Tips
        guideAdvancedTitle: "Advanced Tips",
        guideAdvTip1Label: "Quick Paste:",
        guideAdvTip1Text: "Use the \"Paste\" button next to the input field to automatically paste links copied from the clipboard.",
        guideAdvTip2Label: "Smart Cache:",
        guideAdvTip2Text: "GitTree stores analyses locally. Recently analyzed repositories load instantly.",
        guideAdvTip3Label: "Export Data:",
        guideAdvTip3Text: "Use the \"JSON\" or \"CSV\" buttons to export the complete analysis for external use.",
        guideAdvTip4Label: "Light/Dark Theme:",
        guideAdvTip4Text: "Click the moon/sun icon in the upper right corner to switch between themes.",

        // Guide Page – Section 6: FAQ
        guideFaqTitle: "Frequently Asked Questions",
        guideFaq1Q: "Q: Does GitTree work with private repositories?",
        guideFaq1A: "A: No, only with public GitHub repositories.",
        guideFaq2Q: "Q: Is my data stored?",
        guideFaq2A: "A: No, the analyzed code is not stored. Only metadata is kept locally in your browser for caching.",
        guideFaq3Q: "Q: Can I analyze any repository?",
        guideFaq3A: "A: Yes, any public GitHub repository. Some very large repositories may have their structure truncated by the GitHub API.",
        guideFaq4Q: "Q: Is the tool free?",
        guideFaq4A: "A: Yes, completely free and open-source."
    },
    
    pt: {
        // SEO Meta Tags
        pageTitle: "GitTree - Visualizador de Estrutura GitHub | Explore Repositórios",
        metaDescription: "GitTree - Visualize e analise a estrutura de qualquer repositório GitHub. Explore árvores de diretórios, métricas de código e estatísticas em tempo real. Ferramenta gratuita para desenvolvedores.",
        metaKeywords: "github, repositório, árvore, visualizador, estrutura de código, explorador github, ferramentas desenvolvedor, código aberto, análise de código, métricas repositório",
        
        // Header & Navigation
        logoText: "GitTree",
        navVisualizer: "Visualizador",
        navAbout: "Sobre",
        navGuide: "Guia",
        navContact: "Contato",
        themeToggleLight: "Alternar para tema escuro",
        themeToggleDark: "Alternar para tema claro",
        
        // Main Interface
        sectionTitle: "Visualizador GitHub",
        inputPlaceholder: "usuário/repositório ou URL completa do GitHub",
        btnPaste: "Colar",
        btnVisualize: "Visualizar",
        statusDefault: "Digite um repositório GitHub",
        
        // Controls
        controlsVisualization: "Visualização",
        btnTree: "Árvore",
        btnMetrics: "Métricas",
        btnCache: "Cache",
        controlsActions: "Ações",
        btnRefresh: "Atualizar",
        btnClearCache: "Limpar Cache",
        btnExpandAll: "Expandir Tudo",
        btnCollapseAll: "Recolher Tudo",
        controlsExport: "Exportar",
        btnExportJSON: "JSON",
        btnExportCSV: "CSV",
        btnCopyTree: "Copiar",
        
        // Search
        searchPlaceholder: "Buscar arquivos e pastas...",
        
        // Metrics
        metricsTitle: "Métricas do Repositório",
        metricsLoading: "Carregando métricas...",
        metricTotalFiles: "Total de Arquivos",
        metricTotalDirs: "Diretórios",
        metricTotalSize: "Tamanho Total",
        metricDepth: "Profundidade Máx.",
        metricLargestFile: "Maior Arquivo",
        
        // File Distribution
        distributionTitle: "Distribuição de Arquivos por Tipo",
        fileTypesTitle: "Tipos de Arquivo",
        
        // Status Messages
        statusAnalyzing: "Analisando repositório...",
        statusLoading: "Carregando estrutura...",
        statusSuccess: "Repositório carregado com sucesso!",
        statusError: "Erro ao carregar repositório",
        statusPasted: "Link colado!",
        statusCacheCleared: "Cache limpo!",
        statusCopied: "Copiado para área de transferência!",
        statusExported: "Exportado com sucesso!",
        
        // Accessibility
        accessibilityTitle: "Acessibilidade",
        accessibilityHighContrast: "Alto Contraste",
        accessibilityIncrease: "A+ Aumentar fonte",
        accessibilityDecrease: "A- Diminuir fonte",
        accessibilityReset: "Fonte padrão",
        
        // Footer
        footerPrivacy: "Política de Privacidade",
        footerTerms: "Termos de Uso",
        footerAbout: "Sobre",
        footerGuide: "Guia",
        footerContact: "Contato",
        footerRights: "Todos os direitos reservados",
        
        // Cookie Banner
        cookieMessage: "Usamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa",
        cookieAccept: "Aceitar",
        cookieReject: "Recusar",
        
        // Version Tag
        versionTooltip: "O que esta versão faz? Veja o changelog completo",
        
        // Institutional Pages - Common
        backToTool: "Voltar para a Ferramenta",
        
        // About Page
        aboutTitle: "Sobre o GitTree",
        aboutSubtitle: "Ferramenta gratuita e open-source para explorar estruturas de repositórios GitHub instantaneamente",
        aboutMission: "O que é o GitTree?",
        aboutMissionText: "O GitTree é uma ferramenta web gratuita que transforma qualquer repositório público do GitHub em uma visualização interativa. Explore estruturas de diretórios, analise métricas de código e entenda a organização do projeto — tudo sem precisar clonar.",
        aboutFeature1Title: "Exploração Visual",
        aboutFeature1Desc: "Navegue pela árvore completa do repositório em formato interativo e intuitivo",
        aboutFeature2Title: "Métricas Detalhadas",
        aboutFeature2Desc: "Estatísticas, gráficos de distribuição de arquivos e dados do GitHub em um só lugar",
        aboutFeature3Title: "Sem Configuração",
        aboutFeature3Desc: "Basta colar uma URL do GitHub — sem cadastro, sem instalação",
        aboutFeature4Title: "Exportar e Compartilhar",
        aboutFeature4Desc: "Exporte a estrutura como JSON, CSV ou copie como texto para documentações",
        aboutHistory: "História",
        aboutHistoryText1: "O GitTree nasceu de uma ideia simples: permitir que qualquer desenvolvedor visualize instantaneamente a estrutura de arquivos de um repositório do GitHub, sem precisar cloná-lo. Navegar em bases de código desconhecidas pode ser demorado — o GitTree torna esse processo rápido e descomplicado.",
        aboutHistoryText2: "Criado em 2025 por João Claudiano, o GitTree começou como um projeto pessoal e cresceu para se tornar uma ferramenta gratuita e de código aberto usada por desenvolvedores do mundo inteiro. Nosso objetivo é tornar a exploração de repositórios tão simples e acessível quanto possível.",
        aboutTeam: "Nossa Equipe",
        aboutTeamFounder: "João Claudiano",
        aboutTeamFounderRole: "Criador e Mantenedor do Projeto",
        aboutTeamFounderDesc: "Desenvolvedor Fullstack · TDAH 🧠💡",
        aboutTeamCommunity: "Comunidade",
        aboutTeamCommunityDesc: "Contribuidores & Usuários",
        aboutTeamCommunityText: "Você faz parte dessa jornada! Cada feedback, sugestão e uso da ferramenta nos ajuda a melhorar.",
        aboutTechnology: "Tecnologia",
        aboutTechnologyText: "O GitTree é construído com tecnologias modernas e confiáveis:",
        aboutTechFrontend: "Frontend",
        aboutTechFrontendDesc: "HTML5, CSS3, JavaScript (ES6+)",
        aboutTechAPIs: "APIs",
        aboutTechAPIsDesc: "GitHub REST API v3",
        aboutTechHosting: "Hospedagem",
        aboutTechHostingDesc: "GitHub Pages",
        aboutTechDesign: "Design",
        aboutTechDesignDesc: "CSS Custom Properties para temas",
        aboutOpenSource: "🌐 Código Aberto:",
        aboutOpenSourceText: "O GitTree é open-source e disponível no GitHub. Contribuições são bem-vindas!",
        aboutContributeText: "O GitTree é totalmente open-source. Você pode criar um fork, reportar issues e enviar pull requests no GitHub.",
        aboutViewGitHub: "Ver no GitHub",
        aboutContactSupport: "Contato & Suporte",
        aboutContactText: "Precisa de ajuda ou tem uma sugestão? Entre em contato:",
        aboutContactEmail: "📧 Email:",
        aboutContactGitHub: "🐙 GitHub:",
        aboutContactIssues: "📄 Issues:",
        aboutContactIssuesText: "Reportar problemas ou sugerir funcionalidades",
        aboutExploreMore: "Explore Mais",
        aboutLinkGuide: "Guia do Usuário",
        aboutLinkGuideDesc: "Aprenda a usar todas as funcionalidades do GitTree",
        aboutLinkContact: "Contato",
        aboutLinkContactDesc: "Entre em contato com a equipe",
        aboutLinkToolDesc: "Use a ferramenta agora — é gratuita",
        aboutFooter: "© 2026 GitTree · Conectando desenvolvedores ao redor do mundo · 🌳",
        
        // Contact Page
        contactTitle: "Contato",
        contactText: "Este canal está disponível para dúvidas, sugestões de melhoria e comunicação de eventuais problemas técnicos relacionados ao GitTree.",
        contactBusinessHours: "Horário de atendimento:",
        contactBusinessHoursText: "Segunda a Sexta, das 9h às 18h (horário de Brasília)",
        contactResponseTime: "Tempo médio de resposta:",
        contactResponseTimeText: "24-48 horas",
        contactOtherChannels: "Outros Canais",
        contactOtherChannelsText: "Você também pode nos acompanhar por:",
        contactGitHub: "GitHub:",
        contactProjectIssues: "Issues do Projeto:",
        contactProjectIssuesText: "Reportar bugs ou sugerir funcionalidades",
        contactImportantInfo: "Informações Importantes",
        contactWhatWeDontOffer: "🚫 O que NÃO oferecemos:",
        contactNoIndividualSupport: "Suporte técnico individualizado",
        contactNoLiveChat: "Atendimento em tempo real (chat ao vivo)",
        contactNoPersonalizedConsulting: "Consultoria personalizada",
        contactNoPrivateRepos: "Análise de repositórios privados",
        contactWhatWeOffer: "✅ O que oferecemos:",
        contactToolQuestions: "Respostas sobre o funcionamento da ferramenta",
        contactSuggestions: "Aceitação de sugestões de melhoria",
        contactBugFixes: "Correção de bugs reportados",
        contactPrivacyQuestions: "Esclarecimentos sobre privacidade e termos",
        contactFooter: "© GitTree · Conectando desenvolvedores · 🌳",

        // Guide Page
        guideTitle: "Guia do Usuário GitTree",
        guideSubtitle: "Aprenda a usar todas as funcionalidades da ferramenta de visualização de repositórios GitHub",
        guideFooter: "© GitTree · Ferramenta gratuita para desenvolvedores · 🌳",

        // Privacy Policy Page
        privacyTitle: "Política de Privacidade",
        privacySubtitle: "Última atualização: 18 de janeiro de 2026",
        privacyFooter: "© GitTree · Privacidade por padrão · Transparência por design",

        // Terms of Use Page
        termsTitle: "Termos de Uso",
        termsSubtitle: "Última atualização: 18 de janeiro de 2026",
        termsFooter: "© GitTree · Uso responsável · Transparência",

        // 404 Page
        notFoundTitle: "Página Não Encontrada",
        notFoundText: "A página que você está procurando não existe ou foi movida.",
        notFoundBtn: "Voltar ao GitTree",
        notFoundFooter: "© GitTree · Conectando desenvolvedores ao redor do mundo · 🌳",

        // Dynamic UI strings (main.js / enhanced-tree.js)
        treeBadgeFolder: "pasta",
        treeBadgeFile: "arquivo",
        chartNoFiles: "Nenhum arquivo para mostrar",
        chartFilesUnit: "arquivos",
        treeOther: "OUTROS",
        unknownLanguage: "Desconhecido",

        // Guide Page – Section 1: What is GitTree?
        guideWhatIsTitle: "O que é o GitTree?",
        guideWhatIsText: "O GitTree é uma ferramenta web gratuita que transforma repositórios GitHub em visualizações interativas, permitindo que você explore a estrutura de arquivos, analise métricas e entenda a organização do código de forma intuitiva.",
        guideFeature1Title: "Análise Visual",
        guideFeature1Desc: "Veja a estrutura completa do repositório em formato de árvore",
        guideFeature2Title: "Métricas Detalhadas",
        guideFeature2Desc: "Estatísticas e gráficos sobre arquivos e pastas",
        guideFeature3Title: "Fácil de Usar",
        guideFeature3Desc: "Basta colar a URL do GitHub e começar a explorar",

        // Guide Page – Section 2: Getting Started
        guideGettingStartedTitle: "Começando em 3 Passos",
        guideStep1Title: "Cole a URL do GitHub",
        guideStep1Text: "No campo principal da página inicial, cole qualquer URL de repositório público do GitHub.",
        guideStep1FormatsLabel: "Formatos aceitos:",
        guideStep2Title: "Clique em \"Visualizar\"",
        guideStep2Text: "A ferramenta irá buscar a estrutura completa do repositório e processar todas as informações. O processo pode levar alguns segundos dependendo do tamanho do repositório.",
        guideStep3Title: "Explore os Resultados",
        guideStep3Text: "Navegue entre as abas \"Árvore\" e \"Métricas\" para explorar diferentes visualizações dos dados do repositório.",

        // Guide Page – Section 3: Main Features
        guideFeaturesTitle: "Funcionalidades Principais",
        guideTreeViewTitle: "Visualização em Árvore",
        guideTreeViewText: "Explore a estrutura hierárquica de pastas e arquivos:",
        guideTreeItem1: "Clique em pastas para expandir/recolher",
        guideTreeItem2: "Use a busca para encontrar arquivos específicos",
        guideTreeItem3: "Botões Expandir/Recolher para controlar toda a árvore",
        guideTreeItem4: "Copiar estrutura como texto ou Markdown",
        guideTreeTipLabel: "Dica:",
        guideTreeTipText: "Use o botão \"Copiar Texto\" na toolbar para copiar a estrutura em formato ASCII e colar em documentações.",
        guideMetricsTabTitle: "Aba de Métricas",
        guideMetricsTabText: "Obtenha insights sobre o repositório:",
        guideMetricsItem1: "Contagem de arquivos e pastas",
        guideMetricsItem2: "Tamanho total do repositório",
        guideMetricsItem3: "Gráfico de distribuição por tipo de arquivo",
        guideMetricsItem4: "Estatísticas de GitHub (stars, forks, watchers)",

        // Guide Page – Section 4: Buttons
        guideButtonsTitle: "O que cada botão faz?",
        guideInputFieldTitle: "Campo de Entrada",
        guideBtn1Title: "Colar",
        guideBtn1Desc: "Cola automaticamente o link do repositório da área de transferência. Útil quando você acabou de copiar uma URL do GitHub.",
        guideBtn2Title: "Visualizar",
        guideBtn2Desc: "Inicia a análise do repositório. Busca a estrutura completa e processa todas as informações de arquivos e pastas.",
        guideVisualizationTitle: "Visualização",
        guideBtn3Title: "Árvore",
        guideBtn3Desc: "Mostra a estrutura do repositório em formato hierárquico de árvore. Permite expandir e navegar por todos os diretórios e arquivos.",
        guideBtn4Title: "Métricas",
        guideBtn4Desc: "Exibe estatísticas e gráficos sobre o repositório, incluindo contagem de arquivos, tamanho total, distribuição por tipo e dados do GitHub.",
        guideToolsTitle: "Ferramentas",
        guideBtn5Title: "Limpar Cache",
        guideBtn5Desc: "Remove todos os repositórios salvos no cache local. Use quando quiser liberar espaço ou forçar uma nova análise.",
        guideBtn6Title: "Recarregar",
        guideBtn6Desc: "Força uma nova análise do repositório atual, ignorando o cache. Útil para ver atualizações recentes no repositório.",
        guideExportTitle: "Exportar",
        guideBtn7Desc: "Exporta a estrutura completa em formato JSON. Ideal para análise programática ou integração com outras ferramentas.",
        guideBtn8Desc: "Exporta a lista de arquivos em formato CSV (planilha). Perfeito para análise em Excel, Google Sheets ou outras ferramentas de dados.",
        guideTreeToolbarTitle: "Barra de Ferramentas da Árvore",
        guideBtn9Title: "Copiar Texto",
        guideBtn9Desc: "Copia a estrutura da árvore em formato de texto ASCII. Útil para incluir em documentações, READMEs ou compartilhar a estrutura.",
        guideBtn10Title: "Expandir",
        guideBtn10Desc: "Expande todos os diretórios da árvore de uma vez. Mostra a estrutura completa do repositório.",
        guideBtn11Title: "Recolher",
        guideBtn11Desc: "Recolhe todos os diretórios, mostrando apenas o nível raiz. Útil para ter uma visão geral simplificada.",
        guideOtherControlsTitle: "Outros Controles",
        guideBtn12Title: "Alternar Tema",
        guideBtn12Desc: "Botão no canto superior direito que alterna entre tema claro e escuro. Sua preferência é salva automaticamente.",
        guideBtn13Title: "Buscar Arquivos",
        guideBtn13Desc: "Campo de busca acima da árvore para filtrar arquivos em tempo real. Digite qualquer parte do nome ou caminho do arquivo.",
        guideButtonsTipLabel: "Dica Rápida:",
        guideButtonsTipText: "Passe o mouse sobre qualquer botão para ver uma descrição rápida (tooltip) do que ele faz!",

        // Guide Page – Section 5: Advanced Tips
        guideAdvancedTitle: "Dicas Avançadas",
        guideAdvTip1Label: "Colar Rapidamente:",
        guideAdvTip1Text: "Use o botão \"Colar\" ao lado do campo de entrada para colar automaticamente links copiados da área de transferência.",
        guideAdvTip2Label: "Cache Inteligente:",
        guideAdvTip2Text: "O GitTree armazena análises localmente. Repositórios analisados recentemente carregam instantaneamente.",
        guideAdvTip3Label: "Exportar Dados:",
        guideAdvTip3Text: "Use os botões \"JSON\" ou \"CSV\" para exportar a análise completa para uso externo.",
        guideAdvTip4Label: "Tema Claro/Escuro:",
        guideAdvTip4Text: "Clique no ícone de lua/sol no canto superior direito para alternar entre temas.",

        // Guide Page – Section 6: FAQ
        guideFaqTitle: "Perguntas Frequentes",
        guideFaq1Q: "Q: O GitTree funciona com repositórios privados?",
        guideFaq1A: "A: Não, apenas com repositórios públicos do GitHub.",
        guideFaq2Q: "Q: Meus dados são armazenados?",
        guideFaq2A: "A: Não, o código analisado não é armazenado. Apenas metadados são mantidos localmente no seu navegador para cache.",
        guideFaq3Q: "Q: Posso analisar qualquer repositório?",
        guideFaq3A: "A: Sim, qualquer repositório público do GitHub. Alguns repositórios muito grandes podem ter a estrutura truncada pela API do GitHub.",
        guideFaq4Q: "Q: A ferramenta é gratuita?",
        guideFaq4A: "A: Sim, completamente gratuita e open-source."
    },
    
    es: {
        // SEO Meta Tags
        pageTitle: "GitTree - Visualizador de Estructura GitHub | Explorar Repositorios",
        metaDescription: "GitTree - Visualiza y analiza la estructura de cualquier repositorio GitHub. Explora árboles de directorios, métricas de código y estadísticas en tiempo real. Herramienta gratuita para desarrolladores.",
        metaKeywords: "github, repositorio, árbol, visualizador, estructura código, explorador github, herramientas desarrollador, código abierto, análisis código, métricas repositorio",
        
        // Header & Navigation
        logoText: "GitTree",
        navVisualizer: "Visualizador",
        navAbout: "Acerca de",
        navGuide: "Guía",
        navContact: "Contacto",
        themeToggleLight: "Cambiar a tema oscuro",
        themeToggleDark: "Cambiar a tema claro",
        
        // Main Interface
        sectionTitle: "Visualizador GitHub",
        inputPlaceholder: "usuario/repositorio o URL completa de GitHub",
        btnPaste: "Pegar",
        btnVisualize: "Visualizar",
        statusDefault: "Ingrese un repositorio GitHub",
        
        // Controls
        controlsVisualization: "Visualización",
        btnTree: "Árbol",
        btnMetrics: "Métricas",
        btnCache: "Caché",
        controlsActions: "Acciones",
        btnRefresh: "Actualizar",
        btnClearCache: "Limpiar Caché",
        btnExpandAll: "Expandir Todo",
        btnCollapseAll: "Contraer Todo",
        controlsExport: "Exportar",
        btnExportJSON: "JSON",
        btnExportCSV: "CSV",
        btnCopyTree: "Copiar",
        
        // Search
        searchPlaceholder: "Buscar archivos y carpetas...",
        
        // Metrics
        metricsTitle: "Métricas del Repositorio",
        metricsLoading: "Cargando métricas...",
        metricTotalFiles: "Total de Archivos",
        metricTotalDirs: "Directorios",
        metricTotalSize: "Tamaño Total",
        metricDepth: "Profundidad Máx.",
        metricLargestFile: "Archivo Más Grande",
        
        // File Distribution
        distributionTitle: "Distribución de Archivos por Tipo",
        fileTypesTitle: "Tipos de Archivo",
        
        // Status Messages
        statusAnalyzing: "Analizando repositorio...",
        statusLoading: "Cargando estructura...",
        statusSuccess: "¡Repositorio cargado con éxito!",
        statusError: "Error al cargar repositorio",
        statusPasted: "¡Enlace pegado!",
        statusCacheCleared: "¡Caché limpiado!",
        statusCopied: "¡Copiado al portapapeles!",
        statusExported: "¡Exportado con éxito!",
        
        // Accessibility
        accessibilityTitle: "Accesibilidad",
        accessibilityHighContrast: "Alto Contraste",
        accessibilityIncrease: "A+ Aumentar fuente",
        accessibilityDecrease: "A- Disminuir fuente",
        accessibilityReset: "Fuente predeterminada",
        
        // Footer
        footerPrivacy: "Política de Privacidad",
        footerTerms: "Términos de Uso",
        footerAbout: "Acerca de",
        footerGuide: "Guía",
        footerContact: "Contacto",
        footerRights: "Todos los derechos reservados",
        
        // Cookie Banner
        cookieMessage: "Usamos cookies para mejorar su experiencia. Al continuar, acepta nuestra",
        cookieAccept: "Aceptar",
        cookieReject: "Rechazar",
        
        // Version Tag
        versionTooltip: "¿Qué hace esta versión? Ver el registro de cambios completo",
        
        // Institutional Pages - Common
        backToTool: "Volver a la Herramienta",
        
        // About Page
        aboutTitle: "Acerca de",
        aboutSubtitle: "Herramienta gratuita y open-source para explorar estructuras de repositorios GitHub al instante",
        aboutMission: "¿Qué es GitTree?",
        aboutMissionText: "GitTree es una herramienta web gratuita que transforma cualquier repositorio público de GitHub en una visualización interactiva. Explora estructuras de directorios, analiza métricas de código y comprende la organización del proyecto, todo sin necesidad de clonar.",
        aboutFeature1Title: "Exploración Visual",
        aboutFeature1Desc: "Navega por el árbol completo del repositorio en formato interactivo e intuitivo",
        aboutFeature2Title: "Métricas Detalladas",
        aboutFeature2Desc: "Estadísticas, gráficos de distribución de archivos y datos de GitHub en un solo lugar",
        aboutFeature3Title: "Sin Configuración",
        aboutFeature3Desc: "Solo pega una URL de GitHub — sin registro, sin instalación",
        aboutFeature4Title: "Exportar y Compartir",
        aboutFeature4Desc: "Exporta la estructura como JSON, CSV o cópiala como texto para documentación",
        aboutHistory: "Historia",
        aboutHistoryText1: "GitTree nació de una idea simple: permitir que cualquier desarrollador visualice instantáneamente la estructura de archivos de un repositorio de GitHub, sin necesidad de clonarlo. Navegar por bases de código desconocidas puede ser tedioso — GitTree lo hace rápido y sencillo.",
        aboutHistoryText2: "Creado en 2025 por João Claudiano, GitTree comenzó como un proyecto personal y se convirtió en una herramienta gratuita y de código abierto utilizada por desarrolladores de todo el mundo. Nuestro objetivo es hacer que la exploración de repositorios sea lo más simple y accesible posible.",
        aboutTeam: "Nuestro Equipo",
        aboutTeamFounder: "João Claudiano",
        aboutTeamFounderRole: "Creador y Mantenedor del Proyecto",
        aboutTeamFounderDesc: "Desarrollador Fullstack · TDAH 🧠💡",
        aboutTeamCommunity: "Comunidad",
        aboutTeamCommunityDesc: "Contribuidores & Usuarios",
        aboutTeamCommunityText: "¡Eres parte de este viaje! Cada comentario, sugerencia y uso de la herramienta nos ayuda a mejorar.",
        aboutTechnology: "Tecnología",
        aboutTechnologyText: "GitTree está construido con tecnologías modernas y confiables:",
        aboutOpenSource: "🌐 Código Abierto:",
        aboutOpenSourceText: "GitTree es open-source y está disponible en GitHub. ¡Las contribuciones son bienvenidas!",
        aboutContributeText: "GitTree es totalmente open-source. Puedes bifurcarlo, reportar problemas y enviar pull requests en GitHub.",
        aboutViewGitHub: "Ver en GitHub",
        aboutContactSupport: "Contacto y Soporte",
        aboutContactText: "¿Necesitas ayuda o tienes una sugerencia? Contáctanos:",
        aboutContactEmail: "📧 Email:",
        aboutContactGitHub: "🐙 GitHub:",
        aboutContactIssues: "📄 Issues:",
        aboutContactIssuesText: "Reportar problemas o sugerir funcionalidades",
        aboutExploreMore: "Explorar Más",
        aboutLinkGuide: "Guía del Usuario",
        aboutLinkGuideDesc: "Aprende a usar todas las funciones de GitTree",
        aboutLinkContact: "Contacto",
        aboutLinkContactDesc: "Ponte en contacto con el equipo",
        aboutLinkToolDesc: "Usa la herramienta ahora — es gratuita",
        aboutFooter: "© 2026 GitTree · Conectando desarrolladores alrededor del mundo · 🌳",
        
        // Contact Page
        contactTitle: "Contacto",
        contactOtherChannels: "Otros Canales",
        contactImportantInfo: "Información Importante",
        contactFooter: "© GitTree · Conectando desarrolladores · 🌳",

        // Guide Page
        guideTitle: "Guía del Usuario GitTree",
        guideSubtitle: "Aprende a usar todas las funcionalidades de la herramienta de visualización de repositorios GitHub",
        guideFooter: "© GitTree · Herramienta gratuita para desarrolladores · 🌳",

        // Privacy Policy Page
        privacyTitle: "Política de Privacidad",
        privacySubtitle: "Última actualización: 18 de enero de 2026",
        privacyFooter: "© GitTree · Privacidad por defecto · Transparencia por diseño",

        // Terms of Use Page
        termsTitle: "Términos de Uso",
        termsSubtitle: "Última actualización: 18 de enero de 2026",
        termsFooter: "© GitTree · Uso responsable · Transparencia",

        // 404 Page
        notFoundTitle: "Página No Encontrada",
        notFoundText: "La página que estás buscando no existe o ha sido movida.",
        notFoundBtn: "Volver a GitTree",
        notFoundFooter: "© GitTree · Conectando desarrolladores alrededor del mundo · 🌳",

        // Dynamic UI strings (main.js / enhanced-tree.js)
        treeBadgeFolder: "carpeta",
        treeBadgeFile: "archivo",
        chartNoFiles: "No hay archivos para mostrar",
        chartFilesUnit: "archivos",
        treeOther: "OTROS",
        unknownLanguage: "Desconocido",

        // Guide Page – Section 1: What is GitTree?
        guideWhatIsTitle: "¿Qué es GitTree?",
        guideWhatIsText: "GitTree es una herramienta web gratuita que transforma repositorios de GitHub en visualizaciones interactivas, permitiéndote explorar estructuras de archivos, analizar métricas y entender la organización del código de forma intuitiva.",
        guideFeature1Title: "Análisis Visual",
        guideFeature1Desc: "Ve la estructura completa del repositorio en formato de árbol",
        guideFeature2Title: "Métricas Detalladas",
        guideFeature2Desc: "Estadísticas y gráficos sobre archivos y carpetas",
        guideFeature3Title: "Fácil de Usar",
        guideFeature3Desc: "Solo pega la URL de GitHub y empieza a explorar",

        // Guide Page – Section 2: Getting Started
        guideGettingStartedTitle: "Empezando en 3 Pasos",
        guideStep1Title: "Pega la URL de GitHub",
        guideStep1Text: "En el campo principal de la página de inicio, pega cualquier URL de repositorio público de GitHub.",
        guideStep1FormatsLabel: "Formatos aceptados:",
        guideStep2Title: "Haz clic en \"Visualizar\"",
        guideStep2Text: "La herramienta buscará la estructura completa del repositorio y procesará toda la información. El proceso puede tardar unos segundos según el tamaño del repositorio.",
        guideStep3Title: "Explora los Resultados",
        guideStep3Text: "Navega entre las pestañas \"Árbol\" y \"Métricas\" para explorar diferentes visualizaciones de los datos del repositorio.",

        // Guide Page – Section 3: Main Features
        guideFeaturesTitle: "Funcionalidades Principales",
        guideTreeViewTitle: "Visualización en Árbol",
        guideTreeViewText: "Explora la estructura jerárquica de carpetas y archivos:",
        guideTreeItem1: "Haz clic en carpetas para expandir/contraer",
        guideTreeItem2: "Usa la búsqueda para encontrar archivos específicos",
        guideTreeItem3: "Botones Expandir/Contraer para controlar todo el árbol",
        guideTreeItem4: "Copiar estructura como texto o Markdown",
        guideTreeTipLabel: "Consejo:",
        guideTreeTipText: "Usa el botón \"Copiar Texto\" en la barra de herramientas para copiar la estructura en formato ASCII y pegarla en documentaciones.",
        guideMetricsTabTitle: "Pestaña de Métricas",
        guideMetricsTabText: "Obtén información sobre el repositorio:",
        guideMetricsItem1: "Conteo de archivos y carpetas",
        guideMetricsItem2: "Tamaño total del repositorio",
        guideMetricsItem3: "Gráfico de distribución por tipo de archivo",
        guideMetricsItem4: "Estadísticas de GitHub (stars, forks, watchers)",

        // Guide Page – Section 4: Buttons
        guideButtonsTitle: "¿Qué hace cada botón?",
        guideInputFieldTitle: "Campo de Entrada",
        guideBtn1Title: "Pegar",
        guideBtn1Desc: "Pega automáticamente el enlace del repositorio desde el portapapeles. Útil cuando acabas de copiar una URL de GitHub.",
        guideBtn2Title: "Visualizar",
        guideBtn2Desc: "Inicia el análisis del repositorio. Obtiene la estructura completa y procesa toda la información de archivos y carpetas.",
        guideVisualizationTitle: "Visualización",
        guideBtn3Title: "Árbol",
        guideBtn3Desc: "Muestra la estructura del repositorio en formato jerárquico de árbol. Permite expandir y navegar por todos los directorios y archivos.",
        guideBtn4Title: "Métricas",
        guideBtn4Desc: "Muestra estadísticas y gráficos sobre el repositorio, incluyendo conteo de archivos, tamaño total, distribución por tipo y datos de GitHub.",
        guideToolsTitle: "Herramientas",
        guideBtn5Title: "Limpiar Caché",
        guideBtn5Desc: "Elimina todos los repositorios guardados en la caché local. Úsalo cuando quieras liberar espacio o forzar un nuevo análisis.",
        guideBtn6Title: "Recargar",
        guideBtn6Desc: "Fuerza un nuevo análisis del repositorio actual, ignorando la caché. Útil para ver actualizaciones recientes en el repositorio.",
        guideExportTitle: "Exportar",
        guideBtn7Desc: "Exporta la estructura completa en formato JSON. Ideal para análisis programático o integración con otras herramientas.",
        guideBtn8Desc: "Exporta la lista de archivos en formato CSV (hoja de cálculo). Perfecto para análisis en Excel, Google Sheets u otras herramientas de datos.",
        guideTreeToolbarTitle: "Barra de Herramientas del Árbol",
        guideBtn9Title: "Copiar Texto",
        guideBtn9Desc: "Copia la estructura del árbol en formato de texto ASCII. Útil para incluir en documentaciones, READMEs o compartir la estructura.",
        guideBtn10Title: "Expandir",
        guideBtn10Desc: "Expande todos los directorios del árbol de una vez. Muestra la estructura completa del repositorio.",
        guideBtn11Title: "Contraer",
        guideBtn11Desc: "Contrae todos los directorios, mostrando solo el nivel raíz. Útil para tener una visión general simplificada.",
        guideOtherControlsTitle: "Otros Controles",
        guideBtn12Title: "Alternar Tema",
        guideBtn12Desc: "Botón en la esquina superior derecha que alterna entre tema claro y oscuro. Tu preferencia se guarda automáticamente.",
        guideBtn13Title: "Buscar Archivos",
        guideBtn13Desc: "Campo de búsqueda encima del árbol para filtrar archivos en tiempo real. Escribe cualquier parte del nombre o ruta del archivo.",
        guideButtonsTipLabel: "Consejo Rápido:",
        guideButtonsTipText: "¡Pasa el ratón sobre cualquier botón para ver una descripción rápida (tooltip) de lo que hace!",

        // Guide Page – Section 5: Advanced Tips
        guideAdvancedTitle: "Consejos Avanzados",
        guideAdvTip1Label: "Pegar Rápido:",
        guideAdvTip1Text: "Usa el botón \"Pegar\" al lado del campo de entrada para pegar automáticamente enlaces copiados del portapapeles.",
        guideAdvTip2Label: "Caché Inteligente:",
        guideAdvTip2Text: "GitTree almacena análisis localmente. Los repositorios analizados recientemente se cargan al instante.",
        guideAdvTip3Label: "Exportar Datos:",
        guideAdvTip3Text: "Usa los botones \"JSON\" o \"CSV\" para exportar el análisis completo para uso externo.",
        guideAdvTip4Label: "Tema Claro/Oscuro:",
        guideAdvTip4Text: "Haz clic en el icono de luna/sol en la esquina superior derecha para alternar entre temas.",

        // Guide Page – Section 6: FAQ
        guideFaqTitle: "Preguntas Frecuentes",
        guideFaq1Q: "P: ¿GitTree funciona con repositorios privados?",
        guideFaq1A: "R: No, solo con repositorios públicos de GitHub.",
        guideFaq2Q: "P: ¿Mis datos son almacenados?",
        guideFaq2A: "R: No, el código analizado no se almacena. Solo los metadatos se mantienen localmente en tu navegador para el caché.",
        guideFaq3Q: "P: ¿Puedo analizar cualquier repositorio?",
        guideFaq3A: "R: Sí, cualquier repositorio público de GitHub. Algunos repositorios muy grandes pueden tener la estructura truncada por la API de GitHub.",
        guideFaq4Q: "P: ¿La herramienta es gratuita?",
        guideFaq4A: "R: Sí, completamente gratuita y de código abierto."
    },
    
    fr: {
        // SEO Meta Tags
        pageTitle: "GitTree - Visualiseur de Structure GitHub | Explorer les Dépôts",
        metaDescription: "GitTree - Visualisez et analysez la structure de n'importe quel dépôt GitHub. Explorez les arborescences de répertoires, les métriques de code et les statistiques en temps réel. Outil gratuit pour les développeurs.",
        metaKeywords: "github, dépôt, arbre, visualiseur, structure code, explorateur github, outils développeur, open source, analyse code, métriques dépôt",
        
        // Header & Navigation
        logoText: "GitTree",
        navVisualizer: "Visualiseur",
        navAbout: "À propos",
        navGuide: "Guide",
        navContact: "Contact",
        themeToggleLight: "Passer au thème sombre",
        themeToggleDark: "Passer au thème clair",
        
        // Main Interface
        sectionTitle: "Visualiseur GitHub",
        inputPlaceholder: "utilisateur/dépôt ou URL complète GitHub",
        btnPaste: "Coller",
        btnVisualize: "Visualiser",
        statusDefault: "Entrez un dépôt GitHub",
        
        // Controls
        controlsVisualization: "Visualisation",
        btnTree: "Arbre",
        btnMetrics: "Métriques",
        btnCache: "Cache",
        controlsActions: "Actions",
        btnRefresh: "Actualiser",
        btnClearCache: "Vider le Cache",
        btnExpandAll: "Tout Développer",
        btnCollapseAll: "Tout Réduire",
        controlsExport: "Exporter",
        btnExportJSON: "JSON",
        btnExportCSV: "CSV",
        btnCopyTree: "Copier",
        
        // Search
        searchPlaceholder: "Rechercher fichiers et dossiers...",
        
        // Metrics
        metricsTitle: "Métriques du Dépôt",
        metricsLoading: "Chargement des métriques...",
        metricTotalFiles: "Total de Fichiers",
        metricTotalDirs: "Répertoires",
        metricTotalSize: "Taille Totale",
        metricDepth: "Profondeur Max.",
        metricLargestFile: "Fichier le Plus Grand",
        
        // File Distribution
        distributionTitle: "Distribution des Fichiers par Type",
        fileTypesTitle: "Types de Fichiers",
        
        // Status Messages
        statusAnalyzing: "Analyse du dépôt...",
        statusLoading: "Chargement de la structure...",
        statusSuccess: "Dépôt chargé avec succès!",
        statusError: "Erreur lors du chargement du dépôt",
        statusPasted: "Lien collé!",
        statusCacheCleared: "Cache vidé!",
        statusCopied: "Copié dans le presse-papiers!",
        statusExported: "Exporté avec succès!",
        
        // Accessibility
        accessibilityTitle: "Accessibilité",
        accessibilityHighContrast: "Contraste Élevé",
        accessibilityIncrease: "A+ Augmenter la police",
        accessibilityDecrease: "A- Diminuer la police",
        accessibilityReset: "Police par défaut",
        
        // Footer
        footerPrivacy: "Politique de Confidentialité",
        footerTerms: "Conditions d'Utilisation",
        footerAbout: "À propos",
        footerGuide: "Guide",
        footerContact: "Contact",
        footerRights: "Tous droits réservés",
        
        // Cookie Banner
        cookieMessage: "Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre",
        cookieAccept: "Accepter",
        cookieReject: "Refuser",
        
        // Version Tag
        versionTooltip: "Que fait cette version? Voir le journal des modifications complet",
        
        // Institutional Pages - Common
        backToTool: "Retour à l'Outil",
        
        // About Page
        aboutTitle: "À propos",
        aboutSubtitle: "Outil gratuit et open-source pour explorer instantanément les structures de dépôts GitHub",
        aboutMission: "Qu'est-ce que GitTree ?",
        aboutMissionText: "GitTree est un outil web gratuit qui transforme n'importe quel dépôt GitHub public en une visualisation interactive. Explorez les structures de répertoires, analysez les métriques de code et comprenez l'organisation du projet — le tout sans cloner.",
        aboutFeature1Title: "Exploration Visuelle",
        aboutFeature1Desc: "Naviguez dans l'arborescence complète du dépôt dans un format interactif et intuitif",
        aboutFeature2Title: "Métriques Détaillées",
        aboutFeature2Desc: "Statistiques, graphiques de distribution de fichiers et données GitHub en un seul endroit",
        aboutFeature3Title: "Sans Configuration",
        aboutFeature3Desc: "Collez simplement une URL GitHub — sans inscription, sans installation",
        aboutFeature4Title: "Exporter et Partager",
        aboutFeature4Desc: "Exportez la structure en JSON, CSV ou copiez-la en texte pour la documentation",
        aboutHistory: "Histoire",
        aboutHistoryText1: "GitTree est né d'une idée simple : permettre à tout développeur de visualiser instantanément la structure de fichiers d'un dépôt GitHub, sans avoir à le cloner. Naviguer dans des bases de code inconnues peut être fastidieux — GitTree le rend rapide et facile.",
        aboutHistoryText2: "Créé en 2025 par João Claudiano, GitTree a commencé comme un projet personnel et est devenu un outil gratuit et open-source utilisé par des développeurs du monde entier. Notre objectif est de rendre l'exploration des dépôts aussi simple et accessible que possible.",
        aboutTeam: "Notre Équipe",
        aboutTeamFounder: "João Claudiano",
        aboutTeamFounderRole: "Créateur et Mainteneur du Projet",
        aboutTeamFounderDesc: "Développeur Fullstack · TDAH 🧠💡",
        aboutTeamCommunity: "Communauté",
        aboutTeamCommunityDesc: "Contributeurs & Utilisateurs",
        aboutTeamCommunityText: "Vous faites partie de ce voyage ! Chaque retour, suggestion et utilisation de l'outil nous aide à nous améliorer.",
        aboutTechnology: "Technologie",
        aboutTechnologyText: "GitTree est construit avec des technologies modernes et fiables :",
        aboutOpenSource: "🌐 Open Source :",
        aboutOpenSourceText: "GitTree est open-source et disponible sur GitHub. Les contributions sont les bienvenues !",
        aboutContributeText: "GitTree est entièrement open-source. Vous pouvez le forker, signaler des problèmes et soumettre des pull requests sur GitHub.",
        aboutViewGitHub: "Voir sur GitHub",
        aboutContactSupport: "Contact et Support",
        aboutContactText: "Besoin d'aide ou une suggestion ? Contactez-nous :",
        aboutContactEmail: "📧 Email :",
        aboutContactGitHub: "🐙 GitHub :",
        aboutContactIssues: "📄 Issues :",
        aboutContactIssuesText: "Signaler des problèmes ou suggérer des fonctionnalités",
        aboutExploreMore: "Explorer Plus",
        aboutLinkGuide: "Guide Utilisateur",
        aboutLinkGuideDesc: "Apprenez à utiliser toutes les fonctionnalités de GitTree",
        aboutLinkContact: "Contact",
        aboutLinkContactDesc: "Prenez contact avec l'équipe",
        aboutLinkToolDesc: "Utilisez l'outil maintenant — c'est gratuit",
        aboutFooter: "© 2026 GitTree · Connecter les développeurs du monde entier · 🌳",
        
        // Contact Page
        contactTitle: "Contact",
        contactFooter: "© GitTree · Connecter les développeurs · 🌳",

        // Guide Page
        guideTitle: "Guide Utilisateur GitTree",
        guideSubtitle: "Apprenez à utiliser toutes les fonctionnalités de l'outil de visualisation de dépôts GitHub",
        guideFooter: "© GitTree · Outil gratuit pour les développeurs · 🌳",

        // Privacy Policy Page
        privacyTitle: "Politique de Confidentialité",
        privacySubtitle: "Dernière mise à jour: 18 janvier 2026",
        privacyFooter: "© GitTree · Confidentialité par défaut · Transparence par conception",

        // Terms of Use Page
        termsTitle: "Conditions d'Utilisation",
        termsSubtitle: "Dernière mise à jour: 18 janvier 2026",
        termsFooter: "© GitTree · Utilisation responsable · Transparence",

        // 404 Page
        notFoundTitle: "Page Introuvable",
        notFoundText: "La page que vous recherchez n'existe pas ou a été déplacée.",
        notFoundBtn: "Retour à GitTree",
        notFoundFooter: "© GitTree · Connecter les développeurs du monde entier · 🌳",

        // Dynamic UI strings (main.js / enhanced-tree.js)
        treeBadgeFolder: "dossier",
        treeBadgeFile: "fichier",
        chartNoFiles: "Aucun fichier à afficher",
        chartFilesUnit: "fichiers",
        treeOther: "AUTRES",
        unknownLanguage: "Inconnu",

        // Guide Page – Section 1: What is GitTree?
        guideWhatIsTitle: "Qu'est-ce que GitTree ?",
        guideWhatIsText: "GitTree est un outil web gratuit qui transforme les dépôts GitHub en visualisations interactives, vous permettant d'explorer la structure des fichiers, d'analyser des métriques et de comprendre l'organisation du code de manière intuitive.",
        guideFeature1Title: "Analyse Visuelle",
        guideFeature1Desc: "Voir la structure complète du dépôt en format arborescent",
        guideFeature2Title: "Métriques Détaillées",
        guideFeature2Desc: "Statistiques et graphiques sur les fichiers et dossiers",
        guideFeature3Title: "Facile à Utiliser",
        guideFeature3Desc: "Collez simplement l'URL GitHub et commencez à explorer",

        // Guide Page – Section 2: Getting Started
        guideGettingStartedTitle: "Démarrer en 3 Étapes",
        guideStep1Title: "Collez l'URL GitHub",
        guideStep1Text: "Dans le champ principal de la page d'accueil, collez n'importe quelle URL de dépôt GitHub public.",
        guideStep1FormatsLabel: "Formats acceptés :",
        guideStep2Title: "Cliquez sur \"Visualiser\"",
        guideStep2Text: "L'outil récupérera la structure complète du dépôt et traitera toutes les informations. Le processus peut prendre quelques secondes selon la taille du dépôt.",
        guideStep3Title: "Explorez les Résultats",
        guideStep3Text: "Naviguez entre les onglets \"Arbre\" et \"Métriques\" pour explorer différentes visualisations des données du dépôt.",

        // Guide Page – Section 3: Main Features
        guideFeaturesTitle: "Fonctionnalités Principales",
        guideTreeViewTitle: "Vue Arborescente",
        guideTreeViewText: "Explorez la structure hiérarchique des dossiers et fichiers :",
        guideTreeItem1: "Cliquez sur les dossiers pour développer/réduire",
        guideTreeItem2: "Utilisez la recherche pour trouver des fichiers spécifiques",
        guideTreeItem3: "Boutons Développer/Réduire pour contrôler tout l'arbre",
        guideTreeItem4: "Copier la structure en texte ou Markdown",
        guideTreeTipLabel: "Conseil :",
        guideTreeTipText: "Utilisez le bouton \"Copier Texte\" dans la barre d'outils pour copier la structure au format ASCII et la coller dans des documentations.",
        guideMetricsTabTitle: "Onglet Métriques",
        guideMetricsTabText: "Obtenez des informations sur le dépôt :",
        guideMetricsItem1: "Nombre de fichiers et dossiers",
        guideMetricsItem2: "Taille totale du dépôt",
        guideMetricsItem3: "Graphique de distribution par type de fichier",
        guideMetricsItem4: "Statistiques GitHub (étoiles, forks, observateurs)",

        // Guide Page – Section 4: Buttons
        guideButtonsTitle: "Que fait chaque bouton ?",
        guideInputFieldTitle: "Champ de Saisie",
        guideBtn1Title: "Coller",
        guideBtn1Desc: "Colle automatiquement le lien du dépôt depuis le presse-papiers. Utile quand vous venez de copier une URL GitHub.",
        guideBtn2Title: "Visualiser",
        guideBtn2Desc: "Lance l'analyse du dépôt. Récupère la structure complète et traite toutes les informations sur les fichiers et dossiers.",
        guideVisualizationTitle: "Visualisation",
        guideBtn3Title: "Arbre",
        guideBtn3Desc: "Affiche la structure du dépôt en format arborescent hiérarchique. Permet de développer et naviguer dans tous les répertoires et fichiers.",
        guideBtn4Title: "Métriques",
        guideBtn4Desc: "Affiche des statistiques et graphiques sur le dépôt, y compris le nombre de fichiers, la taille totale, la distribution par type et les données GitHub.",
        guideToolsTitle: "Outils",
        guideBtn5Title: "Vider le Cache",
        guideBtn5Desc: "Supprime tous les dépôts sauvegardés dans le cache local. Utilisez-le pour libérer de l'espace ou forcer une nouvelle analyse.",
        guideBtn6Title: "Recharger",
        guideBtn6Desc: "Force une nouvelle analyse du dépôt actuel, en ignorant le cache. Utile pour voir les mises à jour récentes du dépôt.",
        guideExportTitle: "Exporter",
        guideBtn7Desc: "Exporte la structure complète au format JSON. Idéal pour l'analyse programmatique ou l'intégration avec d'autres outils.",
        guideBtn8Desc: "Exporte la liste des fichiers au format CSV (tableur). Parfait pour l'analyse dans Excel, Google Sheets ou autres outils de données.",
        guideTreeToolbarTitle: "Barre d'Outils de l'Arbre",
        guideBtn9Title: "Copier Texte",
        guideBtn9Desc: "Copie la structure arborescente au format texte ASCII. Utile pour l'inclure dans des documentations, des READMEs ou pour partager la structure.",
        guideBtn10Title: "Développer",
        guideBtn10Desc: "Développe tous les répertoires de l'arbre en une fois. Affiche la structure complète du dépôt.",
        guideBtn11Title: "Réduire",
        guideBtn11Desc: "Réduit tous les répertoires, n'affichant que le niveau racine. Utile pour une vue d'ensemble simplifiée.",
        guideOtherControlsTitle: "Autres Contrôles",
        guideBtn12Title: "Basculer le Thème",
        guideBtn12Desc: "Bouton dans le coin supérieur droit qui alterne entre le thème clair et sombre. Votre préférence est sauvegardée automatiquement.",
        guideBtn13Title: "Rechercher Fichiers",
        guideBtn13Desc: "Champ de recherche au-dessus de l'arbre pour filtrer les fichiers en temps réel. Tapez n'importe quelle partie du nom ou du chemin du fichier.",
        guideButtonsTipLabel: "Conseil Rapide :",
        guideButtonsTipText: "Passez la souris sur n'importe quel bouton pour voir une description rapide (info-bulle) de ce qu'il fait !",

        // Guide Page – Section 5: Advanced Tips
        guideAdvancedTitle: "Conseils Avancés",
        guideAdvTip1Label: "Coller Rapidement :",
        guideAdvTip1Text: "Utilisez le bouton \"Coller\" à côté du champ de saisie pour coller automatiquement les liens copiés depuis le presse-papiers.",
        guideAdvTip2Label: "Cache Intelligent :",
        guideAdvTip2Text: "GitTree stocke les analyses localement. Les dépôts récemment analysés se chargent instantanément.",
        guideAdvTip3Label: "Exporter des Données :",
        guideAdvTip3Text: "Utilisez les boutons \"JSON\" ou \"CSV\" pour exporter l'analyse complète pour une utilisation externe.",
        guideAdvTip4Label: "Thème Clair/Sombre :",
        guideAdvTip4Text: "Cliquez sur l'icône lune/soleil dans le coin supérieur droit pour alterner entre les thèmes.",

        // Guide Page – Section 6: FAQ
        guideFaqTitle: "Questions Fréquentes",
        guideFaq1Q: "Q : GitTree fonctionne-t-il avec des dépôts privés ?",
        guideFaq1A: "R : Non, uniquement avec des dépôts GitHub publics.",
        guideFaq2Q: "Q : Mes données sont-elles stockées ?",
        guideFaq2A: "R : Non, le code analysé n'est pas stocké. Seules les métadonnées sont conservées localement dans votre navigateur pour le cache.",
        guideFaq3Q: "Q : Puis-je analyser n'importe quel dépôt ?",
        guideFaq3A: "R : Oui, tout dépôt GitHub public. Certains très grands dépôts peuvent avoir leur structure tronquée par l'API GitHub.",
        guideFaq4Q: "Q : L'outil est-il gratuit ?",
        guideFaq4A: "R : Oui, complètement gratuit et open-source."
    },
    
    it: {
        // SEO Meta Tags
        pageTitle: "GitTree - Visualizzatore di Struttura GitHub | Esplora Repository",
        metaDescription: "GitTree - Visualizza e analizza la struttura di qualsiasi repository GitHub. Esplora alberi di directory, metriche del codice e statistiche in tempo reale. Strumento gratuito per sviluppatori.",
        metaKeywords: "github, repository, albero, visualizzatore, struttura codice, esploratore github, strumenti sviluppatore, open source, analisi codice, metriche repository",
        
        // Header & Navigation
        logoText: "GitTree",
        navVisualizer: "Visualizzatore",
        navAbout: "Chi Siamo",
        navGuide: "Guida",
        navContact: "Contatto",
        themeToggleLight: "Passa al tema scuro",
        themeToggleDark: "Passa al tema chiaro",
        
        // Main Interface
        sectionTitle: "Visualizzatore GitHub",
        inputPlaceholder: "utente/repository o URL completo GitHub",
        btnPaste: "Incolla",
        btnVisualize: "Visualizza",
        statusDefault: "Inserisci un repository GitHub",
        
        // Controls
        controlsVisualization: "Visualizzazione",
        btnTree: "Albero",
        btnMetrics: "Metriche",
        btnCache: "Cache",
        controlsActions: "Azioni",
        btnRefresh: "Aggiorna",
        btnClearCache: "Cancella Cache",
        btnExpandAll: "Espandi Tutto",
        btnCollapseAll: "Comprimi Tutto",
        controlsExport: "Esporta",
        btnExportJSON: "JSON",
        btnExportCSV: "CSV",
        btnCopyTree: "Copia",
        
        // Search
        searchPlaceholder: "Cerca file e cartelle...",
        
        // Metrics
        metricsTitle: "Metriche del Repository",
        metricsLoading: "Caricamento metriche...",
        metricTotalFiles: "File Totali",
        metricTotalDirs: "Directory",
        metricTotalSize: "Dimensione Totale",
        metricDepth: "Profondità Mass.",
        metricLargestFile: "File Più Grande",
        
        // File Distribution
        distributionTitle: "Distribuzione File per Tipo",
        fileTypesTitle: "Tipi di File",
        
        // Status Messages
        statusAnalyzing: "Analisi repository...",
        statusLoading: "Caricamento struttura...",
        statusSuccess: "Repository caricato con successo!",
        statusError: "Errore nel caricamento del repository",
        statusPasted: "Link incollato!",
        statusCacheCleared: "Cache cancellata!",
        statusCopied: "Copiato negli appunti!",
        statusExported: "Esportato con successo!",
        
        // Accessibility
        accessibilityTitle: "Accessibilità",
        accessibilityHighContrast: "Alto Contrasto",
        accessibilityIncrease: "A+ Aumenta carattere",
        accessibilityDecrease: "A- Diminuisci carattere",
        accessibilityReset: "Carattere predefinito",
        
        // Footer
        footerPrivacy: "Informativa sulla Privacy",
        footerTerms: "Termini di Utilizzo",
        footerAbout: "Chi Siamo",
        footerGuide: "Guida",
        footerContact: "Contatto",
        footerRights: "Tutti i diritti riservati",
        
        // Cookie Banner
        cookieMessage: "Utilizziamo i cookie per migliorare la tua esperienza. Continuando, accetti la nostra",
        cookieAccept: "Accetta",
        cookieReject: "Rifiuta",
        
        // Version Tag
        versionTooltip: "Cosa fa questa versione? Vedi il registro delle modifiche completo",
        
        // Institutional Pages - Common
        backToTool: "Torna allo Strumento",
        
        // About Page
        aboutTitle: "Chi Siamo",
        aboutSubtitle: "Strumento gratuito e open-source per esplorare istantaneamente le strutture dei repository GitHub",
        aboutMission: "Cos'è GitTree?",
        aboutMissionText: "GitTree è uno strumento web gratuito che trasforma qualsiasi repository GitHub pubblico in una visualizzazione interattiva. Esplora le strutture di directory, analizza le metriche del codice e comprendi l'organizzazione del progetto — il tutto senza clonare.",
        aboutFeature1Title: "Esplorazione Visiva",
        aboutFeature1Desc: "Naviga nell'albero completo del repository in formato interattivo e intuitivo",
        aboutFeature2Title: "Metriche Dettagliate",
        aboutFeature2Desc: "Statistiche, grafici di distribuzione dei file e dati GitHub in un unico posto",
        aboutFeature3Title: "Nessuna Configurazione",
        aboutFeature3Desc: "Basta incollare un URL GitHub — nessuna registrazione, nessuna installazione",
        aboutFeature4Title: "Esporta e Condividi",
        aboutFeature4Desc: "Esporta la struttura come JSON, CSV o copiala come testo per la documentazione",
        aboutHistory: "Storia",
        aboutHistoryText1: "GitTree è nato da un'idea semplice: consentire a qualsiasi sviluppatore di visualizzare istantaneamente la struttura dei file di un repository GitHub, senza doverlo clonare. Navigare in basi di codice sconosciute può essere noioso — GitTree lo rende veloce e semplice.",
        aboutHistoryText2: "Creato nel 2025 da João Claudiano, GitTree è iniziato come un progetto personale ed è diventato uno strumento gratuito e open-source utilizzato da sviluppatori di tutto il mondo. Il nostro obiettivo è rendere l'esplorazione dei repository il più semplice e accessibile possibile.",
        aboutTeam: "Il Nostro Team",
        aboutTeamFounder: "João Claudiano",
        aboutTeamFounderRole: "Creatore e Manutentore del Progetto",
        aboutTeamFounderDesc: "Sviluppatore Fullstack · ADHD 🧠💡",
        aboutTeamCommunity: "Comunità",
        aboutTeamCommunityDesc: "Contributori & Utenti",
        aboutTeamCommunityText: "Fai parte di questo viaggio! Ogni feedback, suggerimento e utilizzo dello strumento ci aiuta a migliorare.",
        aboutTechnology: "Tecnologia",
        aboutTechnologyText: "GitTree è costruito con tecnologie moderne e affidabili:",
        aboutOpenSource: "🌐 Open Source:",
        aboutOpenSourceText: "GitTree è open-source e disponibile su GitHub. I contributi sono benvenuti!",
        aboutContributeText: "GitTree è completamente open-source. Puoi fare il fork, segnalare problemi e inviare pull request su GitHub.",
        aboutViewGitHub: "Visualizza su GitHub",
        aboutContactSupport: "Contatto e Supporto",
        aboutContactText: "Hai bisogno di aiuto o hai un suggerimento? Contattaci:",
        aboutContactEmail: "📧 Email:",
        aboutContactGitHub: "🐙 GitHub:",
        aboutContactIssues: "📄 Issues:",
        aboutContactIssuesText: "Segnala problemi o suggerisci funzionalità",
        aboutExploreMore: "Esplora di Più",
        aboutLinkGuide: "Guida Utente",
        aboutLinkGuideDesc: "Impara a usare tutte le funzionalità di GitTree",
        aboutLinkContact: "Contatto",
        aboutLinkContactDesc: "Mettiti in contatto con il team",
        aboutLinkToolDesc: "Usa lo strumento ora — è gratuito",
        aboutFooter: "© 2026 GitTree · Connettere sviluppatori in tutto il mondo · 🌳",
        
        // Contact Page
        contactTitle: "Contatto",
        contactFooter: "© GitTree · Connettere sviluppatori · 🌳",

        // Guide Page
        guideTitle: "Guida Utente GitTree",
        guideSubtitle: "Impara a usare tutte le funzionalità dello strumento di visualizzazione dei repository GitHub",
        guideFooter: "© GitTree · Strumento gratuito per sviluppatori · 🌳",

        // Privacy Policy Page
        privacyTitle: "Informativa sulla Privacy",
        privacySubtitle: "Ultimo aggiornamento: 18 gennaio 2026",
        privacyFooter: "© GitTree · Privacy per impostazione predefinita · Trasparenza per design",

        // Terms of Use Page
        termsTitle: "Termini di Utilizzo",
        termsSubtitle: "Ultimo aggiornamento: 18 gennaio 2026",
        termsFooter: "© GitTree · Uso responsabile · Trasparenza",

        // 404 Page
        notFoundTitle: "Pagina Non Trovata",
        notFoundText: "La pagina che stai cercando non esiste o è stata spostata.",
        notFoundBtn: "Torna a GitTree",
        notFoundFooter: "© GitTree · Connettere sviluppatori in tutto il mondo · 🌳",

        // Dynamic UI strings (main.js / enhanced-tree.js)
        treeBadgeFolder: "cartella",
        treeBadgeFile: "file",
        chartNoFiles: "Nessun file da mostrare",
        chartFilesUnit: "file",
        treeOther: "ALTRI",
        unknownLanguage: "Sconosciuto",

        // Guide Page – Section 1: What is GitTree?
        guideWhatIsTitle: "Cos'è GitTree?",
        guideWhatIsText: "GitTree è uno strumento web gratuito che trasforma i repository GitHub in visualizzazioni interattive, permettendoti di esplorare strutture di file, analizzare metriche e comprendere l'organizzazione del codice in modo intuitivo.",
        guideFeature1Title: "Analisi Visiva",
        guideFeature1Desc: "Vedi la struttura completa del repository in formato ad albero",
        guideFeature2Title: "Metriche Dettagliate",
        guideFeature2Desc: "Statistiche e grafici su file e cartelle",
        guideFeature3Title: "Facile da Usare",
        guideFeature3Desc: "Basta incollare l'URL di GitHub e iniziare a esplorare",

        // Guide Page – Section 2: Getting Started
        guideGettingStartedTitle: "Iniziare in 3 Passi",
        guideStep1Title: "Incolla l'URL di GitHub",
        guideStep1Text: "Nel campo principale della home page, incolla qualsiasi URL di repository GitHub pubblico.",
        guideStep1FormatsLabel: "Formati accettati:",
        guideStep2Title: "Clicca su \"Visualizza\"",
        guideStep2Text: "Lo strumento recupererà la struttura completa del repository ed elaborerà tutte le informazioni. Il processo può richiedere alcuni secondi a seconda delle dimensioni del repository.",
        guideStep3Title: "Esplora i Risultati",
        guideStep3Text: "Naviga tra le schede \"Albero\" e \"Metriche\" per esplorare diverse visualizzazioni dei dati del repository.",

        // Guide Page – Section 3: Main Features
        guideFeaturesTitle: "Funzionalità Principali",
        guideTreeViewTitle: "Vista ad Albero",
        guideTreeViewText: "Esplora la struttura gerarchica di cartelle e file:",
        guideTreeItem1: "Clicca sulle cartelle per espandere/comprimere",
        guideTreeItem2: "Usa la ricerca per trovare file specifici",
        guideTreeItem3: "Pulsanti Espandi/Comprimi per controllare l'intero albero",
        guideTreeItem4: "Copia struttura come testo o Markdown",
        guideTreeTipLabel: "Suggerimento:",
        guideTreeTipText: "Usa il pulsante \"Copia Testo\" nella barra degli strumenti per copiare la struttura in formato ASCII e incollarla nelle documentazioni.",
        guideMetricsTabTitle: "Scheda Metriche",
        guideMetricsTabText: "Ottieni informazioni sul repository:",
        guideMetricsItem1: "Conteggio file e cartelle",
        guideMetricsItem2: "Dimensione totale del repository",
        guideMetricsItem3: "Grafico di distribuzione per tipo di file",
        guideMetricsItem4: "Statistiche GitHub (stelle, fork, watcher)",

        // Guide Page – Section 4: Buttons
        guideButtonsTitle: "Cosa fa ogni pulsante?",
        guideInputFieldTitle: "Campo di Input",
        guideBtn1Title: "Incolla",
        guideBtn1Desc: "Incolla automaticamente il link del repository dagli appunti. Utile quando hai appena copiato un URL GitHub.",
        guideBtn2Title: "Visualizza",
        guideBtn2Desc: "Avvia l'analisi del repository. Recupera la struttura completa ed elabora tutte le informazioni su file e cartelle.",
        guideVisualizationTitle: "Visualizzazione",
        guideBtn3Title: "Albero",
        guideBtn3Desc: "Mostra la struttura del repository in formato ad albero gerarchico. Permette di espandere e navigare in tutte le directory e i file.",
        guideBtn4Title: "Metriche",
        guideBtn4Desc: "Visualizza statistiche e grafici sul repository, inclusi il conteggio dei file, la dimensione totale, la distribuzione per tipo e i dati GitHub.",
        guideToolsTitle: "Strumenti",
        guideBtn5Title: "Svuota Cache",
        guideBtn5Desc: "Rimuove tutti i repository salvati nella cache locale. Usalo quando vuoi liberare spazio o forzare una nuova analisi.",
        guideBtn6Title: "Ricarica",
        guideBtn6Desc: "Forza una nuova analisi del repository corrente, ignorando la cache. Utile per vedere gli aggiornamenti recenti nel repository.",
        guideExportTitle: "Esporta",
        guideBtn7Desc: "Esporta la struttura completa in formato JSON. Ideale per analisi programmatica o integrazione con altri strumenti.",
        guideBtn8Desc: "Esporta l'elenco dei file in formato CSV (foglio di calcolo). Perfetto per l'analisi in Excel, Google Sheets o altri strumenti di dati.",
        guideTreeToolbarTitle: "Barra degli Strumenti dell'Albero",
        guideBtn9Title: "Copia Testo",
        guideBtn9Desc: "Copia la struttura ad albero in formato testo ASCII. Utile per includere nelle documentazioni, nei README o per condividere la struttura.",
        guideBtn10Title: "Espandi",
        guideBtn10Desc: "Espande tutte le directory dell'albero in una volta. Mostra la struttura completa del repository.",
        guideBtn11Title: "Comprimi",
        guideBtn11Desc: "Comprime tutte le directory, mostrando solo il livello radice. Utile per una panoramica semplificata.",
        guideOtherControlsTitle: "Altri Controlli",
        guideBtn12Title: "Cambia Tema",
        guideBtn12Desc: "Pulsante nell'angolo in alto a destra che alterna tra tema chiaro e scuro. La tua preferenza viene salvata automaticamente.",
        guideBtn13Title: "Cerca File",
        guideBtn13Desc: "Campo di ricerca sopra l'albero per filtrare i file in tempo reale. Digita qualsiasi parte del nome o del percorso del file.",
        guideButtonsTipLabel: "Suggerimento Rapido:",
        guideButtonsTipText: "Passa il mouse su qualsiasi pulsante per vedere una descrizione rapida (tooltip) di cosa fa!",

        // Guide Page – Section 5: Advanced Tips
        guideAdvancedTitle: "Suggerimenti Avanzati",
        guideAdvTip1Label: "Incolla Veloce:",
        guideAdvTip1Text: "Usa il pulsante \"Incolla\" accanto al campo di input per incollare automaticamente i link copiati dagli appunti.",
        guideAdvTip2Label: "Cache Intelligente:",
        guideAdvTip2Text: "GitTree memorizza le analisi localmente. I repository analizzati di recente si caricano istantaneamente.",
        guideAdvTip3Label: "Esporta Dati:",
        guideAdvTip3Text: "Usa i pulsanti \"JSON\" o \"CSV\" per esportare l'analisi completa per uso esterno.",
        guideAdvTip4Label: "Tema Chiaro/Scuro:",
        guideAdvTip4Text: "Clicca sull'icona luna/sole nell'angolo in alto a destra per alternare tra i temi.",

        // Guide Page – Section 6: FAQ
        guideFaqTitle: "Domande Frequenti",
        guideFaq1Q: "D: GitTree funziona con repository privati?",
        guideFaq1A: "R: No, solo con repository GitHub pubblici.",
        guideFaq2Q: "D: I miei dati vengono archiviati?",
        guideFaq2A: "R: No, il codice analizzato non viene archiviato. Solo i metadati vengono conservati localmente nel browser per il caching.",
        guideFaq3Q: "D: Posso analizzare qualsiasi repository?",
        guideFaq3A: "R: Sì, qualsiasi repository GitHub pubblico. Alcuni repository molto grandi potrebbero avere la struttura troncata dall'API GitHub.",
        guideFaq4Q: "D: Lo strumento è gratuito?",
        guideFaq4A: "R: Sì, completamente gratuito e open-source."
    },
    
    ja: {
        // SEO Meta Tags
        pageTitle: "GitTree - GitHubリポジトリ構造ビューア | リポジトリを探索",
        metaDescription: "GitTree - あらゆるGitHubリポジトリの構造を視覚化および分析します。ディレクトリツリー、コードメトリクス、リアルタイム統計を探索できます。開発者向けの無料ツール。",
        metaKeywords: "github, リポジトリ, ツリー, ビューア, コード構造, githubエクスプローラー, 開発者ツール, オープンソース, コード分析, リポジトリメトリクス",
        
        // Header & Navigation
        logoText: "GitTree",
        navVisualizer: "ビューア",
        navAbout: "概要",
        navGuide: "ガイド",
        navContact: "お問い合わせ",
        themeToggleLight: "ダークテーマに切り替え",
        themeToggleDark: "ライトテーマに切り替え",
        
        // Main Interface
        sectionTitle: "GitHubビューア",
        inputPlaceholder: "ユーザー名/リポジトリまたはGitHubの完全なURL",
        btnPaste: "貼り付け",
        btnVisualize: "表示",
        statusDefault: "GitHubリポジトリを入力してください",
        
        // Controls
        controlsVisualization: "表示",
        btnTree: "ツリー",
        btnMetrics: "メトリクス",
        btnCache: "キャッシュ",
        controlsActions: "アクション",
        btnRefresh: "更新",
        btnClearCache: "キャッシュをクリア",
        btnExpandAll: "すべて展開",
        btnCollapseAll: "すべて折りたたむ",
        controlsExport: "エクスポート",
        btnExportJSON: "JSON",
        btnExportCSV: "CSV",
        btnCopyTree: "コピー",
        
        // Search
        searchPlaceholder: "ファイルとフォルダを検索...",
        
        // Metrics
        metricsTitle: "リポジトリメトリクス",
        metricsLoading: "メトリクスを読み込み中...",
        metricTotalFiles: "総ファイル数",
        metricTotalDirs: "ディレクトリ",
        metricTotalSize: "合計サイズ",
        metricDepth: "最大深度",
        metricLargestFile: "最大ファイル",
        
        // File Distribution
        distributionTitle: "タイプ別ファイル分布",
        fileTypesTitle: "ファイルタイプ",
        
        // Status Messages
        statusAnalyzing: "リポジトリを分析中...",
        statusLoading: "構造を読み込み中...",
        statusSuccess: "リポジトリの読み込みに成功しました！",
        statusError: "リポジトリの読み込みエラー",
        statusPasted: "リンクを貼り付けました！",
        statusCacheCleared: "キャッシュをクリアしました！",
        statusCopied: "クリップボードにコピーしました！",
        statusExported: "エクスポートに成功しました！",
        
        // Accessibility
        accessibilityTitle: "アクセシビリティ",
        accessibilityHighContrast: "ハイコントラスト",
        accessibilityIncrease: "A+ フォント拡大",
        accessibilityDecrease: "A- フォント縮小",
        accessibilityReset: "デフォルトフォント",
        
        // Footer
        footerPrivacy: "プライバシーポリシー",
        footerTerms: "利用規約",
        footerAbout: "概要",
        footerGuide: "ガイド",
        footerContact: "お問い合わせ",
        footerRights: "すべての権利を留保",
        
        // Cookie Banner
        cookieMessage: "Cookieを使用してエクスペリエンスを向上させています。続行することで、当社の",
        cookieAccept: "承諾",
        cookieReject: "拒否",
        
        // Version Tag
        versionTooltip: "このバージョンの機能は？完全な変更ログを表示",
        
        // Institutional Pages - Common
        backToTool: "ツールに戻る",
        
        // About Page
        aboutTitle: "概要",
        aboutSubtitle: "GitHubリポジトリの構造を即時に探索できる無料のオープンソースツール",
        aboutMission: "GitTree とは？",
        aboutMissionText: "GitTreeは、任意のパブリックGitHubリポジトリをインタラクティブな可視化に変換する無料のWebツールです。クローンすることなく、ディレクトリ構造を探索し、コードメトリクスを分析し、プロジェクトの組織を理解できます。",
        aboutFeature1Title: "視覚的な探索",
        aboutFeature1Desc: "直感的でインタラクティブな形式でリポジトリの完全なツリーをナビゲート",
        aboutFeature2Title: "詳細なメトリクス",
        aboutFeature2Desc: "統計、ファイル分布チャート、GitHubデータが一か所に",
        aboutFeature3Title: "設定不要",
        aboutFeature3Desc: "GitHubのURLを貼り付けるだけ — 登録不要、インストール不要",
        aboutFeature4Title: "エクスポートと共有",
        aboutFeature4Desc: "構造をJSON、CSVとしてエクスポート、またはドキュメント用にテキストとしてコピー",
        aboutHistory: "歴史",
        aboutHistoryText1: "GitTreeはシンプルなアイデアから生まれました：開発者がクローンすることなく、GitHubリポジトリのファイル構造を瞬時に視覚化できるようにすること。見慣れないコードベースを調べるのは時間がかかります — GitTreeはそれを速くて簡単にします。",
        aboutHistoryText2: "2025年にJoão Claudianoによって作成されたGitTreeは、個人プロジェクトとして始まり、世界中の開発者に使われる無料のオープンソースツールに成長しました。私たちの目標は、リポジトリの探索をできる限りシンプルでアクセスしやすくすることです。",
        aboutTeam: "私たちのチーム",
        aboutTeamFounder: "João Claudiano",
        aboutTeamFounderRole: "プロジェクト作成者・メンテナー",
        aboutTeamFounderDesc: "Fullstackデベロッパー · ADHD 🧠💡",
        aboutTeamCommunity: "コミュニティ",
        aboutTeamCommunityDesc: "コントリビューター & ユーザー",
        aboutTeamCommunityText: "あなたもこの旅の一部です！すべてのフィードバック、提案、ツールの使用が私たちの改善に役立ちます。",
        aboutTechnology: "技術",
        aboutTechnologyText: "GitTreeは最新の信頼性の高い技術で構築されています：",
        aboutOpenSource: "🌐 オープンソース：",
        aboutOpenSourceText: "GitTreeはオープンソースでGitHubで利用可能です。コントリビューションを歓迎します！",
        aboutContributeText: "GitTreeは完全にオープンソースです。フォーク、Issue報告、プルリクエストをGitHubで行えます。",
        aboutViewGitHub: "GitHubで表示",
        aboutContactSupport: "お問い合わせとサポート",
        aboutContactText: "お困りの点やご提案はございますか？お気軽にご連絡ください：",
        aboutContactEmail: "📧 メール：",
        aboutContactGitHub: "🐙 GitHub：",
        aboutContactIssues: "📄 Issues：",
        aboutContactIssuesText: "問題を報告するか機能を提案する",
        aboutExploreMore: "さらに探索",
        aboutLinkGuide: "ユーザーガイド",
        aboutLinkGuideDesc: "GitTreeのすべての機能の使い方を学ぶ",
        aboutLinkContact: "お問い合わせ",
        aboutLinkContactDesc: "チームに連絡する",
        aboutLinkToolDesc: "ツールを今すぐ使用 — 無料です",
        aboutFooter: "© 2026 GitTree · 世界中の開発者をつなぐ · 🌳",
        
        // Contact Page
        contactTitle: "お問い合わせ",
        contactFooter: "© GitTree · 開発者をつなぐ · 🌳",

        // Guide Page
        guideTitle: "GitTree ユーザーガイド",
        guideSubtitle: "GitHubリポジトリ可視化ツールのすべての機能の使い方を学ぶ",
        guideFooter: "© GitTree · 開発者向け無料ツール · 🌳",

        // Privacy Policy Page
        privacyTitle: "プライバシーポリシー",
        privacySubtitle: "最終更新: 2026年1月18日",
        privacyFooter: "© GitTree · デフォルトでプライバシー · デザインで透明性",

        // Terms of Use Page
        termsTitle: "利用規約",
        termsSubtitle: "最終更新: 2026年1月18日",
        termsFooter: "© GitTree · 責任ある使用 · 透明性",

        // 404 Page
        notFoundTitle: "ページが見つかりません",
        notFoundText: "お探しのページは存在しないか、移動されました。",
        notFoundBtn: "GitTreeに戻る",
        notFoundFooter: "© GitTree · 世界中の開発者をつなぐ · 🌳",

        // Dynamic UI strings (main.js / enhanced-tree.js)
        treeBadgeFolder: "フォルダ",
        treeBadgeFile: "ファイル",
        chartNoFiles: "表示するファイルがありません",
        chartFilesUnit: "ファイル",
        treeOther: "その他",
        unknownLanguage: "不明",

        // Guide Page – Section 1: What is GitTree?
        guideWhatIsTitle: "GitTreeとは?",
        guideWhatIsText: "GitTreeは、GitHubリポジトリをインタラクティブな可視化に変換する無料のウェブツールです。ファイル構造の探索、メトリクスの分析、コード構成の直感的な理解を可能にします。",
        guideFeature1Title: "ビジュアル分析",
        guideFeature1Desc: "ツリー形式でリポジトリの完全な構造を確認",
        guideFeature2Title: "詳細なメトリクス",
        guideFeature2Desc: "ファイルとフォルダに関する統計とグラフ",
        guideFeature3Title: "使いやすい",
        guideFeature3Desc: "GitHub URLを貼り付けるだけで探索を始められます",

        // Guide Page – Section 2: Getting Started
        guideGettingStartedTitle: "3ステップで始める",
        guideStep1Title: "GitHub URLを貼り付ける",
        guideStep1Text: "ホームページのメインフィールドに、任意の公開GitHubリポジトリURLを貼り付けてください。",
        guideStep1FormatsLabel: "受け付けるフォーマット：",
        guideStep2Title: "「可視化」をクリック",
        guideStep2Text: "ツールがリポジトリの完全な構造を取得し、すべての情報を処理します。リポジトリのサイズによっては数秒かかる場合があります。",
        guideStep3Title: "結果を探索する",
        guideStep3Text: "「ツリー」と「メトリクス」タブを切り替えて、リポジトリデータのさまざまな表示を探索します。",

        // Guide Page – Section 3: Main Features
        guideFeaturesTitle: "主な機能",
        guideTreeViewTitle: "ツリービュー",
        guideTreeViewText: "フォルダとファイルの階層構造を探索する：",
        guideTreeItem1: "フォルダをクリックして展開/折りたたみ",
        guideTreeItem2: "検索を使って特定のファイルを見つける",
        guideTreeItem3: "ツリー全体を制御する展開/折りたたみボタン",
        guideTreeItem4: "テキストまたはMarkdownとして構造をコピー",
        guideTreeTipLabel: "ヒント：",
        guideTreeTipText: "ツールバーの「テキストをコピー」ボタンを使って、ASCII形式の構造をコピーしてドキュメントに貼り付けます。",
        guideMetricsTabTitle: "メトリクスタブ",
        guideMetricsTabText: "リポジトリに関するインサイトを取得する：",
        guideMetricsItem1: "ファイルとフォルダの数",
        guideMetricsItem2: "リポジトリの合計サイズ",
        guideMetricsItem3: "ファイルタイプ別分布グラフ",
        guideMetricsItem4: "GitHub統計（スター、フォーク、ウォッチャー）",

        // Guide Page – Section 4: Buttons
        guideButtonsTitle: "各ボタンの機能は？",
        guideInputFieldTitle: "入力フィールド",
        guideBtn1Title: "貼り付け",
        guideBtn1Desc: "クリップボードからリポジトリリンクを自動的に貼り付けます。GitHubのURLをコピーしたばかりの時に便利です。",
        guideBtn2Title: "可視化",
        guideBtn2Desc: "リポジトリの分析を開始します。完全な構造を取得し、すべてのファイルとフォルダの情報を処理します。",
        guideVisualizationTitle: "可視化",
        guideBtn3Title: "ツリー",
        guideBtn3Desc: "リポジトリの構造を階層ツリー形式で表示します。すべてのディレクトリとファイルを展開してナビゲートできます。",
        guideBtn4Title: "メトリクス",
        guideBtn4Desc: "ファイル数、合計サイズ、タイプ別分布、GitHubデータなど、リポジトリに関する統計とグラフを表示します。",
        guideToolsTitle: "ツール",
        guideBtn5Title: "キャッシュをクリア",
        guideBtn5Desc: "ローカルキャッシュに保存されているすべてのリポジトリを削除します。スペースを解放したり、新しい分析を強制したりするときに使います。",
        guideBtn6Title: "リロード",
        guideBtn6Desc: "キャッシュを無視して現在のリポジトリの新しい分析を強制します。リポジトリの最近の更新を確認するのに便利です。",
        guideExportTitle: "エクスポート",
        guideBtn7Desc: "完全な構造をJSON形式でエクスポートします。プログラム的な分析や他のツールとの統合に最適です。",
        guideBtn8Desc: "ファイルリストをCSV形式（スプレッドシート）でエクスポートします。Excel、Google Sheetsや他のデータツールでの分析に最適です。",
        guideTreeToolbarTitle: "ツリーツールバー",
        guideBtn9Title: "テキストをコピー",
        guideBtn9Desc: "ツリー構造をASCIIテキスト形式でコピーします。ドキュメント、READMEに含めたり、構造を共有したりするのに便利です。",
        guideBtn10Title: "展開",
        guideBtn10Desc: "ツリーのすべてのディレクトリを一度に展開します。リポジトリの完全な構造を表示します。",
        guideBtn11Title: "折りたたみ",
        guideBtn11Desc: "すべてのディレクトリを折りたたみ、ルートレベルのみ表示します。簡略化した概要を確認するのに便利です。",
        guideOtherControlsTitle: "その他のコントロール",
        guideBtn12Title: "テーマ切替",
        guideBtn12Desc: "右上隅のボタンでライトテーマとダークテーマを切り替えます。設定は自動的に保存されます。",
        guideBtn13Title: "ファイル検索",
        guideBtn13Desc: "ツリー上の検索フィールドでファイルをリアルタイムにフィルタリングします。ファイル名やパスの一部を入力してください。",
        guideButtonsTipLabel: "クイックヒント：",
        guideButtonsTipText: "ボタンにマウスを乗せると、その機能の簡単な説明（ツールチップ）が表示されます！",

        // Guide Page – Section 5: Advanced Tips
        guideAdvancedTitle: "応用ヒント",
        guideAdvTip1Label: "クイック貼り付け：",
        guideAdvTip1Text: "入力フィールドの横にある「貼り付け」ボタンを使って、クリップボードからコピーしたリンクを自動的に貼り付けます。",
        guideAdvTip2Label: "スマートキャッシュ：",
        guideAdvTip2Text: "GitTreeはローカルに分析結果を保存します。最近分析したリポジトリは即座に読み込まれます。",
        guideAdvTip3Label: "データのエクスポート：",
        guideAdvTip3Text: "「JSON」または「CSV」ボタンを使って、外部利用のために完全な分析をエクスポートします。",
        guideAdvTip4Label: "ライト/ダークテーマ：",
        guideAdvTip4Text: "右上隅の月/太陽アイコンをクリックしてテーマを切り替えます。",

        // Guide Page – Section 6: FAQ
        guideFaqTitle: "よくある質問",
        guideFaq1Q: "Q: GitTreeはプライベートリポジトリでも機能しますか？",
        guideFaq1A: "A: いいえ、GitHubの公開リポジトリのみです。",
        guideFaq2Q: "Q: データは保存されますか？",
        guideFaq2A: "A: いいえ、分析されたコードは保存されません。キャッシュのためにメタデータのみがブラウザにローカルに保存されます。",
        guideFaq3Q: "Q: どんなリポジトリでも分析できますか？",
        guideFaq3A: "A: はい、すべての公開GitHubリポジトリで分析できます。非常に大きいリポジトリはGitHub APIによって構造が切り詰められる場合があります。",
        guideFaq4Q: "Q: ツールは無料ですか？",
        guideFaq4A: "A: はい、完全無料かつオープンソースです。"
    },
    
    ko: {
        // SEO Meta Tags
        pageTitle: "GitTree - GitHub 저장소 구조 시각화 도구 | 저장소 탐색",
        metaDescription: "GitTree - 모든 GitHub 저장소의 구조를 시각화하고 분석합니다. 디렉토리 트리, 코드 메트릭스, 실시간 통계를 탐색하세요. 개발자를 위한 무료 도구입니다.",
        metaKeywords: "github, 저장소, 트리, 시각화, 코드 구조, github 탐색기, 개발자 도구, 오픈소스, 코드 분석, 저장소 메트릭스",
        
        // Header & Navigation
        logoText: "GitTree",
        navVisualizer: "시각화 도구",
        navAbout: "소개",
        navGuide: "가이드",
        navContact: "연락처",
        themeToggleLight: "다크 테마로 전환",
        themeToggleDark: "라이트 테마로 전환",
        
        // Main Interface
        sectionTitle: "GitHub 시각화 도구",
        inputPlaceholder: "사용자명/저장소 또는 전체 GitHub URL",
        btnPaste: "붙여넣기",
        btnVisualize: "시각화",
        statusDefault: "GitHub 저장소를 입력하세요",
        
        // Controls
        controlsVisualization: "시각화",
        btnTree: "트리",
        btnMetrics: "메트릭스",
        btnCache: "캐시",
        controlsActions: "작업",
        btnRefresh: "새로고침",
        btnClearCache: "캐시 지우기",
        btnExpandAll: "모두 펼치기",
        btnCollapseAll: "모두 접기",
        controlsExport: "내보내기",
        btnExportJSON: "JSON",
        btnExportCSV: "CSV",
        btnCopyTree: "복사",
        
        // Search
        searchPlaceholder: "파일 및 폴더 검색...",
        
        // Metrics
        metricsTitle: "저장소 메트릭스",
        metricsLoading: "메트릭스 로드 중...",
        metricTotalFiles: "총 파일 수",
        metricTotalDirs: "디렉토리",
        metricTotalSize: "전체 크기",
        metricDepth: "최대 깊이",
        metricLargestFile: "가장 큰 파일",
        
        // File Distribution
        distributionTitle: "유형별 파일 분포",
        fileTypesTitle: "파일 유형",
        
        // Status Messages
        statusAnalyzing: "저장소 분석 중...",
        statusLoading: "구조 로드 중...",
        statusSuccess: "저장소를 성공적으로 로드했습니다!",
        statusError: "저장소 로드 오류",
        statusPasted: "링크를 붙여넣었습니다!",
        statusCacheCleared: "캐시를 지웠습니다!",
        statusCopied: "클립보드에 복사했습니다!",
        statusExported: "성공적으로 내보냈습니다!",
        
        // Accessibility
        accessibilityTitle: "접근성",
        accessibilityHighContrast: "고대비",
        accessibilityIncrease: "A+ 글꼴 크게",
        accessibilityDecrease: "A- 글꼴 작게",
        accessibilityReset: "기본 글꼴",
        
        // Footer
        footerPrivacy: "개인정보 보호정책",
        footerTerms: "이용약관",
        footerAbout: "소개",
        footerGuide: "가이드",
        footerContact: "연락처",
        footerRights: "모든 권리 보유",
        
        // Cookie Banner
        cookieMessage: "쿠키를 사용하여 경험을 개선합니다. 계속 진행하면 당사의",
        cookieAccept: "수락",
        cookieReject: "거부",
        
        // Version Tag
        versionTooltip: "이 버전의 기능은? 전체 변경 로그 보기",
        
        // Institutional Pages - Common
        backToTool: "도구로 돌아가기",
        
        // About Page
        aboutTitle: "소개",
        aboutSubtitle: "GitHub 저장소 구조를 즉시 탐색하는 무료 오픈소스 도구",
        aboutMission: "GitTree란 무엇인가요?",
        aboutMissionText: "GitTree는 공개 GitHub 저장소를 대화형 시각화로 변환하는 무료 웹 도구입니다. 클론 없이 디렉토리 구조를 탐색하고, 코드 메트릭스를 분석하고, 프로젝트 구성을 이해할 수 있습니다.",
        aboutFeature1Title: "시각적 탐색",
        aboutFeature1Desc: "직관적이고 대화형 형식으로 전체 저장소 트리 탐색",
        aboutFeature2Title: "상세 메트릭스",
        aboutFeature2Desc: "통계, 파일 분포 차트, GitHub 데이터를 한 곳에",
        aboutFeature3Title: "설정 불필요",
        aboutFeature3Desc: "GitHub URL만 붙여넣기 — 가입 불필요, 설치 불필요",
        aboutFeature4Title: "내보내기 및 공유",
        aboutFeature4Desc: "구조를 JSON, CSV로 내보내거나 문서용 텍스트로 복사",
        aboutHistory: "역사",
        aboutHistoryText1: "GitTree는 간단한 아이디어에서 탄생했습니다: 개발자가 클론 없이도 GitHub 리포지토리의 파일 구조를 즉시 시각화할 수 있도록 하는 것입니다. 낯선 코드베이스를 탐색하는 것은 시간이 걸릴 수 있습니다 — GitTree는 그것을 빠르고 쉽게 만들어 줍니다.",
        aboutHistoryText2: "2025년 João Claudiano에 의해 만들어진 GitTree는 개인 프로젝트로 시작하여 전 세계 개발자들이 사용하는 무료 오픈소스 도구로 성장했습니다. 우리의 목표는 리포지토리 탐색을 최대한 간단하고 접근하기 쉽게 만드는 것입니다.",
        aboutTeam: "우리 팀",
        aboutTeamFounder: "João Claudiano",
        aboutTeamFounderRole: "프로젝트 제작자 및 관리자",
        aboutTeamFounderDesc: "풀스택 개발자 · ADHD 🧠💡",
        aboutTeamCommunity: "커뮤니티",
        aboutTeamCommunityDesc: "기여자 & 사용자",
        aboutTeamCommunityText: "당신은 이 여정의 일부입니다! 모든 피드백, 제안, 도구 사용이 우리의 개선에 도움이 됩니다.",
        aboutTechnology: "기술",
        aboutTechnologyText: "GitTree는 최신의 신뢰할 수 있는 기술로 구축되었습니다:",
        aboutOpenSource: "🌐 오픈소스:",
        aboutOpenSourceText: "GitTree는 오픈소스이며 GitHub에서 사용 가능합니다. 기여를 환영합니다!",
        aboutContributeText: "GitTree는 완전한 오픈소스입니다. GitHub에서 포크하거나 이슈를 보고하고 풀 리퀘스트를 제출할 수 있습니다.",
        aboutViewGitHub: "GitHub에서 보기",
        aboutContactSupport: "연락처 및 지원",
        aboutContactText: "도움이 필요하거나 제안이 있으신가요? 연락해 주세요:",
        aboutContactEmail: "📧 이메일:",
        aboutContactGitHub: "🐙 GitHub:",
        aboutContactIssues: "📄 Issues:",
        aboutContactIssuesText: "문제를 보고하거나 기능을 제안하세요",
        aboutExploreMore: "더 탐색하기",
        aboutLinkGuide: "사용자 가이드",
        aboutLinkGuideDesc: "GitTree의 모든 기능 사용법 알아보기",
        aboutLinkContact: "연락처",
        aboutLinkContactDesc: "팀에 연락하기",
        aboutLinkToolDesc: "지금 바로 도구 사용 — 무료입니다",
        aboutFooter: "© 2026 GitTree · 전 세계 개발자 연결 · 🌳",
        
        // Contact Page
        contactTitle: "연락처",
        contactFooter: "© GitTree · 개발자 연결 · 🌳",

        // Guide Page
        guideTitle: "GitTree 사용자 가이드",
        guideSubtitle: "GitHub 저장소 시각화 도구의 모든 기능 사용법을 알아보세요",
        guideFooter: "© GitTree · 개발자를 위한 무료 도구 · 🌳",

        // Privacy Policy Page
        privacyTitle: "개인정보 보호정책",
        privacySubtitle: "최종 업데이트: 2026년 1월 18일",
        privacyFooter: "© GitTree · 기본적으로 프라이버시 · 설계에 의한 투명성",

        // Terms of Use Page
        termsTitle: "이용약관",
        termsSubtitle: "최종 업데이트: 2026년 1월 18일",
        termsFooter: "© GitTree · 책임 있는 사용 · 투명성",

        // 404 Page
        notFoundTitle: "페이지를 찾을 수 없습니다",
        notFoundText: "찾고 있는 페이지가 존재하지 않거나 이동되었습니다.",
        notFoundBtn: "GitTree로 돌아가기",
        notFoundFooter: "© GitTree · 전 세계 개발자 연결 · 🌳",

        // Dynamic UI strings (main.js / enhanced-tree.js)
        treeBadgeFolder: "폴더",
        treeBadgeFile: "파일",
        chartNoFiles: "표시할 파일이 없습니다",
        chartFilesUnit: "파일",
        treeOther: "기타",
        unknownLanguage: "알 수 없음",

        // Guide Page – Section 1: What is GitTree?
        guideWhatIsTitle: "GitTree란?",
        guideWhatIsText: "GitTree는 GitHub 리포지토리를 대화형 시각화로 변환하는 무료 웹 도구입니다. 파일 구조를 탐색하고, 메트릭을 분석하며, 코드 구성을 직관적으로 이해할 수 있습니다.",
        guideFeature1Title: "시각적 분석",
        guideFeature1Desc: "트리 형식으로 전체 리포지토리 구조 보기",
        guideFeature2Title: "상세 메트릭",
        guideFeature2Desc: "파일 및 폴더에 관한 통계 및 차트",
        guideFeature3Title: "사용하기 쉬움",
        guideFeature3Desc: "GitHub URL을 붙여넣고 탐색을 시작하세요",

        // Guide Page – Section 2: Getting Started
        guideGettingStartedTitle: "3단계로 시작하기",
        guideStep1Title: "GitHub URL 붙여넣기",
        guideStep1Text: "홈페이지의 주 필드에 공개 GitHub 리포지토리 URL을 붙여넣으세요.",
        guideStep1FormatsLabel: "허용 형식:",
        guideStep2Title: "\"시각화\" 클릭",
        guideStep2Text: "도구가 완전한 리포지토리 구조를 가져와 모든 정보를 처리합니다. 리포지토리 크기에 따라 몇 초가 걸릴 수 있습니다.",
        guideStep3Title: "결과 탐색하기",
        guideStep3Text: "\"트리\"와 \"메트릭\" 탭 사이를 탐색하여 리포지토리 데이터의 다양한 보기를 살펴보세요.",

        // Guide Page – Section 3: Main Features
        guideFeaturesTitle: "주요 기능",
        guideTreeViewTitle: "트리 보기",
        guideTreeViewText: "폴더와 파일의 계층 구조 탐색:",
        guideTreeItem1: "폴더를 클릭하여 펼치기/접기",
        guideTreeItem2: "검색을 사용하여 특정 파일 찾기",
        guideTreeItem3: "전체 트리를 제어하는 펼치기/접기 버튼",
        guideTreeItem4: "텍스트 또는 Markdown으로 구조 복사",
        guideTreeTipLabel: "팁:",
        guideTreeTipText: "툴바의 \"텍스트 복사\" 버튼을 사용하여 ASCII 형식의 구조를 복사하고 문서에 붙여넣으세요.",
        guideMetricsTabTitle: "메트릭 탭",
        guideMetricsTabText: "리포지토리에 대한 인사이트 얻기:",
        guideMetricsItem1: "파일 및 폴더 수",
        guideMetricsItem2: "리포지토리 총 크기",
        guideMetricsItem3: "파일 유형별 분포 차트",
        guideMetricsItem4: "GitHub 통계 (스타, 포크, 워처)",

        // Guide Page – Section 4: Buttons
        guideButtonsTitle: "각 버튼의 기능은?",
        guideInputFieldTitle: "입력 필드",
        guideBtn1Title: "붙여넣기",
        guideBtn1Desc: "클립보드에서 리포지토리 링크를 자동으로 붙여넣습니다. GitHub URL을 방금 복사했을 때 유용합니다.",
        guideBtn2Title: "시각화",
        guideBtn2Desc: "리포지토리 분석을 시작합니다. 완전한 구조를 가져와 모든 파일 및 폴더 정보를 처리합니다.",
        guideVisualizationTitle: "시각화",
        guideBtn3Title: "트리",
        guideBtn3Desc: "리포지토리 구조를 계층적 트리 형식으로 표시합니다. 모든 디렉토리와 파일을 확장하고 탐색할 수 있습니다.",
        guideBtn4Title: "메트릭",
        guideBtn4Desc: "파일 수, 총 크기, 유형 분포, GitHub 데이터 등 리포지토리에 관한 통계와 차트를 표시합니다.",
        guideToolsTitle: "도구",
        guideBtn5Title: "캐시 지우기",
        guideBtn5Desc: "로컬 캐시에 저장된 모든 리포지토리를 제거합니다. 공간을 확보하거나 새 분석을 강제할 때 사용합니다.",
        guideBtn6Title: "다시 로드",
        guideBtn6Desc: "캐시를 무시하고 현재 리포지토리를 강제로 재분석합니다. 리포지토리의 최근 업데이트를 보는 데 유용합니다.",
        guideExportTitle: "내보내기",
        guideBtn7Desc: "완전한 구조를 JSON 형식으로 내보냅니다. 프로그래밍 방식 분석이나 다른 도구와의 통합에 이상적입니다.",
        guideBtn8Desc: "파일 목록을 CSV 형식(스프레드시트)으로 내보냅니다. Excel, Google Sheets 또는 기타 데이터 도구에서 분석하기에 완벽합니다.",
        guideTreeToolbarTitle: "트리 툴바",
        guideBtn9Title: "텍스트 복사",
        guideBtn9Desc: "트리 구조를 ASCII 텍스트 형식으로 복사합니다. 문서, README에 포함하거나 구조를 공유하는 데 유용합니다.",
        guideBtn10Title: "펼치기",
        guideBtn10Desc: "트리의 모든 디렉토리를 한 번에 펼칩니다. 완전한 리포지토리 구조를 표시합니다.",
        guideBtn11Title: "접기",
        guideBtn11Desc: "모든 디렉토리를 접어 루트 수준만 표시합니다. 간략한 개요를 보는 데 유용합니다.",
        guideOtherControlsTitle: "다른 컨트롤",
        guideBtn12Title: "테마 전환",
        guideBtn12Desc: "오른쪽 상단 모서리에 있는 버튼으로 밝은 테마와 어두운 테마 사이를 전환합니다. 기본 설정이 자동으로 저장됩니다.",
        guideBtn13Title: "파일 검색",
        guideBtn13Desc: "트리 위의 검색 필드로 실시간으로 파일을 필터링합니다. 파일 이름이나 경로의 일부를 입력하세요.",
        guideButtonsTipLabel: "빠른 팁:",
        guideButtonsTipText: "버튼 위에 마우스를 올려 버튼의 기능에 대한 빠른 설명(툴팁)을 확인하세요!",

        // Guide Page – Section 5: Advanced Tips
        guideAdvancedTitle: "고급 팁",
        guideAdvTip1Label: "빠른 붙여넣기:",
        guideAdvTip1Text: "입력 필드 옆에 있는 \"붙여넣기\" 버튼을 사용하여 클립보드에서 복사한 링크를 자동으로 붙여넣으세요.",
        guideAdvTip2Label: "스마트 캐시:",
        guideAdvTip2Text: "GitTree는 분석을 로컬에 저장합니다. 최근에 분석된 리포지토리는 즉시 로드됩니다.",
        guideAdvTip3Label: "데이터 내보내기:",
        guideAdvTip3Text: "외부 사용을 위해 완전한 분석을 내보내려면 \"JSON\" 또는 \"CSV\" 버튼을 사용하세요.",
        guideAdvTip4Label: "밝음/어두움 테마:",
        guideAdvTip4Text: "오른쪽 상단 모서리의 달/태양 아이콘을 클릭하여 테마 사이를 전환하세요.",

        // Guide Page – Section 6: FAQ
        guideFaqTitle: "자주 묻는 질문",
        guideFaq1Q: "Q: GitTree는 비공개 리포지토리에서 작동합니까?",
        guideFaq1A: "A: 아니요, 공개 GitHub 리포지토리에서만 가능합니다.",
        guideFaq2Q: "Q: 내 데이터가 저장됩니까?",
        guideFaq2A: "A: 아니요, 분석된 코드는 저장되지 않습니다. 캐시를 위해 메타데이터만 브라우저에 로컬로 보관됩니다.",
        guideFaq3Q: "Q: 모든 리포지토리를 분석할 수 있습니까?",
        guideFaq3A: "A: 예, 모든 공개 GitHub 리포지토리. 일부 매우 큰 리포지토리는 GitHub API에 의해 구조가 잘릴 수 있습니다.",
        guideFaq4Q: "Q: 도구는 무료입니까?",
        guideFaq4A: "A: 예, 완전히 무료이며 오픈 소스입니다."
    },
    
    zh: {
        // SEO Meta Tags
        pageTitle: "GitTree - GitHub仓库结构可视化工具 | 探索仓库",
        metaDescription: "GitTree - 可视化和分析任何GitHub仓库的结构。探索目录树、代码指标和实时统计。为开发者提供的免费工具。",
        metaKeywords: "github, 仓库, 树形图, 可视化, 代码结构, github浏览器, 开发者工具, 开源, 代码分析, 仓库指标",
        
        // Header & Navigation
        logoText: "GitTree",
        navVisualizer: "可视化工具",
        navAbout: "关于",
        navGuide: "指南",
        navContact: "联系",
        themeToggleLight: "切换到深色主题",
        themeToggleDark: "切换到浅色主题",
        
        // Main Interface
        sectionTitle: "GitHub可视化工具",
        inputPlaceholder: "用户名/仓库 或完整的GitHub URL",
        btnPaste: "粘贴",
        btnVisualize: "可视化",
        statusDefault: "输入GitHub仓库",
        
        // Controls
        controlsVisualization: "可视化",
        btnTree: "树形图",
        btnMetrics: "指标",
        btnCache: "缓存",
        controlsActions: "操作",
        btnRefresh: "刷新",
        btnClearCache: "清除缓存",
        btnExpandAll: "全部展开",
        btnCollapseAll: "全部折叠",
        controlsExport: "导出",
        btnExportJSON: "JSON",
        btnExportCSV: "CSV",
        btnCopyTree: "复制",
        
        // Search
        searchPlaceholder: "搜索文件和文件夹...",
        
        // Metrics
        metricsTitle: "仓库指标",
        metricsLoading: "加载指标中...",
        metricTotalFiles: "总文件数",
        metricTotalDirs: "目录",
        metricTotalSize: "总大小",
        metricDepth: "最大深度",
        metricLargestFile: "最大文件",
        
        // File Distribution
        distributionTitle: "按类型的文件分布",
        fileTypesTitle: "文件类型",
        
        // Status Messages
        statusAnalyzing: "分析仓库中...",
        statusLoading: "加载结构中...",
        statusSuccess: "仓库加载成功！",
        statusError: "仓库加载错误",
        statusPasted: "链接已粘贴！",
        statusCacheCleared: "缓存已清除！",
        statusCopied: "已复制到剪贴板！",
        statusExported: "导出成功！",
        
        // Accessibility
        accessibilityTitle: "辅助功能",
        accessibilityHighContrast: "高对比度",
        accessibilityIncrease: "A+ 增大字体",
        accessibilityDecrease: "A- 减小字体",
        accessibilityReset: "默认字体",
        
        // Footer
        footerPrivacy: "隐私政策",
        footerTerms: "使用条款",
        footerAbout: "关于",
        footerGuide: "指南",
        footerContact: "联系",
        footerRights: "保留所有权利",
        
        // Cookie Banner
        cookieMessage: "我们使用Cookie来改善您的体验。继续使用即表示您同意我们的",
        cookieAccept: "接受",
        cookieReject: "拒绝",
        
        // Version Tag
        versionTooltip: "此版本的功能？查看完整的更改日志",
        
        // Institutional Pages - Common
        backToTool: "返回工具",
        
        // About Page
        aboutTitle: "关于",
        aboutSubtitle: "免费开源工具，即时探索 GitHub 仓库结构",
        aboutMission: "GitTree 是什么？",
        aboutMissionText: "GitTree 是一款免费的网络工具，可将任何公开的 GitHub 仓库转换为交互式可视化。无需克隆，即可探索目录结构、分析代码指标，了解项目组织。",
        aboutFeature1Title: "视觉探索",
        aboutFeature1Desc: "以直观、交互式的格式浏览完整的仓库树",
        aboutFeature2Title: "详细指标",
        aboutFeature2Desc: "统计数据、文件分布图表和 GitHub 数据集于一处",
        aboutFeature3Title: "无需配置",
        aboutFeature3Desc: "只需粘贴 GitHub URL — 无需注册，无需安装",
        aboutFeature4Title: "导出与分享",
        aboutFeature4Desc: "将结构导出为 JSON、CSV，或复制为文档文本",
        aboutHistory: "历史",
        aboutHistoryText1: "GitTree 诞生于一个简单的想法：让任何开发者无需克隆即可即时可视化 GitHub 仓库的文件结构。浏览陌生的代码库可能耗时费力 — GitTree 让这一过程变得快速而轻松。",
        aboutHistoryText2: "GitTree 由 João Claudiano 于 2025 年创建，从一个个人项目成长为全球开发者使用的免费开源工具。我们的目标是让仓库探索尽可能简单易用。",
        aboutTeam: "我们的团队",
        aboutTeamFounder: "João Claudiano",
        aboutTeamFounderRole: "项目创建者和维护者",
        aboutTeamFounderDesc: "全栈开发者 · ADHD 🧠💡",
        aboutTeamCommunity: "社区",
        aboutTeamCommunityDesc: "贡献者 & 用户",
        aboutTeamCommunityText: "您是这段旅程的一部分！每一个反馈、建议和对工具的使用都有助于我们改进。",
        aboutTechnology: "技术",
        aboutTechnologyText: "GitTree 使用现代可靠的技术构建：",
        aboutOpenSource: "🌐 开源：",
        aboutOpenSourceText: "GitTree 是开源项目，可在 GitHub 上获取。欢迎贡献！",
        aboutContributeText: "GitTree 完全开源。您可以在 GitHub 上 Fork、报告问题或提交 Pull Request。",
        aboutViewGitHub: "在 GitHub 上查看",
        aboutContactSupport: "联系与支持",
        aboutContactText: "需要帮助或有建议？请联系我们：",
        aboutContactEmail: "📧 邮箱：",
        aboutContactGitHub: "🐙 GitHub：",
        aboutContactIssues: "📄 Issues：",
        aboutContactIssuesText: "报告问题或建议功能",
        aboutExploreMore: "探索更多",
        aboutLinkGuide: "用户指南",
        aboutLinkGuideDesc: "了解如何使用 GitTree 的所有功能",
        aboutLinkContact: "联系",
        aboutLinkContactDesc: "与团队取得联系",
        aboutLinkToolDesc: "立即使用工具 — 免费",
        aboutFooter: "© 2026 GitTree · 连接世界各地的开发者 · 🌳",
        
        // Contact Page
        contactTitle: "联系",
        contactFooter: "© GitTree · 连接开发者 · 🌳",

        // Guide Page
        guideTitle: "GitTree 用户指南",
        guideSubtitle: "学习如何使用 GitHub 仓库可视化工具的所有功能",
        guideFooter: "© GitTree · 为开发者提供的免费工具 · 🌳",

        // Privacy Policy Page
        privacyTitle: "隐私政策",
        privacySubtitle: "最后更新：2026年1月18日",
        privacyFooter: "© GitTree · 默认隐私 · 透明设计",

        // Terms of Use Page
        termsTitle: "使用条款",
        termsSubtitle: "最后更新：2026年1月18日",
        termsFooter: "© GitTree · 负责任使用 · 透明度",

        // 404 Page
        notFoundTitle: "页面未找到",
        notFoundText: "您正在寻找的页面不存在或已被移动。",
        notFoundBtn: "返回 GitTree",
        notFoundFooter: "© GitTree · 连接世界各地的开发者 · 🌳",

        // Dynamic UI strings (main.js / enhanced-tree.js)
        treeBadgeFolder: "文件夹",
        treeBadgeFile: "文件",
        chartNoFiles: "没有文件可显示",
        chartFilesUnit: "文件",
        treeOther: "其他",
        unknownLanguage: "未知",

        // Guide Page – Section 1: What is GitTree?
        guideWhatIsTitle: "什么是 GitTree？",
        guideWhatIsText: "GitTree 是一个免费的网络工具，可将 GitHub 仓库转换为交互式可视化图，让您直观地探索文件结构、分析指标并了解代码组织。",
        guideFeature1Title: "可视化分析",
        guideFeature1Desc: "以树形格式查看完整的仓库结构",
        guideFeature2Title: "详细指标",
        guideFeature2Desc: "关于文件和文件夹的统计和图表",
        guideFeature3Title: "易于使用",
        guideFeature3Desc: "只需粘贴 GitHub URL，即可开始探索",

        // Guide Page – Section 2: Getting Started
        guideGettingStartedTitle: "3步开始",
        guideStep1Title: "粘贴 GitHub URL",
        guideStep1Text: "在主页的主字段中，粘贴任意公共 GitHub 仓库 URL。",
        guideStep1FormatsLabel: "接受的格式：",
        guideStep2Title: "点击 \"可视化\"",
        guideStep2Text: "该工具将获取完整的仓库结构并处理所有信息。根据仓库大小，该过程可能需要几秒钟。",
        guideStep3Title: "探索结果",
        guideStep3Text: "在 \"树形\" 和 \"指标\" 选项卡之间切换，探索仓库数据的不同视图。",

        // Guide Page – Section 3: Main Features
        guideFeaturesTitle: "主要功能",
        guideTreeViewTitle: "树形视图",
        guideTreeViewText: "探索文件夹和文件的层次结构：",
        guideTreeItem1: "点击文件夹展开/折叠",
        guideTreeItem2: "使用搜索查找特定文件",
        guideTreeItem3: "展开/折叠按钮控制整个树",
        guideTreeItem4: "将结构复制为文本或 Markdown",
        guideTreeTipLabel: "提示：",
        guideTreeTipText: "使用工具栏中的 \"复制文本\" 按钮以 ASCII 格式复制结构并粘贴到文档中。",
        guideMetricsTabTitle: "指标选项卡",
        guideMetricsTabText: "获取关于仓库的洞察：",
        guideMetricsItem1: "文件和文件夹数量",
        guideMetricsItem2: "仓库总大小",
        guideMetricsItem3: "按文件类型分布图表",
        guideMetricsItem4: "GitHub 统计数据（星标、Fork、Watch）",

        // Guide Page – Section 4: Buttons
        guideButtonsTitle: "每个按钮的作用？",
        guideInputFieldTitle: "输入字段",
        guideBtn1Title: "粘贴",
        guideBtn1Desc: "自动从剪贴板粘贴仓库链接。在您刚刚复制 GitHub URL 时很有用。",
        guideBtn2Title: "可视化",
        guideBtn2Desc: "开始分析仓库。获取完整结构并处理所有文件和文件夹信息。",
        guideVisualizationTitle: "可视化",
        guideBtn3Title: "树形",
        guideBtn3Desc: "以层次树形格式显示仓库结构。允许展开并浏览所有目录和文件。",
        guideBtn4Title: "指标",
        guideBtn4Desc: "显示关于仓库的统计数据和图表，包括文件数量、总大小、类型分布和 GitHub 数据。",
        guideToolsTitle: "工具",
        guideBtn5Title: "清除缓存",
        guideBtn5Desc: "删除本地缓存中保存的所有仓库。当您想释放空间或强制进行新分析时使用。",
        guideBtn6Title: "重新加载",
        guideBtn6Desc: "强制重新分析当前仓库，忽略缓存。用于查看仓库的最新更新。",
        guideExportTitle: "导出",
        guideBtn7Desc: "以 JSON 格式导出完整结构。非常适合编程分析或与其他工具集成。",
        guideBtn8Desc: "以 CSV 格式（电子表格）导出文件列表。非常适合在 Excel、Google Sheets 或其他数据工具中进行分析。",
        guideTreeToolbarTitle: "树形工具栏",
        guideBtn9Title: "复制文本",
        guideBtn9Desc: "以 ASCII 文本格式复制树形结构。适合包含在文档、README 中或共享结构。",
        guideBtn10Title: "展开",
        guideBtn10Desc: "一次展开树形中的所有目录。显示完整的仓库结构。",
        guideBtn11Title: "折叠",
        guideBtn11Desc: "折叠所有目录，只显示根级别。用于获得简化的概览。",
        guideOtherControlsTitle: "其他控件",
        guideBtn12Title: "切换主题",
        guideBtn12Desc: "右上角的按钮可在浅色和深色主题之间切换。您的偏好将自动保存。",
        guideBtn13Title: "搜索文件",
        guideBtn13Desc: "树形上方的搜索字段可实时过滤文件。输入文件名或路径的任意部分。",
        guideButtonsTipLabel: "快速提示：",
        guideButtonsTipText: "将鼠标悬停在任何按钮上，即可查看该按钮功能的快速说明（工具提示）！",

        // Guide Page – Section 5: Advanced Tips
        guideAdvancedTitle: "高级提示",
        guideAdvTip1Label: "快速粘贴：",
        guideAdvTip1Text: "使用输入字段旁边的 \"粘贴\" 按钮自动粘贴从剪贴板复制的链接。",
        guideAdvTip2Label: "智能缓存：",
        guideAdvTip2Text: "GitTree 在本地存储分析结果。最近分析的仓库可以即时加载。",
        guideAdvTip3Label: "导出数据：",
        guideAdvTip3Text: "使用 \"JSON\" 或 \"CSV\" 按钮导出完整分析以供外部使用。",
        guideAdvTip4Label: "浅色/深色主题：",
        guideAdvTip4Text: "点击右上角的月亮/太阳图标在主题之间切换。",

        // Guide Page – Section 6: FAQ
        guideFaqTitle: "常见问题",
        guideFaq1Q: "问：GitTree 是否适用于私有仓库？",
        guideFaq1A: "答：不，仅适用于公共 GitHub 仓库。",
        guideFaq2Q: "问：我的数据会被存储吗？",
        guideFaq2A: "答：不，分析的代码不会被存储。只有元数据会在您的浏览器中本地保留以供缓存。",
        guideFaq3Q: "问：我可以分析任何仓库吗？",
        guideFaq3A: "答：是的，任何公共 GitHub 仓库。一些非常大的仓库可能会因 GitHub API 而截断其结构。",
        guideFaq4Q: "问：该工具免费吗？",
        guideFaq4A: "答：是的，完全免费且开源。"
    }
};

// Language names in their native forms
const languageNames = {
    en: "English",
    pt: "Português",
    es: "Español",
    fr: "Français",
    it: "Italiano",
    ja: "日本語",
    ko: "한국어",
    zh: "中文"
};

// Current language state
let currentLanguage = 'en';

/**
 * Initialize the i18n system
 * Detects browser language, loads user preference, and applies translations
 */
function initI18n() {
    // Try to get saved language from localStorage
    const savedLanguage = localStorage.getItem('gittree-language');
    
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    } else {
        // Detect browser language
        const browserLang = navigator.language || navigator.userLanguage || 'en';
        const langCode = browserLang ? browserLang.split('-')[0] : 'en'; // Extract base language (e.g., 'pt' from 'pt-BR')
        
        if (translations[langCode]) {
            currentLanguage = langCode;
        } else {
            currentLanguage = 'en'; // Default to English
        }
    }
    
    // Apply the detected/saved language
    setLanguage(currentLanguage);
    
    console.log(`🌍 i18n initialized: ${languageNames[currentLanguage]} (${currentLanguage})`);
}

/**
 * Set and apply a language
 * @param {string} langCode - Language code (e.g., 'en', 'pt', 'ja')
 */
function setLanguage(langCode) {
    if (!translations[langCode]) {
        console.error(`Language '${langCode}' not found. Falling back to English.`);
        langCode = 'en';
    }
    
    currentLanguage = langCode;
    localStorage.setItem('gittree-language', langCode);
    
    // Apply translations to UI
    applyTranslations();
    
    // Update SEO meta tags
    updateSEO();
    
    // Update language selector if it exists
    updateLanguageSelector();
    
    console.log(`✅ Language changed to: ${languageNames[langCode]}`);
}

/**
 * Apply translations to all elements with data-i18n attribute
 */
function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    const t = translations[currentLanguage];
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (t[key]) {
            // Check if element is an input with placeholder
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', t[key]);
            } else {
                element.textContent = t[key];
            }
        }
    });
}

/**
 * Update SEO meta tags dynamically
 */
function updateSEO() {
    const t = translations[currentLanguage];
    
    // Update page title - use data-i18n key from <title> if present, otherwise use pageTitle
    const titleEl = document.querySelector('title');
    const titleKey = titleEl && titleEl.getAttribute('data-i18n');
    if (titleKey && t[titleKey]) {
        document.title = t[titleKey];
    } else if (t.pageTitle) {
        document.title = t.pageTitle;
    }
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', t.metaDescription);
    }
    
    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
    }
    if (t.metaKeywords) {
        metaKeywords.setAttribute('content', t.metaKeywords);
    }
    
    // Update html lang attribute
    document.documentElement.setAttribute('lang', currentLanguage);
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && t.pageTitle) ogTitle.setAttribute('content', t.pageTitle);
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && t.metaDescription) ogDescription.setAttribute('content', t.metaDescription);
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle && t.pageTitle) twitterTitle.setAttribute('content', t.pageTitle);
    
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription && t.metaDescription) twitterDescription.setAttribute('content', t.metaDescription);
}

/**
 * Update the language selector dropdown value
 */
function updateLanguageSelector() {
    const selector = document.getElementById('languageSelector');
    if (selector) {
        selector.value = currentLanguage;
    }
}

/**
 * Get translated text for a key
 * @param {string} key - Translation key
 * @returns {string} Translated text or key if not found
 */
function t(key) {
    return translations[currentLanguage][key] || key;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations, languageNames, initI18n, setLanguage, t };
}
