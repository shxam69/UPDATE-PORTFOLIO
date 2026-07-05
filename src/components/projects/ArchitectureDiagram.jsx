/**
 * ArchitectureDiagram — renders a simple connected-box flow for a
 * project's real architecture layers (e.g. ['React UI', 'Flask API', 'MySQL']).
 * Pure data in, no hardcoded project knowledge here.
 */
export default function ArchitectureDiagram({ layers = [], color = 'var(--amber)' }) {
  if (!layers.length) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--space-2)',
      }}
    >
      {layers.map((layer, i) => (
        <div key={layer} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div
            style={{
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-sm)',
              border: `1px solid ${color}35`,
              background: `${color}0a`,
              color: 'var(--cold)',
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.78rem',
              whiteSpace: 'nowrap',
            }}
          >
            {layer}
          </div>
          {i < layers.length - 1 && (
            <span style={{ color, fontSize: '1rem', opacity: 0.7 }} aria-hidden="true">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
