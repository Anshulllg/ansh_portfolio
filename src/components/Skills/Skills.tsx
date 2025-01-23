'use client'; 

import React, { useState } from 'react';

const skillsData = [
  { skill: 'XR Design', description: '3D modeling and animation' },
  { skill: 'XR Development', description: '3D modeling and animation' },
  { skill: 'Mentor', description: '3D modeling and animation' },
  { skill: 'Software Development', description: '3D modeling and animation' },
  { skill: 'Research', description: '3D modeling and animation' },
];

const Skills: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const handleMouseEnter = (skill: string) => {
    setActiveSkill(skill);
  };

  const handleMouseLeave = () => {
    setActiveSkill(null);
  };

  return (
    <div className="mx-auto flex flex-col justify-center items-center  text-white py-20">
      <h2 className="syne text-center text-4xl mb-10 tracking-widest text-red-600 ">WHAT I DO</h2>
      <div className="flex flex-col syne test-6xl font-bold w-full  text-4xl ">
        {skillsData.map((item) => (
            <div
            key={item.skill}
            className={`group flex justify-between items-center px-32 ${
              activeSkill === item.skill ? 'bg-orange-600 text-black' : 'text-gray-200'
            } p-8 min-h-[100px]`}
            onMouseEnter={() => handleMouseEnter(item.skill)}
            onMouseLeave={handleMouseLeave}
          >
            <span className=" group-hover:text-black">
              {item.skill}
            </span>

           
            {activeSkill === item.skill && (
              <span className="text-sm text-right w-1/4  opacity-100">
                {item.description}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
