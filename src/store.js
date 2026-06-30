import { create } from 'zustand';
import { CLUSTERS } from './data/portfolio';
import { THEMES, applyTheme } from './config/themes';
import { spawnGust } from './three/wind';

const clusterIndex = (id) => CLUSTERS.findIndex((c) => c.id === id);

const initialTheme =
  (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) || THEMES[0].id;

export const useStore = create((set, get) => ({
  // ── theme + scene (swap-able) ──
  theme: initialTheme,
  sceneId: 'snow-mountain',
  setTheme: (id) => {
    if (typeof localStorage !== 'undefined') localStorage.setItem('theme', id);
    applyTheme(id);
    set({ theme: id });
  },
  cycleTheme: () => {
    const i = THEMES.findIndex((t) => t.id === get().theme);
    get().setTheme(THEMES[(i + 1) % THEMES.length].id);
  },
  setScene: (sceneId) => set({ sceneId }),

  // ── selection / neural read ──
  // selectedTopic: null = home; a cluster id; or 'experience' | 'education'
  selectedTopic: null,
  selectedIndex: -1, // cluster index for the shader (-1 = none / non-cluster)
  relevance: {}, // one-hot-ish weights over clusters, drives HUD + snow glow
  visited: new Set(),

  // Fire a topic: the snow attends to that cluster, content swaps, wind ripples.
  selectTopic: (id) => {
    if (id === get().selectedTopic) {
      get().clearTopic();
      return;
    }
    const ci = id ? clusterIndex(id) : -1;
    const relevance = {};
    CLUSTERS.forEach((c) => (relevance[c.id] = c.id === id ? 1 : 0.05));
    const visited = new Set(get().visited);
    if (ci >= 0) visited.add(id);
    spawnGust(0, 1.0, 3.5); // ripple the field toward the focal point
    set({ selectedTopic: id, selectedIndex: ci, relevance, visited });
  },

  clearTopic: () => {
    spawnGust(0, 1.0, 3.5);
    set({ selectedTopic: null, selectedIndex: -1, relevance: {} });
  },

  explorationPct: () => Math.round((get().visited.size / CLUSTERS.length) * 100),
}));
