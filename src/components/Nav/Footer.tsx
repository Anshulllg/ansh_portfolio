import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Avatar } from '../hero/Avatar';
import { OrbitControls } from '@react-three/drei';
import {Name} from '../hero/Name'
import { InteractiveHoverButton } from '../ui/interactive-hover-button';

const FooterScene = () => {
  const customControls = {
    headFollow: false,
    cursorFollow: true, 
    wireframe: false
  };

  return (
    <>
      <OrbitControls enableZoom={false} />
      <group position-y={-1}>
       
        <Avatar 
          animation="Standing" 
          castShadow 
          receiveShadow 
          {...customControls}
        />
        <ambientLight intensity={0} />
        <directionalLight
          position={[5, 5, 5]}
          castShadow
          intensity={3}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
      </group>
      <mesh 
        rotation-x={-Math.PI / 2} 
        position-y={-1} 
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.4} />
      </mesh>
    </>
  );
};

const Footer = () => {
  const handleEmailClick = () => {
    const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=anshulgoswami0901@gmail.com';
    window.open(gmailUrl, '_blank');
  };

  return (
    <div className="relative w-screen max-w-7xl mx-auto h-screen flex items-center justify-center">
      <div className="w-1/4 h-[600px] pb-20">
        <Canvas shadows camera={{ fov: 30 }}>
          <FooterScene />
        </Canvas>
      </div>

      <div className="w-3/4">
        <p className="text-gray-300 text-6xl syne pt-30 pb-16">
          Let's create something great together!
        </p>
        
        <div className="flex text-white syne-m">
          <InteractiveHoverButton onClick={handleEmailClick}>
            Say Hello
          </InteractiveHoverButton>
        </div>
      </div>

      <p className="absolute bottom-[54px] text-sm syne-m text-white/50 w-full text-center">
        © 2025 Anshul Goswami
      </p>
    </div>
  );
};

export default Footer;