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

/* Frottement de papier synthétisé (bruit blanc filtré, balayage de
   fréquence rapide) pour le passage au projet précédent/suivant */
export const playPageTurn = () => {
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();
  const now = ctx.currentTime;

  const bufferSize = Math.floor(ctx.sampleRate * 0.25);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.value = 0.7;
  filter.frequency.setValueAtTime(1800, now);
  filter.frequency.exponentialRampToValueAtTime(3200, now + 0.18);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.16, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

  noise.connect(filter).connect(gain).connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.26);
};

let ambient = null;

/* Accord ouvert (fondamentale, quinte, octave, octave+quinte) réparti en
   stéréo, sinus et triangle mélangés pour un peu de chaleur harmonique sans
   dureté. Le volume respire très lentement au lieu de faire "wah" sur un
   filtre, pour rester agréable en continu plutôt que d'étouffer le son. */
const VOICES = [
  { freq: 110, type: 'sine', pan: 0, gain: 1 },
  { freq: 165, type: 'triangle', pan: -0.28, gain: 0.5 },
  { freq: 220, type: 'sine', pan: 0.22, gain: 0.45 },
  { freq: 330, type: 'triangle', pan: 0.32, gain: 0.26 },
];

export const startAmbient = () => {
  const ctx = getContext();
  if (!ctx || ambient) return;
  if (ctx.state === 'suspended') ctx.resume();

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
  masterGain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 3);
  masterGain.connect(ctx.destination);

  /* Respiration douce du volume plutôt qu'un filtre qui étouffe le son */
  const breathGain = ctx.createGain();
  breathGain.gain.value = 1;
  breathGain.connect(masterGain);

  const breathLfo = ctx.createOscillator();
  breathLfo.frequency.value = 0.045;
  const breathDepth = ctx.createGain();
  breathDepth.gain.value = 0.12;
  breathLfo.connect(breathDepth).connect(breathGain.gain);
  breathLfo.start();

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1400;
  filter.Q.value = 0.2;
  filter.connect(breathGain);

  const oscillators = [];

  VOICES.forEach(({ freq, type, pan, gain: voiceGain }, index) => {
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = (index % 2 === 0 ? 1 : -1) * (2 + index);

    const gainNode = ctx.createGain();
    gainNode.gain.value = voiceGain;

    if (ctx.createStereoPanner) {
      const panner = ctx.createStereoPanner();
      panner.pan.value = pan;
      osc.connect(gainNode).connect(panner).connect(filter);
    } else {
      osc.connect(gainNode).connect(filter);
    }

    osc.start();
    oscillators.push(osc);
  });

  ambient = { masterGain, breathLfo, oscillators };
};

/* Léger facteur de hauteur par section visitée (Accueil, Projets, À propos,
   Parcours, Stack), pour que la nappe respire différemment selon l'endroit
   de la page plutôt que de rester strictement statique */
const SECTION_PITCH = {
  accueil: 1,
  projets: 1.035,
  apropos: 0.965,
  parcours: 1.05,
  stack: 0.94,
};

export const setAmbientSection = (sectionId) => {
  const ctx = getContext();
  if (!ctx || !ambient) return;
  const factor = SECTION_PITCH[sectionId] ?? 1;
  const now = ctx.currentTime;

  ambient.oscillators.forEach((osc, index) => {
    const base = VOICES[index].freq;
    osc.frequency.cancelScheduledValues(now);
    osc.frequency.setTargetAtTime(base * factor, now, 1.4);
  });
};

export const stopAmbient = () => {
  const ctx = getContext();
  if (!ctx || !ambient) return;

  const { masterGain, oscillators, breathLfo } = ambient;
  const now = ctx.currentTime;
  masterGain.gain.cancelScheduledValues(now);
  masterGain.gain.setValueAtTime(Math.max(masterGain.gain.value, 0.0001), now);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

  setTimeout(() => {
    oscillators.forEach((osc) => osc.stop());
    breathLfo.stop();
  }, 1500);

  ambient = null;
};
