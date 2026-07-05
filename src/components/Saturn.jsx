import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

function SaturnPlanet() {
  const saturnRef = useRef(null);
  const ringsRef = useRef(null);
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Extremely slow axial rotation
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.4, -0.2, 0.2]}>
      {/* Planet Sphere */}
      <mesh ref={saturnRef} castShadow receiveShadow>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#d4c5b0"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Inner Ring */}
      <mesh ref={ringsRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
        <ringGeometry args={[1.8, 2.8, 128]} />
        <meshStandardMaterial
          color="#a89a8c"
          side={THREE.DoubleSide}
          transparent={true}
          opacity={0.8}
          roughness={0.8}
        />
      </mesh>

      {/* Outer Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
        <ringGeometry args={[2.9, 3.4, 128]} />
        <meshStandardMaterial
          color="#8c7f72"
          side={THREE.DoubleSide}
          transparent={true}
          opacity={0.6}
          roughness={0.9}
        />
      </mesh>
      
      {/* Subtle atmospheric glow / rim light fake */}
      <mesh>
        <sphereGeometry args={[1.54, 64, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export default function Saturn() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 35 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.1} />
      {/* Cinematic directional light mimicking a distant sun */}
      <directionalLight
        position={[-5, 3, 5]}
        intensity={2.5}
        color="#fff5e6"
        castShadow
      />
      {/* Subtle fill light for the dark side */}
      <directionalLight
        position={[5, -2, -5]}
        intensity={0.2}
        color="#8899bb"
      />
      <SaturnPlanet />
      {/* Soft environment reflection to make the materials look premium */}
      <Environment preset="night" />
    </Canvas>
  );
}
