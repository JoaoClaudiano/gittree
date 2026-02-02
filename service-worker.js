const CACHE_NAME = 'gittree-v1';
const urlsToCache = [
  '/gittree/index.html',
  '/gittree/manifest.json',
  // ADICIONE AQUI OS CAMINHOS DOS SEUS ARQUIVOS CSS E JS PRINCIPAIS
  // Exemplo: '/gittree/css/style.css', '/gittree/js/app.js'
];

// Instalação: Cache dos arquivos essenciais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta requisições para servir do cache quando possível
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache se encontrado
        if (response) {
          return response;
        }
        // Caso contrário, busca na rede
        return fetch(event.request);
      })
  );
});

// Ativação: Remove caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});