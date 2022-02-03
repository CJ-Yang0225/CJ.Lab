import { useRef, useState } from "react";

import { CanvasProps } from "../components/common/Canvas/Canvas";
import { isMobileDevice, toggleFullScreen } from "../utils/ux";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function useCanvas(
  drawingFunc: (canvas: HTMLCanvasElement) => void
): JSX.IntrinsicElements["canvas"] & CanvasProps {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dpr, setDpr] = useState(1);

  useIsomorphicLayoutEffect(() => {
    const { devicePixelRatio = 1 } = window;
    setDpr(devicePixelRatio);
  }, [dpr]);

  useIsomorphicLayoutEffect(() => {
    if (isMobileDevice()) {
      window.addEventListener("dblclick", toggleFullScreen);
    }

    return () => {
      window.removeEventListener("dblclick", toggleFullScreen);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    const canvas = canvasRef.current!;
    const clean = drawingFunc(canvas);

    return clean;
  }, [drawingFunc]);

  return { ref: canvasRef, dpr };
}
