# 🏗️ Implementation Guide (Boilerplate) - Architecture & SEO Best Practices

> **Guia de Implementação Técnica**  
> Metodologia, padrões arquiteturais e configurações de SEO extraídos de projeto de referência.  
> Este documento serve como boilerplate para novos projetos que buscam a mesma qualidade técnica.

---

## 📋 Índice

1. [Visão Geral da Arquitetura](#-visão-geral-da-arquitetura)
2. [Estrutura de Pastas Recomendada](#-estrutura-de-pastas-recomendada)
3. [Configuração de SEO Técnico](#-configuração-de-seo-técnico)
4. [Meta Tags Dinâmicas](#-meta-tags-dinâmicas)
5. [Componentes Reutilizáveis](#-componentes-reutilizáveis)
6. [Middleware e Scripts de Automação](#-middleware-e-scripts-de-automação)
7. [PWA e Manifest](#-pwa-e-manifest)
8. [Performance e Cache](#-performance-e-cache)
9. [Acessibilidade](#-acessibilidade)
10. [Analytics e Monitoramento](#-analytics-e-monitoramento)

---

## 🏛️ Visão Geral da Arquitetura

### Princípios Fundamentais

#### 1. **Arquitetura Modular**
- Separação clara de responsabilidades
- Componentes independentes e reutilizáveis
- Baixo acoplamento entre módulos

#### 2. **Componentização**
```
📦 Core Components Pattern
├── UI Components (bento-panel, skeleton-loader, ai-sidebar)
├── Utility Modules (utils.js, github-api.js)
├── Feature Modules (enhanced-tree.js, accessibility-enhancements.js)
└── Main Orchestrator (main.js, components.js)
```

#### 3. **Progressive Enhancement**
- Funcionalidade básica sem JavaScript
- Melhorias progressivas com JS
- Graceful degradation para browsers antigos

---

## 📁 Estrutura de Pastas Recomendada

### Template Base

```
project-root/
│
├── 📄 index.html                    # Página principal (SEO otimizado)
├── 📄 404.html                      # Página de erro customizada
│
├── 📂 assets/
│   ├── 📂 css/
│   │   ├── style.css               # Estilos principais
│   │   └── institutional.css        # Estilos institucionais
│   │
│   ├── 📂 js/
│   │   ├── main.js                 # Orquestrador principal
│   │   ├── components.js           # Componentes React/Vue
│   │   ├── utils.js                # Funções utilitárias
│   │   └── 📂 modules/
│   │       ├── api-integration.js  # Integrações externas
│   │       ├── skeleton-loader.js  # Componente de loading
│   │       ├── ai-sidebar.js       # Navegação inteligente
│   │       └── bento-panel.js      # Painel de metadados
│   │
│   └── 📂 icons/
│       ├── android-chrome-192x192.png
│       ├── android-chrome-512x512.png
│       ├── apple-touch-icon.png
│       └── favicon.ico
│
├── 📂 pages/
│   ├── sobre.html                  # Página institucional
│   ├── contato.html                # Formulário de contato
│   ├── guia.html                   # Documentação/Tutorial
│   ├── politica-de-privacidade.html
│   └── termos.html
│
├── 📂 seo/
│   ├── robots.txt                  # Controle de crawlers
│   ├── sitemap.xml                 # Mapa do site
│   └── manifest.json               # PWA manifest
│
├── 📂 docs/
│   ├── README.md                   # Documentação principal
│   ├── DEMO-GUIDE.md              # Guia de demonstração
│   ├── FEATURES-2026.md           # Documentação de features
│   └── IMPLEMENTATION-GUIDE.md    # Este arquivo
│
└── 📂 config/
    ├── _config.yml                 # Config Jekyll (GitHub Pages)
    └── service-worker.js           # Service Worker para PWA
```

---

## 🔍 Configuração de SEO Técnico

### 1. Robots.txt (Controle de Crawlers)

**Localização:** `/robots.txt`

```txt
# Template Robots.txt - SEO Best Practices

User-agent: *
Allow: /

# Bloquear áreas administrativas
Disallow: /admin/
Disallow: /private/
Disallow: /temp/
Disallow: /*.json$

# Bloquear arquivos de configuração
Disallow: /config/
Disallow: /.git/

# Permitir assets públicos
Allow: /assets/
Allow: /icons/
Allow: /*.css$
Allow: /*.js$

# Sitemap location
Sitemap: https://yourdomain.com/sitemap.xml
```

**Regras de Ouro:**
- ✅ Sempre incluir URL do Sitemap
- ✅ Bloquear diretórios sensíveis
- ✅ Permitir recursos estáticos (CSS, JS, images)
- ✅ Usar caminhos absolutos para Sitemap

---

### 2. Sitemap.xml (Mapa do Site)

**Localização:** `/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    
    <!-- Homepage - Prioridade Máxima -->
    <url>
        <loc>https://yourdomain.com/index.html</loc>
        <lastmod>2026-01-01</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    
    <!-- Páginas Principais - Alta Prioridade -->
    <url>
        <loc>https://yourdomain.com/sobre.html</loc>
        <lastmod>2026-01-01</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>
    
    <url>
        <loc>https://yourdomain.com/guia.html</loc>
        <lastmod>2026-01-01</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <!-- Páginas Institucionais - Média Prioridade -->
    <url>
        <loc>https://yourdomain.com/politica-de-privacidade.html</loc>
        <lastmod>2026-01-01</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.7</priority>
    </url>
    
    <url>
        <loc>https://yourdomain.com/termos.html</loc>
        <lastmod>2026-01-01</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.7</priority>
    </url>
    
    <!-- Página de Contato -->
    <url>
        <loc>https://yourdomain.com/contato.html</loc>
        <lastmod>2026-01-01</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.6</priority>
    </url>
    
</urlset>
```

**Frequências Recomendadas:**
| Tipo de Página | changefreq | priority | Atualização |
|---------------|------------|----------|-------------|
| Homepage | daily | 1.0 | Conteúdo dinâmico |
| Páginas principais | weekly | 0.8-0.9 | Features/produtos |
| Blog posts | monthly | 0.6-0.7 | Artigos |
| Páginas institucionais | yearly | 0.7 | Políticas/termos |
| Contato/FAQ | yearly | 0.5-0.6 | Raramente muda |

---

## 🏷️ Meta Tags Dinâmicas

### Template HTML5 com SEO Completo

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <!-- ===== CONFIGURAÇÕES BÁSICAS ===== -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- ===== SEO PRIMÁRIO ===== -->
    <title>Título da Página | Nome do Projeto</title>
    <meta name="description" content="Descrição concisa e atraente (150-160 caracteres) com palavras-chave relevantes.">
    <meta name="keywords" content="palavra1, palavra2, palavra3">
    <meta name="author" content="Nome do Autor">
    
    <!-- ===== CANONICAL URL (Evita conteúdo duplicado) ===== -->
    <link rel="canonical" href="https://yourdomain.com/pagina-atual">
    
    <!-- ===== ROBOTS CONTROL ===== -->
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    
    <!-- ===== GOOGLE VERIFICATION ===== -->
    <meta name="google-site-verification" content="SEU_CÓDIGO_AQUI">
    
    <!-- ===== OPEN GRAPH / FACEBOOK ===== -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://yourdomain.com/">
    <meta property="og:title" content="Título para Compartilhamento Social">
    <meta property="og:description" content="Descrição para redes sociais (mais detalhada)">
    <meta property="og:image" content="https://yourdomain.com/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="pt_BR">
    <meta property="og:site_name" content="Nome do Site">
    
    <!-- ===== TWITTER CARDS ===== -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://yourdomain.com/">
    <meta property="twitter:title" content="Título para Twitter">
    <meta property="twitter:description" content="Descrição para Twitter">
    <meta property="twitter:image" content="https://yourdomain.com/twitter-image.png">
    <meta property="twitter:creator" content="@seu_usuario">
    <meta property="twitter:site" content="@site_oficial">
    
    <!-- ===== SCHEMA.ORG JSON-LD (Rich Snippets) ===== -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Nome da Aplicação",
      "description": "Descrição detalhada",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Person",
        "name": "Nome do Desenvolvedor"
      },
      "datePublished": "2026-01-01",
      "softwareVersion": "1.0",
      "url": "https://yourdomain.com/",
      "image": "https://yourdomain.com/app-image.png"
    }
    </script>
    
    <!-- ===== FAVICONS & PWA ===== -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#24292e">
    
    <!-- ===== PRECONNECT (Performance) ===== -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdn.jsdelivr.net">
    
    <!-- ===== STYLESHEETS ===== -->
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
</head>
<body>
    <!-- Conteúdo aqui -->
</body>
</html>
```

### Checklist de Meta Tags Obrigatórias

#### ✅ SEO Básico
- [ ] `<title>` único e descritivo (50-60 caracteres)
- [ ] `<meta name="description">` (150-160 caracteres)
- [ ] `<link rel="canonical">` para evitar duplicação
- [ ] `<meta name="robots">` configurado adequadamente

#### ✅ Open Graph (Facebook, LinkedIn)
- [ ] `og:type`, `og:url`, `og:title`, `og:description`
- [ ] `og:image` (1200x630px recomendado)
- [ ] `og:locale` e `og:site_name`

#### ✅ Twitter Cards
- [ ] `twitter:card` (summary_large_image)
- [ ] `twitter:title`, `twitter:description`, `twitter:image`
- [ ] `twitter:creator` e `twitter:site`

#### ✅ Schema.org
- [ ] JSON-LD apropriado para o tipo de conteúdo
- [ ] Dados estruturados validados (Google Rich Results Test)

---

## 🧩 Componentes Reutilizáveis

### Padrão de Componente Modular

#### 1. **Skeleton Loader** (Loading States)

```javascript
/**
 * SKELETON LOADER - Padrão de Loading State
 * 
 * Propósito: Melhorar UX durante carregamento de dados
 * Uso: Mostrar estrutura visual antes do conteúdo real
 */

class SkeletonLoader {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            levels: options.levels || 5,
            itemsPerLevel: options.itemsPerLevel || 3,
            animationDuration: options.animationDuration || '1.5s',
            ...options
        };
    }

    show() {
        this.container.innerHTML = this.generateSkeletonHTML();
        this.container.classList.add('skeleton-active');
    }

    hide() {
        this.container.classList.remove('skeleton-active');
    }

    generateSkeletonHTML() {
        // Implementação da estrutura de skeleton
        return `<div class="skeleton-wrapper">...</div>`;
    }
}

// CSS necessário
const skeletonCSS = `
.skeleton-item {
    background: linear-gradient(90deg, 
        #f0f0f0 25%, 
        #e0e0e0 50%, 
        #f0f0f0 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}
`;
```

**Quando usar:**
- ✅ Carregamento de listas/tabelas
- ✅ Fetch de dados de API
- ✅ Renderização de componentes pesados
- ✅ Transições entre páginas

---

#### 2. **Modal/Panel System** (Bento UI Pattern)

```javascript
/**
 * MODAL SYSTEM - Padrão Bento UI
 * 
 * Características:
 * - Glassmorphism design
 * - Acessível (ARIA, keyboard)
 * - Responsivo
 * - Animações suaves
 */

class BentoModal {
    constructor(options = {}) {
        this.options = {
            title: options.title || 'Modal',
            content: options.content || '',
            onClose: options.onClose || (() => {}),
            closeOnEscape: options.closeOnEscape !== false,
            closeOnOutsideClick: options.closeOnOutsideClick !== false
        };
        
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createModalElements();
        this.attachEventListeners();
    }

    createModalElements() {
        // Criar estrutura HTML do modal
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal-overlay';
        this.overlay.setAttribute('role', 'dialog');
        this.overlay.setAttribute('aria-modal', 'true');
        
        // ... resto da implementação
    }

    open() {
        this.isOpen = true;
        document.body.appendChild(this.overlay);
        document.body.style.overflow = 'hidden';
        
        // Animação de entrada
        requestAnimationFrame(() => {
            this.overlay.classList.add('modal-active');
        });
    }

    close() {
        this.isOpen = false;
        this.overlay.classList.remove('modal-active');
        
        setTimeout(() => {
            document.body.removeChild(this.overlay);
            document.body.style.overflow = '';
            this.options.onClose();
        }, 300);
    }

    attachEventListeners() {
        // ESC para fechar
        if (this.options.closeOnEscape) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });
        }
        
        // Click fora para fechar
        if (this.options.closeOnOutsideClick) {
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.close();
                }
            });
        }
    }
}
```

**CSS Bento UI Pattern:**

```css
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 9999;
}

.modal-overlay.modal-active {
    opacity: 1;
}

.modal-content {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    padding: 2rem;
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.modal-active .modal-content {
    transform: scale(1);
}

/* Glassmorphism Effect */
.glass-effect {
    background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.05)
    );
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}
```

---

#### 3. **Sidebar Navigator** (AI-Enhanced Pattern)

```javascript
/**
 * AI NAVIGATOR SIDEBAR
 * 
 * Features:
 * - Semantic search
 * - Keyboard shortcuts
 * - Auto-expand matching paths
 * - Relevance scoring
 */

class AINavigatorSidebar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.isOpen = false;
        this.searchIndex = new Map();
        
        // Mapeamentos semânticos
        this.semanticMappings = {
            'auth': ['authentication', 'login', 'passport', 'jwt', 'oauth', 'session'],
            'api': ['routes', 'endpoints', 'controllers', 'rest', 'graphql'],
            'test': ['spec', '__tests__', 'testing', 'jest', 'mocha', 'cypress'],
            'config': ['settings', 'environment', 'env', 'configuration'],
            'ui': ['components', 'views', 'pages', 'screens', 'layouts']
        };
        
        this.init();
    }

    init() {
        this.createSidebarStructure();
        this.setupKeyboardShortcuts();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K para abrir
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
            
            // ESC para fechar
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    search(query) {
        const results = [];
        const lowerQuery = query.toLowerCase();
        
        // Busca semântica
        const semanticTerms = this.getSemanticTerms(lowerQuery);
        
        // Iterar pelo índice de busca
        for (const [path, metadata] of this.searchIndex) {
            const score = this.calculateRelevance(path, metadata, lowerQuery, semanticTerms);
            if (score > 0) {
                results.push({ path, metadata, score });
            }
        }
        
        // Ordenar por relevância
        return results.sort((a, b) => b.score - a.score);
    }

    getSemanticTerms(query) {
        const terms = [query];
        for (const [key, synonyms] of Object.entries(this.semanticMappings)) {
            if (query.includes(key) || synonyms.some(s => query.includes(s))) {
                terms.push(...synonyms);
            }
        }
        return [...new Set(terms)];
    }

    calculateRelevance(path, metadata, query, semanticTerms) {
        let score = 0;
        
        // Match exato no nome do arquivo
        if (path.toLowerCase().includes(query)) {
            score += 10;
        }
        
        // Match semântico
        for (const term of semanticTerms) {
            if (path.toLowerCase().includes(term)) {
                score += 5;
            }
        }
        
        // Boost para certos tipos de arquivo
        if (metadata.type === 'file') {
            const ext = path.split('.').pop();
            if (['js', 'ts', 'jsx', 'tsx', 'py', 'go'].includes(ext)) {
                score += 2;
            }
        }
        
        return score;
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.container.classList.add('sidebar-open');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.container.classList.remove('sidebar-open');
        document.body.style.overflow = '';
    }
}
```

---

## ⚙️ Middleware e Scripts de Automação

### 1. Service Worker (PWA)

```javascript
/**
 * SERVICE WORKER - PWA Implementation
 * 
 * Funcionalidades:
 * - Cache de assets estáticos
 * - Offline fallback
 * - Background sync
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `app-cache-${CACHE_VERSION}`;

const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/assets/css/style.css',
    '/assets/js/main.js',
    '/assets/icons/icon-192x192.png',
    '/manifest.json'
];

// Install event - Cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate event - Clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(name => name !== CACHE_NAME)
                        .map(name => caches.delete(name))
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                
                return fetch(event.request)
                    .then(response => {
                        // Clone response for cache
                        const responseClone = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseClone);
                            });
                        
                        return response;
                    });
            })
            .catch(() => {
                // Offline fallback
                return caches.match('/offline.html');
            })
    );
});
```

### 2. Script de Automação - Sitemap Generator

```javascript
/**
 * SITEMAP GENERATOR SCRIPT
 * 
 * Uso: node scripts/generate-sitemap.js
 * Gera sitemap.xml automaticamente baseado em estrutura de páginas
 */

const fs = require('fs');
const path = require('path');

class SitemapGenerator {
    constructor(config) {
        this.baseUrl = config.baseUrl;
        this.pagesDir = config.pagesDir || './';
        this.outputFile = config.outputFile || 'sitemap.xml';
        this.excludePatterns = config.exclude || [];
    }

    async generate() {
        const pages = this.scanPages(this.pagesDir);
        const urls = pages.map(page => this.createUrlEntry(page));
        const sitemap = this.buildSitemap(urls);
        
        fs.writeFileSync(this.outputFile, sitemap);
        console.log(`✅ Sitemap generated: ${this.outputFile}`);
    }

    scanPages(dir) {
        const pages = [];
        const files = fs.readdirSync(dir);
        
        files.forEach(file => {
            if (this.shouldExclude(file)) return;
            
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                pages.push(...this.scanPages(filePath));
            } else if (file.endsWith('.html')) {
                pages.push({
                    path: filePath.replace(this.pagesDir, ''),
                    modified: stat.mtime,
                    priority: this.calculatePriority(file)
                });
            }
        });
        
        return pages;
    }

    shouldExclude(filename) {
        return this.excludePatterns.some(pattern => 
            filename.includes(pattern)
        );
    }

    calculatePriority(filename) {
        if (filename === 'index.html') return 1.0;
        if (filename.match(/^(sobre|guia|features)/)) return 0.9;
        if (filename.match(/^(politica|termos)/)) return 0.7;
        return 0.8;
    }

    createUrlEntry(page) {
        const changefreq = this.getChangeFreq(page.priority);
        
        return `    <url>
        <loc>${this.baseUrl}${page.path}</loc>
        <lastmod>${page.modified.toISOString().split('T')[0]}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`;
    }

    getChangeFreq(priority) {
        if (priority >= 0.9) return 'daily';
        if (priority >= 0.7) return 'weekly';
        return 'monthly';
    }

    buildSitemap(urls) {
        return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
    }
}

// Uso
const config = {
    baseUrl: 'https://yourdomain.com',
    pagesDir: './',
    exclude: ['404', 'test', 'draft']
};

const generator = new SitemapGenerator(config);
generator.generate();
```

---

## 📱 PWA e Manifest

### manifest.json - Template Completo

```json
{
  "name": "Nome Completo da Aplicação",
  "short_name": "Nome Curto",
  "description": "Descrição detalhada da aplicação para PWA",
  "start_url": ".",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#ffffff",
  "theme_color": "#24292e",
  "categories": ["productivity", "developer-tools"],
  "lang": "pt-BR",
  "dir": "ltr",
  
  "icons": [
    {
      "src": "icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/maskable-icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  
  "screenshots": [
    {
      "src": "screenshots/desktop-1.png",
      "sizes": "1920x1080",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "screenshots/mobile-1.png",
      "sizes": "750x1334",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ],
  
  "shortcuts": [
    {
      "name": "Ação Rápida 1",
      "short_name": "Ação 1",
      "description": "Descrição da ação",
      "url": "/quick-action",
      "icons": [
        {
          "src": "icons/shortcut-1.png",
          "sizes": "192x192"
        }
      ]
    }
  ],
  
  "related_applications": [],
  "prefer_related_applications": false
}
```

### Tamanhos de Ícones Recomendados

| Tamanho | Uso | Obrigatório |
|---------|-----|-------------|
| 72x72 | Android (ldpi) | ❌ |
| 96x96 | Android (mdpi) | ❌ |
| 128x128 | Chrome Web Store | ✅ |
| 144x144 | Android (hdpi) | ❌ |
| 152x152 | iPad Retina | ❌ |
| 192x192 | Android (xhdpi) | ✅ |
| 384x384 | Android (xxhdpi) | ❌ |
| 512x512 | Android (xxxhdpi) | ✅ |
| 180x180 | Apple Touch Icon | ✅ |

---

## ⚡ Performance e Cache

### 1. LocalStorage Cache Strategy

```javascript
/**
 * CACHE MANAGER - LocalStorage Strategy
 * 
 * Features:
 * - TTL (Time To Live) support
 * - Size management
 * - Versioning
 * - Compression (optional)
 */

class CacheManager {
    constructor(options = {}) {
        this.prefix = options.prefix || 'app_cache_';
        this.defaultTTL = options.defaultTTL || 24 * 60 * 60 * 1000; // 24h
        this.maxSize = options.maxSize || 5 * 1024 * 1024; // 5MB
    }

    set(key, value, ttl = this.defaultTTL) {
        try {
            const item = {
                value: value,
                timestamp: Date.now(),
                ttl: ttl,
                version: '1.0'
            };
            
            const serialized = JSON.stringify(item);
            
            // Check size
            if (this.getStorageSize() + serialized.length > this.maxSize) {
                this.cleanup();
            }
            
            localStorage.setItem(this.prefix + key, serialized);
            return true;
        } catch (error) {
            console.error('Cache set error:', error);
            return false;
        }
    }

    get(key) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            if (!item) return null;
            
            const parsed = JSON.parse(item);
            
            // Check TTL
            if (Date.now() - parsed.timestamp > parsed.ttl) {
                this.remove(key);
                return null;
            }
            
            return parsed.value;
        } catch (error) {
            console.error('Cache get error:', error);
            return null;
        }
    }

    remove(key) {
        localStorage.removeItem(this.prefix + key);
    }

    clear() {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        });
    }

    cleanup() {
        const keys = Object.keys(localStorage);
        const items = [];
        
        keys.forEach(key => {
            if (key.startsWith(this.prefix)) {
                try {
                    const item = JSON.parse(localStorage.getItem(key));
                    items.push({
                        key: key,
                        timestamp: item.timestamp,
                        size: localStorage.getItem(key).length
                    });
                } catch (e) {
                    localStorage.removeItem(key);
                }
            }
        });
        
        // Remove oldest items until size is acceptable
        items.sort((a, b) => a.timestamp - b.timestamp);
        
        let currentSize = this.getStorageSize();
        for (const item of items) {
            if (currentSize < this.maxSize * 0.8) break;
            localStorage.removeItem(item.key);
            currentSize -= item.size;
        }
    }

    getStorageSize() {
        let size = 0;
        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                size += localStorage.getItem(key).length;
            }
        }
        return size;
    }

    getStats() {
        const keys = Object.keys(localStorage).filter(k => k.startsWith(this.prefix));
        return {
            items: keys.length,
            size: this.getStorageSize(),
            maxSize: this.maxSize,
            usage: (this.getStorageSize() / this.maxSize * 100).toFixed(2) + '%'
        };
    }
}

// Uso
const cache = new CacheManager({
    prefix: 'myapp_',
    defaultTTL: 24 * 60 * 60 * 1000 // 24 hours
});

// Salvar
cache.set('user_data', { name: 'John' });

// Recuperar
const userData = cache.get('user_data');

// Estatísticas
console.log(cache.getStats());
```

### 2. Resource Hints

```html
<!-- Preconnect - Estabelece conexão antecipada -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://api.example.com">

<!-- DNS Prefetch - Resolve DNS antecipadamente -->
<link rel="dns-prefetch" href="https://cdn.example.com">

<!-- Preload - Carrega recursos críticos -->
<link rel="preload" href="critical-style.css" as="style">
<link rel="preload" href="main-font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="hero-image.webp" as="image">

<!-- Prefetch - Carrega recursos para próxima navegação -->
<link rel="prefetch" href="next-page.html">

<!-- Prerender - Renderiza página em background (usar com cautela) -->
<link rel="prerender" href="likely-next-page.html">
```

---

## ♿ Acessibilidade

### Checklist WCAG 2.1 Level AA

#### Princípios Fundamentais

1. **Perceptível**
   ```html
   <!-- Alternativas textuais para imagens -->
   <img src="logo.png" alt="Logo da Empresa - Início">
   
   <!-- Labels para form inputs -->
   <label for="email">Email:</label>
   <input type="email" id="email" name="email" aria-required="true">
   
   <!-- Transcrições para vídeo/áudio -->
   <video controls>
       <source src="video.mp4" type="video/mp4">
       <track kind="captions" src="captions.vtt" srclang="pt" label="Português">
   </video>
   ```

2. **Operável**
   ```javascript
   // Navegação por teclado
   document.querySelectorAll('[role="button"]').forEach(element => {
       element.setAttribute('tabindex', '0');
       
       element.addEventListener('keydown', (e) => {
           if (e.key === 'Enter' || e.key === ' ') {
               e.preventDefault();
               element.click();
           }
       });
   });
   
   // Skip links
   // <a href="#main-content" class="skip-link">Pular para conteúdo principal</a>
   ```

3. **Compreensível**
   ```html
   <!-- Linguagem da página -->
   <html lang="pt-BR">
   
   <!-- Mensagens de erro claras -->
   <input type="email" aria-describedby="email-error">
   <span id="email-error" role="alert">
       Por favor, insira um email válido
   </span>
   ```

4. **Robusto**
   ```html
   <!-- ARIA roles e labels -->
   <nav role="navigation" aria-label="Menu Principal">
       <ul role="list">
           <li role="listitem"><a href="/">Início</a></li>
       </ul>
   </nav>
   
   <!-- Status dinâmicos -->
   <div role="status" aria-live="polite" aria-atomic="true">
       Carregando dados...
   </div>
   ```

### Widget de Acessibilidade

```javascript
/**
 * ACCESSIBILITY WIDGET
 * 
 * Features:
 * - Ajuste de tamanho de fonte
 * - Contraste alto
 * - Navegação por teclado
 * - Leitor de tela (VLibras)
 */

class AccessibilityWidget {
    constructor() {
        this.settings = {
            fontSize: 1,
            highContrast: false,
            keyboardNav: true
        };
        
        this.init();
    }

    init() {
        this.createWidget();
        this.loadSettings();
        this.applySettings();
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.className = 'accessibility-widget';
        widget.innerHTML = `
            <button aria-label="Aumentar fonte" data-action="font-increase">
                <i class="fas fa-plus"></i>
            </button>
            <button aria-label="Diminuir fonte" data-action="font-decrease">
                <i class="fas fa-minus"></i>
            </button>
            <button aria-label="Alto contraste" data-action="contrast-toggle">
                <i class="fas fa-adjust"></i>
            </button>
            <button aria-label="Atalhos de teclado" data-action="shortcuts">
                <i class="fas fa-keyboard"></i>
            </button>
        `;
        
        document.body.appendChild(widget);
        this.attachEventListeners(widget);
    }

    attachEventListeners(widget) {
        widget.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (!button) return;
            
            const action = button.dataset.action;
            this.handleAction(action);
        });
    }

    handleAction(action) {
        switch (action) {
            case 'font-increase':
                this.settings.fontSize = Math.min(this.settings.fontSize + 0.1, 2);
                break;
            case 'font-decrease':
                this.settings.fontSize = Math.max(this.settings.fontSize - 0.1, 0.8);
                break;
            case 'contrast-toggle':
                this.settings.highContrast = !this.settings.highContrast;
                break;
            case 'shortcuts':
                this.showKeyboardShortcuts();
                return;
        }
        
        this.applySettings();
        this.saveSettings();
    }

    applySettings() {
        document.documentElement.style.fontSize = `${this.settings.fontSize}rem`;
        
        if (this.settings.highContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
    }

    saveSettings() {
        localStorage.setItem('accessibility_settings', JSON.stringify(this.settings));
    }

    loadSettings() {
        const saved = localStorage.getItem('accessibility_settings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
    }

    showKeyboardShortcuts() {
        const shortcuts = {
            'Alt + 1': 'Ir para conteúdo principal',
            'Alt + 2': 'Ir para menu de navegação',
            'Alt + 3': 'Ir para busca',
            'Tab': 'Próximo elemento',
            'Shift + Tab': 'Elemento anterior',
            'Enter': 'Ativar link/botão',
            'Esc': 'Fechar modal/diálogo'
        };
        
        // Mostrar modal com atalhos
        alert(Object.entries(shortcuts).map(([key, desc]) => 
            `${key}: ${desc}`
        ).join('\n'));
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    new AccessibilityWidget();
});
```

---

## 📊 Analytics e Monitoramento

### 1. Google Analytics 4 (GA4)

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'send_page_view': false // Para SPAs
  });
  
  // Custom events
  function trackEvent(eventName, params = {}) {
    gtag('event', eventName, params);
  }
</script>
```

### 2. Google Tag Manager (GTM)

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

### 3. Event Tracking System

```javascript
/**
 * ANALYTICS TRACKER
 * 
 * Unified tracking system for all analytics platforms
 */

class AnalyticsTracker {
    constructor() {
        this.platforms = {
            ga4: typeof gtag !== 'undefined',
            gtm: typeof dataLayer !== 'undefined'
        };
    }

    trackPageView(pagePath, pageTitle) {
        if (this.platforms.ga4) {
            gtag('event', 'page_view', {
                page_path: pagePath,
                page_title: pageTitle
            });
        }
        
        if (this.platforms.gtm) {
            dataLayer.push({
                event: 'pageview',
                page: {
                    path: pagePath,
                    title: pageTitle
                }
            });
        }
    }

    trackEvent(category, action, label, value) {
        if (this.platforms.ga4) {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value
            });
        }
        
        if (this.platforms.gtm) {
            dataLayer.push({
                event: 'customEvent',
                eventCategory: category,
                eventAction: action,
                eventLabel: label,
                eventValue: value
            });
        }
    }

    trackError(errorMessage, errorStack) {
        this.trackEvent('Error', 'exception', errorMessage, 0);
        
        // Enviar para serviço de logging
        console.error('Tracked error:', errorMessage, errorStack);
    }

    trackTiming(category, variable, time) {
        if (this.platforms.ga4) {
            gtag('event', 'timing_complete', {
                name: variable,
                value: time,
                event_category: category
            });
        }
    }

    // User tracking
    setUserId(userId) {
        if (this.platforms.ga4) {
            gtag('config', 'G-XXXXXXXXXX', {
                'user_id': userId
            });
        }
    }

    setUserProperties(properties) {
        if (this.platforms.ga4) {
            gtag('set', 'user_properties', properties);
        }
    }
}

// Global tracker instance
const analytics = new AnalyticsTracker();

// Usage examples
analytics.trackPageView('/index', 'Home Page');
analytics.trackEvent('User', 'click', 'CTA Button', 1);
analytics.trackTiming('API', 'fetch_data', 1250);
```

---

## 📝 Resumo Executivo

### Checklist de Implementação Completa

#### ✅ SEO Técnico
- [ ] robots.txt configurado com sitemap
- [ ] sitemap.xml com todas as páginas
- [ ] Meta tags completas (title, description, canonical)
- [ ] Open Graph tags para redes sociais
- [ ] Twitter Cards configurados
- [ ] Schema.org JSON-LD implementado
- [ ] Google Search Console verificado

#### ✅ Estrutura e Arquitetura
- [ ] Estrutura de pastas modular
- [ ] Componentes reutilizáveis criados
- [ ] Padrão de nomenclatura consistente
- [ ] Separação de concerns implementada
- [ ] Documentação técnica completa

#### ✅ Performance
- [ ] Service Worker para cache
- [ ] LocalStorage cache strategy
- [ ] Resource hints (preconnect, prefetch)
- [ ] Lazy loading de imagens
- [ ] Minificação de assets

#### ✅ PWA
- [ ] manifest.json completo
- [ ] Ícones em todos os tamanhos
- [ ] Service Worker instalado
- [ ] Offline fallback
- [ ] Add to homescreen

#### ✅ Acessibilidade
- [ ] WCAG 2.1 Level AA compliance
- [ ] ARIA roles e labels
- [ ] Navegação por teclado
- [ ] Alt texts para imagens
- [ ] Widget de acessibilidade

#### ✅ Analytics
- [ ] Google Analytics 4 configurado
- [ ] Google Tag Manager instalado
- [ ] Event tracking implementado
- [ ] Error tracking ativo
- [ ] Performance monitoring

---

## 🎓 Metodologia Recomendada

### Fase 1: Planejamento (1-2 dias)
1. Definir estrutura de pastas
2. Planejar componentes reutilizáveis
3. Mapear páginas e rotas
4. Definir estratégia de SEO

### Fase 2: Setup Inicial (2-3 dias)
1. Criar estrutura base
2. Configurar SEO (robots, sitemap, meta tags)
3. Implementar PWA (manifest, service worker)
4. Setup de analytics

### Fase 3: Desenvolvimento (1-2 semanas)
1. Desenvolver componentes core
2. Implementar features principais
3. Adicionar interatividade
4. Otimizar performance

### Fase 4: Polimento (3-5 dias)
1. Acessibilidade
2. Testes cross-browser
3. Otimização mobile
4. Ajustes de SEO

### Fase 5: Deploy e Monitoramento (ongoing)
1. Deploy em produção
2. Monitorar analytics
3. Ajustar baseado em métricas
4. Manutenção contínua

---

## 📚 Recursos Adicionais

### Ferramentas de Teste

- **SEO:**
  - Google Search Console
  - Google Rich Results Test
  - Lighthouse (Chrome DevTools)
  - SEMrush / Ahrefs

- **Performance:**
  - Google PageSpeed Insights
  - GTmetrix
  - WebPageTest
  - Chrome DevTools Performance

- **Acessibilidade:**
  - WAVE (WebAIM)
  - axe DevTools
  - NVDA/JAWS (screen readers)
  - Lighthouse Accessibility Audit

- **PWA:**
  - Lighthouse PWA Audit
  - PWABuilder
  - Workbox (Google)

---

## 🏁 Conclusão

Este guia fornece uma base sólida para implementar:

1. ✅ **Arquitetura modular e escalável**
2. ✅ **SEO técnico de excelência**
3. ✅ **Componentização reutilizável**
4. ✅ **Performance otimizada**
5. ✅ **Acessibilidade WCAG 2.1**
6. ✅ **PWA completo**
7. ✅ **Analytics e monitoramento**

**Próximos Passos:**
1. Adaptar templates para seu projeto específico
2. Remover conteúdo placeholder e adicionar seu conteúdo
3. Ajustar URLs, nomes e branding
4. Testar em todos os ambientes
5. Monitorar e iterar com base em métricas

---

**Desenvolvido como boilerplate de referência baseado em análise de projeto de qualidade.**  
*Versão 1.0 - Fevereiro 2026*
