import { ReactThreeFiber } from "@react-three/fiber/dist/react-three-fiber.cjs";
import { SphereGeometry } from "three";

// export * from "@react-three/fiber/dist/react-three-fiber.cjs";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      haloTest: ReactThreeFiber.Object3DNode<HaloTest, typeof HaloTest>;
    }
  }
}
