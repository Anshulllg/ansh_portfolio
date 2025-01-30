'use client'; 
import React, { useState } from 'react';
import { Workx } from './Workx';

const skillsData = [
  { year: 'Now', Position: 'Software Developer', company: 'NebulaIQ', description: 'Working on advanced AI solutions.' },
  { year: '2024', Position: 'Research Associate', company: 'Graphics Research Group', description: 'Exploring graphical computations and design.' },
  { year: '2023', Position: 'Web Developer Intern', company: 'Ihub Anubhuti, IIITD', description: 'Developed dynamic web applications.' },
  { year: '2023', Position: 'Research Intern', company: 'Graphics Research Group', description: 'Conducted research on graphical technologies.' },
  { year: '2022', Position: 'Founding UX/UI Designer', company: 'Respct', description: 'Designed user experiences for new platforms.' },
  { year: '2021', Position: 'UX/UI Designer', company: 'Memboro', description: 'Enhanced UI/UX for digital platforms.' },
];

const Positions: React.FC = () => {
  const [hoveredPosition, setHoveredPosition] = useState<string | null>(null);

  const handleMouseEnter = (position: string) => {
    setHoveredPosition(position);
  };

  const handleMouseLeave = () => {
    setHoveredPosition(null);
  };

  return (
    <div className="mx-auto flex flex-col justify-center items-center text-white py-20">
      <h2 className="syne text-center text-4xl mb-6 tracking-widest text-red-600">Where I have worked</h2>
      <div className="flex flex-col syne font-bold w-full text-2xl">
        {skillsData.map((item, index) => (
          <div
            key={index}
            className={`group flex items-center px-32 ${
              hoveredPosition === item.Position ? 'bg-orange-600 text-black' : 'text-gray-200'
            } p-5 min-h-[80px]`}
            onMouseEnter={() => handleMouseEnter(item.Position)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Year Section */}
            <div className="w-1/5">
              <span className="font-bold">{item.year}</span>
            </div>

            {/* Position Section */}
            <div className="w-2/5">
              <span>{item.Position}</span>
            </div>

            {/* Company or Description Section */}
            <div className="w-2/5 text-sm ml-auto text-right">
              {hoveredPosition === item.Position ?  item.description :item.company }
            </div>
          </div>
        ))}
      </div>
      <div className='pt-5'>
          <Workx/>
      </div>
    </div>
  );
};

export default Positions;
