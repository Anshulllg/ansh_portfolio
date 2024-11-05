"use client";
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

const HumanParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);

  // Load human model using OBJLoader
  const obj = useLoader(OBJLoader, "/img/monkey.obj");

  // Scale down the mesh by 5 times
  obj.scale.set(0.5, 0.5, 0.5); // Scaling factor: 1/5 = 0.2

  useEffect(() => {
    const points = pointsRef.current;
    if (points) {
      const positions = points.geometry.attributes.position;
      // Store original positions for reset after hover distortion
      points.geometry.setAttribute(
        "originalPosition",
        new THREE.BufferAttribute(positions.array.slice(), 3)
      );
    }
  }, []);

  // Function to distort points on hover
  const distortPoints = (e: MouseEvent) => {
    const points = pointsRef.current;
    if (points) {
      const positions = points.geometry.attributes.position;
      const originalPositions = points.geometry.attributes.originalPosition;

      for (let i = 0; i < positions.array.length; i += 3) {
        const mouseDist = Math.hypot(
          e.clientX - window.innerWidth / 2,
          e.clientY - window.innerHeight / 2
        );
        const distortion = Math.sin(mouseDist * 0.01) * 1.5;

        positions.array[i] += (Math.random() - 0.5) * distortion;
        positions.array[i + 1] += (Math.random() - 0.5) * distortion;
        positions.array[i + 2] += (Math.random() - 0.5) * distortion;
      }
      positions.needsUpdate = true;
    }
  };

  // Function to reset points
  const resetPoints = () => {
    const points = pointsRef.current;
    if (points) {
      const positions = points.geometry.attributes.position;
      const originalPositions = points.geometry.attributes.originalPosition;

      for (let i = 0; i < positions.array.length; i++) {
        positions.array[i] = originalPositions.array[i];
      }
      positions.needsUpdate = true;
    }
  };

  return (
    <points
      ref={pointsRef}
      onPointerMove={(e) => {
        setHovered(true);
        distortPoints(e);
      }}
      onPointerOut={() => {
        setHovered(false);
        resetPoints();
      }}
    >
      {/* Assuming obj.children[0] is the geometry of the human model */}
      <bufferGeometry attach="geometry" {...(obj.children[0] as THREE.Mesh).geometry} />
      <pointsMaterial
        attach="material"
        color={hovered ? "#ff0000" : "#ffffff"}
        size={0.02} // Smaller particle size
      />
    </points>
  );
};

const EqualizerScene = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Rotate the mesh
  useEffect(() => {
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.0001; // Adjust rotation speed
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={meshRef}>
        <HumanParticles />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

export default EqualizerScene;


// "use client";
// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils";

// const EqualizerScene: React.FC = () => {
//   const mountRef = useRef<HTMLDivElement | null>(null);
//   const sceneRef = useRef<THREE.Scene | null>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
//   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//   const clockRef = useRef<THREE.Clock | null>(null);
//   const uniformsRef = useRef<{ mousePos: { value: THREE.Vector3 } } | null>(null);

//   useEffect(() => {
//     if (!mountRef.current) return;

//     // Set up the scene, camera, and renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100);
//     camera.position.set(0, 0, 10);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     const controls = new OrbitControls(camera, renderer.domElement);

//     // Create IcosahedronGeometry and merge vertices to create particles
//     let g = new THREE.IcosahedronGeometry(4, 20);
//     g = BufferGeometryUtils.mergeVertices(g);

//     // Define uniforms for the shader
//     const uniforms = {
//       mousePos: { value: new THREE.Vector3() }
//     };
//     uniformsRef.current = uniforms;

//     // Define vertex and fragment shaders
//     const vertexShader = `
//       uniform vec3 mousePos;
//       varying float vDist;

//       void main() {
//         vec3 seg = position - mousePos;
//         float dist = length(seg);
//         float force = clamp(1.0 / (dist * dist), 0.0, 0.15); 
//         vec3 newPosition = position + normalize(seg) * force;
//         vDist = dist;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
//         gl_PointSize = 1.0;
//       }
//     `;

//     const fragmentShader = `
//       varying float vDist;

//       void main() {
//         vec3 color;
//         float alpha;
        
//         if (vDist < 2.0) {
//           color = vec3(1.0, 0.0, 1.0); // Magenta color for particles close to the mouse
//           alpha = 1.0;
//         } else {
//           color = vec3(0.0, 1.0, 1.0); // Cyan color for particles far from the mouse
//           alpha = 1.0;
//         }
        
//         gl_FragColor = vec4(color, alpha);
//       }
//     `;

//     // Create ShaderMaterial for particles
//     const material = new THREE.ShaderMaterial({
//       uniforms: uniforms,
//       vertexShader: vertexShader,
//       fragmentShader: fragmentShader,
//       transparent: true,
//       depthTest: false // Disable depth testing for particles
//     });

//     // Create Points object using the geometry and material
//     const points = new THREE.Points(g, material);
//     scene.add(points);

//     const clock = new THREE.Clock();
//     clockRef.current = clock;

//     // Function to update mouse position in Three.js space
//     const onMouseMove = (event: MouseEvent) => {
//       if (!rendererRef.current || !cameraRef.current || !uniformsRef.current) return;

//       const { clientX, clientY } = event;
//       const mouse = new THREE.Vector2();

//       // Convert the mouse position to normalized device coordinates (NDC)
//       mouse.x = (clientX / window.innerWidth) * 2 - 1;
//       mouse.y = -(clientY / window.innerHeight) * 2 + 1;

//       // Create a Raycaster to get the mouse position in 3D space
//       const raycaster = new THREE.Raycaster();
//       raycaster.setFromCamera(mouse, camera);

//       const intersects = raycaster.ray.origin;

//       // Update the mouse position uniform with the 3D coordinates of the ray's origin
//       uniformsRef.current.mousePos.value.copy(intersects);
//     };

//     // Add mousemove event listener
//     window.addEventListener("mousemove", onMouseMove);

//     // Animation loop
//     const animate = () => {
//       const t = clock.getElapsedTime();

//       // Rotate the particles
//       points.rotation.x += 0.01;
//       points.rotation.y += 0.01;

//       // Render the scene
//       renderer.render(scene, camera);
//       requestAnimationFrame(animate);
//     };

//     animate();

//     // Cleanup on component unmount
//     return () => {
//       if (renderer) {
//         renderer.dispose();
//         if (mountRef.current) {
//           mountRef.current.removeChild(renderer.domElement);
//         }
//       }
//       window.removeEventListener("mousemove", onMouseMove);
//     };
//   }, []);

//   return <div ref={mountRef} />;
// };

// export default EqualizerScene;

