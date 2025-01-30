"use client";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Testimonial = {
  text: string;
  author: string;
  position: string;
  company: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    text: "the best and he never complains",
    author: "Michael Glass",
    position: "Group Design Director",
    company: "Fantasy Interactive",
    image: "/img/person.png", // Replace with actual image URLs
  },
  {
    text: "This looks amazing. Great work!",
    author: "Sarah Blake",
    position: "Lead Designer",
    company: "BigDesign Inc.",
    image:"/img/person.png",
  },
  {
    text: "Outstanding work, couldn't be happier.",
    author: "Mark Johnson",
    position: "CEO",
    company: "Startup XYZ",
    image: "/img/person.png",
  },
];

const TestimonialSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (testimonialRef.current) {
        const scrollPosition = testimonialRef.current.scrollTop;
        const sectionHeight = testimonialRef.current.scrollHeight / testimonials.length;
        const index = Math.round(scrollPosition / sectionHeight);
        setActiveIndex(index);
      }
    };

    const currentRef = testimonialRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div>
      <h1 className= 'syne text-center text-4xl pt-20 tracking-widest text-red-600'>What People have to say about me</h1>
      <div className= "flex items-center justify-center text-white py-8 px-16">
    
        {/* Testimonial Content */}
        <div
          ref={testimonialRef}
          className="flex-1 h-[500px] overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
          style={{
            scrollBehavior: "smooth",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)",
            maskImage: "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)",
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="snap-start h-[500px] pt-40 items-center justify-center text-center"
            >
              <blockquote className="text-5xl font-semibold syne-m">
                <span className="text-red-500 text-6xl mr-2">“</span>
                {testimonial.text}
              </blockquote>
              <p className="mt-8 text-sm syne-m">{testimonial.author}</p>
              <p className="text-gray-500 text-sm syne-m">
                {testimonial.position}, {testimonial.company}
              </p>
            </div>
          ))}
        </div>

        {/* Side Navigation with Images */}
        <div className="flex flex-col items-center space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative">
              <img
                src={testimonial.image}
                alt={testimonial.author}
                className={cn(
                  "w-16 h-16 rounded-full cursor-pointer",
                  activeIndex === index ? "border-4 border-red-500" : "border-4 border-transparent"
                )}
                onClick={() => {
                  if (testimonialRef.current) {
                    const sectionHeight = testimonialRef.current.scrollHeight / testimonials.length;
                    testimonialRef.current.scrollTo({
                      top: sectionHeight * index,
                      behavior: "smooth",
                    });
                  }
                }}
              />
              {activeIndex === index && (
                <span className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-red-500 text-2xl">
                  &lsaquo;
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default TestimonialSlider;
