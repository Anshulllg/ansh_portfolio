"use client";
import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, Html, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';

const GRAVITY = -15;
const JUMP_FORCE = 7;
const GAME_SPEED = 2; // Reduced from 5 to 2
const CACTUS_SPAWN_RATE = 3000; // Increased spawn interval

function Dinosaur({ position, isJumping, gameOver }) {
  const dinoRef = useRef();
  const velocity = useRef(0);
  const [yPos, setYPos] = useState(0);

  useEffect(() => {
    if (isJumping && velocity.current === 0) {
      velocity.current = JUMP_FORCE;
    }

    const animate = () => {
      if (isJumping && !gameOver) {
        velocity.current += GRAVITY * 0.016;
        setYPos(prev => {
          const newY = prev + velocity.current * 0.016;
          if (newY <= 0) {
            velocity.current = 0;
            return 0;
          }
          return newY;
        });
      }
    };

    const intervalId = setInterval(animate, 16);
    return () => clearInterval(intervalId);
  }, [isJumping, gameOver]);

  // Simplified circular player
  return (
    <group ref={dinoRef} position={[position[0], position[1] + yPos, position[2]]}>
      <mesh castShadow>
        <circleGeometry args={[0.3, 32]} />
        <meshBasicMaterial color={gameOver ? "#ff0000" : "#000000"} />
      </mesh>
    </group>
  );
}

function Obstacle({ position, onUpdate }) {
  const obstacleRef = useRef();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (obstacleRef.current) {
        obstacleRef.current.position.x -= GAME_SPEED * 0.016;
        onUpdate(obstacleRef.current.position.x);
      }
    }, 16);

    return () => clearInterval(intervalId);
  }, [onUpdate]);

  // Simplified triangle obstacle
  return (
    <group ref={obstacleRef} position={position}>
      <mesh>
        <circleGeometry args={[0.3, 3]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </group>
  );
}

function Ground() {
  // Simple line for ground
  return (
    <mesh position={[0, -0.1, 0]}>
      <planeGeometry args={[40, 0.1]} />
      <meshBasicMaterial color="black" />
    </mesh>
  );
}

export default function Dino() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState([]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setObstacles([]);
  };

  const handleJump = () => {
    if (!isJumping && !gameOver && gameStarted) {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 500);
    }
  };

  const handleObstacleUpdate = (id) => (x) => {
    if (x < -20) {
      setObstacles(prev => prev.filter(obs => obs.id !== id));
    }
  };

  useEffect(() => {
    const handleClick = () => {
      handleJump();
    };

    const handleKeyPress = (e) => {
      if (e.code === 'Space' && gameOver) {
        startGame();
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameOver, isJumping, gameStarted]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const spawnInterval = setInterval(() => {
      setObstacles(prev => [...prev, { id: Date.now(), x: 15 }]);
    }, CACTUS_SPAWN_RATE);

    const scoreInterval = setInterval(() => {
      setScore(prev => prev + 1);
    }, 100);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(scoreInterval);
    };
  }, [gameStarted, gameOver]);

  return (
    <div className="w-full h-[66vh] bg-white cursor-pointer">
      <Canvas>
        <OrthographicCamera 
          makeDefault 
          position={[0, 0, 10]}
          zoom={100}
          left={-5}
          right={5}
          top={5}
          bottom={-5}
        />

        <Dinosaur 
          position={[-2, 0, 0]} 
          isJumping={isJumping}
          gameOver={gameOver}
        />

        {obstacles.map(obstacle => (
          <Obstacle 
            key={obstacle.id} 
            position={[obstacle.x, 0, 0]} 
            onUpdate={handleObstacleUpdate(obstacle.id)}
          />
        ))}

        <Ground />

        <Html fullscreen>
          <div className="absolute top-4 left-4 text-black text-2xl font-mono">
            Score: {score}
          </div>
          {!gameStarted && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h1 className="text-4xl mb-4 font-mono">Runner</h1>
              <p className="mb-4 font-mono">Click to jump</p>
              <button 
                onClick={startGame}
                className="px-6 py-3 bg-black text-white font-mono rounded"
              >
                Start Game
              </button>
            </div>
          )}
          {gameOver && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h1 className="text-4xl mb-4 font-mono">Game Over</h1>
              <p className="mb-4 text-2xl font-mono">Score: {score}</p>
              <button 
                onClick={startGame}
                className="px-6 py-3 bg-black text-white font-mono rounded"
              >
                Play Again
              </button>
            </div>
          )}
        </Html>
      </Canvas>
    </div>
  );
}