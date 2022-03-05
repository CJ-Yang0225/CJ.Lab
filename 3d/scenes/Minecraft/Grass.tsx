import { PlaneProps, usePlane } from "@react-three/cannon";

function Grass(props: PlaneProps) {
  const [planeRef] = usePlane(() => ({
    position: [0, -0.25, 0], // y-axis -0.25 because the length from the center point of Cube to the face is 0.25
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
