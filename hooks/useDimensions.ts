import { useState } from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";
import { debounce } from "../utils/ux";

export type Dimensions = [number, number];
type Options = {
  savingMode?: boolean;
  immediate?: boolean;
};

const initialDimensions: Dimensions = [0, 0];

export function useDimensions(
  options: Options = { savingMode: false, immediate: false }
) {
  const { savingMode = false, immediate = false } = options;
  const [dimensions, setDimensions] = useState<Dimensions>(initialDimensions);

  useIsomorphicLayoutEffect(() => {
    const updateDimensions = () => {
      setDimensions([window.innerWidth, window.innerHeight]);
    };
    updateDimensions();

    const debouncedUpdateDimensions = debounce(
      updateDimensions,
      100,
      immediate
    );

    savingMode
      ? window.addEventListener("resize", debouncedUpdateDimensions)
      : window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", debouncedUpdateDimensions);
      window.removeEventListener("resize", updateDimensions);
    };
  }, [savingMode, immediate]);

  return dimensions;
}
