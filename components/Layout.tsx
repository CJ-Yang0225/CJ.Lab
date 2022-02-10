import React from "react";
import dynamic from "next/dynamic";

import Layer from "./layers/Layer";
const RenderLayer = dynamic(() => import("./layers/RenderLayer"), {
  ssr: false,
});

type LayoutProps = {
  backgroundColor?: string;
  children?: React.ReactNode;
};

function Layout(props: LayoutProps) {
  const { backgroundColor, children } = props;
  return (
    <Layer.Container backgroundColor={backgroundColor}>
      <RenderLayer />
      {children}
    </Layer.Container>
  );
}

export default Layout;
