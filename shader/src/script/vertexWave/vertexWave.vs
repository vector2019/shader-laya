// #include "Lighting.glsl"

// uniform mat4 u_MvpMatrix;

// attribute vec4 a_Position;
// uniform float u_Time;

// varying vec4 v_Color;

// uniform float u_Width;
// uniform float u_Speed;

// void main()
// {
//     v_Color = vec4(0.2, 0.37, 0.60, 1.0);
    
//     vec4 postition = a_Position;
//     float PI = 3.14159265358979323846264;

//     vec4 dir = vec2(0.0, 1.0);

//     // float index = 1.0;
//     // float ti = 0.06;

//     // float sy = 0.0;


//     float a = sin(dot(dir,vec2(postition.x,postition.y)) * u_Width + u_Time * u_Speed);

//     v_Color *= (a + 1.0) / 2.0;

//     gl_Position = u_MvpMatrix * postition;

//     gl_Position = remapGLPositionZ(gl_Position);
// }

#include "Lighting.glsl";

#ifdef GPU_INSTANCE
    attribute mat4 a_MvpMatrix;
#else
    uniform mat4 u_MvpMatrix;
#endif

uniform float u_Time;

attribute vec4 a_Position;

varying vec4 v_Color;

uniform float u_Width;

uniform float u_Speed;

void main()
{
    v_Color = vec4(0.2 , 0.37 , 0.75 , 1.0);

    vec4 position = a_Position;

    float PI = 3.141592653589;

    vec2 dir = vec2(0 ,1);

    float index = 1.0;
    float ti = 0.06;

    float sy = 0.0;
    //四条正弦波叠加效果
    for(int i = 0 ; i < 4 ; i++)
    {
        ti += 0.0005;
        index += 0.5;

        if(mod(index , 2.0) == 0.0){
            dir = vec2(1.0 , ti);
        }else{
            dir = vec2(-1.0 , -ti);
        }

    float a = sin( dot(dir , vec2(position.x , position.z)) * u_Width + u_Time * u_Speed);

        sy += a;
    }

    sy = sin(sy);

    position.y = sy;
    // position.y = a;

    // v_Color *= (a + 1.0) / 2.0;
    v_Color *= (sy + 1.0) / 2.0;

    #ifdef GPU_INSTANCE
        gl_Position = a_MvpMatrix * position;
    #else
        gl_Position = u_MvpMatrix * position;
    #endif

    gl_Position = remapGLPositionZ(gl_Position);
}