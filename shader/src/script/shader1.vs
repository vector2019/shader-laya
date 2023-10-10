#include 'Lighting.glsl';

attribute vec4 a_position;
varying vec4 v_color;
uniform mat4 u_MvpMatrix;

void main(){
    v_color = a_position;
    gl_Position = u_MvpMatrix * a_position ;

    gl_Position = remapGLPositionZ(gl_Position);
}