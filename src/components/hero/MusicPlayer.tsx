"use client";

import React, { useState, useRef } from "react";

interface MusicPlayer {
  audioUrl: string;
}

// const MusicPlayer: React.FC<MusicPlayerProps> = ({ imageUrl, audioUrl }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const audioRef = useRef<HTMLAudioElement | null>(null);

const MusicPlayerProps: React.FC<MusicPlayer> = ({audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
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

// import React, { useState, useRef, useEffect } from "react";

// interface MusicPlayerProps {
//   imageUrl: string;
//   audioUrl: string;
// }

// const MusicPlayer: React.FC<MusicPlayerProps> = ({ imageUrl, audioUrl }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   useEffect(() => {
//     const audio = audioRef.current;
//     if (audio) {
//       const updateProgress = () => {
//         setProgress((audio.currentTime / audio.duration) * 100);
//       };
//       audio.addEventListener("timeupdate", updateProgress);

//       return () => {
//         audio.removeEventListener("timeupdate", updateProgress);
//       };
//     }
//   }, []);

//   const togglePlayPause = () => {
//     const audio = audioRef.current;
//     if (audio) {
//       if (isPlaying) {
//         audio.pause();
//       } else {
//         audio.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div
//       className="flex items-center p-4 rounded-lg transition-all duration-300"
//       style={{
//         backgroundColor: "rgba(255, 255, 255, 0.24)", // White with 24% opacity
//         width: "160px",
//         height: "50px",
//       }}
//     >
//       <audio ref={audioRef} src={audioUrl}></audio>
//       <div className="flex pb-8">
//         <img
//           src={imageUrl}
//           alt="Album Art"
//           className="w-20 h-20 rounded-md" // Adjust image size
//         />
//       </div>
//       <div className="ml-auto flex items-center space-x-4">
//         <button
//           onClick={togglePlayPause}
//           className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
//         >
//           {isPlaying ? (
//             // Pause button: two red vertical bars
//             <div className="flex space-x-1">
//               <div className="w-[5px] h-4 bg-red-500"></div>
//               <div className="w-[5px] h-4 bg-red-500"></div>
//             </div>
//           ) : (
//             // Play button: red triangle
//             <div
//               className="w-0 h-0 border-l-[12px] border-l-red-500 border-y-[8px] border-y-transparent"
//               style={{ transform: "translateX(2px)" }} 
//             ></div>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MusicPlayer;
