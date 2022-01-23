import React, { useEffect } from "react";

import Canvas from "../components/common/Canvas";
import { useCanvas } from "../hooks/useCanvas";
import { renderParticles } from "../components/common/Canvas/drawing";

function CanvasPage() {
  const { ref, ...canvasProps } = useCanvas(renderParticles);

  return <Canvas {...canvasProps} ref={ref as React.Ref<HTMLCanvasElement>} />;
}

export default CanvasPage;
