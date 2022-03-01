import { PlaneProps, usePlane } from "@react-three/cannon";

function Grass(props: PlaneProps) {
  const [planeRef] = usePlane(() => ({
    position: [0, -0.25, 0],  // Y-axis -0.5 because of Cube position
    rotation: [-Math.PI / 2, 0, 0],
    material: {
      friction: 1,
    },
    ...props,
  }));

  return (
    <mesh ref={planeRef} receiveShadow name="Grass">
      <planeGeometry args={[1000, 1000]} />
      {/* <meshStandardMaterial color="green" /> */}
      <meshPhongMaterial color={"#5b8b32"} />
    </mesh>
  );
}

export default Grass;
