import React, { useRef } from "react";
import * as THREE from "three";
import { Mesh, TextureLoader } from "three";
import { GroupProps, useFrame, useLoader } from "@react-three/fiber";

const EarthDayMap = "/textures/8k_earth_daymap.jpg";
const EarthSpecularMap = "/textures/8k_earth_specular_map.jpg";
const EarthNormalMap = "/textures/8k_earth_normal_map.jpg";
const EarthCloudMap = "/textures/8k_earth_clouds.jpg";

const combinedTextureMaps = [
  EarthDayMap,
  EarthSpecularMap,
  EarthNormalMap,
  EarthCloudMap,
];

function Earth(props: GroupProps) {
  const [colorMap, specularMap, normalMap, cloudMap] = useLoader(
    TextureLoader,
    combinedTextureMaps
  );

  const earthRef = useRef<Mesh | null>(null);
  const cloudRef = useRef<Mesh | null>(null);

  useFrame(({ clock }) => {
    const angleByElapsedTime = clock.getElapsedTime() % 360;

    if (cloudRef && cloudRef.current && earthRef && earthRef.current) {
      cloudRef.current.rotation.y = angleByElapsedTime / 6;
      earthRef.current.rotation.y = angleByElapsedTime / 8;
    }
  });

  return (
    <group {...props}>
      <mesh ref={cloudRef}>
        <sphereGeometry args={[1.505, 56, 56]} />
        <meshLambertMaterial
          map={cloudMap}
          opacity={0.35}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.5, 56, 56]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
    </group>
  );
}

export default Earth;
