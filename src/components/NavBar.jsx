import { motion } from 'framer-motion';
import { CLUSTERS } from '../data/portfolio';
import { useStore } from '../store';

// Bottom nav = the query bar. Each chip selects a topic: the snow attends to it
// and the content panel swaps in place. Re-clicking the active chip returns home.
const ITEMS = [
  { id: null, label: 'Home' },
  ...CLUSTERS.map((c) => ({ id: c.id, label: c.label })),
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
];

export default function NavBar() {
  const selectedTopic = useStore((s) => s.selectedTopic);
  const selectTopic = useStore((s) => s.selectTopic);

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="navbar-label">follow&nbsp;the&nbsp;wind</span>
      {ITEMS.map((it) => (
        <button
          key={it.label}
          className={'chip' + (selectedTopic === it.id ? ' active' : '')}
          onClick={() => selectTopic(it.id)}
        >
          {it.label}
        </button>
      ))}
    </motion.nav>
  );
}
