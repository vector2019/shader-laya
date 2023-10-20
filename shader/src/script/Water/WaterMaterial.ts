

export default class WaterMaterial extends Laya.Material {
    public static ALBEDOCOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
    public static ALBODETEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    public static WIDTH = Laya.Shader3D.propertyNameToID("u_Width");
    public static SPEED = Laya.Shader3D.propertyNameToID("u_Speed");

    public static DEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");


    constructor() {
        super();
        this.setShaderName("Water");

        this.albedoColor = new Laya.Vector4(1.0, 1.0, 1.0, 1.0);

        this.width = 8.0;
        this.speed = 1.0;
    }

    public set width(value: number) {
        this._shaderValues.setNumber(WaterMaterial.WIDTH, value);
    }

    public set speed(value: number) {
        this._shaderValues.setNumber(WaterMaterial.SPEED, value);
    }

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