export default function BeyondCodeScene() {
  return (
    <section id="beyond-code" className="scene" style={{ background: 'linear-gradient(to bottom, transparent, rgba(20,24,32,0.5), transparent)' }}>
      <div className="sec-wrap">
        <div className="sec-label reveal-up">ATHLETIC RIGOR & DISCIPLINE</div>
        <h2 className="sec-title reveal-up" style={{ fontFamily: 'Bebas Neue', letterSpacing: '2px' }}>BEYOND CODE</h2>
        
        <div className="reveal-up solid-panel" style={{ padding: '60px', display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ zIndex: 1, maxWidth: '800px' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.8rem', color: 'var(--amber)', letterSpacing: '0.15em', marginBottom: '16px', fontWeight: 600 }}>
              College Basketball Champion
            </div>
            <h3 style={{ fontSize: '3rem', color: 'var(--white)', marginBottom: '32px', lineHeight: 1.1, fontFamily: 'Bebas Neue', letterSpacing: '1px' }}>
              COURT DISCIPLINE TO SYSTEMS ENGINEERING
            </h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--cold)', lineHeight: '1.8', marginBottom: '24px' }}>
              Winning at a collegiate level isn't about raw talent alone — it takes a strict execution model: reading the court in real time, making split-second tactical decisions, and holding a defensive structure under physical pressure.
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--cold)', lineHeight: '1.8' }}>
              I carry that same discipline into software engineering. Whether structuring a microservice pipeline or anchoring a defensive zone on court, the essentials are the same: 
              <strong style={{ color: 'var(--white)' }}> absolute spatial awareness, split-second execution latency, and zero tolerance for failure under stress.</strong>
            </p>
          </div>
          
          <div style={{ zIndex: 1, display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--amber)' }}>→</span>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.8rem', color: 'var(--cold2)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Consistency</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--amber)' }}>→</span>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.8rem', color: 'var(--cold2)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Teamwork & Focus</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--amber)' }}>→</span>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.8rem', color: 'var(--cold2)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pressure Execution</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
