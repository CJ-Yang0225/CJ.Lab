import React from "react";
import styled, { CSSObject } from "@emotion/styled";

type ReactButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export interface ButtonProps extends ReactButtonProps {
  borderColor?: CSSObject["color"];
  backgroundColor?: CSSObject["color"];
  textColor?: CSSObject["color"];
}

const ButtonBase = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;

  cursor: pointer;
  user-select: none;
  outline: 0;
  border-width: 2.5px;
  border-color: currentColor;
  border-radius: 0.5em;
  border: 2.5px initial currentColor;
  color: inherit;
  background-color: transparent;
`;

function Button(
  { borderColor, backgroundColor, textColor, children, ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <ButtonBase ref={ref} {...props}>
      {children}
    </ButtonBase>
  );
}

export default React.forwardRef(Button);
