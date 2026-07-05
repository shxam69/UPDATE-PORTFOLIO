/**
 * PROJECTS DATA
 * ─────────────────────────────────────────────────────────────────────────
 * Single source of truth for every project on the site.
 *
 * Nothing here is JSX — this is pure data so the Projects section (cards,
 * case study, filtering) can be driven entirely off this array. Adding a
 * new project means adding an object here; no component code changes.
 *
 * Image fields (thumbnail / heroImage / screenshots) are left `null` on
 * purpose — no real screenshots exist yet. Every component that renders
 * an image falls back to a generated visual when the field is empty, and
 * will automatically switch to a real image the moment a URL is added
 * here. Nothing else needs to change.
 *
 * `category` is what Career Mode filters on: 'software' | 'machine-learning'
 */

export const CATEGORIES = {
  SOFTWARE: 'software',
  ML: 'machine-learning',
};

export const projectsData = [
  {
    id: 'p_nievrox',
    category: CATEGORIES.SOFTWARE,
    title: 'NIEVROX',
    org: 'Personal Project',
    timeline: 'SaaS Automation Platform',
    color: '#06b6d4',
    description: 'A modular SaaS automation engine with lazy-loaded routes achieving significant bundle size reduction and a responsive React/Next.js UI.',
    thumbnail: null,
    heroImage: null,
    screenshots: [],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Framer Motion'],
    architecture: ['Next.js Client', 'Node.js Backend', 'Automation Engine'],
    challenge: 'Building a scalable SaaS platform with complex state and animation requirements while keeping bundle size minimal.',
    solution: 'Architected a modular system with lazy-loaded routes and strict component boundaries, utilizing Framer Motion for UI polish.',
    developmentProcess: 'Prototyped the routing architecture first to ensure lazy-loading worked flawlessly before building out the complex state-driven features.',
    results: 'Achieved a ~22% bundle size reduction with sub-second initial loads despite heavy use of interactive animations.',
    lessonsLearned: 'Strict route-based code splitting from day one is critical for maintaining performance in media-heavy React applications.',
    metrics: [
      { label: 'Bundle Size Reduction', value: '~22%' },
      { label: 'Platform Type', value: 'SaaS' }
    ],
    links: {
      github: 'https://github.com/shxam69/nievrox',
      liveDemo: 'https://nievrox-n.vercel.app'
    }
  },
  {
    id: 'p_geep',
    category: CATEGORIES.SOFTWARE,
    title: 'GEEP',
    org: 'Personal Project',
    timeline: 'Development Phase',
    color: '#8b5cf6',
    description: 'An advanced data engineering and pipeline processing tool built to streamline ETL workflows.',
    thumbnail: null,
    heroImage: null,
    screenshots: [],
    techStack: ['Python', 'SQL', 'Data Pipelines', 'System Design'],
    architecture: ['Data Ingestion', 'Processing Engine', 'Storage'],
    challenge: 'Existing ETL tools lacked the flexibility required for rapid schema changes without extensive configuration overhead.',
    solution: 'Designed a dynamic, code-first data pipeline structure capable of adapting to schema drift automatically.',
    developmentProcess: 'Iterated on the ingestion engine to handle malformed data gracefully before building the transformation layers.',
    results: 'Created a highly resilient pipeline capable of running without manual intervention during schema drift.',
    lessonsLearned: 'Building resilience into the ingestion layer prevents cascading failures downstream in data pipelines.',
    metrics: [
      { label: 'Workflow', value: 'ETL' },
      { label: 'Status', value: 'In Dev' }
    ],
    links: {
      github: null,
      liveDemo: null
    }
  },
  {
    id: 'p1',
    category: CATEGORIES.SOFTWARE,
    title: 'CMAC',
    org: 'Eagle Hi-Tech',
    timeline: 'Internship System',
    color: '#f5a623',
    description:
      'A unified, modular dashboard for enterprise workflows — eliminating state-sync friction and repaint overlap across dynamic layouts.',
    thumbnail: null,
    heroImage: null,
    screenshots: [],
    techStack: ['React', 'Java', 'SQL', 'Agile/Scrum'],
    architecture: ['React UI', 'Java API Layer', 'SQL Database'],
    challenge:
      'Enterprise workflows suffered from slow layout rendering and data-state inconsistencies across dynamic dashboard interfaces — every screen change risked a stale or conflicting view.',
    solution:
      'Engineered modular, highly reactive React frontend components paired with custom optimization of the Java API serialization layer, so state changes propagate predictably instead of triggering full repaints.',
    developmentProcess:
      'Started by mapping every dashboard state transition, then rebuilt the layout engine module-by-module so each panel could re-render independently. API payloads were re-shaped in parallel to cut serialization overhead.',
    results:
      'Cut screen-to-interactive processing time by 20% and reduced frontend/backend rework cycles by 15%, with measurably fewer repaint-related bugs reported post-launch.',
    lessonsLearned:
      'Isolating state at the component boundary — rather than patching a shared global store — was the single biggest lever for both performance and maintainability.',
    metrics: [
      { label: 'Render delay', value: '-20%' },
      { label: 'Rework cycles', value: '-15%' },
    ],
    links: {
      github: 'https://github.com/shxam69',
      liveDemo: null,
    },
  },
  {
    id: 'p2',
    category: CATEGORIES.SOFTWARE,
    title: 'Role-Based Dashboard',
    org: 'Chennai Metro Rail Limited (CMRL)',
    timeline: 'Featured Production Deployment',
    color: '#00e676',
    description:
      'A secure, parameter-locked Flask dashboard managing mission-critical operations databases for the Chennai Metro Rail.',
    thumbnail: null,
    heroImage: null,
    screenshots: [],
    techStack: ['Python', 'Flask', 'SQL', 'RBAC', 'JWT Auth'],
    architecture: ['Client', 'Flask API (JWT Auth)', 'MySQL Database'],
    challenge:
      'Internal operators relied on manual database queries through insecure access points, causing workflow delays and real security exposure on a live transit network.',
    solution:
      'Shipped a parameterized, SQL-backed Flask server with stateless JWT authentication and tight role-based access controls, replacing manual query access with a governed dashboard.',
    developmentProcess:
      'Began with a threat-model pass on the existing access points, then rebuilt the auth layer around short-lived signed tokens before layering RBAC-scoped endpoints on top.',
    results:
      'Optimized transport workflow database access speeds by 35% and drove manual query lookup latency down by 18%, while closing the insecure access paths entirely.',
    lessonsLearned:
      'On critical infrastructure, the access-control model has to be designed before the features — retrofitting RBAC afterward is far more expensive than starting with it.',
    metrics: [
      { label: 'Access latency', value: '-35%' },
      { label: 'Query lookup latency', value: '-18%' },
    ],
    links: {
      github: 'https://github.com/shxam69',
      liveDemo: null,
      liveDemoNote: 'Internal Network Only',
    },
  },
  {
    id: 'p3',
    category: CATEGORIES.SOFTWARE,
    title: 'HealLink',
    org: 'AI Health SOS & Broadcast Platform',
    timeline: "Live Web System — 2nd Place, AIDERELLA '25",
    color: '#ff3344',
    description:
      'A patient-doctor emergency broadcast hub automating real-time triage mapping during local distress events.',
    thumbnail: null,
    heroImage: null,
    screenshots: [],
    techStack: ['Next.js', 'WebSockets', 'AI Agents', 'State Isolation'],
    architecture: ['Next.js Client', 'WebSocket Server', 'Location + Triage Store'],
    challenge:
      'Simulated community distress scenarios exposed high dispatcher reaction latency and no unified way to broadcast an emergency across patients, doctors, and volunteers at once.',
    solution:
      'Built a multi-role (patient / doctor / volunteer) Next.js platform on low-latency WebSockets with real-time location mapping, keeping each role\u2019s state isolated to avoid cross-talk under load.',
    developmentProcess:
      'Prototyped the WebSocket message contract first, then built each role\u2019s UI against it independently before stress-testing the full broadcast path under simulated high load.',
    results:
      'Accelerated emergency responder dispatch speed by 40% under high-load network stress tests, and placed 2nd at AIDERELLA \u201925.',
    lessonsLearned:
      'Designing the real-time message contract before any UI meant the three different roles could be built in parallel without integration surprises later.',
    metrics: [
      { label: 'Responder dispatch delay', value: '-40%' },
      { label: 'Roles supported', value: '3' },
    ],
    links: {
      github: 'https://github.com/shxam69',
      liveDemo: 'https://heallink.vercel.app',
    },
  },
  {
    id: 'p4',
    category: CATEGORIES.ML,
    title: 'Prob-PSENN',
    org: 'GradTwin Internship — ML Division',
    timeline: 'GradTwin Internship — ML Division',
    color: '#7c6af5',
    description:
      'An explainable deep convolutional architecture with uncertainty-aware predictive classification, reasoning via prototype maps instead of a black box.',
    thumbnail: null,
    heroImage: null,
    screenshots: [],
    techStack: ['PyTorch', 'CNNs', 'Explainable AI', 'Prototype Learning', 'NumPy'],
    architecture: ['Input Images', 'CNN Feature Extractor', 'Prototype Reasoning Layer', 'Confidence Output'],
    challenge:
      'Build an interpretable deep-learning architecture that can explain its own decisions — not just predict a class and stop there.',
    solution:
      'Implemented uncertainty-aware inference using stochastic forward passes and confidence estimation, combining CNN feature extraction with prototype-based reasoning for handwritten digit classification.',
    developmentProcess:
      'Built the pipeline in stages — training, inference, then visualization — so each stage\u2019s prototype maps could be checked for interpretability before moving on to the next.',
    results:
      'Reached 98.4% accuracy with sub-9ms inference, and enabled human-in-the-loop review by surfacing ambiguous predictions with measurable confidence scores.',
    lessonsLearned:
      'Explainability isn\u2019t a layer you bolt on afterward — designing the prototype-reasoning step alongside the classifier was what made the confidence scores actually meaningful.',
    metrics: [
      { label: 'Accuracy', value: '98.4%' },
      { label: 'Inference speed', value: '< 8.2ms' },
    ],
    links: {
      github: 'https://github.com/shxam69',
      liveDemo: 'https://huggingface.co/spaces/SHXAM69/Prob-PSENN',
    },
  },
  {
    id: 'p5',
    category: CATEGORIES.ML,
    title: 'Retail Sales Forecast',
    org: 'GradTwin Internship — ML Division',
    timeline: 'GradTwin Internship — ML Division',
    color: '#00e676',
    description:
      'An interactive sales-forecasting suite built on a multi-layered regression model, deployed behind a live Streamlit dashboard.',
    thumbnail: null,
    heroImage: null,
    screenshots: [],
    techStack: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'Feature Engineering'],
    architecture: ['Data Ingestion', 'Feature Engineering', 'XGBoost Regressor', 'Streamlit Dashboard'],
    challenge:
      'Retail teams lacked a real-time, AI-powered way to forecast sales performance — decisions were being made on stale, manually-updated spreadsheets.',
    solution:
      'Built an end-to-end ML forecasting pipeline — preprocessing, EDA, feature selection, model training — deployed behind an interactive Streamlit dashboard for real-time predictions.',
    developmentProcess:
      'Iterated on feature engineering the most: automatic outlier mitigation and lag-feature generation stabilized the prediction paths well before final model tuning.',
    results:
      'Delivered a production-ready analytics dashboard with a 30-day forecast window and a 0.12 MAE score, giving the team live business insight instead of static reports.',
    lessonsLearned:
      'Most of the forecasting accuracy came from feature engineering, not model choice — outlier handling mattered more than swapping regressors.',
    metrics: [
      { label: 'Forecast window', value: '30 days' },
      { label: 'MAE score', value: '0.12' },
    ],
    links: {
      github: 'https://github.com/shxam69',
      liveDemo: 'https://retail-sales-prediction-gwgybzaksencnk8cxgcrp2.streamlit.app',
    },
  },
  {
    id: 'p6',
    category: CATEGORIES.ML,
    title: 'AI Country Clustering',
    org: 'GradTwin Internship — ML Division',
    timeline: 'GradTwin Internship — ML Division',
    color: '#29b6f6',
    description:
      'An unsupervised model-discovery suite that surfaces socio-economic patterns across countries with no labels — pure discovery.',
    thumbnail: null,
    heroImage: null,
    screenshots: [],
    techStack: ['Python', 'PCA', 'K-Means', 'Plotly', 'Streamlit'],
    architecture: ['Raw Dataset', 'PCA Reduction', 'K-Means Clustering', 'Plotly Visualization'],
    challenge:
      'Identify hidden socio-economic patterns across countries using unsupervised ML, with no labeled ground truth to validate against.',
    solution:
      'Applied PCA for dimensionality reduction and K-Means for cluster analysis, with interactive Plotly visualizations for real-time exploration inside Streamlit.',
    developmentProcess:
      'Swept cluster counts against silhouette score to find the most defensible segmentation, then validated the resulting clusters against known development indicators.',
    results:
      'Landed on k = 4 optimal clusters with a 0.62 silhouette score, surfacing country segmentation patterns that were effectively invisible to manual analysis.',
    lessonsLearned:
      'Letting the silhouette score pick the cluster count — rather than assuming a "nice" number like 3 or 5 — produced a materially cleaner segmentation.',
    metrics: [
      { label: 'Optimal clusters', value: 'k = 4' },
      { label: 'Silhouette score', value: '0.62' },
    ],
    links: {
      github: 'https://github.com/shxam69',
      liveDemo: 'https://clustering-countries-ai.streamlit.app',
    },
  },
  {
    id: 'p7',
    category: CATEGORIES.ML,
    title: 'Adult Income Prediction AI',
    org: 'GradTwin Internship — ML Division',
    timeline: 'GradTwin Internship — ML Division',
    color: '#ff7043',
    description:
      'A highly accurate income-classification pipeline backed by SHAP explainability, so every prediction comes with a reason.',
    thumbnail: null,
    heroImage: null,
    screenshots: [],
    techStack: ['Python', 'Gradient Boosting', 'SHAP', 'Scikit-learn', 'Streamlit'],
    architecture: ['Preprocessing', 'LightGBM Model', 'SHAP Explainability', 'Streamlit Dashboard'],
    challenge:
      'Income-classification models are typically black boxes — accurate, but hard to trust for decisions that affect real people.',
    solution:
      'Built an end-to-end ML pipeline with SHAP explainability, pairing real-time predictions with interactive inputs and feature-level decision reasoning in a Streamlit dashboard.',
    developmentProcess:
      'Trained the LightGBM classifier first, then layered SHAP value computation on top and iterated on the dashboard until the influence plots were legible to a non-technical reviewer.',
    results:
      'Delivered 95%+ classification accuracy with human-interpretable reasoning behind every prediction, bridging ML power with the trust required for a real decision-support tool.',
    lessonsLearned:
      'A model is only as useful as its explanation — the SHAP dashboard got more positive feedback than the raw accuracy number did.',
    metrics: [
      { label: 'Test accuracy', value: '95%+' },
      { label: 'Inference speed', value: '< 11.5ms' },
    ],
    links: {
      github: 'https://github.com/shxam69',
      liveDemo: 'https://incomeprdt.streamlit.app',
    },
  },
];

/**
 * Returns every project matching a given Career Mode track.
 * 'software'          -> CATEGORIES.SOFTWARE
 * 'ml'                -> CATEGORIES.ML
 * (matches the `activeTrack` values already used by the zustand store)
 */
export function getProjectsByTrack(track) {
  const category = track === 'ml' ? CATEGORIES.ML : CATEGORIES.SOFTWARE;
  return projectsData.filter((p) => p.category === category);
}
