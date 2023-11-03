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

import BlurVs from './Blur/Blur.vs';
import BlurFs from './Blur/Blur.fs';

import MasicVs from './masic/masic.vs';
import MasicFs from './masic/masic.fs';

import TerrainVs from './Terrain/Terrain.vs';
import TerrainFs from './Terrain/Terrain.fs';

import BoneVs from './Bone/Bones.vs';
import BoneFs from './Bone/Bones.fs';

import LightingVS from './Lighting/Lighting.vs';
import LightingFS from './Lighting/Lighting.fs';

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
        this.initBlurMaterial();
        this.initMasicMaterial();
        this.initTerrainMaterial();
        this.initBoneMaterial();
        this.initLightingMaterial();
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


    public static initBlurMaterial() {
        var attributeMap = {
            'a_Position': Laya.VertexMesh.MESH_POSITION0,
            'a_TexCoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
        }


        var uniformMap = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,

            'u_AlbedoColor': Laya.Shader3D.PERIOD_MATERIAL,
            'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL,
            'u_MasicSize': Laya.Shader3D.PERIOD_MATERIAL,
            'u_TexSize': Laya.Shader3D.PERIOD_MATERIAL
        }

        var shader = Laya.Shader3D.add("MYBLUR");
        var subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(BlurVs, BlurFs);
    }

    public static initMasicMaterial() {
        var attributeMap = {
            'a_Position': Laya.VertexMesh.MESH_POSITION0,
            'a_TexCoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
        }


        var uniformMap = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,

            'u_AlbedoColor': Laya.Shader3D.PERIOD_MATERIAL,
            'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL,
            'u_BlurWidth': Laya.Shader3D.PERIOD_MATERIAL,
            'u_MasicSize': Laya.Shader3D.PERIOD_MATERIAL,
            'u_TexSize': Laya.Shader3D.PERIOD_MATERIAL
        }

        var shader = Laya.Shader3D.add("MASIC");
        var subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(MasicVs, MasicFs);
    }

    public static initTerrainMaterial() {

        var attributeMap = {
            'a_Position': Laya.VertexMesh.MESH_POSITION0,
            'a_TexCoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0
        };

        var uniformMap = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,

            'u_AlbedoColor': Laya.Shader3D.PERIOD_MATERIAL,
            'u_AlbedoTextrure': Laya.Shader3D.PERIOD_MATERIAL,
            'u_SecondTexture': Laya.Shader3D.PERIOD_MATERIAL,
            'u_Width': Laya.Shader3D.PERIOD_MATERIAL,
        };

        var shader = Laya.Shader3D.add("Terrain");
        var subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(TerrainVs, TerrainFs);
    }

    public static initBoneMaterial() {
        var attributeMap = {
            'a_Position': Laya.VertexMesh.MESH_POSITION0,
            'a_TexCoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,

            'a_BoneIndices': Laya.VertexMesh.MESH_BLENDINDICES0,
            'a_BoneWeights': Laya.VertexMesh.MESH_BLENDWEIGHT0,
        };

        var uniformMap = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,

            'u_Bones': Laya.Shader3D.PERIOD_CUSTOM,

            'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL,
            'u_AlbedoColor': Laya.Shader3D.PERIOD_MATERIAL,

            'u_SimpleAnimatorParams': Laya.Shader3D.PERIOD_SPRITE,
            'u_SimpleAnimatorTextureSize': Laya.Shader3D.PERIOD_SPRITE,
            'u_SimpleAnimatorTexture': Laya.Shader3D.PERIOD_SPRITE
        }

        var shader = Laya.Shader3D.add("Bones");

        var subShader = new Laya.SubShader(attributeMap, uniformMap);

        shader.addSubShader(subShader);

        subShader.addShaderPass(BoneVs, BoneFs);
    }

    public static initLightingMaterial() {
        var attributeMap = {
            'a_Position': Laya.VertexMesh.MESH_POSITION0,
            'a_TexCoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            'a_Normal': Laya.VertexMesh.MESH_NORMAL0,
            'a_Tangent': Laya.VertexMesh.MESH_TANGENT0,
        }

        var uniformMap = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
            'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE,

            'u_CameraPos': Laya.Shader3D.PERIOD_CAMERA,

            'u_DirationLightCount': Laya.Shader3D.PERIOD_SCENE,
            'u_LightBuffer': Laya.Shader3D.PERIOD_SCENE,
            'u_AmbientColor': Laya.Shader3D.PERIOD_SCENE,

            'u_AlbedoColor': Laya.Shader3D.PERIOD_MATERIAL,
            'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL,
            'u_Shininess': Laya.Shader3D.PERIOD_MATERIAL,
            'u_SpecularColor': Laya.Shader3D.PERIOD_MATERIAL,
            "u_NormalTexture": Laya.Shader3D.PERIOD_MATERIAL
        }

        let shader = Laya.Shader3D.add("MyLighting");
        let subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(LightingVS, LightingFS);
    }


}