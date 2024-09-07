import { RigidBody } from "@react-three/rapier";
import React, { useEffect, useState } from "react";

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
          position: [Math.random() * 20 - 10, 5, Math.random() * 120 - 40], // Covers all ground areas
        },
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return objects.map((object) => (
    <RigidBody
      key={object.id}
      position={object.position}
      mass={object.type === "sphere" ? 1 : 3} // Give lighter mass to spheres for realistic rolling
      friction={0.5} // Moderate friction for realistic sliding
      restitution={0.2} // Add slight bounciness
    >
      <mesh>
        {object.type === "box" && <boxGeometry args={[1, 1, 1]} />}
        {object.type === "sphere" && <sphereGeometry args={[1, 16, 16]} />}
        {object.type === "cone" && <coneGeometry args={[1, 2, 16]} />}
        <meshStandardMaterial
          color={object.type === "sphere" ? "blue" : "red"}
        />
      </mesh>
    </RigidBody>
  ));
}

export default FallingShapes;
