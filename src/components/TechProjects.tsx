// "use client";
// import { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/dist/ScrollTrigger';
// import { GridPatternLinearGradient } from './hero/GridLayout';

// gsap.registerPlugin(ScrollTrigger);

// function App() {
//   const scroller = useRef();
//   const [activeImage, setActiveImage] = useState(null);

//   useEffect(() => {
//     let skillSet = gsap.utils.toArray('.skill-set');

//     let to = gsap.to(skillSet, {
//       xPercent: () => -100 * (skillSet.length - 1),
//       ease: 'none',
//       scrollTrigger: {
//         trigger: scroller.current,
//         markers: false,
//         pin: true,
//         pinSpacing: true,
//         scrub: 1,
//         invalidateOnRefresh: true,
//         anticipatePin: 1,
//         snap: 1 / (skillSet.length - 1),
//         end: () => '+=' + window.innerWidth,
//         onUpdate: (self) => {
//           skillSet.forEach((section, index) => {
//             if (self.progress >= index / skillSet.length && self.progress < (index + 1) / skillSet.length) {
//               setActiveImage(section.querySelector('img').alt);
//             }
//           });
//         },
//       },
//     });

//     return () => {
//       to.kill();
//     };
//   }, []);

//   return (
//     <div className="relative">
//       {/* Fixed header container */}
//       <div className="fixed top-0 left-0 right-0 z-0 flex justify-center py-8 bg-gradient-to-b from-black to-transparent">
//         <h1 className="text-4xl font-bold text-white syne pt-12">Tech Projects</h1>
//       </div>

//       {/* Main content container */}
//       <div className="overflow-hidden">
//         <div
//           id="skills"
//           ref={scroller}
//           className="flex overflow-x-hidden overflow-y-hidden text-white w-[200vw] m-0 relative h-screen"
//         >
//           <GridPatternLinearGradient/>
//           {['img1', 'img2', 'img3', 'img4'].map((img, idx) => (
//             <section
//               key={idx}
//               className="skill-set px-12 w-screen h-full bg-transparent ns-horizontal-section__item flex items-center z-40"
//             >
//               <div className="relative w-full h-full">
//                 <Image
//                   src={`/posts/${img}.jpg`}
//                   alt={img}
//                   layout="fill"
//                   objectFit="contain"
//                   className="max-w-[70vw] max-h-[40vh] m-auto transform transition-all duration-300"
//                 />
//                 <div className="absolute inset-0 flex items-center ">
//                   <h1
//                     className={`text-white syne text-4xl font-bold ${
//                       activeImage === img ? "opacity-100" : "opacity-0"
//                     } transition-opacity duration-500`}
//                   >
//                     {img.toUpperCase()}
//                   </h1>
//                 </div>
//               </div>
//             </section>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { GridPatternLinearGradient } from './hero/GridLayout';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function TechProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const isAnimating = useRef(false);
  const scrollTimeout = useRef(null);
  const dragStart = useRef(0);
  const dragStartX = useRef(0);
  
  const images = Array.from({ length: 4 }, (_, i) => `/artworks/artwork (${i + 1}).png`);

  const animateToIndex = (index) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const newIndex = (index + images.length) % images.length;
    setCurrentIndex(newIndex);

    const timeline = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      }
    });

    const prevIndex = (newIndex - 1 + images.length) % images.length;
    const nextIndex = (newIndex + 1) % images.length;

    imagesRef.current.forEach((img, idx) => {
      if (idx !== prevIndex && idx !== newIndex && idx !== nextIndex) {
        gsap.set(img, { xPercent: idx > newIndex ? 100 : -100, opacity: 0, scale: 0.7 });
      }
    });

    timeline
      .to(imagesRef.current[currentIndex], {
        xPercent: index > currentIndex ? -100 : 100,
        scale: 0.7,
        opacity: 0.5,
        duration: 0.8,
        ease: "power2.inOut"
      })
      .to(imagesRef.current[newIndex], {
        xPercent: 0,
        scale: 0.7,
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut"
      }, "<")
      .to(imagesRef.current[prevIndex], {
        xPercent: -70,
        scale: 0.7,
        opacity: 0.5,
        duration: 0.8,
        ease: "power2.inOut"
      }, "<")
      .to(imagesRef.current[nextIndex], {
        xPercent: 70,
        scale: 0.7,
        opacity: 0.5,
        duration: 0.8,
        ease: "power2.inOut"
      }, "<");
  };

  const handleDragStart = (e) => {
    if (isAnimating.current) return;
    setIsDragging(true);
    dragStart.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    dragStartX.current = currentIndex;
    
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('touchend', handleDragEnd);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    const currentPosition = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const difference = dragStart.current - currentPosition;
    const dragThreshold = window.innerWidth * 0.2;

    if (Math.abs(difference) > dragThreshold) {
      if (difference > 0) {
        goToNext();
      } else {
        goToPrev();
      }
      handleDragEnd();
    } else {
      // Show drag preview animation
      const dragPercent = (difference / dragThreshold) * 70;
      gsap.to(imagesRef.current[currentIndex], {
        xPercent: -dragPercent,
        duration: 0.1,
        ease: "none"
      });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Reset position if not triggering navigation
    gsap.to(imagesRef.current[currentIndex], {
      xPercent: 0,
      duration: 0.3,
      ease: "power2.out"
    });
    
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('touchend', handleDragEnd);
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

  const handleScroll = (e) => {
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
      container.addEventListener('wheel', handleScroll, { passive: false });
      container.addEventListener('mousedown', handleDragStart);
      container.addEventListener('touchstart', handleDragStart);
      
      return () => {
        container.removeEventListener('wheel', handleScroll);
        container.removeEventListener('mousedown', handleDragStart);
        container.removeEventListener('touchstart', handleDragStart);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
      };
    }
  }, [currentIndex]);

  // Rest of your component remains the same...
  return (
    <div className="relative h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 flex justify-center py-8 bg-gradient-to-b from-black to-transparent">
        <h1 className="text-4xl font-bold text-white syne pt-12">My Tech Projects</h1>
      </div>

      {fullscreenImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button 
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20"
          >
            <X size={32} />
          </button>
          <div className="relative w-[90vw] h-[90vh]">
            <img
              src={fullscreenImage.url}
              alt={`Artwork ${fullscreenImage.index + 1}`}
              className="w-full h-full object-contain cursor-pointer"
            />
          </div>
        </div>
      )}

      <div 
        ref={containerRef}
        className={`absolute inset-0 flex items-center justify-center overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <GridPatternLinearGradient/>
        <div className="relative w-full h-full flex items-center justify-center">
          {images.map((src, idx) => (
            <div
              key={idx}
              ref={el => imagesRef.current[idx] = el}
              className="absolute w-[70vw] h-[70vh] cursor-pointer flex items-center justify-center"
              onClick={() => !isDragging && handleImageClick(src, idx)}
            >
              <img
                src={src}
                alt={`Artwork ${idx + 1}`}
                className="max-w-full max-h-[60vh] object-contain"
                draggable="false"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-white syne text-4xl font-bold opacity-0 hover:opacity-100 transition-opacity">
                  Artwork {idx + 1}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={goToPrev}
        className="fixed left-8 top-3/4 transform -translate-y-1/2 text-white p-4 rounded-full  hover:opacity-60 z-10"
      >
        <img
        src="/assets/left.svg"
        alt="button"
        className="w-10 h-10"
        />

      </button>
      <button
        onClick={goToNext}
        className="fixed right-8 top-3/4 transform -translate-y-1/2 text-white p-4 rounded-full  hover:opacity-60 z-10"
      >
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