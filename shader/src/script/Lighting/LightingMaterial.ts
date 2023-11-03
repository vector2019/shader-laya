export default class LightingMaterial extends Laya.Material {

    public static ALBEDOCOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
    public static ALBEDOTEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");

    public static SHINNESS = Laya.Shader3D.propertyNameToID("u_Shininess");
    public static SPECALARCOLOR = Laya.Shader3D.propertyNameToID("u_SpecularColor");

    public static NORMALTEXTURE = Laya.Shader3D.propertyNameToID("u_NormalTexture");
    public static DEFINE_NORMALTEXTURE = Laya.Shader3D.getDefineByName("NORMALTEXTURE");


    public static SHADERDEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");


    constructor() {
        super();

        this.setShaderName("MyLighting");

        this.albedoColor = new Laya.Vector4(1, 1, 1, 1);
    }

    public set normalTexture(value) {
        if (value) {
            this._shaderValues.addDefine(LightingMaterial.DEFINE_NORMALTEXTURE);
        } else {
            this._shaderValues.removeDefine(LightingMaterial.DEFINE_NORMALTEXTURE);
        }
        this._shaderValues.setTexture(LightingMaterial.NORMALTEXTURE, value);
    }


    public set albedoColor(value) {
        this._shaderValues.setVector(LightingMaterial.ALBEDOCOLOR, value);
    }

    public set albedoTexture(value) {
        if (value) {
            this._shaderValues.addDefine(LightingMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        } else {
            this._shaderValues.removeDefine(LightingMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        }
        this._shaderValues.setTexture(LightingMaterial.ALBEDOTEXTURE, value);
    }

    public set specularColor(value) {
        this._shaderValues.setVector(LightingMaterial.SPECALARCOLOR, value);
    }
    public set shininess(value) {
        this._shaderValues.setNumber(LightingMaterial.SHINNESS, value);
    }
}