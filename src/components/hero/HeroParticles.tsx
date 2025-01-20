"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Avatar } from "./Avatar";
import { OrbitControls, SpotLight } from "@react-three/drei";
import { useControls } from "leva";
import { Name } from "./Name";

export function HeroParticle() {
//   const { animation } = useControls({
//     animation: {
//       value: "Touch",
//       options: ["Land", "Typing", "Sitting", "Touch", "Standing", "SittingI", "SittingD"]
//     }
  // });

  return (
    <>
      {/* <color attach="background" args={['#ffffff']} /> */}
      <OrbitControls enableZoom={false} />
      <group position-y={-1}>
        <Avatar position={[0, 0,-0.6]} castShadow receiveShadow animation={"Touch"} />
        <Avatar position={[2.1, 0.7,-1]} rotation={[0,0.2,0]}  castShadow receiveShadow animation={"Typing"} />
        <Avatar position={[-2, 0,-0.6]} rotation={[0,0.4,0]}  castShadow receiveShadow animation={"Standing"} />
        {/* <Avatar position={[-0.4, 0,-0.7]} rotation={[0,-0.5,0]} castShadow receiveShadow animation={"SittingD"} /> */}
        <Name position={[0, 1,-0.9]}/>
        
        {/* Increased ambient light for better base illumination */}
        <ambientLight intensity={0.4} />

        {/* Main key light - made stronger and repositioned */}
        <directionalLight
          position={[3, 4, 2]}
          castShadow
          intensity={2}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* Dramatic backlight for rim lighting */}
        <spotLight
          position={[-2, 4, -2]}
          intensity={1.5}
          angle={0.6}
          penumbra={0.5}
          color="#ffffff"
          castShadow
        />

        {/* Red accent light for the text */}
        <spotLight
          position={[0, 2, -3]}
          intensity={2}
          angle={0.8}
          penumbra={0.5}
          color="#ff4444"
          distance={20}
        />

        {/* Additional fill light from the front */}
        <directionalLight 
          position={[0, 2, 4]} 
          intensity={0.8} 
          color="#ffffff"
        />
      </group>
      
      <mesh 
        rotation-x={-Math.PI / 2} 
        position-y={-1} 
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.7} /> {/* Reduced shadow opacity */}
      </mesh>
    </>
  );
}