import * as THREE from 'three';

// Shared dusk palette for the real-time world. One source of truth so sky,
// mountains, fog and grass agree.
export const PALETTE = {
  zenith: new THREE.Color('#1b1730'),
  horizon: new THREE.Color('#e89a52'),
  haze: new THREE.Color('#caa074'),
  sun: new THREE.Color('#ffe6b8'),
  sunDir: new THREE.Vector3(-0.55, 0.18, -0.82).normalize(),
  fog: new THREE.Color('#b98a64'),
  grassBase: new THREE.Color('#2c2a16'),
  grassTip: new THREE.Color('#d8b25a'),
  grassDry: new THREE.Color('#b98a3e'),
  grassGreen: new THREE.Color('#586a30'),
  ground: new THREE.Color('#211d12'),
  maple: new THREE.Color('#c0392b'),
  sakura: new THREE.Color('#f3c6d6'),
  // backdrop accents
  moon: new THREE.Color('#cdd6f0'),
  star: new THREE.Color('#e8ecff'),
  cloud: new THREE.Color('#d8a878'),
  fujiSnow: new THREE.Color('#e6e2f0'),
  fujiRock: new THREE.Color('#46435f'),
  firefly: new THREE.Color('#ffcf7a'),
};
