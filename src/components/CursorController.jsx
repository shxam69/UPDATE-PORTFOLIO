import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CursorController() {
  const cursorRef = useRef(null);
  const boundElementsRef = useRef(new WeakSet());

  useEffect(() => {
    const cur = cursorRef.current;
    if (!cur) return;

    /* ───────────────────────────────────────────────────────────────────
       CURSOR TRACKING — Smooth follow with physics
       ─────────────────────────────────────────────────────────────────── */
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const ticker = gsap.ticker.add(() => {
      // Smooth easing for cursor tracking
      cursorX += (mouseX - cursorX) * 0.18;
      cursorY += (mouseY - cursorY) * 0.18;

      gsap.set(cur, {
        x: cursorX - 4,
        y: cursorY - 4,
        overwrite: 'auto',
      });
    });

    /* ───────────────────────────────────────────────────────────────────
       CLICK RIPPLE — Cinematic feedback
       ─────────────────────────────────────────────────────────────────── */
    const onClick = (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'click-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      // Ripple expands and fades out
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 0.8 },
        {
          scale: 4,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => ripple.remove(),
        }
      );

      // Cursor responds with bounce
      gsap.fromTo(cur, { scale: 0.7 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
    };

    window.addEventListener('click', onClick, { passive: true });

    /* ───────────────────────────────────────────────────────────────────
       INTERACTIVE ELEMENT BINDING
       ─────────────────────────────────────────────────────────────────── */
    const boundElements = boundElementsRef.current;

    const bindElement = (el) => {
      if (boundElements.has(el)) return;
      boundElements.add(el);

      // ─ GROW STATE (standard links, buttons) ─
      if ((el.matches('a, button') || el.classList.contains('cta')) && !el.classList.contains('explore-hover')) {
        el.addEventListener(
          'mouseenter',
          () => {
            cur.classList.add('grow');
            gsap.to(el, { duration: 0.3, ease: 'power2.out' });
          },
          { passive: true }
        );

        el.addEventListener(
          'mouseleave',
          () => {
            cur.classList.remove('grow');
            gsap.killTweensOf(el);
            gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
          },
          { passive: true }
        );
      }

      // ─ MAGNETIC STATE (form inputs, interactive elements) ─
      if (el.classList.contains('magnetic')) {
        el.addEventListener(
          'mouseenter',
          () => {
            cur.classList.add('grow');
          },
          { passive: true }
        );

        el.addEventListener(
          'mouseleave',
          () => {
            cur.classList.remove('grow');
            gsap.killTweensOf(el);
            gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1.2, 0.4)' });
          },
          { passive: true }
        );

        el.addEventListener(
          'mousemove',
          (e) => {
            const rect = el.getBoundingClientRect();
            const elementCenterX = rect.left + rect.width / 2;
            const elementCenterY = rect.top + rect.height / 2;

            const distanceX = e.clientX - elementCenterX;
            const distanceY = e.clientY - elementCenterY;

            // Magnetic pull strength varies by distance
            const distance = Math.hypot(distanceX, distanceY);
            const maxDistance = Math.hypot(rect.width, rect.height);
            const strength = Math.max(0, 1 - distance / maxDistance) * 0.5;

            const offsetX = distanceX * strength;
            const offsetY = distanceY * strength;

            gsap.to(el, {
              x: offsetX,
              y: offsetY,
              duration: 0.3,
              ease: 'power2.out',
            });
          },
          { passive: true }
        );
      }

      // ─ EXPLORE STATE (gallery items, project cards) ─
      if (el.classList.contains('explore-hover')) {
        el.addEventListener(
          'mouseenter',
          () => {
            cur.classList.remove('grow');
            cur.classList.add('explore');
          },
          { passive: true }
        );

        el.addEventListener(
          'mouseleave',
          () => {
            cur.classList.remove('explore');
          },
          { passive: true }
        );
      }

      // ─ DRAG STATE (draggable items) ─
      if (el.draggable || el.classList.contains('draggable')) {
        el.addEventListener(
          'dragstart',
          () => {
            cur.classList.add('drag');
          },
          { passive: true }
        );

        el.addEventListener(
          'dragend',
          () => {
            cur.classList.remove('drag');
          },
          { passive: true }
        );
      }
    };

    // ─ Initial binding ─
    const bindAll = () => {
      document.querySelectorAll('a, button, .magnetic, .explore-hover, .cta, .draggable').forEach(bindElement);
    };

    bindAll();

    // ─ Watch for new elements (React state changes, modals, etc) ─
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, .magnetic, .explore-hover, .cta, .draggable').forEach(bindElement);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    /* ───────────────────────────────────────────────────────────────────
       CLEANUP
       ─────────────────────────────────────────────────────────────────── */
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      gsap.ticker.remove(ticker);
      observer.disconnect();
    };
  }, []);

  return <div id="custom-cursor" ref={cursorRef} />;
}
  