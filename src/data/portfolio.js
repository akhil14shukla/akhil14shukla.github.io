// ─────────────────────────────────────────────────────────────────────────
//  The portfolio as a latent space.
//  NOTE: nothing here runs or trains a model. The "transformer" is a visual
//  metaphor — embeddings, attention, and a forward pass rendered for effect.
//  Every cluster is a region of the embedding; every query lights one up.
// ─────────────────────────────────────────────────────────────────────────

export const PROFILE = {
  name: 'Akhil Shukla',
  role: 'Data Scientist & AI/ML Engineer',
  tagline: 'I train models. This site is shaped like one.',
  blurb:
    'Data Scientist III at Walmart Global Tech · Kaggle Expert · IIT Kanpur alumnus. ' +
    'I build forecasting systems, predictive models, and open-source data tools.',
  email: 'akhil14shukla@gmail.com',
  github: 'https://github.com/akhil14shukla',
  socials: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/akhil14shukla' },
    { label: 'GitHub', url: 'https://github.com/akhil14shukla' },
    { label: 'Kaggle', url: 'https://kaggle.com/akhil14shukla' },
  ],
};

// Clusters = regions of the latent space. center is the 3D centroid the camera flies to.
export const CLUSTERS = [
  {
    id: 'forecasting',
    label: 'Forecasting & Time-Series',
    color: '#C99A53',
    accent: '#E9C886',
    center: [-7.4, 1.6, 1.0],
    count: 440,
    spread: 1.95,
    summary: 'Time-series forecasting from macro-finance to crypto, with rigorous validation.',
    items: [
      { title: 'MacroFinancial Forecasting', desc: 'Automated workflow at 2% MAPE for financial indicators.', tags: ['Forecasting', 'Airflow'], repo: null },
      { title: 'Cryptocurrency-Price-Prediction', desc: 'Differencing for stationarity + LSTM in TensorFlow; documented report.', tags: ['TensorFlow', 'LSTM', 'Jupyter'], repo: 'https://github.com/akhil14shukla/Cryptocurrency-Price-Prediction' },
      { title: 'forecasting_cpp', desc: 'Forecasting routines implemented in C++ for speed.', tags: ['C++', 'Time-Series'], repo: 'https://github.com/akhil14shukla/forecasting_cpp' },
    ],
  },
  {
    id: 'competitive',
    label: 'Competitive ML & Open-Source',
    color: '#B08D57',
    accent: '#D9B47E',
    center: [6.8, 2.2, -2.2],
    count: 420,
    spread: 1.9,
    summary: 'Kaggle Expert & Codeforces Specialist — predictive modeling, shipped as open-source.',
    items: [
      { title: 'ppscore · pps-python', desc: 'Predictive Power Score library on PyPI — finds linear & non-linear patterns beyond correlation.', tags: ['Python', 'PyPI', 'scikit-learn'], repo: 'https://github.com/akhil14shukla/ppscore' },
      { title: 'Tabular-Playground', desc: 'Kaggle competition solutions and practice notebooks.', tags: ['Kaggle', 'Jupyter'], repo: 'https://github.com/akhil14shukla/Tabular-Playground' },
      { title: 'Competitive-Programming', desc: 'Data structures & ready-to-use C++ templates; Codeforces Specialist (max 1429).', tags: ['C++', 'Algorithms'], repo: 'https://github.com/akhil14shukla/Competitive-Programming' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics & Insights',
    color: '#A98248',
    accent: '#CBA56B',
    center: [0.6, -3.8, 2.6],
    count: 400,
    spread: 1.9,
    summary: 'Predictive analytics that turn messy business data into decisions.',
    items: [
      { title: 'Personalization PoC @ Walmart', desc: 'Advanced user-specific insight generation; turned complex requests into custom analytics.', tags: ['Analytics', 'Personalization'], repo: null },
      { title: 'Loan-Default Prediction', desc: 'IME672A course project: predict whether an applicant defaults on a loan.', tags: ['Classification', 'Jupyter'], repo: 'https://github.com/akhil14shukla/IME672A-Course-Project' },
      { title: 'Telco Customer Churn', desc: 'Churn modeling and retention analysis on telecom data.', tags: ['Churn', 'EDA'], repo: 'https://github.com/akhil14shukla/IME672A-Extras' },
    ],
  },
  {
    id: 'projects',
    label: 'Projects & Tooling',
    color: '#9C7944',
    accent: '#C09A5E',
    center: [-2.6, 4.4, -3.6],
    count: 380,
    spread: 1.85,
    summary: 'Things I build for myself — from image tooling to cross-device data sync.',
    items: [
      { title: 'image_renamer', desc: 'Renames images in a folder based on their visual content.', tags: ['Python', 'CV'], repo: 'https://github.com/akhil14shukla/image_renamer' },
      { title: 'Galaxy Watch ↔ iOS Sync', desc: 'WearOS app + local server to sync Galaxy Watch data to iOS.', tags: ['Kotlin', 'JavaScript'], repo: 'https://github.com/akhil14shukla/iOSGalaxyWatchSync_wearOS' },
      { title: 'ghostty_mac_setup', desc: 'Reproducible Ghostty terminal setup for macOS.', tags: ['Shell', 'Dotfiles'], repo: 'https://github.com/akhil14shukla/ghostty_mac_setup' },
    ],
  },
];

// Queries the visitor can fire. weights = relevance over clusters (softmax-able).
export const QUERIES = [
  { q: 'What can you build?', weights: { forecasting: 0.9, analytics: 0.8, competitive: 0.7, projects: 0.7 } },
  { q: 'Forecasting & time-series', weights: { forecasting: 1.0, analytics: 0.3 } },
  { q: 'Competitive ML & open-source', weights: { competitive: 1.0, forecasting: 0.3 } },
  { q: 'Analytics & insights', weights: { analytics: 1.0, competitive: 0.3 } },
  { q: 'Explore my GitHub', weights: { projects: 1.0, competitive: 0.5 } },
];

export const EXPERIENCE = [
  {
    role: 'Data Scientist III',
    org: 'Walmart Global Tech',
    date: 'Aug 2024 — Present',
    points: [
      'Led a PoC advancing user-specific personalization and insight generation.',
      'Engineered an autonomous insight workflow turning complex user requests into custom analytics.',
      'Built retrieval and data-extraction tooling over business context.',
    ],
  },
  {
    role: 'Analyst II',
    org: 'Walmart Global Tech',
    date: 'Jun 2022 — Aug 2024',
    points: [
      'Developed a natural-language-to-SQL service with logical-correctness checks.',
      'Automated multi-step summarization of financial reports.',
      'Built a macro-financial forecasting workflow achieving 2% MAPE.',
      'Associate of the Quarter (Bravo) + Team Award for Delivery Excellence.',
    ],
  },
];

export const EDUCATION = {
  school: 'Indian Institute of Technology Kanpur',
  year: 'Class of 2022',
  degree: 'B.Tech in Chemical Engineering',
  minor: 'Minor in Industrial & Management Engineering',
  points: [
    'Manager, Design | Antaragni’19 — led 15 designers, revamped app UI (+30% YoY).',
    'Academic Mentor — mentored 300+ students in PHY103: Electrodynamics.',
  ],
};

// What the output layer can predict (softmax vocabulary → CTA).
export const VERDICTS = [
  { token: 'collaborate', cta: "Let's collaborate", href: 'mailto:akhil14shukla@gmail.com' },
  { token: 'hire', cta: 'Get in touch', href: 'mailto:akhil14shukla@gmail.com' },
  { token: 'connect', cta: 'Connect on LinkedIn', href: 'https://linkedin.com/in/akhil14shukla' },
];
