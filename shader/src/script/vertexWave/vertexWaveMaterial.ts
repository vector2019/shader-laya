export class vertexWaveMaterial extends Laya.Material {
    public static WIDTH = Laya.Shader3D.propertyNameToID("u_Width");
    public static SPEED = Laya.Shader3D.propertyNameToID("u_Speed");

    constructor() {
        super();
        this.setShaderName('vertexWave');

        this.width = 0.5;
        this.speed = 0.5;
    }

    public set width(value) {
        this._shaderValues.setNumber(vertexWaveMaterial.WIDTH, value);
    }

    public set speed(value) {
        this._shaderValues.setNumber(vertexWaveMaterial.SPEED, value);
    }
}