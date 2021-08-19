import { keyframes } from "@emotion/react";

export type Coordinated = [string, string];

export const move = (begin: Coordinated, end: Coordinated) => keyframes`
  from {
    transform: translate(${begin.join(", ")});
  }

  to {
    transform: translate(${end.join(", ")});
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    visibility: hidden;
  }
`;
