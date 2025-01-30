"use client";
import HeroSection from '@/components/hero'
import { GridPatternLinearGradient } from '@/components/hero/GridLayout'
import Navbar from '@/components/Nav/Navbar'
import Skills from '@/components/Skills/Skills'
import Projects from '@/components/Projects'
import React from 'react'
import Experience from '@/components/Experience/Experience'
import Testimony from '@/components/Experience/Testimony'
import PointCloud from '@/components/Skills/SkillSphere'
import Footer from '@/components/Nav/Footer';
import Positions from '@/components/Experience/Positions';
import About from '@/components/About';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    // Check if there's a hash in the URL
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);
  return (

    <div  className=" no-scrollbar h-screen snap-y snap-mandatory overflow-y-scroll">
        <Navbar/>

      <div className="snap-start h-screen">
        <HeroSection/>
      </div>
        <GridPatternLinearGradient/>
      <div id="about" className="snap-start h-screen">
        <About/>
      </div>
      <div className="snap-start h-screen">
        <Experience/>
      </div>
      <div className="snap-start h-screen">
        <Positions/>
      </div>
      <div id="skills" className="snap-start h-screen">
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
