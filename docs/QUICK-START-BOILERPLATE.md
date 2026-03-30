# 🚀 Quick Start Boilerplate Guide

> **Referência Rápida para Implementação**  
> Use este guia para rapidamente implementar as melhores práticas arquiteturais e de SEO extraídas do projeto GitTree.

---

## 📦 Template de Projeto Base

### 1. Estrutura Mínima

```bash
# Crie a estrutura básica de pastas
mkdir -p my-project/{assets/{css,js/modules,icons},pages,seo,docs,config}

# Arquivos essenciais
touch my-project/index.html
touch my-project/seo/{robots.txt,sitemap.xml,manifest.json}
touch my-project/config/service-worker.js
```

---

## 🔍 SEO: Configuração em 5 Minutos

### robots.txt
```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://yourdomain.com/sitemap.xml
```

### HTML Head Template (Copy-Paste Ready)
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO BÁSICO -->
    <title>Seu Título | Nome do Projeto</title>
    <meta name="description" content="Descrição de 150-160 caracteres">
    <link rel="canonical" href="https://yourdomain.com/">
    
    <!-- OPEN GRAPH -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://yourdomain.com/">
    <meta property="og:title" content="Título para Social Media">
    <meta property="og:description" content="Descrição para compartilhamento">
    <meta property="og:image" content="https://yourdomain.com/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    
    <!-- TWITTER -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="Título para Twitter">
    <meta property="twitter:description" content="Descrição">
    <meta property="twitter:image" content="https://yourdomain.com/twitter-image.png">
    
    <!-- PWA -->
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#24292e">
    
    <!-- PERFORMANCE -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://cdn.jsdelivr.net">
</head>
<body>
    <!-- Seu conteúdo aqui -->
</body>
</html>
```

---

## 📱 PWA: manifest.json Mínimo

```json
{
  "name": "Nome Completo",
  "short_name": "Nome Curto",
  "description": "Descrição da aplicação",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#24292e",
  "icons": [
    {
      "src": "icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## ⚡ Service Worker Básico

```javascript
// service-worker.js
const CACHE_NAME = 'app-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/assets/css/style.css',
    '/assets/js/main.js'
];

// Install
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
    );
});

// Fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
```

**Registrar Service Worker:**
```javascript
// No seu main.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('SW registered'))
        .catch(err => console.log('SW error:', err));
}
```

---

## 🧩 Componentes Essenciais

### 1. Skeleton Loader (Copy-Paste Ready)

```html
<!-- HTML -->
<div id="skeleton-container" class="skeleton-active">
    <div class="skeleton-item"></div>
    <div class="skeleton-item"></div>
    <div class="skeleton-item"></div>
</div>

<!-- CSS -->
<style>
.skeleton-item {
    height: 20px;
    margin: 10px 0;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

.skeleton-active { display: block; }
.skeleton-active.hidden { display: none; }
</style>

<!-- JavaScript -->
<script>
function showSkeleton() {
    document.getElementById('skeleton-container').classList.remove('hidden');
}

function hideSkeleton() {
    document.getElementById('skeleton-container').classList.add('hidden');
}
</script>
```

### 2. Modal/Dialog Simples

```html
<!-- HTML -->
<div id="modal" class="modal-overlay" style="display: none;">
    <div class="modal-content">
        <button class="modal-close" onclick="closeModal()">&times;</button>
        <h2>Título do Modal</h2>
        <p>Conteúdo aqui...</p>
    </div>
</div>

<!-- CSS -->
<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    position: relative;
}

.modal-close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 28px;
    background: none;
    border: none;
    cursor: pointer;
}
</style>

<!-- JavaScript -->
<script>
function openModal() {
    document.getElementById('modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = '';
}

// Fechar ao clicar fora
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
});

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
</script>
```

---

## 💾 Cache LocalStorage Simples

```javascript
// Simple Cache Manager
const cache = {
    set: (key, value, ttl = 24 * 60 * 60 * 1000) => {
        const item = {
            value: value,
            timestamp: Date.now(),
            ttl: ttl
        };
        localStorage.setItem(key, JSON.stringify(item));
    },
    
    get: (key) => {
        const item = localStorage.getItem(key);
        if (!item) return null;
        
        const parsed = JSON.parse(item);
        if (Date.now() - parsed.timestamp > parsed.ttl) {
            localStorage.removeItem(key);
            return null;
        }
        
        return parsed.value;
    },
    
    remove: (key) => {
        localStorage.removeItem(key);
    },
    
    clear: () => {
        localStorage.clear();
    }
};

// Uso
cache.set('user_data', { name: 'John' });
const userData = cache.get('user_data');
```

---

## 📊 Analytics Básico

### Google Analytics 4 - Setup Rápido

```html
<!-- No <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Tracking de Eventos

```javascript
// Função helper
function trackEvent(action, category, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Uso
trackEvent('click', 'Button', 'CTA Principal');
trackEvent('download', 'File', 'PDF Report');
```

---

## ♿ Acessibilidade Rápida

### Checklist Essencial

```html
<!-- ✅ Imagens com alt text -->
<img src="logo.png" alt="Logo da Empresa">

<!-- ✅ Links descritivos -->
<a href="/contato" aria-label="Ir para página de contato">Contato</a>

<!-- ✅ Botões acessíveis -->
<button aria-label="Abrir menu">
    <i class="fas fa-bars"></i>
</button>

<!-- ✅ Forms com labels -->
<label for="email">Email:</label>
<input type="email" id="email" name="email" required>

<!-- ✅ Skip link -->
<a href="#main-content" class="skip-link">Pular para conteúdo</a>
```

### CSS para Skip Link

```css
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 100;
}

.skip-link:focus {
    top: 0;
}
```

---

## 🎨 CSS Reset e Variáveis

### Reset Básico

```css
/* CSS Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 16px;
    scroll-behavior: smooth;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: #333;
}

img {
    max-width: 100%;
    height: auto;
    display: block;
}

a {
    color: inherit;
    text-decoration: none;
}

button {
    font-family: inherit;
    cursor: pointer;
}
```

### Variáveis CSS

```css
:root {
    /* Cores */
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --info-color: #17a2b8;
    
    /* Tipografia */
    --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-mono: 'Courier New', monospace;
    
    /* Espaçamento */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    
    /* Breakpoints */
    --mobile: 480px;
    --tablet: 768px;
    --desktop: 1024px;
    --wide: 1200px;
    
    /* Sombras */
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.15);
    --shadow-lg: 0 10px 20px rgba(0,0,0,0.20);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
    :root {
        --primary-color: #0d6efd;
        --bg-color: #1a1d29;
        --text-color: #e9ecef;
    }
}
```

---

## 🔧 Utilitários JavaScript

### Debounce
```javascript
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Uso
const search = debounce((query) => {
    console.log('Searching for:', query);
}, 300);
```

### Throttle
```javascript
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Uso
window.addEventListener('scroll', throttle(() => {
    console.log('Scrolling...');
}, 100));
```

---

## 📋 Checklist Pré-Deploy

### SEO
- [ ] robots.txt configurado
- [ ] sitemap.xml criado e atualizado
- [ ] Meta tags em todas as páginas
- [ ] Canonical URLs configuradas
- [ ] Open Graph tags
- [ ] Schema.org JSON-LD

### Performance
- [ ] Assets minificados
- [ ] Imagens otimizadas (WebP)
- [ ] Lazy loading implementado
- [ ] Service Worker ativo
- [ ] Cache strategy definida

### Acessibilidade
- [ ] Alt text em imagens
- [ ] ARIA labels
- [ ] Navegação por teclado testada
- [ ] Contraste de cores adequado
- [ ] Testes com leitor de tela

### Analytics
- [ ] Google Analytics instalado
- [ ] Events tracking configurado
- [ ] Error tracking ativo

### PWA
- [ ] manifest.json completo
- [ ] Ícones em todos os tamanhos
- [ ] Service Worker funcionando
- [ ] Testado em mobile

---

## 🚀 Deploy Rápido

### GitHub Pages
```bash
# No seu repositório
git add .
git commit -m "Initial commit"
git push origin main

# Settings > Pages > Source: main branch
```

### Netlify (CLI)
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Vercel (CLI)
```bash
npm install -g vercel
vercel --prod
```

---

## 📚 Links Úteis

- **Documentação Completa:** [IMPLEMENTATION-GUIDE.md](./IMPLEMENTATION-GUIDE.md)
- **Google Search Console:** https://search.google.com/search-console
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Rich Results Test:** https://search.google.com/test/rich-results
- **PWA Builder:** https://www.pwabuilder.com/

---

## 💡 Próximos Passos

1. ✅ Copie os templates necessários
2. ✅ Substitua placeholders (URLs, nomes, IDs)
3. ✅ Customize cores e estilos
4. ✅ Adicione seu conteúdo
5. ✅ Teste em diferentes dispositivos
6. ✅ Valide SEO e acessibilidade
7. ✅ Deploy!

---

**Para guia completo e detalhado, consulte [IMPLEMENTATION-GUIDE.md](./IMPLEMENTATION-GUIDE.md)**

*Versão 1.0 - Quick Start Boilerplate*
