import React, { Suspense } from "react";
import styled from "@emotion/styled";

import Scene from "../../three/scenes/Universe/Scene";
import { Canvas } from "@react-three/fiber";
import BaseLayer from "./BaseLayer";

const Layer = styled(BaseLayer)`
  transition-property: opacity;
  transition-duration: 1s;
  transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1);

  &[hidden] {
    display: block;
    visibility: hidden;
    opacity: 0;
    transition: unset;
  }
`;

function RenderLayer() {
  return (
    <Layer>
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </Layer>
  );
}

export default RenderLayer;
