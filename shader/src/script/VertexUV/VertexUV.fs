#ifdef GL_FRAMMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

varying vec2 v_TexCoord0;

varying vec4 v_Color;

uniform sampler2D u_AlbedoTexture;

void main()
{
    vec4 color = texture2D(u_AlbedoTexture , v_TexCoord0);

    color *= v_Color;

    gl_FragColor = color;
}