import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("../components/common/Canvas"), {
  ssr: false,
});

function CanvasPage() {
  return <Canvas />;
}

export default CanvasPage;
