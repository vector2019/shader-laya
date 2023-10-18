export class vertexWaveMaterial extends Laya.Material {
    public static ALBODETEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");

    public static TILINGOFFSET = Laya.Shader3D.propertyNameToID("u_TilingOffset");


    constructor() {
        super();
        this.setShaderName('vertexWave');
    }

    public set albedoTexture(value) {
        this._shaderValues.setTexture(vertexWaveMaterial.ALBODETEXTURE, value);
    }

    public set tilingOffset(value) {
        this._shaderValues.setVector(vertexWaveMaterial.TILINGOFFSET, value);
    }
}