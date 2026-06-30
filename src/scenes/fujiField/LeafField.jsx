import { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { CLUSTERS } from '../../data/portfolio';
import { useStore } from '../../store';
import { wind, activeGusts } from '../../three/wind';

// Maple leaves borne on the wind — the "nodes". Each is tagged to a cluster;
// they stream along the wind vector with a fluttering rotation, react to the
// pointer and gusts, and when a topic is selected its leaves spiral into a
// focal vortex and brighten (attention) while the rest fade.
const PER_CLUSTER = 11;
const COUNT = CLUSTERS.length * PER_CLUSTER; // 44
const BOX = { x: 24, y: 12, z: 5 };

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uWindStr;
  uniform float uGather;
  uniform float uSelected;
  uniform vec2 uWindDir;
  uniform vec2 uPointer;
  uniform vec4 uGusts[4];
  attribute float aCluster;
  attribute float aScale;
  attribute float aSeed;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vGlow;
  varying float vRot;

  void main() {
    vec3 p = position;
    float bandX = ${(BOX.x * 2).toFixed(1)};
    float bandY = ${(BOX.y * 2).toFixed(1)};

    // stream along the wind (mostly +x), recycle across the band
    float drift = uTime * (0.8 + aScale * 0.7) * (1.0 + uWindStr * 0.6);
    p.x = position.x + uWindDir.x * drift + sin(uTime * 1.6 + aSeed * 6.2831) * 0.6;
    p.x = mod(p.x + ${BOX.x.toFixed(1)}, bandX) - ${BOX.x.toFixed(1)};
    // gentle settle + flutter
    p.y = position.y - mod(uTime * (0.25 + aScale * 0.15) - uWindDir.y * drift, bandY);
    p.y = mod(p.y + ${BOX.y.toFixed(1)}, bandY) - ${BOX.y.toFixed(1)};
    p.y += cos(uTime * 1.9 + aSeed * 6.2831) * 0.4;
    p.z += sin(uTime * 0.7 + aSeed * 6.2831) * 0.5;

    // pointer parts the leaves
    vec2 toP = p.xy - uPointer;
    float pd = length(toP);
    p.xy += (pd > 0.001 ? toP / pd : vec2(0.0)) * smoothstep(5.0, 0.0, pd) * 2.2;

    // gust rings
    for (int i = 0; i < 4; i++) {
      vec4 g = uGusts[i];
      if (g.w < 0.0) continue;
      float radius = g.w * 7.0;
      vec3 d = p - g.xyz;
      float dl = length(d);
      float ring = smoothstep(2.2, 0.0, abs(dl - radius));
      float fade = smoothstep(3.0, 0.0, g.w);
      p += (dl > 0.001 ? d / dl : vec3(0.0)) * ring * fade * 4.0;
    }

    // selection: spiral the chosen cluster onto a focal shell
    float sel = step(0.0, uSelected) * (1.0 - step(0.5, abs(aCluster - uSelected)));
    vec3 focal = vec3(0.0, 1.0, 3.5);
    float ang = uTime * 0.6 + aSeed * 6.2831;
    vec3 shell = focal + vec3(cos(ang), sin(ang), 0.0) * 3.0 + vec3(0.0, 0.0, sin(ang) * 1.5);
    p = mix(p, shell, sel * uGather * 0.8);

    float anySel = step(0.0, uSelected);
    vGlow = mix(0.9, mix(0.28, 1.0, sel), anySel);
    vColor = mix(aColor, vec3(1.0, 0.9, 0.7), sel * 0.25);
    vRot = uTime * (0.6 + aSeed * 1.2) + aSeed * 6.2831; // fluttering spin

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float size = aScale * uSize * (1.0 + sel * 0.5 * uGather);
    size *= mix(1.0, mix(0.7, 1.2, sel), anySel);
    gl_PointSize = size * (150.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  uniform sampler2D uTex;
  varying vec3 vColor;
  varying float vGlow;
  varying float vRot;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float c = cos(vRot), s = sin(vRot);
    uv = mat2(c, -s, s, c) * uv;
    vec2 tuv = uv + 0.5;
    if (tuv.x < 0.0 || tuv.x > 1.0 || tuv.y < 0.0 || tuv.y > 1.0) discard;
    vec4 tex = texture2D(uTex, tuv);
    float a = tex.a * (0.7 + vGlow * 0.3);
    if (a < 0.04) discard;
    vec3 col = tex.rgb * vColor * (0.7 + vGlow * 0.5);
    gl_FragColor = vec4(col, a);
  }
`;

export default function LeafField() {
  const matRef = useRef();
  const gather = useRef(0);
  const tex = useLoader(THREE.TextureLoader, '/scenery/leaf.svg');
  tex.colorSpace = THREE.SRGBColorSpace;

  const geo = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const cluster = new Float32Array(COUNT);
    const scale = new Float32Array(COUNT);
    const seed = new Float32Array(COUNT);
    const col = new THREE.Color();
    // autumn palette per leaf, biased by cluster accent
    const autumn = ['#c0392b', '#d9622b', '#e08a2e', '#b03a3a'];
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * BOX.x;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * BOX.y;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * BOX.z;
      const ci = i % CLUSTERS.length;
      col.set(Math.random() > 0.5 ? autumn[ci] : CLUSTERS[ci].accent);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
      cluster[i] = ci;
      scale[i] = 0.7 + Math.random() * 0.9;
      seed[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    g.setAttribute('aCluster', new THREE.BufferAttribute(cluster, 1));
    g.setAttribute('aScale', new THREE.BufferAttribute(scale, 1));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 4.6 },
      uWindStr: { value: 0.6 },
      uGather: { value: 0 },
      uSelected: { value: -1 },
      uWindDir: { value: new THREE.Vector2(1, 0) },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uGusts: { value: [0, 1, 2, 3].map(() => new THREE.Vector4(0, 0, 0, -1)) },
      uTex: { value: tex },
    }),
    [tex]
  );

  useFrame((state, dt) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    const { selectedIndex } = useStore.getState();
    u.uTime.value = state.clock.elapsedTime;
    u.uWindStr.value = wind.strength;
    u.uWindDir.value.set(wind.dirX, wind.dirY);
    u.uPointer.value.set(wind.pointerX, wind.pointerY);
    u.uSelected.value = selectedIndex;
    const target = selectedIndex >= 0 ? 1 : 0;
    gather.current = THREE.MathUtils.damp(gather.current, target, 3, dt);
    u.uGather.value = gather.current;
    const g = activeGusts();
    for (let i = 0; i < 4; i++) u.uGusts.value[i].set(g[i][0], g[i][1], g[i][2], g[i][3]);
  });

  return (
    <points geometry={geo} frustumCulled={false} renderOrder={2}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
