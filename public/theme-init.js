(function () {
  try {
    var stored = localStorage.getItem('prefers-dark-theme');
    var dark = stored === null ? window.matchMedia('(prefers-color-scheme: dark)').matches : stored === 'true';
    if (dark) document.documentElement.setAttribute('data-theme', 'dark');

    var lang = localStorage.getItem('language');
    if (lang !== 'fr' && lang !== 'en') {
      lang = navigator.language && navigator.language.toLowerCase().indexOf('fr') === 0 ? 'fr' : 'en';
    }
    document.documentElement.setAttribute('lang', lang);
  } catch (e) {}
})();
