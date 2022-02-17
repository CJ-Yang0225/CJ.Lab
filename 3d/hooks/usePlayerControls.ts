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
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export type PlayerControlsProps = {
  speed: number;
  position: Three.Object3D["position"];
  quaternion: Three.Object3D["quaternion"];
};

export function usePlayerControls(props: PlayerControlsProps) {
  const { speed, position, quaternion } = props;
  const movement = useRef({ ...initialMovement });
  const { camera } = useThree();
  const pressedKeys = useKeyboard();
  const velocity = useRef([0, 0, 0]).current; // physicals

  useEffect(() => {
    camera.position.set(...position);
    camera.quaternion.set(...quaternion);
  }, []);

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
  }, [movement, pressedKeys]);

  useFrame(() => {
    const { forward, backward, left, right, jump } = movement.current;
    const direction = new THREE.Vector3();
    const frontScalar = Number(backward) - Number(forward);
    const sideScalar = Number(right) - Number(left);
    frontVector
      .setFromMatrixColumn(camera.matrix, 0)
      .cross(camera.up)
      .multiplyScalar(frontScalar);
    sideVector.setFromMatrixColumn(camera.matrix, 0).multiplyScalar(sideScalar);
    const { x: px, y: py, z: pz } = camera.position;
    direction
      .addVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(speed);
    camera.position.set(px + direction.x, py, pz + direction.z);
    // console.log("direction:", direction, camera.position);
  });

  return;
}
