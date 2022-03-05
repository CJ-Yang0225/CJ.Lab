import { useLayoutEffect, useRef } from "react";
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
  shift: "sprint",
};
const initialMovement: Record<string, boolean> = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  jump: false,
  sprint: false,
};
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const jumpCoolDown = 500;
const jumpSpeed = 4;

export type PlayerControlsProps = {
  speed: number;
  height: number;
};

export function usePlayerControls(props: PlayerControlsProps) {
  const { speed, height } = props;
  const movement = useRef({ ...initialMovement });
  const { camera, scene } = useThree();
  const pressedKeys = useKeyboard();
  const [cylinderRef, api] = useCylinder(() => ({
    mass: 60,
    position: [0, height, 0],
    args: [0.2, 0.2, height, 32], // TODO: fix see through objects when jumping
    material: {
      friction: 0,
    },
    fixedRotation: true,
  }));
  const player = useRef({
    jumping: false,
    timeToJump: 0,
    velocity: new THREE.Vector3(),
  }).current;

  useLayoutEffect(() => {
    const unsubscribe = api.velocity.subscribe((vel) => {
      player.velocity.fromArray(vel);
    });

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
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
    const { forward, backward, left, right, jump, sprint } = movement.current;

    if (forward || backward || left || right) {
      const frontScalar = Number(backward) - Number(forward);
      const sideScalar = Number(right) - Number(left);
      frontVector
        .setFromMatrixColumn(camera.matrix, 0) // first column of camera matrix is right vector
        .cross(camera.up) // calculate the vector perpendicular to both camera up and camera right
        .multiplyScalar(frontScalar);
      sideVector
        .setFromMatrixColumn(camera.matrix, 0)
        .multiplyScalar(sideScalar);
      direction
        .addVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(speed);

      if (sprint) {
        direction.multiplyScalar(1.5);
      }
    }

    // BUG: player.velocity.y will have a bug when hot reloading
    if (jump && !player.jumping) {
      const now = Date.now();
      if (now > player.timeToJump) {
        player.timeToJump = now + jumpCoolDown;
        player.jumping = true;
        player.velocity.y += jumpSpeed;
      }
    }

    if (player.jumping && player.velocity.y.toFixed(2) === "0.00") {
      const raycaster = new THREE.Raycaster(
        camera.position,
        new THREE.Vector3(0, -1, 0),
        0,
        camera.position.y + 0.25 // add 0.25 for grass y-axis -0.25
      );

      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        player.jumping = false;
      }
    }

    api.velocity.set(direction.x, player.velocity.y, direction.z);
    cylinderRef.current?.getWorldPosition(camera.position); // returns cylinder's world position to camera
    camera.position.y += height / 2;
  });

  return cylinderRef;
}
