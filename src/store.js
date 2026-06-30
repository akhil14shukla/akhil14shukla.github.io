import { create } from 'zustand';
import { CLUSTERS, QUERIES } from './data/portfolio';

// Softmax over an object of {clusterId: logit}
function softmax(weights, temp = 1) {
  const ids = CLUSTERS.map((c) => c.id);
  const logits = ids.map((id) => (weights[id] ?? 0) / temp);
  const mx = Math.max(...logits);
  const exps = logits.map((l) => Math.exp((l - mx) * 3));
  const z = exps.reduce((a, b) => a + b, 0) || 1;
  const probs = {};
  ids.forEach((id, i) => (probs[id] = exps[i] / z));
  return probs;
}

const initialTheme =
  (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) || 'dark';

export const useStore = create((set, get) => ({
  // ── theme ──
  theme: initialTheme,
  toggleTheme: () =>
    set((s) => {
      const next = s.theme === 'dark' ? 'light' : 'dark';
      if (typeof localStorage !== 'undefined') localStorage.setItem('theme', next);
      document.documentElement.setAttribute('data-theme', next);
      return { theme: next };
    }),

  // ── retrieval / forward-pass state ──
  query: null, // current query string
  relevance: {}, // softmax probs over clusters
  activeCluster: null, // argmax cluster id (the section the camera flies to)
  temperature: 1.0,
  visited: new Set(),
  block: 0, // which transformer block the playhead is in (0..6)
  flying: false,

  setTemperature: (t) => {
    const s = get();
    set({ temperature: t });
    if (s.query) {
      const qd = QUERIES.find((x) => x.q === s.query);
      if (qd) set({ relevance: softmax(qd.weights, t) });
    }
  },

  // Fire a query: tokenize → retrieve (softmax) → argmax cluster → mark visited.
  runQuery: (q) => {
    const qd = QUERIES.find((x) => x.q === q);
    const weights = qd ? qd.weights : {};
    const probs = softmax(weights, get().temperature);
    const active = Object.entries(probs).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
    const visited = new Set(get().visited);
    if (active) visited.add(active);
    set({ query: q, relevance: probs, activeCluster: active, visited, flying: true });
  },

  // Directly focus a cluster (clicking a node / nav).
  focusCluster: (id) => {
    const visited = new Set(get().visited);
    if (id) visited.add(id);
    // synthesize a one-hot relevance so the HUD + attention reflect it
    const probs = {};
    CLUSTERS.forEach((c) => (probs[c.id] = c.id === id ? 1 : 0.04));
    set({ activeCluster: id, relevance: probs, visited, flying: true, query: id ? `→ ${id}` : null });
  },

  clearFocus: () => set({ activeCluster: null, query: null, relevance: {}, flying: false }),
  setFlying: (v) => set({ flying: v }),
  setBlock: (b) => set({ block: b }),

  explorationPct: () => Math.round((get().visited.size / CLUSTERS.length) * 100),
}));
