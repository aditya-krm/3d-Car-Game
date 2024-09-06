import { RigidBody } from "@react-three/rapier";

const Ground = () => {
  let z = 0;
  return (
    <RigidBody type="fixed">
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, z]}>
        <planeGeometry args={[20, 40]} />
        <meshStandardMaterial color="green" />
      </mesh>
      {Array.from({ length: 2 }).map((_, i) => {
        z += 40;
        return (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, z]}>
            <planeGeometry args={[20, 40]} />
            <meshStandardMaterial color={i % 2 === 0 ? "red" : "green"} />
          </mesh>
        );
      })}
    </RigidBody>
  );
};

export default Ground;
