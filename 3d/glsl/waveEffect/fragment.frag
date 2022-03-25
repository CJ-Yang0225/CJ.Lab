precision mediump float;

uniform sampler2D u_texture;
// uniform vec3 u_color;

varying vec2 v_uv;
varying float v_wave;

void main() {
  float wave = v_wave * 0.2;
  vec3 texture = texture2D(u_texture, v_uv + wave).rgb;

  gl_FragColor = vec4(texture, 1.0);
}