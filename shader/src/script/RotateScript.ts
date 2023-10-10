export default class RotateScript extends Laya.Script3D {
    private _transfrom: Laya.Transform3D;

    onEnable() {
        this._transfrom = (this.owner as Laya.Sprite3D).transform;
    }

    onUpdate() {
        this._transfrom.rotate(new Laya.Vector3(0.01, 0.01, 0), false);
    }
}