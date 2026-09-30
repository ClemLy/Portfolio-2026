(function () {
  try {
    var stored = localStorage.getItem('prefers-dark-theme');
    if (stored === 'true') document.documentElement.setAttribute('data-theme', 'dark');
  } catch (e) {}
})();
