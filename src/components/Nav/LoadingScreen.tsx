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
    // Change word every 10 milliseconds
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 70); 

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval); // Clear interval when progress reaches 100
          return 100;
        }
        return prevProgress + 1;
      });
    }, 50); 

    return () => {
      clearInterval(wordInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <h1 className="text-8xl text-black syne font-bold text-center transition-opacity duration-0.1">
        {words[currentWordIndex]}
      </h1>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-1/2">
        <div className="relative w-full bg-gray-200 rounded-full h-2">
          <div
            className="absolute top-0 left-0 h-full bg-black rounded-full transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <p className="text-center syne text-black">{loadingProgress}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
