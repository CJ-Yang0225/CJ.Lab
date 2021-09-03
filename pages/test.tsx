import * as THREE from "three";
import { Surface } from "gl-react-dom";
import React from "react";
import { useResolution } from "../hooks/useResolution";
import { Node } from "gl-react";
import { shaders } from "../components/three/glsl/ShaderTest";

type ShaderTestProps = {
  u_time: any;
  u_color: any;
  u_resolution: any;
};

function ShaderTest(props: ShaderTestProps) {
  return (
    <Node
      shader={shaders.testGL}
      uniforms={{ u_resolution: props.u_resolution }}
    />
  );
}

function TestField(props: any) {
  const [width, height] = useResolution({ savingMode: true, immediate: false });

  return (
    <Surface width={width} height={height}>
      <ShaderTest
        u_time={1.0}
        u_color={new THREE.Color(1.0, 0.0, 1.0)}
        u_resolution={[width, height]}
      />
    </Surface>
  );
}

export default TestField;
