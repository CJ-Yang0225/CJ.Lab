import { usePlayerControls } from "../hooks/usePlayerControls";
import { playerState } from "../three.config";

export type PlayerProps = {
  speed?: number;
  height?: number;
};

function Player(props: PlayerProps) {
  const {
    speed = playerState.SPEED,
    height = playerState.HEIGHT,
  } = props;
  const ref = usePlayerControls({
    speed,
    height,
  });

  return (
    <mesh ref={ref}>
      <cylinderBufferGeometry args={[0.25, 0.25, height, 32]} />
      <meshPhongMaterial color={"hotpink"} />
    </mesh>
  );
}

export default Player;
