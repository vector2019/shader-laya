#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
#else
    precision mediump float;
#endif

varying vec2 v_TexCoord0;

uniform vec4 u_AlbedoColor;

#ifdef ALBEDOTEXTURE
    uniform sampler2D u_AlbedoTexture;
#endif

uniform float u_BlurWidth;

void main(){
    // vec2 uv = v_TexCoord0;
    // color *= texture2D(u_AlbedoTexture,uv);

    // uv.x = clamp(v_TexCoord0.x + u_BlurWidth,0.0,1.0);
    // color += texture2D(u_AlbedoTexture,uv);

    // uv.x = clamp(v_TexCoord0.x - u_BlurWidth,0.0,1.0);
    // color += texture2D(u_AlbedoTexture,uv);

    // uv.y = clamp(v_TexCoord0.y + u_BlurWidth,0.0,1.0);
    // color += texture2D(u_AlbedoTexture,uv);

    // uv.y = clamp(v_TexCoord0.y - u_BlurWidth,0.0,1.0);
    // color += texture2D(u_AlbedoTexture,uv);

    // color /= 5.0;

    vec4 color = u_AlbedoColor;


    #ifdef ALBEDOTEXTURE
        // color = vec4(0.0);
        // vec2 op = vec2(0.0);
        // vec2 texCoord = vec2(0.0);
        // float f = 0.0;
        // float total = 0.0;

        // for(int i = -5;i< 5;i++){
        //     for(int j = -5;j< 5;j++){
        //         vec2 vp = vec2(float(i),float(j));
        //         float dis = distance(vp,op);
        //         //dis最大 = 5根号2 = 7.xxxx
        //         f = 1.0 - dis / 8.0;
        //         total += f;

        //         texCoord.x = v_TexCoord0.x + u_BlurWidth * float(j);
        //         texCoord.y = v_TexCoord0.y + u_BlurWidth * float(i);
        //         color += texture2D(u_AlbedoTexture,texCoord) * f;
        //     }   
        // }
        // color /= total;


        vec2 uv = v_TexCoord0 * 512.0;
        uv = floor(uv / 8.0) * 8.0;

        vec2 texCoord = uv / 512.0;
        color = texture2D(u_AlbedoTexture,texCoord);
    #endif

    gl_FragColor = color ;
}


// #ifdef GL_FRAGMENT_PRECISION_HIGH
//     precision highp float;
// #else
//     precision mediump float;
// #endif

// varying vec2 v_TexCoord0;

// uniform vec4 u_AlbedoColor;

// #ifdef ALBEDOTEXTURE
//     uniform sampler2D u_AlbedoTexture;
// #endif

// uniform float u_BlurWidth;

// void main()
// {
//     vec4 color = u_AlbedoColor;

//     #ifdef ALBEDOTEXTURE
//     /*
//         color *= texture2D(u_AlbedoTexture , v_TexCoord0);

//         vec2 uv = v_TexCoord0;

//         uv.x = clamp(v_TexCoord0.x + u_BlurWidth , 0.0 , 1.0);
//         color += texture2D(u_AlbedoTexture , uv);

//         uv.x = clamp(v_TexCoord0.x - u_BlurWidth , 0.0 , 1.0);
//         color += texture2D(u_AlbedoTexture , uv);

//         uv.x = v_TexCoord0.x;

//         uv.y = clamp(v_TexCoord0.y + u_BlurWidth , 0.0 , 1.0);
//         color += texture2D(u_AlbedoTexture , uv);

//         uv.y = clamp(v_TexCoord0.y - u_BlurWidth , 0.0 , 1.0);
//         color += texture2D(u_AlbedoTexture , uv);

//         color /= 5.0;
//         */

//         color = vec4(0.0);
//         float f = 0.0;
//         vec2 op = vec2(0.0);
//         vec2 texCoord = vec2(0.0);
//         float tot = 0.0;

//         for(int i = -5 ; i < 5 ; i++)
//         {
//             for(int j = -5 ; j < 5 ; j++)
//             {
//                 vec2 vp = vec2(float(i) , float(j));
//                 float dis = distance(vp , op);
//                 f = 1.1 - dis / 8.0;

//                 tot += f;

//                 texCoord.x = v_TexCoord0.x + u_BlurWidth * float(j);
//                 texCoord.y = v_TexCoord0.y + u_BlurWidth * float(i);

//                 color += texture2D(u_AlbedoTexture , texCoord) * f;
//             }
//         }

//         color /= tot;
//     #endif

//     gl_FragColor = color;
// }