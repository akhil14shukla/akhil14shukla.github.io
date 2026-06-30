import { AnimatePresence, motion } from 'framer-motion';
import { CLUSTERS, EXPERIENCE, EDUCATION, PROFILE } from '../data/portfolio';
import { useStore } from '../store';

const variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -18, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

function Home() {
  return (
    <div className="home">
      <motion.div className="kicker" variants={variants}>
        snowfall · a neural field of work
      </motion.div>
      <motion.h1 variants={variants}>{PROFILE.name}.</motion.h1>
      <motion.div className="role" variants={variants}>{PROFILE.role}</motion.div>
      <motion.p className="blurb" variants={variants}>{PROFILE.blurb}</motion.p>
      <motion.div className="socials" variants={variants}>
        {PROFILE.socials.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
        ))}
      </motion.div>
      <motion.div className="hint" variants={variants}>
        pick a current below — the snow will attend to it ↓
      </motion.div>
    </div>
  );
}

function Cards({ items }) {
  return (
    <motion.div className="cards" variants={stagger}>
      {items.map((it) => (
        <motion.div className="card" key={it.title} variants={variants}>
          <h3>
            {it.repo ? (
              <a href={it.repo} target="_blank" rel="noopener noreferrer">{it.title} ↗</a>
            ) : (
              it.title
            )}
          </h3>
          <p>{it.desc}</p>
          {it.tags && (
            <div className="tags">{it.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

function Topic({ topic }) {
  if (topic === 'experience') {
    return (
      <>
        <div className="panel-head"><span className="ord">history</span><h2>Experience</h2></div>
        <div className="panel-sub">// where the weights were trained</div>
        <Cards items={EXPERIENCE.map((e) => ({
          title: e.role, desc: `@ ${e.org} · ${e.date}`, tags: e.points, repo: null,
        }))} />
      </>
    );
  }
  if (topic === 'education') {
    return (
      <>
        <div className="panel-head"><span className="ord">pretraining</span><h2>Education</h2></div>
        <div className="panel-sub">// {EDUCATION.year}</div>
        <Cards items={[{
          title: EDUCATION.school,
          desc: `${EDUCATION.degree} · ${EDUCATION.minor}`,
          tags: EDUCATION.points,
          repo: null,
        }]} />
      </>
    );
  }
  const c = CLUSTERS.find((x) => x.id === topic);
  if (!c) return null;
  return (
    <>
      <div className="panel-head"><span className="ord" style={{ color: c.accent }}>cluster</span><h2>{c.label}</h2></div>
      <div className="panel-sub">// {c.summary}</div>
      <Cards items={c.items} />
    </>
  );
}

export default function ContentPanel() {
  const selectedTopic = useStore((s) => s.selectedTopic);
  const clearTopic = useStore((s) => s.clearTopic);
  const key = selectedTopic ?? 'home';

  return (
    <div className="stage">
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          className={'panel' + (selectedTopic ? ' topic' : ' is-home')}
          variants={stagger}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {selectedTopic && (
            <button className="panel-back" onClick={clearTopic}>↩ home</button>
          )}
          {selectedTopic ? <Topic topic={selectedTopic} /> : <Home />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
