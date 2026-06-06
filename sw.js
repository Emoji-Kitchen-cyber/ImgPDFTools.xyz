const CACHE_NAME = 'pixelpress-cache-v4';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/faq.html',
  '/privacy-policy.html',
  '/terms.html',
  '/disclaimer.html',
  '/blog/index.html',
  '/site.webmanifest',
  '/offline.html'
];

// Install: cache core assets, skip waiting immediately
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE.map(url => new Request(url, { cache: 'reload' })));
    }).then(() => self.skipWaiting())
  );
});

// Activate: delete ALL old caches, claim clients immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: Network-first, cache fallback, offline page as last resort
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  // Skip chrome-extension and non-http requests
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then(networkRes => {
        if (networkRes && networkRes.status === 200) {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkRes;
      })
      .catch(() =>
        caches.match(event.request).then(cached =>
          cached || caches.match('/offline.html')
        )
      )
  );
});
