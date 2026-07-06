import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../store';

/**
 * SCENE CONTROLLER v3
 * 
 * Manages cinematic DOM-level animations using data attributes.
 * Highly optimized, replayable, and safe against React/WebGL crashes.
 */
export default function SceneController() {
  const isExperienceUnlocked = useStore((state) => state.isExperienceUnlocked);
  const activeTrack = useStore((state) => state.activeTrack);

  useEffect(() => {
    // DO NOT initialize animations while the entry modal is blocking the screen
    if (!isExperienceUnlocked) return;

    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false;
    
    if (prefersReducedMotion) return;

    // Responsive slide distances to prevent mobile overflow
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const xOffset = isMobile ? 30 : (isTablet ? 45 : 70);

    // Provide a small timeout to allow React to commit layout after unlock/track change
    const initTimer = setTimeout(() => {
      let ctx = gsap.context(() => {

        // ─────────────────────────────────────────────────────────────────
        // 1. DATA-REVEAL ARCHITECTURE (LEFT / RIGHT / UP)
        // ─────────────────────────────────────────────────────────────────
        const reveals = document.querySelectorAll('[data-reveal]');

        reveals.forEach((el) => {
          const direction = el.getAttribute('data-reveal');
          let fromState = { opacity: 0 };
          let toState = { opacity: 1 };

          if (direction === 'left') {
            fromState.x = -xOffset;
            toState.x = 0;
          } else if (direction === 'right') {
            fromState.x = xOffset;
            toState.x = 0;
          } else {
            // Default to 'up'
            fromState.y = 40;
            toState.y = 0;
          }

          // Initial CSS is visible, GSAP safely sets it to invisible immediately
          gsap.fromTo(el, fromState, {
            ...toState,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%', // Trigger when top of element hits 90% of viewport
              end: 'bottom 10%', // Reset when bottom of element leaves 10% of viewport
              toggleActions: 'play reset play reset', // Play forward, reset on leave, play reverse on re-enter, reset on leave bottom
            },
          });
        });

        // ─────────────────────────────────────────────────────────────────
        // 2. LEGACY REVEALS (preserve existing classes just in case)
        // ─────────────────────────────────────────────────────────────────
        const legacyReveals = document.querySelectorAll('.reveal-up, .reveal-scale');

        legacyReveals.forEach((el) => {
          let fromState = { y: 40, opacity: 0 };
          let toState = { y: 0, opacity: 1 };

          if (el.classList.contains('reveal-scale')) {
            fromState = { scale: 0.95, opacity: 0, y: 0 };
            toState = { scale: 1, opacity: 1 };
          }

          gsap.fromTo(el, fromState, {
            ...toState,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play reset play reset',
            },
          });
        });

        // ─────────────────────────────────────────────────────────────────
        // 3. PARALLAX LAYERS — Depth effect
        // ─────────────────────────────────────────────────────────────────
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        parallaxElements.forEach((el) => {
          const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;

          gsap.to(el, {
            y: (i) => {
              const pos = gsap.getProperty(el, 'y');
              return (pos || 0) + window.innerHeight * speed;
            },
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top center',
              scrub: 1,
            },
          });
        });

        // ─────────────────────────────────────────────────────────────────
        // 4. ACCENT ANIMATIONS — Eye-catching elements
        // ─────────────────────────────────────────────────────────────────
        const accents = document.querySelectorAll('[data-accent-animate]');

        accents.forEach((el) => {
          const animationType = el.getAttribute('data-accent-animate') || 'float';

          if (animationType === 'float') {
            gsap.fromTo(el, { y: 0 }, {
              y: -20,
              duration: 3,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
            });
          } else if (animationType === 'pulse') {
            gsap.fromTo(el, { scale: 1, opacity: 1 }, {
              scale: 1.05,
              opacity: 0.8,
              duration: 2,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
            });
          } else if (animationType === 'rotate') {
            gsap.to(el, {
              rotation: 360,
              duration: 20,
              ease: 'none',
              repeat: -1,
            });
          }
        });

        // Refresh calculations explicitly once context is setup
        ScrollTrigger.refresh();
      });

      // Cleanup context safely (only destroys animations created in this specific context)
      return () => {
        ctx.revert();
      };
    }, 50);

    return () => clearTimeout(initTimer);
  }, [isExperienceUnlocked, activeTrack]); // Crucial: Re-run when Career Mode changes or Gate unlocks

  return null;
}
