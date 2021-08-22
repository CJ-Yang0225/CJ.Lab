import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import Button from "../Button";

const sheen = keyframes`
  100% {
    transform: rotateZ(60deg) translate(1em, -9em);
  }
`;

const ShinyButton = styled(Button)`
  position: relative;
  overflow: hidden;

  padding: 0.5em 1em;

  border: none;
  border-radius: 0.5em;
  ${({ backgroundColor, textColor }) => ({
    color: textColor,
    backgroundColor,
  })};
  font-size: 20px;
  line-height: 32px;
  transition: all 0.5s cubic-bezier(0.67, -0.51, 0.42, 1.43);

  &::after {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    background: linear-gradient(
      to bottom,
      transparent,
      hsla(0, 0%, 100%, 0.5) 50%,
      transparent
    );
    transform: rotateZ(60deg) translate(0, 7.5em);
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.25);
  }

  &:hover::after,
  &:focus::after {
    animation: ${sheen} 1s forwards;
  }
`;

export default ShinyButton;
