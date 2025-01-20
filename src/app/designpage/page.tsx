import React from 'react';
import Navbar from '@/components/Nav/Navbar';
import DesignProjects from '@/components/DesignProjects';

export default function Sketches() {
  return (
    <div>
      <div className="min-h-screen  items-center justify-center  bg-[#08090]">
        <Navbar/>
        <DesignProjects/>
      </div>

    </div>
    
  );
}
