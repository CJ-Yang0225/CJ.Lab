import React, { useEffect, useRef } from "react";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

import { WaveShaderMaterial } from "../../glsl/waveEffect";

extend({ WaveShaderMaterial });

function WaveBanner() {
  const [flagTexture] = useLoader(THREE.TextureLoader, [
    "/textures/Flag_of_the_Republic_of_China.png",
  ]);
  const meshRef = useRef<THREE.Mesh | null>(null) as any;

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  useEffect(() => {
    console.log("mounted");
  }, []);

  return (
    <mesh ref={meshRef}>
      <planeBufferGeometry args={[0.8, 0.6, 24, 24]} />
      <waveShaderMaterial
        u_texture={flagTexture}
        u_color={new THREE.Color(0x000096)}
      />
    </mesh>
  );
}

export default WaveBanner;
