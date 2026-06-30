import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { wind } from './wind';

// Scroll-scrubbed camera: a smooth CatmullRom flight from high above the field,
// descending INTO the grass, skimming low through it, and rising toward the
// mountains for the closing station. Driven by wind.progress (Lenis scroll),
// damped, with a touch of cursor parallax.
const CAM = [
  [0, 11, 46],
  [7, 5.5, 28],
  [-5, 1.9, 12],
  [4, 1.4, -4],
  [-3, 2.2, -20],
  [0, 7, -34],
];
const LOOK = [
  [0, 3, 16],
  [2, 2, 4],
  [0, 1.3, -2],
  [0, 1.1, -14],
  [0, 2.2, -28],
  [0, 9, -82],
];

export default function CameraJourney() {
  const { camera } = useThree();
  const p = useRef(0);
  const target = useRef(new THREE.Vector3(0, 3, 16));

  const { camCurve, lookCurve } = useMemo(() => ({
    camCurve: new THREE.CatmullRomCurve3(CAM.map((v) => new THREE.Vector3(...v))),
    lookCurve: new THREE.CatmullRomCurve3(LOOK.map((v) => new THREE.Vector3(...v))),
  }), []);

  useFrame((_, dt) => {
    // ease progress toward the scroll value
    p.current = THREE.MathUtils.damp(p.current, wind.progress, 4, dt);
    const t = Math.min(1, Math.max(0, p.current));
    const pos = camCurve.getPoint(t);
    const look = lookCurve.getPoint(t);
    // cursor parallax (subtle)
    pos.x += wind.ndcX * 0.8;
    pos.y += wind.ndcY * 0.5;
    camera.position.copy(pos);
    target.current.lerp(look, 0.2);
    camera.lookAt(target.current);
  });

  return null;
}
