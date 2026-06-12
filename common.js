/* ============================================================
   common.js — shared across ALL pages (homepage + every tool)
   Theme toggle + Service Worker registration live here so they
   only need to be maintained in ONE place.
   ============================================================ */

/* THEME TOGGLE (initial theme is set by the inline <head> script) */
(function () {
  var themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  themeToggle.addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('imgpdftools-theme', next); } catch (e) {}
  });
})();

/* SERVICE WORKER — auto-reload on new SW install */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (reg) {
      reg.addEventListener('updatefound', function () {
        var nw = reg.installing;
        if (nw) nw.addEventListener('statechange', function () {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) {
            nw.postMessage('SKIP_WAITING');
            window.location.reload();
          }
        });
      });
    }).catch(function (err) { console.warn('SW registration failed:', err); });
  });
}