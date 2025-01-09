import Navbar from '@/components/Nav/Navbar';
import { Artwork } from '@/components/Artwork';
import React from 'react';

export default function Sketches() {
  return (
    <div className="min-h-screen items-center justify-center  bg-[#08090]">
      <Navbar />
      <Artwork />
    </div>
  );
}
