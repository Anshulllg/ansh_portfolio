'use client'; 

import React, { useState } from 'react';

const skillsData = [
  { year: 'Now', Position: 'Self-lead Designer', company: 'Fantasy Interactive', description: 'Hello' },
  { year: '2016', Position: 'Senior Product Designer', company: 'Interactive Labs', description: 'Hello' },
  { year: '2012', Position: 'Art Director', company: 'DR Com Group', description: 'Hello'},
  { year: '2009', Position: 'Flash Designer', company: 'DR Com Group', description: 'Hello' },
];

const Positions: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const handleMouseEnter = (skill: string) => {
    setActiveSkill(skill);
  };

  const handleMouseLeave = () => {
    setActiveSkill(null);
  };

  return (
    <div className="mx-auto flex flex-col justify-center items-center text-white py-20">
      <h2 className="syne text-center text-4xl mb-10 tracking-widest text-red-600">Where I have worked</h2>
      <div className="flex flex-col syne test-6xl font-bold w-full text-4xl">
        {skillsData.map((item, index) => (
          <div
            key={index}
            className={`group flex justify-between items-center px-32 ${
              activeSkill === item.Position ? 'bg-orange-600 text-black' : 'text-gray-200'
            } p-8 min-h-[100px]`}
            onMouseEnter={() => handleMouseEnter(item.Position)}
            onMouseLeave={handleMouseLeave}
          >
            <div>
              <span className="font-bold group-hover:text-black">{item.year}</span>
            </div>
            <div className="text-right">
              <span className="group-hover:text-black">{item.Position}</span>
              <div className="text-sm opacity-100">
                {item.company}
              </div>
            </div>
            <div className="text-sm opacity-100">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Positions;