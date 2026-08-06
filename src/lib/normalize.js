/* Comparaison de texte insensible aux accents et à la casse */
export const normalize = (value) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
