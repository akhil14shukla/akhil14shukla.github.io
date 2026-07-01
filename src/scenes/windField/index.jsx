import { Suspense } from 'react';
import Sky from './Sky';
import Mountains from './Mountains';
import Ground from './Ground';
import Grass from './Grass';
import Leaves from './Leaves';
import Fireflies from './Fireflies';
import Samurai from './Samurai';

// Real-time world. `tier` (0 low → 2 high) scales the heavy instanced counts,
// driven by the PerformanceMonitor in Scene.jsx. The rigged samurai is the
// heaviest extra, so it's gated to tier ≥ 1 and skipped on portrait/mobile.
const isPortrait =
  typeof window !== 'undefined' &&
  (window.innerWidth < 760 || window.innerWidth < window.innerHeight);

function World({ tier = 2 }) {
  const grassCount = tier === 0 ? 26000 : tier === 1 ? 52000 : 90000;
  const leafCount = tier === 0 ? 650 : tier === 1 ? 1100 : 1600;
  const fireflyCount = tier === 0 ? 90 : tier === 1 ? 160 : 260;
  const showSamurai = tier >= 1 && !isPortrait;

  return (
    <>
      <Sky />
      <Mountains />
      <Ground />
      <Grass count={grassCount} />
      <Leaves count={leafCount} />
      <Fireflies count={fireflyCount} />
      {showSamurai && (
        <Suspense fallback={null}>
          <Samurai />
        </Suspense>
      )}
    </>
  );
}

export default {
  id: 'wind-field',
  label: 'Wind Field',
  backdrop: null,
  World,
};
