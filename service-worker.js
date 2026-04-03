/**
 * Service Worker para GitTree
 * Implementa estratégias avançadas de cache e cache busting
 */

// Cache Versioning - Atualizado automaticamente a cada deploy (timestamp em build time)
// O timestamp garante que um novo deploy sempre invalida o cache antigo,
// mesmo que o conteúdo dos arquivos seja semelhante.
const CACHE_VERSION = '2.2.0-20260403';
const CACHE_NAME = `gittree-v${CACHE_VERSION}`;
const RUNTIME_CACHE = `gittree-runtime-v${CACHE_VERSION}`;

// Arquivos imutáveis para pré-cache (Cache-First Strategy)
// Apenas ícones/imagens que raramente mudam; HTML/JS/CSS usam Network-First
const PRECACHE_URLS = [
  './manifest.json',
  './icons/android-chrome-192x192.png',
  './icons/android-chrome-512x512.png',
  './404.html'
];

// APIs externas (Network-First Strategy)
const API_PATTERNS = [
  /^https:\/\/api\.github\.com\//,
  /^https:\/\/.*\.githubusercontent\.com\//
];

/**
 * Install Event - Cache arquivos essenciais
 * Skip waiting para forçar ativação imediata
 */
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Installing v' + CACHE_VERSION);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Pre-caching essential files');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        // Skip waiting - força ativação imediata
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[ServiceWorker] Pre-cache failed:', error);
      })
  );
});

/**
 * Activate Event - Limpa caches antigos
 * Claim clients para assumir controle imediatamente
 */
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activating v' + CACHE_VERSION);
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              // Remove todos os caches que não são a versão atual
              return cacheName.startsWith('gittree-') && 
                     cacheName !== CACHE_NAME && 
                     cacheName !== RUNTIME_CACHE;
            })
            .map(cacheName => {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        // Claim clients - assume controle de todas as páginas imediatamente
        return self.clients.claim();
      })
      .then(() => {
        console.log('[ServiceWorker] Activated successfully');
      })
  );
});

/**
 * Fetch Event - Estratégias de cache inteligentes
 */
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Ignora requisições que não são GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Ignora requisições para outros domínios (exceto APIs conhecidas)
  if (url.origin !== location.origin && !isKnownAPI(url)) {
    return;
  }
  
  // Aplica estratégia baseada no tipo de recurso
  if (isHTMLPage(url)) {
    // HTML Pages: Network-First — garante sempre o HTML mais recente após deploy
    event.respondWith(networkFirst(request));
  } else if (isAPI(url)) {
    // APIs: Network-First
    event.respondWith(networkFirst(request));
  } else if (isMutableAsset(url)) {
    // JS e CSS podem mudar a cada deploy: Network-First com fallback para cache
    event.respondWith(networkFirst(request));
  } else if (isImmutableAsset(url)) {
    // Ícones, fontes e imagens: raramente mudam, Cache-First é seguro
    event.respondWith(cacheFirst(request));
  } else {
    // Outros: Network-First com fallback
    event.respondWith(networkFirst(request));
  }
});

/**
 * Cache-First Strategy
 * Tenta cache primeiro, depois rede
 */
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    // Só cacheia respostas válidas
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[ServiceWorker] Fetch failed:', error);
    // Retorna página 404 se disponível no cache
    return cache.match('./404.html');
  }
}

/**
 * Network-First Strategy
 * Tenta rede primeiro, fallback para cache
 */
async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  
  try {
    const response = await fetch(request);
    // Cacheia resposta válida
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Fallback para cache se rede falhar
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    // Último recurso: retorna 404
    const mainCache = await caches.open(CACHE_NAME);
    return mainCache.match('./404.html');
  }
}

/**
 * Stale-While-Revalidate Strategy (mantido para uso futuro se necessário)
 * Retorna cache imediatamente e atualiza em background
 */
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  // Busca atualização em background
  const fetchPromise = fetch(request).then(response => {
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);
  
  // Retorna cache imediatamente se disponível
  return cached || fetchPromise;
}

/**
 * Helper Functions
 */

function isHTMLPage(url) {
  return url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname === './';
}

function isAPI(url) {
  return API_PATTERNS.some(pattern => pattern.test(url.href));
}

function isKnownAPI(url) {
  return API_PATTERNS.some(pattern => pattern.test(url.href));
}

// JS e CSS mudam a cada deploy → Network-First
function isMutableAsset(url) {
  const ext = url.pathname.split('.').pop();
  return ['js', 'css'].includes(ext);
}

// Ícones, fontes e imagens raramente mudam → Cache-First
function isImmutableAsset(url) {
  const ext = url.pathname.split('.').pop();
  return ['png', 'jpg', 'jpeg', 'svg', 'ico', 'woff', 'woff2', 'ttf'].includes(ext);
}

// Mantido para compatibilidade, não é mais usado no fetch handler principal
function isStaticAsset(url) {
  const ext = url.pathname.split('.').pop();
  return ['css', 'js', 'png', 'jpg', 'jpeg', 'svg', 'ico', 'woff', 'woff2', 'ttf'].includes(ext);
}

/**
 * Message Handler - Permite forçar atualização do cache
 */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[ServiceWorker] Skip waiting requested');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('[ServiceWorker] Clearing all caches');
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      })
    );
  }
});
