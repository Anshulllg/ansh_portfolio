// import React from 'react'

// export default function Projects() {
//   return (
//     <div className="max-w-7xl mx-auto flex flex-col items-start text-red-600 py-10 z-40 ">
//       <h1 className="syne text-center text-4xl mb-10 tracking-widest text-red-600">PROJECTS</h1>

//       <div className="space-y-6 w-full">
//         {/* Project 01 */}
//         <div className="flex items-center w-full cursor-pointer hover:text-white group">
//           <p className="syne text-7xl font-bold text-red-600 w-20 mr-36 group-hover:text-white">
//             01
//           </p>
//           <div className="relative img-hover flex-grow h-40 flex items-center  px-10 rounded-lg overflow-hidden group-hover:text-white">
//             <img 
//               src="/img/project.png" 
//               alt="Project 01" 
//               className="object-cover w-full h-full" 
//             />
//             <p className="absolute syne right-20 text-4xl font-bold z-10  text-[#868686] group-hover:text-white">
//               TECH
//             </p>
//           </div>
//         </div>

//         {/* Project 02 */}
//         <div className="flex items-center w-full cursor-pointer hover:text-white group">
//           <p className="syne text-7xl font-bold text-red-600 w-20 mr-36 group-hover:text-white">
//             02
//           </p>
//           <div className="relative img-hover flex-grow h-40 flex items-center  px-10 rounded-lg overflow-hidden group-hover:text-white">
//             <img 
//               src="/img/project.png" 
//               alt="Project 02" 
//               className="object-cover w-full h-full" 
//             />
//             <p className="absolute syne right-20 text-4xl font-bold z-10 text-[#868686] group-hover:text-white">
//               DESIGN
//             </p>
//           </div>
//         </div>

//         {/* Project 03 */}
//         <div className="flex items-center w-full cursor-pointer hover:text-white group">
//           <p className="syne text-7xl font-bold text-red-600 w-20 mr-36 group-hover:text-white">
//             03
//           </p>
//           <div className="relative img-hover flex-grow h-40 flex items-center  px-10 rounded-lg overflow-hidden group-hover:text-white ">
//             <img 
//               src="/img/project.png" 
//               alt="Project 03" 
//               className="object-cover w-full h-full " 
//             />
//             <p className="absolute syne text-4xl font-bold z-10 right-20 text-[#868686] group-hover:text-white">
//               SKETCHES
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import React from 'react';
import Link from 'next/link';  // Import the Link component from Next.js

export default function Projects() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-start text-red-600 py-10 z-40 ">
      <h1 className="syne text-center text-4xl mb-10 tracking-widest text-red-600">PROJECTS</h1>

      <div className="space-y-6 w-full">
        {/* Project 01 */}
        <div className="flex items-center w-full cursor-pointer hover:text-white group">
          <p className="syne text-7xl font-bold text-red-600 w-20 mr-36 group-hover:text-white">
            01
          </p>
          <div className="relative img-hover flex-grow h-40 flex items-center  px-10 rounded-lg overflow-hidden group-hover:text-white">
            <img 
              src="/img/project.png" 
              alt="Project 01" 
              className="object-cover w-full h-full" 
            />
            <p className="absolute syne right-20 text-4xl font-bold z-10  text-[#868686] group-hover:text-white">
              TECH
            </p>
          </div>
        </div>

        {/* Project 02 */}
        <div className="flex items-center w-full cursor-pointer hover:text-white group">
          <p className="syne text-7xl font-bold text-red-600 w-20 mr-36 group-hover:text-white">
            02
          </p>
          <div className="relative img-hover flex-grow h-40 flex items-center  px-10 rounded-lg overflow-hidden group-hover:text-white">
            <img 
              src="/img/project.png" 
              alt="Project 02" 
              className="object-cover w-full h-full" 
            />
            <Link href="/projectspage">
              <p className="absolute syne right-20 text-4xl font-bold z-10 text-[#868686] group-hover:text-white">
                DESIGN
              </p>
            </Link>
           
          </div>
        </div>

        {/* Project 03 */}
        <div className="flex items-center w-full cursor-pointer hover:text-white group">
          <p className="syne text-7xl font-bold text-red-600 w-20 mr-36 group-hover:text-white">
            03
          </p>
          <div className="relative img-hover flex-grow h-40 flex items-center  px-10 rounded-lg overflow-hidden group-hover:text-white ">
            <img 
              src="/img/project.png" 
              alt="Project 03" 
              className="object-cover w-full h-full " 
            />
            {/* Wrap the SKETCHES text in a Link component */}
            <Link href="/Carousel">  {/* Assuming the route is /sketchpage */}
              <p className="absolute syne text-4xl font-bold z-10 right-20 text-[#868686] group-hover:text-white">
                SKETCHES
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
