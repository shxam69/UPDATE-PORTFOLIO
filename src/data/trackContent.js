/**
 * TRACK CONTENT — Career Mode data
 * ─────────────────────────────────────────────────────────────────────────
 * Single source of truth for anything that changes between the Software
 * Engineer and Machine Learning Engineer tracks: accent color, resume
 * file, labels. Both NavBar.jsx (the Career Mode control) and
 * HeroScene.jsx (the identity card) read from here — the resume path
 * lives in exactly one place.
 */
export const TRACK_CONTENT = {
  software: {
    accent: 'var(--amber)',
    accentGlow: 'var(--amber-glow)',
    accentRgb: '245, 166, 35',
    shortLabel: 'Software Engineer',
    eyebrow: 'Software Engineering — Scalable Infrastructure',
    heading: 'Systems & Architecture',
    bullets: [
      { label: 'Core', text: 'Distributed microservices, backend pipelines, web platforms' },
      { label: 'Resilience', text: 'JWT-secured, parameter-locked government portal (CMRL)' },
    ],
    stats: [
      { value: '3+', label: 'Internships' },
      { value: '35%', label: 'Latency reduction' },
    ],
    resumeHref: '/ShyamA_SWE_Resume.pdf',
    resumeFilename: 'ShyamA_SWE_Resume.pdf',
    resumeLabel: 'Download SWE Resume',
    btnClass: 'btn-amber',
  },
  ml: {
    accent: 'var(--cyan)',
    accentGlow: 'var(--cyan-glow)',
    accentRgb: '41, 182, 246',
    shortLabel: 'Machine Learning Engineer',
    eyebrow: 'Machine Learning — Explainable Intelligence',
    heading: 'Intelligence & Models',
    bullets: [
      { label: 'Design', text: 'Probabilistic prototype-based networks, explainable AI (XAI)' },
      { label: 'Engineering', text: 'Custom preprocessing filters, PyTorch CNNs, SHAP explainability' },
    ],
    stats: [
      { value: '8.5', label: 'CGPA' },
      { value: '5+', label: 'ML/Systems credentials' },
    ],
    resumeHref: '/ShyamA_MLE_Resume.pdf',
    resumeFilename: 'ShyamA_MLE_Resume.pdf',
    resumeLabel: 'Download MLE Resume',
    btnClass: 'btn-cyan',
  },
};
