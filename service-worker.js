const CACHE_NAME = 'gittree-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './service-worker.js',
  './icons/android-chrome-192x192.png',
  './icons/android-chrome-512x512.png',
  './style.css',
  './main.js',
  './sobre.html',
  './termos.httml',
  './guia.html',
  './politica-de-privacidade.html',
  './contato.html',
  './404.html',
  './institutional.css',
  './utils.js',
  './components.js',
  './github-api.js'


  // Adicione aqui seus arquivos CSS/JS principais, por exemplo:
  // './style.css',
  // './script.js'
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
