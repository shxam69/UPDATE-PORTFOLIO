import './LogoLoop.css';

export default function LogoLoop({ items, accent = 'var(--amber)', reverse = false }) {
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="logo-loop-container">
      <div className={`logo-loop-track ${reverse ? 'reverse' : ''}`}>
        {duplicatedItems.map((itemObj, index) => {
          const { label, icon: LogoIcon, color } = itemObj;
          return (
            <div key={`${label}-${index}`} className="logo-loop-item" style={{ '--accent': accent }}>
              {LogoIcon && (
                <span className="logo-loop-icon" style={{ color: color || 'inherit' }}>
                  <LogoIcon size={32} />
                </span>
              )}
              <span className="logo-loop-label">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
