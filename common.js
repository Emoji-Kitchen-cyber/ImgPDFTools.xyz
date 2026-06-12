/* ============================================================
   common.js — shared across every page
   - Theme toggle (single, guarded handler)
   - Service worker registration + update flow
   Loaded BEFORE script.js on every page.
   ============================================================ */
(function () {
  // ---- Theme toggle (guarded so it binds exactly once) ----
  function initTheme() {
    var themeToggle = document.getElementById('themeToggle');
    // If there is no button, or it was already bound (e.g. by the inline
    // pre-paint script in index.html), do nothing. This guarantees a single
    // handler — so one click = one theme flip, never a double-toggle.
    if (!themeToggle || themeToggle.dataset.themeBound) return;
    themeToggle.dataset.themeBound = '1';

    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('imgpdftools-theme', next); } catch (e) {}
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  // ---- Service worker registration + auto-update ----
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').then(function (reg) {
        reg.addEventListener('updatefound', function () {
          var installing = reg.installing;
          if (!installing) return;
          installing.addEventListener('statechange', function () {
            if (installing.state === 'installed' && navigator.serviceWorker.controller) {
              // A new version is ready — activate it and reload once.
              installing.postMessage('SKIP_WAITING');
            }
          });
        });
      }).catch(function (err) {
        console.warn('SW registration failed:', err);
      });

      var refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', function () {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });
    });
  }
})();