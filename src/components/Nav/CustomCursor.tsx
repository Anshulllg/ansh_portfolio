"use client";

import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [circleX, setCircleX] = useState(0);
  const [circleY, setCircleY] = useState(0);
  const [dotX, setDotX] = useState(0);
  const [dotY, setDotY] = useState(0);

  const speed = 0.3; // Outer circle speed
  const dotSpeed = 0.4; // Inner dot speed

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      setCircleX((prevX) => {
        const distanceX = mouseX - prevX;
        return prevX + distanceX * speed;
      });
      setCircleY((prevY) => {
        const distanceY = mouseY - prevY;
        return prevY + distanceY * speed;
      });

      setDotX((prevX) => {
        const distanceX = mouseX - prevX;
        return prevX + distanceX * dotSpeed;
      });
      setDotY((prevY) => {
        const distanceY = mouseY - prevY;
        return prevY + distanceY * dotSpeed;
      });

      requestAnimationFrame(animate);
    };

    animate(); // Start animation loop

  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer Circle */}
      <div
        className="fixed top-0 left-0 z-40 pointer-events-none rounded-full bg-white bg-opacity-20 mix-blend-difference"
        style={{
          width: "40px", // Outer circle size
          height: "40px",
          transform: `translate(${circleX - 25}px, ${circleY - 25}px)`, // Adjust for circle size
        }}
      ></div>

      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 z-50 pointer-events-none rounded-full bg-white mix-blend-difference"
        style={{
          width: "8px", // Inner dot size
          height: "8px",
          transform: `translate(${dotX - 5}px, ${dotY - 5}px)`, // Adjust for dot size
        }}
      ></div>
    </>
  );
};

export default CustomCursor;
