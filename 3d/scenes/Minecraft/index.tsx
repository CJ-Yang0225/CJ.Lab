import React, { useState } from "react";
import { Physics, useBox } from "@react-three/cannon";
import { Sky } from "@react-three/drei";

import Grass from "./Grass";
import Controls from "../../controls/Controls";
import Player from "../../entities/Player";

type WorldProps = {
  ecosystem: string;
};

// decoration test
const Cube = (props: any) => {
  const [color, setColor] = useState("white");
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
    <mesh ref={cubeRef} castShadow layers={props.layers}>
      <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
      <meshLambertMaterial color={color} />
    </mesh>
  );
};

function World(props: WorldProps) {
  return (
    <React.Suspense fallback={null}>
      <Sky sunPosition={[100, 20, 100]} distance={1000} />
      <ambientLight intensity={0.3} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <Physics
        allowSleep={false}
        gravity={[0, -9.81, 0]}
        tolerance={0}
        iterations={50}
        broadphase={"Naive"}
      >
        <Grass />
        <Player height={2} />
        <Cube position={[0, 0, -5]} layers={1} />
        <Cube position={[-0.6, 0, -5]} />
        <Cube position={[0.6, 0, -5]} />
        <Cube position={[-0.3, 0.5, -5]} />
        <Cube position={[0.3, 0.5, -5]} />
        <Cube position={[0, 1, -5]} />
        <Cube position={[-5, 0, -5]} />
        <Cube position={[-5, 0.5, -5]} />
        <Cube position={[-5, 1, -5]} />
        <Cube position={[-5, 1.5, -5]} />
      </Physics>
      <Controls activateCustomControls={false} />
    </React.Suspense>
  );
}

export default World;
