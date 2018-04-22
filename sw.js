var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/style.css',
  '/script.js',
];

self.addEventListener('install', function(event) {
  // Perform installation
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('opened cache');
        
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    
  );
});