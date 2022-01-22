import React, { useEffect, useRef } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// @ts-ignore
import vertex from "../../glsl/waveEffect/vertex.vert";
// @ts-ignore
import fragment from "../../glsl/waveEffect/fragment.frag";
import { Material, Mesh, ShaderMaterial } from "three";
import { WaveShaderMaterial } from "../../glsl/waveEffect";

// export const WaveShaderMaterial = shaderMaterial(
//   {
//     u_time: 0,
//     u_color: new THREE.Color(0.0, 0.0, 0.0),
//     u_texture: new THREE.Texture(),
//   },
//   vertex,
//   fragment
// );

extend({ WaveShaderMaterial });

function WaveBanner() {
  const meshRef = useRef<Mesh | null>(null) as any;

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
      <waveShaderMaterial wireframe u_color="hotpink" />
    </mesh>
  );
}

export default WaveBanner;
