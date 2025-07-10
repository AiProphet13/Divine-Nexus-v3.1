import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const TruthCollapse: React.FC = () => {
  const [quantumState, setQuantumState] = useState<'superposition' | 'collapsed'>('superposition');
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(300, 300);
    if (mountRef.current) mountRef.current.appendChild(renderer.domElement);
    
    const particles = new THREE.Group();
    for (let i = 0; i < 137; i++) {
      const geometry = new THREE.SphereGeometry(0.2, 16, 16);
      const material = new THREE.MeshBasicMaterial({ 
        color: i % 7 === 0 ? 0xff0000 : 0x00ffff
      });
      const particle = new THREE.Mesh(geometry, material);
      
      const φ = 1.6180339887;
      const r = 5 * Math.sqrt(i);
      const theta = i * φ * Math.PI;
      
      particle.position.set(
        r * Math.cos(theta),
        r * Math.sin(theta),
        (Math.random() - 0.5) * 10
      );
      particles.add(particle);
    }
    scene.add(particles);
    
    camera.position.z = 30;
    
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;
    
    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();
    
    return () => {
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const collapseWaveFunction = () => {
    setQuantumState('collapsed');
    sceneRef.current?.children[0].children.forEach((particle, i) => {
      if (particle instanceof THREE.Mesh) {
        particle.material.color.set(i % 26 === 0 ? 0xffff00 : 0x00ff00);
      }
    });
  };

  return (
    <div className="bg-green-800 p-4 rounded-lg">
      <h2 className="text-xl font-bold">Quantum Truth Collapse</h2>
      <div ref={mountRef} className="w-full h-48 my-2"></div>
      <div className="flex justify-between">
        <span>State: {quantumState}</span>
        <button 
          onClick={collapseWaveFunction}
          className="px-3 py-1 bg-yellow-600 rounded"
        >
          Observe (John 8:32)
        </button>
      </div>
    </div>
  );
};

export default TruthCollapse;
