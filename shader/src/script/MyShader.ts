// import vertexWaveVs from './vertexWave/vertexWave.vs';
// import vertexWaveFs from './vertexWave/vertexWave.fs';

import GerstnerWaveVs from './GerstnerWave/GerstnerWave.vs';
import GerstnerWaveFs from './GerstnerWave/GerstnerWave.fs';

export default class MyShader {


    public static initShader() {
        var attributeMap = {
            'a_Position': Laya.VertexMesh.MESH_POSITION0
        }

        var uniformMap = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
            'u_Time': Laya.Shader3D.PERIOD_SCENE,

            'u_Width': Laya.Shader3D.PERIOD_MATERIAL,
            'u_Speed': Laya.Shader3D.PERIOD_MATERIAL,
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
        subShader.addShaderPass(GerstnerWaveVs, GerstnerWaveFs);

    }
}