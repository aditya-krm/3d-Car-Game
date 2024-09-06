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

export default FallingShapes;
