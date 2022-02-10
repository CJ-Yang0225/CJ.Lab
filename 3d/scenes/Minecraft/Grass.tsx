import { PlaneProps, usePlane } from "@react-three/cannon";

function Grass(props: PlaneProps) {
  const [planeRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  return (
    <mesh ref={planeRef} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      {/* <meshStandardMaterial color="green" /> */}
      <meshPhongMaterial color={"#5b8b32"} />
    </mesh>
  );
}

export default Grass;
