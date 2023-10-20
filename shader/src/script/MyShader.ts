// import vertexWaveVs from './vertexWave/vertexWave.vs';
// import vertexWaveFs from './vertexWave/vertexWave.fs';

import GerstnerWaveVs from './GerstnerWave/GerstnerWave.vs';
import GerstnerWaveFs from './GerstnerWave/GerstnerWave.fs';

import VertexUVVs from './VertexUV/VertexUV.vs';
import VertexUVFs from './VertexUV/VertexUV.fs';

import UVAniVs from './VertexUV/UVAni/UVAni.vs';
import UVAniFs from './VertexUV/UVAni/UVAni.fs';

import WaterVs from './Water/Water.vs';
import WaterFs from './Water/Water.fs';

export default class MyShader {


    public static initShader() {
        var attributeMap = {
            'a_Position': Laya.VertexMesh.MESH_POSITION0,
            "a_Color": Laya.VertexMesh.MESH_COLOR0,
            'a_TexCoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
        }

        var uniformMap = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
            'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL,
            'u_TilingOffset': Laya.Shader3D.PERIOD_MATERIAL
        };
        let vertexWave = Laya.Shader3D.add('vertexWave');
        let subShader = new Laya.SubShader(attributeMap, uniformMap);
        vertexWave.addSubShader(subShader);
        subShader.addShaderPass(VertexUVVs, VertexUVFs);


        this.initUVAniMaterial();
        this.initWaterMaterial();
    }

    public static initUVAniMaterial() {
        var attributeMap = {
            'a_Position': Laya.VertexMesh.MESH_POSITION0,
            'a_TexCoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
        }

        var uniformMap = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
            'u_Time': Laya.Shader3D.PERIOD_SCENE,

            'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL,
            'u_AlbedoColor': Laya.Shader3D.PERIOD_MATERIAL,
            'u_WH': Laya.Shader3D.PERIOD_MATERIAL,
        };


        let vertexWave = Laya.Shader3D.add('UVAni');
        let subShader = new Laya.SubShader(attributeMap, uniformMap);
        vertexWave.addSubShader(subShader);
        subShader.addShaderPass(UVAniVs, UVAniFs);
    }

    public static initWaterMaterial() {
        var attributeMap = {
            'a_Position': Laya.VertexMesh.MESH_POSITION0,
            'a_TexCoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
        }


        var uniformMap = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
            'u_Time': Laya.Shader3D.PERIOD_SCENE,

            'u_AlbedoColor': Laya.Shader3D.PERIOD_MATERIAL,
            'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL,
            'u_Width': Laya.Shader3D.PERIOD_MATERIAL,
            'u_Speed': Laya.Shader3D.PERIOD_MATERIAL
        }

        let vertexWave = Laya.Shader3D.add('Water');
        let subShader = new Laya.SubShader(attributeMap, uniformMap);
        vertexWave.addSubShader(subShader);
        subShader.addShaderPass(WaterVs, WaterFs);
    }
}