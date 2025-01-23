"use client";
import { useEffect, useRef, useState, createRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { GridPatternLinearGradient } from './hero/GridLayout';

gsap.registerPlugin(ScrollTrigger);


interface Project {
  id: number;
  name: string;
  image: string;
  url: string;
}

export function TechProjects() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<React.RefObject<HTMLDivElement>[]>([]);
  const isAnimating = useRef<boolean>(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      name: "Lumobius",
      image: "/assets/des1.png",
      url: "https://www.behance.net/gallery/213666713/Lumobius"
    },
    {
      id: 2,
      name: "Vaatika",
      image: "/assets/des2.png",
      url: "https://www.behance.net/gallery/195203061/Vaatika-Discover-nearby-parks-explore-nature"
    },
    {
      id: 3,
      name: "Architectural Visualisation",
      image: "/assets/des3.png",
      url: "https://www.behance.net/gallery/213727677/Architectural-Visualisation"
    },
    {
      id: 4,
      name: "Pen Sketches",
      image: "/assets/des4.png",
      url: "https://www.behance.net/gallery/213748905/Pen-Sketches"
    },
    {
      id: 5,
      name: "DPP Journal",
      image: "/assets/des5.png",
      url: "https://www.behance.net/gallery/156439871/Design-Processes-and-Perspectives-Journal"
    },
    {
      id: 6,
      name: "Astrella",
      image: "/assets/des6.png",
      url: "https://www.behance.net/gallery/144898663/Astrella"
    },
    {
      id: 7,
      name: "Ornithopter",
      image: "/assets/des7.png",
      url: "https://www.behance.net/gallery/213742937/Ornithopter"
    },
    {
      id: 8,
      name: "Ornithopter",
      image: "/assets/des8.png",
      url: "https://www.behance.net/gallery/144899303/Pawriwar-Website-design"
    }
  ];

  useEffect(() => {
    imagesRef.current = Array(projects.length)
      .fill(null)
      .map(() => createRef<HTMLDivElement>());
  }, [projects.length]);

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank');
  };

  const animateToIndex = (index: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const newIndex = (index + projects.length) % projects.length;
    setCurrentIndex(newIndex);

    const timeline = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      }
    });

    const prevIndex = (newIndex - 1 + projects.length) % projects.length;
    const nextIndex = (newIndex + 1) % projects.length;

    imagesRef.current.forEach((imgRef, idx) => {
      const img = imgRef.current;
      if (img && idx !== prevIndex && idx !== newIndex && idx !== nextIndex) {
        gsap.set(img, { xPercent: idx > newIndex ? 100 : -100, opacity: 0, scale: 0.7 });
      }
    });

    timeline
      .to(imagesRef.current[currentIndex].current, {
        xPercent: index > currentIndex ? -100 : 100,
        scale: 0.7,
        opacity: 0.5,
        duration: 0.8,
        ease: "power2.inOut"
      })
      .to(imagesRef.current[newIndex].current, {
        xPercent: 0,
        scale: 0.7,
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut"
      }, "<")
      .to(imagesRef.current[prevIndex].current, {
        xPercent: -70,
        scale: 0.7,
        opacity: 0.5,
        duration: 0.8,
        ease: "power2.inOut"
      }, "<")
      .to(imagesRef.current[nextIndex].current, {
        xPercent: 70,
        scale: 0.7,
        opacity: 0.5,
        duration: 0.8,
        ease: "power2.inOut"
      }, "<");
  };

  const goToNext = () => {
    if (!isAnimating.current) {
      animateToIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (!isAnimating.current) {
      animateToIndex(currentIndex - 1);
    }
  };

  const handleScroll = (e: WheelEvent) => {
    e.preventDefault();
    
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      const deltaY = e.deltaY;
      const scrollThreshold = 50;

      if (Math.abs(deltaY) > scrollThreshold) {
        if (deltaY < 0) {
          goToPrev();
        } else {
          goToNext();
        }
      }
    }, 50);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll as EventListener, { passive: false });
      
      return () => {
        container.removeEventListener('wheel', handleScroll as EventListener);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
      };
    }
  }, [currentIndex]);

  return (
    <div className="relative h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 flex justify-center py-8 bg-gradient-to-b from-black to-transparent">
        <h1 className="text-4xl font-bold text-white syne pt-12">My Design Works</h1>
      </div>

      <div 
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <GridPatternLinearGradient/>
        <div className="relative w-full h-full flex items-center justify-center">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              ref={imagesRef.current[idx]}
              className="absolute w-[70vw] h-[70vh] cursor-pointer flex items-center justify-center flex-col"
              onClick={() => handleProjectClick(project.url)}
            >
              <img
                src={project.image}
                alt={project.name}
                className="max-w-full max-h-[60vh] object-contain mb-4"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={goToPrev}
        className="fixed left-8 top-3/4 transform -translate-y-1/2 text-white p-4 rounded-full hover:opacity-60 z-10">
        <img
          src="/assets/left.svg"
          alt="button"
          className="w-10 h-10"
        />
      </button>
      <button
        onClick={goToNext}
        className="fixed right-8 top-3/4 transform -translate-y-1/2 text-white p-4 rounded-full hover:opacity-60 z-10">
        <img
          src="/assets/right.svg"
          alt="button"
          className="w-10 h-10"
        />
      </button>
    </div>
  );
}

export default TechProjects;