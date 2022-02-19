import { usePlayerControls } from "../hooks/usePlayerControls";
import { playerState } from "../three.config";

export type PlayerProps = {
  speed?: number;
  height?: number;
  quaternion?: Three.Object3D["quaternion"];
};

function Player(props: PlayerProps) {
  const {
    speed = playerState.SPEED,
    height = playerState.HEIGHT,
    quaternion = [0, 0, 0, 1],
  } = props;
  const ref = usePlayerControls({
    speed,
    position: [0, height, 0],
    quaternion,
  });

  return (
    <mesh ref={ref}>
      <cylinderBufferGeometry args={[0.5, 0.5, height, 32]} />
      <meshPhongMaterial color={"hotpink"} />
    </mesh>
  );
}

export default Player;
