import React, { useEffect, useState } from "react";

const words = [
  "Creative",
  "Innovative",
  "Detail-oriented",
  "Visionary",
  "Collaborative",
  "Versatile",
  "Passionate",
  "Adaptable",
  "Inspiring",
  "Analytical",
  "Creative",
  "Innovative",
  "Detail-oriented",
  "Visionary",
  "Collaborative",
  "Versatile",
  "Passionate",
  "Adaptable",
  "Inspiring",
  "Analytical",
];

const LoadingScreen = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Word cycling effect
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 70);

    // Progress bar effect
    const startTime = Date.now();
    const duration = 3000; // 3 seconds to match your layout timer

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      
      setLoadingProgress(progress);

      if (progress === 100) {
        clearInterval(progressInterval);
      }
    }, 16); // Approximately 60fps

    // Cleanup function
    return () => {
      clearInterval(wordInterval);
      clearInterval(progressInterval);
    };
  }, []); // Empty dependency array so it only runs once

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <h1 className="text-8xl text-black syne font-bold text-center transition-opacity duration-100">
        {words[currentWordIndex]}
      </h1>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-1/2">
        <div className="relative w-full bg-gray-200 rounded-full h-2">
          <div
            className="absolute top-0 left-0 h-full bg-black rounded-full transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <p className="text-center syne text-black">{loadingProgress}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;