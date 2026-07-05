import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Reveal name letters
    tl.fromTo(
      nameRef.current?.querySelectorAll('span') || [],
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: 'power3.out' },
      0.2
    );

    // Progress bar fill
    tl.fromTo(
      progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.8, ease: 'power2.inOut', transformOrigin: 'left center' },
      0.3
    );

    // Fade out entire screen
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.55,
        ease: 'power2.inOut',
        onComplete: () => onComplete?.(),
      },
      '+=0.15'
    );

    return () => tl.kill();
  }, [onComplete]);

  const letters = 'SHYAM A'.split('');

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'var(--ink)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
        pointerEvents: 'all',
      }}
    >
      {/* Name */}
      <h1
        ref={nameRef}
        style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          letterSpacing: '0.15em',
          color: 'var(--white)',
          display: 'flex',
          gap: '0.05em',
        }}
      >
        {letters.map((ch, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: 0,
              color: ch === 'A' && i > 5 ? 'var(--amber)' : 'var(--white)',
            }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </h1>

      {/* Tagline */}
      <div
        style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          color: 'var(--cold3)',
          textTransform: 'uppercase',
        }}
      >
        Portfolio — Systems &amp; ML
      </div>

      {/* Progress track */}
      <div
        style={{
          width: 'min(320px, 70vw)',
          height: '2px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--amber), #ffcc55)',
            borderRadius: '2px',
            boxShadow: '0 0 12px var(--amber-glow)',
            transformOrigin: 'left center',
            scaleX: 0,
          }}
        />
      </div>
    </div>
  );
}
