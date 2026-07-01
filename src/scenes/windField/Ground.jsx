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

  float hash21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float vnoise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash21(i), b = hash21(i + vec2(1,0)), c = hash21(i + vec2(0,1)), d = hash21(i + vec2(1,1));
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }
  float fbm(vec2 p){ float v = 0.0, a = 0.5; for(int i=0;i<5;i++){ v += a*vnoise(p); p*=2.03; a*=0.5; } return v; }

  void main() {
    float d = length(vWorld.xz);
    vec3 col = mix(uNear, uFar, smoothstep(8.0, 90.0, d));

    // soil mottling so the ground under the grass isn't a flat wash
    float n = fbm(vWorld.xz * 0.12);
    col *= 0.82 + n * 0.4;

    // a faint trodden path winding through the field toward the camera line
    float path = abs(vWorld.x - sin(vWorld.z * 0.05) * 3.0);
    float trod = smoothstep(2.6, 0.6, path) * smoothstep(40.0, -6.0, vWorld.z);
    col = mix(col, col * 1.18 + uNear * 0.06, trod * 0.5);

    // radial darkening + ground haze near the horizon
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
