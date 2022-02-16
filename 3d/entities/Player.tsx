import { usePlayerControls } from "../hooks/usePlayerControls";
import { playerState } from "../three.config";

export type PlayerProps = {
  speed?: number;
  position?: Three.Object3D["position"];
  quaternion?: Three.Object3D["quaternion"];
};

function Player(props: PlayerProps) {
  const {
    speed = playerState.SPEED,
    position = [0, playerState.HEIGHT, 0],
    quaternion = [0, 0, 0, 1],
  } = props;
  const ref = usePlayerControls({ speed, position, quaternion });
  return <mesh></mesh>;
}

export default Player;
