import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../store';
import { TRACK_CONTENT } from '../data/trackContent';
import StarBorder from './StarBorder';
import { useSpotlight } from '../hooks/useSpotlight';
import Saturn from './Saturn';

/** HERO SCENE — Premium entrance with parallax text + Career Mode identity
 *
 * The Career Mode selector itself now lives in NavBar (single source of
 * truth, persistent across every section). This component only reacts to
 * `activeTrack` — it never mutates it.
 *
 * Features:
 * - Staggered character animation, replayed on every Career Mode switch
 *   (via `heroReplayKey`), not just on first mount
 * - Parallax depth layers
 * - Dynamic identity card that crossfades between SWE / MLE content
 */
export default function HeroScene() {
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const activeTrack = useStore((state) => state.activeTrack);
  const heroReplayKey = useStore((state) => state.heroReplayKey);
  const { onMouseMove: cardSpotlight, onMouseLeave: cardSpotlightLeave } = useSpotlight(cardRef);


  // Entrance timeline — runs on mount AND replays on every Career Mode
  // switch (heroReplayKey changes), per the "replay Hero entrance
  // animation" requirement.
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reset to the pre-animation state first so the replay is a real
      // replay, not a no-op (elements are already at rest after the
      // first run).
      gsap.set(containerRef.current, { scale: 0.96, opacity: 0 });
      gsap.set('.hero-char', { y: 60, opacity: 0 });
      gsap.set('.hero-fade', { y: 20, opacity: 0 });
      gsap.set('.hero-cta', { y: 20, opacity: 0 });

      const tl = gsap.timeline({ 
        delay: 3,
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.to(containerRef.current, { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }, 0)
        .to('.hero-char', { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'back.out(2)' }, 0.15)
        .to('.hero-fade', { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power2.out' }, 0.35)
        .to('.hero-cta', { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }, 0.85);

      // Continuous floating accent
      gsap.to('.hero-accent', { y: -20, duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true });
    }, heroRef);

    return () => ctx.revert();
  }, [heroReplayKey]);

  // Crossfade the identity card whenever the career mode changes
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(cardRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
  }, [activeTrack]);

  const name = 'SHYAM A';

  const track = TRACK_CONTENT[activeTrack] || TRACK_CONTENT.software;

  return (
    <section
      id="hero"
      className="scene"
      ref={heroRef}
      style={{
        paddingTop: '96px',
        paddingBottom: '64px',
        minHeight: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'visible',
      }}
    >
      <div className="sec-wrap">
        <div
          ref={containerRef}
          style={{
            maxWidth: '1250px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-4)',
          }}
        >

          {/* HERO NAME (primary heading) */}
          <h1
            style={{
              fontSize: 'clamp(4rem, 15vw, 10rem)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.1em',
              textShadow: '0 0 40px rgba(245, 166, 35, 0.15), 0 0 80px rgba(245, 166, 35, 0.05)',
              lineHeight: 0.9,
              fontWeight: 700,
              letterSpacing: '-0.03em',
            }}
          >
            {name.split('').map((char, i) => (
              <span
                key={i}
                className="hero-char"
                style={{ opacity: 0, transform: 'translateY(60px)', display: 'inline-block', fontSize: 'inherit' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* HERO TAGLINE */}
          <h2
            className="hero-fade"
            style={{
              fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
              lineHeight: 1.2,
              color: 'var(--white)',
              fontWeight: 600,
              fontFamily: 'Bebas Neue, sans-serif',
              maxWidth: '950px',
              opacity: 0,
              transform: 'translateY(20px)',
              letterSpacing: '0.05em',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}
          >
            <span style={{ color: 'var(--amber)', textShadow: '0 0 15px var(--amber-glow)' }}>Software Engineer</span>
            <span style={{ color: 'var(--cold3)', padding: '0 6px' }}>×</span>
            <span style={{ color: 'var(--cyan)', textShadow: '0 0 15px var(--cyan-glow)' }}>Machine Learning Engineer</span>
          </h2>



          {/* DYNAMIC IDENTITY CARD — swaps with Career Mode (selector lives in NavBar) */}
          <div className="hero-fade" style={{ opacity: 0, transform: 'translateY(20px)', maxWidth: '620px' }}>
            <div
              ref={cardRef}
              className="glass-card-premium"
              onMouseMove={cardSpotlight}
              onMouseLeave={cardSpotlightLeave}
              style={{
                padding: 'var(--space-6)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                border: `1px solid rgba(${track.accentRgb}, 0.2)`,
                background: `rgba(${track.accentRgb}, 0.03)`,
              }}
            >
              <div>
                <div style={{ fontFamily: 'DM Mono', fontSize: '0.68rem', color: track.accent, letterSpacing: '0.08em', marginBottom: 'var(--space-2)' }}>
                  {track.eyebrow}
                </div>
                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: 'var(--white)', letterSpacing: '1px', marginBottom: 'var(--space-3)' }}>
                  {track.heading}
                </h3>
                <ul style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', margin: 0 }}>
                  {track.bullets.map((b) => (
                    <li key={b.label} style={{ color: 'var(--cold2)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                      <strong style={{ color: 'var(--white)' }}>{b.label}:</strong> {b.text}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginTop: 'var(--space-4)', borderTop: `1px solid rgba(${track.accentRgb}, 0.15)`, paddingTop: 'var(--space-3)' }}>
                  {track.stats.map((s) => (
                    <div key={s.label}>
                      <div style={{ fontSize: '1.6rem', color: track.accent, fontFamily: 'Bebas Neue' }}>{s.value}</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--cold3)', fontFamily: 'DM Mono' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <StarBorder
                as="a"
                href={track.resumeHref}
                download={track.resumeFilename}
                color={track.accent}
                speed="6s"
                className={`${track.btnClass} magnetic`}
                style={{ alignSelf: 'flex-start' }}
              >
                {track.resumeLabel}
              </StarBorder>
            </div>
          </div>

          {/* SECONDARY ACTIONS */}
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
            <StarBorder
              as="a"
              href="#projects"
              color="var(--amber)"
              speed="8s"
              className="btn-outline magnetic hero-cta"
              style={{ opacity: 0, transform: 'translateY(20px)', borderColor: 'rgba(245, 166, 35, 0.3)', color: 'var(--amber)' }}
            >
              View Projects
            </StarBorder>
            <StarBorder
              as="a"
              href="#contact"
              color="var(--cyan)"
              speed="8s"
              className="btn-outline magnetic hero-cta"
              style={{ opacity: 0, transform: 'translateY(20px)', borderColor: 'rgba(41, 182, 246, 0.3)', color: 'var(--cyan)' }}
            >
              Contact Me
            </StarBorder>
          </div>
        </div>

      </div>

      {/* HERO ACCENT (3D SATURN) - Positioned precisely on lower-right, 70-80% visible */}
      <div
        className="hero-accent"
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '35vw',
          height: '35vw',
          minWidth: '400px',
          minHeight: '400px',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 1,
        }}
      >
        <Saturn />
      </div>
    </section>
  );
}
