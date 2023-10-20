#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

uniform vec4 u_AlbedoColor;

#ifdef ALBEDOTEXTURE
    uniform sampler2D u_AlbedoTexture;
#endif

varying vec2 v_TexCoord0;

void main(){
    vec4 color = u_AlbedoColor;

    #ifdef ALBEDOTEXTURE
        color *= texture2D(u_AlbedoTexture, v_TexCoord0);
    #endif

    gl_FragColor = color;
}