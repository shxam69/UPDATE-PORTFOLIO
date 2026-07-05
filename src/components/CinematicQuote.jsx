import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CinematicQuote() {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup initial state
      gsap.set(text1Ref.current.children, { display: 'none' });
      gsap.set(text2Ref.current.children, { display: 'none' });
      gsap.set(cursorRef.current, { opacity: 1 });

      // Blinking cursor
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'steps(1)',
        repeat: -1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reset',
        },
      });

      // Type first sentence
      tl.to(text1Ref.current.children, {
        display: 'inline',
        duration: 0.05,
        stagger: 0.05,
        ease: 'none',
      })
      // Pause
      .to({}, { duration: 0.6 })
      // Type second sentence
      .to(text2Ref.current.children, {
        display: 'inline',
        duration: 0.05,
        stagger: 0.08,
        ease: 'none',
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const line1 = "The best systems don't just solve problems.";
  const line2 = " They are remembered.";

  return (
    <div
      ref={containerRef}
      style={{
        marginBottom: '0',
        fontFamily: 'Syne, sans-serif',
        fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
        color: 'var(--cold)',
        minHeight: '3em',
        lineHeight: '1.6',
        textShadow: '0 0 20px rgba(255,255,255,0.1)',
        fontWeight: 400,
        textAlign: 'center',
      }}
    >
      <div ref={text1Ref}>
        {line1.split('').map((char, i) => <span key={`l1-${i}`}>{char}</span>)}
      </div>
      <div style={{ marginTop: '0.5em' }}>
        <span ref={text2Ref} style={{ color: 'var(--cold2)', fontStyle: 'italic', fontWeight: 400 }}>
          {line2.split('').map((char, i) => <span key={`l2-${i}`}>{char}</span>)}
        </span>
        <span ref={cursorRef} style={{ color: 'var(--amber)', marginLeft: '6px', fontStyle: 'normal' }}>
          █
        </span>
      </div>
    </div>
  );
}
