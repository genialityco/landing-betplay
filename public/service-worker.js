const CACHE_NAME = "betplay-cache-v1";
const urlsToCache = ["/", "/index.html", "/manifest.json"];

// Instalar SW y cachear archivos base
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Activar SW y limpiar caches viejos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});

// Interceptar peticiones y servir desde cache si existen
self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
  
    // Solo cachear requests de tu origen (no HMR, no Vite client)
    if (url.origin === location.origin) {
      event.respondWith(
        caches.match(event.request).then((response) => {
          return response || fetch(event.request);
        })
      );
    }
  });