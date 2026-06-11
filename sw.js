// Service Worker for ImgPDFTools / PixelPress
// Strategy: Network-first for HTML, stale-while-revalidate for assets
// On install: PURANE saare caches forcefully delete (fixes stale homepage bug)

const CACHE_NAME = 'pixelpress-cache-v6';
const ASSETS_TO_CACHE = [
  '/offline.html',
  '/site.webmanifest'
];

// Install: PURANE saare caches delete + naye assets precache + turant activate
self.addEventListener('install', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => caches.open(CACHE_NAME))
      .then(cache => cache.addAll(
        ASSETS_TO_CACHE.map(url => new Request(url, { cache: 'reload' }))
      ))
      .then(() => self.skipWaiting())
  );
});

// Activate: double-safety + control le lo
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

  // sw.js / manifest ko kabhi cache se serve nahi karna — hamesha fresh
  const url = new URL(req.url);
  if (url.pathname === '/sw.js' || url.pathname === '/site.webmanifest') {
    event.respondWith(fetch(req, { cache: 'no-store' }).catch(() => caches.match(req)));
    return;
  }

  // HTML / navigation requests => HAMESHA network se fresh
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

  // Baaki assets (css/js/img/font) => stale-while-revalidate
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