import React from "react";
import Layer from "./layers/BaseLayer";

type LayoutProps = {
  backgroundColor?: string;
  children?: React.ReactNode;
};

function Layout({ backgroundColor, children }: LayoutProps) {
  return (
    <Layer.Container backgroundColor={backgroundColor}>
      {children}
    </Layer.Container>
  );
}

export default Layout;
