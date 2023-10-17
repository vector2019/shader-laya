#include "Lighting.glsl";


uniform mat4 u_MvpMatrix;

attribute vec4 a_Position;
uniform float u_Time;


varying vec4 v_Color;

uniform float u_Width;
uniform float u_Speed;


void main(){
    vec4 position = a_Position;

    v_Color = vec4(1.0, 0.0, 0.0, 1.0);


    float PI = 3.14159265358979323846264338327;

    vec2 dir = vec2(1.0,0.06);

    float width = PI / 2.0;
    float speed = 0.5;
    float Q = 0.2;
    float A = 1.0;

    float sx = Q * A * dir.x * cos(width * dot( dir,vec2(position.x,position.z) + u_Time * speed));
    float sy = A * sin(width * dot( dir,vec2(position.x,position.z ) + u_Time * speed));
    float sz = Q * A * dir.y * cos(width * dot( dir,vec2(position.x,position.z) + u_Time * speed));

    position.x += sx;
    position.y += sy;
    position.z += sz;

    v_Color *= (sy + 1.0) / 2.0;

    gl_Position = u_MvpMatrix * position;
    gl_Position = remapGLPositionZ(gl_Position);
}