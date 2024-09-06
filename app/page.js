"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";

// import FallingShapes from "@/components/fallingShapes";
import Ground from "@/components/ground";
import Vehicle from "@/components/vehicle";

const Page = () => {
  return (
    <Canvas camera={{ position: [0, 4, -8], fov: 50 }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} intensity={1} />
      <Physics>
        <Ground />
        <Vehicle />
        {/* <FallingShapes /> */}
      </Physics>
    </Canvas>
  );
};

export default Page;
