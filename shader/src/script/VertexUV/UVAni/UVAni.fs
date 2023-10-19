#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

uniform vec4 u_AlbedoColor;

#ifdef ALBEDOTEXTURE
    uniform sampler2D u_AlbedoTexture;
#endif


uniform vec2 u_WH;
uniform float u_Time;
varying vec2 v_TexCoord0;


void main(){
    vec4 color = u_AlbedoColor;

    #ifdef ALBEDOTEXTURE
        float index = floor(u_Time * 20.0);

        float uSize = 1.0  / u_WH.x;
        float vSize = 1.0 / u_WH.y;

        float uIndex = mod(index,u_WH.x);
        float vIndex = floor(index / u_WH.y);

        vec2 uv = vec2(v_TexCoord0.x / u_WH.x + uIndex * uSize, 
                       v_TexCoord0.y / u_WH.y + vIndex * vSize);

        color *= texture2D(u_AlbedoTexture,uv);
    #endif
    gl_FragColor = color;
}