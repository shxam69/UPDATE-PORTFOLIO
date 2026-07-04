import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUp from './CountUp';
import { useStore } from '../store';

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECT DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const projectsData = [
  {
    id: 'p1',
    status: 'Internship System',
    title: 'CMAC',
    org: 'Enterprise Application System (Eagle Hi-Tech)',
    color: '#f5a623',
    trackType: 'software',
    impact: 'Engineered a unified modular layout dashboard, eliminating dynamic state syncing friction and page repaint overlaps.',
    achievement: 'Slashed screen-to-interactive processing times by 20% while cutting frontend-backend rework cycles by 15%.',
    metrics: [
      { label: 'Render delay', value: '-20%' },
      { label: 'Rework cycles', value: '-15%' },
    ],
    story: [
      {
        label: 'The Problem',
        text: 'Enterprise workflows suffered from slow layout rendering speeds and high data state inconsistencies across dynamic dashboard interfaces.',
      },
      {
        label: 'The Approach',
        text: 'Engineered modular, highly reactive React frontend elements combined with custom optimization of Java API serialization layers.',
      },
      {
        label: 'The Result',
        text: <span>Boosted screen interface processing speeds by <CountUp value={20} /> and cut development rework cycles by <CountUp value={15} />.</span>,
      },
    ],
    tags: ['React', 'Java', 'SQL', 'Agile/Scrum'],
    links: [
      { label: 'GitHub', href: 'https://github.com/shxam69' },
    ],
  },
  {
    id: 'p2',
    status: 'Featured Production Deployment',
    title: 'Role-Based Dashboard',
    org: 'Chennai Metro Rail Limited (CMRL)',
    color: '#00e676',
    trackType: 'software',
    impact: 'Deployed a secure, parameter-locked Flask dashboard managing mission-critical operations databases for the Chennai Metro Rail.',
    achievement: 'Leveraged stateless, cryptographically signed JWT auth to slash transport search latency by 35%.',
    metrics: [
      { label: 'Access latency', value: '-35%' },
      { label: 'Query lookup latency', value: '-18%' },
    ],
    story: [
      {
        label: 'The Problem',
        text: 'Internal operators faced manual database query overheads and insecure access points, causing major workflow delays and security concerns.',
      },
      {
        label: 'The Approach',
        text: 'Shipped a parameterized, SQL-backed Flask server featuring stateless JWT authentication and tight role-based access controls (RBAC).',
      },
      {
        label: 'The Result',
        text: <span>Optimized transport workflow database access speeds by <CountUp value={35} /> and drove manual query lookup latency down by <CountUp value={18} />.</span>,
      },
    ],
    tags: ['Python', 'Flask', 'SQL', 'RBAC', 'JWT Auth'],
    links: [
      { label: 'Live Demo', href: null, note: 'Internal Network Only' },
      { label: 'GitHub', href: 'https://github.com/shxam69' },
    ],
  },
  {
    id: 'p3',
    status: "Live Web System — 2nd Place, AIDERELLA '25",
    title: 'HealLink',
    org: 'AI Health SOS & Broadcast Platform',
    color: '#ff3344',
    trackType: 'software',
    impact: 'Shipped a high-speed patient-doctor emergency broadcast hub, automating real-time triage mapping during local distress events.',
    achievement: 'Built isolated React status containers coupled with duplex WebSocket listeners to reduce dispatch latency by 40%.',
    metrics: [
      { label: 'Responder dispatch delay', value: '-40%' },
      { label: 'Roles supported', value: '3' },
    ],
    story: [
      {
        label: 'The Problem',
        text: 'Simulated community distress scenarios suffered from high dispatcher reaction latencies and a lack of unified emergency broadcast mapping.',
      },
      {
        label: 'The Approach',
        text: 'Shipped a multi-role (patient / doctor / volunteer) Next.js platform running low-latency WebSockets with real-time location mapping.',
      },
      {
        label: 'The Result',
        text: <span>Accelerated emergency responder dispatch speeds by <CountUp value={40} /> under high-load network stress tests.</span>,
      },
    ],
    tags: ['Next.js', 'WebSockets', 'AI Agents', 'State Isolation'],
    links: [
      { label: 'Live Demo', href: 'https://heallink.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/shxam69' },
    ],
  },
  {
    id: 'p4',
    status: 'GradTwin — ML Internship',
    title: 'Prob-PSENN',
    org: 'GradTwin Internship — ML Division',
    color: '#7c6af5',
    trackType: 'ml',
    impact: 'Shipped an explainable deep convolutional neural architecture featuring uncertainty-aware predictive classification.',
    achievement: 'Built the full training, inference, and visualization pipeline, allowing human verification via prototype maps.',
    metrics: [
      { label: 'Accuracy', value: '98.4%' },
      { label: 'Inference speed', value: '< 8.2ms' },
    ],
    story: [
      {
        label: 'The Challenge',
        text: 'Build an interpretable deep-learning architecture that can explain its own decisions — not just predict.',
      },
      {
        label: 'The Approach',
        text: 'Implemented uncertainty-aware inference using stochastic forward passes and confidence estimation, combining CNN feature extraction with prototype-based reasoning for handwritten digit classification.',
      },
      {
        label: 'The Result',
        text: 'Enabled human-in-the-loop decision making by surfacing ambiguous predictions with measurable confidence scores, across a full train → evaluate → visualize → explain pipeline.',
      },
    ],
    tags: ['PyTorch', 'CNNs', 'Explainable AI', 'Prototype Learning', 'NumPy'],
    links: [
      { label: 'GitHub', href: 'https://github.com/shxam69' },
    ],
  },
  {
    id: 'p5',
    status: 'GradTwin — ML Internship',
    title: 'Retail Sales Forecast',
    org: 'GradTwin Internship — ML Division',
    color: '#00e676',
    trackType: 'ml',
    impact: 'Architected an interactive sales forecasting suite utilizing a multi-layered regression model and a Streamlit runtime.',
    achievement: 'Implemented automatic feature engineering and outlier mitigation to stabilize prediction paths.',
    metrics: [
      { label: 'Forecast window', value: '30 days' },
      { label: 'MAE score', value: '0.12' },
    ],
    story: [
      {
        label: 'The Problem',
        text: 'Retail teams lacked real-time, AI-powered tools to forecast sales performance accurately.',
      },
      {
        label: 'The Approach',
        text: 'Built an ML forecasting pipeline — preprocessing, EDA, feature selection, and model training — deployed behind an interactive Streamlit dashboard for real-time predictions.',
      },
      {
        label: 'The Result',
        text: 'Delivered a production-ready analytics dashboard with live business insight visualizations.',
      },
    ],
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'Feature Engineering'],
    links: [
      { label: 'GitHub', href: 'https://github.com/shxam69' },
    ],
  },
  {
    id: 'p6',
    status: 'GradTwin — ML Internship',
    title: 'AI Country Clustering',
    org: 'GradTwin Internship — ML Division',
    color: '#29b6f6',
    trackType: 'ml',
    impact: 'Built an unsupervised model discovery suite that identifies socio-economic patterns in national datasets automatically.',
    achievement: 'Applied PCA dimensionality reduction and optimized K-Means++ clustering to surface hidden developmental segments.',
    metrics: [
      { label: 'Optimal clusters', value: 'k = 4' },
      { label: 'Silhouette score', value: '0.62' },
    ],
    story: [
      {
        label: 'The Challenge',
        text: 'Identify hidden socio-economic patterns across countries using unsupervised ML — no labels, pure discovery.',
      },
      {
        label: 'The Approach',
        text: 'Applied PCA for dimensionality reduction and K-Means for cluster analysis, with interactive Plotly visualizations for real-time Streamlit exploration.',
      },
      {
        label: 'The Result',
        text: 'Surfaced data-driven country segmentation insights — patterns that were effectively invisible to manual analysis.',
      },
    ],
    tags: ['Python', 'PCA', 'K-Means', 'Plotly', 'Streamlit'],
    links: [
      { label: 'GitHub', href: 'https://github.com/shxam69' },
    ],
  },
  {
    id: 'p7',
    status: 'GradTwin — ML Internship',
    title: 'Adult Income Prediction AI',
    org: 'GradTwin Internship — ML Division',
    color: '#ff7043',
    trackType: 'ml',
    impact: 'Engineered a highly accurate classification pipeline backed by SHAP (Shapley Additive exPlanations) explainability.',
    achievement: 'Delivered a Streamlit dashboard showing real-time prediction confidence and feature-influence plots.',
    metrics: [
      { label: 'Test accuracy', value: '95%+' },
      { label: 'Inference speed', value: '< 11.5ms' },
    ],
    story: [
      {
        label: 'The Problem',
        text: 'Income-classification models are typically black boxes — accurate, but hard to trust for real decisions.',
      },
      {
        label: 'The Approach',
        text: 'Built an end-to-end ML pipeline with SHAP explainability, pairing real-time predictions with interactive inputs and decision reasoning in a Streamlit dashboard.',
      },
      {
        label: 'The Result',
        text: <span>Delivered <CountUp value={95} suffix="%+" /> classification accuracy with human-interpretable reasoning — bridging ML power with business trust.</span>,
      },
    ],
    tags: ['Python', 'Gradient Boosting', 'SHAP', 'Scikit-learn', 'Streamlit'],
    links: [
      { label: 'GitHub', href: 'https://github.com/shxam69' },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LINK BUTTON COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

function LinkButton({ label, href, note }) {
  if (!href && !note) {
    return null;
  }

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: 'var(--space-2) var(--space-4)',
    fontSize: 'var(--text-xs)',
    fontFamily: 'DM Mono',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    borderRadius: 'var(--radius-sm)',
    transition: 'all var(--transition-base)',
    cursor: href ? 'pointer' : 'default',
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="magnetic"
        style={{
          ...baseStyle,
          border: '1px solid var(--glass-border)',
          color: 'var(--cold)',
          background: 'rgba(255, 255, 255, 0.03)',
        }}
      >
        {label}
        <span>↗</span>
      </a>
    );
  }

  return (
    <span
      style={{
        ...baseStyle,
        border: '1px solid rgba(255, 255, 255, 0.04)',
        color: 'var(--cold2)',
        background: 'transparent',
        opacity: 0.6,
      }}
      title={note || 'Available on request'}
    >
      {note || 'Available Upon Request'}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECT CARD COMPONENT — 3D parallax hover effect
   ═══════════════════════════════════════════════════════════════════════════ */

function ProjectCard({ status, title, org, tags, color, impact, achievement, metrics, links, trackType, isVisible, onOpen }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const innerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!isHovered) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotationY: xPct * 8,
      rotationX: -yPct * 8,
      duration: 0.6,
      ease: 'power2.out',
      transformPerspective: 1200,
    });

    gsap.to(innerRef.current, {
      x: -xPct * 10,
      y: -yPct * 10,
      duration: 0.6,
      ease: 'power2.out',
    });

    gsap.to(glowRef.current, {
      x: xPct * 150,
      y: yPct * 150,
      opacity: 0.7,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(cardRef.current, {
      boxShadow: `0 20px 60px rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, 0.15)`,
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.killTweensOf([cardRef.current, innerRef.current, glowRef.current]);
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      duration: 0.7,
      ease: 'power2.out',
    });
    gsap.to(innerRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
    });
    gsap.to(glowRef.current, {
      opacity: 0,
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onOpen}
      className="glass-panel-dense explore-hover"
      style={{
        display: isVisible ? 'grid' : 'none',
        gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
        gap: 'var(--space-8)',
        padding: 'var(--space-8)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow var(--transition-base)',
        minHeight: '300px',
      }}
    >
      {/* Animated glow orb */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '450px',
          height: '450px',
          background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'blur(40px)',
        }}
      />

      {/* Left column: Text content */}
      <div
        ref={innerRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 1,
          paddingRight: 'var(--space-4)',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'DM Mono',
              fontSize: 'var(--text-xs)',
              color,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-2)',
              fontWeight: 700,
            }}
          >
            ▸ {status}
          </div>

          <h3
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              marginBottom: 'var(--space-2)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              fontFamily: 'Bebas Neue, sans-serif',
              color: 'var(--white)',
            }}
          >
            {title}
          </h3>

          <div
            style={{
              fontFamily: 'DM Mono',
              fontSize: '0.75rem',
              color: 'var(--cold3)',
              marginBottom: 'var(--space-4)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              paddingBottom: 'var(--space-2)',
            }}
          >
            {org}
          </div>

          {/* Short Impact Statement */}
          <div
            style={{
              fontSize: '0.85rem',
              lineHeight: '1.5',
              color: 'var(--cold)',
              marginBottom: 'var(--space-3)',
              background: 'rgba(255, 255, 255, 0.01)',
              borderLeft: `2px solid ${color}`,
              padding: '6px 12px',
              fontFamily: 'DM Mono, monospace',
            }}
          >
            <span style={{ color: color, fontWeight: 'bold' }}>Impact:</span> {impact}
          </div>

          {/* Key Achievement */}
          <div
            style={{
              fontSize: '0.85rem',
              lineHeight: '1.5',
              color: 'var(--cold2)',
              marginBottom: 'var(--space-4)',
              padding: '2px 12px',
              fontFamily: 'DM Mono, monospace',
            }}
          >
            <span style={{ color: 'var(--white)', fontWeight: 'bold' }}>Result:</span> {achievement}
          </div>
        </div>

        <div>
          {/* Tech Stack tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            {tags.map((t, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'DM Mono',
                  fontSize: '0.62rem',
                  padding: '4px 8px',
                  border: `1px solid ${color}25`,
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--cold)',
                  backgroundColor: `${color}06`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Link Buttons row */}
          <div
            style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}
            onClick={(e) => e.stopPropagation()} // Stop click propagation so clicking links doesn't trigger modal!
          >
            {links.map((link, idx) => (
              <LinkButton key={idx} {...link} />
            ))}
          </div>
        </div>
      </div>

      {/* Right column: Cockpit/Model Diagnostics Telemetry Panel */}
      <div
        className={trackType === 'ml' ? 'hud-cyan-border glass-panel' : 'hud-amber-border glass-panel'}
        style={{
          background: 'rgba(5, 7, 10, 0.5)',
          borderRadius: 'var(--radius-md)',
          border: `1px solid ${trackType === 'ml' ? 'rgba(41, 182, 246, 0.2)' : 'rgba(245, 166, 35, 0.2)'}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          zIndex: 1,
          padding: 'var(--space-4)',
          minHeight: '260px',
        }}
      >
        <div>
          {/* Panel header */}
          <div style={{ borderBottom: `1px solid ${color}25`, paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            <span style={{ fontFamily: 'DM Mono', fontSize: '0.65rem', color: color, letterSpacing: '0.12em', fontWeight: 600, textTransform: 'uppercase' }}>
              Key Metrics
            </span>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
            {metrics.map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 700, color: 'var(--white)', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.5px' }}>
                  {value}
                </div>
                <div style={{ fontFamily: 'DM Mono', fontSize: '0.68rem', color: 'var(--cold2)', marginTop: '2px' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Case study link */}
        <div
          style={{
            marginTop: 'var(--space-4)',
            borderTop: `1px solid ${color}20`,
            paddingTop: 'var(--space-3)',
            fontFamily: 'DM Mono',
            fontSize: '0.7rem',
            color: color,
            fontWeight: 600,
          }}
        >
          View case study →
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FULLSCREEN PROJECT EXPLORATION MODAL
   ═══════════════════════════════════════════════════════════════════════════ */

function FullscreenExploration({ project, onClose }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    document.body.style.overflow = 'hidden';

    // Entrance animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, backdropFilter: 'blur(0px)' },
      { opacity: 1, backdropFilter: 'blur(30px)', duration: 0.5, ease: 'power2.out' }
    );

    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.15,
        ease: 'power3.out',
      }
    );

    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  const handleClose = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      duration: 0.4,
      ease: 'power3.inOut',
      onComplete: onClose,
    });
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!project) return null;

  return (
    <div
      ref={containerRef}
      onClick={handleClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(5, 7, 10, 0.85)',
        backdropFilter: 'blur(0px)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          padding: 'var(--space-8) var(--space-16)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'linear-gradient(to bottom, rgba(5, 7, 10, 0.95) 0%, transparent 100%)',
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: 'DM Mono',
            fontSize: 'var(--text-xs)',
            color: project.color,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Case Study
        </div>

        <button
          onClick={handleClose}
          className="magnetic"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--cold2)',
            fontSize: 'var(--text-xs)',
            fontFamily: 'DM Mono',
            cursor: 'pointer',
            letterSpacing: '0.15em',
            transition: 'color var(--transition-fast)',
            textTransform: 'uppercase',
          }}
          onMouseEnter={(e) => (e.target.style.color = 'var(--white)')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--cold2)')}
        >
          Close
        </button>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'var(--space-16) var(--space-12) var(--space-32)',
          width: '100%',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(3rem, 10vw, 5.5rem)',
            marginBottom: 'var(--space-2)',
            lineHeight: 0.95,
            fontWeight: 700,
          }}
        >
          {project.title}
        </h2>

        <div
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--cold2)',
            marginBottom: 'var(--space-16)',
            fontFamily: 'DM Mono',
          }}
        >
          {project.org}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '240px 1fr',
            gap: 'var(--space-16)',
          }}
        >
          {/* Sidebar */}
          <div>
            <div style={{ marginBottom: 'var(--space-12)' }}>
              <h4
                style={{
                  fontFamily: 'DM Mono',
                  color: project.color,
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Status
              </h4>
              <p style={{ color: 'var(--green)', fontSize: 'var(--text-sm)' }}>{project.status}</p>
            </div>

            <div style={{ marginBottom: 'var(--space-12)' }}>
              <h4
                style={{
                  fontFamily: 'DM Mono',
                  color: project.color,
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Stack
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {project.tags.map((t, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: 'DM Mono',
                      fontSize: 'var(--text-xs)',
                      padding: 'var(--space-1) var(--space-2)',
                      border: `1px solid ${project.color}40`,
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--cold2)',
                      backgroundColor: `${project.color}08`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4
                style={{
                  fontFamily: 'DM Mono',
                  color: project.color,
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: 'var(--space-3)',
                }}
              >
                Links
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {project.links.map((l, i) => (
                  <LinkButton key={i} {...l} />
                ))}
              </div>
            </div>
          </div>

          {/* Story panels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
            {project.story.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: 'var(--space-8)',
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: 'var(--radius-lg)',
                  borderLeft: `3px solid ${project.color}`,
              }} >
                <span
                  style={{
                    color: project.color,
                    fontWeight: 700,
                    fontFamily: 'DM Mono',
                    fontSize: 'var(--text-xs)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    display: 'block',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {s.label}
                </span>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--cold)', lineHeight: 1.8 }}>
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECTS SCENE — Main component
   ═══════════════════════════════════════════════════════════════════════════ */

export default function ProjectsScene() {
  const [activeProject, setActiveProject] = useState(null);
  const activeTrack = useStore((state) => state.activeTrack);
  const setActiveTrack = useStore((state) => state.setActiveTrack);
  const cardsContainerRef = useRef(null);

  // Cinematic staggered transition on track changes
  const handleTrackSwitch = (track) => {
    if (track === activeTrack) return;

    const cards = cardsContainerRef.current ? Array.from(cardsContainerRef.current.children) : [];
    const visibleCards = cards.filter(card => card.style.display !== 'none');
    
    if (visibleCards.length > 0) {
      gsap.to(visibleCards, {
        opacity: 0,
        y: -30,
        duration: 0.35,
        stagger: 0.05,
        ease: 'power2.in',
        onComplete: () => {
          setActiveTrack(track);
        },
      });
    } else {
      setActiveTrack(track);
    }
  };

  // Stagger in cards of the newly activated track
  useEffect(() => {
    const cards = cardsContainerRef.current ? Array.from(cardsContainerRef.current.children) : [];
    const visibleCards = cards.filter(card => card.style.display !== 'none');
    
    if (visibleCards.length > 0) {
      // Find and kill previous ScrollTrigger for this container to avoid duplicate observers
      const existingTrigger = ScrollTrigger.getAll().find(t => t.trigger === cardsContainerRef.current);
      if (existingTrigger) {
        existingTrigger.kill();
      }

      gsap.fromTo(
        visibleCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          onComplete: () => {
            ScrollTrigger.refresh();
          }
        }
      );
    }
  }, [activeTrack]);

  return (
    <section id="projects" className="scene">
      <div className="sec-wrap">
        {/* Section header */}
        <div style={{ marginBottom: 'var(--space-12)' }}>
          <div
            className="reveal-up"
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 'var(--text-xs)',
              color: activeTrack === 'software' ? 'var(--amber)' : 'var(--cyan)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-3)',
              fontWeight: 700,
              transition: 'color var(--transition-base)',
            }}
          >
            {activeTrack === 'software' ? 'SOFTWARE ENGINEERING PROJECTS' : 'MACHINE LEARNING PROJECTS'}
          </div>
          <h2
            className="reveal-up"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              marginBottom: 'var(--space-8)',
              fontFamily: 'Bebas Neue',
              letterSpacing: '2px',
            }}
          >
            PORTFOLIO PROJECTS
          </h2>
        </div>

        {/* ─────────────────────────────────────────────────────────
            CENTRAL TRACK TOGGLE
            ───────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-12)' }}>
          <div
            style={{
              display: 'flex',
              padding: '6px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--glass-border)',
              background: 'rgba(5, 7, 10, 0.6)',
              backdropFilter: 'blur(15px)',
              position: 'relative',
              gap: '12px',
            }}
          >
            <button
              onClick={() => handleTrackSwitch('software')}
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                padding: '12px 24px',
                border: 'none',
                background: activeTrack === 'software' ? 'var(--amber)' : 'transparent',
                color: activeTrack === 'software' ? 'var(--ink)' : 'var(--cold2)',
                cursor: 'pointer',
                borderRadius: 'var(--radius-sm)',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                fontWeight: 700,
                textTransform: 'uppercase',
                boxShadow: activeTrack === 'software' ? '0 0 20px var(--amber-glow)' : 'none',
              }}
            >
              Software Engineering
            </button>
            <button
              onClick={() => handleTrackSwitch('ml')}
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                padding: '12px 24px',
                border: 'none',
                background: activeTrack === 'ml' ? 'var(--cyan)' : 'transparent',
                color: activeTrack === 'ml' ? 'var(--ink)' : 'var(--cold2)',
                cursor: 'pointer',
                borderRadius: 'var(--radius-sm)',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                fontWeight: 700,
                textTransform: 'uppercase',
                boxShadow: activeTrack === 'ml' ? '0 0 20px var(--cyan-glow)' : 'none',
              }}
            >
              Machine Learning
            </button>
          </div>
        </div>

        {/* Project cards grid */}
        <div 
          ref={cardsContainerRef}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', marginBottom: 'var(--space-24)' }}
        >
          {projectsData.map((proj) => (
            <ProjectCard
              key={proj.id}
              {...proj}
              isVisible={proj.trackType === activeTrack}
              trackType={activeTrack}
              onOpen={() => setActiveProject(proj)}
            />
          ))}
        </div>

        {/* Additional sections */}
        <div className="reveal-up" style={{ marginBottom: 'var(--space-24)' }}>
          <div
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 'var(--text-xs)',
              color: 'var(--amber)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-4)',
            }}
          >
            Engineering Principles
          </div>
          <h3 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-6)', fontFamily: 'Bebas Neue', letterSpacing: '1px' }}>
            Standalone Edge Systems
          </h3>
          <div
            className="glass-panel-dense"
            style={{
              padding: 'var(--space-8)',
              borderLeft: `3px solid var(--green)`,
              background: 'rgba(5, 7, 10, 0.4)',
            }}
          >
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--cold)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
              Beyond institutional environments, I build and validate standalone edge nodes outside the standard stack. Custom process scripts and data routing filters keep each deployment isolated, with clean data and high throughput from ingestion to database.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              {['Modular Layouts', 'Edge Processes', 'Throughput Balancing'].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: 'var(--text-xs)',
                    padding: 'var(--space-2) var(--space-4)',
                    background: 'var(--ink3)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--amber)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Active development section */}
        <div className="reveal-up">
          <div
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 'var(--text-xs)',
              color: 'var(--amber)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-4)',
            }}
          >
            ACTIVE INITIATIVES
          </div>
          <h3 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-6)', fontFamily: 'Bebas Neue', letterSpacing: '1px' }}>
            ONGOING PROJECTS
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {[
              {
                tag: 'SaaS Architecture',
                title: 'NIVEROX Platform',
                desc: 'Building a modular, multi-tenant SaaS engine focused on rapid iteration and minimal bundle sizes.',
              },
              {
                tag: 'Automation',
                title: 'AI WhatsApp Pipeline',
                desc: 'Developing an intelligent, language-aware lead capture and conversation summary system.',
              },
              {
                tag: 'Graphics / WebGL',
                title: 'Narrative Engine',
                desc: 'Experimenting with raw WebGL and shader logic to build high-performance visual storytelling tools.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-panel-dense"
                style={{
                  padding: 'var(--space-8)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'DM Mono',
                    color: 'var(--amber)',
                    fontSize: 'var(--text-xs)',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {item.tag}
                </div>
                <h4 style={{ fontSize: 'var(--text-lg)', color: 'var(--white)', marginBottom: 'var(--space-3)' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--cold2)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      {activeProject && (
        <FullscreenExploration
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
