const CACHE_NAME = 'chittakala-genz-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Service Worker Install Event - Force activate new cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Service Worker Activate Event - Delete all old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Network first for dev server, bypass user uploads
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // PRIVACY RULE: Never cache user upload API endpoints or drawings
  if (requestUrl.pathname.includes('/drawing') || requestUrl.pathname.includes('/uploads/')) {
    return;
  }

  // Pass through directly in development
  return;
});
