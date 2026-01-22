"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, PerspectiveCamera, Float, Text, ContactShadows, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Robot = () => {
  const headRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (headRef.current) {
      // Get mouse position (-1 to 1)
      const mouseX = state.pointer.x;
      const mouseY = state.pointer.y;
      
      // Smoothly look at mouse
      // Head rotates more
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, mouseX * 0.8, 0.1);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -mouseY * 0.5, 0.1);
    }
  });

  return (
    <group position={[0, -1.5, 0]}>
       {/* --- BASE --- */}
       <group position={[0, 0, 0]}>
            {/* Bottom Step */}
           <RoundedBox args={[4, 0.5, 4]} radius={0.2} smoothness={4} position={[0, 0, 0]}>
             <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
           </RoundedBox>
           {/* Middle Step */}
           <RoundedBox args={[2.5, 0.5, 2.5]} radius={0.2} smoothness={4} position={[0, 0.5, 0]}>
             <meshStandardMaterial color="#202035" metalness={0.8} roughness={0.2} />
           </RoundedBox>
            {/* Top Step */}
            <RoundedBox args={[1.5, 0.5, 1.5]} radius={0.2} smoothness={4} position={[0, 1, 0]}>
             <meshStandardMaterial color="#252540" metalness={0.8} roughness={0.2} />
           </RoundedBox>
       </group>

       {/* --- ROBOT BODY --- */}
       <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2} floatingRange={[0, 0.2]}>
            <group position={[0, 1.8, 0]}>
                {/* Body Stem/torso */}
                 <mesh position={[0, -0.2, 0]}>
                    <coneGeometry args={[0.4, 0.2, 0.8, 32]} />
                    <meshStandardMaterial color="#4a4a6a" metalness={0.9} roughness={0.1} />
                </mesh>
                
                {/* HEAD GROUP (Rotates) */}
                <group ref={headRef} position={[0, 0.3, 0]}>
                    {/* Neck */}
                    <mesh position={[0, -0.4, 0]}>
                        <cylinderGeometry args={[0.1, 0.1, 0.6]} />
                        <meshStandardMaterial color="#888" metalness={1} roughness={0.2} />
                    </mesh>

                    {/* Head Case */}
                    <mesh position={[0, 0.4, 0]}>
                         <RoundedBox args={[2.2, 1.4, 0.8]} radius={0.2} smoothness={4}>
                             <meshStandardMaterial color="#0f0f16" metalness={0.9} roughness={0.1} />
                         </RoundedBox>
                    </mesh>

                     {/* Face Screen (Glassy) */}
                    <mesh position={[0, 0.4, 0.41]}>
                        <planeGeometry args={[1.8, 1]} />
                        <meshStandardMaterial color="black" metalness={0.8} roughness={0.2} />
                    </mesh>
                    
                    {/* Eyes */}
                    {/* Left Eye */}
                    <mesh position={[-0.4, 0.4, 0.42]}>
                         <sphereGeometry args={[0.2, 32, 32]} />
                         <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={3} toneMapped={false} />
                    </mesh>
                    
                    {/* Right Eye */}
                    <mesh position={[0.4, 0.4, 0.42]}>
                         <sphereGeometry args={[0.2, 32, 32]} />
                         <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={3} toneMapped={false} />
                    </mesh>

                     {/* Antenna (Optional detail) */}
                     <mesh position={[0.8, 1.1, 0]} rotation={[0, 0, -0.2]}>
                        <cylinderGeometry args={[0.02, 0.02, 0.5]} />
                        <meshStandardMaterial color="gray" />
                     </mesh>
                </group>
            </group>
       </Float>
       
       {/* TEXT ELEMENTS */}
       <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <Text 
                position={[-3, 2.5, 0]} 
                fontSize={0.8} 
                font="/fonts/Inter-Bold.ttf" // Fallback to default if not found
                color="#aaaaaa"
                anchorX="center"
                anchorY="middle"
            >
                Front
            </Text>
       </Float>
       
       <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.5}>
            <Text 
                position={[3, 1.5, 0]} 
                fontSize={0.8} 
                color="#6600ff"
                anchorX="center"
                anchorY="middle"
            >
                End
            </Text>
       </Float>
    </group>
  );
}

export default function RobotCanvas() {
  return (
    <div className="w-full h-[600px] absolute inset-0 -z-0 pointer-events-none md:pointer-events-auto">
        <Canvas>
            <PerspectiveCamera makeDefault position={[0, 1, 8]} fov={45} />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} color="#00f3ff" intensity={2} />
            <pointLight position={[0, 5, 0]} color="#purple" intensity={0.8} />
            
            <Robot />
            
            <Environment preset="city" />
            <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000" />
        </Canvas>
    </div>
  )
}
