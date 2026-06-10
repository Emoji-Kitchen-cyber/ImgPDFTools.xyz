const CACHE_NAME = 'pixelpress-cache-v5';

// Sirf offline fallback + manifest pre-cache karte hain.
// HTML pages cache nahi karte taa-ke hamesha fresh milein.
const ASSETS_TO_CACHE = [
  '/offline.html',
  '/site.webmanifest'
];

// Install: core fallback cache karo aur turant activate ho jao
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(
        ASSETS_TO_CACHE.map(url => new Request(url, { cache: 'reload' }))
      ))
      .then(() => self.skipWaiting())
  );
});

// Activate: SAARE purane caches delete karo, foran control le lo
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Page se 'SKIP_WAITING' message aaye to naya SW turant chalu kar do
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (!req.url.startsWith(self.location.origin)) return;
  if (!req.url.startsWith('http')) return;

  // HTML / navigation requests => HAMESHA network se fresh (no-store)
  // Isse purana index.html kabhi serve nahi hoga jab online ho.
  const isHTML = req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    event.respondWith(
      fetch(req, { cache: 'no-store' })
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, clone));
          return res;
        })
        .catch(() =>
          caches.match(req).then(cached => cached || caches.match('/offline.html'))
        )
    );
    return;
  }

  // Baaki assets (css/js/img) => stale-while-revalidate (fast + background update)
  event.respondWith(
    caches.match(req).then(cached => {
      const networkFetch = fetch(req).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || networkFetch;
    })
  );
});