let audioCtx;

const getContext = () => {
  if (typeof window === 'undefined') return null;
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return null;
  if (!audioCtx) audioCtx = new Ctor();
  return audioCtx;
};

/* Tic synthétisé, sans aucun fichier audio : une seule oscillation sinusoïdale
   avec une enveloppe très courte, pour un retour discret et léger. */
export const playTick = (frequency = 720) => {
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.value = frequency;

  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.05, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.12);
};

/* Tic légèrement plus grave pour les actions de fermeture/désactivation */
export const playTickLow = () => playTick(480);

let ambient = null;

/* Nappe sonore très discrète, entièrement synthétisée : trois oscillateurs
   graves passés dans un filtre dont la fréquence de coupure respire
   lentement, pour une ambiance qui ne se répète jamais à l'identique. */
export const startAmbient = () => {
  const ctx = getContext();
  if (!ctx || ambient) return;
  if (ctx.state === 'suspended') ctx.resume();

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
  masterGain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 2.5);
  masterGain.connect(ctx.destination);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 700;
  filter.Q.value = 0.4;
  filter.connect(masterGain);

  const oscillators = [110, 165, 220].map((freq, index) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.detune.value = index * 5;
    osc.connect(filter);
    osc.start();
    return osc;
  });

  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.06;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 180;
  lfo.connect(lfoGain).connect(filter.frequency);
  lfo.start();

  ambient = { masterGain, oscillators, lfo };
};

export const stopAmbient = () => {
  const ctx = getContext();
  if (!ctx || !ambient) return;

  const { masterGain, oscillators, lfo } = ambient;
  const now = ctx.currentTime;
  masterGain.gain.cancelScheduledValues(now);
  masterGain.gain.setValueAtTime(Math.max(masterGain.gain.value, 0.0001), now);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

  setTimeout(() => {
    oscillators.forEach((osc) => osc.stop());
    lfo.stop();
  }, 1200);

  ambient = null;
};
