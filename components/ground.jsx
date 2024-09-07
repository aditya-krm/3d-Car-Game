import { RigidBody } from "@react-three/rapier";

const Ground = () => {
  let z = 0;
  return (
    <RigidBody type="fixed" friction={0.8} restitution={0.1}>
      {/* High friction, low bounce for the ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, z]}>
        <planeGeometry args={[20, 40]} />{" "}
        {/* Covers the range [-10, 10] on x-axis and [-20, 20] on z-axis */}
        <meshStandardMaterial color="green" />
      </mesh>
      {Array.from({ length: 3 }).map((_, i) => {
        z += 40;
        return (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, z]}>
            <planeGeometry args={[20, 40]} />
            <meshStandardMaterial color={i % 2 === 0 ? "orange" : "green"} />
          </mesh>
        );
      })}
    </RigidBody>
  );
};
export default Ground;
