#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

varying vec2 v_TexCoord0;

uniform vec4 u_AlbedoColor;
uniform float u_MasicSize;
uniform float u_TexSize;

#ifdef ALBEDOTEXTURE
    uniform sampler2D u_AlbedoTexture;
#endif

uniform float u_BlurWidth;

void main(){
    vec4 color = u_AlbedoColor;
    vec2 texCoord = v_TexCoord0;


    #ifdef ALBEDOTEXTURE
        //正方块马赛克
        // float width = u_TexSize;
        // float rectSize = u_MasicSize;
        // vec2 uv = texCoord * width;
        // uv = floor(uv / rectSize) * rectSize;
        // uv /= width;
        // color *= texture2D(u_AlbedoTexture,uv);


        //六边形的马赛克效果
        float len = u_MasicSize / u_TexSize;
        float TW = 1.0;
        float TR = 1.73;
        float x = v_TexCoord0.x;
        float y = v_TexCoord0.y;

        // float wx = floor(x / TW / len);
        // float wy = floor(y / TR / len);

        float wx = floor(x * u_TexSize / TW / u_MasicSize);
        float wy = floor(y * u_TexSize / TR / u_MasicSize);

        vec2 v1 = vec2(0.5 , 0.5);
        vec2 v2 = vec2(0.5 , 0.6);

        if(mod(wx + wy , 2.0) == 0.0){
            v1 = vec2( wx * TW * len , wy * TR * len);
            v2 = vec2((wx + 1.0) * TW * len , (wy + 1.0) * TR * len);
        }else{
            v1 = vec2( wx * TW * len , (wy + 1.0) * TR * len);
            v2 = vec2( (wx + 1.0) * TW * len , wy * TR * len);
        }
        
        float s1 = distance(v1 , v_TexCoord0);
        float s2 = distance(v2 , v_TexCoord0);

        if(s1 < s2)
        {
            texCoord = v1;
        }
        else
        {
            texCoord = v2;
        }

        color *= texture2D(u_AlbedoTexture , texCoord);
    #endif
    gl_FragColor = color ;
}