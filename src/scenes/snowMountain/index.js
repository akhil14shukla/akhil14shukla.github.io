import SnowField from './SnowField';
import GrassField from './GrassField';

// A scene implements a small contract so it can be swapped wholesale:
//   { id, label, backdrop, Particles, Foreground, fog }
// Particles + Foreground render inside the Canvas; backdrop is a DOM image
// behind the canvas (the painted mountains).
export default {
  id: 'snow-mountain',
  label: 'Snow Mountain',
  backdrop: '/scenery/snow-mountain.svg',
  Particles: SnowField,
  Foreground: GrassField,
  fog: { color: '#0C0D14', near: 16, far: 52 },
};
