#include "Lighting.glsl"

uniform mat4 u_MvpMatrix;

attribute vec4 a_position;
uniform float u_Time;
varying vec4 v_Color;

void main()
{
    vec4 color1 = vec4(1.0, 0.0, 0.0, 1.0);
    vec4 color2 = vec4(0.0, 1.0, 0.0, 1.0);

    float radio = 0.0;

    float tSin = sin(u_Time);
    float dis = a_position.y - tSin;
    radio = dis / 4.0 + 0.5;

    v_Color = mix(color2, color1, radio);

    gl_Position = u_MvpMatrix * a_position;
    gl_Position = remapGLPositionZ(gl_Position);
}

// #include "Lighting.glsl";
// uniform mat4 u_MvpMatrix;

// attribute vec4 a_Position;
// uniform float u_Time;
// varying vec4 v_Color;

// void main()
// {
//     vec4 color1 = vec4(1.0 , 0.0 , 0.0 , 1.0);
//     vec4 color2 = vec4(0.0 , 1.0 , 0.0 , 1.0);

//     float radio = 0.0;

//     float tSin = sin(u_Time); // -1.0 --> 1.0
//     float dis = a_Position.y - tSin;
//     radio = dis / 4.0 + 0.5;

//     v_Color = mix(color2 , color1 , radio);

//     gl_Position = u_MvpMatrix * a_Position;
//     gl_Position = remapGLPositionZ(gl_Position);
// }