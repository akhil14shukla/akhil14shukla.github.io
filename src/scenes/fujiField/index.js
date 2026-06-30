import LeafField from './LeafField';
import FieldPlane from './FieldPlane';

// Photographic Ghost-of-Tsushima-style scene: a Mt. Fuji sunset backdrop (DOM
// layer, see App), a wind-swayed susuki-grass foreground, and maple leaves
// streaming on the shared wind. Implements the standard scene contract.
export default {
  id: 'fuji-field',
  label: 'Fuji Field',
  backdrop: '/scenery/mountain.jpg',
  Particles: LeafField,
  Foreground: FieldPlane,
  fog: null,
};
