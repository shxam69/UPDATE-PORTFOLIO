import { useStore } from '../store';

const SKILLS_BY_TRACK = {
  software: {
    accent: 'var(--amber)',
    categories: [
      {
        title: 'Languages',
        items: ['Java (SE/EE)', 'Python (3.x)', 'JavaScript (ES6+)', 'TypeScript', 'C / C++ (17)'],
      },
      {
        title: 'Frontend Development',
        items: ['React (19)', 'Next.js (App Router)', 'Tailwind CSS', 'GSAP', 'Three.js / Fiber'],
      },
      {
        title: 'Backend & Database',
        items: ['Node.js', 'Flask', 'RESTful APIs', 'MySQL', 'JWT Auth'],
      },
      {
        title: 'System Design',
        items: ['Microservices', 'Role-Based Access Control', 'CI/CD', 'API Security', 'Agile / Scrum'],
      },
    ],
  },
  ml: {
    accent: 'var(--cyan)',
    categories: [
      {
        title: 'Languages',
        items: ['Python (3.x)', 'NumPy', 'Pandas', 'SQL'],
      },
      {
        title: 'ML Frameworks',
        items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'XGBoost / LightGBM'],
      },
      {
        title: 'Applied ML',
        items: ['Computer Vision (CNNs)', 'NLP', 'Explainable AI (SHAP)', 'Prototype Learning'],
      },
      {
        title: 'Data Science',
        items: ['Exploratory Data Analysis', 'Feature Engineering', 'PCA / Clustering', 'Streamlit'],
      },
    ],
  },
};

export default function SkillsScene() {
  const activeTrack = useStore((state) => state.activeTrack);
  const { accent, categories } = SKILLS_BY_TRACK[activeTrack] || SKILLS_BY_TRACK.software;

  return (
    <section id="skills" className="scene">
      <div className="sec-wrap">
        <div className="sec-label reveal-up">
          {activeTrack === 'ml' ? 'Machine Learning Skills' : 'Software Engineering Skills'}
        </div>
        <h2 className="sec-title reveal-up" style={{ fontFamily: 'Bebas Neue', letterSpacing: '2px' }}>TECH STACK</h2>

        <div
          className="reveal-up"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}
        >
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="glass-panel"
              style={{
                padding: '32px 24px',
                textAlign: 'center',
                transition: 'all 0.4s',
                border: '1px solid var(--glass-border)',
                background: 'rgba(5, 7, 10, 0.4)',
              }}
            >
              <div
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '.7rem',
                  color: accent,
                  textTransform: 'uppercase',
                  letterSpacing: '.15em',
                  marginBottom: '12px',
                  fontWeight: 600,
                }}
              >
                {cat.title}
              </div>
              <div style={{ fontSize: '.9rem', color: 'var(--cold)', lineHeight: '1.8', fontFamily: 'DM Mono, monospace' }}>
                {cat.items.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
