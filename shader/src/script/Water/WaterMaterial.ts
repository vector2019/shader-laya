

export default class WaterMaterial extends Laya.Material {
    public static ALBEDOCOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
    public static ALBODETEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    // public static WH = Laya.Shader3D.propertyNameToID("u_WH")

    public static DEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");


    constructor() {
        super();
        this.setShaderName("Water");

        this.albedoColor = new Laya.Vector4(1.0, 1.0, 1.0, 1.0);
    }

    // public set wh(value: Laya.Vector2) {
    //     this._shaderValues.setVector2(WaterMaterial.WH, value);
    // }

    public set albedoColor(value: Laya.Vector4) {
        this._shaderValues.setVector(WaterMaterial.ALBEDOCOLOR, value);
    }


    public set albedoTexture(value: Laya.BaseTexture) {
        if (value) {
            this._shaderValues.addDefine(WaterMaterial.DEFINE_ALBEDOTEXTURE);
        } else {
            this._shaderValues.removeDefine(WaterMaterial.DEFINE_ALBEDOTEXTURE);
        }
        this._shaderValues.setTexture(WaterMaterial.ALBODETEXTURE, value);
    }
}