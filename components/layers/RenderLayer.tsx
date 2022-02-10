import React from "react";
import styled from "@emotion/styled";

import Solar from "../../3d/scenes/Universe/Index";
import { Canvas } from "@react-three/fiber";
import LayerBase from "./Layer";
import { LayerUsage } from "../../utils/components";

const Layer = styled(LayerBase)`
  transition-property: opacity;
  transition-duration: 1s;
  transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1);

  &[hidden] {
    transition: unset;
  }
`;

function RenderLayer() {
  return (
    <Layer zIndex={LayerUsage.Background}>
      <Canvas>
        <React.Suspense fallback={null}>
          <Solar />
        </React.Suspense>
      </Canvas>
    </Layer>
  );
}

export default RenderLayer;
