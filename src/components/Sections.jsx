import { motion } from 'framer-motion';
import { CLUSTERS, EXPERIENCE, EDUCATION, PROFILE, VERDICTS } from '../data/portfolio';
import { useStore } from '../store';

const reveal = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

function Section({ children, ord, onEnter }) {
  return (
    <motion.section
      className="section"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.35 }}
      variants={reveal}
      onViewportEnter={onEnter}
    >
      {children}
    </motion.section>
  );
}

export default function Sections() {
  const focusCluster = useStore((s) => s.focusCluster);
  const explorationPct = useStore((s) => s.explorationPct);
  const pct = explorationPct();
  const verdict = VERDICTS[Math.min(VERDICTS.length - 1, Math.floor((pct / 100) * VERDICTS.length))] || VERDICTS[0];

  return (
    <div className="dossier">
      {/* Work, grouped by latent-space cluster — scrolling each flies the galaxy there */}
      {CLUSTERS.map((c, i) => (
        <Section key={c.id} onEnter={() => focusCluster(c.id)}>
          <div className="section-title">
            <span className="ord">block {i + 1}</span>
            {c.label}
          </div>
          <div className="section-sub">// {c.summary}</div>
          <div className="cards">
            {c.items.map((it) => (
              <div className="card" key={it.title}>
                <h3>
                  {it.repo ? (
                    <a href={it.repo} target="_blank" rel="noopener noreferrer">{it.title} ↗</a>
                  ) : (
                    it.title
                  )}
                </h3>
                <p>{it.desc}</p>
                <div className="tags">{it.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        </Section>
      ))}

      {/* Experience timeline */}
      <Section onEnter={() => focusCluster(null)}>
        <div className="section-title"><span className="ord">history</span>Experience</div>
        <div className="section-sub">// where the weights were trained</div>
        <div className="cards">
          {EXPERIENCE.map((e) => (
            <div className="card" key={e.role + e.date}>
              <h3>{e.role}</h3>
              <div className="org">@ {e.org}</div>
              <div className="date">{e.date}</div>
              <ul>{e.points.map((p, k) => <li key={k}>{p}</li>)}</ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section>
        <div className="section-title"><span className="ord">pretraining</span>Education</div>
        <div className="section-sub">// {EDUCATION.year}</div>
        <div className="cards">
          <div className="card">
            <h3>{EDUCATION.school}</h3>
            <div className="org">{EDUCATION.degree}</div>
            <div className="date">{EDUCATION.minor}</div>
            <ul>{EDUCATION.points.map((p, k) => <li key={k}>{p}</li>)}</ul>
          </div>
        </div>
      </Section>

      {/* Output layer / CTA */}
      <footer>
        <div className="section-sub" style={{ marginBottom: '0.6rem' }}>
          // output layer · argmax → “{verdict.token}”
        </div>
        <a className="verdict-cta" href={verdict.href} target="_blank" rel="noopener noreferrer">
          {verdict.cta}
        </a>
        <div className="small">
          {PROFILE.name} · {PROFILE.role} · IIT Kanpur · Kaggle Expert
        </div>
        <div className="small">latent space explored: {pct}%</div>
      </footer>
    </div>
  );
}
