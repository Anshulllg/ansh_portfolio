// import HeroSection from '@/components/hero'
// import { GridPatternLinearGradient } from '@/components/hero/GridLayout'
// import Navbar from '@/components/Nav/Navbar'
// import Skills from '@/components/Skills'
// import Projects from '@/components/Projects'
// import React from 'react'
// import Experience from '@/components/Experience/Experience'
// import { Workx } from '@/components/Experience/Workx'
// import Testimony from '@/components/Experience/Testimony'
// import MusicPlayer from '@/components/hero/MusicPlayer'
// // import ProjectPage from '@/components/ProjectPage'

// export default function page() {
//   return (
//     <div>
//       <Navbar/>
//       <HeroSection/>
//       <GridPatternLinearGradient/>
//       <Experience/>
//       <Workx/>
//       <Skills/>
//       <Projects/>
//       <Testimony/>
//       {/* <ProjectPage/> */}

//     </div>
//   )
// }


import HeroSection from '@/components/hero'
import { GridPatternLinearGradient } from '@/components/hero/GridLayout'
import Navbar from '@/components/Nav/Navbar'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import React from 'react'
import Experience from '@/components/Experience/Experience'
import { Workx } from '@/components/Experience/Workx'
import Testimony from '@/components/Experience/Testimony'
import MusicPlayer from '@/components/hero/MusicPlayer'
import ThreeJSScene from '@/components/EqualizerScene'
import EqualizerScene from '@/components/EqualizerScene'
// import ProjectPage from '@/components/ProjectPage'

export default function Page() {
  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
   
        <Navbar/>

      <div className="snap-start h-screen">
        <HeroSection/>
      </div>
        <GridPatternLinearGradient/>
      <div className="snap-start h-screen">
        <Experience/>
      </div>

      <div className="snap-start h-screen">
        <Skills/>
      </div>
      <div className="snap-start h-screen">
        <Projects/>
      </div>
      <div className="snap-start h-screen">
        <Testimony/>
      </div>
      <div className="snap-start h-screen">
        <EqualizerScene/>
      </div>
      {/* <ProjectPage/> */}
    </div>
  )
}
