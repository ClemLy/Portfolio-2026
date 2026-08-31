import { useEffect } from 'react';

const SIZE = 64;
const BG = '#241610';
const ACCENT = '#B5615A';
const DOT = '#FAF7F3';

/* Durée totale de la rotation avant de se figer sur l'icône statique —
   tourner indéfiniment retenait le favicon comme "requête" active en
   continu aux yeux de Chrome (link.href réassigné toutes les 90ms), ce qui
   empêchait toute mesure de performance (Lighthouse, Core Web Vitals) de
   jamais détecter une période de réseau inactif. */
const SPIN_DURATION_MS = 4000;

/* Redessine le favicon sur un canvas pour lui donner un astérisque qui
   tourne doucement à l'arrivée sur le site, puis se fige. Respecte à la
   fois le réglage système et la préférence manuelle du site. */
const useDynamicFavicon = (reducedMotion) => {
  useEffect(() => {
    if (reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      /* Retire le favicon dynamique pour laisser réapparaître l'icône
         statique et immobile */
      document.getElementById('favicon-dynamic')?.remove();
      return undefined;
    }

    const canvas = document.createElement('canvas');
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let link = document.getElementById('favicon-dynamic');
    if (!link) {
      link = document.createElement('link');
      link.id = 'favicon-dynamic';
      link.rel = 'icon';
      link.type = 'image/png';
      document.head.appendChild(link);
    }

    let angle = 0;
    const start = performance.now();

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      const r = 14;
      ctx.fillStyle = BG;
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.arcTo(SIZE, 0, SIZE, SIZE, r);
      ctx.arcTo(SIZE, SIZE, 0, SIZE, r);
      ctx.arcTo(0, SIZE, 0, 0, r);
      ctx.arcTo(0, 0, SIZE, 0, r);
      ctx.closePath();
      ctx.fill();

      ctx.save();
      ctx.translate(SIZE / 2, SIZE / 2);
      ctx.rotate(angle);
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 4.4;
      ctx.lineCap = 'round';
      for (let i = 0; i < 3; i += 1) {
        ctx.save();
        ctx.rotate((Math.PI / 3) * i);
        ctx.beginPath();
        ctx.moveTo(0, -17);
        ctx.lineTo(0, 17);
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();

      ctx.fillStyle = DOT;
      ctx.beginPath();
      ctx.arc(SIZE / 2, SIZE / 2, 4.6, 0, Math.PI * 2);
      ctx.fill();

      link.href = canvas.toDataURL('image/png');
      angle += 0.045;

      if (performance.now() - start >= SPIN_DURATION_MS) {
        clearInterval(id);
      }
    };

    draw();
    const id = setInterval(draw, 90);
    return () => clearInterval(id);
  }, [reducedMotion]);
};

export default useDynamicFavicon;
