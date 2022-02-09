import React, { useEffect, useState } from "react";
import { EventStore } from "../utils/events";

type Listeners = {
  onKeyDown: (event: KeyboardEvent | React.KeyboardEvent) => void;
  onKeyUp: (event: KeyboardEvent | React.KeyboardEvent) => void;
};

const eventStore = new EventStore();

export function useKeyboard(
  keysToListen: string[] = [],
  listeners?: Listeners
) {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  keysToListen.forEach((key) => key.toLowerCase());

  useEffect(() => {
    if (listeners) {
      eventStore.add(window, "keydown", listeners.onKeyDown as EventListener);
      eventStore.add(window, "keyup", listeners.onKeyUp as EventListener);
    } else if (keysToListen.length > 0) {
      eventStore.add(window, "keydown", (event) => {
        const key = event.key.toLowerCase();
        if (keysToListen.includes(key)) {
          setPressedKeys((keys) => Array.from(new Set([...keys, key])));
        }
      });
      eventStore.add(window, "keyup", (event) => {
        const key = event.key.toLowerCase();
        if (pressedKeys.includes(key)) {
          setPressedKeys((keys) =>
            keys.filter((pressedKey) => pressedKey !== key)
          );
        }
      });
    } else {
      eventStore.add(window, "keydown", (event) => {
        const key = event.key.toLowerCase();
        setPressedKeys((keys) => Array.from(new Set([...keys, key])));
      });
      eventStore.add(window, "keyup", (event) => {
        const key = event.key.toLowerCase();
        if (pressedKeys.includes(key)) {
          setPressedKeys((keys) =>
            keys.filter((pressedKey) => pressedKey !== key)
          );
        }
      });
    }

    return eventStore.clean;
  }, [pressedKeys, keysToListen, listeners]);

  return pressedKeys;
}
