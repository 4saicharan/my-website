"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SpinningMesh from "./SpinningMesh";

export default function SpinningMeshCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: "100%", height: "400px" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <SpinningMesh />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

