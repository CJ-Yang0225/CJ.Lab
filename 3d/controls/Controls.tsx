import { PerspectiveCamera, PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { usePlayerControls } from "../hooks/usePlayerControls";

import { playerState } from "../three.config";

export type ControlsProps = {
  activateCustomControls?: boolean;
  perspective?: 1 | 2 | 3;
  speed?: number;
  position?: [x: number, y: number, z: number];
  rotation?: [x: number, y: number, z: number, w: number];
};

function Controls(props: ControlsProps) {
  const {
    activateCustomControls = false,
    speed = playerState.SPEED,
    position = [0, playerState.HEIGHT, 0],
    rotation = [0, 0, 0, 1],
  } = props;

  usePlayerControls({ speed, position, rotation });
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...position);
    camera.quaternion.set(...rotation);
  }, []);

  if (activateCustomControls) {
    return <PerspectiveCamera fov={75} far={1000} />;
  }

  return <PointerLockControls />;
}

export default Controls;
