import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Root user-site (akhil14shukla.github.io) deploys at domain root → base '/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei', '@react-three/postprocessing', 'postprocessing'],
          motion: ['framer-motion', 'gsap'],
        },
      },
    },
  },
});
