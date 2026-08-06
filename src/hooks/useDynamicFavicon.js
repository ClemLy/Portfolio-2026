import { useEffect } from 'react';

const SIZE = 64;
const BG = '#241610';
const ACCENT = '#B5615A';
const DOT = '#FAF7F3';

/* Redessine le favicon sur un canvas à chaque frame pour lui donner un
   astérisque qui tourne doucement en continu dans l'onglet */
const useDynamicFavicon = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

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
    };

    draw();
    const id = setInterval(draw, 90);
    return () => clearInterval(id);
  }, []);
};

export default useDynamicFavicon;
