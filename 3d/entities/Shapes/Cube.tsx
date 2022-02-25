import { useState } from "react";
import { BoxProps, useBox } from "@react-three/cannon";
import { Color } from "@react-three/fiber";

type CubeProps = BoxProps & {
  color?: Color;
  layers?: number;
};

const randomColor = () => {
  const r = Math.ceil(Math.random() * 255)
    .toString(16)
    .padStart(2, "0");
  const g = Math.ceil(Math.random() * 255)
    .toString(16)
    .padStart(2, "0");
  const b = Math.ceil(Math.random() * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${r}${g}${b}`;
};

function Cube(props: CubeProps) {
  const { color, layers } = props;
  const [materialColor] = useState(color || randomColor);
  const [cubeRef, api] = useBox(() => ({
    mass: 30,
    args: [0.5, 0.5, 0.5],
    material: {
      friction: 1,
      restitution: 0,
    },
    ...props,
  }));

  return (
    <mesh ref={cubeRef} castShadow layers={layers}>
      <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
      <meshLambertMaterial color={materialColor} />
    </mesh>
  );
}

export default Cube;
