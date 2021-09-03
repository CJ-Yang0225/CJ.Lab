import { Shaders, GLSL } from "gl-react";
import * as THREE from "three";

export const shaders = Shaders.create({
  testGL: {
    vert: GLSL`
      attribute vec2 _p;
      uniform vec2 res;

      varying vec2 v_uv;

      void main() {
        v_uv = res;
        gl_Position = vec4(_p, 0.0, 1.0);
      }
    `,
    frag: GLSL`
      precision mediump float;
      uniform vec2 res;

      varying vec2 v_uv;

      uniform float u_time;
      uniform vec3 u_color;
      uniform vec2 u_resolution;

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;

        // uv.x *= u_resolution.x / u_resolution.y;

        gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);
      }
    `,
  },
});
