import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { wind } from '../../three/wind';
import { PALETTE } from './palette';

// Instanced GPU grass — one procedural blade geometry drawn N times. Each blade
// arcs forward (quadratic curve), bends with the shared wind, is parted by the
// world-space cursor, and is lit by the sun with a backlit tip glint (susuki at
// dusk). Blades grow in clumps; colour varies green↔dry-gold. Tapered, feathered
// tips; distance fog.
const SEG = 6;

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
  attribute float iGreen;
  attribute float iPhase;
  attribute float iLean;

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
  varying float vGreen;
  varying float vFog;
  varying vec3 vNormal;

  mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

  void main(){
    vY = uv.y;
    vTint = iTint;
    vGreen = iGreen;
    float t = uv.y;
    float h = iScale;
    // tapered, feathered blade — widest at base, point at the tip
    float w = uWidth * (1.0 - t * t * 0.92);

    // local blade in its own facing frame
    vec3 local = vec3((uv.x - 0.5) * w, t * h, 0.0);
    vec2 xz = rot(iRot) * local.xz;
    vec3 world = iOffset + vec3(xz.x, local.y, xz.y);

    // forward arc + gusty wind lean, quadratic in height (stiff base, loose tip)
    float sway = sin(uTime * 1.6 + iPhase + iOffset.x * 0.25 + iOffset.z * 0.2);
    float bend = (iLean * 0.5) + (uWindStr * 0.5 + 0.18) * (0.6 + 0.4 * sway);
    vec2 wd = normalize(uWindDir + 0.0001);
    float arc = bend * h * t * t;
    world.xz += wd * arc;

    // analytic normal from the curved blade surface (height tangent × width tangent)
    vec3 Th = normalize(vec3(wd.x * bend * h * 2.0 * t, h, wd.y * bend * h * 2.0 * t));
    vec3 Tw = vec3(cos(iRot), 0.0, sin(iRot));
    vNormal = normalize(cross(Th, Tw));

    // cursor parts the grass: push the tip away + press down within a radius
    vec2 toC = world.xz - uCursor.xz;
    float cd = length(toC);
    float infl = smoothstep(3.4, 0.0, cd) * uCursorAct;
    world.xz += normalize(toC + 0.0001) * infl * 1.3 * t;
    world.y -= infl * 0.55 * t;

    vec4 mv = viewMatrix * vec4(world, 1.0);
    vFog = smoothstep(uFogNear, uFogFar, length(mv.xyz));
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uTip;
  uniform vec3 uDry;
  uniform vec3 uGreen;
  uniform vec3 uFog;
  uniform vec3 uSunDir;
  uniform vec3 uSunCol;
  varying float vY;
  varying float vTint;
  varying float vGreen;
  varying float vFog;
  varying vec3 vNormal;

  void main(){
    vec3 nrm = normalize(vNormal);
    if (!gl_FrontFacing) nrm = -nrm;

    // tip colour: gold↔dry per blade, shifted toward green for some blades
    vec3 tip = mix(uTip, uDry, vTint);
    tip = mix(tip, uGreen, vGreen);
    vec3 base = mix(uBase, uGreen * 0.6, vGreen);
    vec3 g = mix(base, tip, vY);
    g *= 0.5 + 0.5 * vY;                       // base ambient occlusion

    // sun lighting + sky ambient
    float diff = clamp(dot(nrm, uSunDir), 0.0, 1.0);
    float ambient = 0.4 + 0.22 * vY;
    vec3 lit = g * (ambient + diff * 0.7 * uSunCol);

    // backlit translucency — tips glow when the sun is behind the blade (susuki)
    float back = clamp(dot(-nrm, uSunDir), 0.0, 1.0);
    lit += tip * uSunCol * back * vY * vY * 0.7;

    vec3 col = mix(lit, uFog, vFog);
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
    const grn = new Float32Array(count);
    const phs = new Float32Array(count);
    const len = new Float32Array(count);

    // grow in clumps: a set of tuft centres, blades jittered around each
    const clumpCount = Math.max(1, Math.floor(count / 7));
    const cx = new Float32Array(clumpCount);
    const cz = new Float32Array(clumpCount);
    for (let c = 0; c < clumpCount; c++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.7) * radius;  // denser toward centre
      cx[c] = Math.cos(a) * r;
      cz[c] = Math.sin(a) * r;
    }

    for (let i = 0; i < count; i++) {
      const c = i % clumpCount;
      const jr = Math.pow(Math.random(), 0.5) * 0.7;     // tuft spread
      const ja = Math.random() * Math.PI * 2;
      const x = cx[c] + Math.cos(ja) * jr;
      const z = cz[c] + Math.sin(ja) * jr;
      off[i * 3] = x;
      off[i * 3 + 1] = 0;
      off[i * 3 + 2] = z;
      const distN = Math.min(1, Math.hypot(x, z) / radius);
      rot[i] = Math.random() * Math.PI;
      // hero blades a touch taller near the camera path (centre), tuft centre tall
      scl[i] = (0.7 + Math.random() * 1.0) * (1.0 + (1.0 - distN) * 0.35) * (1.0 - jr * 0.3);
      tnt[i] = Math.random();
      grn[i] = Math.random() < 0.28 ? 0.5 + Math.random() * 0.5 : 0.0;
      phs[i] = Math.random() * Math.PI * 2;
      len[i] = 0.1 + Math.random() * 0.5;                // resting lean
    }
    g.setAttribute('iOffset', new THREE.InstancedBufferAttribute(off, 3));
    g.setAttribute('iRot', new THREE.InstancedBufferAttribute(rot, 1));
    g.setAttribute('iScale', new THREE.InstancedBufferAttribute(scl, 1));
    g.setAttribute('iTint', new THREE.InstancedBufferAttribute(tnt, 1));
    g.setAttribute('iGreen', new THREE.InstancedBufferAttribute(grn, 1));
    g.setAttribute('iPhase', new THREE.InstancedBufferAttribute(phs, 1));
    g.setAttribute('iLean', new THREE.InstancedBufferAttribute(len, 1));
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
      uWidth: { value: 0.1 },
      uFogNear: { value: 24 },
      uFogFar: { value: 120 },
      uBase: { value: PALETTE.grassBase },
      uTip: { value: PALETTE.grassTip },
      uDry: { value: PALETTE.grassDry },
      uGreen: { value: PALETTE.grassGreen },
      uFog: { value: PALETTE.fog },
      uSunDir: { value: PALETTE.sunDir },
      uSunCol: { value: PALETTE.sun },
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
