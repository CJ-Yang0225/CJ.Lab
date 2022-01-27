import { useEffect, useRef, useState } from "react";

import { CanvasProps } from "../components/common/Canvas/Canvas";

export function useCanvas(
  drawingFunc: (canvas: HTMLCanvasElement) => void
): JSX.IntrinsicElements["canvas"] & CanvasProps {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const { devicePixelRatio = 1 } = window;
    setDpr(devicePixelRatio);
  }, [dpr]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const clean = drawingFunc(canvas);

    return clean;
  }, [drawingFunc]);

  return { ref: canvasRef, dpr };
}
