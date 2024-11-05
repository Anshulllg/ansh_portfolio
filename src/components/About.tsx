import React from 'react';

const About = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen ">
      {/* Left side image */}
      <div className="w-1/4">
        <img
          src="/img/Hero.png" // Correct path relative to the public folder
          alt="Anshul"
          width={200}
          height={600}
        />
      </div>

      <div className=" text-left">
        <div className="text-red-600 text-4xl font-bold mb-6 syne">
          HEY! I'M ANSHUL
       
        </div>
        <div className="text-red-600 text-4xl font-bold mb-6 syne">
          DESIGNER & PROGRAMMER <br /> BASED IN DELHI

        </div>
        <p className="text-gray-300 text-sm syne-m">
          Hey I'm Anshul and I'm creating a portfolio website for myself. <br />
          You can view all my code and design projects below.
        </p>
      </div>
    </div>
  );
};

export default About;
