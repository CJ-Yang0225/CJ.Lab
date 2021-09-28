import React, { useCallback, useEffect, useRef } from "react";
import { useResolution } from "../../../hooks/useResolution";
import { CanvasContainer } from "./elements";

interface CanvasProps extends React.HTMLAttributes<HTMLCanvasElement> {
  draw?: (ctx: CanvasRenderingContext2D) => void;
}

type MouseCoordinate = {
  x: number | undefined;
  y: number | undefined;
};

function Canvas(props: CanvasProps) {
  const { draw, ...rest } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, height] = useResolution({ savingMode: true, immediate: false });
  const mouse = useRef<MouseCoordinate>({
    x: undefined,
    y: undefined,
  }).current;

  const draw2 = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(mouse.x as number, mouse.y as number, 50, 0, Math.PI * 2);
      ctx.fill();
    },
    [mouse.x, mouse.y]
  );

  useEffect(() => {
    const canvas = canvasRef.current!;
    /* const container = canvas.parentElement!;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight; */
    const ctx = canvas.getContext("2d")!;

    let animationFrameId: number;

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw2(ctx);
      animationFrameId = requestAnimationFrame(render);
    }
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [mouse.x, mouse.y, draw2]);

  return (
    <Canvas.Container style={{ backgroundColor: "black" }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        {...rest}
        onMouseMove={(event) => {
          mouse.x = event.pageX;
          mouse.y = event.pageY;
          console.log("click");
        }}
        onContextMenu={(event) => event.preventDefault()}
      />
      {/* <h1 style={{ position: "absolute", top: 0, height: "25%" }}>Test</h1> */}
    </Canvas.Container>
  );
}

Canvas.Container = CanvasContainer;

export default Canvas;
