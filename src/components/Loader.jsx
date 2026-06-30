import { useEffect, useState } from 'react';

const MSGS = ['loading weights', 'building embeddings', 'warming attention', 'ready'];

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.random() * 18 + 6);
      setPct(Math.round(p));
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => {
          setHidden(true);
          onDone?.();
        }, 450);
      }
    }, 180);
    return () => clearInterval(id);
  }, [onDone]);

  const msg = MSGS[Math.min(MSGS.length - 1, Math.floor((pct / 100) * MSGS.length))];

  return (
    <div className="loader" style={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? 'none' : 'auto' }}>
      <div className="inner">
        <div className="pct">{pct}%</div>
        <div className="msg">{msg}</div>
        <div className="track"><i style={{ width: `${pct}%` }} /></div>
      </div>
    </div>
  );
}
