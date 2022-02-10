import { PerspectiveCamera, PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { usePlayerControls } from "../hooks/usePlayerControls";

import { playerState } from "../three.config";

export type PlayerProps = {
  activateCustomControls?: boolean;
  perspective?: 1 | 2 | 3;
  speed?: number;
  position?: [x: number, y: number, z: number];
  rotation?: [x: number, y: number, z: number, w: number];
};

function Player(props: PlayerProps) {
  const {
    activateCustomControls = true,
    perspective = 1, // TODO: switch perspective: first person & third person
    speed = playerState.SPEED, // TODO: calculate physical effects
    position = [0, 1, 0],
    rotation: quaternion = [0, 0, 0, 1],
  } = props;

  const camera = useThree((state) => state.camera);
  usePlayerControls()

  if (activateCustomControls) {
    camera.position.set(...position); // TODO: initial value of gravity and physics
    camera.quaternion.set(...quaternion);

    return <PerspectiveCamera makeDefault fov={75} far={1000} />;
  }

  return <PointerLockControls />;
}

export default Player;
