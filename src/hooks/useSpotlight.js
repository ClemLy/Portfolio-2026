/* Met à jour les variables CSS --spot-x/--spot-y sur l'élément survolé, pour
   un effet de torche qui suit le curseur sur les zones sombres */
const useSpotlight = () => (event) => {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
  el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
};

export default useSpotlight;
