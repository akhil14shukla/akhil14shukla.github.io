// ─────────────────────────────────────────────────────────────────────────
//  Theme registry. A theme is just tokens: a palette (CSS custom properties),
//  a font trio, and which scene it pairs with. applyTheme() writes them onto
//  :root so the whole UI re-skins at runtime. Add a theme = add an entry.
// ─────────────────────────────────────────────────────────────────────────

export const THEMES = [
  {
    id: 'midnight-sakura',
    label: 'Midnight Sakura',
    dataTheme: 'dark',
    sceneId: 'snow-mountain',
    fonts: {
      display: "'Shippori Mincho', serif",
      body: "'Zen Kaku Gothic New', sans-serif",
      mono: "'Fira Code', monospace",
    },
    vars: {
      '--bg': '#0C0D14',
      '--bg-2': '#13141E',
      '--card': 'rgba(20, 22, 32, 0.62)',
      '--card-solid': '#141620',
      '--text': '#B9BDCB',
      '--bright': '#F3F1EC',
      '--gold': '#E2C488',
      '--gold-deep': '#C0A062',
      '--gold-2': '#9C8049',
      '--glow': 'rgba(226, 196, 136, 0.16)',
      '--maple': '#C24A3E',
      '--border': 'rgba(243, 241, 236, 0.11)',
      '--shadow': '0 26px 70px rgba(0, 0, 0, 0.55)',
    },
  },
  {
    id: 'dawn',
    label: 'Dawn',
    dataTheme: 'light',
    sceneId: 'snow-mountain',
    fonts: {
      display: "'Shippori Mincho', serif",
      body: "'Zen Kaku Gothic New', sans-serif",
      mono: "'Fira Code', monospace",
    },
    vars: {
      '--bg': '#F6F2EA',
      '--bg-2': '#EDE6D9',
      '--card': 'rgba(255, 255, 255, 0.74)',
      '--card-solid': '#FFFFFF',
      '--text': '#574F45',
      '--bright': '#2A2620',
      '--gold': '#B0884B',
      '--gold-deep': '#9A7440',
      '--gold-2': '#866536',
      '--glow': 'rgba(176, 136, 75, 0.18)',
      '--maple': '#A8392D',
      '--border': 'rgba(42, 38, 32, 0.1)',
      '--shadow': '0 26px 70px rgba(42, 38, 32, 0.12)',
    },
  },
];

export function getTheme(id) {
  return THEMES.find((t) => t.id === id) || THEMES[0];
}

// Write a theme's tokens onto :root. Safe to call repeatedly.
export function applyTheme(id) {
  if (typeof document === 'undefined') return;
  const t = getTheme(id);
  const root = document.documentElement;
  Object.entries(t.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.style.setProperty('--fh', t.fonts.display);
  root.style.setProperty('--fb', t.fonts.body);
  root.style.setProperty('--fm', t.fonts.mono);
  root.setAttribute('data-theme', t.dataTheme);
}
