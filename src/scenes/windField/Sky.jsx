import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { wind } from '../../three/wind';
import { PALETTE } from './palette';

// Inward-facing sky dome: dusk gradient (warm horizon → indigo zenith) with a
// soft sun glow, a cool moon opposite the sun, a drifting backlit cloud band
// near the horizon, and faint stars emerging toward the zenith. Unlit, huge
// radius so it reads as distant atmosphere.
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
  uniform vec3 uMoon;
  uniform vec3 uMoonDir;
  uniform vec3 uStar;
  uniform vec3 uCloud;
  uniform float uTime;
  uniform vec2 uWind;
  varying vec3 vDir;

  float hash21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float hash31(vec3 p){ p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
  float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash21(i), b = hash21(i + vec2(1,0)), c = hash21(i + vec2(0,1)), d = hash21(i + vec2(1,1));
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }
  float fbm2(vec2 p){ float v = 0.0, a = 0.5; for(int i=0;i<5;i++){ v += a*vnoise2(p); p*=2.0; a*=0.5; } return v; }

  void main() {
    vec3 dir = normalize(vDir);
    float up = clamp(dir.y, 0.0, 1.0);

    // base gradient: warm band hugging the horizon, indigo above
    float horizonBand = pow(1.0 - up, 2.4);
    vec3 col = mix(uZenith, uHorizon, horizonBand);

    // azimuthal scattering: warm forward glow toward the sun, cool anti-sun wash
    float sa = max(dot(dir, normalize(uSunDir)), 0.0);
    col += uHorizon * pow(sa, 3.0) * 0.35 * (1.0 - up);
    float anti = pow(max(dot(dir, -normalize(uSunDir)), 0.0), 2.0) * 0.28 * (1.0 - up);
    col = mix(col, col * vec3(0.84, 0.9, 1.12), anti);

    // sun disc + bloom halo
    col += uSun * pow(sa, 320.0) * 1.6;
    col += uSun * pow(sa, 8.0) * 0.18;

    // moon disc + soft cool halo
    float ma = max(dot(dir, normalize(uMoonDir)), 0.0);
    col += uMoon * pow(ma, 1400.0) * 1.2;
    col += uMoon * pow(ma, 40.0) * 0.05;

    // stars: fade in toward the zenith, gentle twinkle
    float starMask = smoothstep(0.18, 0.62, dir.y);
    vec3 sq = floor(dir * 230.0);
    float sp = hash31(sq);
    float star = smoothstep(0.992, 1.0, sp);
    float tw = 0.6 + 0.4 * sin(uTime * 3.0 + sp * 100.0);
    col += uStar * star * starMask * tw * 0.9;

    // drifting cloud band just above the horizon, backlit by the sun
    float band = smoothstep(0.34, 0.02, abs(dir.y - 0.13));
    vec2 cuv = vec2(atan(dir.z, dir.x) * 1.6, dir.y * 3.0)
             + vec2(uTime * 0.012, 0.0) + uWind * uTime * 0.004;
    float clouds = fbm2(cuv * 2.0);
    clouds = smoothstep(0.52, 0.92, clouds) * band;
    vec3 cloudCol = mix(uCloud, uSun, pow(sa, 2.0) * 0.7);
    col = mix(col, cloudCol, clouds * 0.7);

    // darken below the horizon line
    col *= smoothstep(-0.28, 0.04, dir.y) * 0.55 + 0.45;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function Sky() {
  const matRef = useRef();
  const uniforms = useMemo(
    () => ({
      uZenith: { value: PALETTE.zenith },
      uHorizon: { value: PALETTE.horizon },
      uSun: { value: PALETTE.sun },
      uSunDir: { value: PALETTE.sunDir },
      uMoon: { value: PALETTE.moon },
      uMoonDir: { value: new THREE.Vector3(0.55, 0.5, 0.82).normalize() },
      uStar: { value: PALETTE.star },
      uCloud: { value: PALETTE.cloud },
      uTime: { value: 0 },
      uWind: { value: new THREE.Vector2(1, 0) },
    }),
    []
  );

  useFrame(() => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value = wind.time;
    u.uWind.value.set(wind.dirX, wind.dirY);
  });

  return (
    <mesh renderOrder={-10} frustumCulled={false}>
      <sphereGeometry args={[320, 48, 24]} />
      <shaderMaterial
        ref={matRef}
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
