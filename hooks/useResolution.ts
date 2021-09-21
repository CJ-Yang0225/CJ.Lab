import { useEffect, useLayoutEffect, useState } from "react";
import { debounce } from "../lib/utils";

export type Resolution = [number, number];

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const initialResolution: Resolution =
  typeof window === "undefined"
    ? [0, 0]
    : [window.innerWidth, window.innerHeight];

export const useResolution = (
  options = { savingMode: false, immediate: false }
) => {
  const { savingMode, immediate } = options;
  const [resolution, setResolution] = useState<Resolution>(initialResolution); // [window.innerWidth, window.innerHeight] causes 'window is not defined error'
  const updateResolution = () => {
    setResolution([window.innerWidth, window.innerHeight]);
  };

  useIsomorphicLayoutEffect(() => {
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
