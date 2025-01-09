"use client";
import HeroSection from '@/components/hero'
import { GridPatternLinearGradient } from '@/components/hero/GridLayout'
import Navbar from '@/components/Nav/Navbar'
import Skills from '@/components/Skills/Skills'
import Projects from '@/components/Projects'
import React from 'react'
import Experience from '@/components/Experience/Experience'
import { Workx } from '@/components/Experience/Workx'
import Testimony from '@/components/Experience/Testimony'
import MusicPlayer from '@/components/hero/MusicPlayer'
import PointCloud from '@/components/Skills/SkillSphere'
import Carousel from '@/components/Carousel'
import PLYModelViewer from '@/components/hero/Model'
import { useEffect,useRef } from 'react'
import Footer from '@/components/Footer';
import Positions from '@/components/Experience/Positions';

export default function Page() {

  return (

    <div  className=" no-scrollbar h-screen snap-y snap-mandatory overflow-y-scroll">
   
        <Navbar/>

      <div className="snap-start h-screen">
        <HeroSection/>
      </div>
        <GridPatternLinearGradient/>
      <div className="snap-start h-screen">
        <Experience/>
      </div>
      <div className="snap-start h-screen">
        <Positions/>
      </div>
      <div className="snap-start h-screen">
        <PointCloud/>
      </div >
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
        <Footer/>
      </div>

    </div>

  )
}
