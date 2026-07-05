import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store';
import { getRenderingTier, detectDevice } from '../../utils/deviceDetection';

/* ═══════════════════════════════════════════════════════════════════════════
   ADAPTIVE RENDERING — Optimize for device capabilities
   ═══════════════════════════════════════════════════════════════════════════ */

// Rendering tier is determined dynamically inside component lifecycles to avoid module hydration timing bugs.


/* ═══════════════════════════════════════════════════════════════════════════
   NEBULA SPHERE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

function NebulaSphere() {
  const meshRef = useRef();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uColor1: { value: new THREE.Color(0x0a0d1a) },
    uColor2: { value: new THREE.Color(0x1a0a05) },
    uColor3: { value: new THREE.Color(0x2a1a0a) },
    uIntensity: { value: 1.0 },
  }), []);

  // Move color allocations outside useFrame to eliminate heap GC overhead
  const colorsRef = useRef({
    color1: new THREE.Color(0x020305),
    color2: new THREE.Color(0xb58038),
    color3: new THREE.Color(0x0a1c28),
  });

  useFrame((state) => {
    if (!meshRef.current) return;

    const scroll = useStore.getState().scrollProgress;
    const time = useStore.getState().time || state.clock.elapsedTime;

    // ─ Update shader uniforms ─
    meshRef.current.material.uniforms.uTime.value = time;
    meshRef.current.material.uniforms.uScroll.value = scroll || 0;

    // ─ Static premium colors (Base: deep black, Primary: warm amber, Secondary: electric blue) ─
    const { color1, color2, color3 } = colorsRef.current;
    color1.setHex(0x020305);
    color2.setHex(0xb58038);
    color3.setHex(0x0a1c28);

    // ─ Stable intensity — a single fixed atmosphere across every section.
    //   Previously this switched on `currentScene?.id`, so brightness would
    //   jump abruptly at each section boundary (read by users as
    //   "flashing" / "sections losing atmospheric depth"). A tiny, slow
    //   sine drift keeps it feeling alive without ever being perceptible
    //   as a flash or a section-dependent change. ─
    const intensity = 0.65 + Math.sin(time * 0.05) * 0.03;

    meshRef.current.material.uniforms.uColor1.value = color1;
    meshRef.current.material.uniforms.uColor2.value = color2;
    meshRef.current.material.uniforms.uColor3.value = color3;
    meshRef.current.material.uniforms.uIntensity.value = intensity;

    // ─ Continuous slow rotation ─
    meshRef.current.rotation.y = time * 0.008;
    meshRef.current.rotation.z = time * 0.003;
  });

  const device = useMemo(() => detectDevice(), []);
  const segments = (device.isMobile || device.isLowEnd) ? 12 : device.isTablet ? 24 : 48;
  const fragmentShader = (device.isMobile || device.isLowEnd) ? nebulaFragmentShaderLow : nebulaFragmentShader;

  return (
    <mesh ref={meshRef} scale={[60, 60, 60]}>
      <sphereGeometry args={[1, segments, segments]} />
      <shaderMaterial
        vertexShader={nebulaVertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CAMERA CONTROLLER — Interactive parallax + depth motion
   ═══════════════════════════════════════════════════════════════════════════ */

function WebGLController() {
  const { camera } = useThree();
  const stateRef = useRef({ scroll: 0, targetX: 0, targetY: 0 });

  useFrame((state) => {
    const scroll = useStore.getState().scrollProgress || 0;
    const time = useStore.getState().time || state.clock.elapsedTime;
    const mouseX = useStore.getState().mouseX || 0;
    const mouseY = useStore.getState().mouseY || 0;

    // ─ Smooth scroll tracking ─
    stateRef.current.scroll = THREE.MathUtils.lerp(stateRef.current.scroll, scroll, 0.08);

    // ─ Idle floating motion ─
    const baseX = Math.sin(time * 0.15) * 0.5;
    const baseY = Math.cos(time * 0.12) * 0.5;

    // ─ Connect cursor to camera position ─
    stateRef.current.targetX = baseX + mouseX * 1.2;
    stateRef.current.targetY = baseY + mouseY * 1.2;

    // ─ Smooth camera follow ─
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, stateRef.current.targetX, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, stateRef.current.targetY, 0.03);

    // ─ Depth travel based on scroll ─
    camera.position.z = Math.max(1.5, 6 - stateRef.current.scroll * 4.5);

    // ─ Subtle camera rotation ─
    camera.rotation.z = Math.sin(time * 0.08) * 0.015 + mouseX * 0.03;
    camera.rotation.x = Math.cos(time * 0.06) * 0.01 + mouseY * 0.02;

    // ─ Look toward offset target ─
    camera.lookAt(baseX * 0.3, baseY * 0.3, camera.position.z - 15);
  });

  return null;
}



/* ═══════════════════════════════════════════════════════════════════════════
   PREMIUM NEBULA SHADER — Scene-Reactive Atmosphere
   ═══════════════════════════════════════════════════════════════════════════ */

const nebulaVertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragmentShader = `
  varying vec2 vUv;
  
  uniform float uTime;
  uniform float uScroll;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uIntensity;
  
  // ─────────────────────────────────────────────────────────────────────
  // Noise Generation
  // ─────────────────────────────────────────────────────────────────────
  float hash(vec2 p) {
    return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x))));
  }
  
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f); // smoothstep interpolation
    
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  
  float fbm(vec2 p) {
    float f = 0.0;
    float w = 0.5;
    
    for (int i = 0; i < 6; i++) {
      f += w * noise(p);
      p *= 2.0;
      w *= 0.5;
    }
    
    return f;
  }
  
  // ─────────────────────────────────────────────────────────────────────
  // Advanced Layered Noise
  // ─────────────────────────────────────────────────────────────────────
  float advancedFbm(vec2 p, float time) {
    float n1 = fbm(p + time * 0.001);
    float n2 = fbm(p * 0.5 - time * 0.0015);
    float n3 = fbm(p * 2.0 + time * 0.002);
    
    return (n1 * 0.5 + n2 * 0.3 + n3 * 0.2);
  }
  
  void main() {
    vec2 uv = vUv;
    
    // ─ Layered nebula with depth ─
    float n1 = fbm(uv * 3.0 + vec2(uTime * 0.0025, uTime * 0.001));
    float n2 = fbm(uv * 5.0 + vec2(-uTime * 0.002, -uTime * 0.0035) + n1 * 2.0);
    float n3 = fbm(uv * 8.0 + uScroll * 2.0 + n2 * 1.5);
    
    // ─ Color composition based on noise layers ─
    vec3 col = mix(uColor1, uColor2, n1);
    col = mix(col, uColor3, n2 * 0.6);
    
    // ─ Add light bursts and depth ─
    col += uColor2 * (n2 * 0.3 + n3 * 0.2);
    col *= uIntensity;
    
    // ─ Vignette for cinematic depth ─
    float vignette = 1.0 - distance(uv, vec2(0.5)) * 0.8;
    col *= mix(0.6, 1.0, vignette);

    // ─ Defensive clamp: guarantees output can never exceed the intended
    //   amber/black/teal palette range, regardless of uniform drift ─
    col = clamp(col, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const nebulaFragmentShaderLow = `
  varying vec2 vUv;
  
  uniform float uTime;
  uniform float uScroll;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uIntensity;
  
  float hash(vec2 p) {
    return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x))));
  }
  
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  
  float fbm(vec2 p) {
    float f = 0.0;
    float w = 0.5;
    for (int i = 0; i < 2; i++) {
      f += w * noise(p);
      p *= 2.0;
      w *= 0.5;
    }
    return f;
  }
  
  void main() {
    vec2 uv = vUv;
    float n = fbm(uv * 4.0 + vec2(uTime * 0.003, uScroll * 0.5));
    vec3 col = mix(uColor1, uColor2, n);
    col = mix(col, uColor3, n * 0.3);
    col *= uIntensity;
    float vignette = 1.0 - distance(uv, vec2(0.5)) * 0.7;
    col *= mix(0.7, 1.0, vignette);
    col = clamp(col, 0.0, 1.0);
    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ═══════════════════════════════════════════════════════════════════════════
   LIGHTING CONTROLLER — Section-reactive atmosphere
   ═══════════════════════════════════════════════════════════════════════════ */

function LightingController() {
  const dirLightRef = useRef();
  const ambientLightRef = useRef();
  const pointLightRef = useRef();

  useFrame((state) => {
    if (!dirLightRef.current) return;

    const time = useStore.getState().time || state.clock.elapsedTime;

    // ─────────────────────────────────────────────────────────────────────
    // Stable intensity — no per-scene branching, no scroll-multiplied
    // oscillation. The previous version multiplied intensity by
    // `Math.sin(scroll * Math.PI * 3)`, which cycles through 3 full
    // brightness swings across a single scroll pass — read as flashing.
    // Note: NebulaSphere uses an unlit shaderMaterial and the Stars/Sparkles
    // are unlit too, so these lights don't currently drive the visible
    // atmosphere color — kept intentionally simple for any future lit
    // geometry, without the per-frame branching/oscillation cost.
    // ─────────────────────────────────────────────────────────────────────
    const dirIntensity = 0.35 + Math.sin(time * 0.15) * 0.05;

    dirLightRef.current.intensity = dirIntensity;
    dirLightRef.current.position.x = 15 * Math.sin(time * 0.03);
    dirLightRef.current.position.y = 10 + 4 * Math.cos(time * 0.025);
    dirLightRef.current.position.z = 5 + 5 * Math.cos(time * 0.02);
    dirLightRef.current.color.setHex(0xb58038);

    // ─ Ambient light: stable fill ─
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = 0.12;
      ambientLightRef.current.color.setHex(0xe0e6ed);
    }

    // ─ Point light: adds depth, slow drift only ─
    if (pointLightRef.current) {
      pointLightRef.current.intensity = 0.25;
      pointLightRef.current.position.set(
        Math.sin(time * 0.1) * 20,
        10,
        Math.cos(time * 0.12) * 20
      );
    }
  });

  const device = useMemo(() => detectDevice(), []);
  const enableShadows = !device.isMobile && !device.isLowEnd;

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.12} color="#d0d8e0" />
      <directionalLight
        ref={dirLightRef}
        position={[10, 10, 5]}
        intensity={0.2}
        color="#b58038"
        castShadow={enableShadows}
        shadow-mapSize-width={enableShadows ? 512 : 0}
        shadow-mapSize-height={enableShadows ? 512 : 0}
      />
      <pointLight
        ref={pointLightRef}
        position={[20, 10, 20]}
        intensity={0.2}
        distance={100}
        decay={2}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN ASTRO ENVIRONMENT COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function AstroEnvironment() {
  const device = useMemo(() => detectDevice(), []);

  // Configure parameters based on device tier - Mobile/Low-end: strict cap of 100 particles
  const starCount = (device.isMobile || device.isLowEnd) ? 100 : device.isTablet ? 1500 : 3500;
  
  const sparklesConfig = useMemo(() => {
    if (device.isMobile || device.isLowEnd) {
      // Mobile: max 30 sparkles total (combined with 100 stars = high performance)
      return [
        { count: 30, scale: 20, size: 1.0, speed: 0.05, opacity: 0.08, color: "#b58038" }
      ];
    }
    if (device.isTablet) {
      // Tablet: reduced particles
      return [
        { count: 100, scale: 20, size: 1.2, speed: 0.08, opacity: 0.1, color: "#b58038" },
        { count: 50, scale: 30, size: 2.0, speed: 0.05, opacity: 0.08, color: "#a1a1aa" }
      ];
    }
    // Desktop: full atmosphere
    return [
      { count: 200, scale: 20, size: 1.5, speed: 0.12, opacity: 0.15, color: "#b58038" },
      { count: 100, scale: 30, size: 2.5, speed: 0.06, opacity: 0.1, color: "#a1a1aa" }
    ];
  }, [device]);

  return (
    <>
      {/* Controllers */}
      <WebGLController />
      <LightingController />

      {/* 1. Nebula fog layer (section-reactive) */}
      <NebulaSphere />

      {/* 2. Starfield background */}
      <Stars
        radius={50}
        depth={50}
        count={starCount}
        factor={(device.isMobile || device.isLowEnd) ? 1.0 : 3}
        saturation={0.1}
        fade
        speed={(device.isMobile || device.isLowEnd) ? 0.05 : 0.3}
      />

      {/* 3. Multi-depth desaturated sparkles */}
      {sparklesConfig.map((config, index) => (
        <Sparkles key={index} {...config} />
      ))}
    </>
  );
}
