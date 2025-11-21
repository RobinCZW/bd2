import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Cake Component
const Cake = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005; // Slow rotation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1; // Bobbing
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Cake Base */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.8, 1.8, 1, 32]} />
        <meshStandardMaterial color="#FDE68A" /> {/* Vanilla/Sponge */}
      </mesh>
      
      {/* Bottom Icing */}
      <mesh position={[0, 0.5, 0]} scale={[1.02, 1, 1.02]}>
         <cylinderGeometry args={[1.8, 1.8, 0.9, 32]} />
         <meshStandardMaterial color="#FBCFE8" transparent opacity={0.4} /> 
      </mesh>

      {/* Middle Layer */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.4, 1.4, 1, 32]} />
        <meshStandardMaterial color="#F9A8D4" /> {/* Pink Strawberry */}
      </mesh>

      {/* Top Drip/Icing */}
      <mesh position={[0, 2.05, 0]}>
        <cylinderGeometry args={[1.45, 1.45, 0.15, 32]} />
        <meshStandardMaterial color="#FFF1F2" roughness={0.2} /> {/* White Cream */}
      </mesh>

      {/* Decorations/Cherries */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <mesh key={i} position={[Math.cos(i * Math.PI / 4) * 1.2, 2.15, Math.sin(i * Math.PI / 4) * 1.2]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#EF4444" roughness={0.1} />
        </mesh>
      ))}

      {/* Candles */}
      <group position={[0, 2.1, 0]}>
        {/* Candle 1 */}
        <mesh position={[-0.3, 0.4, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
          <meshStandardMaterial color="#60A5FA" />
        </mesh>
        {/* Candle 2 */}
        <mesh position={[0.3, 0.4, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
          <meshStandardMaterial color="#60A5FA" />
        </mesh>
        
        {/* Flames */}
        <pointLight position={[-0.3, 0.9, 0]} color="orange" intensity={1.5} distance={3} />
        <mesh position={[-0.3, 0.85, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="orange" />
        </mesh>

        <pointLight position={[0.3, 0.9, 0]} color="orange" intensity={1.5} distance={3} />
        <mesh position={[0.3, 0.85, 0]}>
           <sphereGeometry args={[0.08, 16, 16]} />
           <meshBasicMaterial color="orange" />
        </mesh>
      </group>

      {/* 3D Text Number 29 */}
       <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[0, 3.2, 0]}
          fontSize={1.5}
          color="#A855F7"
          font="https://fonts.gstatic.com/s/pacifico/v22/FwZY7-Qmy14u9lezJ-6H6MmTpA.woff"
          anchorX="center"
          anchorY="middle"
        >
          29
          <meshStandardMaterial color="#A855F7" emissive="#A855F7" emissiveIntensity={0.5} />
        </Text>
      </Float>
    </group>
  );
};

const CakeScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute top-0 left-0 z-0">
      <Canvas shadows camera={{ position: [0, 2, 6], fov: 50 }}>
        <color attach="background" args={['#fbcfe8']} /> {/* Pink background */}
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[2048, 2048]} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#purple" />
        
        {/* Environment details */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={100} scale={6} size={4} speed={0.4} opacity={0.5} color="#FFF" />
        
        <Cake />
        
        <ContactShadows resolution={512} scale={10} blur={2} opacity={0.5} far={10} color="#8b5cf6" />
      </Canvas>
    </div>
  );
};

export default CakeScene;