import { useEffect, useRef, useState } from "react";

const movementByKey: Record<string, string> = {
  w: "forward",
  s: "backward",
  a: "left",
  d: "right",
};
const initialMovement: Record<string, boolean> = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

export function usePlayerControls(pressedKeys: string[]) {
  const movement = useRef({ ...initialMovement });

  useEffect(() => {
    movement.current = { ...initialMovement };
    const pressedKeysMap = pressedKeys.reduce<{ [key: string]: boolean }>(
      (map, pressedKey) => {
        if (movementByKey.hasOwnProperty(pressedKey)) {
          map[movementByKey[pressedKey]] = true;
        }
        return map;
      },
      {}
    );

    Object.assign(movement.current, pressedKeysMap);
    console.log("movement: ", movement.current);
  }, [movement, pressedKeys]);
}
