import { useEffect, useRef, useState } from 'react';
import { useStore } from '../store';
import { CLUSTERS, VERDICTS } from '../data/portfolio';

const NHEAD = 8;

// A live "activation probe" — pure ambience that reacts to the current
// selection (relevance) and how much of the field has been explored.
export default function Hud() {
  const relevance = useStore((s) => s.relevance);
  const selectedTopic = useStore((s) => s.selectedTopic);
  const explorationPct = useStore((s) => s.explorationPct);

  const [block, setBlock] = useState(1);
  const [norm, setNorm] = useState(0.4);
  const [heads, setHeads] = useState(new Array(NHEAD).fill(0.15));
  const raf = useRef();

  useEffect(() => {
    const t0 = performance.now();
    const tick = (now) => {
      const t = (now - t0) / 1000;
      setBlock(1 + Math.floor((t * 0.9) % 6));
      const rel = useStore.getState().relevance;
      const maxRel = Math.max(0, ...Object.values(rel));
      setNorm(0.35 + 0.4 * (0.5 + 0.5 * Math.sin(t * 1.3)) + maxRel * 0.25);
      const relArr = CLUSTERS.map((c) => rel[c.id] ?? 0);
      setHeads(
        Array.from({ length: NHEAD }, (_, h) => {
          const r = relArr[h % CLUSTERS.length] || 0;
          return 0.12 + Math.abs(Math.sin(t * 2 + h * 0.8)) * (0.3 + r) + r * 0.4;
        })
      );
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const pct = explorationPct();
  const fired = pct >= 100;
  const verdict =
    VERDICTS[Math.min(VERDICTS.length - 1, Math.floor((pct / 100) * VERDICTS.length))] || VERDICTS[0];
  const conf = Math.round(
    Math.min(99, 40 + pct * 0.55 + (Object.values(relevance).length ? Math.max(...Object.values(relevance)) * 15 : 0))
  );
  const headMax = Math.max(...heads) || 1;
  const label = CLUSTERS.find((c) => c.id === selectedTopic)?.label || '—';

  return (
    <div className="hud" aria-hidden="true">
      <h4>
        Activation Probe
        <span className="live"><span className="dot" />live</span>
      </h4>

      <div className="meter">
        <div className="row"><span>block</span><b>{block} / 6</b></div>
      </div>

      <div className="meter">
        <div className="row"><span>residual ‖x‖</span><b>{norm.toFixed(2)}</b></div>
        <div className="bar"><i style={{ width: `${Math.min(100, norm * 70)}%` }} /></div>
      </div>

      <div className="meter">
        <div className="row"><span>attention heads</span><b>{NHEAD}</b></div>
        <div className="heads">
          {heads.map((h, i) => (
            <span
              key={i}
              className={'h' + (h / headMax > 0.62 ? ' hot' : '')}
              style={{ height: `${15 + (h / headMax) * 85}%` }}
            />
          ))}
        </div>
      </div>

      <div className="meter">
        <div className="row"><span>attending · {label}</span><b>{conf}%</b></div>
        <div className="bar"><i style={{ width: `${conf}%` }} /></div>
      </div>

      <div className="meter">
        <div className="row"><span>field explored</span><b>{pct}%</b></div>
        <div className="bar"><i style={{ width: `${pct}%`, background: pct >= 100 ? 'var(--gold)' : undefined }} /></div>
      </div>

      <div className={'verdict' + (fired ? ' fired' : '')}>
        <span>{fired ? 'output · argmax' : 'output · softmax'}</span>
        <b>{fired ? `“${verdict.token}” ✓` : '…'}</b>
      </div>
    </div>
  );
}
