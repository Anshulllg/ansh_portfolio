"use client";
import React, { useState, useRef, useEffect } from "react";

interface MusicPlayer {
  audioUrl: string;
}

const MusicPlayerProps: React.FC<MusicPlayer> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(true); // Changed to true for default playing
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3; // Set volume to 30%
      audio.play().catch(error => {
        // Handle any autoplay restrictions
        console.log("Autoplay prevented:", error);
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-16 h-16">
      <audio ref={audioRef} src={audioUrl} />
      <div 
        onClick={togglePlayPause}
        className="cursor-pointer w-full h-full"
      >
        <svg 
          viewBox="0 0 80 60" 
          className="w-full h-full"
        >
          {/* Wave/Line */}
          {isPlaying ? (
            <path
              d="M 20 30 Q 30 20, 40 30 Q 50 40, 60 30"
              stroke="white"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              className="animate-traveling-wave"
            >
              {/* Add animation for traveling wave effect */}
              <animate
                attributeName="d"
                values="
                M 20 30 Q 30 20 40 30 Q 50 40 60 30;
                M 20 28 Q 30 32 40 35 Q 50 32 60 28;
                M 20 30 Q 30 40 40 30 Q 50 20 60 30;
                M 20 32 Q 30 28 40 25 Q 50 28 60 32;
                M 20 30 Q 30 20 40 30 Q 50 40 60 30;
              "
              
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="transform"
                values="translate(0 0); translate(4 0); translate(0 0)"
                dur="1s"
                repeatCount="indefinite"
                additive="sum"
              />
            </path>
          ) : (
            <line
              x1="20"
              y1="30"
              x2="60"
              y2="30"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          )}
        </svg>
      </div>
    </div>
  );
};

export default MusicPlayerProps;