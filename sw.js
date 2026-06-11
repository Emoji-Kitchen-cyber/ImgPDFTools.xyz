// Service Worker for ImgPDFTools.xyz
// Strategy: Network-first for HTML, stale-while-revalidate for assets
// On install: forcefully delete ALL old caches (fixes stale homepage bug)

const CACHE_NAME = 'imgpdftools-cache-v6';
const ASSETS_TO_CACHE = [
  '/offline.html',
  '/site.webmanifest'
];

// Install: delete all old caches + precache new assets + activate immediately
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

// Activate: double-safety cleanup + take control of all clients
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// When the page sends a 'SKIP_WAITING' message, activate the new SW immediately
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  if (!req.url.startsWith(self.location.origin)) return;
  if (!req.url.startsWith('http')) return;

  // Never serve sw.js or manifest from cache — always fresh
  const url = new URL(req.url);
  if (url.pathname === '/sw.js' || url.pathname === '/site.webmanifest') {
    event.respondWith(fetch(req, { cache: 'no-store' }).catch(() => caches.match(req)));
    return;
  }

  // HTML / navigation requests => ALWAYS fresh from network (no-store)
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

  // Other assets (css/js/img/font) => stale-while-revalidate
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