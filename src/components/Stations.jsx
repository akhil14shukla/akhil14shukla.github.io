import { useStore } from '../store';
import {
  STATIONS,
  CLUSTERS,
  EXPERIENCE,
  EDUCATION,
  PROFILE,
  VERDICTS,
} from '../data/portfolio';

// Smooth window: full opacity at a station's centre, fading toward its edges.
function vis(progress, p, half = 0.075) {
  const d = Math.abs(progress - p);
  return Math.max(0, 1 - (d / half) * (d / half));
}

function Tags({ tags }) {
  if (!tags) return null;
  return (
    <div className="tags">
      {tags.map((t) => (
        <span className="tag" key={t}>{t}</span>
      ))}
    </div>
  );
}

function Cards({ items }) {
  return (
    <div className="cards">
      {items.map((it) => (
        <div className="card" key={it.title}>
          <h3>
            {it.repo ? (
              <a href={it.repo} target="_blank" rel="noopener noreferrer">{it.title} ↗</a>
            ) : (
              it.title
            )}
          </h3>
          <p>{it.desc}</p>
          <Tags tags={it.tags} />
        </div>
      ))}
    </div>
  );
}

function Home() {
  return (
    <div className="home">
      <div className="kicker">the guiding wind · a field of work</div>
      <h1>{PROFILE.name}.</h1>
      <div className="role">{PROFILE.role}</div>
      <p className="blurb">{PROFILE.blurb}</p>
      <div className="socials">
        {PROFILE.socials.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
        ))}
      </div>
      <div className="hint">scroll to ride the wind through the field ↓</div>
    </div>
  );
}

function Cta() {
  const v = VERDICTS[0];
  return (
    <div className="home cta">
      <div className="kicker">the wind settles</div>
      <h1>Let&rsquo;s build something.</h1>
      <p className="blurb">{PROFILE.name} · {PROFILE.role} · IIT Kanpur · Kaggle Expert</p>
      <a className="verdict-cta" href={v.href} target="_blank" rel="noopener noreferrer">{v.cta}</a>
      <div className="socials">
        {PROFILE.socials.map((s) => (
          <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
        ))}
      </div>
    </div>
  );
}

function Body({ station }) {
  if (station.kind === 'home') return <Home />;
  if (station.kind === 'cta') return <Cta />;
  if (station.kind === 'experience') {
    return (
      <>
        <div className="panel-head"><span className="ord">history</span><h2>Experience</h2></div>
        <div className="panel-sub">// where the work was forged</div>
        <Cards items={EXPERIENCE.map((e) => ({ title: e.role, desc: '@ ' + e.org + ' · ' + e.date, tags: e.points }))} />
      </>
    );
  }
  if (station.kind === 'education') {
    return (
      <>
        <div className="panel-head"><span className="ord">roots</span><h2>Education</h2></div>
        <div className="panel-sub">// {EDUCATION.year}</div>
        <Cards items={[{ title: EDUCATION.school, desc: EDUCATION.degree + ' · ' + EDUCATION.minor, tags: EDUCATION.points }]} />
      </>
    );
  }
  const c = CLUSTERS.find((x) => x.id === station.id);
  return (
    <>
      <div className="panel-head"><span className="ord" style={{ color: c.accent }}>field</span><h2>{c.label}</h2></div>
      <div className="panel-sub">// {c.summary}</div>
      <Cards items={c.items} />
    </>
  );
}

export default function Stations() {
  const progress = useStore((s) => s.progress);
  return (
    <div className="stage">
      {STATIONS.map((st) => {
        const o = vis(progress, st.p);
        if (o <= 0.001) return null;
        const cls = st.kind === 'home' || st.kind === 'cta' ? 'is-home' : 'topic';
        return (
          <div key={st.id} className={'panel ' + cls} style={{ opacity: o }}>
            <Body station={st} />
          </div>
        );
      })}
    </div>
  );
}
