const CACHE = 'pixelpress-v1';
const OFFLINE = '/offline.html';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(['/', '/offline.html', '/site.webmanifest']))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(OFFLINE))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    }).catch(() => caches.match(OFFLINE))
  );
});

self.addEventListener('push', e => {
  const d = e.data?.json() ?? { title: 'PixelPress', body: 'New update!' };
  e.waitUntil(
    self.registration.showNotification(d.title, {
      body: d.body,
      icon: '/favicon-192x192.png'
    })
  );
});