import React from "react";
import { Canvas } from "@react-three/fiber";

import World from "../../3d/scenes/Minecraft";
import { useCanvas } from "../../hooks/useCanvas";
import Layer from "../../components/layers/Layer";
import UI from "../../components/common/UI";

type MinecraftProps = {
  ecosystem: string;
};

function Minecraft(props: MinecraftProps) {
  const { ecosystem } = props;
  const { dpr } = useCanvas();
  return (
    <Layer.Container>
      <Canvas
        dpr={dpr}
        shadows
        gl={{ alpha: false }}
        camera={{ fov: 75 }}
        raycaster={{
          computeOffsets: (e) => ({
            offsetX: e.target.width / 2,
            offsetY: e.target.height / 2,
          }),
        }}
      >
        <World ecosystem={ecosystem} />
      </Canvas>
      <UI />
    </Layer.Container>
  );
}

export default Minecraft;
