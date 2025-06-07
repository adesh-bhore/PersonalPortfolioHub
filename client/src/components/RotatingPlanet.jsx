import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Stars } from '@react-three/drei';

/**
 * This component contains the actual 3D scene.
 * It's drawn on the Canvas.
 */
function Scene() {
  // Load the texture for the planet
  const nightMap = useTexture('/8k_earth_nightmap.jpg');

  // A ref to access the group and animate it
  const groupRef = useRef();

  // The useFrame hook runs on every rendered frame
  useFrame((state, delta) => {
    // Slowly rotate the group
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1; // delta ensures smooth animation
    }
  });

  return (
    <>
      {/* General ambient light */}
      <ambientLight intensity={0.2} />
      {/* A pinkish point light from the top-right */}
      <pointLight color="#f87cf3" position={[5, 3, 5]} intensity={1.5} />
      {/* A bluish point light from the bottom-left */}
      <pointLight color="#5271ff" position={[-5, -3, 5]} intensity={1.5} />
      {/* Starry background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <group ref={groupRef}>
        {/* The inner planet */}
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          {/* The texture is applied here */}
          <meshStandardMaterial map={nightMap} emissiveMap={nightMap} emissive={0xffffff} emissiveIntensity={0.6} />
        </mesh>

        {/* The outer, stylized wrap.
            We use a TorusKnot for a similar abstract feel. */}
        <mesh>
          {/* This is the updated line for a closer ribbon */}
          <torusKnotGeometry args={[1.25, 0.05, 400, 20, 3, 7]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.5}
          />
        </mesh>

         {/* RIBBON 2: Rotated on the X-axis */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusKnotGeometry args={[1.25, 0.05, 400, 20, 3, 7]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.5}
          />
        </mesh>

      </group>
    </>
  );
}

/**
 * The main component that sets up the Canvas and Suspense.
 */
export default function RotatingPlanet() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000010' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Suspense is required for useTexture to work.
            It shows a fallback while assets are loading. */}
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}