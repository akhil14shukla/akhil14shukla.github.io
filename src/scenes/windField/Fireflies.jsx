import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { wind } from '../../three/wind';
import { PALETTE } from './palette';

// Dusk fireflies / drifting spores — additive glowing points that wander on the
// wind low over the field. Animated entirely in the vertex shader (no CPU work);
// the existing Bloom turns them into soft golden glows. Count is tier-scaled.
const vertexShader = /* glsl */ `
  attribute vec3 iBase;
  attribute float iPhase;
  attribute float iSize;
  uniform float uTime;
  uniform vec2 uWind;
  uniform float uPixelRatio;
  varying float vTw;

  void main(){
    float ph = iPhase;
    vec3 p = iBase;
    // gentle local wander + a bounded push along the wind
    p.x += sin(uTime * 0.30 + ph) * 2.0 + uWind.x * sin(uTime * 0.10 + ph) * 3.0;
    p.z += cos(uTime * 0.25 + ph) * 2.0 + uWind.y * sin(uTime * 0.10 + ph) * 3.0;
    p.y += sin(uTime * 0.70 + ph * 1.3) * 0.6 + 0.35 * sin(uTime * 0.5 + ph);

    vTw = 0.45 + 0.55 * sin(uTime * 4.0 + ph * 10.0);
    vec4 mv = viewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = iSize * uPixelRatio * (60.0 / max(-mv.z, 1.0));
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vTw;
  void main(){
    vec2 d = gl_PointCoord - 0.5;
    float r = length(d);
    if (r > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, r);
    glow *= glow;
    gl_FragColor = vec4(uColor * glow * vTw * 1.6, glow * vTw);
  }
`;

export default function Fireflies({ count = 220 }) {
  const matRef = useRef();

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const base = new Float32Array(count * 3);
    const phase = new Float32Array(count);
    const size = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      base[i * 3] = (Math.random() - 0.5) * 80;
      base[i * 3 + 1] = 0.4 + Math.random() * 4.0;
      base[i * 3 + 2] = -40 + Math.random() * 60;
      phase[i] = Math.random() * Math.PI * 2;
      size[i] = 4 + Math.random() * 6;
    }
    g.setAttribute('position', new THREE.BufferAttribute(base, 3)); // unused but required
    g.setAttribute('iBase', new THREE.BufferAttribute(base, 3));
    g.setAttribute('iPhase', new THREE.BufferAttribute(phase, 1));
    g.setAttribute('iSize', new THREE.BufferAttribute(size, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWind: { value: new THREE.Vector2(1, 0) },
      uColor: { value: PALETTE.firefly },
      uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
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
    <points geometry={geo} frustumCulled={false} renderOrder={5}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}
