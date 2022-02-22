import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboard } from "../../hooks/useKeyboard";
import { useCylinder } from "@react-three/cannon";

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
};

export function usePlayerControls(props: PlayerControlsProps) {
  const { speed, position } = props;
  const movement = useRef({ ...initialMovement });
  const { camera } = useThree();
  const pressedKeys = useKeyboard();
  const [cylinderRef, api] = useCylinder(() => ({
    mass: 60,
    position: [0, position[1] + 1, 0],
    args: [0.2, 0.2, position[1], 32],
    material: {
      friction: 0,
    },
    fixedRotation: true,
  }));
  const velocity = useRef([0, 0, 0]); // physicals

  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((vel) => {
      velocity.current = vel;
    });

    return unsubscribe;
  }, [api]);

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
    cylinderRef.current?.getWorldPosition(camera.position);
    const direction = new THREE.Vector3();
    const frontScalar = Number(backward) - Number(forward);
    const sideScalar = Number(right) - Number(left);
    frontVector
      .setFromMatrixColumn(camera.matrix, 0) // first column of camera matrix is right vector
      .cross(camera.up) // calculate the vector perpendicular to both camera up and camera right
      .multiplyScalar(frontScalar);
    sideVector.setFromMatrixColumn(camera.matrix, 0).multiplyScalar(sideScalar);
    direction
      .addVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(speed);
    api.velocity.set(direction.x, velocity.current[1], direction.z);
    // console.log(direction, camera.position);
  });

  return cylinderRef;
}
