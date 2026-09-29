/* Français à la racine, anglais sous /en. La langue vient de l'URL et
   jamais du navigateur, sinon Googlebot (navigateur anglais) indexe
   l'anglais à la place du français. */

export const LANGS = ['fr', 'en'];

export const langFromPath = (pathname) =>
  pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr';

/* Chemin sans préfixe de langue : /en/projet/x devient /projet/x */
export const stripLang = (pathname) => {
  if (langFromPath(pathname) === 'fr') return pathname;
  return pathname.slice(3) || '/';
};

/* Chemin interne (avec ancre éventuelle) exprimé dans la langue voulue :
   ('/#projets', 'en') donne '/en#projets' */
export const localizePath = (to, lang) => {
  const [rawPath, hash] = to.split('#');
  const path = stripLang(rawPath || '/');
  const localized = lang === 'en' ? (path === '/' ? '/en' : `/en${path}`) : path;
  return hash ? `${localized}#${hash}` : localized;
};
