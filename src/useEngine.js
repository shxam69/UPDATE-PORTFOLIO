import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useStore, globalState } from './store';

export function useEngine() {
  const setScroll = useStore((state) => state.setScroll);
  const setTime = useStore((state) => state.setTime);
  const setMouse = useStore((state) => state.setMouse);
  const setFps = useStore((state) => state.setFps);

  useEffect(() => {
    // ─────────────────────────────────────────────────────────────────────
    // 1. Initialize Lenis with optimized settings
    // ─────────────────────────────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    window.__lenis = lenis;

    // ─────────────────────────────────────────────────────────────────────
    // 2. Synchronize Lenis → Zustand Store (reactive scroll)
    // ─────────────────────────────────────────────────────────────────────
    lenis.on('scroll', (e) => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      
      // Update store with scroll data
      setScroll(window.scrollY, progress);
      
      // Fallback compatibility
      globalState.scrollProgress = progress;
      
      // Update GSAP ScrollTrigger
      ScrollTrigger.update();
    });

    // ─────────────────────────────────────────────────────────────────────
    // 3. Connect GSAP Ticker to Lenis for smooth RAF integration
    // ─────────────────────────────────────────────────────────────────────
    const updateGSAP = (time) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(updateGSAP);
    gsap.ticker.lagSmoothing(0);

    // ─────────────────────────────────────────────────────────────────────
    // 4. Global Animation Loop
    // ─────────────────────────────────────────────────────────────────────
    let animationFrameId;
    let startTime = performance.now();
    let frameCount = 0;
    let lastFpsTime = performance.now();

    const loop = (currentTime) => {
      const elapsed = (currentTime - startTime) * 0.001; // Convert to seconds
      setTime(elapsed);

      // ─ Performance monitoring (calculate FPS every 500ms) ─
      frameCount++;
      const timeSinceLastCheck = currentTime - lastFpsTime;
      if (timeSinceLastCheck >= 500) {
        const fps = Math.round((frameCount * 1000) / timeSinceLastCheck);
        setFps(fps);
        frameCount = 0;
        lastFpsTime = currentTime;

        // Log performance warning if FPS is low
        if (fps < 30 && fps > 0) {
          console.warn(`⚠ Low FPS detected: ${fps}fps. Consider reducing particles or enabling mobile optimizations.`);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop(performance.now());

    // ─────────────────────────────────────────────────────────────────────
    // 5. Mouse Tracking (normalized to -1 to 1 range for WebGL)
    // ─────────────────────────────────────────────────────────────────────
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse(x, y);
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ─────────────────────────────────────────────────────────────────────
    // 6. Handle resize events (recalculate scroll progress)
    // ─────────────────────────────────────────────────────────────────────
    const handleResize = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScroll(window.scrollY, progress);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // ─────────────────────────────────────────────────────────────────────
    // 7. Cleanup on unmount
    // ─────────────────────────────────────────────────────────────────────
    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateGSAP);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [setScroll, setTime, setMouse, setFps]);

  return null;
}
