import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as THREE from 'three';
import { PALETTE } from './palette';

// A lone figure walking the susuki field behind the text. Loads a rigged glTF
// (public/models/samurai.glb) and plays its walk clip, slowly tracing a closed
// loop across the mid-ground. Lit only for itself (the rest of the world is
// unlit shaders): a warm sun-side rim + cool dusk fill so it reads against the
// horizon, with a soft blob shadow. Drop in any rigged + walk-animated GLB at
// that path and it just works.
const MODEL_URL = '/models/samurai.glb';
const TARGET_HEIGHT = 1.9; // world units — normalises whatever model is supplied

// closed stroll in the LEFT lane (≈ x -13), parallel to and clear of the camera's
// central flight path, so the figure stays a backlit silhouette on the left —
// behind the left-aligned text — and the camera never draws close enough for it
// to loom (important while it's a placeholder).
const PATH = [
  [-10, 0, -10],
  [-8, 0, -16],
  [-11, 0, -22],
  [-16, 0, -21],
  [-18, 0, -14],
  [-15, 0, -10],
];

// soft blob shadow under the feet (radial alpha), stretched away from the sun
const shadowFrag = /* glsl */ `
  varying vec2 vUv;
  void main(){
    float r = length(vUv - 0.5) * 2.0;
    float a = smoothstep(1.0, 0.0, r);
    gl_FragColor = vec4(0.0, 0.0, 0.0, a * 0.42);
  }
`;
const shadowVert = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

export default function Samurai() {
  const root = useRef();
  const rig = useRef();
  const { scene, animations } = useGLTF(MODEL_URL);

  // SkeletonUtils.clone (not scene.clone) so skinned meshes rebind to the cloned
  // skeleton and actually animate; keeps the cached original untouched.
  const model = useMemo(() => {
    const c = skeletonClone(scene);
    c.traverse((o) => {
      if (o.isMesh) {
        o.frustumCulled = false;
        // clone materials so the distance fade below never touches the cache
        o.material = Array.isArray(o.material)
          ? o.material.map((m) => m.clone())
          : o.material.clone();
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => { m.transparent = true; });
      }
    });
    return c;
  }, [scene]);

  const { actions, names } = useAnimations(animations, rig);

  // normalise height regardless of which model is supplied
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const h = box.max.y - box.min.y || 1;
    return TARGET_HEIGHT / h;
  }, [model]);

  // play the most walk-like clip (fall back to idle / first non-TPose)
  useEffect(() => {
    if (!names.length) return;
    const pick =
      names.find((n) => /walk/i.test(n)) ||
      names.find((n) => /idle|stand/i.test(n)) ||
      names.find((n) => !/tpose|t-pose/i.test(n)) ||
      names[0];
    const action = actions[pick];
    if (action) {
      action.reset().setEffectiveTimeScale(0.85).fadeIn(0.4).play();
      action.setLoop(THREE.LoopRepeat, Infinity);
    }
    return () => action && action.fadeOut(0.2);
  }, [actions, names]);

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        PATH.map((p) => new THREE.Vector3(...p)),
        true,
        'catmullrom',
        0.5
      ),
    []
  );
  const u = useRef(0);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const tan = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, dt) => {
    if (!root.current) return;
    const len = curve.getLength();
    u.current = (u.current + (dt * 1.05) / len) % 1; // ~1.05 m/s stroll
    curve.getPointAt(u.current, pos);
    curve.getTangentAt(u.current, tan);
    root.current.position.set(pos.x, 0, pos.z);
    const yaw = Math.atan2(tan.x, tan.z);
    root.current.rotation.y = yaw;

    // fade out if the camera draws close, so the figure can never hard-loom
    const d = state.camera.position.distanceTo(root.current.position);
    const op = THREE.MathUtils.clamp((d - 7) / 8, 0, 1); // 0 at ≤7u, 1 at ≥15u
    model.traverse((o) => {
      if (o.isMesh) {
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        mats.forEach((m) => { m.opacity = op; });
      }
    });
    root.current.visible = op > 0.01;
  });

  // sun-side rim + opposite cool fill (only the PBR samurai reacts to these)
  const sun = PALETTE.sunDir;

  return (
    <>
      {/* world-fixed lighting for the figure (the rest of the world is unlit
          shaders and ignores these). Warm sun-side rim + cool dusk fill. */}
      <directionalLight
        position={[sun.x * 40, sun.y * 40 + 20, sun.z * 40]}
        intensity={3.4}
        color={PALETTE.sun}
      />
      <directionalLight position={[-sun.x * 30, 20, -sun.z * 30]} intensity={0.4} color={PALETTE.moon} />
      <hemisphereLight args={[PALETTE.horizon, PALETTE.ground, 0.4]} />

      <group ref={root}>
        <group ref={rig} scale={scale}>
          <primitive object={model} />
        </group>

        {/* soft blob shadow under the feet */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} scale={[2.2, 2.2, 1]}>
          <planeGeometry args={[1, 1]} />
          <shaderMaterial
            vertexShader={shadowVert}
            fragmentShader={shadowFrag}
            transparent
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload(MODEL_URL);
