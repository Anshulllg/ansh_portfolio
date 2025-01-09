"use client";
// // components/PointCloudShoe.js

// import { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { useFrame, Canvas } from '@react-three/fiber';

// function PointCloud() {
//   const pointsRef = useRef();
//   const mouse = new THREE.Vector2();

//   useEffect(() => {
//     window.addEventListener('mousemove', (event) => {
//       mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//       mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     });
//   }, []);

//   useFrame(() => {
//     if (!pointsRef.current) return;

//     pointsRef.current.rotation.y += 0.001;

//     // Simulate particle repulsion from cursor
//     const positions = pointsRef.current.geometry.attributes.position.array;
//     for (let i = 0; i < positions.length; i += 3) {
//       const dx = positions[i] - mouse.x * 5;
//       const dy = positions[i + 1] - mouse.y * 5;
//       const dist = Math.sqrt(dx * dx + dy * dy);
//       if (dist < 1) {
//         positions[i] += dx * 0.05;
//         positions[i + 1] += dy * 0.05;
//       }
//     }
//     pointsRef.current.geometry.attributes.position.needsUpdate = true;
//   });

//   return (
//     <points ref={pointsRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={1000}
//           array={new Float32Array(3000).map(() => (Math.random() - 0.5) * 10)}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial color="red" size={0.05} />
//     </points>
//   );
// }

// export default function PointCloudShoe() {
//   return (
//     <div className="w-screen h-screen bg-black">
//       <Canvas>
//         <ambientLight />
//         <PointCloud />
//       </Canvas>
//     </div>
//   );
// }

// components/PointCloudShoe.js

import { useEffect, useRef, useMemo } from 'react';
import { useLoader, useFrame, Canvas } from '@react-three/fiber';
import { OBJLoader } from 'three-stdlib';
import * as THREE from 'three';

function PointCloud({ modelPath }) {
  const pointsRef = useRef();
  const mouse = new THREE.Vector2();

  // Load the OBJ model
  const model = useLoader(OBJLoader, modelPath);

  // Extract vertex positions from the model
  const points = useMemo(() => {
    const positions = [];
    model.traverse((child) => {
      if (child.isMesh) {
        const geometry = child.geometry;
        const position = geometry.attributes.position;
        for (let i = 0; i < position.count; i++) {
          const vertex = new THREE.Vector3();
          vertex.fromBufferAttribute(position, i);
          positions.push(vertex.x, vertex.y, vertex.z);
        }
      }
    });
    return new Float32Array(positions);
  }, [model]);

  useEffect(() => {
    window.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += 0.001;

    // Simulate particle repulsion from cursor
    const positions = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const dx = positions[i] - mouse.x * 5;
      const dy = positions[i + 1] - mouse.y * 5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1) {
        positions[i] += dx * 0.05;
        positions[i + 1] += dy * 0.05;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={points}
          count={points.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="red" size={0.05} />
    </points>
  );
}

export default function PointCloudShoe() {
  return (
    <div className="w-screen h-screen bg-black">
      <Canvas>
        <ambientLight />
        <PointCloud modelPath="/img/monkey.obj" />
      </Canvas>
    </div>
  );
}
