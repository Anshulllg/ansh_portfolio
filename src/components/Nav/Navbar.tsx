'use client'; // This tells Next.js that this component should be a Client Component
import WordPullUp from "@/components/ui/word-pull-up";
import React, { useState } from 'react';
import Drawer from './Drawer';
import MusicPlayer from '../hero/MusicPlayer';

const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <nav className="fixed top-8 w-full z-20">
        <div className=" px-16 h-16 mx-auto flex items-center justify-between">
          <div className="text-sm syne">ANSHUL</div>
          <div 
            className="text-xl font-bold cursor-pointer " 
            onClick={toggleDrawer}
          >
            ≡
          </div>
        </div>

        {/* Footer positioned absolutely with fixed distance */}
        <footer className="absolute top-[650px] w-full px-16 flex justify-between items-center text-sm syne-m">
          <div >
          <MusicPlayer
            imageUrl="/img/boombox.png"
            audioUrl="/audio/bruno.mp3" // Path to your local MP3 in the public folder
          />
          </div>
          <div className="flex space-x-4 cursor-pointer">
            <a href="https://www.instagram.com/anshulll_" >ig</a>
            <a href="https://www.behance.net/anshulll_" >be</a>
            <a href="https://x.com/anshulll_" >x</a>
          </div>
           
        </footer>
      </nav>

      {/* Drawer Component */}
      <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
};

export default Navbar;
