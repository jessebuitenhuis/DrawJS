export var shader = `attribute vec4 a_position;
attribute vec4 a_color;

uniform mat4 u_matrix;
uniform mat4 u_viewProjectionMatrix;

varying vec4 v_color;

void main() {
  gl_Position = u_viewProjectionMatrix * u_matrix * a_position;

  v_color = a_color;
}`;