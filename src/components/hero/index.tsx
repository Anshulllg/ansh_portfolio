import React from 'react';
import { HeroParticle } from './HeroParticles';
import { Canvas } from '@react-three/fiber';

export default function HeroSection() {
  return (
      <Canvas shadows camera={{ fov:30}} >
        <HeroParticle/>
      </Canvas> 
  )
}
