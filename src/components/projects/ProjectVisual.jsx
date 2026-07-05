/**
 * ProjectVisual — thumbnail / hero image slot.
 *
 * Renders a real <img> when `imageUrl` is provided. Otherwise falls back to
 * a generated abstract visual keyed off the project's accent color and
 * title initial, so cards never show a broken image while real screenshots
 * are still being collected. Swapping in a real screenshot later is a
 * one-line change in projectsData.js — this component doesn't change.
 */
export default function ProjectVisual({ imageUrl, color = 'var(--amber)', title = '', variant = 'thumbnail' }) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    );
  }

  const initial = title.trim().charAt(0).toUpperCase() || '?';
  const isHero = variant === 'hero';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: `radial-gradient(circle at 30% 20%, ${color}22 0%, transparent 55%), radial-gradient(circle at 80% 80%, ${color}14 0%, transparent 50%), var(--ink2)`,
      }}
    >
      {/* Subtle grid texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${color}0a 1px, transparent 1px), linear-gradient(90deg, ${color}0a 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          opacity: 0.5,
        }}
      />

      {/* Watermark initial */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: isHero ? 'clamp(6rem, 16vw, 12rem)' : 'clamp(3rem, 8vw, 5rem)',
          color: `${color}20`,
          letterSpacing: '2px',
          userSelect: 'none',
        }}
      >
        {initial}
      </div>

      {/* Corner accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
    </div>
  );
}
