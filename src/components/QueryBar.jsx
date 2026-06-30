import { motion } from 'framer-motion';
import { QUERIES } from '../data/portfolio';
import { useStore } from '../store';

export default function QueryBar() {
  const query = useStore((s) => s.query);
  const runQuery = useStore((s) => s.runQuery);
  const clearFocus = useStore((s) => s.clearFocus);

  return (
    <motion.div
      className="querybar"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="label">query&nbsp;the&nbsp;embedding</span>
      {QUERIES.map((q) => (
        <button
          key={q.q}
          className={'chip' + (query === q.q ? ' active' : '')}
          onClick={() => (query === q.q ? clearFocus() : runQuery(q.q))}
        >
          {q.q}
        </button>
      ))}
    </motion.div>
  );
}
