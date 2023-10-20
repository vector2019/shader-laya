
#include "Lighting.glsl"

attribute vec4 a_Position;
attribute vec2 a_TexCoord0;

uniform mat4 u_MvpMatrix;

varying vec2 v_TexCoord0;


void main(){

    v_TexCoord0 = a_TexCoord0;


    gl_Position = u_MvpMatrix * a_Position;
    gl_Position = remapGLPositionZ(gl_Position);
}