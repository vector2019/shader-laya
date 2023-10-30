export default class BonesMaterial extends Laya.Material {

    public static ALBEDOTEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    public static ALBEDOCOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");


    public static SHADERDEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");

    constructor() {
        super();

        this.setShaderName("Bones");
        this.albedoColor = new Laya.Vector4(1, 1, 1, 1);
    }


    public set albedoTexture(value) {
        if (value) {
            this._shaderValues.addDefine(BonesMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        } else {
            this._shaderValues.removeDefine(BonesMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        }
        this._shaderValues.setTexture(BonesMaterial.ALBEDOTEXTURE, value);
    }

    public set albedoColor(value) {
        this._shaderValues.setVector(BonesMaterial.ALBEDOCOLOR, value);
    }
}