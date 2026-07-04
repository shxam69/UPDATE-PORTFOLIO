import { Canvas } from '@react-three/fiber';
import { Suspense, lazy, memo } from 'react';
import { useStore } from './store';
import { useEngine } from './useEngine';
import CursorController from './components/CursorController';
import SceneController from './components/SceneController';
import AstroEnvironment from './components/canvas/AstroEnvironment';
import HeroScene from './components/HeroScene';
import SystemStatusPanel from './components/SystemStatusPanel';

// ─────────────────────────────────────────────────────────────────
// Lazy load heavy scene components for better performance
// Code-splitting these components allows:
// - Hero + critical scenes load immediately
// - Heavy scenes (Projects, Skills) load on demand
// - Better initial page load time
// ─────────────────────────────────────────────────────────────────
const AboutScene = lazy(() => import('./components/AboutScene'));
const MindsetScene = lazy(() => import('./components/MindsetScene'));
const ExperienceScene = lazy(() => import('./components/ExperienceScene'));
const MilestonesScene = lazy(() => import('./components/MilestonesScene'));
const CertificationsScene = lazy(() => import('./components/CertificationsScene'));
const BeyondCodeScene = lazy(() => import('./components/BeyondCodeScene'));
const SkillsScene = lazy(() => import('./components/SkillsScene'));
const SilenceScene = lazy(() => import('./components/SilenceScene'));
const ProjectsScene = lazy(() => import('./components/ProjectsScene'));
const ContactScene = lazy(() => import('./components/ContactScene'));

// ─────────────────────────────────────────────────────────────────
// Loading fallback (minimal component)
// ─────────────────────────────────────────────────────────────────
function SceneLoadingPlaceholder() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ opacity: 0.3, fontFamily: 'DM Mono', fontSize: '0.75rem' }}>
        Loading...
      </div>
    </div>
  );
}

function App() {
  // Initialize the engine (Lenis, global loop, mouse tracking)
  useEngine();

  // Bind UI to the store
  const progress = useStore((state) => state.scrollProgress);

  return (
    <>
      <SystemStatusPanel />

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
          // ─ Performance optimizations ─
          dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
          // Limit to 2x on high-DPI screens for performance
          gl={{
            antialias: true,
            alpha: true,
            depth: true,
            stencil: false, // Not needed for this scene
            powerPreference: 'high-performance',
          }}
        >
          <AstroEnvironment />
        </Canvas>
      </div>

      {/* Navigation */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
        }}
      >
        <div className="nav-logo">
          SH<em>Y</em>AM A
        </div>
        <ul className="nav-menu">
          <li>
            <a href="#about" className="magnetic">
              Philosophy
            </a>
          </li>
          <li>
            <a href="#experience" className="magnetic">
              Experience
            </a>
          </li>
          <li>
            <a href="#projects" className="magnetic">
              Projects
            </a>
          </li>
          <li>
            <a href="#skills" className="magnetic">
              Skills
            </a>
          </li>
          <li>
            <a href="#contact" className="magnetic">
              Contact
            </a>
          </li>
        </ul>
        <div className="nav-status">
          <span className="pulse-dot"></span>
          Available
        </div>
      </nav>

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        {/* Hero: Load immediately (critical content) */}
        <HeroScene />

        {/* Other scenes: Lazy load with fallback */}
        <Suspense fallback={<SceneLoadingPlaceholder />}>
          <AboutScene />
        </Suspense>

        <Suspense fallback={<SceneLoadingPlaceholder />}>
          <MindsetScene />
        </Suspense>

        <Suspense fallback={<SceneLoadingPlaceholder />}>
          <ExperienceScene />
        </Suspense>

        <Suspense fallback={<SceneLoadingPlaceholder />}>
          <MilestonesScene />
        </Suspense>

        <Suspense fallback={<SceneLoadingPlaceholder />}>
          <CertificationsScene />
        </Suspense>

        <Suspense fallback={<SceneLoadingPlaceholder />}>
          <BeyondCodeScene />
        </Suspense>

        <Suspense fallback={<SceneLoadingPlaceholder />}>
          <SkillsScene />
        </Suspense>

        <Suspense fallback={<SceneLoadingPlaceholder />}>
          <SilenceScene />
        </Suspense>

        <Suspense fallback={<SceneLoadingPlaceholder />}>
          <ProjectsScene />
        </Suspense>

        <Suspense fallback={<SceneLoadingPlaceholder />}>
          <ContactScene />
        </Suspense>
      </main>
    </>
  );
}

export default App;
