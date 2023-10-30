#include "Lighting.glsl";

#ifdef GPU_INSTANCE
    attribute mat4 a_MvpMatrix;
#else
    uniform mat4 u_MvpMatrix;
#endif

attribute vec4 a_Position;

attribute vec2 a_TexCoord0;

varying vec2 v_TexCoord0;

#ifdef BONE
    attribute vec4 a_BoneIndices; //骨骼索引
    attribute vec4 a_BoneWeights; //骨骼权重
    uniform mat4 u_Bones[24]; // 骨骼矩阵数组

    #ifdef SIMPLEBONE
        uniform vec4 u_SimpleAnimatorParams; //动画数据
        uniform float u_SimpleAnimatorTextureSize; //动画贴图的大小
        uniform sampler2D u_SimpleAnimatorTexture; //骨骼动画贴图
    #endif
#endif

#ifdef SIMPLEBONE
mat4 loadMatFromTexture(float framePos , int boneIndices)
{
    vec2 uv;

    float pixePos = framePos + float(boneIndices) * 4.0;

    float han = floor(pixePos / u_SimpleAnimatorTextureSize); //行
    float lie = mod(pixePos , u_SimpleAnimatorTextureSize); //列

    float offset = 1.0 / u_SimpleAnimatorTextureSize;

    uv.x = lie * offset + offset * 0.5;
    uv.y = han * offset + offset * 0.5;

    vec4 color0 = texture2D(u_SimpleAnimatorTexture , uv);

    uv.x += offset;
    vec4 color1 = texture2D(u_SimpleAnimatorTexture , uv);

    uv.x += offset;
    vec4 color2 = texture2D(u_SimpleAnimatorTexture , uv);

    uv.x += offset;
    vec4 color3 = texture2D(u_SimpleAnimatorTexture , uv);

    mat4 m = mat4(color0.x , color0.y , color0.z , color0.w , 
                  color1.x , color1.y , color1.z , color1.w ,    
                  color2.x , color2.y , color2.z , color2.w , 
                  color3.x , color3.y , color3.z , color3.w );

    return m;
}
#endif

void main()
{
    v_TexCoord0 = a_TexCoord0;

    vec4 position = a_Position;

    #ifdef BONE
        mat4 boneMat;

        #ifdef SIMPLEBONE
            float framePos = u_SimpleAnimatorParams.x + u_SimpleAnimatorParams.y;

            boneMat = loadMatFromTexture(framePos , int(a_BoneIndices.x)) * a_BoneWeights.x;
            boneMat += loadMatFromTexture(framePos , int(a_BoneIndices.y)) * a_BoneWeights.y;
            boneMat += loadMatFromTexture(framePos , int(a_BoneIndices.z)) * a_BoneWeights.z;
            boneMat += loadMatFromTexture(framePos , int(a_BoneIndices.w)) * a_BoneWeights.w;
        #else
            boneMat = u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;
            boneMat += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;
            boneMat += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;
            boneMat += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;
        #endif

        position = boneMat * a_Position;
    #endif

    #ifdef GPU_INSTANCE
		gl_Position = a_MvpMatrix * position;
	#else
		gl_Position = u_MvpMatrix * position;
	#endif

    gl_Position = remapGLPositionZ(gl_Position);
}