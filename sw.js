var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/style.css',
  '/script.js',
  'https://fonts.googleapis.com/css?family=Black+Han+Sans|Raleway',
  'https://cdn.glitch.com/1d30cd71-d8ab-4636-b146-d41bf8b3bc52%2Fbeach-blue-coast-47424.jpg?1524419821588',
  'https://cdn.glitch.com/1d30cd71-d8ab-4636-b146-d41bf8b3bc52%2Fagriculture-beautiful-country-596893.jpg?1524419822718',
  'https://cdn.glitch.com/1d30cd71-d8ab-4636-b146-d41bf8b3bc52%2Fbeautiful-blue-eyes-close-up-609549.jpg?1524419821793',
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
        if (response) {
          return response;
        }
        
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