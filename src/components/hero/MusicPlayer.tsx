"use client";
import React, { useState, useRef, useEffect } from "react";

interface MusicPlayerProps {
  imageUrl: string;
  audioUrl: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ imageUrl, audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateProgress = () => {
        setProgress((audio.currentTime / audio.duration) * 100);
      };
      audio.addEventListener("timeupdate", updateProgress);

      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
      };
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
    <div
      className="flex items-center p-4 rounded-lg transition-all duration-300"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.24)", // White with 24% opacity
        width: "160px",
        height: "50px",
      }}
    >
      <audio ref={audioRef} src={audioUrl}></audio>
      <div className="flex pb-8">
        <img
          src={imageUrl}
          alt="Album Art"
          className="w-20 h-20 rounded-md" // Adjust image size
        />
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <button
          onClick={togglePlayPause}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
        >
          {isPlaying ? (
            // Pause button: two red vertical bars
            <div className="flex space-x-1">
              <div className="w-[5px] h-4 bg-red-500"></div>
              <div className="w-[5px] h-4 bg-red-500"></div>
            </div>
          ) : (
            // Play button: red triangle
            <div
              className="w-0 h-0 border-l-[12px] border-l-red-500 border-y-[8px] border-y-transparent"
              style={{ transform: "translateX(2px)" }} 
            ></div>
          )}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
