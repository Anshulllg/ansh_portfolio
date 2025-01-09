import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ModelViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Early return if ref is not set or in server-side rendering
    if (!mountRef.current || typeof window === 'undefined') return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // GLB Loader
    const loadGLB = async () => {
      try {
        // Fetch the GLB file
        const response = await fetch('/Particles.glb');
        const arrayBuffer = await response.arrayBuffer();

        // Create a buffer attribute for geometry
        const loader = new THREE.BufferGeometryLoader();
        
        // Parse the ArrayBuffer
        const geometry = loader.parse({
          attributes: {
            position: new THREE.BufferAttribute(new Float32Array(arrayBuffer), 3)
          }
        });

        // Create material
        const material = new THREE.MeshStandardMaterial({ 
          color: 0x00ff00,  // Green color as an example
          wireframe: true   // Make it wireframe to see structure
        });

        // Create mesh
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        return mesh;
      } catch (error) {
        console.error('Error loading GLB:', error);
        return null;
      }
    };

    // Load the model
    loadGLB();

    // Camera controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y
      };

      const toRadians = (angle: number): number => angle * (Math.PI / 180);

      const deltaRotationQuaternion = new THREE.Quaternion()
        .setFromEuler(new THREE.Euler(
          toRadians(deltaMove.y * 1),
          toRadians(deltaMove.x * 1),
          0,
          'XYZ'
        ));
      
      camera.quaternion.multiplyQuaternions(deltaRotationQuaternion, camera.quaternion);
      
      previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
      };
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
      };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      camera.position.z += e.deltaY * 0.01;
    };

    // Add event listeners
    if (renderer.domElement) {
      renderer.domElement.addEventListener('mousemove', onMouseMove, false);
      renderer.domElement.addEventListener('mousedown', onMouseDown, false);
      renderer.domElement.addEventListener('mouseup', onMouseUp, false);
      renderer.domElement.addEventListener('wheel', onWheel, false);
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      if (renderer.domElement) {
        renderer.domElement.removeEventListener('mousemove', onMouseMove);
        renderer.domElement.removeEventListener('mousedown', onMouseDown);
        renderer.domElement.removeEventListener('mouseup', onMouseUp);
        renderer.domElement.removeEventListener('wheel', onWheel);
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-[500px]"
      style={{ 
        width: '100%', 
        height: '500px' 
      }}
    />
  );
};

export default ModelViewer;