import Carousel from '@/components/Carousel';
import React from 'react';
import Navbar from '@/components/Nav/Navbar';

export default function Sketches() {
  return (
    <div>
      <div className="min-h-screen  items-center justify-center  bg-[#08090]">
        
        <Navbar/>
        <h1 className="text-4xl font-bold text-white">Tech Projects</h1>
        <Carousel/>
      </div>

    </div>
    
  );
}
