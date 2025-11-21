const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  'ALGAZ/index.html',
  'ALGAZ/manifest.json',
  'ALGAZ/icons/icon-192.png',
  'ALGAZ/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
