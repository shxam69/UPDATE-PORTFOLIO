import { useState } from 'react';
import CountUp from './CountUp';

const expData = [
  {
    id: 'e1',
    company: 'GradTwin',
    role: 'Machine Learning Intern',
    period: 'Feb 2026 — Present',
    bullets: [
      { text: 'Engineered end-to-end ML pipeline engineering architectures using PyTorch and Scikit-Learn to automate complex training, evaluation, and data preprocessing workflows.' },
      { text: 'Designed a Probabilistic Prototype-Based Self-Explainable Neural Network (Prob-PSENN) using PyTorch, combining CNNs with Explainable AI (XAI) and prototype learning to deliver uncertainty-aware digit classification.' },
      { text: 'Shipped highly interactive Streamlit dashboards (Retail Sales Predictor, AI Country Clustering, and Adult Income Prediction AI with SHAP explainability) to secure robust real-world deployment exposure.' },
      { text: 'Implemented PCA and K-Means clustering algorithms to partition country indicators, accelerating logical data interpretation and cluster division by ', metric: 25, suffix: '%.' },
      { text: 'Engineered Gradient Boosting classifiers alongside SHAP explainability, boosting model interpretability scores and classification logic by ', metric: 20, suffix: '%.' },
      { text: 'Optimized dataset feature engineering pipelines using Pandas and NumPy, slashing predictive data preparation latencies by ', metric: 15, suffix: '%.' }
    ]
  },
  {
    id: 'e2',
    company: 'CMRL (Chennai Metro Rail Limited)',
    role: 'Software Dev Intern',
    period: 'Jan 2026 — Feb 2026',
    bullets: [
      { text: 'PROBLEM: Insecure, manual retrieval endpoints exposed railway operational telemetry workflows to parameter injection threats.', isTitle: true },
      { text: 'SOLUTION: Shipped a Flask and SQL-backed dashboard featuring JWT authentication, strict query parameterization, and granular access levels.' },
      { text: 'MEASURABLE IMPACT: Reduced database manual retrieval duration by ', metric: 30, suffix: '% while completely locking down critical data endpoints.' }
    ]
  },
  {
    id: 'e3',
    company: 'Eagle Hi-Tech',
    role: 'Full-Stack Intern',
    period: 'May 2025 — June 2025',
    bullets: [
      { text: 'PROBLEM: Agile backend microservices experienced serialization delays, triggering high code rework iterations.', isTitle: true },
      { text: 'SOLUTION: Engineered, optimized, and stress-tested production-grade Java and SQL data models under Scrum sprints.', },
      { text: 'MEASURABLE IMPACT: Boosted system workflow serialization efficiency by ', metric: 20, suffix: '% and slashed development rework bottlenecks.' }
    ]
  }
];

export default function ExperienceScene() {
  const [activeTab, setActiveTab] = useState(expData[0].id);

  return (
    <section id="experience" className="scene">
      <div className="sec-wrap">
        <div className="sec-label reveal-up">PROFESSIONAL EXPERIENCE</div>
        <h2 className="sec-title reveal-up" style={{ fontFamily: 'Bebas Neue', letterSpacing: '2px' }}>WORK JOURNAL</h2>
        
        <div className="experience-grid reveal-up">
          {/* Tab Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', borderLeft: '1px dashed var(--glass-border)', paddingLeft: '32px', marginLeft: '6px' }}>
            <div style={{ 
              position: 'absolute', 
              left: '-2px', 
              top: expData.findIndex(e => e.id === activeTab) * 90 + 30 + 'px', 
              width: '3px', 
              height: '30px', 
              background: 'var(--amber)', 
              transition: 'top 0.4s cubic-bezier(0.25, 1, 0.5, 1)', 
              borderRadius: '2px', 
              boxShadow: '0 0 10px var(--amber-glow)' 
            }}></div>
            {expData.map((exp) => (
              <div key={exp.id} style={{ position: 'relative', height: '90px', display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  position: 'absolute', left: '-38px', top: '50%', transform: 'translateY(-50%)', 
                  width: '13px', height: '13px', borderRadius: '50%', 
                  background: activeTab === exp.id ? 'var(--amber)' : 'var(--ink)', 
                  border: `2px solid ${activeTab === exp.id ? 'var(--amber)' : 'var(--glass-border)'}`, 
                  transition: 'all 0.4s', zIndex: 2,
                  boxShadow: activeTab === exp.id ? '0 0 12px var(--amber-glow)' : 'none'
                }}></div>
                <button 
                  onClick={() => setActiveTab(exp.id)}
                  style={{ textAlign: 'left', background: 'transparent', border: 'none', color: activeTab === exp.id ? 'var(--white)' : 'var(--cold2)', fontFamily: 'DM Mono, monospace', fontSize: '.85rem', cursor: 'pointer', transition: 'color 0.3s' }}
                >
                  <div style={{ fontSize: '0.65rem', marginBottom: '6px', color: activeTab === exp.id ? 'var(--amber)' : 'var(--cold2)', letterSpacing: '0.1em' }}>{exp.period.split('—')[0].trim()}</div>
                  <div style={{ fontSize: '1.1rem', letterSpacing: '0.05em', fontWeight: 600 }}>{exp.company.split(' ')[0]}</div>
                </button>
              </div>
            ))}
          </div>
          
          {/* Active Tab Panel */}
          <div style={{ position: 'relative', minHeight: '400px' }}>
            {expData.map((exp) => (
              <div 
                key={exp.id} 
                style={{ 
                  position: activeTab === exp.id ? 'relative' : 'absolute', 
                  opacity: activeTab === exp.id ? 1 : 0, 
                  visibility: activeTab === exp.id ? 'visible' : 'hidden', 
                  transform: activeTab === exp.id ? 'translateX(0)' : 'translateX(20px)', 
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)', 
                  top: 0, 
                  left: 0, 
                  width: '100%' 
                }}
              >
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '.7rem', color: 'var(--amber)', letterSpacing: '.15em', marginBottom: '12px' }}>
                  {exp.period}
                </div>
                <div style={{ fontSize: '3rem', color: 'var(--white)', marginBottom: '8px', fontFamily: 'Bebas Neue', letterSpacing: '1px' }}>
                  {exp.role}
                </div>
                <div style={{ fontSize: '1.1rem', color: 'var(--cold2)', marginBottom: '32px', fontFamily: 'DM Mono, monospace' }}>
                  {exp.company}
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {exp.bullets.map((b, i) => (
                    <li key={`${exp.id}-bullet-${i}`} style={{ display: 'flex', gap: '16px', fontSize: '1.05rem', color: 'var(--cold)', lineHeight: '1.6' }}>
                      <span style={{ color: 'var(--amber)', fontFamily: 'DM Mono, monospace', marginTop: '3px' }}>▸</span>
                      <span>
                        {b.text}
                        {b.metric && (
                          <CountUp value={b.metric} suffix={b.suffix} />
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
