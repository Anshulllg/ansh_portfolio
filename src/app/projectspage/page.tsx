import Carousel from '@/components/TechProjects';
import React from 'react';
import Navbar from '@/components/Nav/Navbar';
import TechProjects from '@/components/TechProjects';

export default function Sketches() {
  return (
    <div>
      <div className="min-h-screen  items-center justify-center  bg-[#08090]">
        <Navbar/>
        <TechProjects/>
      </div>

    </div>
    
  );
}
