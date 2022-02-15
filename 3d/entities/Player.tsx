import { usePlayerControls } from "../hooks/usePlayerControls";
import { playerState } from "../three.config";

export type PlayerProps = {
  perspective?: 1 | 2 | 3;
  speed?: number;
  position?: [x: number, y: number, z: number];
  rotation?: [x: number, y: number, z: number, w: number];
};

function Player(props: PlayerProps) {
  const {
    perspective = 1, // TODO: switch perspective: first person & third person
    speed = playerState.SPEED, // TODO: calculate physical effects
    position = [0, playerState.HEIGHT, 0],
    rotation = [0, 0, 0, 1],
  } = props;
  // const ref = usePlayerControls({ speed, position, rotation });
  return <mesh></mesh>;
}

export default Player;
