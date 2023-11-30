export default class RpgPlayerMaterial extends Laya.Material {

    public static ALBEDOTEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");

    public static BLEND = Laya.Shader3D.propertyNameToID("s_Blend");
    public static BLENDSRC = Laya.Shader3D.propertyNameToID("s_BlendSrc");
    public static BLENDDST = Laya.Shader3D.propertyNameToID("s_BlendDst");
    public static DEPTHTEST = Laya.Shader3D.propertyNameToID("s_DepthTest");

    public static DEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");

    constructor() {
        super();

        this.setShaderName("RpgPlayer");

        this.renderQueue = Laya.Material.RENDERQUEUE_TRANSPARENT;

        this.blend = Laya.RenderState.BLEND_ENABLE_ALL;
        this.blendSrc = Laya.RenderState.BLENDPARAM_SRC_ALPHA;
        this.blendDst = Laya.RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;

        this.depthTest = Laya.RenderState.DEPTHTEST_GREATER;
    }

    public set depthTest(value) {
        this._shaderValues.setInt(RpgPlayerMaterial.DEPTHTEST, value);
    }

    public set blendDst(value) {
        this._shaderValues.setInt(RpgPlayerMaterial.BLENDDST, value);
    }

    public set blend(value) {
        this._shaderValues.setInt(RpgPlayerMaterial.BLEND, value);
    }

    public set blendSrc(value) {
        this._shaderValues.setInt(RpgPlayerMaterial.BLENDSRC, value);
    }

    public set albedoTexture(value) {
        if (value) {
            this._shaderValues.addDefine(RpgPlayerMaterial.DEFINE_ALBEDOTEXTURE);
        } else {
            this._shaderValues.removeDefine(RpgPlayerMaterial.DEFINE_ALBEDOTEXTURE);
        }
        this._shaderValues.setTexture(RpgPlayerMaterial.ALBEDOTEXTURE, value);
    }
}