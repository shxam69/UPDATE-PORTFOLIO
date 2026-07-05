import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * SCENE CONTROLLER v2
 * 
 * Manages cinematic DOM-level animations:
 * - Scene entrance/exit transitions
 * - Element reveal sequences
 * - Scroll-driven parallax
 * - Section-specific animation curves
 */
export default function SceneController() {
  useEffect(() => {
    // ─────────────────────────────────────────────────────────────────
    // 1. SCENE TRANSITIONS — Cinematic fade + scale
    // ─────────────────────────────────────────────────────────────────
    const scenes = document.querySelectorAll('.scene');

    scenes.forEach((scene, index) => {
      if (index === 0) {
        gsap.set(scene, { opacity: 1, scale: 1, y: 0, x: 0 });
      } else {
        const sceneId = scene.id;
        let fromState = { opacity: 0, y: 40 };
        
        if (sceneId === 'about') {
          fromState = { opacity: 0, x: -60, y: 0, scale: 1 };
        } else if (sceneId === 'skills') {
          fromState = { opacity: 0, x: 60, y: 0, scale: 1 };
        } else if (sceneId === 'experience') {
          fromState = { opacity: 0, y: 80, x: 0, scale: 1 };
        } else if (sceneId === 'projects') {
          fromState = { opacity: 0, y: 60, x: 0, scale: 1 };
        } else if (sceneId === 'certifications') {
          fromState = { opacity: 0, y: 30, x: 0, scale: 0.98 };
        } else if (sceneId === 'contact') {
          fromState = { opacity: 0, y: 0, x: 0, scale: 0.92 };
        } else {
          fromState = { opacity: 0, y: 40, x: 0, scale: 1 }; // fallback
        }

        gsap.fromTo(
          scene,
          fromState,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: scene,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    // ─────────────────────────────────────────────────────────────────
    // 2. ELEMENT REVEALS — Staggered sequence
    // ─────────────────────────────────────────────────────────────────
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

    reveals.forEach((el) => {
      let fromState = { y: 40, opacity: 0 };
      let toState = { y: 0, opacity: 1 };

      if (el.classList.contains('reveal-left')) {
        fromState = { x: -40, opacity: 0 };
        toState = { x: 0, opacity: 1 };
      } else if (el.classList.contains('reveal-right')) {
        fromState = { x: 40, opacity: 0 };
        toState = { x: 0, opacity: 1 };
      } else if (el.classList.contains('reveal-scale')) {
        fromState = { scale: 0.95, opacity: 0 };
        toState = { scale: 1, opacity: 1 };
      }

      gsap.fromTo(el, fromState, {
        ...toState,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
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
    // 4. STAGGER SEQUENCES — Sequential animations
    // ─────────────────────────────────────────────────────────────────
    const staggerGroups = document.querySelectorAll('[data-stagger-container]');

    staggerGroups.forEach((container) => {
      const children = container.querySelectorAll('[data-stagger-item]');
      const staggerDelay = parseFloat(container.getAttribute('data-stagger-delay')) || 0.1;

      gsap.fromTo(
        children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: staggerDelay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // ─────────────────────────────────────────────────────────────────
    // 5. ACCENT ANIMATIONS — Eye-catching elements
    // ─────────────────────────────────────────────────────────────────
    const accents = document.querySelectorAll('[data-accent-animate]');

    accents.forEach((el) => {
      const animationType = el.getAttribute('data-accent-animate') || 'float';

      if (animationType === 'float') {
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: -20,
            duration: 3,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          }
        );
      } else if (animationType === 'pulse') {
        gsap.fromTo(
          el,
          { scale: 1, opacity: 1 },
          {
            scale: 1.05,
            opacity: 0.8,
            duration: 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          }
        );
      } else if (animationType === 'rotate') {
        gsap.to(el, {
          rotation: 360,
          duration: 20,
          ease: 'none',
          repeat: -1,
        });
      }
    });

    // ─────────────────────────────────────────────────────────────────
    // 6. SCROLL-DRIVEN TEXT ANIMATIONS
    // ─────────────────────────────────────────────────────────────────
    const textAnimations = document.querySelectorAll('[data-text-animate]');

    textAnimations.forEach((el) => {
      const text = el.innerText;
      const animationType = el.getAttribute('data-text-animate') || 'fade';

      if (animationType === 'letter-reveal') {
        const letters = text.split('').map((letter) => `<span>${letter}</span>`).join('');
        el.innerHTML = letters;

        gsap.fromTo(
          el.querySelectorAll('span'),
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    // ─────────────────────────────────────────────────────────────────
    // 7. CLEANUP
    // ─────────────────────────────────────────────────────────────────
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
