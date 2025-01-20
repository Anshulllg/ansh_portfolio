import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SpaceGame = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const frameId = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight/2);
    renderer.setClearColor(0x000000);
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create spaceship
    const shipGroup = new THREE.Group();
    
    // Main body
    const shipGeometry = new THREE.ConeGeometry(0.5, 2, 8);
    const shipMaterial = new THREE.MeshPhongMaterial({
      color: 0x888888,
      shininess: 100
    });
    const spaceship = new THREE.Mesh(shipGeometry, shipMaterial);
    spaceship.rotation.z = -Math.PI / 2;
    shipGroup.add(spaceship);

    // Wings
    const wingGeometry = new THREE.BoxGeometry(0.8, 0.2, 0.5);
    const wingMaterial = new THREE.MeshPhongMaterial({
      color: 0x666666,
      shininess: 80
    });
    const topWing = new THREE.Mesh(wingGeometry, wingMaterial);
    const bottomWing = new THREE.Mesh(wingGeometry, wingMaterial);
    topWing.position.set(-0.5, 0.4, 0);
    bottomWing.position.set(-0.5, -0.4, 0);
    shipGroup.add(topWing);
    shipGroup.add(bottomWing);

    shipGroup.position.set(-5, 0, 0);
    scene.add(shipGroup);

    // Create planets
    const planets = [];
    const createPlanet = (size, position, color) => {
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshPhongMaterial({ 
        color,
        specular: 0x444444,
        shininess: 30
      });
      const planet = new THREE.Mesh(geometry, material);
      planet.position.set(...position);
      // Store initial X position for smooth stopping
      planet.userData.initialX = position[0];
      scene.add(planet);
      planets.push(planet);
      return planet;
    };

    createPlanet(2, [10, 2, -5], 0x4287f5);  // Blue planet
    createPlanet(3, [20, -3, -10], 0xf54242); // Red planet
    createPlanet(1.5, [30, 4, -15], 0x42f554); // Green planet

    // Create stars
    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = [];
    for (let i = 0; i < 5000; i++) {
      const x = THREE.MathUtils.randFloatSpread(200);
      const y = THREE.MathUtils.randFloatSpread(200);
      const z = THREE.MathUtils.randFloatSpread(200);
      starPositions.push(x, y, z);
    }
    starsGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starPositions, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Game state
    let isGameStarted = false;
    let isMouseDown = false;
    let targetY = 0;
    let time = 0;

    // Mouse handlers
    const handleMouseMove = (event) => {
      if (isMouseDown) {
        const rect = mountRef.current.getBoundingClientRect();
        const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        targetY = -y * 5;
      }
    };

    const handleMouseDown = () => {
      if (!isGameStarted) {
        isGameStarted = true;
      }
      isMouseDown = true;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation loop
    const animate = () => {
      frameId.current = requestAnimationFrame(animate);
      time += 0.016;

      if (isGameStarted) {
        // Floating motion
        const floatingOffset = Math.sin(time * 2) * 0.1;
        
        // Ship movement
        const currentY = shipGroup.position.y;
        const smoothSpeed = isMouseDown ? 0.1 : 0.03;
        shipGroup.position.y = THREE.MathUtils.lerp(
          currentY,
          targetY + floatingOffset,
          smoothSpeed
        );

        // Ship tilt
        const verticalSpeed = shipGroup.position.y - currentY;
        const targetTilt = -verticalSpeed * 0.5;
        shipGroup.rotation.z = THREE.MathUtils.lerp(
          shipGroup.rotation.z,
          targetTilt + (-Math.PI / 2), // Add base rotation
          0.1
        );

        // Planet movement
        planets.forEach(planet => {
          if (isMouseDown) {
            // Move planets when mouse is down
            planet.position.x -= 0.1;
            planet.rotation.y += 0.01;
            
            // Reset planet position when it goes off screen
            if (planet.position.x < -20) {
              planet.position.x = 30;
              planet.userData.initialX = 30;
            }
          } else {
            // Slow planets to a stop when mouse is up
            planet.rotation.y += 0.001; // Maintain slow rotation
          }
        });
      }

      renderer.render(scene, camera);
    };

    // Start animation
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId.current);
      mountRef.current?.removeChild(renderer.domElement);
      
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div className="relative w-full h-[50vh]">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-white text-2xl font-bold">
          Click and hold to Play
        </div>
      </div>
    </div>
  );
};

export default SpaceGame;