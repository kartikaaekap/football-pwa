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
  "/images/background.jpg",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener("fetch", function(event) {
    var base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
      event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
          return fetch(event.request).then(function(response) {
            cache.put(event.request.url, response.clone());
            return response;
          })
        })
      );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(function(response) {
                return response || fetch (event.request);
            })
        )
    }
  });
  self.addEventListener('activate', function(event) {
    console.log('Aktivasi service worker baru');
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE_NAME && cacheName.startsWith("codepolitan-reader-lite")) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });