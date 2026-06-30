import { useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { wind } from '../../three/wind';

// Foreground susuki (silver-grass) field — the real photo, sampled on a plane
// whose UVs are displaced by the shared wind so the grass sways and gusts roll
// across it (GoT-style). Top + side edges fade out so it blends into the Fuji
// backdrop instead of reading as a rectangle.
const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uWind;     // signed wind (dir.x * strength)
  varying vec2 vUv;

  void main() {
    // rolling gust wave, stronger toward the distant top of the field
    float wave = sin(vUv.x * 12.0 + uTime * 1.4) * 0.5
               + sin(vUv.x * 23.0 - uTime * 2.1) * 0.5;
    float sway = wave * uWind * 0.012 * (0.4 + vUv.y);
    // map plane v -> lower 0.7 of the photo (skip its blown-out sky)
    vec2 uv = vec2(vUv.x + sway, mix(0.02, 0.72, vUv.y));
    vec3 col = texture2D(uTex, uv).rgb;
    // warm sunset grade to match the Fuji backdrop
    col *= vec3(1.08, 0.96, 0.74);
    col = pow(col, vec3(0.95));

    float aTop = smoothstep(0.92, 0.5, vUv.y);            // fade the top into the scene
    float aSide = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
    float alpha = aTop * aSide;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(col, alpha);
  }
`;

export default function FieldPlane() {
  const matRef = useRef();
  const tex = useLoader(THREE.TextureLoader, '/scenery/field.jpg');
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.MirroredRepeatWrapping;

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uWind: { value: 0 }, uTex: { value: tex } }),
    [tex]
  );

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    matRef.current.uniforms.uWind.value = wind.dirX * wind.strength;
  });

  return (
    <mesh position={[0, -3.9, 9]} renderOrder={1}>
      <planeGeometry args={[22, 6, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
