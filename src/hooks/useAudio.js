/**
 * Ambient Synth Engine — Web Audio API
 * Creates a warm, spacey drone: no audio files, no copyright.
 *
 * Architecture:
 *   3 × detuned sine oscillators → GainNode (LFO-modulated) → master gain → destination
 *   + 1 high-pass filtered pink noise layer for texture
 */

let ctx = null;
let masterGain = null;
let nodes = [];          // all running nodes for cleanup
let lfoInterval = null;

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return ctx;
}

/** Create a sine oscillator with a slow LFO on its gain */
function createDrone(ac, freq, gainVal, lfoRate) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.type = 'sine';
  osc.frequency.value = freq;

  // LFO (very slow volume breathing)
  const lfo = ac.createOscillator();
  const lfoGain = ac.createGain();
  lfo.type = 'sine';
  lfo.frequency.value = lfoRate;
  lfoGain.gain.value = gainVal * 0.3;  // depth = 30% of base

  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain);

  gain.gain.value = gainVal;

  osc.connect(gain);
  gain.connect(masterGain);

  osc.start();
  lfo.start();

  return [osc, gain, lfo, lfoGain];
}

/** Pink-ish noise: fills texture between the drones */
function createNoisePad(ac) {
  const bufSize = ac.sampleRate * 2;
  const buf = ac.createBuffer(1, bufSize, ac.sampleRate);
  const data = buf.getChannelData(0);

  // White noise filtered to lower frequencies
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < bufSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) / 7;
    b6 = white * 0.115926;
  }

  const source = ac.createBufferSource();
  source.buffer = buf;
  source.loop = true;

  // High-pass filter to remove muddy lows from noise
  const hpf = ac.createBiquadFilter();
  hpf.type = 'highpass';
  hpf.frequency.value = 600;
  hpf.Q.value = 0.5;

  const noiseGain = ac.createGain();
  noiseGain.gain.value = 0.008;  // whisper-quiet texture

  source.connect(hpf);
  hpf.connect(noiseGain);
  noiseGain.connect(masterGain);
  source.start();

  return [source, hpf, noiseGain];
}

export function startAmbient() {
  const ac = getCtx();

  if (ac.state === 'suspended') {
    ac.resume();
  }

  if (nodes.length > 0) return; // already running

  masterGain = ac.createGain();
  masterGain.gain.value = 0;           // start silent, fade in
  masterGain.connect(ac.destination);

  // Space drone chord: A1 → E2 → A2 → C#3 (open fifth + major third)
  // Slightly detuned for richness
  const drones = [
    createDrone(ac, 55.00,  0.18, 0.04),   // A1 — deep root
    createDrone(ac, 55.20,  0.12, 0.031),  // A1 +4¢ detuned
    createDrone(ac, 82.41,  0.10, 0.025),  // E2 — perfect fifth
    createDrone(ac, 110.00, 0.08, 0.019),  // A2 — octave
    createDrone(ac, 138.59, 0.05, 0.013),  // C#3 — gentle color
    createDrone(ac, 164.81, 0.04, 0.010),  // E3 — high overtone
  ];
  const noiseNodes = createNoisePad(ac);

  nodes = [...drones.flat(), ...noiseNodes];

  // Fade in over 3 seconds
  masterGain.gain.setValueAtTime(0, ac.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.55, ac.currentTime + 3.0);
}

export function stopAmbient() {
  if (!masterGain || !ctx) return;

  // Fade out over 1.5 seconds then kill nodes
  const now = ctx.currentTime;
  masterGain.gain.setValueAtTime(masterGain.gain.value, now);
  masterGain.gain.linearRampToValueAtTime(0, now + 1.5);

  setTimeout(() => {
    nodes.forEach((n) => {
      try { n.stop?.(); } catch (_) {}
      try { n.disconnect(); } catch (_) {}
    });
    nodes = [];
    masterGain = null;
  }, 1600);
}

export function isAmbientPlaying() {
  return nodes.length > 0;
}

/** Very short UI blip: sine ping */
export function playUISound(type = 'hover') {
  if (typeof window === 'undefined') return;
  // Respect reduced motion preference — skip sounds too
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ac = getCtx();
  if (ac.state === 'suspended') return; // don't resume just for UI sounds

  const osc = ac.createOscillator();
  const g = ac.createGain();

  const CONFIGS = {
    hover:   { freq: 880,  gain: 0.04, dur: 0.07,  type: 'sine'     },
    folder:  { freq: 440,  gain: 0.06, dur: 0.14,  type: 'triangle' },
    career:  { freq: 528,  gain: 0.07, dur: 0.18,  type: 'sine'     },
    click:   { freq: 660,  gain: 0.05, dur: 0.08,  type: 'sine'     },
  };

  const cfg = CONFIGS[type] || CONFIGS.hover;
  osc.type = cfg.type;
  osc.frequency.value = cfg.freq;
  g.gain.setValueAtTime(0, ac.currentTime);
  g.gain.linearRampToValueAtTime(cfg.gain, ac.currentTime + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + cfg.dur);

  osc.connect(g);
  g.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + cfg.dur + 0.01);
}
