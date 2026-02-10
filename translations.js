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
        aboutTitle: "About",
        aboutHistory: "History",
        aboutHistoryText1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia velit velit, in fermentum elit tristique eget.",
        aboutHistoryText2: "Phasellus vestibulum neque neque, id vehicula augue mollis eget. Donec eleifend orci eu felis consequat, id feugiat libero condimentum.",
        aboutTeam: "Our Team",
        aboutTeamFounder: "Joao Claudiano",
        aboutTeamFounderDesc: "Fullstack Developer and Proud ADHD 🧠💡",
        aboutTeamFounderRole: "Project Ideator 👍",
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
        aboutContactSupport: "Contact & Support",
        aboutContactText: "Need help or have a suggestion? Get in touch:",
        aboutContactEmail: "📧 Email:",
        aboutContactGitHub: "🐙 GitHub:",
        aboutContactIssues: "📄 Issues:",
        aboutContactIssuesText: "Report problems or suggest features",
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
        contactFooter: "© GitTree · Connecting developers · 🌳"
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
        aboutTitle: "Sobre",
        aboutHistory: "História",
        aboutHistoryText1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia velit velit, in fermentum elit tristique eget.",
        aboutHistoryText2: "Phasellus vestibulum neque neque, id vehicula augue mollis eget. Donec eleifend orci eu felis consequat, id feugiat libero condimentum.",
        aboutTeam: "Nossa Equipe",
        aboutTeamFounder: "Joao Claudiano",
        aboutTeamFounderDesc: "Desenvolvedor Fullstack e TDAH Orgulhoso 🧠💡",
        aboutTeamFounderRole: "Idealizador do projeto 👍",
        aboutTeamCommunity: "Comunidade",
        aboutTeamCommunityDesc: "Contribuidores & Usuários",
        aboutTeamCommunityText: "Você faz parte dessa jornada! Cada feedback, sugestão e uso da ferramenta nos ajuda a melhorar.",
        aboutTechnology: "Tecnologia",
        aboutTechnologyText: "O GitTree é construído com tecnologias modernas e confiáveis:",
        aboutTechFrontend: "Frontend:",
        aboutTechFrontendDesc: "HTML5, CSS3, JavaScript (ES6+)",
        aboutTechAPIs: "APIs:",
        aboutTechAPIsDesc: "GitHub REST API v3",
        aboutTechHosting: "Hospedagem:",
        aboutTechHostingDesc: "GitHub Pages",
        aboutTechDesign: "Design:",
        aboutTechDesignDesc: "CSS Custom Properties para temas",
        aboutOpenSource: "🌐 Código Aberto:",
        aboutOpenSourceText: "O GitTree é open-source e disponível no GitHub. Contribuições são bem-vindas!",
        aboutContactSupport: "Contato & Suporte",
        aboutContactText: "Precisa de ajuda ou tem uma sugestão? Entre em contato:",
        aboutContactEmail: "📧 Email:",
        aboutContactGitHub: "🐙 GitHub:",
        aboutContactIssues: "📄 Issues:",
        aboutContactIssuesText: "Reportar problemas ou sugerir funcionalidades",
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
        contactFooter: "© GitTree · Conectando desenvolvedores · 🌳"
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
        aboutHistory: "Historia",
        aboutTeam: "Nuestro Equipo",
        aboutTeamFounder: "Joao Claudiano",
        aboutTeamCommunity: "Comunidad",
        aboutTechnology: "Tecnología",
        aboutContactSupport: "Contacto y Soporte",
        aboutFooter: "© 2026 GitTree · Conectando desarrolladores alrededor del mundo · 🌳",
        
        // Contact Page
        contactTitle: "Contacto",
        contactOtherChannels: "Otros Canales",
        contactImportantInfo: "Información Importante",
        contactFooter: "© GitTree · Conectando desarrolladores · 🌳"
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
        aboutHistory: "Histoire",
        aboutTeam: "Notre Équipe",
        aboutTechnology: "Technologie",
        aboutContactSupport: "Contact et Support",
        aboutFooter: "© 2026 GitTree · Connecter les développeurs du monde entier · 🌳",
        
        // Contact Page
        contactTitle: "Contact",
        contactFooter: "© GitTree · Connecter les développeurs · 🌳"
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
        aboutHistory: "Storia",
        aboutTeam: "Il Nostro Team",
        aboutTechnology: "Tecnologia",
        aboutContactSupport: "Contatto e Supporto",
        aboutFooter: "© 2026 GitTree · Connettere sviluppatori in tutto il mondo · 🌳",
        
        // Contact Page
        contactTitle: "Contatto",
        contactFooter: "© GitTree · Connettere sviluppatori · 🌳"
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
        aboutHistory: "歴史",
        aboutTeam: "私たちのチーム",
        aboutTechnology: "技術",
        aboutContactSupport: "お問い合わせとサポート",
        aboutFooter: "© 2026 GitTree · 世界中の開発者をつなぐ · 🌳",
        
        // Contact Page
        contactTitle: "お問い合わせ",
        contactFooter: "© GitTree · 開発者をつなぐ · 🌳"
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
        aboutHistory: "역사",
        aboutTeam: "우리 팀",
        aboutTechnology: "기술",
        aboutContactSupport: "연락처 및 지원",
        aboutFooter: "© 2026 GitTree · 전 세계 개발자 연결 · 🌳",
        
        // Contact Page
        contactTitle: "연락처",
        contactFooter: "© GitTree · 개발자 연결 · 🌳"
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
        aboutHistory: "历史",
        aboutTeam: "我们的团队",
        aboutTechnology: "技术",
        aboutContactSupport: "联系与支持",
        aboutFooter: "© 2026 GitTree · 连接世界各地的开发者 · 🌳",
        
        // Contact Page
        contactTitle: "联系",
        contactFooter: "© GitTree · 连接开发者 · 🌳"
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
    
    // Update page title
    document.title = t.pageTitle;
    
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
    metaKeywords.setAttribute('content', t.metaKeywords);
    
    // Update html lang attribute
    document.documentElement.setAttribute('lang', currentLanguage);
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', t.pageTitle);
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', t.metaDescription);
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', t.pageTitle);
    
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', t.metaDescription);
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
