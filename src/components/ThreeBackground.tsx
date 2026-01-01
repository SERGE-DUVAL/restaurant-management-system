'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    // Brouillard chaud et sombre pour fondre les particules
    scene.fog = new THREE.FogExp2(0x0f0e0e, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Particules "Poussière Dorée"
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 400;
    const posArray = new Float32Array(particlesCount * 3);
    const sizesArray = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i++) {
      // Dispersion large mais plane
      posArray[i] = (Math.random() - 0.5) * 30;
    }
    for (let i = 0; i < particlesCount; i++) {
      sizesArray[i] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizesArray, 1));

    const material = new THREE.PointsMaterial({
      size: 0.12,
      color: 0xD4AF37, // Or
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // Ajout d'une lumière chaude ambiante
    const ambientLight = new THREE.AmbientLight(0xffaa00, 0.2);
    scene.add(ambientLight);

    camera.position.z = 6;

    let mouseX = 0;
    let mouseY = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.00005;

      // Mouvement très lent et majestueux
      particlesMesh.rotation.y = time * 0.5;
      particlesMesh.rotation.x = time * 0.2;

      // Parallaxe très subtil
      particlesMesh.position.x += (mouseX * 0.0005 - particlesMesh.position.x) * 0.02;
      particlesMesh.position.y += (-mouseY * 0.0005 - particlesMesh.position.y) * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - window.innerWidth / 2;
      mouseY = e.clientY - window.innerHeight / 2;
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!isClient) {
    return <div id="canvas-container" />;
  }

  return <div ref={mountRef} id="canvas-container" />;
};

export default ThreeBackground;