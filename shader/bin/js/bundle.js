(function () {
    'use strict';

    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var test;
        (function (test) {
            class TestSceneUI extends Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("test/TestScene");
                }
            }
            test.TestSceneUI = TestSceneUI;
            REG("ui.test.TestSceneUI", TestSceneUI);
        })(test = ui.test || (ui.test = {}));
    })(ui || (ui = {}));

    class Vertexo {
        constructor() {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.nx = 0;
            this.ny = 0;
            this.nz = 0;
            this.u = 0;
            this.v = 0;
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.a = 0;
        }
    }

    class MeshData {
        constructor() {
            this.vertexs = [];
            this.trigangle = [];
        }
        addVertex(x, y, z, nx, ny, nz, u, v, r, g, b, a) {
            var vertex = new Vertexo();
            vertex.x = x;
            vertex.y = y;
            vertex.z = z;
            vertex.nx = nx;
            vertex.ny = ny;
            vertex.nz = nz;
            vertex.u = u;
            vertex.v = v;
            vertex.r = r;
            vertex.g = g;
            vertex.b = b;
            vertex.a = a;
            this.vertexs.push(vertex);
        }
        combineMesh(list) {
            for (var i = 0; i < list.length; i++) {
                var data = list[i];
                var begin = this.vertexs.length;
                for (var j = 0; j < data.vertexs.length; j++) {
                    this.vertexs.push(data.vertexs[j]);
                }
                for (var j = 0; j < data.trigangle.length; j++) {
                    this.trigangle.push(data.trigangle[j] + begin);
                }
            }
            return this;
        }
        createMesh() {
            var vertexDeclaration = Laya.VertexMesh.getVertexDeclaration("POSITION,NORMAL,UV,COLOR");
            var vbArray = [];
            for (var i = 0; i < this.vertexs.length; i++) {
                var ver = this.vertexs[i];
                vbArray.push(ver.x, ver.y, ver.z, ver.nx, ver.ny, ver.nz, ver.u, ver.v, ver.r, ver.g, ver.b, ver.a);
            }
            var vertices = new Float32Array(vbArray);
            var indices = new Uint16Array(this.trigangle);
            return Laya.PrimitiveMesh._createMesh(vertexDeclaration, vertices, indices);
        }
    }

    class SanMesh {
        static create(radius, slices = 32, height = 2) {
            let sliceAngle = Math.PI / 2 / slices;
            let halfHeight = height / 2;
            let curAngle = 0;
            let upMesh = new MeshData();
            upMesh.addVertex(0, halfHeight, 0, 0, 1, 0, 0.5, 0.5, 1, 0, 0, 1);
            for (let tv = 0; tv <= slices; tv++) {
                curAngle = sliceAngle * tv;
                upMesh.addVertex(Math.cos(curAngle) * radius, halfHeight, Math.sin(curAngle) * radius, 0, 1, 0, Math.cos(curAngle) * 0.5 + 0.5, Math.sin(curAngle) * 0.5 + 0.5, 1, 0, 0, 1);
            }
            this.setTriangle(upMesh, slices, true);
            let downMesh = new MeshData();
            for (let tv = 0; tv < upMesh.vertexs.length; tv++) {
                let upData = upMesh.vertexs[tv];
                downMesh.addVertex(upData.x, -halfHeight, upData.z, upData.nx, -upData.ny, upData.nz, upData.u, upData.v, 0, 0, 1, 1);
            }
            this.setTriangle(downMesh, slices, false);
            let outerMesh = new MeshData();
            for (let tv = 1; tv < upMesh.vertexs.length; tv++) {
                let upData = upMesh.vertexs[tv];
                outerMesh.addVertex(upData.x, halfHeight, upData.z, upData.x, 0, upData.z, upData.u, upData.v, 1, 0, 0, 1);
            }
            for (let tv = 1; tv < downMesh.vertexs.length; tv++) {
                let downData = downMesh.vertexs[tv];
                outerMesh.addVertex(downData.x, -halfHeight, downData.z, downData.x, 0, downData.z, downData.u, downData.v, 0, 0, 1, 1);
            }
            this.setTriangle1(outerMesh, slices);
            let sideMesh = new MeshData();
            let vertex0 = upMesh.vertexs[0];
            let vertex1 = upMesh.vertexs[upMesh.vertexs.length - 1];
            let vertex2 = downMesh.vertexs[downMesh.vertexs.length - 1];
            let vertex3 = downMesh.vertexs[0];
            let vertex4 = upMesh.vertexs[1];
            let vertex5 = downMesh.vertexs[1];
            let vertexs = [vertex0, vertex1, vertex2, vertex3, vertex4, vertex5];
            let normalVector = this.calculateNormalVector(vertex0, vertex1, vertex2);
            let vector = new Laya.Vector3(normalVector.x, normalVector.y, normalVector.z);
            Laya.Vector3.normalize(vector, vector);
            for (let tv = 0; tv < vertexs.length; tv++) {
                let vertex = vertexs[tv];
                sideMesh.addVertex(vertex.x, vertex.y, vertex.z, vector.x, vector.y, vector.z, vertex.u, vertex.v, vertex.r, vertex.g, vertex.b, vertex.a);
            }
            sideMesh.trigangle.push(0, 1, 2);
            sideMesh.trigangle.push(2, 3, 0);
            sideMesh.trigangle.push(0, 3, 5);
            sideMesh.trigangle.push(5, 4, 0);
            return upMesh.combineMesh([downMesh, outerMesh, sideMesh]);
        }
        static calculateNormalVector(point1, point2, point3) {
            var vector1 = {
                x: point2.x - point1.x,
                y: point2.y - point1.y,
                z: point2.z - point1.z
            };
            var vector2 = {
                x: point3.x - point1.x,
                y: point3.y - point1.y,
                z: point3.z - point1.z
            };
            var normalVector = {
                x: vector1.y * vector2.z - vector1.z * vector2.y,
                y: vector1.z * vector2.x - vector1.x * vector2.z,
                z: vector1.x * vector2.y - vector1.y * vector2.x
            };
            return normalVector;
        }
        static setTriangle1(mesh, slices) {
            for (let tv = 0; tv <= slices; tv++) {
                var nn = tv + 1;
                var wd = tv + slices;
                var wn = wd + 1;
                mesh.trigangle.push(tv, wd, wn);
                mesh.trigangle.push(wn, nn, tv);
            }
        }
        static setTriangle(mesh, slices, isUp = true) {
            if (isUp) {
                for (let tv = 1; tv <= slices; tv++) {
                    let wn = tv + 1;
                    mesh.trigangle.push(0, tv, wn);
                }
            }
            else {
                for (let tv = 1; tv <= slices; tv++) {
                    let wn = tv + 1;
                    mesh.trigangle.push(0, wn, tv);
                }
            }
        }
    }
    class HollowCylinderMesh {
        static create(minRadius = 0.5, maxRadius = 1.0, slices = 32, height = 2) {
            let sliceAngle = Math.PI * 2 / slices;
            let halfHeight = height / 2;
            let curAngle = 0;
            let upMesh = new MeshData();
            for (let tv = 0; tv < slices; tv++) {
                curAngle = sliceAngle * tv;
                upMesh.addVertex(Math.cos(curAngle) * minRadius, halfHeight, Math.sin(curAngle) * minRadius, 0, 1, 0, Math.cos(curAngle) * 0.25 + 0.5, Math.sin(curAngle) * 0.25 + 0.5, 1, 0, 0, 1);
            }
            for (var tv = 0; tv < slices; tv++) {
                curAngle = tv * sliceAngle;
                upMesh.addVertex(Math.cos(curAngle) * maxRadius, halfHeight, Math.sin(curAngle) * maxRadius, 0, 1, 0, Math.cos(curAngle) * 0.5 + 0.5, Math.sin(curAngle) * 0.5 + 0.5, 1, 0, 0, 1);
            }
            this.setTriangle(upMesh, slices);
            let downMesh = new MeshData();
            for (let tv = 0; tv < upMesh.vertexs.length; tv++) {
                curAngle = sliceAngle * tv;
                let upData = upMesh.vertexs[tv];
                downMesh.addVertex(upData.x, -halfHeight, upData.z, 0, -1, 0, upData.u, upData.v, 0, 0, 1, 1);
            }
            this.setTriangle2(downMesh, slices);
            let outerMesh = new MeshData();
            for (let tv = slices; tv < slices * 2; tv++) {
                let upData = upMesh.vertexs[tv];
                outerMesh.addVertex(upData.x, upData.y, upData.z, upData.x, 0, upData.z, (tv - slices) / slices, 0, 1, 0, 0, 1);
            }
            for (let tv = slices; tv < slices * 2; tv++) {
                let downData = downMesh.vertexs[tv];
                outerMesh.addVertex(downData.x, downData.y, downData.z, downData.x, 0, downData.z, (tv - slices) / slices, 0, 0, 0, 1, 1);
            }
            this.setTriangle(outerMesh, slices);
            let innerMesh = new MeshData();
            for (let tv = 0; tv < slices; tv++) {
                let upData = upMesh.vertexs[tv];
                innerMesh.addVertex(upData.x, upData.y, upData.z, -upData.x, 0, -upData.z, tv / slices, 0, 1, 0, 0, 1);
            }
            for (let tv = 0; tv < slices; tv++) {
                let downData = downMesh.vertexs[tv];
                innerMesh.addVertex(downData.x, downData.y, downData.z, -downData.x, 0, -downData.z, tv / slices, 0, 0, 1, 0, 1);
            }
            this.setTriangle2(innerMesh, slices);
            return upMesh.combineMesh([downMesh, outerMesh, innerMesh]);
        }
        static setTriangle(mesh, slices) {
            for (let tv = 0; tv < slices; tv++) {
                var nn = tv + 1 >= slices ? 0 : tv + 1;
                var wd = tv + slices;
                var wn = wd + 1 >= slices + slices ? slices : wd + 1;
                mesh.trigangle.push(tv, wd, wn);
                mesh.trigangle.push(wn, nn, tv);
            }
        }
        static setTriangle2(mesh, slices) {
            for (let tv = 0; tv < slices; tv++) {
                var nn = tv + 1 >= slices ? 0 : tv + 1;
                var wd = tv + slices;
                var wn = wd + 1 >= slices + slices ? slices : wd + 1;
                mesh.trigangle.push(tv, nn, wn);
                mesh.trigangle.push(wn, wd, tv);
            }
        }
    }

    class RotateScript extends Laya.Script3D {
        onEnable() {
            this._transfrom = this.owner.transform;
        }
        onUpdate() {
            this._transfrom.rotate(new Laya.Vector3(0.01, 0.01, 0), false);
        }
    }

    class GameUI extends ui.test.TestSceneUI {
        constructor() {
            super();
            var scene = Laya.stage.addChild(new Laya.Scene3D());
            scene.ambientColor = new Laya.Vector3(0.6, 0.6, 0.6);
            var camera = (scene.addChild(new Laya.Camera(0, 0.1, 100)));
            camera.transform.translate(new Laya.Vector3(0, 3, 3));
            camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
            var directionLight = scene.addChild(new Laya.DirectionLight());
            directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
            directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));
            var mesh = SanMesh.create(1, 64, 0.5);
            var box = scene.addChild(new Laya.MeshSprite3D(mesh.createMesh()));
            box.transform.position = new Laya.Vector3(0, 1, 0);
            var material = new Laya.BlinnPhongMaterial();
            material.enableVertexColor = true;
            box.meshRenderer.material = material;
            box.addComponent(RotateScript);
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("script/GameUI.ts", GameUI);
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "test/TestScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
