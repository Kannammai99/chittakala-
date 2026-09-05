const CACHE_NAME = 'chittakala-pwa-v4';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/hero_concept1.jpg',
  '/apple-touch-icon.png',
  '/favicon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/art/warli/basic-figures/example-01.svg',
  '/art/kolam/simple-dot-kolams/example-01.png',
  '/art/madhubani/preview.png',
  '/art/gond/preview.png'
];

// Install Event - Pre-cache critical static shell & key art assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up stale caches
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

// Fetch Event - Network First with Cache Fallback for API/Images, Cache First for Static Assets
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Never intercept non-GET or session mutations
  if (event.request.method !== 'GET') {
    return;
  }

  // Cache-first for local static images & art assets (/art/**, .svg, .png, .jpg)
  const isStaticAsset = requestUrl.pathname.startsWith('/art/') ||
                        requestUrl.pathname.endsWith('.png') ||
                        requestUrl.pathname.endsWith('.jpg') ||
                        requestUrl.pathname.endsWith('.svg');

  if (isStaticAsset) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Serve cached asset immediately, revalidate in background if online
          fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          }).catch(() => {});
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Network-First for navigation & API endpoints with Cache Fallback
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// Notification Click Event - Focus or open PWA window on notification tap
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = new URL(event.notification.data?.url || '/', self.location.origin).href;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
