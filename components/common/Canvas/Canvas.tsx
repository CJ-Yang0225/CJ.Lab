import React from "react";

import { useResolution } from "../../../hooks/useResolution";
import { CanvasContainer } from "./elements";

interface CanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {}

type MouseCoordinate = {
  x: number;
  y: number;
};

function Canvas(
  props: CanvasProps,
  ref: React.ForwardedRef<HTMLCanvasElement>
) {
  const [width, height] = useResolution({ savingMode: true, immediate: false });

  return (
    <Canvas.Container style={{ backgroundColor: "#000000" }}>
      <canvas
        ref={ref}
        width={width}
        height={height}
        onContextMenu={(event) => event.preventDefault()}
        {...props}
      />
    </Canvas.Container>
  );
}

Canvas.Container = CanvasContainer;

export default React.forwardRef(Canvas);
