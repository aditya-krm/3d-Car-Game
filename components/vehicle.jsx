import { RigidBody } from "@react-three/rapier";
import React, { useEffect, useRef, useState } from "react";

function Vehicle() {
  const vehicleRef = useRef();
  const [rotationY, setRotationY] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (vehicleRef.current) {
        const direction = {
          x: Math.sin(rotationY),
          z: Math.cos(rotationY),
        };

        switch (event.key) {
          case "s":
            vehicleRef.current.applyImpulse(
              { x: -direction.x * 5, y: 0, z: -direction.z * 5 },
              true
            );
            break;
          case "w":
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
      const mouseX = event.movementX;
      const sensitivity = 0.001;
      setRotationY((prevRotationY) => prevRotationY - mouseX * sensitivity);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [rotationY]);

  return (
    <RigidBody
      ref={vehicleRef}
      position={[0, 0, 0]}
      rotation={[0, rotationY, 0]}
      colliders="hull"
    >
      <mesh>
        <boxGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <mesh position={[0, -0.5, 1.5]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>

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

export default Vehicle;
