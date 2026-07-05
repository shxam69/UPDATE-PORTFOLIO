import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';

// ------------------------------------------------------------------
// INNER PLANET COMPONENT (Memoized to prevent unnecessary re-renders)
// ------------------------------------------------------------------
const SaturnPlanet = React.memo(({ isMobile }) => {
  const groupRef = useRef(null);
  const planetRef = useRef(null);

  // Load the generated high-res NASA-quality textures
  // Preloading these outside component would be ideal for strict performance,
  // but useTexture caches them automatically via Suspense.
  const [diffuseMap, ringAlphaMap] = useTexture([
    '/saturn_diffuse.png',
    '/saturn_ring_alpha.png'
  ]);
  
  // Ensure correct color space for PBR realism
  useMemo(() => {
    diffuseMap.colorSpace = THREE.SRGBColorSpace;
    ringAlphaMap.colorSpace = THREE.SRGBColorSpace;
  }, [diffuseMap, ringAlphaMap]);

  // Adjust geometry resolution dynamically based on device
  const segments = isMobile ? 64 : 128;

  useFrame((state, delta) => {
    if (planetRef.current) {
      // Extremely slow continuous axial rotation on its Y-axis
      // ~1 full rotation every 60-90 seconds (approx 0.01 rad/s)
      planetRef.current.rotation.y += delta * 0.01;
    }
  });

  return (
    // Group tilted on Z-axis by exactly 26.7 degrees (Saturn's actual axial tilt)
    <group ref={groupRef} rotation={[0, 0, THREE.MathUtils.degToRad(-26.7)]} position={[0, 0, 0]}>
      {/* 
        The rotation is strictly applied to the inner group.
        This ensures both the planet and rings spin flawlessly in unison 
        around their tilted axis without any wobbling.
      */}
      <group ref={planetRef}>
        
        {/* Planet Sphere with High-Res Diffuse Map & PBR Material */}
        <mesh>
          <sphereGeometry args={[2.0, segments, segments]} />
          <meshStandardMaterial
            map={diffuseMap}
            roughness={0.95} // Matte gas giant, no plastic glare
            metalness={0.0}
          />
        </mesh>

        {/* Ring System using Alpha Map on a Plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[9.5, 9.5]} />
          <meshStandardMaterial
            color="#d4c5b0"
            map={ringAlphaMap}
            alphaMap={ringAlphaMap}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={0.9}
            roughness={0.6}
            metalness={0.1}
            alphaTest={0.2} 
          />
        </mesh>
        
      </group>
    </group>
  );
});

SaturnPlanet.displayName = 'SaturnPlanet';

// ------------------------------------------------------------------
// OUTER CANVAS COMPONENT (Memoized)
// ------------------------------------------------------------------
const Saturn = React.memo(() => {
  const [isMobile, setIsMobile] = useState(false);

  // Check window size on mount for basic LOD (Level of Detail)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 40 }}
      // Cap DPR at 1.5 to save performance on high-density mobile screens
      dpr={[1, 1.5]}
      gl={{ 
        alpha: true, 
        antialias: !isMobile, // Disable MSAA on mobile for performance
        powerPreference: 'high-performance' 
      }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      {/* 
        HemisphereLight provides a subtle, performant global illumination
        without the heavy cost of HDR environments.
      */}
      <hemisphereLight intensity={0.15} color="#ffffff" groundColor="#000000" />

      {/* 
        Directional Rim Light (Top-Left)
        Provides dramatic shading without real-time shadow map calculations.
      */}
      <directionalLight
        position={[-15, 6, -6]}
        intensity={3.5}
        color="#fff1e0"
      />

      <React.Suspense fallback={null}>
        <SaturnPlanet isMobile={isMobile} />
      </React.Suspense>
    </Canvas>
  );
});

Saturn.displayName = 'Saturn';

export default Saturn;
