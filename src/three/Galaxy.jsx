import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CLUSTERS } from '../data/portfolio';
import { useStore } from '../store';

const N = CLUSTERS.length;

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity[${N}];
  uniform float uSize;
  attribute float aCluster;
  attribute float aScale;
  attribute float aSeed;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vGlow;
  void main() {
    int ci = int(aCluster + 0.5);
    float inten = 0.0;
    for (int k = 0; k < ${N}; k++) { if (k == ci) inten = uIntensity[k]; }
    vColor = aColor;
    vGlow = 0.20 + inten * 1.25;
    vec3 p = position;
    float t = uTime * 0.22 + aSeed * 6.2831;
    // organic flow-field drift
    p.x += sin(t) * 0.16;
    p.y += cos(t * 0.9) * 0.16;
    p.z += sin(t * 0.7) * 0.16;
    // active cluster breathes outward from its own centroid handled on CPU spread
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float sz = aScale * uSize * (1.0 + inten * 1.6);
    gl_PointSize = sz * (320.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vGlow;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float halo = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.22, 0.0, d);
    vec3 col = vColor * (0.45 + vGlow * 0.7) + core * vGlow * 0.5;
    float alpha = halo * (0.22 + vGlow * 0.5);
    gl_FragColor = vec4(col, alpha);
  }
`;

export default function Galaxy() {
  const matRef = useRef();
  const intensities = useRef(new Array(N).fill(0));

  const geo = useMemo(() => {
    const total = CLUSTERS.reduce((a, c) => a + c.count, 0);
    const positions = new Float32Array(total * 3);
    const colors = new Float32Array(total * 3);
    const cluster = new Float32Array(total);
    const scale = new Float32Array(total);
    const seed = new Float32Array(total);
    const col = new THREE.Color();
    let o = 0;
    CLUSTERS.forEach((c, ci) => {
      const [cx, cy, cz] = c.center;
      const count = Math.floor(c.count * 0.72); // reduce density to avoid additive whiteout
      for (let i = 0; i < count; i++) {
        // gaussian-ish blob, but pushed off the core so points read as discrete
        const r = (0.25 + Math.pow(Math.random(), 0.5) * 0.95) * c.spread * 1.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[o * 3] = cx + r * Math.sin(phi) * Math.cos(theta);
        positions[o * 3 + 1] = cy + r * Math.sin(phi) * Math.sin(theta) * 0.8;
        positions[o * 3 + 2] = cz + r * Math.cos(phi);
        // slight color variation per cluster
        col.set(Math.random() > 0.5 ? c.color : c.accent);
        colors[o * 3] = col.r;
        colors[o * 3 + 1] = col.g;
        colors[o * 3 + 2] = col.b;
        cluster[o] = ci;
        scale[o] = 0.6 + Math.random() * 1.8;
        seed[o] = Math.random();
        o++;
      }
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    g.setAttribute('aCluster', new THREE.BufferAttribute(cluster, 1));
    g.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    g.setDrawRange(0, o); // only the points we actually filled
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 4.6 },
      uIntensity: { value: new Array(N).fill(0) },
    }),
    []
  );

  useFrame((state, dt) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    const { relevance } = useStore.getState();
    const arr = matRef.current.uniforms.uIntensity.value;
    for (let i = 0; i < N; i++) {
      const target = relevance[CLUSTERS[i].id] ?? 0;
      // smooth toward target
      intensities.current[i] += (target - intensities.current[i]) * Math.min(1, dt * 4);
      arr[i] = intensities.current[i];
    }
  });

  return (
    <points geometry={geo} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
