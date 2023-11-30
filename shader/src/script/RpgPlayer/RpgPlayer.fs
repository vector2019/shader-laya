#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

#ifdef ALBEDOTEXTURE
    uniform sampler2D u_AlbedoTexture;
#endif

varying vec2 v_TexCoord0;


void main()
{
    vec4 color = vec4(1.0);

    #ifdef ALBEDOTEXTURE
        color *= texture2D(u_AlbedoTexture , v_TexCoord0);
    #endif

    gl_FragColor = color;
}
