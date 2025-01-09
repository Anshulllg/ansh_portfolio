import Navbar from '@/components/Nav/Navbar';
import { Artwork } from '@/components/Artwork';
import React from 'react';
import Artboard from '@/components/Artboard';

export default function Sketches() {
  return (
    <div className="min-h-screen items-center justify-center ">
      <Navbar />
      <Artwork />
      {/* <Artboard/> */}
    </div>
  );
}
