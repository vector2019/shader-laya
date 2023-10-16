import shader1Vs from "./shader1.vs"
import shader1Fs from "./shader1.fs"
import vertexColorVs from './vertexColor/vertexColor.vs'
import vertexColorFs from './vertexColor/vertexColor.fs'

export default class MyShader {


    public static initShader() {
        var attributeMap = {
            'a_position': Laya.VertexMesh.MESH_POSITION0
        }

        var uniformMap = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
            'u_Time': Laya.Shader3D.PERIOD_SCENE
        };

        // var shader = Laya.Shader3D.add("shader1");
        // var subShader = new Laya.SubShader(attributeMap, uniformMap);
        // shader.addSubShader(subShader);
        // subShader.addShaderPass(shader1Vs, shader1Fs);

        let vertexColor = Laya.Shader3D.add('vertexColor');
        let subShader = new Laya.SubShader(attributeMap, uniformMap);
        vertexColor.addSubShader(subShader);
        subShader.addShaderPass(vertexColorVs, vertexColorFs);

    }
}