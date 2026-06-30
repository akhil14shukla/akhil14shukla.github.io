import { useMemo } from 'react';
import * as THREE from 'three';
import { PALETTE } from './palette';

// Distant mountain ridges as an inward cylinder with a procedural silhouette —
// three layers of value-noise ridgelines fading into haze (no photo). Sits at
// the horizon; sky shows above the silhouette.
const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uHaze;
  uniform vec3 uFar;
  uniform vec3 uNear;
  varying vec2 vUv;

  float hash(float n){ return fract(sin(n) * 43758.5453123); }
  float vnoise(float x){
    float i = floor(x); float f = fract(x);
    float u = f*f*(3.0-2.0*f);
    return mix(hash(i), hash(i+1.0), u);
  }
  float fbm(float x){
    float v = 0.0, a = 0.5;
    for(int i=0;i<5;i++){ v += a*vnoise(x); x*=2.0; a*=0.5; }
    return v;
  }

  void main() {
    float ang = vUv.x;          // 0..1 around the cylinder
    float y = vUv.y;            // 0 bottom .. 1 top
    float horizon = 0.46;
    vec3 col = vec3(0.0);
    float alpha = 0.0;

    // three ridge layers, far (hazy/low contrast) to near (darker/taller)
    for (int k = 0; k < 3; k++){
      float fk = float(k);
      float freq = 14.0 + fk * 16.0;
      float amp  = 0.16 - fk * 0.035;
      float off  = fk * 7.3;
      float ridge = horizon + (fbm(ang * freq + off) - 0.5) * 2.0 * amp - fk * 0.02;
      if (y < ridge) {
        float depth = clamp((ridge - y) / amp, 0.0, 1.0);
        vec3 layerCol = mix(uFar, uNear, fk * 0.5);
        // haze toward the silhouette edge + lower atmospheric wash
        layerCol = mix(uHaze, layerCol, smoothstep(0.0, 0.5, depth));
        col = layerCol;
        alpha = 1.0;
      }
    }
    if (alpha < 0.5) discard;
    // fade the very base into fog
    col = mix(uHaze, col, smoothstep(0.18, 0.42, y));
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function Mountains() {
  const uniforms = useMemo(
    () => ({
      uHaze: { value: PALETTE.haze },
      uFar: { value: new THREE.Color('#6a6a86') },
      uNear: { value: new THREE.Color('#3b3a52') },
    }),
    []
  );
  return (
    <mesh position={[0, 14, 0]} renderOrder={-9} frustumCulled={false}>
      <cylinderGeometry args={[200, 200, 120, 96, 1, true]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
        fog={false}
        toneMapped={false}
      />
    </mesh>
  );
}
