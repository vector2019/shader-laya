import shader1Vs from "./shader1.vs"
import shader1Fs from "./shader1.fs"

export default class MyShader {


    public static initShader() {
        var attributeMap = {
            'a_position': Laya.VertexMesh.MESH_POSITION0
        }

        var uniformMap = {
            'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
            'u_AlbedoColor': Laya.Shader3D.PERIOD_MATERIAL,
        };

        var shader = Laya.Shader3D.add("shader1");
        var subShader = new Laya.SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(shader1Vs, shader1Fs);

    }
}