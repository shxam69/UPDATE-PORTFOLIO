import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const certs = [
  { id: 'c1', title: 'NPTEL Cloud Computing', org: 'NPTEL', desc: 'Elite certification demonstrating comprehensive mastery over distributed topologies, edge systems, and fault-tolerant virtualization architectures.', imgStr: 'CLOUD' },
  { id: 'c2', title: 'Microsoft AI & Data Science', org: 'Microsoft', desc: 'Engineering track covering feature extraction, dimensionality reduction, neural network layers, and model serialization.', imgStr: 'AI' },
  { id: 'c3', title: 'Robotics Process Automation', org: 'UiPath / Automation Anywhere', desc: 'Workflow orchestration credentials focused on asynchronous state machines, batch data pipelines, and automation pipelines.', imgStr: 'RPA' },
  { id: 'c4', title: 'Salesforce Development', org: 'Salesforce', desc: 'Enterprise systems credential centered on database integrations, Apex transaction concurrency control, and multi-tenant security architecture.', imgStr: 'SFDC' }
];

export default function CertificationsScene() {
  const [activeCert, setActiveCert] = useState(null);
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (activeCert) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(modalRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(contentRef.current,
        { scale: 0.8, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [activeCert]);

  const handleClose = () => {
    gsap.to(contentRef.current, { scale: 0.9, opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(modalRef.current, { 
      opacity: 0, duration: 0.4, delay: 0.1, ease: "power2.in", 
      onComplete: () => setActiveCert(null) 
    });
  };

  return (
    <section id="certifications" className="scene">
      <div className="sec-wrap">
        <div className="sec-label reveal-up">CERTIFICATIONS & CREDENTIALS</div>
        <h2 className="sec-title reveal-up" style={{ fontFamily: 'Bebas Neue', letterSpacing: '2px' }}>PROFESSIONAL CERTIFICATIONS</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {certs.map(cert => (
            <div 
              key={cert.id} 
              className="glass-panel reveal-up explore-hover" 
              onClick={() => setActiveCert(cert)}
              style={{ padding: '32px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden', border: '1px solid var(--glass-border)', background: 'rgba(5, 7, 10, 0.4)' }}
            >
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '6rem', fontFamily: 'Bebas Neue', color: 'rgba(245, 166, 35, 0.05)', zIndex: 0, pointerEvents: 'none' }}>
                {cert.imgStr}
              </div>
              <div style={{ zIndex: 1 }}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'var(--amber)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em' }}>▸ {cert.org}</div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--white)', lineHeight: '1.2', fontFamily: 'Bebas Neue', letterSpacing: '1px' }}>{cert.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeCert && (
        <div 
          ref={modalRef}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(5, 7, 10, 0.9)', backdropFilter: 'blur(15px)',
            zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px'
          }}
          onClick={handleClose}
        >
          <div 
            ref={contentRef}
            onClick={(e) => e.stopPropagation()}
            className="hud-amber-border"
            style={{
              background: 'var(--ink2)',
              borderRadius: '16px', padding: '40px', maxWidth: '600px', width: '100%',
              display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
            }}
          >
            <button className="magnetic" onClick={handleClose} style={{
              position: 'absolute', top: '24px', right: '24px',
              background: 'none', border: 'none', color: 'var(--cold2)',
              fontSize: '0.7rem', fontFamily: 'DM Mono, monospace', cursor: 'pointer', letterSpacing: '0.1em'
            }}>
              Close
            </button>
            
            <div style={{ 
              width: '100%', height: '300px', background: 'rgba(0, 0, 0, 0.4)', borderRadius: '8px', 
              border: '1px solid rgba(245, 166, 35, 0.2)', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', overflow: 'hidden', position: 'relative'
            }}>
              <span style={{ fontFamily: 'Bebas Neue', fontSize: '4rem', color: 'rgba(245, 166, 35, 0.1)', letterSpacing: '8px' }}>CERTIFIED</span>
            </div>

            <div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.8rem', color: 'var(--amber)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.15em' }}>{activeCert.org}</div>
              <h3 style={{ fontSize: '2rem', color: 'var(--white)', marginBottom: '16px', fontFamily: 'Bebas Neue', letterSpacing: '1px' }}>{activeCert.title}</h3>
              <p style={{ color: 'var(--cold)', lineHeight: '1.6', fontSize: '0.95rem' }}>{activeCert.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
