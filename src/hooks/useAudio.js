/**
 * Audio Engine — HTML5 Audio
 * Manages background music and UI sounds.
 */

// Create exactly ONE logical background audio instance
let bgMusic = null;

// ---------------------------------------------------------
// EXACT LOCATION WHERE I CAN CHANGE THE SONG LATER:
// Change the path below to point to a different MP3 file.
const AUDIO_FILE_PATH = '/audio/ambient.mp3';
// ---------------------------------------------------------

// ---------------------------------------------------------
// EXACT LOCATION WHERE I CAN CHANGE THE VOLUME LATER:
// Default volume (0.0 to 1.0)
const DEFAULT_VOLUME = 0.10;
// ---------------------------------------------------------

function getBgMusic() {
  if (typeof window === 'undefined') return null;
  if (!bgMusic) {
    bgMusic = new Audio(AUDIO_FILE_PATH);
    bgMusic.loop = true;
    bgMusic.volume = DEFAULT_VOLUME;
  }
  return bgMusic;
}

export function startAmbient() {
  const audio = getBgMusic();
  if (!audio) return;
  
  // Handle audio.play() as a Promise gracefully
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.warn("Audio playback failed (browser autoplay restriction or missing file):", error);
    });
  }
}

export function stopAmbient() {
  const audio = getBgMusic();
  if (!audio) return;
  audio.pause();
}

export function isAmbientPlaying() {
  const audio = getBgMusic();
  if (!audio) return false;
  return !audio.paused;
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
