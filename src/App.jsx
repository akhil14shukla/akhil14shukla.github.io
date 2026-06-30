import { Suspense, useEffect, useState } from 'react';
import Scene from './three/Scene';
import NavBar from './components/NavBar';
import Stations from './components/Stations';
import Loader from './components/Loader';
import useLenis from './hooks/useLenis';
import { useStore } from './store';
import { applyTheme, getTheme } from './config/themes';

export default function App() {
  const [, setLoaded] = useState(false);
  const theme = useStore((s) => s.theme);
  const cycleTheme = useStore((s) => s.cycleTheme);
  useLenis();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const isDark = getTheme(theme).dataTheme === 'dark';

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />

      {/* fixed real-time world */}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      {/* feathered grade so station text stays legible over the world */}
      <div className="grade" />

      <button className="toggle" onClick={cycleTheme} aria-label="Cycle theme">
        {isDark ? '☀' : '☾'}
      </button>

      {/* scroll-revealed content + nav */}
      <Stations />
      <NavBar />

      {/* tall spacer gives Lenis its scroll range (drives the camera journey) */}
      <div className="scroll-spacer" aria-hidden="true" />
    </>
  );
}
