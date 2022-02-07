import { PerspectiveCamera, PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import { playerState } from "../three.config";

export type PlayerProps = {
  isCustomCamera?: boolean;
  speed?: number;
  position?: [x: number, y: number, z: number];
  rotation?: [x: number, y: number, z: number, w: number];
};

function Player(props: PlayerProps) {
  const {
    isCustomCamera = true,
    speed = playerState.SPEED, // TODO: calculate physical effects
    position = [0, 0, 0],
    rotation: quaternion = [0, 0, 0, 1],
  } = props;

  const camera = useThree((state) => state.camera);

  if (isCustomCamera) {
    camera.position.set(...position); // TODO: initial value of gravity and physics
    camera.quaternion.set(...quaternion);

    return <PerspectiveCamera makeDefault fov={75} far={1000} />;
  }

  return <PointerLockControls />;
}

export default Player;
