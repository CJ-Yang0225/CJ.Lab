import { ReactThreeFiber } from "@react-three/fiber/dist/react-three-fiber.cjs";
import { ShaderMaterial } from "three";

import { HaloTest } from "./components/three/entities/Planets/Earth";
import { WaveShaderMaterial } from "./components/three/entities/Banner";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      haloTest: ReactThreeFiber.Object3DNode<HaloTest, typeof HaloTest>;
      waveShaderMaterial: ReactThreeFiber.Object3DNode<
        WaveShaderMaterial,
        typeof WaveShaderMaterial
      >;
    }
  }
}
