import { useMemo } from 'react';
import * as THREE from 'three';
import { PALETTE } from './palette';

// Large ground plane the grass sits on. Unlit gradient (warm near → fog far) so
// the horizon reads; the grass carries the detail. Fog blends the far edge.
const vertex = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vWorld = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uNear;
  uniform vec3 uFar;
  uniform vec3 uFog;
  varying vec3 vWorld;
  void main() {
    float d = length(vWorld.xz);
    vec3 col = mix(uNear, uFar, smoothstep(8.0, 90.0, d));
    // subtle radial darkening + ground haze near horizon
    col = mix(col, uFog, smoothstep(60.0, 160.0, d));
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function Ground() {
  const uniforms = useMemo(
    () => ({
      uNear: { value: PALETTE.ground },
      uFar: { value: new THREE.Color('#34291b') },
      uFog: { value: PALETTE.fog },
    }),
    []
  );
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} renderOrder={-5}>
      <planeGeometry args={[400, 400, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        fog={false}
        toneMapped={false}
      />
    </mesh>
  );
}
