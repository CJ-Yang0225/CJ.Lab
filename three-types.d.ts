import { ReactThreeFiber } from "@react-three/fiber/dist/react-three-fiber.cjs";
import { ShaderMaterial } from "three";

import { HaloTest } from "./3d/entities/Planets/Earth";
import { WaveShaderMaterial } from "./3d/entities/Banner";

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

  namespace Three {
    interface Object3D {
      position: [x: number, y: number, z: number];
      quaternion: [x: number, y: number, z: number, w: number];
    }
  }
}
