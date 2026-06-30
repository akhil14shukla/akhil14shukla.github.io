import Sky from './Sky';
import Mountains from './Mountains';
import Ground from './Ground';
import Grass from './Grass';
import Leaves from './Leaves';

// Real-time world. `tier` (0 low → 2 high) scales the heavy instanced counts,
// driven by the PerformanceMonitor in Scene.jsx.
function World({ tier = 2 }) {
  const grassCount = tier === 0 ? 26000 : tier === 1 ? 52000 : 90000;
  const leafCount = tier === 0 ? 650 : tier === 1 ? 1100 : 1600;
  return (
    <>
      <Sky />
      <Mountains />
      <Ground />
      <Grass count={grassCount} />
      <Leaves count={leafCount} />
    </>
  );
}

export default {
  id: 'wind-field',
  label: 'Wind Field',
  backdrop: null,
  World,
};
