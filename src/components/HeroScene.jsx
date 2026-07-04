import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../store';

/**
 * HERO SCENE — Premium entrance with parallax text + Career Mode
 *
 * Features:
 * - Staggered character animation
 * - Parallax depth layers
 * - "Choose Your Path" career-mode selector, wired to the global
 *   activeTrack store (also drives ProjectsScene / SkillsScene)
 * - Two-column responsive layout
 */

const TRACK_CONTENT = {
  software: {
    accent: 'var(--amber)',
    accentGlow: 'var(--amber-glow)',
    accentRgb: '245, 166, 35',
    eyebrow: 'Software Engineering — Scalable Infrastructure',
    heading: 'Systems & Architecture',
    bullets: [
      { label: 'Core', text: 'Distributed microservices, backend pipelines, web platforms' },
      { label: 'Resilience', text: 'JWT-secured, parameter-locked government portal (CMRL)' },
    ],
    stats: [
      { value: '3+', label: 'Internships' },
      { value: '35%', label: 'Latency reduction' },
    ],
    resumeHref: '/ShyamA_SWE_Resume.pdf',
    resumeFilename: 'ShyamA_SWE_Resume.pdf',
    resumeLabel: 'Download SWE Resume',
    btnClass: 'btn-amber',
  },
  ml: {
    accent: 'var(--cyan)',
    accentGlow: 'var(--cyan-glow)',
    accentRgb: '41, 182, 246',
    eyebrow: 'Machine Learning — Explainable Intelligence',
    heading: 'Intelligence & Models',
    bullets: [
      { label: 'Design', text: 'Probabilistic prototype-based networks, explainable AI (XAI)' },
      { label: 'Engineering', text: 'Custom preprocessing filters, PyTorch CNNs, SHAP explainability' },
    ],
    stats: [
      { value: '8.5', label: 'CGPA' },
      { value: '5+', label: 'ML/Systems credentials' },
    ],
    resumeHref: '/ShyamA_MLE_Resume.pdf',
    resumeFilename: 'ShyamA_MLE_Resume.pdf',
    resumeLabel: 'Download MLE Resume',
    btnClass: 'btn-cyan',
  },
};

export default function HeroScene() {
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const activeTrack = useStore((state) => state.activeTrack);
  const setActiveTrack = useStore((state) => state.setActiveTrack);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // ─────────────────────────────────────────────────────────────────
      // Character stagger animation (primary heading)
      // ─────────────────────────────────────────────────────────────────
      tl.to(
        '.hero-char',
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: 'back.out(2)',
        },
        0.3
      );

      // ─────────────────────────────────────────────────────────────────
      // Secondary text reveal (fade + slide)
      // ─────────────────────────────────────────────────────────────────
      tl.to(
        '.hero-fade',
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
        },
        0.5
      );

      // ─────────────────────────────────────────────────────────────────
      // CTA buttons reveal
      // ─────────────────────────────────────────────────────────────────
      tl.to(
        '.hero-cta',
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
        },
        1
      );

      // ─────────────────────────────────────────────────────────────────
      // Continuous floating accent
      // ─────────────────────────────────────────────────────────────────
      gsap.to('.hero-accent', {
        y: -20,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Crossfade the identity card whenever the career mode changes
  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
    );
  }, [activeTrack]);

  const name = 'SHYAM A';
  const subtitle =
    'I architect robust distributed platforms and explainable machine learning systems — from secure metro-rail infrastructure to prototype-based neural networks built for real-world stability.';

  const track = TRACK_CONTENT[activeTrack] || TRACK_CONTENT.software;

  return (
    <section
      id="hero"
      className="scene"
      ref={heroRef}
      style={{
        paddingTop: '120px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
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
            gap: 'var(--space-6)',
          }}
        >
          {/* ─────────────────────────────────────────────────────────
              HERO LABEL (badge)
              ───────────────────────────────────────────────────────── */}
          <div
            className="hero-fade"
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.2em',
              color: 'var(--amber)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-2)',
              opacity: 0,
              transform: 'translateY(20px)',
              fontWeight: 600,
              display: 'inline-block',
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              width: 'fit-content',
              border: '1px solid var(--glass-border)',
              background: 'rgba(255, 255, 255, 0.02)',
            }}
          >
            Portfolio — Systems &amp; Machine Learning
          </div>

          {/* ─────────────────────────────────────────────────────────
              HERO NAME (primary heading)
              ───────────────────────────────────────────────────────── */}
          <h1
            style={{
              fontSize: 'clamp(4rem, 15vw, 10rem)',
              marginBottom: 'var(--space-2)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.1em',
              textShadow:
                '0 0 40px rgba(245, 166, 35, 0.15), 0 0 80px rgba(245, 166, 35, 0.05)',
              lineHeight: 0.9,
              fontWeight: 700,
              letterSpacing: '-0.03em',
            }}
          >
            {name.split('').map((char, i) => (
              <span
                key={i}
                className="hero-char"
                style={{
                  opacity: 0,
                  transform: 'translateY(60px)',
                  display: 'inline-block',
                  fontSize: 'inherit',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* ─────────────────────────────────────────────────────────
              HERO TAGLINE (subheading)
              ───────────────────────────────────────────────────────── */}
          <h2
            className="hero-fade"
            style={{
              fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
              lineHeight: 1.2,
              color: 'var(--white)',
              fontWeight: 600,
              fontFamily: 'Bebas Neue, sans-serif',
              maxWidth: '950px',
              marginBottom: 'var(--space-4)',
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

          {/* ─────────────────────────────────────────────────────────
              HERO DESCRIPTION
              ───────────────────────────────────────────────────────── */}
          <p
            className="hero-fade"
            style={{
              fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)',
              lineHeight: 1.7,
              color: 'var(--cold2)',
              maxWidth: '850px',
              marginBottom: 'var(--space-6)',
              opacity: 0,
              transform: 'translateY(20px)',
              letterSpacing: '0.01em',
            }}
          >
            {subtitle}
          </p>

          {/* ─────────────────────────────────────────────────────────
              CAREER MODE — "Choose Your Path"
              ───────────────────────────────────────────────────────── */}
          <div
            className="hero-fade"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              marginBottom: 'var(--space-6)',
            }}
          >
            <div
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: 'var(--text-xs)',
                color: 'var(--cold2)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: 'var(--space-3)',
              }}
            >
              Choose Your Path
            </div>

            <div
              style={{
                display: 'inline-flex',
                padding: '6px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--glass-border)',
                background: 'rgba(5, 7, 10, 0.6)',
                backdropFilter: 'blur(15px)',
                gap: '8px',
              }}
            >
              <button
                onClick={() => setActiveTrack('software')}
                className="magnetic"
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.78rem',
                  letterSpacing: '0.04em',
                  padding: '12px 24px',
                  border: 'none',
                  background: activeTrack === 'software' ? 'var(--amber)' : 'transparent',
                  color: activeTrack === 'software' ? 'var(--ink)' : 'var(--cold2)',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  fontWeight: 700,
                  boxShadow: activeTrack === 'software' ? '0 0 20px var(--amber-glow)' : 'none',
                }}
              >
                Software Engineer
              </button>
              <button
                onClick={() => setActiveTrack('ml')}
                className="magnetic"
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.78rem',
                  letterSpacing: '0.04em',
                  padding: '12px 24px',
                  border: 'none',
                  background: activeTrack === 'ml' ? 'var(--cyan)' : 'transparent',
                  color: activeTrack === 'ml' ? 'var(--ink)' : 'var(--cold2)',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  fontWeight: 700,
                  boxShadow: activeTrack === 'ml' ? '0 0 20px var(--cyan-glow)' : 'none',
                }}
              >
                Machine Learning Engineer
              </button>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              DYNAMIC IDENTITY CARD — swaps with Career Mode
              ───────────────────────────────────────────────────────── */}
          <div
            className="hero-fade"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              marginBottom: 'var(--space-6)',
              maxWidth: '620px',
            }}
          >
            <div
              ref={cardRef}
              className="glass-panel"
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
              <a
                href={track.resumeHref}
                download={track.resumeFilename}
                className={`${track.btnClass} magnetic`}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '12px 24px',
                }}
              >
                {track.resumeLabel}
              </a>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              SECONDARY ACTIONS
              ───────────────────────────────────────────────────────── */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <a
              href="#projects"
              className="btn-outline magnetic hero-cta"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                borderColor: 'rgba(245, 166, 35, 0.3)',
                color: 'var(--amber)',
              }}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="btn-outline magnetic hero-cta"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                borderColor: 'rgba(41, 182, 246, 0.3)',
                color: 'var(--cyan)',
              }}
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────
            HERO ACCENT (floating element)
            ───────────────────────────────────────────────────────── */}
        <div
          className="hero-accent"
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(245, 166, 35, 0.15), transparent)',
            blur: '40px',
            pointerEvents: 'none',
            display: 'none',
            '@media (min-width: 1024px)': {
              display: 'block',
            },
          }}
        />
      </div>
    </section>
  );
}
