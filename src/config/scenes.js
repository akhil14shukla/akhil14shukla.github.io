// Scene registry. Add a scenery = implement the scene contract in src/scenes/
// and register it here; nothing else in the app needs to change.
import fujiField from '../scenes/fujiField';
import snowMountain from '../scenes/snowMountain';

export const SCENES = {
  [fujiField.id]: fujiField,
  [snowMountain.id]: snowMountain,
};

export const DEFAULT_SCENE = fujiField.id;

export function getScene(id) {
  return SCENES[id] || fujiField;
}
