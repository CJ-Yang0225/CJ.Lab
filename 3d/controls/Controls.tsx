import { PerspectiveCamera, PointerLockControls } from "@react-three/drei";

export type ControlsProps = {
  activateCustomControls?: boolean;
  perspective?: 1 | 2 | 3;
};

function Controls(props: ControlsProps) {
  const {
    activateCustomControls = false,
    perspective = 1, // TODO: switch perspective: first person & third person
  } = props;

  if (activateCustomControls) {
    return <PerspectiveCamera fov={75} far={1000} />;
  }

  return <PointerLockControls />;
}

export default Controls;
