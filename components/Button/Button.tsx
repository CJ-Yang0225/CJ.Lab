import React, { AllHTMLAttributes, ReactNode } from "react";
import styled, { CSSObject } from "@emotion/styled";

type ReactButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export interface ButtonProps extends ReactButtonProps {
  borderColor?: CSSObject["color"];
  backgroundColor?: CSSObject["color"];
  textColor?: CSSObject["color"];
}

function Button(
  { borderColor, backgroundColor, textColor, children, ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <button {...props} ref={ref}>
      {children}
    </button>
  );
}

export default React.forwardRef(Button);
