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
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends ui.test.TestSceneUI {
    private gameScene: Laya.Scene3D = null;

    constructor() {
        super();

        // //添加3D场景
        // var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

        // //添加照相机
        // var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        // camera.transform.translate(new Laya.Vector3(0, 3, 3));
        // camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);

        // //添加方向光
        // var directionLight: Laya.DirectionLight = scene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        // directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        // directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

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

        // var cube: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))) as Laya.MeshSprite3D;
        // cube.transform.position = new Laya.Vector3(0, 3, 0);

        // var material2: WaterMaterial = new WaterMaterial();
        // Laya.Texture2D.load("res/water/water.png", Laya.Handler.create(this, (tex) => {
        //     material2.albedoTexture = tex;
        // }))

        // cube.meshRenderer.sharedMaterial = material2;

        //添加3D场景
        // this.gameScene = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

        // //设置场景环境光
        // this.gameScene.ambientColor = new Laya.Vector3(0.8, 0.8, 0.8);

        // //添加照相机
        // var camera: Laya.Camera = (this.gameScene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        // camera.transform.translate(new Laya.Vector3(0.5, 1, -3));
        // camera.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);

        // //添加方向光
        // var directionLight: Laya.DirectionLight = this.gameScene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        // directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        // directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        // var plane: Laya.MeshSprite3D = this.gameScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(10, 0.2, 40))) as Laya.MeshSprite3D;
        // plane.transform.position = new Laya.Vector3(0, -0.1, 0);

        //添加自定义模型
        // this.createBox();

        // this.hSlider.on(Laya.Event.CHANGE, this, this.onChange);

        // Laya.loader.load([
        //     "res/bg1.jpg",
        //     "res/bg2.jpg"
        // ], Laya.Handler.create(this, this.onLoad3DComplete));

        // this.load3DResources([
        //     "res/layabox.png",
        //     "res/3DModels/player1/samuzai_animation_ok.lh",
        //     "res/3DModels/player2/samuzai_animation_ok.lh"
        // ])

        //添加自定义模型
        // var earth = this.gameScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1.5, 64, 64))) as Laya.MeshSprite3D;
        // earth.transform.position = new Laya.Vector3(0, 0, -3);

        // var material: LightingMaterial = new LightingMaterial();
        // Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function (tex: Laya.Texture2D) {
        //     material.albedoTexture = tex;
        // }));
        // material.albedoColor = new Laya.Vector4(1, 1, 1, 1);

        // earth.meshRenderer.sharedMaterial = material;

        // this.testLighting();
        // this.hSlider.on(Laya.Event.CHANGE, this, this.onChange);

        //添加3D场景
        this.gameScene = Laya.stage.addChildAt(new Laya.Scene3D(), 0) as Laya.Scene3D;

        //设置场景环境光
        this.gameScene.ambientColor = new Laya.Vector3(0.8, 0.8, 0.8);

        //添加照相机
        var camera: Laya.Camera = (this.gameScene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 3, -3));
        camera.transform.rotate(new Laya.Vector3(0, 180, 0), true, false);

        //添加方向光
        var directionLight: Laya.DirectionLight = this.gameScene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));

        this.load3DResources([
            "res/normal/Cube.lm",

            "res/normal/albedo.jpg",
            "res/normal/albedo_NORM.png"
        ], () => {
            var box: Laya.MeshSprite3D = this.gameScene.addChild(new Laya.MeshSprite3D(Laya.loader.getRes("res/normal/Cube.lm"))) as Laya.MeshSprite3D;
            box.transform.position = new Laya.Vector3(0, 1.9, 2.6);
            box.transform.localScale = new Laya.Vector3(2, 2, 2);

            var material: LightingMaterial = new LightingMaterial();
            material.albedoTexture = Laya.loader.getRes("res/normal/albedo.jpg");
            material.normalTexture = Laya.loader.getRes("res/normal/albedo_NORM.png");
            box.meshRenderer.sharedMaterial = material;

            ///没有法线贴图
            var box2: Laya.MeshSprite3D = this.gameScene.addChild(new Laya.MeshSprite3D(Laya.loader.getRes("res/normal/Cube.lm"))) as Laya.MeshSprite3D;
            box2.transform.position = new Laya.Vector3(0, 4.1, 2.6);
            box2.transform.localScale = new Laya.Vector3(2, 2, 2);

            var material2: LightingMaterial = new LightingMaterial();
            material2.albedoTexture = Laya.loader.getRes("res/normal/albedo.jpg");
            box2.meshRenderer.sharedMaterial = material2;
        });

    }

    private earth: Laya.MeshSprite3D;
    private directionLight: Laya.DirectionLight;
    private testLighting() {
        //添加3D场景
        this.gameScene = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

        this.gameScene.ambientColor = new Laya.Vector3(0.1, 0.1, 0);

        //添加照相机
        var camera: Laya.Camera = (this.gameScene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 3, 3));
        camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);

        //添加方向光
        var directionLight: Laya.DirectionLight = this.gameScene.addChild(new Laya.DirectionLight()) as Laya.DirectionLight;
        directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
        directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));
        this.directionLight = directionLight;

        //添加自定义模型
        var earth = this.gameScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1.5, 64, 64))) as Laya.MeshSprite3D;
        earth.transform.position = new Laya.Vector3(0, 0, -3);
        this.earth = earth;

        var material: LightingMaterial = new LightingMaterial();
        Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function (tex: Laya.Texture2D) {
            material.albedoTexture = tex;
        }));
        material.albedoColor = new Laya.Vector4(1, 1, 1, 1);
        material.specularColor = new Laya.Vector4(1, 1, 1, 1);
        material.shininess = 0.5;

        earth.meshRenderer.sharedMaterial = material;
    }

    private load3DResources(urls: Array<string>, callBack: Function): void {
        Laya.loader.create(urls, Laya.Handler.create(this, callBack));
    }


    private onLoad3DComplete(): void {
        // let player: Laya.Sprite3D = Laya.loader.getRes("res/3DModels/player1/samuzai_animation_ok.lh");
        // player.transform.position = new Laya.Vector3(0, 0, 0);
        // player.transform.rotationEuler = new Laya.Vector3(0, 90, 0);

        // this.gameScene.addChild(player);

        // let animator: Laya.Animator = player.getComponent(Laya.Animator);
        // animator.play("attack");

        // var material: BonesMaterial = new BonesMaterial();
        // material.albedoTexture = Laya.loader.getRes("res/3DModels/player1/Assets/Character Pack/Texture/Body_Dif.jpg");

        // var material2: BonesMaterial = new BonesMaterial();
        // material2.albedoTexture = Laya.loader.getRes("res/3DModels/player1/Assets/Character Pack/Texture/Head_DM3 .jpg");


        // let body = player.getChildByName('Plane007') as Laya.SkinnedMeshSprite3D;
        // body.skinnedMeshRenderer.materials = [material, material2];

        let player: Laya.Sprite3D = Laya.loader.getRes("res/3DModels/player2/samuzai_animation_ok.lh");
        player.transform.position = new Laya.Vector3(0, 0, 0);
        player.transform.rotationEuler = new Laya.Vector3(0, 90, 0);

        this.gameScene.addChild(player);

        let animator: Laya.Animator = player.getComponent(Laya.Animator);
        animator.play("attack");

        var material: BonesMaterial = new BonesMaterial();
        material.albedoTexture = Laya.loader.getRes("res/3DModels/player2/Assets/Character Pack/Texture/Body_Dif.jpg");

        var material2: BonesMaterial = new BonesMaterial();
        material2.albedoTexture = Laya.loader.getRes("res/3DModels/player2/Assets/Character Pack/Texture/Head_DM3 .jpg");


        let body = player.getChildByName('Plane007') as Laya.SimpleSkinnedMeshSprite3D;
        body.simpleSkinnedMeshRenderer.materials = [material, material2];

    }


    private cube: Laya.MeshSprite3D = null;
    private createBox(): void {
        this.cube = this.gameScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1.3, 1.3, 1.3))) as Laya.MeshSprite3D;
        this.cube.transform.position = new Laya.Vector3(0, 3, 0);

        var material2: MasicMaterial = new MasicMaterial();
        // var material2: BlurMaterial = new BlurMaterial();
        Laya.Texture2D.load("res/blur/blur11.png", Laya.Handler.create(this, (tex: Laya.Texture2D) => {
            material2.albedoTexture = tex;
        }));

        this.cube.meshRenderer.sharedMaterial = material2;
    }

    private onChange(): void {
        // var blurWidth = this.hSlider.value * 0.0001 + 0.001;
        // var matterial: BlurMaterial = this.cube.meshRenderer.sharedMaterial as BlurMaterial;
        // matterial.blurWidth = blurWidth;

        // var blurWidth = Math.floor(this.hSlider.value) * 8;
        // let material: MasicMaterial = this.cube.meshRenderer.sharedMaterial as MasicMaterial;
        // material.masicSize = blurWidth;

        // let width = this.hSlider.value / this.hSlider.max * 8.0;
        // let material: TerrainMaterial = this.cube.meshRenderer.sharedMaterial as TerrainMaterial;
        // material.width = width;

        var value = this.hSlider.value * 0.01;
        var material: LightingMaterial = this.earth.meshRenderer.sharedMaterial as LightingMaterial;
        // material.shininess = value;

        this.directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1 * value, 0));
    }

}