import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { wind } from '../../three/wind';

// Foreground field of golden grass along the bottom of the frame. A single
// billboard plane whose fragment shader draws ~tapered blades that bend with
// the shared wind field, so grass and snow move together.
const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uWind;     // signed wind (dir.x * strength)
  uniform vec3 uBase;
  uniform vec3 uTip;
  varying vec2 vUv;

  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    float NB = 210.0;
    // gentle wind shear toward the tip + a fine shimmer (kept subtle so blades
    // read as a dense upright field, not diagonal streaks)
    float bend = uWind * 0.018 * pow(vUv.y, 2.0)
               + sin(uTime * 1.6 + vUv.x * 60.0) * 0.004 * vUv.y;
    float x = vUv.x + bend;
    float bi = floor(x * NB);
    float fx = fract(x * NB);
    float h = 0.62 + hash(bi) * 0.34;                // per-blade height (low variance)
    float center = 0.5 + (hash(bi + 7.0) - 0.5) * 0.5;
    float w = 0.95 - vUv.y * 0.6;                    // wide base, taper to a point
    float inside = step(abs(fx - center), w * 0.5) * step(vUv.y, h);
    if (inside < 0.5) discard;
    float up = clamp(vUv.y / h, 0.0, 1.0);
    float shade = mix(0.32, 1.0, up) * (0.7 + hash(bi + 3.0) * 0.3);
    vec3 col = mix(uBase, uTip, up) * shade;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function GrassField() {
  const matRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWind: { value: 0 },
      uBase: { value: new THREE.Color('#4a360f') },
      uTip: { value: new THREE.Color('#e8bb55') },
    }),
    []
  );

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    matRef.current.uniforms.uWind.value = wind.dirX * wind.strength;
  });

  // wide plane sitting close to the camera, covering the lower band of the view
  return (
    <mesh position={[0, -3.6, 8]} renderOrder={2}>
      <planeGeometry args={[60, 5.5, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
