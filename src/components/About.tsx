import React from 'react';

const About = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      {/* Container for the image */}
      <div className="w-2/4 flex items-center justify-center">
        <img
          src="/img/Hero.png"
          alt="Anshul"
          width={450}
          height={450}
        />
      </div>

      {/* Text section */}
      <div className="w-2/4 text-left">
        <div className="text-red-600 text-3xl font-bold mb-2 syne">
          HEY!
        </div>
        <div className="text-red-600 text-5xl font-bold mb-12 syne">
        I'M ANSHUL
        </div>
        <p className="text-gray-300 text-sm syne-m mr-20">
        An XR Designer, Developer, and Mentor based in Delhi. My journey into immersive technologies began with a passion for game design and its ability to create engaging, transformative experiences. Over time, this interest evolved into a focus on XR, where I now specialize in crafting interactive solutions that merge creativity with immersive technologies.

        </p>
      </div>
    </div>
  );
};

export default About;
