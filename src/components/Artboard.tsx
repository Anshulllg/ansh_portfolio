'use client';

import { useState, useEffect, MouseEvent } from 'react';

// Define interface for image
interface ArtworkImage {
  src: string;
  alt: string;
  title: string;
  color: string | null;
}

export default function TalkTalkGallery() {
  const [aimX, setAimX] = useState<number>(0.5);
  const [aimY, setAimY] = useState<number>(0.5);
  const [currentX, setCurrentX] = useState<number>(0.5);
  const [currentY, setCurrentY] = useState<number>(0.5);
  const [images, setImages] = useState<ArtworkImage[]>([]);

  // Generate image paths dynamically
  useEffect(() => {
    const imageCount = 73;
    const generatedImages: ArtworkImage[] = Array.from({ length: imageCount }, (_, i) => ({
      src: `artworks/artwork (${i + 1}).png`,
      alt: `Artwork ${i + 1}`,
      title: `Artwork ${i + 1}`,
      color: getRandomColor()
    }));
    setImages(generatedImages);
  }, []);

  // Random color generator for variety
  function getRandomColor(): string | null {
    const colors = ['blue', 'green', 'yellow', null];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Mouse move handler
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget) {
      setAimX(event.pageX / window.innerWidth);
      setAimY(event.pageY / window.innerHeight);
    }
  };

  // Title and color state
  const [currentTitle, setCurrentTitle] = useState<string>('Talk Talk');
  const [currentColor, setCurrentColor] = useState<string | null>(null);

  // Tween animation effect
  useEffect(() => {
    const tween = () => {
      const newCurrentX = currentX + (aimX - currentX) * 0.2;
      const newCurrentY = currentY + (aimY - currentY) * 0.2;

      setCurrentX(newCurrentX);
      setCurrentY(newCurrentY);

      requestAnimationFrame(tween);
    };

    const animationFrame = requestAnimationFrame(tween);
    
    // Use addEventListener with explicit type
    const mouseMoveHandler = (event: MouseEvent) => {
      setAimX(event.pageX / window.innerWidth);
      setAimY(event.pageY / window.innerHeight);
    };

    window.addEventListener('mousemove', mouseMoveHandler as unknown as EventListener);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', mouseMoveHandler as unknown as EventListener);
    };
  }, [aimX, aimY, currentX, currentY]);

  // Calculate section transform
  const getSectionTransform = () => {
    if (typeof window === 'undefined') return {};

    const sectionElement = document.querySelector('section');
    const sectionWidth = sectionElement?.clientWidth || 0;
    const sectionHeight = sectionElement?.clientHeight || 0;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const sx = sectionWidth - windowWidth;
    const sy = sectionHeight - windowHeight;

    return {
      transform: `translate(${-1 * sx * currentX}px, ${-1 * sy * currentY}px)`
    };
  };

  return (
    <div 
      className={`
        relative overflow-hidden 
        ${currentColor || ''} 
        ${currentTitle !== 'Talk Talk' ? 'hovered' : ''}
      `}
      onMouseMove={handleMouseMove}
    >
      <h1 className="fixed top-4 left-4 z-50 text-2xl font-bold">
        {currentTitle}
      </h1>

      <section 
        className="flex flex-row flex-wrap absolute top-0 left-0 w-full"
        style={getSectionTransform()}
      >
        {images.map((image, index) => (
          <a 
            key={index} 
            href="#" 
            className="block relative w-1/6 aspect-square hover:opacity-80 transition-opacity"
            onMouseEnter={() => {
              setCurrentTitle(image.title);
              setCurrentColor(image.color || null);
            }}
            onMouseLeave={() => {
              setCurrentTitle('Talk Talk');
              setCurrentColor(null);
            }}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </a>
        ))}
      </section>
    </div>
  );
}