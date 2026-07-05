import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ProjectVisual from './ProjectVisual';
import ArchitectureDiagram from './ArchitectureDiagram';
import LinkButton from './LinkButton';

function Section({ title, color, children }) {
  return (
    <div style={{ marginBottom: 'var(--space-12)' }}>
      <h4
        style={{
          fontFamily: 'DM Mono',
          color,
          fontSize: 'var(--text-xs)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: 'var(--space-3)',
        }}
      >
        {title}
      </h4>
      <div style={{ fontSize: 'var(--text-base)', color: 'var(--cold)', lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}

export default function CaseStudy({ project, onClose }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, backdropFilter: 'blur(0px)' },
      { opacity: 1, backdropFilter: 'blur(30px)', duration: 0.5, ease: 'power2.out' }
    );

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, delay: 0.15, ease: 'power3.out' }
    );

    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  const handleClose = () => {
    gsap.to(contentRef.current, { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power3.in' });
    gsap.to(containerRef.current, {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      duration: 0.4,
      ease: 'power3.inOut',
      onComplete: onClose,
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!project) return null;

  const { title, org, timeline, color, description, techStack, architecture, challenge, solution, developmentProcess, results, lessonsLearned, metrics, links, heroImage } = project;

  return (
    <div
      ref={containerRef}
      onClick={handleClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(5, 7, 10, 0.85)',
        backdropFilter: 'blur(0px)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          padding: 'var(--space-6) var(--space-16)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(to bottom, rgba(5, 7, 10, 0.95) 0%, transparent 100%)',
          zIndex: 10,
        }}
      >
        <div style={{ fontFamily: 'DM Mono', fontSize: 'var(--text-xs)', color, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Case Study
        </div>
        <button
          onClick={handleClose}
          className="magnetic"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--cold2)',
            fontSize: 'var(--text-xs)',
            fontFamily: 'DM Mono',
            cursor: 'pointer',
            letterSpacing: '0.1em',
            transition: 'color var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--white)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--cold2)')}
        >
          Close
        </button>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 var(--space-12) var(--space-32)', width: '100%' }}
      >
        {/* Hero image */}
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: 'clamp(220px, 34vw, 380px)', marginBottom: 'var(--space-8)' }}>
          <ProjectVisual imageUrl={heroImage} color={color} title={title} variant="hero" />
        </div>

        <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', marginBottom: 'var(--space-2)', lineHeight: 0.95, fontWeight: 700 }}>
          {title}
        </h2>
        <div style={{ fontSize: 'var(--text-lg)', color: 'var(--cold2)', marginBottom: 'var(--space-2)', fontFamily: 'DM Mono' }}>
          {org}
        </div>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--cold3)', marginBottom: 'var(--space-8)' }}>{timeline}</div>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--cold)', lineHeight: 1.7, maxWidth: '780px', marginBottom: 'var(--space-16)' }}>
          {description}
        </p>

        <div className="case-study-content">
          {/* Sidebar */}
          <div>
            <div style={{ marginBottom: 'var(--space-12)' }}>
              <h4 style={{ fontFamily: 'DM Mono', color, fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-3)' }}>
                Impact
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {metrics.map((m) => (
                  <div key={m.label}>
                    <div style={{ fontSize: '1.6rem', fontFamily: 'Bebas Neue, sans-serif', color: 'var(--white)' }}>{m.value}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--cold2)', fontFamily: 'DM Mono' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-12)' }}>
              <h4 style={{ fontFamily: 'DM Mono', color, fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-3)' }}>
                Tech Stack
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {techStack.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: 'DM Mono',
                      fontSize: 'var(--text-xs)',
                      padding: 'var(--space-1) var(--space-2)',
                      border: `1px solid ${color}40`,
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--cold2)',
                      backgroundColor: `${color}08`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ fontFamily: 'DM Mono', color, fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-3)' }}>
                Links
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <LinkButton label="GitHub" href={links.github} />
                <LinkButton label="Live Demo" href={links.liveDemo} note={links.liveDemoNote} />
              </div>
            </div>
          </div>

          {/* Story panels */}
          <div>
            <Section title="Problem" color={color}>
              <p>{challenge}</p>
            </Section>

            <Section title="Architecture" color={color}>
              <ArchitectureDiagram layers={architecture} color={color} />
            </Section>

            <Section title="Solution" color={color}>
              <p>{solution}</p>
            </Section>

            <Section title="Development Process" color={color}>
              <p>{developmentProcess}</p>
            </Section>

            <Section title="Results" color={color}>
              <p>{results}</p>
            </Section>

            <Section title="Lessons Learned" color={color}>
              <p>{lessonsLearned}</p>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
