import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useStore } from '../store';
import { getScene } from '../config/scenes';
import { PALETTE } from '../scenes/windField/palette';
import { wind, updateWind, setCursorWorld, setNdc, spawnGust } from './wind';
import CameraJourney from './CameraJourney';

// Advance the shared wind/world state once per frame, before any layer reads it.
function WindUpdater() {
  useFrame((s) => updateWind(s.clock.elapsedTime));
  return null;
}

// Raycast the pointer onto the ground (y=0) → world-space cursor that the grass
// and leaves react to. Click spawns a gust at the cursor.
function PointerCursor() {
  const { camera, gl } = useThree();
  const ray = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const hit = useMemo(() => new THREE.Vector3(), []);
  const ndc = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const el = gl.domElement;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      ndc.current.set(x, y);
      setNdc(x, y);
      wind.cursorActive = 1;
    };
    const onDown = () => spawnGust(wind.cursorX, wind.cursorZ);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerdown', onDown);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerdown', onDown);
    };
  }, [gl]);

  useFrame(() => {
    ray.setFromCamera(ndc.current, camera);
    if (ray.ray.intersectPlane(plane, hit)) setCursorWorld(hit.x, hit.z);
  });
  return null;
}

export default function Scene() {
  const sceneId = useStore((s) => s.sceneId);
  const scene = getScene(sceneId);
  const World = scene.World;
  const [tier, setTier] = useState(2);

  return (
    <div className="scene-fixed">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 11, 46], fov: 50, near: 0.1, far: 400 }}
        onCreated={({ scene: s }) => (s.background = PALETTE.zenith.clone())}
      >
        <PerformanceMonitor
          onDecline={() => setTier((t) => Math.max(0, t - 1))}
          flipflops={3}
        />
        <WindUpdater />
        <PointerCursor />
        <CameraJourney />
        {World && <World tier={tier} />}
        <AdaptiveDpr pixelated={false} />
        <EffectComposer disableNormalPass>
          <Bloom intensity={0.32} luminanceThreshold={0.6} luminanceSmoothing={0.9} mipmapBlur radius={0.5} />
          {tier >= 1 ? (
            <DepthOfField focusDistance={0.012} focalLength={0.04} bokehScale={2.2} height={480} />
          ) : (
            <></>
          )}
          <Vignette eskil={false} offset={0.28} darkness={0.62} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
