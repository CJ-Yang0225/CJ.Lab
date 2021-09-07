precision mediump float;

varying vec2 v_uv;
varying float v_wave;

uniform float u_time;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d.glsl);

void main() {
  v_uv = uv;

  vec3 pos = position;
  float noiseFreq = 2.0;
  float noiseAmp = 0.4;
  vec3 noisePos = vec3(pos.x * noiseFreq + u_time, pos.y, pos.z);
  pos.z += snoise3(noisePos) * noiseAmp;
  v_wave = pos.z;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}