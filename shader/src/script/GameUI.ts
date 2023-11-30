import { ui } from "./../ui/layaMaxUI";
import HollowCylinderMesh, { SanMesh } from "./3dModel/HollowCylinderMesh";
import MeshData from "./VertexUV/mesh/MeshData";
import RotateScript from "./RotateScript";
import BoxMesh from "./VertexUV/mesh/BoxMesh";
import { shader1Meterial } from "./shader1Material";
import { vertexMaterial } from "./vertexColor/vertexMaterial";
import { vertexWaveMaterial } from "./vertexWave/vertexWaveMaterial";
import UVAniMaterial from "./VertexUV/UVAni/UVAniMaterail";
import WaterMaterial from "./Water/WaterMaterial";
import BlurMaterial from "./Blur/BlurMaterial";
import MasicMaterial from "./masic/masicMaterial";
import TerrainMaterial from "./Terrain/TerrainMaterial";
import BonesMaterial from "./Bone/BonesMeterial";
import LightingMaterial from "./Lighting/LightingMaterial";
import RpgPlayerMaterial from "./RpgPlayer/RpgPlayerMaterial";
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends ui.test.TestSceneUI {
    private gameScene: Laya.Scene3D = null;

    constructor() {
        super();
        Laya.loader.create(["res/LayaScene_Test/Conventional/Test.ls"], Laya.Handler.create(this, this.onLoadComplete));

        this.btn_up.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown, [1]);
        this.btn_down.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown, [2]);
        this.btn_left.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown, [3]);
        this.btn_right.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown, [4]);
    }

    private onLoadComplete(): void {
        this.gameScene = Laya.stage.addChildAt(Laya.loader.getRes("res/LayaScene_Test/Conventional/Test.ls"), 0) as Laya.Scene3D;

        this.createBox();
    }

    private box: Laya.MeshSprite3D = null;

    private createBox(): void {
        this.box = this.gameScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createCapsule(0.3, 1.6, 32, 32))) as Laya.MeshSprite3D;
        this.box.transform.position = new Laya.Vector3(0, 0.8, 4);

        var material2: RpgPlayerMaterial = new RpgPlayerMaterial();
        Laya.Texture2D.load("res/blur11.png", Laya.Handler.create(this, (tex: Laya.Texture2D) => {
            material2.albedoTexture = tex;
        }))
        this.box.meshRenderer.sharedMaterial = material2;
    }

    private onMouseDown(type: number): void {
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUP);
        Laya.timer.frameLoop(1, this, this.onFrameLoop, [type]);
    }

    private onFrameLoop(type: number): void {
        var speed: number = 0.01;
        switch (type) {
            case 1:
                this.box.transform.translate(new Laya.Vector3(0, 0, speed), false);
                break;
            case 2:
                this.box.transform.translate(new Laya.Vector3(0, 0, -speed), false);
                break;
            case 3:
                this.box.transform.translate(new Laya.Vector3(speed, 0, 0), false);
                break;
            case 4:
                this.box.transform.translate(new Laya.Vector3(-speed, 0, 0), false);
                break;
        }
    }

    private onMouseUP(): void {
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUP);
        Laya.timer.clear(this, this.onFrameLoop);
    }

}