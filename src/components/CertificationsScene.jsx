import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './PremiumGlass.css';
import { useSpotlight } from '../hooks/useSpotlight';

const certs = [
  { id: 'c1', title: 'NPTEL Cloud Computing', org: 'NPTEL', desc: 'Elite certification demonstrating comprehensive mastery over distributed topologies, edge systems, and fault-tolerant virtualization architectures.', imgStr: 'CLOUD' },
  { id: 'c2', title: 'Microsoft AI & Data Science', org: 'Microsoft', desc: 'Engineering track covering feature extraction, dimensionality reduction, neural network layers, and model serialization.', imgStr: 'AI' },
  { id: 'c3', title: 'Robotics Process Automation', org: 'UiPath / Automation Anywhere', desc: 'Workflow orchestration credentials focused on asynchronous state machines, batch data pipelines, and automation pipelines.', imgStr: 'RPA' },
  { id: 'c4', title: 'Salesforce Development', org: 'Salesforce', desc: 'Enterprise systems credential centered on database integrations, Apex transaction concurrency control, and multi-tenant security architecture.', imgStr: 'SFDC' }
];

function CertCard({ cert, onClick, index }) {
  const cardRef = useRef(null);
  const { onMouseMove, onMouseLeave } = useSpotlight(cardRef);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }
  };

  return (
    <div
      ref={cardRef}
      className="glass-card-premium explore-hover"
      data-reveal={index % 2 === 0 ? "left" : "right"}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View certificate: ${cert.title}`}
      style={{ padding: '32px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}
    >
      <div style={{ zIndex: 1 }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'var(--amber)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.1em' }}>▸ {cert.org}</div>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--white)', lineHeight: '1.2', fontFamily: 'Bebas Neue', letterSpacing: '1px' }}>{cert.title}</h3>
      </div>
    </div>
  );
}

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
        { scale: 0.88, opacity: 0, y: 24 },
        { scale: 1, opacity: 1, y: 0, duration: 0.55, ease: "back.out(1.5)", delay: 0.1 }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [activeCert]);

  const handleClose = () => {
    gsap.to(contentRef.current, { scale: 0.92, opacity: 0, duration: 0.25, ease: "power2.in" });
    gsap.to(modalRef.current, {
      opacity: 0, duration: 0.35, delay: 0.1, ease: "power2.in",
      onComplete: () => setActiveCert(null)
    });
  };

  return (
    <section id="certifications" className="scene">
      <div className="sec-wrap">
        <div className="sec-label" data-reveal="up">CERTIFICATIONS &amp; CREDENTIALS</div>
        <h2 className="sec-title" data-reveal="up" style={{ fontFamily: 'Bebas Neue', letterSpacing: '2px' }}>PROFESSIONAL CERTIFICATIONS</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '24px' }}>
          {certs.map((cert, index) => (
            <CertCard key={cert.id} cert={cert} index={index} onClick={() => setActiveCert(cert)} />
          ))}
        </div>
      </div>

      {activeCert && (
        <div
          ref={modalRef}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(5, 7, 10, 0.88)', backdropFilter: 'blur(20px)',
            zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px'
          }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={activeCert.title}
        >
          <div
            ref={contentRef}
            onClick={(e) => e.stopPropagation()}
            className="glass-card-premium"
            style={{
              borderRadius: '20px', padding: '40px', maxWidth: '600px', width: '100%',
              display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative',
              border: '1px solid rgba(245, 166, 35, 0.2)',
            }}
          >
            <button
              className="magnetic"
              onClick={handleClose}
              aria-label="Close certificate modal"
              style={{
                position: 'absolute', top: '24px', right: '24px',
                background: 'none', border: 'none', color: 'var(--cold2)',
                fontSize: '0.7rem', fontFamily: 'DM Mono, monospace', cursor: 'pointer', letterSpacing: '0.1em'
              }}
            >
              Close ✕
            </button>

            <div style={{
              width: '100%', height: '240px', background: 'rgba(0, 0, 0, 0.35)', borderRadius: '12px',
              border: '1px solid rgba(245, 166, 35, 0.15)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', overflow: 'hidden', position: 'relative'
            }}>
              <span style={{ fontFamily: 'Bebas Neue', fontSize: '5rem', color: 'rgba(245, 166, 35, 0.08)', letterSpacing: '8px' }}>CERTIFIED</span>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(245,166,35,0.05), transparent 70%)' }} />
            </div>

            <div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.8rem', color: 'var(--amber)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.15em' }}>{activeCert.org}</div>
              <h3 style={{ fontSize: '2rem', color: 'var(--white)', marginBottom: '16px', fontFamily: 'Bebas Neue', letterSpacing: '1px' }}>{activeCert.title}</h3>
              <p style={{ color: 'var(--cold)', lineHeight: '1.7', fontSize: '0.95rem' }}>{activeCert.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
