import { Suspense, useState } from 'react';
import Scene from './three/Scene';
import Hero from './components/Hero';
import QueryBar from './components/QueryBar';
import Hud from './components/Hud';
import Sections from './components/Sections';
import Loader from './components/Loader';
import useLenis from './hooks/useLenis';
import { useStore } from './store';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);
  useLenis();

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />

      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <div className="vignette" />

      <button className="toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? '☀' : '☾'}
      </button>

      <Hud />

      <div className="content">
        <Hero />
        <Sections />
      </div>

      <QueryBar />
      {loaded && <div className="scroll-cue">scroll to run the forward pass ↓</div>}
    </>
  );
}
