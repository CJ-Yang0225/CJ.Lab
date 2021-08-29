import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { debounce, throttle } from "../lib/utils";

type Resolution = [number, number];

export const useResolution = (
  options = { savingMode: false, immediate: false }
) => {
  const { savingMode, immediate } = useMemo(() => options, [options]);
  const [resolution, setResolution] = useState<Resolution>([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const updateResolution = () => {
      setResolution([window.innerWidth, window.innerHeight]);
    };

    const debouncedUpdateResolution = debounce(updateResolution, 50, immediate);

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
