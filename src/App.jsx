import { Canvas } from '@react-three/fiber';
import { useStore } from './store';
import { useEngine } from './useEngine';
import CursorController from './components/CursorController';
import SceneController from './components/SceneController';
import AstroEnvironment from './components/canvas/AstroEnvironment';
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

function App() {
  // Initialize the engine (Lenis, global loop, mouse tracking)
  useEngine();

  // Bind UI to the store
  const progress = useStore((state) => state.scrollProgress);

  return (
    <>


      {/* Scroll progress indicator */}
      <div
        id="scroll-progress"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--amber), #ffcc55)',
          width: `${progress * 100}%`,
          zIndex: 99999,
          boxShadow: '0 0 15px var(--amber-glow)',
          transition: 'width 0.1s linear',
        }}
      />

      {/* Custom cursor */}
      <CursorController />

      {/* Scene controller for GSAP animations */}
      <SceneController />

      {/* ── PHASE 1: Premium NavBar (replaces old inline <nav>) ── */}
      <NavBar />

      {/* WebGL background (fixed) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: false,
            alpha: true,
            depth: true,
            stencil: false,
            powerPreference: 'high-performance',
          }}
        >
          <AstroEnvironment />
        </Canvas>
      </div>

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 2 }}>
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
      </main>
    </>
  );
}

export default App;
