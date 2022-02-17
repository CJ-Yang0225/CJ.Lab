import React from "react";
import styled from "@emotion/styled";

export interface OverlayProps {
  children?: React.ReactNode;
}

function UI(props: OverlayProps) {
  return (
    <React.Fragment>
      <Crosshair />
      {props.children && <Overlay>{props.children}</Overlay>}
    </React.Fragment>
  );
}

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
`;

const Crosshair = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px gray solid;
  background-color: white;
  transform: translate(-50%, -50%);
  z-index: 99;
`;

export default UI;
