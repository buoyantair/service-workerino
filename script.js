if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration success
      console.log('ServiceWorker registered successfully with scope: ', registration.scope);
    }, function(err) {
      // Registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    })
    
  });
}

