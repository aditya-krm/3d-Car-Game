"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";

// Ground or road to prevent vehicle from falling
const Ground = () => {
  return (
    <RigidBody type="fixed">
      {" "}
      {/* Static object */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[20, 20]} /> {/* Large plane to simulate road */}
        <meshStandardMaterial color="gray" />
      </mesh>
    </RigidBody>
  );
};

function Vehicle() {
  return (
    <RigidBody position={[0, 0, 0]} colliders="hull">
      {/* Rectangular body */}
      <mesh>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Front wheel (sphere) */}
      <mesh position={[0, -0.5, 1.5]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Back wheels (cylinders) rotated 90 degrees around the X-axis */}
      <mesh position={[1, -0.5, -1.5]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh
        position={[-1, -0.5, -1.5]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </RigidBody>
  );
}

function FallingShapes() {
  const shapes = ["box", "sphere", "cone"];
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setObjects((prev) => [
        ...prev,
        {
          id: Math.random(),
          type: shapes[Math.floor(Math.random() * shapes.length)],
          position: [Math.random() * 10 - 5, 5, Math.random() * 10 - 5],
        },
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return objects.map((object) => (
    <RigidBody
      key={object.id}
      position={object.position}
      mass={Math.random() * 5}
    >
      <mesh>
        {object.type === "box" && <boxGeometry args={[1, 1, 1]} />}
        {object.type === "sphere" && <sphereGeometry args={[1, 16, 16]} />}
        {object.type === "cone" && <coneGeometry args={[1, 2, 16]} />}
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  ));
}

const page = () => {
  return (
    <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} intensity={1} />
      <Physics>
        <Ground /> {/* Add ground to keep the vehicle stable */}
        <Vehicle />
        {/* <FallingShapes /> */}
      </Physics>
    </Canvas>
  );
};

export default page;
