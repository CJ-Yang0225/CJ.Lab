import styled from "@emotion/styled";

export type LayerContainerProps = {
  backgroundColor?: string;
};

export type LayerProps = {
  hidden?: boolean;
};

const LayerContainer = styled.div<LayerContainerProps>`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  ${({ backgroundColor = "currentColor" }) => ({
    backgroundColor,
  })}
`;

const Layer = styled.div<LayerProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &hidden {
    opacity: 0;
    visibility: hidden;
  }
`;

export default Object.assign(Layer, {
  Container: LayerContainer,
});
