import { useEffect, useState } from "react";

const movementByKey: Record<string, string> = {
  w: "forward",
  s: "backward",
  a: "left",
  d: "right",
};

export function usePlayerControls(pressedKeys: string[]) {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    setMovement((movement) => {
      const pressedKeysMap = pressedKeys.reduce<{ [key: string]: boolean }>(
        (map, pressedKey) => {
          map[movementByKey[pressedKey]] = true;
          return map;
        },
        {}
      );

      return { ...movement, ...pressedKeysMap };
    });
  }, [pressedKeys]);

  console.log("movement: ", movement);
}
