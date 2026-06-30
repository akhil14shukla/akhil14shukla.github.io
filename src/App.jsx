import { Suspense, useEffect, useState } from 'react';
import Scene from './three/Scene';
import NavBar from './components/NavBar';
import ContentPanel from './components/ContentPanel';
import Hud from './components/Hud';
import Loader from './components/Loader';
import useLenis from './hooks/useLenis';
import { useStore } from './store';
import { getScene } from './config/scenes';
import { applyTheme, getTheme } from './config/themes';

export default function App() {
  const [, setLoaded] = useState(false);
  const theme = useStore((s) => s.theme);
  const cycleTheme = useStore((s) => s.cycleTheme);
  const sceneId = useStore((s) => s.sceneId);
  const selectedTopic = useStore((s) => s.selectedTopic);
  useLenis();

  // apply the active theme's tokens to :root
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // dim the scene more when reading a topic, keep it vivid at home
  useEffect(() => {
    document.documentElement.style.setProperty('--scrim', selectedTopic ? '0.28' : '0.0');
  }, [selectedTopic]);

  const backdrop = getScene(sceneId).backdrop;
  const isDark = getTheme(theme).dataTheme === 'dark';

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />

      <div className="sky" />
      {backdrop && <div className="backdrop" style={{ backgroundImage: `url(${backdrop})` }} />}

      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      <div className="content-scrim" />

      <button className="toggle" onClick={cycleTheme} aria-label="Cycle theme">
        {isDark ? '☀' : '☾'}
      </button>

      <Hud />
      <ContentPanel />
      <NavBar />
    </>
  );
}
