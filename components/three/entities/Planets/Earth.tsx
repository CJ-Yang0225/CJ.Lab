import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Mesh, ShaderMaterial, TextureLoader } from "three";
import { extend, GroupProps, useFrame, useLoader } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
// @ts-ignore
import vertex from "../../glsl/shader.vert";
import { useResolution } from "../../../../hooks/useResolution";

const EarthDayMap = "/textures/8k_earth_daymap.jpg";
const EarthNightMap = "/textures/8k_earth_nightmap.jpg";
const EarthSpecularMap = "/textures/8k_earth_specular_map.jpg";
const EarthNormalMap = "/textures/8k_earth_normal_map.jpg";
const EarthCloudMap = "/textures/8k_earth_clouds.jpg";

const textureMaps = [
  EarthDayMap,
  EarthNightMap,
  EarthSpecularMap,
  EarthNormalMap,
  EarthCloudMap,
];

export const HaloTest = shaderMaterial(
  {
    u_time: 0,
    u_color: new THREE.Color(0.0, 0.0, 1.0),
    u_resolution: new THREE.Vector2(0, 0),
  },
  vertex,
  /* glsl */`
    precision mediump float;
    uniform float u_time;
    uniform vec3 u_color;
    uniform vec2 u_resolution;
    varying vec2 v_uv;
    varying vec3 v_position;

    void main() {
      vec2 st = v_uv;
      st.x *= v_uv.y / v_uv.x;

      gl_FragColor = vec4(1.0 - abs(sin(st.x + u_time)), st.y, 0.5, 1.0);
    }
  `
);

extend({ HaloTest });

function Earth(props: GroupProps) {
  const [dayMap, nightMap, specularMap, normalMap, cloudMap] = useLoader(
    TextureLoader,
    textureMaps
  );

  const [width, height] = useResolution({
    savingMode: true,
    immediate: false,
  });

  const [darkTheme, setDarkTheme] = useState(false);

  const earthRef = useRef<Mesh | null>(null);
  const cloudRef = useRef<Mesh | null>(null);
  const materialRef = useRef<ShaderMaterial | null>(null);

  useFrame(({ clock }) => {
    const angleByElapsedTime = clock.getElapsedTime() % 360;
    if (cloudRef.current && earthRef.current && materialRef.current) {
      cloudRef.current.rotation.y = angleByElapsedTime / 6;
      earthRef.current.rotation.y = angleByElapsedTime / 8;
      materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  return (
    <group {...props} onClick={() => setDarkTheme((theme) => !theme)}>
      <mesh visible={darkTheme}>
        <sphereBufferGeometry args={[1.52, 28, 28]} />
        <haloTest
          ref={materialRef}
          wireframe
          attach="material"
          side={THREE.FrontSide}
          u_resolution={new THREE.Vector2(width, height)}
        />
      </mesh>
      <mesh ref={cloudRef}>
        <sphereBufferGeometry args={[1.505, 56, 56]} />
        <meshLambertMaterial
          map={cloudMap}
          opacity={0.35}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef}>
        <sphereBufferGeometry args={[1.5, 56, 56]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={darkTheme ? nightMap : dayMap}
          normalMap={normalMap}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
    </group>
  );
}

export default Earth;
