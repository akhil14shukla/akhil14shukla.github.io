import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { CLUSTERS } from '../data/portfolio';
import { useStore } from '../store';

export default function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const flyingRef = useRef(false);
  const active = useStore((s) => s.activeCluster);
  const setFlying = useStore((s) => s.setFlying);

  useEffect(() => {
    flyingRef.current = true;
    setFlying(true);
    let camPos, ctr;
    if (active) {
      const c = CLUSTERS.find((x) => x.id === active);
      ctr = new THREE.Vector3(...c.center);
      const dir = ctr.clone().normalize();
      camPos = ctr.clone().add(dir.multiplyScalar(5.5)).add(new THREE.Vector3(0, 1.4, 4.5));
    } else {
      ctr = new THREE.Vector3(0, 0, 0);
      camPos = new THREE.Vector3(0, 0, 16);
    }
    const tl = gsap.timeline({
      onComplete: () => {
        flyingRef.current = false;
        setFlying(false);
      },
    });
    tl.to(camera.position, { x: camPos.x, y: camPos.y, z: camPos.z, duration: 1.9, ease: 'power3.inOut' }, 0);
    tl.to(target.current, { x: ctr.x, y: ctr.y, z: ctr.z, duration: 1.9, ease: 'power3.inOut' }, 0);
    return () => tl.kill();
  }, [active, camera, setFlying]);

  useFrame((state) => {
    // idle: gentle auto-orbit + pointer parallax when nothing is focused
    if (!flyingRef.current && !active) {
      const t = state.clock.elapsedTime * 0.045;
      const r = 16;
      const px = Math.sin(t) * r + state.pointer.x * 2.2;
      const pz = Math.cos(t) * r;
      const py = state.pointer.y * 1.4 + Math.sin(t * 0.5) * 1.2;
      camera.position.x += (px - camera.position.x) * 0.04;
      camera.position.y += (py - camera.position.y) * 0.04;
      camera.position.z += (pz - camera.position.z) * 0.04;
    }
    camera.lookAt(target.current);
  });

  return null;
}
