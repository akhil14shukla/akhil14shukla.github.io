// Scene registry. Add a scenery = implement the scene contract in src/scenes/
// and register it here; nothing else in the app needs to change.
import windField from '../scenes/windField';
import snowMountain from '../scenes/snowMountain';

export const SCENES = {
  [windField.id]: windField,
  [snowMountain.id]: snowMountain,
};

export const DEFAULT_SCENE = windField.id;

export function getScene(id) {
  return SCENES[id] || windField;
}
