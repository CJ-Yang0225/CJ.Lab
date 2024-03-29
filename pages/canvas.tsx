import Head from "next/head";
import React from "react";

import Canvas from "../components/common/Canvas";
import { useCanvas } from "../hooks/useCanvas";
import { renderParticles } from "../components/common/Canvas/particles/rgb";

function CanvasPage() {
  const { ref, ...canvasProps } = useCanvas(renderParticles);

  return (
    <React.Fragment>
      <Head>
        <title>CJ&apos;s Lab</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          {`
            body {
              /* Disables pull-to-refresh but allows overscroll glow effects. */
              overscroll-behavior-y: contain;
            }
          `}
        </style>
      </Head>
      <Canvas {...canvasProps} ref={ref as React.Ref<HTMLCanvasElement>} />
    </React.Fragment>
  );
}

export default CanvasPage;
