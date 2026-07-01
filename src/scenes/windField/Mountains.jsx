import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { PALETTE } from './palette';

// Distant backdrop: a 360° band of layered noise ridgelines (an inward cylinder)
// plus a real snow-capped Mt. Fuji at dusk (CC0 photo) composited as a horizon
// matte — feathered on all sides into the atmosphere so it melts into the scene.

// ---- layered ridge band (cylinder) -----------------------------------------
const ridgeVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ridgeFrag = /* glsl */ `
  uniform vec3 uHaze;
  uniform vec3 uFar;
  uniform vec3 uNear;
  uniform vec3 uSun;
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
    float ang = vUv.x;
    float y = vUv.y;
    float horizon = 0.44;
    vec3 col = vec3(0.0);
    float alpha = 0.0;

    // five ridge layers, far (hazy/low, cool) → near (taller, warmer)
    for (int k = 0; k < 5; k++){
      float fk = float(k);
      float freq = 11.0 + fk * 13.0;
      float amp  = 0.15 - fk * 0.02;
      float off  = fk * 7.3;
      float ridge = horizon + (fbm(ang * freq + off) - 0.5) * 2.0 * amp - fk * 0.016;
      if (y < ridge) {
        float depth = clamp((ridge - y) / max(amp, 0.001), 0.0, 1.0);
        vec3 layerCol = mix(uFar, uNear, fk * 0.25);
        float rim = smoothstep(0.72, 1.0, ang) * smoothstep(0.0, 0.1, ridge - y) * (fk * 0.2);
        layerCol += uSun * rim * 0.2;
        // heavy aerial perspective — distant ridges wash into haze
        layerCol = mix(uHaze, layerCol, smoothstep(0.0, 0.62, depth) * (0.5 + fk * 0.12));
        col = layerCol;
        alpha = 1.0;
      }
    }
    if (alpha < 0.5) discard;
    col = mix(uHaze, col, smoothstep(0.14, 0.44, y));
    gl_FragColor = vec4(col, 1.0);
  }
`;

function RidgeBand() {
  const uniforms = useMemo(
    () => ({
      uHaze: { value: PALETTE.haze },
      uFar: { value: new THREE.Color('#6b6f8c') },
      uNear: { value: new THREE.Color('#40405c') },
      uSun: { value: PALETTE.sun },
    }),
    []
  );
  return (
    <mesh position={[0, 14, 0]} renderOrder={-9} frustumCulled={false}>
      <cylinderGeometry args={[200, 200, 120, 96, 1, true]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={ridgeVert}
        fragmentShader={ridgeFrag}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
        fog={false}
        toneMapped={false}
      />
    </mesh>
  );
}

// ---- Fuji hero peak (real CC0 dusk photo, feathered horizon matte) ----------
const fujiVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fujiFrag = /* glsl */ `
  uniform sampler2D uTex;
  uniform vec3 uHaze;
  uniform vec3 uZenith;
  uniform vec3 uHorizon;
  varying vec2 vUv;

  void main() {
    // flip x so the photo's warm sunset glow sits on our sun side (left); crop
    // the vertical band to sky + mountain + town (drop the lake foreground)
    vec2 t = vec2(1.0 - vUv.x, mix(0.34, 0.96, vUv.y));
    vec3 c = texture2D(uTex, t).rgb;

    // Replace the photo's own sky (ABOVE the snowy summit only, so the peak
    // stays crisp) with OUR sky tones, so the matte flows seamlessly into the
    // procedural sky (no tone clash / edge).
    vec3 skyTone = mix(uHorizon, uZenith, smoothstep(0.55, 1.0, vUv.y));
    float sky = smoothstep(0.70, 0.86, vUv.y);
    c = mix(c, skyTone, sky * 0.9);

    // aerial perspective: wash the base into haze, mild overall for distance
    float base = smoothstep(0.0, 0.5, vUv.y);
    c = mix(uHaze, c, 0.5 + 0.5 * base);
    c = mix(c, uHaze, 0.1);

    // feather every edge widely so the card has no visible border: top (above the
    // summit) → the procedural sky takes over; bottom → the grass field covers it
    float aTop  = smoothstep(1.0, 0.76, vUv.y);
    float aBot  = smoothstep(0.0, 0.18, vUv.y);
    float aSide = smoothstep(0.0, 0.22, vUv.x) * smoothstep(1.0, 0.78, vUv.x);
    float a = aTop * aBot * aSide;
    gl_FragColor = vec4(c, a);
  }
`;

function FujiPeak() {
  const tex = useLoader(THREE.TextureLoader, '/scenery/fuji.jpg');
  tex.colorSpace = THREE.SRGBColorSpace;
  const uniforms = useMemo(
    () => ({
      uTex: { value: tex },
      uHaze: { value: PALETTE.haze },
      uZenith: { value: PALETTE.zenith },
      uHorizon: { value: PALETTE.horizon },
    }),
    [tex]
  );
  return (
    <mesh position={[0, 30, -196]} renderOrder={-9} frustumCulled={false}>
      <planeGeometry args={[236, 122]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={fujiVert}
        fragmentShader={fujiFrag}
        transparent
        depthWrite={false}
        fog={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function Mountains() {
  return (
    <>
      <FujiPeak />
      <RidgeBand />
    </>
  );
}
