import { useMemo } from 'react';
import * as THREE from 'three';
import { PALETTE } from './palette';

// Distant backdrop: a 360° band of layered noise ridgelines (an inward cylinder)
// plus a distinct snow-capped Fuji hero peak toward the horizon. Fully
// procedural — no photo. Sits far out, fading into haze for atmospheric depth.

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
    float horizon = 0.46;
    vec3 col = vec3(0.0);
    float alpha = 0.0;

    // five ridge layers, far (hazy/low, blue-cool) → near (taller/darker, warm)
    for (int k = 0; k < 5; k++){
      float fk = float(k);
      float freq = 11.0 + fk * 13.0;
      float amp  = 0.17 - fk * 0.022;
      float off  = fk * 7.3;
      float ridge = horizon + (fbm(ang * freq + off) - 0.5) * 2.0 * amp - fk * 0.018;
      if (y < ridge) {
        float depth = clamp((ridge - y) / max(amp, 0.001), 0.0, 1.0);
        vec3 layerCol = mix(uFar, uNear, fk * 0.25);
        // sun-side rim brightening on the nearest couple of ridges
        float rim = smoothstep(0.78, 1.0, ang) * smoothstep(0.0, 0.12, ridge - y) * (fk * 0.2);
        layerCol += uSun * rim * 0.25;
        // haze toward the silhouette edge + atmospheric wash by distance
        layerCol = mix(uHaze, layerCol, smoothstep(0.0, 0.5, depth));
        col = layerCol;
        alpha = 1.0;
      }
    }
    if (alpha < 0.5) discard;
    col = mix(uHaze, col, smoothstep(0.16, 0.42, y));
    gl_FragColor = vec4(col, 1.0);
  }
`;

function RidgeBand() {
  const uniforms = useMemo(
    () => ({
      uHaze: { value: PALETTE.haze },
      uFar: { value: new THREE.Color('#5d6486') },
      uNear: { value: new THREE.Color('#39354f') },
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

// ---- Fuji hero peak (far billboard plane) ----------------------------------
const fujiVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fujiFrag = /* glsl */ `
  uniform vec3 uRock;
  uniform vec3 uSnow;
  uniform vec3 uHaze;
  uniform vec3 uSun;
  varying vec2 vUv;

  float hash(float n){ return fract(sin(n) * 43758.5453123); }
  float vnoise(float x){
    float i = floor(x); float f = fract(x);
    float u = f*f*(3.0-2.0*f);
    return mix(hash(i), hash(i+1.0), u);
  }

  void main() {
    float x = vUv.x;
    float y = vUv.y;
    float d = abs(x - 0.5);

    // gently concave Fuji silhouette: wide flaring base, soft plateau summit
    float halfW = 0.46;
    float slope = 1.0 - pow(clamp(d / halfW, 0.0, 1.0), 1.45);
    float ridge = 0.12 + slope * 0.82;
    // faint foothill ripple on the lower slopes only
    ridge += (vnoise(x * 26.0) - 0.5) * 0.04 * smoothstep(0.55, 0.0, y);
    if (y > ridge) discard;

    // base rock → toward summit
    vec3 col = uRock;
    // snow cap with a ragged lower edge (noise), only near the top
    float snowLine = 0.62 + (vnoise(x * 34.0) - 0.5) * 0.06;
    float snow = smoothstep(snowLine, snowLine + 0.05, y);
    // snow streaks down the gullies a touch
    snow = max(snow, smoothstep(0.5, 0.92, y) * step(0.5, vnoise(x * 60.0)) * 0.5);
    col = mix(col, uSnow, clamp(snow, 0.0, 1.0));

    // sun-side rim light along the silhouette edge
    float edge = smoothstep(0.05, 0.0, ridge - y);
    float sunside = smoothstep(0.5, 0.0, x);   // sun is to the -x side
    col += uSun * edge * sunside * 0.35;

    // atmospheric haze: stronger at the base, dissolves the foot into the field
    col = mix(uHaze, col, smoothstep(0.04, 0.4, y));
    float alpha = smoothstep(0.0, 0.06, ridge - y);  // soft silhouette edge
    gl_FragColor = vec4(col, alpha);
  }
`;

function FujiPeak() {
  const uniforms = useMemo(
    () => ({
      uRock: { value: PALETTE.fujiRock },
      uSnow: { value: PALETTE.fujiSnow },
      uHaze: { value: PALETTE.haze },
      uSun: { value: PALETTE.sun },
    }),
    []
  );
  return (
    <mesh position={[-22, 24, -188]} renderOrder={-9} frustumCulled={false}>
      <planeGeometry args={[150, 72]} />
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
