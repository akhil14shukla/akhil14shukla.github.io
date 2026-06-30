import { useMemo } from 'react';
import * as THREE from 'three';
import { PALETTE } from './palette';

// Inward-facing sky dome: dusk gradient (warm horizon → indigo zenith) with a
// soft sun glow. Unlit, huge radius so it reads as distant atmosphere.
const vertex = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uZenith;
  uniform vec3 uHorizon;
  uniform vec3 uSun;
  uniform vec3 uSunDir;
  varying vec3 vDir;
  void main() {
    vec3 dir = normalize(vDir);
    float h = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);
    // richer gradient: warm band hugging the horizon, indigo above
    float horizonBand = pow(1.0 - clamp(dir.y, 0.0, 1.0), 2.2);
    vec3 col = mix(uZenith, uHorizon, horizonBand);
    // sun glow
    float s = max(dot(dir, normalize(uSunDir)), 0.0);
    col += uSun * pow(s, 220.0) * 1.4;           // disc
    col += uSun * pow(s, 8.0) * 0.18;            // bloom halo
    // subtle lower darkening below the horizon
    col *= smoothstep(-0.25, 0.05, dir.y) * 0.5 + 0.5;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function Sky() {
  const uniforms = useMemo(
    () => ({
      uZenith: { value: PALETTE.zenith },
      uHorizon: { value: PALETTE.horizon },
      uSun: { value: PALETTE.sun },
      uSunDir: { value: PALETTE.sunDir },
    }),
    []
  );
  return (
    <mesh scale={[ -1, 1, 1 ]} renderOrder={-10} frustumCulled={false}>
      <sphereGeometry args={[320, 32, 16]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        side={THREE.BackSide}
        depthWrite={false}
        fog={false}
        toneMapped={false}
      />
    </mesh>
  );
}
