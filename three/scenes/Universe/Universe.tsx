import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import Layout from "../../../components/Layout";
import Earth from "../../entities/Earth";
import { OrbitControls, Stars } from "@react-three/drei";

function Universe() {
  return (
    <Layout backgroundColor="#010113">
      <Canvas>
        <Suspense fallback={null}>
          <Stars
            radius={150}
            count={8000}
            depth={30}
            saturation={0.3}
            factor={5}
            fade={true}
          />
          <pointLight color="#fff2ec" intensity={1.2} position={[0, 5, 20]} />
          <Earth />
          <OrbitControls
            zoomSpeed={0.7}
            panSpeed={0.5}
            rotateSpeed={0.3}
          />
        </Suspense>
      </Canvas>
    </Layout>
  );
}

export default Universe;
