import { create } from 'zustand';
import { trackEvent } from './utils/analytics';

// Scene metadata for cinematic orchestration.
// NOTE: only `id`, `index`, `name`, and `scrollRange` are read anywhere in the
// app (see AstroEnvironment / useEngine). Earlier revisions carried a
// per-scene `ambientColor` (including green/red hues) and `lightIntensity`
// that were never wired to anything, but were exactly the kind of leftover
// data that gets "helpfully" re-connected by mistake and reintroduces
// section-dependent color flashing. Removed on purpose — the atmosphere is
// driven by a single, stable palette (see AstroEnvironment.jsx), not by
// per-section color metadata.
export const SCENES = {
  HERO: { id: 'hero', index: 0, name: 'Hero', scrollRange: [0, 0.1] },
  ABOUT: { id: 'about', index: 1, name: 'About', scrollRange: [0.1, 0.25] },
  EXPERIENCE: { id: 'experience', index: 2, name: 'Experience', scrollRange: [0.25, 0.45] },
  PROJECTS: { id: 'projects', index: 3, name: 'Projects', scrollRange: [0.45, 0.65] },
  SKILLS: { id: 'skills', index: 4, name: 'Skills', scrollRange: [0.65, 0.8] },
  CONTACT: { id: 'contact', index: 5, name: 'Contact', scrollRange: [0.8, 1.0] },
};

const TRACK_STORAGE_KEY = 'career-mode-track';

function getInitialTrack() {
  // Always default to software engineer on initial load
  return 'software';
}

function getInitialPrivacyState() {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem('portfolio-privacy-confirmed') === 'true';
  } catch {
    return false;
  }
}

export const useStore = create((set, get) => ({
  // Scroll state
  scroll: 0,
  scrollProgress: 0,
  
  // Time loop
  time: 0,
  
  // Input tracking
  mouseX: 0,
  mouseY: 0,
  
  // Scene awareness
  currentScene: SCENES.HERO,
  sceneTransitionProgress: 0,
  
  // Track narrative (software or ml) — persisted so a returning visitor
  // keeps their chosen Career Mode across reloads.
  activeTrack: getInitialTrack(),

  // Bumped on every Career Mode switch. HeroScene depends on this value
  // to replay its entrance animation (character stagger + fades) instead
  // of only running once on mount.
  heroReplayKey: 0,
  
  // Performance monitoring
  fps: 60,
  
  // Experience lock state
  isExperienceUnlocked: getInitialPrivacyState(),
  
  
  // Setters
  setActiveTrack: (activeTrack) => {
    if (activeTrack === get().activeTrack) return;
    try {
      window.localStorage.setItem(TRACK_STORAGE_KEY, activeTrack);
    } catch {
      // ignore write failures (e.g. Safari private mode)
    }
    
    // Analytics
    const trackName = activeTrack === 'ml' ? 'Machine Learning Engineer' : 'Software Engineer';
    trackEvent(`Career Mode Changed — ${trackName}`);
    
    set((state) => ({ activeTrack, heroReplayKey: state.heroReplayKey + 1 }));
  },
  setScroll: (scroll, scrollProgress) => {
    set({ scroll, scrollProgress });
    
    // Determine current scene based on scroll position
    const scene = Object.values(SCENES).find(
      s => scrollProgress >= s.scrollRange[0] && scrollProgress <= s.scrollRange[1]
    ) || SCENES.HERO;
    
    const prevScene = get().currentScene;
    if (scene.id !== prevScene.id) {
      set({ currentScene: scene });
    }
    
    // Calculate transition progress within section (0-1)
    const sectionStart = scene.scrollRange[0];
    const sectionEnd = scene.scrollRange[1];
    const transitionProgress = (scrollProgress - sectionStart) / (sectionEnd - sectionStart);
    set({ sceneTransitionProgress: Math.min(1, Math.max(0, transitionProgress)) });
  },
  
  setTime: (time) => set({ time }),
  setMouse: (mouseX, mouseY) => set({ mouseX, mouseY }),
  setFps: (fps) => set({ fps }),
  setExperienceUnlocked: (isExperienceUnlocked) => set({ isExperienceUnlocked }),
}));

// Fallback compatibility
export const globalState = { scrollProgress: 0 };
