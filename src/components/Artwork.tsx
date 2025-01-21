"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { GridPatternLinearGradient } from './hero/GridLayout';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Artwork() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const isAnimating = useRef(false);
  const scrollTimeout = useRef(null);
  
  const images = Array.from({ length: 73 }, (_, i) => `/artworks/artwork (${i + 1}).png`);

  const handleImageClick = (src, idx) => {
    setFullscreenImage({ url: src, index: idx });
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    document.body.style.overflow = 'auto';
  };

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
      
      return () => {
        container.removeEventListener('wheel', handleScroll);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
      };
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (fullscreenImage) {
        if (e.key === 'Escape') {
          closeFullscreen();
        } else if (e.key === 'ArrowRight') {
          const nextIndex = (fullscreenImage.index + 1) % images.length;
          setFullscreenImage({ url: images[nextIndex], index: nextIndex });
        } else if (e.key === 'ArrowLeft') {
          const prevIndex = (fullscreenImage.index - 1 + images.length) % images.length;
          setFullscreenImage({ url: images[prevIndex], index: prevIndex });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenImage, images]);

  return (
    <div className="relative h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 flex justify-center py-8 bg-gradient-to-b from-black to-transparent">
        <h1 className="text-4xl font-bold text-white syne pt-12">My Artworks</h1>
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
        className="absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <GridPatternLinearGradient/>
        <div className="relative w-full h-full flex items-center justify-center">
          {images.map((src, idx) => (
            <div
              key={idx}
              ref={el => imagesRef.current[idx] = el}
              className="absolute w-[70vw] h-[70vh] cursor-pointer flex items-center justify-center"
              onClick={() => handleImageClick(src, idx)}
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

export default Artwork;