"use client"

import "./SpinningCD.css"
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useRef, useState } from 'react';



function CDModel({ rotationX, rotationY, autoRotate }) {
    const { scene } = useGLTF('/ps1_jewel_case.glb');
    const ref = useRef();

    // Add auto-rotation with useFrame
    useFrame((_, delta) => {
        if (ref.current && autoRotate) {
        // Auto-spin on Y axis
        ref.current.rotation.y += delta * 0.9; // Adjust speed as needed
        }

    // Apply manual rotation from props
        if (ref.current) {
            ref.current.rotation.x = rotationX;
            if (!autoRotate) {
                ref.current.rotation.y = rotationY;
            }
        }
    });

    return <primitive 
        ref={ref} 
        object={scene} 
        scale={1.5} 
        /* rotation={[Math.PI/2, 0, 0]}  */
        rotation={[0, 0, Math.PI/2]}
        /* rotation={[Math.PI/2, Math.PI/2, 0]} */
       /*  rotation={[-Math.PI/2, 0, 0]} */
        position={[0, 0, 0]}
        />;
}

function SpinningCD() {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const lastPos = useRef({ x: null, y: null });

  const handleMouseDown = (e) => {
    setAutoRotate(false);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (lastPos.current.x !== null && lastPos.current.y !== null) {
      const deltaX = e.clientX - lastPos.current.x;
      const deltaY = e.clientY - lastPos.current.y;

      setRotationY((prev) => prev + deltaX * 0.01);
      setRotationX((prev) => prev + deltaY * 0.01);

      lastPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    lastPos.current = { x: null, y: null };
  };




  return (
    <div
        className="cd-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        /* style={{ width: '40vw', height: '40vh', cursor: 'grab' }} */
    >
        <Canvas camera={{ position: [1, 1.2, 1], fov: 70 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 1, 50]} />
            <CDModel rotationX={rotationX} rotationY={rotationY} autoRotate={autoRotate}/>
        </Canvas>
    </div>
  );
}

export default SpinningCD
