#include "Lighting.glsl";

attribute vec4 a_Position;
attribute vec2 a_TexCoord0;
attribute vec3 a_Normal;
//模型空间的切线
attribute vec4 a_Tangent;

uniform mat4 u_MvpMatrix;
uniform mat4 u_WorldMat;

varying vec2 v_TexCoord0;
varying vec3 v_Normal;
varying vec3 v_Position;

//切向量
varying vec3 v_Tangent;
//负法向量 切向量和法向量叉乘得到
varying vec3 v_BiNormal;

void main(){
    v_TexCoord0 = a_TexCoord0;

    //世界矩阵的逆矩阵的转置矩阵
    //世界矩阵的逆矩阵
    mat3 _world2Object;
    _world2Object = INVERSE_MAT(mat3(u_WorldMat));

    //_world2Object放后面相当于 _world2Object的转置矩阵 * a_Normal
    v_Normal = normalize(a_Normal * _world2Object);
    v_Tangent = normalize( a_Tangent.xyz * _world2Object);
    v_BiNormal = cross(v_Normal, v_Tangent);

    v_Position = (u_WorldMat * a_Position).xyz;

    gl_Position = u_MvpMatrix * a_Position;
    gl_Position = remapGLPositionZ(gl_Position);
}