export default class BlurMaterial extends Laya.Material {

    public static ALBEDOCOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
    public static ALBEDOTEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    public static BLURWIDTH = Laya.Shader3D.propertyNameToID("u_BlurWidth");

    public static SHADERDEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");

    constructor() {
        super();

        this.setShaderName("MYBLUR");

        this.albedoColor = new Laya.Vector4(1, 1, 1, 1);
        this.blurWidth = 0.005;
    }

    public set blurWidth(value) {
        this._shaderValues.setNumber(BlurMaterial.BLURWIDTH, value);
    }

    public set albedoColor(value) {
        this._shaderValues.setVector(BlurMaterial.ALBEDOCOLOR, value);
    }

    public set albedoTexture(value) {
        if (value) {
            this._shaderValues.addDefine(BlurMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        } else {
            this._shaderValues.removeDefine(BlurMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        }
        this._shaderValues.setTexture(BlurMaterial.ALBEDOTEXTURE, value);
    }

    clone() {
        var dest = new BlurMaterial();
        this.cloneTo(dest);
        return dest;
    }
}