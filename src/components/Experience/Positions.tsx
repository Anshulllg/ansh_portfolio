'use client'; 
import React, { useState } from 'react';

const skillsData = [
  { year: 'Now', Position: 'Software Developer', company: '', description: 'NebulaIQ' },
  { year: '2024', Position: 'Research Associate', company: '', description: 'Graphics Research Group' },
  { year: '2023', Position: 'Web developer Intern', company: '', description: 'Ihub Anubhuti, IIITD' },
  { year: '2023', Position: 'Research Intern', company: '', description: 'Graphics Research Group' },
  { year: '2022', Position: 'Founding UX/UI Designer', company: '', description: 'Respct'},
  { year: '2021', Position: 'UX/UI Designer', company: '', description: 'Memboro' },
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
      <h2 className="syne text-center text-4xl mb-6 tracking-widest text-red-600">Where I have worked</h2>
      <div className="flex flex-col syne  font-bold w-full text-2xl">
        {skillsData.map((item, index) => (
          <div
            key={index}
            className={`group flex justify-between items-center px-32 ${
              activeSkill === item.Position ? 'bg-orange-600 text-black' : 'text-gray-200'
            } p-5 min-h-[60px]`}
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