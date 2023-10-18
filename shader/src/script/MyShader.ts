// import vertexWaveVs from './vertexWave/vertexWave.vs';
// import vertexWaveFs from './vertexWave/vertexWave.fs';

import GerstnerWaveVs from './GerstnerWave/GerstnerWave.vs';
import GerstnerWaveFs from './GerstnerWave/GerstnerWave.fs';

import VertexUVVs from './VertexUV/VertexUV.vs';
import VertexUVFs from './VertexUV/VertexUV.fs';

export default class MyShader {


    public static initShader() {
        var attributeMap = {
            'a_Position': Laya.VertexMesh.MESH_POSITION0,
            // 'a_Normal': Laya.VertexMesh.MESH_NORMAL0,
            "a_Color": Laya.VertexMesh.MESH_COLOR0,
            'a_TexCoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
        }

        var uniformMap = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
            'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL,
            'u_TilingOffset': Laya.Shader3D.PERIOD_MATERIAL
            // 'u_Time': Laya.Shader3D.PERIOD_SCENE,

            // 'u_Width': Laya.Shader3D.PERIOD_MATERIAL,
            // 'u_Speed': Laya.Shader3D.PERIOD_MATERIAL,
        };

        // var shader = Laya.Shader3D.add("shader1");
        // var subShader = new Laya.SubShader(attributeMap, uniformMap);
        // shader.addSubShader(subShader);
        // subShader.addShaderPass(shader1Vs, shader1Fs);

        // let vertexColor = Laya.Shader3D.add('vertexColor');
        // let subShader = new Laya.SubShader(attributeMap, uniformMap);
        // vertexColor.addSubShader(subShader);
        // subShader.addShaderPass(vertexColorVs, vertexColorFs);


        let vertexWave = Laya.Shader3D.add('vertexWave');
        let subShader = new Laya.SubShader(attributeMap, uniformMap);
        vertexWave.addSubShader(subShader);
        subShader.addShaderPass(VertexUVVs, VertexUVFs);

    }
}