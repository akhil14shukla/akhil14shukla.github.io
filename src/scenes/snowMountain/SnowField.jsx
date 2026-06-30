import { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { CLUSTERS } from '../../data/portfolio';
import { useStore } from '../../store';
import { wind, activeGusts } from '../../three/wind';

// A handful of detailed hexagonal snow crystals — the neural "nodes". Each is
// tagged to a cluster; when a topic is selected its flakes brighten, swell and
// pool toward a focal shell (attention), while the rest dim and shrink. They
// drift + fall on the shared wind field and slowly rotate.
const PER_CLUSTER = 3;
const COUNT = CLUSTERS.length * PER_CLUSTER; // 12
const BOX = { x: 18, y: 11, z: 5 };

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

    // slow fall + recycle
    float boxH = ${(BOX.y * 2).toFixed(1)};
    float spd = 0.35 + aScale * 0.22;
    p.y = position.y - mod(uTime * spd + aSeed * boxH, boxH);
    p.y = mod(p.y + ${BOX.y.toFixed(1)}, boxH) - ${BOX.y.toFixed(1)};

    // wind drift + sway
    float sway = sin(uTime * 0.5 + aSeed * 6.2831);
    p.x += uWindDir.x * uWindStr * 2.0 + sway * 0.7;
    p.z += uWindDir.y * uWindStr * 1.2 + cos(uTime * 0.4 + aSeed * 6.2831) * 0.4;

    // pointer parts the snow
    vec2 toP = p.xy - uPointer;
    float pd = length(toP);
    p.xy += (pd > 0.001 ? toP / pd : vec2(0.0)) * smoothstep(5.0, 0.0, pd) * 2.0;

    // gust rings
    for (int i = 0; i < 4; i++) {
      vec4 g = uGusts[i];
      if (g.w < 0.0) continue;
      float radius = g.w * 6.5;
      vec3 d = p - g.xyz;
      float dl = length(d);
      float ring = smoothstep(2.0, 0.0, abs(dl - radius));
      float fade = smoothstep(3.0, 0.0, g.w);
      p += (dl > 0.001 ? d / dl : vec3(0.0)) * ring * fade * 3.5;
    }

    // selection: pool the chosen cluster onto a focal shell
    float sel = step(0.0, uSelected) * (1.0 - step(0.5, abs(aCluster - uSelected)));
    vec3 focal = vec3(0.0, 1.0, 3.5);
    vec3 shell = focal + normalize(p - focal + 0.0001) * 3.0;
    p = mix(p, shell, sel * uGather * 0.7);

    float anySel = step(0.0, uSelected);
    vGlow = mix(0.85, mix(0.3, 1.0, sel), anySel);
    vColor = mix(vec3(0.93, 0.95, 1.0), aColor, sel * 0.6);
    vRot = uTime * (0.12 + aSeed * 0.28) + aSeed * 6.2831;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float size = aScale * uSize * (1.0 + sel * 0.6 * uGather);
    size *= mix(1.0, mix(0.62, 1.25, sel), anySel); // shrink the unselected
    gl_PointSize = size * (160.0 / -mv.z);
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
    uv = mat2(c, -s, s, c) * uv; // rotate the crystal
    vec2 tuv = uv + 0.5;
    if (tuv.x < 0.0 || tuv.x > 1.0 || tuv.y < 0.0 || tuv.y > 1.0) discard;
    vec4 tex = texture2D(uTex, tuv);
    float a = tex.a * (0.55 + vGlow * 0.45);
    if (a < 0.02) discard;
    vec3 col = vColor * (0.6 + vGlow * 0.5);
    gl_FragColor = vec4(col, a);
  }
`;

export default function SnowField() {
  const matRef = useRef();
  const gather = useRef(0);
  const tex = useLoader(THREE.TextureLoader, '/scenery/snowflake.svg');
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;

  const geo = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const cluster = new Float32Array(COUNT);
    const scale = new Float32Array(COUNT);
    const seed = new Float32Array(COUNT);
    const col = new THREE.Color();
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * BOX.x;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * BOX.y;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * BOX.z;
      const ci = i % CLUSTERS.length;
      col.set(CLUSTERS[ci].accent);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
      cluster[i] = ci;
      scale[i] = 0.8 + Math.random() * 0.7;
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
      uSize: { value: 6.0 },
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
    <points geometry={geo} frustumCulled={false}>
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
