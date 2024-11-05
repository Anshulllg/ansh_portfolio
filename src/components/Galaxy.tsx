// "use client";
// import { useEffect, useRef, useState } from 'react';

// const GalaxyCanvas: React.FC = () => {
//   const dustCanvasRef = useRef<HTMLCanvasElement | null>(null);
//   const starCanvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [width, setWidth] = useState(window.innerWidth);
//   const [height, setHeight] = useState(window.innerHeight);

//   useEffect(() => {
//     const dustCanvas = dustCanvasRef.current!;
//     const starCanvas = starCanvasRef.current!;
//     const dustCtx = dustCanvas.getContext('2d')!;
//     const starCtx = starCanvas.getContext('2d')!;

//     dustCanvas.width = starCanvas.width = width;
//     dustCanvas.height = starCanvas.height = height;

//     dustCtx.globalCompositeOperation = 'lighter';
//     starCtx.globalCompositeOperation = 'lighter';

//     const galaxies: Galaxy[] = [];
//     let currentGalaxy: Galaxy | null = null;
//     let drawingMode = false;

//     const mouse = {
//       pos: { x: width * 0.5, y: height * 0.5 },
//       speed: 0,
//     };

//     const randomNumbers = (length: number) => Array.from(new Array(length), () => Math.random());
//     const PI = Math.PI;
//     const TAU = PI * 2;
//     const r = () => Math.random();
//     const angle2 = (p1: number[], p2: number[]) => Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
//     const distance2 = (p1: number[], p2: number[]) => Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));

//     const createDustParticle = (color?: { r: number; g: number; b: number }) => {
//       const canvas = document.createElement('canvas');
//       const w = 100;
//       const h = 100;
//       const cx = w * 0.5;
//       const cy = h * 0.5;

//       canvas.width = w;
//       canvas.height = h;
//       const ctx = canvas.getContext('2d')!;

//       const xRand = -5 + r() * 10;
//       const yRand = -5 + r() * 10;
//       const xRand2 = 10 + r() * (cx / 2);
//       const yRand2 = 10 + r() * (cy / 2);

//       color = color || {
//         r: Math.round(150 + r() * 100),
//         g: Math.round(50 + r() * 100),
//         b: Math.round(50 + r() * 100),
//       };

//       ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},.02)`;

//       Array.from(new Array(200), () => randomNumbers(3)).forEach((p, i, arr) => {
//         const length = arr.length;
//         const x = Math.cos(TAU / xRand / length * i) * p[2] * xRand2 + cx;
//         const y = Math.sin(TAU / yRand / length * i) * p[2] * yRand2 + cy;

//         ctx.beginPath();
//         ctx.moveTo(x, y);
//         ctx.arc(x, y, p[2] * 4, 0, TAU);
//         ctx.fill();
//       });

//       return canvas;
//     };

//     class Galaxy {
//       x: number;
//       y: number;
//       stars: Star[];
//       dust: Dust[];
//       drag: number;
//       angleOffsetX: number;
//       angleOffsetY: number;
//       realAngleOffsetX: number;
//       realAngleOffsetY: number;
//       color: { r: number; g: number; b: number };

//       constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//         this.stars = [];
//         this.dust = [];
//         this.drag = r();
//         this.angleOffsetX = TAU * r();
//         this.angleOffsetY = TAU * r();
//         this.realAngleOffsetX = 0;
//         this.realAngleOffsetY = 0;

//         this.color = {
//           r: Math.round(50 + r() * 100),
//           g: Math.round(50 + r() * 100),
//           b: Math.round(150 + r() * 100),
//         };
//       }

//       calculateCenter() {
//         if (!this.stars.length) return;
//         this.x = this.stars.map(s => s.x).reduce((prev, curr) => prev + curr) / this.stars.length;
//         this.y = this.stars.map(s => s.y).reduce((prev, curr) => prev + curr) / this.stars.length;
//         this.stars.forEach(this.calculateStarDustParams.bind(this));
//         this.dust.forEach(this.calculateStarDustParams.bind(this));
//       }

//       calculateStarDustParams(o: { x: number; y: number }) {
//         o.angle = angle2([this.x, this.y], [o.x, o.y]);
//         o.distance = distance2([this.x, this.y], [o.x, o.y]);
//       }
//     }

//     class Star {
//         x: number;
//         y: number;
//         radius: number;
//         speed: number;
//         distance: number; // Add this property
//         angle: number; // Add this property
      
//         constructor(x: number, y: number, spread: number) {
//           this.x = x + Math.cos(TAU * r()) * spread;
//           this.y = y + Math.sin(TAU * r()) * spread;
//           this.radius = r() + 0.25;
//           this.speed = r();
//           this.distance = 0; // Initialize distance
//           this.angle = 0; // Initialize angle
//         }
//       }
      
//       class Dust {
//         x: number;
//         y: number;
//         size: number;
//         texture: HTMLCanvasElement;
//         speed: number;
//         distance: number; // Add this property
//         angle: number; // Add this property
      
//         constructor(x: number, y: number, size: number) {
//           this.x = x;
//           this.y = y;
//           this.size = size;
//           this.texture = createDustParticle();
//           this.speed = r();
//           this.distance = 0; // Initialize distance
//           this.angle = 0; // Initialize angle
//         }
//       }
      

//       const updateStarDust = (s: Star | Dust, g: Galaxy) => {
//         if (g === currentGalaxy && drawingMode) return;
//         s.angle += (0.5 + (s.speed * 0.5)) / s.distance;
//         s.x = g.x + (Math.cos(s.angle + g.realAngleOffsetX) * s.distance);
//         s.y = g.y + (Math.sin(s.angle + g.realAngleOffsetY) * s.distance);
//       };
      
//     const update = () => {
//       galaxies.forEach(g => {
//         if (g !== currentGalaxy) {
//           g.realAngleOffsetX += g.realAngleOffsetX < g.angleOffsetX
//             ? (g.angleOffsetX - g.realAngleOffsetX) * 0.05 : 0;
//           g.realAngleOffsetY += g.realAngleOffsetY < g.angleOffsetY
//             ? (g.angleOffsetY - g.realAngleOffsetY) * 0.05 : 0;
//         }
//         g.stars.forEach((s) => updateStarDust(s, g));
//         g.dust.forEach((d) => updateStarDust(d, g));
//       });
//     };

//     const render = () => {
//       dustCtx.globalCompositeOperation = 'source-over';
//       dustCtx.fillStyle = 'rgba(0,0,0,.05)';
//       dustCtx.fillRect(0, 0, width, height);
//       dustCtx.globalCompositeOperation = 'lighter';

//       starCtx.clearRect(0, 0, width, height);
//       starCtx.fillStyle = '#ffffff';
//       starCtx.strokeStyle = 'rgba(255,255,255,.05)';
//       starCtx.beginPath();

//       if (drawingMode) {
//         galaxies.forEach(g => {
//           starCtx.moveTo(g.x, g.y);
//           starCtx.arc(g.x, g.y, 2, 0, TAU);
//         });
//       }

//       galaxies.forEach(g => {
//         g.stars.forEach(s => {
//           starCtx.moveTo(s.x, s.y);
//           starCtx.arc(s.x, s.y, s.radius, 0, TAU);
//         });
//         g.dust.forEach(d => {
//           dustCtx.drawImage(d.texture, d.x - (d.size * 0.5), d.y - (d.size * 0.5), d.size, d.size);
//         });
//       });

//       dustCtx.fill();
//       starCtx.fill();

//       if (drawingMode && currentGalaxy) {
//         starCtx.beginPath();
//         currentGalaxy.stars.forEach((s) => {
//           starCtx.moveTo(s.x, s.y);
//           starCtx.lineTo(currentGalaxy.x, currentGalaxy.y);
//         });
//         starCtx.stroke();
//       }
//     };

//     const loop = () => {
//       draw();
//       update();
//       render();
//       window.requestAnimationFrame(loop);
//     };

//     const draw = (e?: MouseEvent | TouchEvent) => {
//       if (!drawingMode) return;

//       currentGalaxy!.stars.push(new Star(mouse.pos.x, mouse.pos.y, mouse.speed));
//       currentGalaxy!.stars.push(new Star(mouse.pos.x, mouse.pos.y, mouse.speed));
//       currentGalaxy!.dust.push(new Dust(mouse.pos.x, mouse.pos.y, r() * 5 + 5));
//     };

//     const handleMouseMove = (e: MouseEvent | TouchEvent) => {
//       mouse.pos.x = e.clientX || e.touches[0].clientX;
//       mouse.pos.y = e.clientY || e.touches[0].clientY;
//     };

//     const handleMouseDown = (e: MouseEvent | TouchEvent) => {
//       drawingMode = true;
//       if (e instanceof MouseEvent) {
//         currentGalaxy = new Galaxy(mouse.pos.x, mouse.pos.y);
//         galaxies.push(currentGalaxy);
//       }
//       draw(e);
//     };

//     const myElement = document.getElementById('myElement');

//     myElement?.addEventListener('mousemove', (event: MouseEvent | TouchEvent) => {
//     let clientX: number;

//     if ('touches' in event) {
//         // Handle touch event
//         clientX = event.touches[0].clientX;
//     } else {
//         // Handle mouse event
//         clientX = event.clientX;
//     }

//     console.log(`Client X position: ${clientX}`);
//     });


//     const handleMouseUp = () => {
//       drawingMode = false;
//       currentGalaxy = null;
//     };

//     const handleResize = () => {
//       setWidth(window.innerWidth);
//       setHeight(window.innerHeight);
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('mousedown', handleMouseDown);
//     window.addEventListener('mouseup', handleMouseUp);
//     window.addEventListener('touchmove', handleMouseMove);
//     window.addEventListener('touchstart', handleMouseDown);
//     window.addEventListener('touchend', handleMouseUp);
//     window.addEventListener('resize', handleResize);

//     loop();

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('mousedown', handleMouseDown);
//       window.removeEventListener('mouseup', handleMouseUp);
//       window.removeEventListener('touchmove', handleMouseMove);
//       window.removeEventListener('touchstart', handleMouseDown);
//       window.removeEventListener('touchend', handleMouseUp);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [width, height]);

//   return (
//     <div>
//       <canvas ref={dustCanvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
//       <canvas ref={starCanvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
//     </div>
//   );
// };

// export default GalaxyCanvas;
