import React from "react";

import Earth from "../../entities/Planets/Earth";
import { OrbitControls, Stars } from "@react-three/drei";

function Scene() {
  return (
    <React.Fragment>
      <Stars
        radius={150}
        count={8000}
        depth={30}
        saturation={0.3}
        factor={5}
        fade={true}
      />
      <directionalLight
        color="#fff2ec"
        intensity={1.25}
        position={[0, 3, 20]}
      />
      <Earth />
      <OrbitControls zoomSpeed={0.7} panSpeed={0.5} rotateSpeed={0.3} />
    </React.Fragment>
  );
}

export default Scene;
