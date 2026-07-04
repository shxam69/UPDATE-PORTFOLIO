import { create } from 'zustand';

// Scene metadata for cinematic orchestration
export const SCENES = {
  HERO: { id: 'hero', index: 0, name: 'Hero', lightIntensity: 1.5, ambientColor: '#f5a623', scrollRange: [0, 0.1] },
  ABOUT: { id: 'about', index: 1, name: 'About', lightIntensity: 0.5, ambientColor: '#e0e6ed', scrollRange: [0.1, 0.25] },
  EXPERIENCE: { id: 'experience', index: 2, name: 'Experience', lightIntensity: 0.7, ambientColor: '#8899bb', scrollRange: [0.25, 0.45] },
  PROJECTS: { id: 'projects', index: 3, name: 'Projects', lightIntensity: 1.2, ambientColor: '#f5a623', scrollRange: [0.45, 0.65] },
  SKILLS: { id: 'skills', index: 4, name: 'Skills', lightIntensity: 0.6, ambientColor: '#00e676', scrollRange: [0.65, 0.8] },
  CONTACT: { id: 'contact', index: 5, name: 'Contact', lightIntensity: 0.4, ambientColor: '#ff3344', scrollRange: [0.8, 1.0] },
};

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
  
  // Track narrative (software or ml)
  activeTrack: 'software',
  
  // Performance monitoring
  fps: 60,
  
  // Setters
  setActiveTrack: (activeTrack) => set({ activeTrack }),
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
}));

// Fallback compatibility
export const globalState = { scrollProgress: 0 };
