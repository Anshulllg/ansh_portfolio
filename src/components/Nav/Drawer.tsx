import React from 'react';
import Link from 'next/link'; // Import Link from Next.js

interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, toggleDrawer }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full bg-black bg-opacity-90 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-500 ease-in-out z-30`}
    >
      <div 
        className="absolute top-4 right-4 text-white text-4xl cursor-pointer"
        onClick={toggleDrawer}
      >
        &times;
      </div>

      <div className="flex flex-col items-end justify-center h-full text-9xl space-y-8 pr-32 syne-m" style={{ color: '#404040' }}>
        <Link href="/about" className="flex items-baseline hover:text-white transform hover:-translate-x-1 transition duration-300">
          about
          <div className='text-sm  syne pl-10 '> 01</div>
        </Link>
        <Link href="/skills" className="flex items-baseline hover:text-white transform hover:-translate-x-1 transition duration-300">
          skills
          <div className='text-sm pl-10 syne'> 02</div>
        </Link>
        <Link href="/projectspage" className="flex items-baseline hover:text-white transform hover:-translate-x-1 transition duration-300">
          projects
          <div className='text-sm pl-10 syne'> 03</div>
        </Link>
        <Link href="/sketchespage" className="flex items-baseline hover:text-white transform hover:-translate-x-1 transition duration-300">
          artworks
          <div className='text-sm pl-10 syne'> 04</div>
        </Link>
        {/* <Link href="/godplay" className="flex items-baseline hover:text-white transform hover:-translate-x-1 transition duration-300"> */}
          {/* God's playground
          <div className='text-sm pl-10 syne'> 04</div>
        </Link> */}
      </div>
    </div>
  );
};

export default Drawer;
