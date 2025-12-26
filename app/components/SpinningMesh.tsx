"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

const colors = [
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
];

export default function SpinningMesh() {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Base rotation speed (slow)
      const baseSpeed = 0.5;
      // Speed multiplier when hovered (faster)
      const speedMultiplier = hovered ? 3 : 1;
      const rotationSpeed = baseSpeed * speedMultiplier;

      meshRef.current.rotation.x += delta * rotationSpeed;
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  const handleClick = () => {
    setColorIndex((prev) => (prev + 1) % colors.length);
  };

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        wireframe
        color={colors[colorIndex]}
        emissive={colors[colorIndex]}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

