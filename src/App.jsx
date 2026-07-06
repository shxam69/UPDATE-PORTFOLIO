import { useState, useCallback } from 'react';
import { useStore } from './store';
import { useEngine } from './useEngine';
import LoadingScreen from './components/LoadingScreen';
import CursorController from './components/CursorController';
import SceneController from './components/SceneController';
import HeroScene from './components/HeroScene';
import NavBar from './components/NavBar';
import AboutScene from './components/AboutScene';
import MindsetScene from './components/MindsetScene';
import ExperienceScene from './components/ExperienceScene';
import MilestonesScene from './components/MilestonesScene';
import CertificationsScene from './components/CertificationsScene';
import BeyondCodeScene from './components/BeyondCodeScene';
import SkillsScene from './components/SkillsScene';
import SilenceScene from './components/SilenceScene';
import ProjectsScene from './components/ProjectsScene';
import ContactScene from './components/ContactScene';
import CareerNotch from './components/CareerNotch';
import MusicPlayer from './components/MusicPlayer';
import Galaxy from './components/Galaxy';
import ExperienceNotice from './components/ExperienceNotice';
import { Analytics } from '@vercel/analytics/react';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  useEngine();

  const [loaded, setLoaded] = useState(false);
  const progress = useStore((state) => state.scrollProgress);
  const activeTrack = useStore((state) => state.activeTrack);
  const isExperienceUnlocked = useStore((state) => state.isExperienceUnlocked);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Analytics />
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* Scroll progress bar */}
      <div
        id="scroll-progress"
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          background: 'linear-gradient(90deg, var(--amber), #ffcc55)',
          width: `${progress * 100}%`,
          zIndex: 99999,
          boxShadow: '0 0 12px var(--amber-glow)',
          transition: 'width 0.1s linear',
        }}
      />

      <CursorController />
      <SceneController />
      <ExperienceNotice />
      
      <div 
        inert={!isExperienceUnlocked ? "" : undefined}
        style={{ pointerEvents: isExperienceUnlocked ? 'auto' : 'none' }}
      >
        <NavBar />
        <CareerNotch />

        {/* Bottom-right ambient music control */}
        <MusicPlayer />
      </div>

      {/* Global Galaxy Background */}
      <div
        inert={!isExperienceUnlocked ? "" : undefined}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          backgroundColor: '#000000',
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url(/milkyway.jpg)',
            backgroundSize: '10%',
            backgroundPosition: 'top right',
            backgroundRepeat: 'no-repeat',
            opacity: 0.15,
          }}
        />
        <ErrorBoundary>
          <Galaxy 
            mouseRepulsion={true}
            mouseInteraction={true}
            density={0.8}
            glowIntensity={0.15}
            saturation={0.05} // nearly monochrome
            starSpeed={0.08} // very slow
            speed={0.4} // very slow
            transparent={true}
            disableAnimation={!isExperienceUnlocked}
            twinkleIntensity={0.15}
            hueShift={activeTrack === 'ml' ? 190 : 30} // cyan for ml, amber for software
          />
        </ErrorBoundary>
      </div>

      <main 
        id="main-content" 
        inert={!isExperienceUnlocked ? "" : undefined}
        style={{ 
          position: 'relative', 
          zIndex: 2,
          pointerEvents: isExperienceUnlocked ? 'auto' : 'none'
        }}
      >
        <HeroScene />
        <AboutScene />
        <MindsetScene />
        <ExperienceScene />
        <MilestonesScene />
        <CertificationsScene />
        <BeyondCodeScene />
        <SkillsScene />
        <SilenceScene />
        <ProjectsScene />
        <ContactScene />

        {/* Minimal Footer */}
        <footer
          style={{
            position: 'relative',
            zIndex: 2,
            background: 'transparent',
            overflow: 'hidden',
          }}
          aria-label="Site footer"
        >
          {/* Footer bar */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.06)',
              padding: '24px 40px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.25)',
              textTransform: 'uppercase',
            }}
          >
            <span>© {new Date().getFullYear()} Shyam A — All rights reserved</span>
            <span style={{ color: 'rgba(245, 166, 35, 0.45)' }}>Built with React · Three.js · GSAP</span>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
