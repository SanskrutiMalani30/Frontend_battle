'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const BrainCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.2;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 4. Generate circular glowing particle texture programmatically
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d')!;
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(168, 85, 247, 0.8)'); // Purple glow
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createParticleTexture();

    // 5. Brain generative geometry (dual-hemisphere point cloud)
    const brainGroup = new THREE.Group();
    scene.add(brainGroup);

    const brainPointsCount = 380;
    const brainPointsPositions: number[] = [];
    const brainPointsColors: number[] = [];
    const pointsArray: THREE.Vector3[] = [];

    // Helper to generate points clustered as a brain ellipsoid
    for (let i = 0; i < brainPointsCount; i++) {
      // Determine hemisphere (left vs right)
      const isLeft = Math.random() > 0.5;
      
      // Spherical coordinates
      const theta = Math.random() * Math.PI; // latitude
      const phi = Math.random() * Math.PI * 2; // longitude

      // Brain parameters (squashed ellipsoid)
      const rx = 1.2;
      const ry = 1.6;
      const rz = 1.3;

      // Add undulating sine waves to simulate brain folds
      const foldNoise = Math.sin(theta * 8) * Math.cos(phi * 6) * 0.15;
      const r = 1.0 + foldNoise;

      let x = r * Math.sin(theta) * Math.cos(phi) * rx;
      const y = r * Math.cos(theta) * ry;
      const z = r * Math.sin(theta) * Math.sin(phi) * rz;

      // Add gap and hemisphere offsets
      if (isLeft) {
        x -= 0.18; // offset left hemisphere
      } else {
        x += 0.18; // offset right hemisphere
      }

      brainPointsPositions.push(x, y, z);
      pointsArray.push(new THREE.Vector3(x, y, z));

      // Color nodes: gradient from purple to blue
      const ratio = (y + ry) / (2 * ry); // 0 at bottom, 1 at top
      const color = new THREE.Color();
      color.lerpColors(new THREE.Color('#3b82f6'), new THREE.Color('#a855f7'), ratio);
      brainPointsColors.push(color.r, color.g, color.b);
    }

    const brainGeometry = new THREE.BufferGeometry();
    brainGeometry.setAttribute('position', new THREE.Float32BufferAttribute(brainPointsPositions, 3));
    brainGeometry.setAttribute('color', new THREE.Float32BufferAttribute(brainPointsColors, 3));

    const brainMaterial = new THREE.PointsMaterial({
      size: 0.15,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const brainPointsObj = new THREE.Points(brainGeometry, brainMaterial);
    brainGroup.add(brainPointsObj);

    // 6. Neural connection segments (glowing wireframe)
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    // Connect nodes within proximity threshold
    const maxConnectionDist = 0.75;
    for (let i = 0; i < pointsArray.length; i++) {
      for (let j = i + 1; j < pointsArray.length; j++) {
        const dist = pointsArray[i].distanceTo(pointsArray[j]);
        
        // Connect only if they are close, and not linking hemispheres across deep gaps too much
        const crossingHemispheres = (pointsArray[i].x < 0 && pointsArray[j].x > 0) || (pointsArray[i].x > 0 && pointsArray[j].x < 0);
        const connectionAllowed = !crossingHemispheres || dist < 0.45;

        if (dist < maxConnectionDist && connectionAllowed) {
          linePositions.push(pointsArray[i].x, pointsArray[i].y, pointsArray[i].z);
          linePositions.push(pointsArray[j].x, pointsArray[j].y, pointsArray[j].z);

          // Line segment colors matches the gradient of nodes
          const c1 = new THREE.Color();
          c1.lerpColors(new THREE.Color('#3b82f6'), new THREE.Color('#a855f7'), (pointsArray[i].y + 1.6) / 3.2);
          const c2 = new THREE.Color();
          c2.lerpColors(new THREE.Color('#3b82f6'), new THREE.Color('#a855f7'), (pointsArray[j].y + 1.6) / 3.2);

          lineColors.push(c1.r, c1.g, c1.b);
          lineColors.push(c2.r, c2.g, c2.b);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });

    const connectionsObj = new THREE.LineSegments(lineGeometry, lineMaterial);
    brainGroup.add(connectionsObj);

    // 7. Floating Space Particles (outer background stars)
    const spaceParticlesCount = 180;
    const spaceParticlesPositions = new Float32Array(spaceParticlesCount * 3);

    for (let i = 0; i < spaceParticlesCount * 3; i += 3) {
      spaceParticlesPositions[i] = (Math.random() - 0.5) * 12; // x
      spaceParticlesPositions[i + 1] = (Math.random() - 0.5) * 12; // y
      spaceParticlesPositions[i + 2] = (Math.random() - 0.5) * 8; // z
    }

    const spaceGeometry = new THREE.BufferGeometry();
    spaceGeometry.setAttribute('position', new THREE.BufferAttribute(spaceParticlesPositions, 3));

    const spaceMaterial = new THREE.PointsMaterial({
      size: 0.08,
      map: particleTexture,
      color: new THREE.Color('#6366f1'),
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const spaceParticlesObj = new THREE.Points(spaceGeometry, spaceMaterial);
    scene.add(spaceParticlesObj);

    // 8. Track Mouse coordinates for Cursor Parallax
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized coordinates [-0.5, 0.5]
      mouseRef.current.x = e.clientX / window.innerWidth - 0.5;
      mouseRef.current.y = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 9. Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;

      // Continuous Slow Rotations (auto-spin) + scroll-based 3D rotation
      brainGroup.rotation.y = elapsedTime * 0.15 + scrollY * 0.005;
      brainGroup.rotation.z = scrollY * 0.0015;

      // Slow drift for background particles
      spaceParticlesObj.rotation.y = -elapsedTime * 0.04;
      spaceParticlesObj.rotation.x = elapsedTime * 0.02;

      // Breathing effect: oscillate brain node particle size
      brainMaterial.size = 0.12 + Math.sin(elapsedTime * 2.2) * 0.025;

      // Neural synapse pulse: oscillate connection line opacity
      lineMaterial.opacity = 0.14 + Math.sin(elapsedTime * 1.6) * 0.04;

      // Camera Parallax: lerp camera position towards mouse targets
      const targetCamX = mouseRef.current.x * 1.2;
      const targetCamY = -mouseRef.current.y * 1.2; // Invert Y for standard cursor tilt behavior

      camera.position.x += (targetCamX - camera.position.x) * 0.08;
      camera.position.y += (targetCamY - camera.position.y) * 0.08;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 10. Responsive resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 11. Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      particleTexture.dispose();
      brainGeometry.dispose();
      brainMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      spaceGeometry.dispose();
      spaceMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full relative" />;
};
