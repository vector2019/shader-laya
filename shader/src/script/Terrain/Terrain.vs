#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif


uniform vec4 u_AlbedoColor;

#ifdef ALBEDOTEXTURE
    uniform sampler2D u_AlbedoTextrure;
#endif

#ifdef SECONDTEXTURE
    uniform sampler2D u_SecondTexture;
#endif


// varying float v_Addy;
// varying vec2 v_TexCoord0;

void main(){
    vec4 albedo = u_AlbedoColor;

    // #ifdef ALBEDOTEXTURE
    //     albedo *= texture2D(u_AlbedoTextrure, v_TexCoord0);
    // #endif

    // #ifdef SECONDTEXTURE
    //     vec4 secondColor = texture2D(u_SecondTexture, v_TexCoord0);
    //     float addy = v_Addy / 2.0;
    //     albedo = mix(albedo, secondColor, addy);
    // #endif

    gl_FragColor = albedo;
}