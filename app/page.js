"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";

// Ground or road to prevent vehicle from falling
const Ground = () => {
  return (
    <RigidBody type="fixed">
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[20, 40]} /> {/* Large plane to simulate road */}
        <meshStandardMaterial color="gray" />
      </mesh>
    </RigidBody>
  );
};

function Vehicle() {
  const vehicleRef = useRef();
  const [rotationY, setRotationY] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (vehicleRef.current) {
        // Calculate the direction vector based on the current rotationY
        const direction = {
          x: Math.sin(rotationY), // Forward/backward direction
          z: Math.cos(rotationY), // Left/right direction
        };

        switch (event.key) {
          case "s":
            // Move backward in the direction the vehicle is facing
            vehicleRef.current.applyImpulse(
              { x: -direction.x * 5, y: 0, z: -direction.z * 5 },
              true
            );
            break;
          case "w":
            // Move forward in the direction the vehicle is facing
            vehicleRef.current.applyImpulse(
              { x: direction.x * 5, y: 0, z: direction.z * 5 },
              true
            );
            break;
          default:
            break;
        }
      }
    };

    const handleMouseMove = (event) => {
      const mouseX = event.movementX; // Track horizontal mouse movement
      const sensitivity = 0.005; // Adjust for more or less sensitivity
      setRotationY((prevRotationY) => prevRotationY - mouseX * sensitivity);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [rotationY]); // Update useEffect to depend on rotationY

  return (
    <RigidBody
      ref={vehicleRef}
      position={[0, 0, 0]}
      rotation={[0, rotationY, 0]} // Apply rotation based on mouse movement
      colliders="hull"
    >
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

export default page;
