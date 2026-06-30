import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { wind } from '../../three/wind';
import { PALETTE } from './palette';

// Instanced GPU grass — one procedural blade geometry drawn N times, each blade
// bent by the shared wind (gusty sine + lean toward the wind vector) and parted
// by the world-space cursor. Tip→base gradient, base AO, distance fog.
const SEG = 5;

function bladeGeometry() {
  const pos = [];
  const uv = [];
  const idx = [];
  for (let i = 0; i <= SEG; i++) {
    const v = i / SEG;
    pos.push(-0.5, v, 0); uv.push(0, v);
    pos.push(0.5, v, 0); uv.push(1, v);
  }
  for (let i = 0; i < SEG; i++) {
    const a = i * 2, b = i * 2 + 1, c = i * 2 + 2, d = i * 2 + 3;
    idx.push(a, b, c, c, b, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

const vertexShader = /* glsl */ `
  attribute vec3 iOffset;
  attribute float iRot;
  attribute float iScale;
  attribute float iTint;
  attribute float iPhase;

  uniform float uTime;
  uniform vec2 uWindDir;
  uniform float uWindStr;
  uniform vec3 uCursor;
  uniform float uCursorAct;
  uniform float uWidth;
  uniform float uFogNear;
  uniform float uFogFar;

  varying float vY;
  varying float vTint;
  varying float vFog;

  mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

  void main(){
    vY = uv.y;
    vTint = iTint;
    float h = iScale;
    float w = uWidth * (1.0 - uv.y * 0.72);
    vec3 p = vec3((uv.x - 0.5) * w, uv.y * h, 0.0);

    // facing
    vec2 xz = rot(iRot) * p.xz;
    vec3 world = iOffset + vec3(xz.x, p.y, xz.y);

    // wind bend toward the wind vector, stronger toward the tip + gusty sway
    float sway = sin(uTime * 1.6 + iPhase + iOffset.x * 0.25 + iOffset.z * 0.2);
    float bend = (uWindStr * 0.5 + 0.22) * (0.6 + 0.4 * sway) * uv.y * uv.y;
    vec2 wd = normalize(uWindDir + 0.0001);
    world.xz += wd * bend * h;

    // cursor parts the grass: push tip away + press down within a radius
    vec2 toC = world.xz - uCursor.xz;
    float cd = length(toC);
    float infl = smoothstep(3.4, 0.0, cd) * uCursorAct;
    world.xz += normalize(toC + 0.0001) * infl * 1.3 * uv.y;
    world.y -= infl * 0.55 * uv.y;

    vec4 mv = viewMatrix * vec4(world, 1.0);
    vFog = smoothstep(uFogNear, uFogFar, length(mv.xyz));
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uTip;
  uniform vec3 uDry;
  uniform vec3 uFog;
  varying float vY;
  varying float vTint;
  varying float vFog;
  void main(){
    vec3 tip = mix(uTip, uDry, vTint);
    vec3 g = mix(uBase, tip, vY);
    g *= 0.5 + 0.5 * vY;              // base ambient occlusion
    vec3 col = mix(g, uFog, vFog);
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function Grass({ count = 60000, radius = 72 }) {
  const matRef = useRef();

  const geo = useMemo(() => {
    const base = bladeGeometry();
    const g = new THREE.InstancedBufferGeometry();
    g.index = base.index;
    g.attributes.position = base.attributes.position;
    g.attributes.uv = base.attributes.uv;

    const off = new Float32Array(count * 3);
    const rot = new Float32Array(count);
    const scl = new Float32Array(count);
    const tnt = new Float32Array(count);
    const phs = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // scatter on a disc, denser toward the centre (the camera path)
      const a = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.7) * radius;
      off[i * 3] = Math.cos(a) * r;
      off[i * 3 + 1] = 0;
      off[i * 3 + 2] = Math.sin(a) * r;
      rot[i] = Math.random() * Math.PI;
      scl[i] = 0.7 + Math.random() * 1.1;
      tnt[i] = Math.random();
      phs[i] = Math.random() * Math.PI * 2;
    }
    g.setAttribute('iOffset', new THREE.InstancedBufferAttribute(off, 3));
    g.setAttribute('iRot', new THREE.InstancedBufferAttribute(rot, 1));
    g.setAttribute('iScale', new THREE.InstancedBufferAttribute(scl, 1));
    g.setAttribute('iTint', new THREE.InstancedBufferAttribute(tnt, 1));
    g.setAttribute('iPhase', new THREE.InstancedBufferAttribute(phs, 1));
    g.instanceCount = count;
    return g;
  }, [count, radius]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWindDir: { value: new THREE.Vector2(1, 0) },
      uWindStr: { value: 0.6 },
      uCursor: { value: new THREE.Vector3() },
      uCursorAct: { value: 0 },
      uWidth: { value: 0.09 },
      uFogNear: { value: 24 },
      uFogFar: { value: 120 },
      uBase: { value: PALETTE.grassBase },
      uTip: { value: PALETTE.grassTip },
      uDry: { value: PALETTE.grassDry },
      uFog: { value: PALETTE.fog },
    }),
    []
  );

  useFrame(() => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    u.uTime.value = wind.time;
    u.uWindDir.value.set(wind.dirX, wind.dirY);
    u.uWindStr.value = wind.strength;
    u.uCursor.value.set(wind.cursorX, 0, wind.cursorZ);
    u.uCursorAct.value = wind.cursorActive;
  });

  return (
    <mesh geometry={geo} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
