import React from "react";

import { useDimensions } from "../../../hooks/useDimensions";
import { CanvasContainer } from "./elements";
import { useIsomorphicLayoutEffect } from "../../../hooks/useIsomorphicLayoutEffect";

export interface CanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
  dpr: number;
}

function Canvas(
  props: CanvasProps,
  canvasRef: React.ForwardedRef<HTMLCanvasElement>
) {
  const [width, height] = useDimensions({ savingMode: true });
  const { dpr = 1, ...restProps } = props;

  useIsomorphicLayoutEffect(() => {
    const canvas = document.querySelector("canvas")!;
    const ctx = canvas?.getContext && canvas.getContext("2d")!;

    canvas.style.display = "block";
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.scale(dpr, dpr);
  }, [canvasRef, dpr, height, width]);

  return (
    <Canvas.Container style={{ backgroundColor: "#000000" }}>
      <canvas
        ref={canvasRef}
        width={Math.floor(width * dpr)}
        height={Math.floor(height * dpr)}
        onContextMenu={(event) => event.preventDefault()}
        {...restProps}
      />
    </Canvas.Container>
  );
}

Canvas.Container = CanvasContainer;

export default React.forwardRef(Canvas);
