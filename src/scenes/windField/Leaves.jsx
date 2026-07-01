import { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { wind, activeGusts } from '../../three/wind';
import { PALETTE } from './palette';

// Wind-borne maple leaves as camera-facing instanced billboards. Motion is
// analytic (drift along the wind + curl wander), recycled around the moving
// camera, with a genuine cursor force field (repel + swirl + lift) and gust
// rings. Reliable (no FBO) yet believably interactive.
const vertexShader = /* glsl */ `
  attribute vec3 iHome;
  attribute float iSeed;
  attribute float iScale;
  attribute vec3 iColor;

  uniform float uTime;
  uniform vec2 uWindDir;
  uniform float uWindStr;
  uniform vec3 uCam;
  uniform vec3 uCursor;
  uniform float uCursorAct;
  uniform vec3 uGusts[4];   // x, z, age
  uniform float uFogNear;
  uniform float uFogFar;

  varying vec2 vUv;
  varying vec3 vColor;
  varying float vFog;
  varying float vSpin;

  mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

  void main(){
    vUv = uv;
    vColor = iColor;
    float t = uTime;

    // drift along the wind + slow curl wander + bob
    vec3 c = iHome;
    float sp = 1.1 + iScale * 1.5;
    c.x += uWindDir.x * t * sp + sin(t * 0.6 + iSeed * 6.28) * 1.6;
    c.z += uWindDir.y * t * sp + cos(t * 0.5 + iSeed * 6.28) * 1.6;
    c.y += sin(t * 0.8 + iSeed * 10.0) * 0.8;

    // recycle around the moving camera so leaves always surround it
    c.x = mod(c.x - uCam.x + 55.0, 110.0) - 55.0 + uCam.x;
    c.z = mod(c.z - uCam.z + 55.0, 110.0) - 55.0 + uCam.z;
    c.y = mod(c.y, 13.0) + 0.4;

    // cursor force field: repel + swirl + lift
    vec2 toC = c.xz - uCursor.xz;
    float cd = length(toC);
    float infl = smoothstep(4.5, 0.0, cd) * uCursorAct;
    vec2 dir = normalize(toC + 0.0001);
    vec2 tang = vec2(-dir.y, dir.x);
    c.xz += dir * infl * 3.2 + tang * infl * 2.4;
    c.y += infl * 1.6;

    // gust rings push leaves outward
    for (int i = 0; i < 4; i++){
      vec3 g = uGusts[i];
      if (g.z < 0.0) continue;
      vec2 d = c.xz - g.xy;
      float dl = length(d);
      float radius = g.z * 8.0;
      float ring = smoothstep(2.4, 0.0, abs(dl - radius));
      float fade = smoothstep(3.0, 0.0, g.z);
      c.xz += normalize(d + 0.0001) * ring * fade * 4.0;
    }

    // spin faster when disturbed
    vSpin = 0.5 + infl * 4.0 + uWindStr * 0.3;
    float ang = t * (0.6 + iSeed) * (1.0 + infl * 3.0) + iSeed * 6.28;

    // camera-facing billboard with in-plane flutter
    vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
    vec3 up    = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
    vec2 corner = rot(ang) * position.xy;
    // foreshorten one axis for a fluttering leaf feel
    corner.x *= 0.6 + 0.4 * sin(t * 3.0 + iSeed * 6.28);
    vec3 world = c + (right * corner.x + up * corner.y) * iScale;

    vec4 mv = viewMatrix * vec4(world, 1.0);
    vFog = smoothstep(uFogNear, uFogFar, length(mv.xyz));
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTex;
  uniform vec3 uFog;
  varying vec2 vUv;
  varying vec3 vColor;
  varying float vFog;
  void main(){
    vec4 tex = texture2D(uTex, vUv);
    if (tex.a < 0.35) discard;
    vec3 col = mix(vColor * (0.6 + tex.r * 0.6), uFog, vFog);
    float a = (1.0 - vFog * 0.6);
    gl_FragColor = vec4(col, a);
  }
`;

export default function Leaves({ count = 1400 }) {
  const matRef = useRef();
  const tex = useLoader(THREE.TextureLoader, '/scenery/leaf.svg');
  tex.colorSpace = THREE.SRGBColorSpace;

  const geo = useMemo(() => {
    const base = new THREE.PlaneGeometry(1, 1);
    const g = new THREE.InstancedBufferGeometry();
    g.index = base.index;
    g.attributes.position = base.attributes.position;
    g.attributes.uv = base.attributes.uv;

    const home = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const scale = new Float32Array(count);
    const color = new Float32Array(count * 3);
    const col = new THREE.Color();
    const autumn = ['#c0392b', '#d2622c', '#e0902e', '#a8402f', '#bf7a30'];
    const sakura = ['#f3c6d6', '#f6d7e2', '#eab3c6'];
    for (let i = 0; i < count; i++) {
      home[i * 3] = (Math.random() * 2 - 1) * 55;
      home[i * 3 + 1] = Math.random() * 13;
      home[i * 3 + 2] = (Math.random() * 2 - 1) * 55;
      seed[i] = Math.random();
      // ~22% drifting sakura petals — smaller — among the maple leaves
      const isPetal = Math.random() < 0.22;
      scale[i] = isPetal ? 0.16 + Math.random() * 0.18 : 0.28 + Math.random() * 0.4;
      const pal = isPetal ? sakura : autumn;
      col.set(pal[(Math.random() * pal.length) | 0]);
      color[i * 3] = col.r; color[i * 3 + 1] = col.g; color[i * 3 + 2] = col.b;
    }
    g.setAttribute('iHome', new THREE.InstancedBufferAttribute(home, 3));
    g.setAttribute('iSeed', new THREE.InstancedBufferAttribute(seed, 1));
    g.setAttribute('iScale', new THREE.InstancedBufferAttribute(scale, 1));
    g.setAttribute('iColor', new THREE.InstancedBufferAttribute(color, 3));
    g.instanceCount = count;
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWindDir: { value: new THREE.Vector2(1, 0) },
      uWindStr: { value: 0.6 },
      uCam: { value: new THREE.Vector3() },
      uCursor: { value: new THREE.Vector3() },
      uCursorAct: { value: 0 },
      uGusts: { value: [0, 1, 2, 3].map(() => new THREE.Vector3(0, 0, -1)) },
      uFogNear: { value: 24 },
      uFogFar: { value: 120 },
      uTex: { value: tex },
      uFog: { value: PALETTE.fog },
    }),
    [tex]
  );

  useFrame((state) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value = wind.time;
    u.uWindDir.value.set(wind.dirX, wind.dirY);
    u.uWindStr.value = wind.strength;
    u.uCam.value.copy(state.camera.position);
    u.uCursor.value.set(wind.cursorX, 0, wind.cursorZ);
    u.uCursorAct.value = wind.cursorActive;
    const g = activeGusts();
    for (let i = 0; i < 4; i++) u.uGusts.value[i].set(g[i][0], g[i][1], g[i][2]);
  });

  return (
    <mesh geometry={geo} frustumCulled={false} renderOrder={2}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
