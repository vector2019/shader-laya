#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

varying vec2 v_TexCoord0;

#ifdef ALBEDOTEXTURE
    uniform sampler2D u_AlbedoTexture;
#endif

void main()
{
    vec4 color = vec4(1.0);

    #ifdef ALBEDOTEXTURE
        color *= texture2D(u_AlbedoTexture , v_TexCoord0);
    #endif

    color.a = 0.5;

    gl_FragColor = color;
}