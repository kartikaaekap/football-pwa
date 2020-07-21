const CACHE_NAME = "football-pwa-v1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/team.html",
  "/pages/home.html",
  "/pages/ranking.html",
  "/pages/favorite.html",
  "/css/materialize.min.css",
  "/css/footer.css",
  "/css/home.css",
  "/css/ranking.css",
  "/js/materialize.min.js",
  "/js/api.js",
  "/js/nav.js",
  "/js/db.js",
  "/js/idb.js",
  "/manifest.json",
  "/images/background.jpg",
  "/images/notif.png",
  "/icon.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v52/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) {
        return cached
      }else {
            caches.match(event.request, { ignoreSearch: true }).then(function(response) {
                return response || fetch (event.request);
            }
        )
    }

      return fetch(event.request).then(function(response) {
        const responseToCahce = response.clone()
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request.url, responseToCahce);
        })
        return response;
      })
    })
 );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: '/images/notif.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});