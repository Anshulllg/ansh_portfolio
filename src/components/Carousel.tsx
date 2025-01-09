"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const scroller = useRef();
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    let skillSet = gsap.utils.toArray('.skill-set');

    let to = gsap.to(skillSet, {
      xPercent: () => -100 * (skillSet.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: scroller.current,
        markers: false,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        snap: 1 / (skillSet.length - 1),
        end: () => '+=' + window.innerWidth,
        onUpdate: (self) => {
          skillSet.forEach((section, index) => {
            if (self.progress >= index / skillSet.length && self.progress < (index + 1) / skillSet.length) {
              setActiveImage(section.querySelector('img').alt);
            }
          });
        },
      },
    });

    return () => {
      to.kill();
    };
  }, []);

  return (
    <div className="overflow-hidden flex">
      <div className="overflow-hidden">
        <div
          id="skills"
          ref={scroller}
          className="flex overflow-x-hidden overflow-y-hidden text-white w-[200vw] m-0 relative h-screen"
        >
          {['img1', 'img2', 'img3', 'img4'].map((img, idx) => (
            <section
              key={idx}
              className="skill-set px-12 w-screen h-full bg-transparent ns-horizontal-section__item flex items-center z-50"
            >
              <div className="relative w-full h-full">
                <Image
                  src={`/posts/${img}.jpg`}
                  alt={img}
                  layout="fill"
                  objectFit="contain"
                  className="max-w-[70vw] max-h-[40vh] m-auto transform transition-all duration-300 hover:scale-95 hover:opacity-80"
                />
                <div className="absolute inset-0 flex items-center ">
                  <h1
                    className={`text-white syne text-4xl font-bold ${
                      activeImage === img ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-500`}
                  >
                    {img.toUpperCase()}
                  </h1>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

