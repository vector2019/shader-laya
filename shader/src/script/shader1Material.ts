export class shader1Meterial extends Laya.Material {


    public static ALBEDOCOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
    public static DEFINE_ALBEDOCOLOR = Laya.Shader3D.getDefineByName("ALBEDOCOLOR");


    constructor() {
        super();
        this.setShaderName('shader1');

        this.albedoColor = new Laya.Vector4(1.0, 0.0, 0.0, 1.0);

        this._shaderValues.addDefine(shader1Meterial.DEFINE_ALBEDOCOLOR);
        // this._shaderValues.removeDefine(shader1Meterial.DEFINE_ALBEDOCOLOR);
    }


    public set albedoColor(value) {
        this._shaderValues.setVector(shader1Meterial.ALBEDOCOLOR, value)
    }
}