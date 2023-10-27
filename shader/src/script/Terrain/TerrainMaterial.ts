export default class TerrainMaterial extends Laya.Material {

    public static ALBEDOCOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
    public static ALBEDOTEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTextrure");
    public static SECONDTEXTURE = Laya.Shader3D.propertyNameToID("u_SecondTexture");
    public static WIDTH = Laya.Shader3D.propertyNameToID("u_Width");

    public static DEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");
    public static DEFINE_SECONDTEXTURE = Laya.Shader3D.getDefineByName("SECONDTEXTURE");


    constructor() {
        super();

        this.setShaderName("Terrain");

        this.albedoColor = new Laya.Vector4(1, 1, 1, 1);
        this.width = 4.0;
    }

    public set width(value) {
        this._shaderValues.setNumber(TerrainMaterial.WIDTH, value);
    }

    public set secondTexture(value) {
        if (value) {
            this._shaderValues.addDefine(TerrainMaterial.DEFINE_SECONDTEXTURE);
        } else {
            this._shaderValues.removeDefine(TerrainMaterial.DEFINE_SECONDTEXTURE);
        }
        this._shaderValues.setTexture(TerrainMaterial.SECONDTEXTURE, value);
    }

    public set albedoColor(value) {
        this._shaderValues.setVector(TerrainMaterial.ALBEDOCOLOR, value);
    }

    public get albedoColor() {
        return this._shaderValues.getVector(TerrainMaterial.ALBEDOCOLOR);
    }

    public set albedoTexture(value) {
        if (value) {
            this._shaderValues.addDefine(TerrainMaterial.DEFINE_ALBEDOTEXTURE);
        } else {
            this._shaderValues.removeDefine(TerrainMaterial.DEFINE_ALBEDOTEXTURE);
        }
        this._shaderValues.setTexture(TerrainMaterial.ALBEDOTEXTURE, value);
    }

    public get albedoTexture() {
        return this._shaderValues.getTexture(TerrainMaterial.ALBEDOTEXTURE);
    }
}