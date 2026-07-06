export default function MilestonesScene() {
  const milestones = [
    { 
      title: "1ST PLACE // CHAMPION", 
      event: "Codewords, TechnoTitans 2025",
      project: "Algorithmic Problem-Solving · DSA Under Time Constraints",
      desc: "Recognized for high-speed algorithmic execution, complex logical deconstruction, and real-time optimization under strict time restrictions."
    },
    { 
      title: "2ND PLACE // FINALIST", 
      event: "AIDERELLA’25 — HealLink",
      project: "HealLink — AI Health System · Next.js + WebSockets + Multi-Role Auth",
      desc: "Awarded for architecting a scalable Next.js and WebSocket healthcare SOS broadcast system featuring secure multi-tier state separation."
    },
    { 
      title: "2ND PLACE // RUNNER-UP", 
      event: "Innovatex (HCI)",
      project: "Frontend Architecture · Human-Computer Interaction Design",
      desc: "Engineered human-computer interfaces with seamless gesture tracking and high-frequency React component render lifecycles."
    },
    { 
      title: "3RD PLACE // PODIUM", 
      event: "INTEGRA National Symposium",
      project: "System Design Principles · National-Level Technical Depth",
      desc: "Showcased high-throughput data processing logic and secure database security protocols against nationwide engineering portfolios."
    },
    { 
      title: "3RD PLACE // LOGIC EXPERT", 
      event: "REGAALIYA Technical Hunt",
      project: "Reverse Engineering · Low-Level System Debugging",
      desc: "Excelled in low-level reverse engineering, byte-level logical diagnostics, and deep recursive compiler debugging."
    }
  ];

  return (
    <section id="milestones" className="scene">
      <div className="sec-wrap">
        <div className="sec-label" data-reveal="up">RECOGNITION & AWARDS</div>
        <h2 className="sec-title" data-reveal="up" style={{ fontFamily: 'Bebas Neue', letterSpacing: '2px' }}>KEY AWARDS & ACHIEVEMENTS</h2>
        
        <div style={{ position: 'relative', paddingLeft: '40px', borderLeft: '1px dashed var(--glass-border)' }}>
          {milestones.map((m, i) => (
            <div key={i} data-reveal={i % 2 === 0 ? "left" : "right"} style={{ position: 'relative', marginBottom: i === milestones.length - 1 ? '0' : '60px' }}>
              <div style={{
                position: 'absolute', left: '-47px', top: '0', width: '12px', height: '12px',
                background: 'var(--ink)', border: '2px solid var(--amber)', borderRadius: '50%',
                boxShadow: '0 0 10px var(--amber-glow)', zIndex: 2
              }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '16px' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.8rem', color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
                  ▸ {m.title}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '1.8rem', color: 'var(--white)', fontFamily: 'Bebas Neue', letterSpacing: '2px' }}>
                    {m.event}
                  </span>
                  {m.project && (
                    <span style={{ color: 'rgba(245, 166, 35, 0.7)', fontFamily: 'DM Mono', fontSize: '0.75rem', marginTop: '4px', letterSpacing: '0.05em' }}>
                      ▸ {m.project}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--cold)', lineHeight: '1.6', maxWidth: '600px', marginTop: '8px' }}>
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
