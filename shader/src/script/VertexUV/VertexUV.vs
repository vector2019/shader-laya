#include "Lighting.glsl";

#ifdef GPU_INSTANCE
    attribute mat4 a_MvpMatrix;
#else
    uniform mat4 u_MvpMatrix;
#endif

attribute vec4 a_Position;

attribute vec2 a_TexCoord0;

attribute vec4 a_Color;

uniform vec4 u_TilingOffset;

varying vec2 v_TexCoord0;

varying vec4 v_Color;

void main()
{
    // v_TexCoord0 = a_TexCoord0;

    v_TexCoord0 = a_TexCoord0 * u_TilingOffset.xy + u_TilingOffset.zw;

    v_Color = a_Color;

    gl_Position = u_MvpMatrix * a_Position;
    gl_Position = remapGLPositionZ(gl_Position);
}