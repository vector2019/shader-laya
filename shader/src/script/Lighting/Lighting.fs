#ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    precision highp int;
#else
    precision mediump float;
    precision mediump int;
#endif
#include "Lighting.glsl";

varying vec2 v_TexCoord0;
varying vec3 v_Normal;
varying vec3 v_Position;

//切向量
varying vec3 v_Tangent;
//负法向量 切向量和法向量叉乘得到
varying vec3 v_BiNormal;

uniform vec4 u_AlbedoColor;

uniform vec4 u_AmbientColor ;//环境光
uniform int u_DirationLightCount; // 平行光数量
uniform sampler2D u_LightBuffer; // 灯光缓冲

uniform vec3 u_CameraPos;
uniform float u_Shininess;
uniform vec4 u_SpecularColor;


#ifdef NORMALTEXTURE
    uniform sampler2D u_NormalTexture;
#endif

#ifdef ALBEDOTEXTURE
    uniform sampler2D u_AlbedoTexture;
#endif

void main(){
    vec4 mainColor = u_AlbedoColor;

    #ifdef ALBEDOTEXTURE
        vec4 color = texture2D(u_AlbedoTexture, v_TexCoord0);
        mainColor *= color;
    #endif

    vec3 normal;
    #ifdef NORMALTEXTURE
        vec3 normalMapSample = texture2D(u_NormalTexture, v_TexCoord0).rgb;

        vec3 normalT = vec3(0.0);
        normalT.x = normalMapSample.x * 2.0 - 1.0;
        normalT.y = normalMapSample.y * 2.0 - 1.0;
        normalT.z = normalMapSample.z * 2.0 - 1.0;

        mat3 TBN = mat3(v_Tangent, v_BiNormal, v_Normal);
        normal = normalize(TBN * normalT);
    #else
        normal = v_Normal;
    #endif

    vec3 V = normalize(u_CameraPos - v_Position);

    vec3 diffuse = vec3(0.0);
    vec3 specular = vec3(0.0);

    for(int i = 0; i < 20; i++){
        if(i >= u_DirationLightCount) break;
        DirectionLight directionLight = getDirectionLight(u_LightBuffer , i);
        float ln = dot(normal, directionLight.direction * -1.0);
        ln = max(0.0, ln);

        // ln = ln * 0.5 + 0.5;
        diffuse += directionLight.color * ln;

        // vec3 R = reflect(directionLight.direction , normal);
        // float nR = max(dot(V , R), 0.0);

        //半角高光反射 blinPhong
        vec3 H = normalize( V + directionLight.direction * -1.0 );
        float nR = max(0.0 , dot(H , normal));
        
        specular += u_SpecularColor.rgb * directionLight.color * pow(nR , u_Shininess * 128.0);
    }

    mainColor = vec4(mainColor.rbg * (u_AmbientColor.rgb + diffuse) , mainColor.a);
    mainColor.rgb += specular;

    gl_FragColor = mainColor;

    
}