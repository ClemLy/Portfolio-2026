/* Fusionne un objet de données (projet, techno, certification…) avec sa
   traduction anglaise stockée sous `t.en`, en conservant les champs
   partagés qui n'ont pas besoin de traduction */
export const localize = (item, lang) => {
  if (!item) return item;
  if (lang === 'fr' || !item.t?.en) return item;
  const { t, ...rest } = item;
  return { ...rest, ...t.en };
};

export const localizeList = (items, lang) => items.map((item) => localize(item, lang));
