import { trackEvent } from '../../utils/analytics';

export default function LinkButton({ label, href, note }) {
  if (!href) return null;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="magnetic"
        aria-label={`${label} — opens in new tab`}
        onClick={() => {
          if (label === 'Live Demo') trackEvent('Live Demo Clicked', { url: href });
          if (label === 'GitHub') trackEvent('GitHub Clicked', { url: href });
        }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          padding: 'var(--space-2) var(--space-4)',
          fontSize: 'var(--text-xs)',
          fontFamily: 'DM Mono',
          letterSpacing: '0.06em',
          textDecoration: 'none',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--glass-border)',
          color: 'var(--cold2)',
          background: 'rgba(255, 255, 255, 0.02)',
          transition: 'border-color 0.25s ease, color 0.25s ease, background 0.25s ease, transform 0.25s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
          e.currentTarget.style.color = 'var(--white)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--glass-border)';
          e.currentTarget.style.color = 'var(--cold2)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {label}
        <span aria-hidden="true" style={{ opacity: 0.6 }}>↗</span>
      </a>
    );
  }

  return null;
}
