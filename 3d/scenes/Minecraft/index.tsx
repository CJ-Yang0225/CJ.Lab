import React from "react";
import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";

import Grass from "./Grass";
import Controls from "../../controls/Controls";
import Player from "../../entities/Player";

type WorldProps = {
  ecosystem: string;
};

function World(props: WorldProps) {
  return (
    <React.Suspense fallback={null}>
      <Sky sunPosition={[100, 20, 100]} distance={1000} />
      <ambientLight intensity={0.3} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <Physics>
        <Grass />
        <Player />
      </Physics>
      <Controls activateCustomControls={false} />
    </React.Suspense>
  );
}

export default World;
