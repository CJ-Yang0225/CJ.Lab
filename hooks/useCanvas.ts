import React, { useEffect, useRef } from "react";

export function useCanvas(
  renderingFunc: (canvas: HTMLCanvasElement) => void
): JSX.IntrinsicElements["canvas"] {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const clean = renderingFunc(canvas);

    return clean;
  }, [renderingFunc]);

  return { ref: canvasRef };
}
