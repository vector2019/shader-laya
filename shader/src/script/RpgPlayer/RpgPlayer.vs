#include "Lighting.glsl";

#ifdef GPU_INSTANCE
    attribute mat4 a_MvpMatrix;
#else
    uniform mat4 u_MvpMatrix;
#endif

attribute vec4 a_Position;

attribute vec2 a_TexCoord0;

varying vec2 v_TexCoord0;


void main()
{
    v_TexCoord0 = a_TexCoord0;

    #ifdef GPU_INSTANCE
        gl_Position = a_MvpMatrix * a_Position;
    #else
        gl_Position = u_MvpMatrix * a_Position;
    #endif

    gl_Position = remapGLPositionZ(gl_Position);
}