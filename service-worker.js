const CACHE_NAME = "mcserver-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/pages/economy.html",
  "/pages/About.html",
  "/pages/Default.html",
  "/pages/groups-and-starterkit.html",
  "/Assets/Images/Server-Logo.png",
  "/Assets/Images/Server-Logo_64x64.png",
  "/Assets/Images/Server-Logo_192x192.png",
  "/Assets/Images/Server-Logo_512x512.png",
  "/Assets/Images/Splash/background.jpg"
];

// Install the service worker and cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch resources from cache or network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Update the service worker and clear old cache
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});