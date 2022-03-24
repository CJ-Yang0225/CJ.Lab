import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

// @ts-ignore
import vertex from "./vertex.vert";
// @ts-ignore
import fragment from "./fragment.frag";

export const WaveShaderMaterial = shaderMaterial(
  // Uniform
  {
    u_time: 0,
    u_color: new THREE.Color(),
    u_texture: new THREE.Texture(),
  },
  vertex, // Vertex Shader
  fragment // Fragment Shader
);

extend({ WaveShaderMaterial });
