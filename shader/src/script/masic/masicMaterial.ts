export default class MasicMaterial extends Laya.Material {

    public static ALBEDOCOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
    public static ALBEDOTEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    public static MASICSIZE = Laya.Shader3D.propertyNameToID("u_MasicSize");
    public static TEXSIZE = Laya.Shader3D.propertyNameToID("u_TexSize");

    public static SHADERDEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");

    constructor() {
        super();

        this.setShaderName("MASIC");

        this.albedoColor = new Laya.Vector4(1, 1, 1, 1);
        this.masicSize = 8.0;
        this.texSize = 512.0;
    }

    public set masicSize(value) {
        this._shaderValues.setNumber(MasicMaterial.MASICSIZE, value);
    }

    public set texSize(value) {
        this._shaderValues.setNumber(MasicMaterial.TEXSIZE, value);
    }

    public set albedoColor(value) {
        this._shaderValues.setVector(MasicMaterial.ALBEDOCOLOR, value);
    }

    public set albedoTexture(value) {
        if (value) {
            this._shaderValues.addDefine(MasicMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        } else {
            this._shaderValues.removeDefine(MasicMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        }
        this._shaderValues.setTexture(MasicMaterial.ALBEDOTEXTURE, value);
    }

    clone() {
        var dest = new MasicMaterial();
        this.cloneTo(dest);
        return dest;
    }
}