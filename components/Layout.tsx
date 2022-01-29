import React from "react";

import Layer from "./layers/Layer";

type LayoutProps = {
  backgroundColor?: string;
  children?: React.ReactNode;
};

function Layout(props: LayoutProps) {
  const { backgroundColor, children } = props;
  return (
    <Layer.Container backgroundColor={backgroundColor}>
      {children}
    </Layer.Container>
  );
}

export default Layout;
