import React, { useEffect, useRef } from "react";
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
  const keySet = useRef(new Set<string>([])).current;
  keysToListen.forEach((key) => key.toLowerCase());

  useEffect(() => {
    if (listeners) {
      eventStore.add(window, "keydown", listeners.onKeyDown as EventListener);
      eventStore.add(window, "keyup", listeners.onKeyUp as EventListener);
    } else if (keysToListen.length > 0) {
      eventStore.add(window, "keydown", (event) => {
        const key = event.key.toLowerCase();
        if (keysToListen.includes(key)) {
          keySet.add(key);
        }
      });
      eventStore.add(window, "keyup", (event) => {
        const key = event.key.toLowerCase();
        if (keySet.has(key)) {
          keySet.delete(key);
        }
      });
    } else {
      eventStore.add(window, "keydown", (event) => {
        keySet.add(event.key);
      });
      eventStore.add(window, "keyup", (event) => {
        keySet.delete(event.key);
      });
    }

    return eventStore.clean;
  }, [keySet, keysToListen, listeners]);

  return keySet;
}
