import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { AdaptiveDpr } from '@react-three/drei';
import Galaxy from './Galaxy';
import AttentionLines from './AttentionLines';
import CameraRig from './CameraRig';

export default function Scene() {
  return (
    <div className="scene-fixed">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 16], fov: 55, near: 0.1, far: 100 }}
      >
        <CameraRig />
        <Galaxy />
        <AttentionLines />
        <AdaptiveDpr pixelated={false} />
        <EffectComposer disableNormalPass>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.42}
            luminanceSmoothing={0.85}
            mipmapBlur
            radius={0.5}
          />
          <Vignette eskil={false} offset={0.25} darkness={0.7} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
