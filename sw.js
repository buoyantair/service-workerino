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
    caches.match(event.request)
      .then(function(response) {
        var fetchRequest = event.request.clone();
                      
        return fetch(fetchRequest).then(function(response) {
         // Check validity
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          var responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
  );
});