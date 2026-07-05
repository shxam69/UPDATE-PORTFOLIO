import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import ProjectVisual from './ProjectVisual';
import LinkButton from './LinkButton';
import '../PremiumGlass.css';
import { playUISound } from '../../hooks/useAudio';

export default function ProjectCard({ project, onOpen }) {
  const { title, org, description, color, techStack, metrics, links, thumbnail } = project;
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const headlineMetric = metrics?.[0];

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    const rx = (yPct - 0.5) * -10;
    const ry = (xPct - 0.5) * 10;

    // Update CSS spotlight vars
    card.style.setProperty('--mx', `${xPct * 100}%`);
    card.style.setProperty('--my', `${yPct * 100}%`);

    gsap.to(card, {
      rotationY: ry,
      rotationX: rx,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
      transformStyle: 'preserve-3d',
    });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    const card = cardRef.current;
    if (!card) return;
    gsap.killTweensOf(card);
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.7,
      ease: 'power3.out',
    });
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      playUISound('folder');
      onOpen();
    }
  }, [onOpen]);

  const handleOpen = useCallback(() => {
    playUISound('folder');
    onOpen();
  }, [onOpen]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Open case study for ${title}`}
      className="glass-card-premium glass-card-tilt explore-hover"
      style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', height: '190px', flexShrink: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
        <ProjectVisual imageUrl={thumbnail} color={color} title={title} variant="thumbnail" />
        {/* Border glow on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, transparent 60%, ${color}15)`,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Body */}
      <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1 }}>
        <div>
          <div style={{ fontFamily: 'DM Mono', fontSize: '0.68rem', color: 'var(--cold3)', marginBottom: '4px', letterSpacing: '0.08em' }}>{org}</div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'Bebas Neue, sans-serif', color: 'var(--white)', letterSpacing: '0.5px', lineHeight: 1.1 }}>
            {title}
          </h3>
        </div>

        <p style={{ fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--cold2)', margin: 0, flex: 1 }}>
          {description}
        </p>

        {/* Tech chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {techStack.slice(0, 4).map((t) => (
            <span
              key={t}
              style={{
                fontFamily: 'DM Mono',
                fontSize: '0.62rem',
                padding: '3px 8px',
                border: `1px solid ${color}30`,
                borderRadius: 'var(--radius-sm)',
                color: 'var(--cold2)',
                backgroundColor: `${color}0A`,
                letterSpacing: '0.04em',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Headline metric */}
        {headlineMetric && (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', paddingTop: 'var(--space-2)', borderTop: '1px solid var(--glass-border)' }}>
            <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.6rem', color }}>{headlineMetric.value}</span>
            <span style={{ fontFamily: 'DM Mono', fontSize: '0.68rem', color: 'var(--cold2)' }}>{headlineMetric.label}</span>
          </div>
        )}

        {/* Actions */}
        <div
          style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <LinkButton label="GitHub" href={links.github} />
          <LinkButton label="Live Demo" href={links.liveDemo} note={links.liveDemoNote} />
          <button
            onClick={(e) => { e.stopPropagation(); handleOpen(); }}
            onMouseEnter={() => playUISound('hover')}
            className="magnetic"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: 'var(--space-2) var(--space-4)',
              fontSize: 'var(--text-xs)',
              fontFamily: 'DM Mono',
              letterSpacing: '0.06em',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--ink)',
              background: color,
              cursor: 'pointer',
              fontWeight: 700,
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Case Study ↗
          </button>
        </div>
      </div>
    </div>
  );
}
