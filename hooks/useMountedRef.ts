import { useRef, useEffect } from "react";

export function useMountedRef(variable: any) {
  const ref = useRef(variable);
  useEffect(() => {
    ref.current = variable;
  }, [variable]);
  return ref.current;
}
