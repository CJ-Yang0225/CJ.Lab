import { useEffect, useLayoutEffect, useState } from "react";

import { debounce } from "../utils/helper";

export type Resolution = [number | undefined, number | undefined];

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const initialResolution: Resolution = [undefined, undefined];

export const useResolution = (
  options = { savingMode: false, immediate: false }
) => {
  const { savingMode, immediate } = options;
  const [resolution, setResolution] = useState<Resolution>(initialResolution);

  useIsomorphicLayoutEffect(() => {
    const updateResolution = () => {
      setResolution([window.innerWidth, window.innerHeight]);
    };
    updateResolution();

    const debouncedUpdateResolution = debounce(
      updateResolution,
      100,
      immediate
    );

    savingMode
      ? window.addEventListener("resize", debouncedUpdateResolution)
      : window.addEventListener("resize", updateResolution);

    return () => {
      window.removeEventListener("resize", debouncedUpdateResolution);
      window.removeEventListener("resize", updateResolution);
    };
  }, [savingMode, immediate]);

  return resolution;
};
