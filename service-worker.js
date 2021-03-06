const version = "0.0.0";
const cacheName = `hanifmu.com-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        "/",
        "/assets/css/stylesheet.min.css",
        "/assets/js/highlight.min.js",
        "/js/lazysizes.min.js",
        "/hanifmu-ico.png",
        "/android-chrome-192x192.png",
        "/android-chrome-512x512.png",
        "/images/bg-hanifmu.com.webp",
        "/manifest.json",
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
