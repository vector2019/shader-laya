
#include "Lighting.glsl";

uniform mat4 u_MvpMatrix;
uniform float u_Width;
attribute vec4 a_Position;
attribute vec2 a_TexCoord0;

varying vec2 v_TexCoord0;
varying float v_Addy;

void main(){
    v_TexCoord0 = a_TexCoord0;
    float PI = 3.141592653589;
    float len = distance(vec2(a_Position.x , a_Position.z) , vec2(0.0));
    // len = clamp(len , 0.0 , u_Width);
    float addy = sin(len * PI / u_Width) + 1.0;
    vec4 position = vec4(a_Position.x , a_Position.y + addy , a_Position.z , a_Position.w);
    v_Addy = addy;

    gl_Position = u_MvpMatrix * position;
    gl_Position = remapGLPositionZ(gl_Position);
}