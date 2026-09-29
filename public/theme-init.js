(function () {
  try {
    var stored = localStorage.getItem('prefers-dark-theme');
    var dark = stored === null ? window.matchMedia('(prefers-color-scheme: dark)').matches : stored === 'true';
    if (dark) document.documentElement.setAttribute('data-theme', 'dark');
  } catch (e) {}
})();
