import { create } from 'zustand';
import { THEMES, applyTheme } from './config/themes';

const initialTheme =
  (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) || THEMES[0].id;

export const useStore = create((set, get) => ({
  // ── theme + scene (swap-able) ──
  theme: initialTheme,
  sceneId: 'wind-field',
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

  // ── journey progress (0..1) from scroll ──
  progress: 0,
  setProgress: (p) => set({ progress: p }),
}));
