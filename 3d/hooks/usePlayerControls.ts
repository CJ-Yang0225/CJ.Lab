import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree, Vector3, Vector4 } from "@react-three/fiber";
import { useKeyboard } from "../../hooks/useKeyboard";

const movementByKey: Record<string, string> = {
  w: "forward",
  s: "backward",
  a: "left",
  d: "right",
  " ": "jump",
};
const initialMovement: Record<string, boolean> = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
};
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const rotation = new THREE.Vector3();
const speed = new THREE.Vector3();

export type PlayerControlsProps = {
  speed: number;
  position: Vector3;
  rotation: Vector4;
};

export function usePlayerControls(props: PlayerControlsProps) {
  const { speed, position, rotation } = props;
  const movement = useRef({ ...initialMovement });
  const { camera, scene } = useThree();
  const pressedKeys = useKeyboard();
  const velocity = useRef([0, 0, 0]).current; // physicals

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
    // console.log("movement: ", movement.current);
  }, [movement, pressedKeys]);

  useFrame(() => {
    const { forward, backward, left, right, jump } = movement.current;
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(right) - Number(left), 0, 0);
    const { x: px, y: py, z: pz } = camera.position;
    const { x: rx, y: ry, z: rz } = camera.rotation;
    const r = new THREE.Euler(rx, ry, rz, "XYZ");
    direction
      .addVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(speed)
      .applyEuler(r);
    console.log("direction: ", direction);
    camera.position.set(px + direction.x, py, pz + direction.z);
  });

  return;
}
