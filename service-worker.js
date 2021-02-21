const CACHE_NAME = new Date().toISOString();
const urlsToCache = [
  "/assets/css/stylesheet.min.css",
  "/assets/js/highlight.min.js",
  "/js/lazysizes.min.js",
  "/hanifmu-ico.png",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/images/bg-hanifmu.com.webp",
  "/manifest.json",
];
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, {
        cacheName: CACHE_NAME,
      })
      .then(function (response) {
        if (response) {
          console.info(
            "ServiceWorker: loading assets from cache ",
            response.url
          );
          return response;
        }
        console.info(
          "ServiceWorker: loading assets from server ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.info("ServiceWorker: cache " + cacheName + " deleted");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
