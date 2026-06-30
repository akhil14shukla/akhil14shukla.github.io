import { motion } from 'framer-motion';
import { STATIONS } from '../data/portfolio';
import { useStore } from '../store';
import { scrollToProgress } from '../hooks/useLenis';
import { wind, spawnGust } from '../three/wind';

// Bottom nav — each chip jumps the camera to a station along the journey and
// sends a guiding gust through the field. Active chip tracks scroll progress.
const ITEMS = STATIONS.filter((s) => s.kind !== 'cta');

export default function NavBar() {
  const progress = useStore((s) => s.progress);
  // nearest station to current progress = active
  let active = ITEMS[0].id;
  let best = 1;
  for (const s of ITEMS) {
    const d = Math.abs(progress - s.p);
    if (d < best) { best = d; active = s.id; }
  }

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="navbar-label">ride&nbsp;the&nbsp;wind</span>
      {ITEMS.map((s) => (
        <button
          key={s.id}
          className={'chip' + (active === s.id ? ' active' : '')}
          onClick={() => {
            scrollToProgress(s.p);
            spawnGust(wind.cursorX, wind.cursorZ);
          }}
        >
          {s.label.split(' & ')[0]}
        </button>
      ))}
    </motion.nav>
  );
}
