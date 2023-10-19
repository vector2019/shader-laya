import { ui } from "./../ui/layaMaxUI";
import HollowCylinderMesh, { SanMesh } from "./3dModel/HollowCylinderMesh";
import MeshData from "./VertexUV/mesh/MeshData";
import RotateScript from "./RotateScript";
import BoxMesh from "./VertexUV/mesh/BoxMesh";
import { shader1Meterial } from "./shader1Material";
import { vertexMaterial } from "./vertexColor/vertexMaterial";
import { vertexWaveMaterial } from "./vertexWave/vertexWaveMaterial";
import UVAniMaterial from "./VertexUV/UVAni/UVAniMaterail";
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends ui.test.TestSceneUI {
    constructor() {
        super();

        //添加3D场景
        var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);

        //添加方向光
        var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        // var meshData: MeshData = BoxMesh.createBox(1.5, 1.5, 1);
        // //添加自定义模型
        // var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(meshData.mesh)) as Laya.MeshSprite3D;
        // box.transform.position = new Laya.Vector3(0, 3, 0);

        // var material: vertexWaveMaterial = new vertexWaveMaterial();
        // Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(this, (tex) => {
        //     material.albedoTexture = tex;
        //     material.tilingOffset = new Laya.Vector4(2, 2, 0, 0);
        // }))
        // box.meshRenderer.material = material;

        var cube: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))) as Laya.MeshSprite3D;
        cube.transform.position = new Laya.Vector3(0, 3, 0);

        var material2: UVAniMaterial = new UVAniMaterial();
        Laya.Texture2D.load("res/uvani/BaShen2.png", Laya.Handler.create(this, (tex) => {
            material2.albedoTexture = tex;
        }))

        cube.meshRenderer.sharedMaterial = material2;

    }
}