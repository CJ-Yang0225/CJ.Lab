import React from "react";
import Layer from "./layers/Layer";
import RenderLayer from "./layers/RenderLayer";

type LayoutProps = {
  backgroundColor?: string;
  children?: React.ReactNode;
};

function Layout({ backgroundColor, children }: LayoutProps) {
  return (
    <Layer.Container backgroundColor={backgroundColor}>
      <RenderLayer />
      {children}
    </Layer.Container>
  );
}

export default Layout;
