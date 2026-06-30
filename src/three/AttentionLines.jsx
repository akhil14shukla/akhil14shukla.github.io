import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CLUSTERS } from '../data/portfolio';
import { useStore } from '../store';

// Retrieval = attention. When a query fires, lines fan from the residual hub (origin)
// to sampled points of each cluster, with brightness ∝ relevance. A travelling head
// runs along each line to imply signal flow.
const ORIGIN = new THREE.Vector3(0, 0, 0);
const LINES_PER_CLUSTER = 7;

const vertex = /* glsl */ `
  attribute float aT;
  attribute float aAlpha;
  attribute vec3 aColor;
  varying float vT;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    vT = aT; vAlpha = aAlpha; vColor = aColor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const fragment = /* glsl */ `
  uniform float uTime;
  varying float vT;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float head = fract(uTime * 0.5);
    float pulse = smoothstep(0.14, 0.0, abs(vT - head));
    float a = vAlpha * (0.18 + pulse * 0.95);
    gl_FragColor = vec4(vColor * (0.6 + pulse), a);
  }
`;

export default function AttentionLines() {
  const matRef = useRef();
  const relevance = useStore((s) => s.relevance);

  const geo = useMemo(() => {
    const segs = [];
    const tmp = new THREE.Color();
    CLUSTERS.forEach((c) => {
      const rel = relevance[c.id] ?? 0;
      if (rel < 0.06) return;
      const ctr = new THREE.Vector3(...c.center);
      tmp.set(c.accent);
      for (let i = 0; i < LINES_PER_CLUSTER; i++) {
        const target = ctr
          .clone()
          .add(new THREE.Vector3(
            (Math.random() - 0.5) * c.spread * 1.6,
            (Math.random() - 0.5) * c.spread * 1.3,
            (Math.random() - 0.5) * c.spread * 1.6
          ));
        // subdivide into a few points so the travelling head interpolates smoothly
        const STEPS = 10;
        let prev = ORIGIN.clone();
        for (let s = 1; s <= STEPS; s++) {
          const t0 = (s - 1) / STEPS;
          const t1 = s / STEPS;
          const p1 = ORIGIN.clone().lerp(target, t1);
          segs.push({ a: prev.clone(), b: p1.clone(), t0, t1, alpha: rel, color: tmp.clone() });
          prev = p1;
        }
      }
    });
    const count = segs.length * 2;
    const position = new Float32Array(count * 3);
    const aT = new Float32Array(count);
    const aAlpha = new Float32Array(count);
    const aColor = new Float32Array(count * 3);
    segs.forEach((s, i) => {
      const j = i * 2;
      position.set([s.a.x, s.a.y, s.a.z], j * 3);
      position.set([s.b.x, s.b.y, s.b.z], (j + 1) * 3);
      aT[j] = s.t0; aT[j + 1] = s.t1;
      aAlpha[j] = s.alpha; aAlpha[j + 1] = s.alpha;
      aColor.set([s.color.r, s.color.g, s.color.b], j * 3);
      aColor.set([s.color.r, s.color.g, s.color.b], (j + 1) * 3);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(position, 3));
    g.setAttribute('aT', new THREE.BufferAttribute(aT, 1));
    g.setAttribute('aAlpha', new THREE.BufferAttribute(aAlpha, 1));
    g.setAttribute('aColor', new THREE.BufferAttribute(aColor, 3));
    return g;
  }, [relevance]);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);
  useFrame((state) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <lineSegments geometry={geo}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}
