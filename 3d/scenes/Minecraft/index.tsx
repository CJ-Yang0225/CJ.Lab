import React from "react";
import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";

import Grass from "./Grass";
import Controls from "../../controls/Controls";
import Player from "../../entities/Player";
import { Cube } from "../../entities/Shapes";

type WorldProps = {
  ecosystem: string;
};

function World(props: WorldProps) {
  return (
    <React.Suspense fallback={null}>
      <Sky sunPosition={[100, 100, 100]} distance={1000} />
      <ambientLight intensity={0.3} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <Physics
        allowSleep={false}
        gravity={[0, -10, 0]}
        tolerance={0}
        iterations={50}
        broadphase={"Naive"}
      >
        <axesHelper args={[3]} position={[0, -0.25, 0]} />
        <Grass />
        <Player height={1} />
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
        <Cube position={[-4.5, 1.5, -5]} type="Static" />
      </Physics>
      <Controls activateCustomControls={false} />
    </React.Suspense>
  );
}

export default World;
