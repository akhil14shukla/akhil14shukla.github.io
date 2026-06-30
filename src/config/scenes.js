// Scene registry. Add a scenery = implement the scene contract in src/scenes/
// and register it here; nothing else in the app needs to change.
import snowMountain from '../scenes/snowMountain';

export const SCENES = {
  [snowMountain.id]: snowMountain,
};

export function getScene(id) {
  return SCENES[id] || snowMountain;
}
