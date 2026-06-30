import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { AdaptiveDpr } from '@react-three/drei';
import { useStore } from '../store';
import { getScene } from '../config/scenes';
import { wind, updateWind, setPointer, spawnGust } from './wind';

// Advance the shared wind field once per frame, before any layer reads it.
function WindUpdater() {
  useFrame((s) => updateWind(s.clock.elapsedTime));
  return null;
}

// Gentle camera: slow pointer parallax, always framing the scene head-on.
function CameraGentle() {
  const { camera } = useThree();
  useFrame(() => {
    const px = wind.pointerX * 0.025;
    const py = 0.5 + wind.pointerY * 0.025;
    camera.position.x += (px - camera.position.x) * 0.03;
    camera.position.y += (py - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// NDC → scene-extent world XY (matches the snow box half-extents).
function ndc(e) {
  return [
    ((e.clientX / window.innerWidth) * 2 - 1) * 18,
    -((e.clientY / window.innerHeight) * 2 - 1) * 10,
  ];
}

export default function Scene() {
  const sceneId = useStore((s) => s.sceneId);
  const scene = getScene(sceneId);
  const { Particles, Foreground, fog } = scene;

  return (
    <div
      className="scene-fixed"
      onPointerMove={(e) => {
        const [x, y] = ndc(e);
        setPointer(x, y);
      }}
      onClick={(e) => {
        const [x, y] = ndc(e);
        spawnGust(x, y, 2.0);
      }}
    >
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0.5, 18], fov: 50, near: 0.1, far: 120 }}
      >
        {fog && <fog attach="fog" args={[fog.color, fog.near, fog.far]} />}
        <WindUpdater />
        <CameraGentle />
        {Particles && <Particles />}
        {Foreground && <Foreground />}
        <AdaptiveDpr pixelated={false} />
        <EffectComposer disableNormalPass>
          <Bloom
            intensity={0.12}
            luminanceThreshold={0.75}
            luminanceSmoothing={0.9}
            mipmapBlur
            radius={0.4}
          />
          <Vignette eskil={false} offset={0.3} darkness={0.62} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
