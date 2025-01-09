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
import ThreeJSScene from '@/components/PointCloud'
import EqualizerScene from '@/components/PointCloud'
import PointCloud from '@/components/PointCloud'
import Carousel from '@/components/Carousel'
// import ProjectPage from '@/components/ProjectPage'

export default function Page() {
  return (
    <div className="no-scrollbar h-screen snap-y snap-mandatory overflow-y-scroll">
   
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
      {/* <div className="snap-start h-screen">
        <PointCloud/>
      </div > */}
      {/* <div className="snap-start h-screen">
        <Carousel/>
      </div > */}

    </div>
  )
}
