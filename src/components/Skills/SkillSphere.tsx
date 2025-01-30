"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const SKILL_CATEGORIES = {
  XR: {
    tools: [
      { name: "Unity", logo: "/posts/unity.png" },
      { name: "Unreal Engine", logo: "/posts/unity.png" },
      { name: "ARKit", logo:  "/posts/unity.png" },
      { name: "ARCore", logo:  "/posts/unity.png" },
      { name: "WebXR", logo:  "/posts/unity.png" },
      { name: "Unreal Engine", logo: "/posts/unity.png" },
      { name: "ARKit", logo:  "/posts/unity.png" },
      { name: "ARCore", logo:  "/posts/unity.png" },
      { name: "WebXR", logo:  "/posts/unity.png" },
      { name: "Unreal Engine", logo: "/posts/unity.png" },
      { name: "ARKit", logo:  "/posts/unity.png" },
      { name: "ARCore", logo:  "/posts/unity.png" },
      { name: "WebXR", logo:  "/posts/unity.png" },
    ],
    skills: [
      "3D Development",
      "AR/VR Application Development",
      "Spatial Computing",
      "Real-time Rendering",
      "Physics Simulation",
      "Asset Optimization",
    ],
  },
  Code: {
    tools: [
      { name: "TypeScript", logo: "/posts/img2.jpg" },
      { name: "React", logo: "/Code/react.png" },
      { name: "Next.js", logo: "/Code/nextjs.png" },
      { name: "Node.js", logo: "/Code/nodejs.png" },
      { name: "Python", logo: "/Code/python.png" },
    ],
    skills: [
      "Full Stack Development",
      "API Design",
      "Database Management",
      "System Architecture",
      "Performance Optimization",
      "Cloud Services",
    ],
  },
  Design: {
    tools: [
      { name: "Figma", logo: "/posts/img3.jpg" },
      { name: "Blender", logo: "/Design/blender.png" },
      { name: "Adobe XD", logo: "/Design/xd.png" },
      { name: "Sketch", logo: "/Design/sketch.png" },
      { name: "Photoshop", logo: "/Design/photoshop.png" },
    ],
    skills: [
      "UI/UX Design",
      "3D Modeling",
      "Prototyping",
      "User Research",
      "Visual Design",
      "Design Systems",
    ],
  },
};

const SkillBox = ({ category }: { category: keyof typeof SKILL_CATEGORIES }) => {
  const { tools, skills } = SKILL_CATEGORIES[category];

  return (
    <div className="w-full bg-black/70 backdrop-blur-sm p-6 rounded-t-2xl">
      <div className="flex gap-8">
        {/* Tools Section */}
        <div className="flex-1">
          <h3 className="text-white/80 text-sm mb-4">TOOLS</h3>
          <div className="grid grid-cols-8 gap-4">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-1 p-2 bg-white/10 rounded-lg"
              >
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-10 h-10 object-contain"
                />
                {/* <span className="text-white text-sm">{tool.name}</span> */}
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="flex-1 border-l border-white/20 pl-8">
          <h3 className="text-white/80 text-sm mb-4 ">SKILLS</h3>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="text-white text-sm py-2 px-4 bg-white/10 rounded-lg"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillSphere = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof SKILL_CATEGORIES | null>(null);
  
  const sceneRef = useRef<THREE.Scene | null>(null);
  const spheresRef = useRef<THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhysicalMaterial>[]>([]);
  const mouseRef = useRef(new THREE.Vector2());
  const forcesRef = useRef(new Map());
  const animationFrameRef = useRef<number | undefined>(undefined);
  const cameraRef = useRef<THREE.PerspectiveCamera | undefined>(undefined);
  const controlsRef = useRef<OrbitControls | null>(null);

  const handleCategorySelect = (category: keyof typeof SKILL_CATEGORIES) => {
    setSelectedCategory(prevCategory => 
      prevCategory === category ? null : category
    );
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    // Scene setup with fog for depth
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 15, 40);
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5; // Increased exposure
    renderer.outputColorSpace = THREE.SRGBColorSpace; // Correct color space

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 10;
    controls.maxDistance = 50;
    controls.enablePan = false;
    controls.enableZoom = false;
    controlsRef.current = controls;

    // Enhanced material with subsurface scattering and clearcoat
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ff7b7b").convertSRGBToLinear(),
      metalness: 0.1,
      roughness: 0.2,
      transmission: 0.1,
      thickness: 0.5,
      clearcoat: 0.3,
      clearcoatRoughness: 0.25,
      emissive: new THREE.Color("#450000"),
      emissiveIntensity: 0.4,
      sheen: 1,
      sheenRoughness: 0.5,
      sheenColor: new THREE.Color("#ff9999")
    });

    // Create spheres group
    const group = new THREE.Group();
    
    // Generate sphere positions and radii
    const positions = Array(60).fill(0).map(() => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 10
    }));
    
    const radii = Array(50).fill(0).map(() => 0.3 + Math.random() * 0.7);

    // Create spheres with enhanced geometry
    positions.forEach((pos, index) => {
      const radius = radii[index];
      const geometry = new THREE.SphereGeometry(radius, 64, 64);
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(pos.x, -25, pos.z);
      sphere.userData = { 
        originalPosition: { ...pos }, 
        radius,
        initialDelay: index * 50
      };
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      spheresRef.current.push(sphere);
      group.add(sphere);
    });

    scene.add(group);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Main spotlight with improved settings
    const spotLight = new THREE.SpotLight(0xffffff, 5); // Increased intensity
    spotLight.position.set(14, 24, 30);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.5;
    spotLight.decay = 1.5;
    spotLight.distance = 80;
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.0001;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 100;
    spotLight.shadow.radius = 5;
    scene.add(spotLight);

    // Additional rim lights for better depth
    const rimLight1 = new THREE.DirectionalLight(0xff9999, 2);
    rimLight1.position.set(-10, 5, -10);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
    rimLight2.position.set(0, -4, -10);
    scene.add(rimLight2);

    // Add point lights for sparkle
    const pointLight1 = new THREE.PointLight(0xff7777, 1, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffaaaa, 1, 20);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Animation parameters
    const breathingAmplitude = 0.1;
    const breathingSpeed = 0.002;
    let startTime = Date.now();
    const animationDuration = 2000;

    // Animation loop
    const animate = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      
      spheresRef.current.forEach((sphere) => {
        const delayedTime = elapsedTime - sphere.userData.initialDelay;
        if (delayedTime < animationDuration) {
          const progress = Math.min(delayedTime / animationDuration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3); 
          
          sphere.position.y = -25 + (sphere.userData.originalPosition.y + 25) * easeProgress;
        } else {
          const time = currentTime * breathingSpeed;
          const offset = spheresRef.current.indexOf(sphere) * 0.2;
          const breathingY = Math.sin(time + offset) * breathingAmplitude;
          const breathingZ = Math.cos(time + offset) * breathingAmplitude * 0.5;
          
          const force = forcesRef.current.get(sphere.uuid);
          if (force) {
            sphere.position.add(force);
            force.multiplyScalar(0.95);
            
            if (force.length() < 0.01) {
              forcesRef.current.delete(sphere.uuid);
            }
          }
          
          const originalPos = sphere.userData.originalPosition;
          const targetPos = new THREE.Vector3(
            originalPos.x,
            originalPos.y + breathingY,
            originalPos.z + breathingZ
          );
          sphere.position.lerp(targetPos, 0.018);
        }
      });

      controls.update();
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouseRef.current, camera);
      const intersects = raycaster.intersectObjects(spheresRef.current);

      if (intersects.length > 0) {
        const hoveredSphere = intersects[0].object;
        const force = new THREE.Vector3();
        force
          .subVectors(intersects[0].point, hoveredSphere.position)
          .normalize()
          .multiplyScalar(0.2);
        forcesRef.current.set(hoveredSphere.uuid, force);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-8">
        <h1 className="text-4xl text-white font-bold syne">Skills</h1>
        <div className="flex gap-6 syne-r">
          {(Object.keys(SKILL_CATEGORIES) as Array<keyof typeof SKILL_CATEGORIES>).map(category => (
            <button 
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all ${
                selectedCategory === category ? 'ring-2 ring-white' : ''
              }`}
            >
              <img 
                src={`/img/${category}.png`} 
                alt={category} 
                className="w-6 h-6" 
              />
              <span className="text-white">{category}</span>
            </button>
          ))}
        </div>
      </div>
      {selectedCategory && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[80%] max-w-7xl">
          <SkillBox category={selectedCategory} />
        </div>
      )}
    </div>
  );
};

export default SkillSphere;