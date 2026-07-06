import CountUp from './CountUp';

export default function AboutScene() {
  return (
    <section
      id="about"
      className="scene"
      style={{ minHeight: 'auto', justifyContent: 'flex-start', paddingTop: '80px', paddingBottom: '80px' }}
    >
      <div className="sec-wrap">
        <div className="sec-label reveal-up">ABOUT // CORE PRINCIPLES</div>
        <div className="reveal-up" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--white)', lineHeight: '1.2', marginBottom: '40px', fontWeight: 500, fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '1px' }}>
          ENGINEERED FOR <em style={{ color: 'var(--amber)', fontStyle: 'normal' }}>UNCOMPROMISING PERFORMANCE</em> AND SCIENTIFIC PRECISION.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
          <div data-reveal="left" className="solid-panel" style={{ padding: '40px 32px' }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--amber)', marginBottom: '16px', fontFamily: 'Bebas Neue' }}>01.1 // SYSTEM RESILIENCE</h3>
            <p style={{ color: 'var(--cold2)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              Engineered to bridge the gap between high-stakes requirements and bulletproof software. Deployed secure database portals for critical government infrastructure like the Chennai Metro Rail Limited (<strong style={{ color: 'var(--white)' }}>CMRL</strong>), demonstrating a rigorous approach to security and compliance under real-world pressure.
            </p>
          </div>
          <div data-reveal="right" className="solid-panel" style={{ padding: '40px 32px', transitionDelay: '0.1s' }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--amber)', marginBottom: '16px', fontFamily: 'Bebas Neue' }}>01.2 // PIPELINE DATA TUNING</h3>
            <p style={{ color: 'var(--cold2)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              Obsessed with eliminating architectural friction and data noise. Reduced machine learning pipeline input entropy by <CountUp value={20} /> utilizing custom mathematical outlier filters, driving clean data propagation and accelerating downstream inference cycles.
            </p>
          </div>
          <div data-reveal="left" className="solid-panel" style={{ padding: '40px 32px', transitionDelay: '0.2s' }}>
            <h3 style={{ fontSize: '1.8rem', color: 'var(--amber)', marginBottom: '16px', fontFamily: 'Bebas Neue' }}>01.3 // HIGH-THROUGHPUT ARCHITECTURE</h3>
            <p style={{ color: 'var(--cold2)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              Architected for absolute future scalability. Enforced modular data layers and strict JWT authentication contracts, yielding <CountUp value={35} /> optimized access efficiency and lowering system latencies by <CountUp value={18} />. No shortcuts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
