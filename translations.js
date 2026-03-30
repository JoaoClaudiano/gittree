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
        notFoundFooter: "© GitTree · Connecting developers around the world · 🌳"
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
        notFoundFooter: "© GitTree · Conectando desenvolvedores ao redor do mundo · 🌳"
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
        notFoundFooter: "© GitTree · Conectando desarrolladores alrededor del mundo · 🌳"
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
        notFoundFooter: "© GitTree · Connecter les développeurs du monde entier · 🌳"
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
        notFoundFooter: "© GitTree · Connettere sviluppatori in tutto il mondo · 🌳"
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
        notFoundFooter: "© GitTree · 世界中の開発者をつなぐ · 🌳"
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
        notFoundFooter: "© GitTree · 전 세계 개발자 연결 · 🌳"
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
        notFoundFooter: "© GitTree · 连接世界各地的开发者 · 🌳"
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
