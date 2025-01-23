"use client";
import { Avatar } from "./Avatar";
import { OrbitControls, SpotLight } from "@react-three/drei";
import { Name } from "./Name";
import {Hololens} from "./Hololens";
import { Tablet } from "./Tablet";
import {Computer} from "./Computer";
import {Robo} from "./Robo";
import {Hologram} from "./Hologram"
export function HeroParticle() {

  return (
    <>

      <OrbitControls enableZoom={false} />
      <group position-y={-1}>
        <Avatar position={[0, 0,-0.6]} castShadow receiveShadow animation={"Touch"} />
        <Avatar position={[2.1, 0.7,-1]} rotation={[0,0.2,0]}  castShadow receiveShadow animation={"Typing"} />
        <Avatar position={[-2.2, 0,-0.6]} rotation={[0,0.4,0]}  castShadow receiveShadow animation={"Standing"} />
        <Hololens position={[-2.05, 1.62,-0.52]} rotation={[1.2,1,-1]} />
        <Robo position={[1.3, 0.25,-1.0]} rotation={[0,0.4,0]}  />
        <Tablet position={[0.04, 1.07,-0.2]} rotation={[1,0,0]}  scale= {0.6} />
        <Computer position={[2.2, 1.67,-0.15]} scale={0.4}  rotation={[0,0.2,0.04]}/>
        <Name position={[0, 1,-0.9]}/>
        <Hologram position={[-1.2, 0.25,0]} scale={0.0017}/>
       
        <ambientLight intensity={0.4} />

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

        <spotLight
          position={[-2, 4, -2]}
          intensity={1.5}
          angle={0.6}
          penumbra={0.5}
          color="#ffffff"
          castShadow
        />

        <spotLight
          position={[0, 2, -3]}
          intensity={2}
          angle={0.8}
          penumbra={0.5}
          color="#ff4444"
          distance={20}
        />

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
        <shadowMaterial opacity={0.7} />
      </mesh>
    </>
  );
}