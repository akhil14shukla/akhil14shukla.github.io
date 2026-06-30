import { motion } from 'framer-motion';
import { PROFILE } from '../data/portfolio';

const up = {
  hidden: { opacity: 0, y: 26 },
  show: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] } }),
};

export default function Hero() {
  return (
    <section className="hero">
      <motion.div className="kicker" custom={0} variants={up} initial="hidden" animate="show">
        embedding space · forward pass running
      </motion.div>
      <motion.h1 custom={1} variants={up} initial="hidden" animate="show">
        {PROFILE.name}.
      </motion.h1>
      <motion.div className="role" custom={2} variants={up} initial="hidden" animate="show">
        {PROFILE.role}
      </motion.div>
      <motion.p className="blurb" custom={3} variants={up} initial="hidden" animate="show">
        {PROFILE.blurb}
      </motion.p>
      <motion.div className="socials" custom={4} variants={up} initial="hidden" animate="show">
        {PROFILE.socials.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
        ))}
      </motion.div>
    </section>
  );
}
