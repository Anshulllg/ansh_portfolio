"use client";
import React, { useState } from 'react';

interface CarouselItem {
  id: number;
  title: string;
  image: string;
}

const carouselItems: CarouselItem[] = [
  { id: 1, title: 'kurbos magazine', image: '/img/projectt.avif' },
  { id: 2, title: 'other magazine', image: 'path_to_image_2' },
  { id: 3, title: 'another project', image: 'path_to_image_3' },
];

const  ProjectPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-80 flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute transition-all duration-500 ease-in-out transform ${
              index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{
              display: index === currentIndex ? 'block' : 'none',
            }}
          >
            <div className="relative w-full h-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-90"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-start p-8">
                <h2 className="text-6xl font-bold text-white transition-all duration-500 ease-in-out hover:font-outline-1">
                  {item.title}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Previous/Next controls */}
      <button
        onClick={goToPreviousSlide}
        className="absolute left-0 p-2 bg-gray-900 bg-opacity-50 hover:bg-opacity-75 text-white"
      >
        Prev
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-0 p-2 bg-gray-900 bg-opacity-50 hover:bg-opacity-75 text-white"
      >
        Next
      </button>
    </div>
  );
};

export default  ProjectPage;
