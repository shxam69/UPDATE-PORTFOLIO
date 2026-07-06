export default function MindsetScene() {
  return (
    <section id="mindset" className="scene">
      <div className="sec-wrap">
        <div className="sec-label" data-reveal="up">ENGINEERING MINDSET</div>
        <h2 className="sec-title" data-reveal="up" style={{ fontFamily: 'Bebas Neue', letterSpacing: '2px' }}>Architectural Logic</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {/* How I Think */}
          <div data-reveal="up" className="solid-panel" style={{ padding: '48px', borderLeft: '4px solid var(--amber)' }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '24px', color: 'var(--white)', fontFamily: 'Bebas Neue', letterSpacing: '1px' }}>ARCHITECTURAL PRINCIPLES</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '32px' }}>
              <div>
                <h4 style={{ fontFamily: 'DM Mono', color: 'var(--amber)', fontSize: '0.9rem', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>▸ DECONSTRUCT COMPLEXITY</h4>
                <p style={{ color: 'var(--cold)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Deconstruct complex enterprise structures into isolated, testable modules rather than patching symptoms. Complete system comprehension is non-negotiable.
                </p>
              </div>
              <div>
                <h4 style={{ fontFamily: 'DM Mono', color: 'var(--amber)', fontSize: '0.9rem', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>▸ PREEMPTIVE ANOMALY DETECTION</h4>
                <p style={{ color: 'var(--cold)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Locate memory leaks, race conditions, and query bottlenecks during the pre-engineering draft phase before they compromise production stability.
                </p>
              </div>
              <div>
                <h4 style={{ fontFamily: 'DM Mono', color: 'var(--amber)', fontSize: '0.9rem', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>▸ SCALE INVARIANT SYSTEMS</h4>
                <p style={{ color: 'var(--cold)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Architect every interface assuming exponential data load increases. No brittle shortcuts, no fragile hardcoding, no temporary solutions.
                </p>
              </div>
              <div>
                <h4 style={{ fontFamily: 'DM Mono', color: 'var(--amber)', fontSize: '0.9rem', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>▸ DATA-DRIVEN PROFILING</h4>
                <p style={{ color: 'var(--cold)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  Optimize code pathing only where CPU execution profiling dictates. Avoid premature micro-optimizations; engineer strictly for measured efficiency.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '40px' }}>
            {/* Engineering Decisions */}
            <div data-reveal="left" className="solid-panel" style={{ padding: '40px' }}>
              <div style={{ fontFamily: 'DM Mono', fontSize: '0.7rem', color: 'var(--cold2)', marginBottom: '16px', letterSpacing: '0.15em' }}>// DESIGN DECISIONS</div>
              <h3 style={{ fontSize: '2rem', marginBottom: '24px', fontFamily: 'Bebas Neue', letterSpacing: '1px' }}>Engineering Decisions</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <li style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong style={{ color: 'var(--white)', fontFamily: 'DM Mono', fontSize: '0.9rem' }}>01 // Next.js & React Framework</strong>
                  </div>
                  <p style={{ color: 'var(--cold)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Deployed to attain edge network execution speeds, absolute SEO optimization, and minimal package bundle overhead.
                  </p>
                </li>
                <li style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong style={{ color: 'var(--white)', fontFamily: 'DM Mono', fontSize: '0.9rem' }}>02 // Cryptographic JWT + Strict RBAC</strong>
                  </div>
                  <p style={{ color: 'var(--cold)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Engineered stateless backend APIs that scale linearly while maintaining cryptographic integrity across compartmentalized access hierarchies.
                  </p>
                </li>
                <li>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong style={{ color: 'var(--white)', fontFamily: 'DM Mono', fontSize: '0.9rem' }}>03 // Modular Data Models</strong>
                  </div>
                  <p style={{ color: 'var(--cold)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Separates data serialization from client presentation logic, allowing multiple systems to evolve independently without breaking API dependencies.
                  </p>
                </li>
              </ul>
            </div>

            {/* Lessons Learned */}
            <div data-reveal="right" className="solid-panel" style={{ padding: '40px' }}>
              <div style={{ fontFamily: 'DM Mono', fontSize: '0.7rem', color: 'var(--cold2)', marginBottom: '16px', letterSpacing: '0.15em' }}>// SYSTEM DESIGN PRINCIPLES</div>
              <h3 style={{ fontSize: '2rem', marginBottom: '24px', fontFamily: 'Bebas Neue', letterSpacing: '1px' }}>KEY TAKEAWAYS</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ background: 'var(--ink3)', padding: '20px', borderRadius: '8px', borderLeft: '2px solid var(--amber)' }}>
                  <p style={{ color: 'var(--cold)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    <strong style={{ color: 'var(--white)' }}>Friction propagates under load.</strong> What performs flawlessly under simple simulation breaks at scale. Rigorous load profiling is an architectural absolute, not an optional step.
                  </p>
                </div>
                <div style={{ background: 'var(--ink3)', padding: '20px', borderRadius: '8px', borderLeft: '2px solid var(--amber)' }}>
                  <p style={{ color: 'var(--cold)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    <strong style={{ color: 'var(--white)' }}>Explicit structure preserves time.</strong> The hours allocated to diagramming boundary conditions upfront mathematically saves weeks of diagnostic debugging in tightly coupled environments later.
                  </p>
                </div>
                <div style={{ background: 'var(--ink3)', padding: '20px', borderRadius: '8px', borderLeft: '2px solid var(--amber)' }}>
                  <p style={{ color: 'var(--cold)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    <strong style={{ color: 'var(--white)' }}>State is the ultimate vulnerability.</strong> Unregulated state propagation causes a vast majority of logic breakdowns. The primary goal is reducing mutable data side effects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
