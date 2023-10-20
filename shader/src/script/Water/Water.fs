#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

uniform vec4 u_AlbedoColor;


uniform float u_Width;

uniform float u_Speed;

uniform float u_Time;


#ifdef ALBEDOTEXTURE
    uniform sampler2D u_AlbedoTexture;
#endif

varying vec2 v_TexCoord0;

void main(){
    vec4 color = u_AlbedoColor;

    #ifdef ALBEDOTEXTURE
        float PI = 3.141592653589;

        vec2 texCoord = v_TexCoord0;

        //横向 和 纵向 波浪效果
        // float sinx = sin(texCoord.x * PI * u_Width + u_Time * u_Speed) * 0.01;

        // float sinx = sin(texCoord.x * PI * u_Width + u_Time * u_Speed);
        // sinx = (sinx + 1.0) / 2.0;
        // float siny = sinx;
        // float siny = cos(texCoord.y * PI * u_Width + u_Time * u_Speed) * 0.01;

        // float sinx = sin( u_Time * u_Speed) ;
        // float siny = cos( u_Time * u_Speed) ;

        //扩散波浪
        vec2 op = vec2(0.5 , 0.5);
        float len = distance(texCoord , op) * -1.0;

        float sinx = sin(len * PI * u_Width + u_Time * u_Speed) * 0.01;
        float siny = sinx;

        texCoord.x += sinx;
        texCoord.y += siny;

        color *= texture2D(u_AlbedoTexture , texCoord);

        sinx = (sinx * 100.0 / 2.0 + 0.5) / 2.0 + 1.0;
        siny = (siny * 100.0 / 2.0 + 0.5) / 2.0 + 1.0;

        color *= (sinx + siny) / 2.0;
    #endif

    gl_FragColor = color;
}