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

    class MasicMaterial extends Laya.Material {
        constructor() {
            super();
            this.setShaderName("MASIC");
            this.albedoColor = new Laya.Vector4(1, 1, 1, 1);
            this.masicSize = 8.0;
            this.texSize = 512.0;
        }
        set masicSize(value) {
            this._shaderValues.setNumber(MasicMaterial.MASICSIZE, value);
        }
        set texSize(value) {
            this._shaderValues.setNumber(MasicMaterial.TEXSIZE, value);
        }
        set albedoColor(value) {
            this._shaderValues.setVector(MasicMaterial.ALBEDOCOLOR, value);
        }
        set albedoTexture(value) {
            if (value) {
                this._shaderValues.addDefine(MasicMaterial.SHADERDEFINE_ALBEDOTEXTURE);
            }
            else {
                this._shaderValues.removeDefine(MasicMaterial.SHADERDEFINE_ALBEDOTEXTURE);
            }
            this._shaderValues.setTexture(MasicMaterial.ALBEDOTEXTURE, value);
        }
        clone() {
            var dest = new MasicMaterial();
            this.cloneTo(dest);
            return dest;
        }
    }
    MasicMaterial.ALBEDOCOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
    MasicMaterial.ALBEDOTEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    MasicMaterial.MASICSIZE = Laya.Shader3D.propertyNameToID("u_MasicSize");
    MasicMaterial.TEXSIZE = Laya.Shader3D.propertyNameToID("u_TexSize");
    MasicMaterial.SHADERDEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");

    class BonesMaterial extends Laya.Material {
        constructor() {
            super();
            this.setShaderName("Bones");
            this.albedoColor = new Laya.Vector4(1, 1, 1, 1);
        }
        set albedoTexture(value) {
            if (value) {
                this._shaderValues.addDefine(BonesMaterial.SHADERDEFINE_ALBEDOTEXTURE);
            }
            else {
                this._shaderValues.removeDefine(BonesMaterial.SHADERDEFINE_ALBEDOTEXTURE);
            }
            this._shaderValues.setTexture(BonesMaterial.ALBEDOTEXTURE, value);
        }
        set albedoColor(value) {
            this._shaderValues.setVector(BonesMaterial.ALBEDOCOLOR, value);
        }
    }
    BonesMaterial.ALBEDOTEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    BonesMaterial.ALBEDOCOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
    BonesMaterial.SHADERDEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");

    class LightingMaterial extends Laya.Material {
        constructor() {
            super();
            this.setShaderName("MyLighting");
            this.albedoColor = new Laya.Vector4(1, 1, 1, 1);
        }
        set albedoColor(value) {
            this._shaderValues.setVector(LightingMaterial.ALBEDOCOLOR, value);
        }
        set albedoTexture(value) {
            if (value) {
                this._shaderValues.addDefine(LightingMaterial.SHADERDEFINE_ALBEDOTEXTURE);
            }
            else {
                this._shaderValues.removeDefine(LightingMaterial.SHADERDEFINE_ALBEDOTEXTURE);
            }
            this._shaderValues.setTexture(LightingMaterial.ALBEDOTEXTURE, value);
        }
        set specularColor(value) {
            this._shaderValues.setVector(LightingMaterial.SPECALARCOLOR, value);
        }
        set shininess(value) {
            this._shaderValues.setNumber(LightingMaterial.SHINNESS, value);
        }
    }
    LightingMaterial.ALBEDOCOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
    LightingMaterial.ALBEDOTEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTexture");
    LightingMaterial.SHINNESS = Laya.Shader3D.propertyNameToID("u_Shininess");
    LightingMaterial.SPECALARCOLOR = Laya.Shader3D.propertyNameToID("u_SpecularColor");
    LightingMaterial.SHADERDEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");

    class GameUI extends ui.test.TestSceneUI {
        constructor() {
            super();
            this.gameScene = null;
            this.cube = null;
            this.testLighting();
            this.hSlider.on(Laya.Event.CHANGE, this, this.onChange);
        }
        testLighting() {
            this.gameScene = Laya.stage.addChild(new Laya.Scene3D());
            this.gameScene.ambientColor = new Laya.Vector3(0.1, 0.1, 0);
            var camera = (this.gameScene.addChild(new Laya.Camera(0, 0.1, 100)));
            camera.transform.translate(new Laya.Vector3(0, 3, 3));
            camera.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
            var directionLight = this.gameScene.addChild(new Laya.DirectionLight());
            directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
            directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));
            this.directionLight = directionLight;
            var earth = this.gameScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1.5, 64, 64)));
            earth.transform.position = new Laya.Vector3(0, 0, -3);
            this.earth = earth;
            var material = new LightingMaterial();
            Laya.Texture2D.load("res/layabox.png", Laya.Handler.create(null, function (tex) {
                material.albedoTexture = tex;
            }));
            material.albedoColor = new Laya.Vector4(1, 1, 1, 1);
            material.specularColor = new Laya.Vector4(1, 1, 1, 1);
            material.shininess = 0.5;
            earth.meshRenderer.sharedMaterial = material;
        }
        load3DResources(urls) {
            Laya.loader.create(urls, Laya.Handler.create(this, this.onLoad3DComplete));
        }
        onLoad3DComplete() {
            let player = Laya.loader.getRes("res/3DModels/player2/samuzai_animation_ok.lh");
            player.transform.position = new Laya.Vector3(0, 0, 0);
            player.transform.rotationEuler = new Laya.Vector3(0, 90, 0);
            this.gameScene.addChild(player);
            let animator = player.getComponent(Laya.Animator);
            animator.play("attack");
            var material = new BonesMaterial();
            material.albedoTexture = Laya.loader.getRes("res/3DModels/player2/Assets/Character Pack/Texture/Body_Dif.jpg");
            var material2 = new BonesMaterial();
            material2.albedoTexture = Laya.loader.getRes("res/3DModels/player2/Assets/Character Pack/Texture/Head_DM3 .jpg");
            let body = player.getChildByName('Plane007');
            body.simpleSkinnedMeshRenderer.materials = [material, material2];
        }
        createBox() {
            this.cube = this.gameScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1.3, 1.3, 1.3)));
            this.cube.transform.position = new Laya.Vector3(0, 3, 0);
            var material2 = new MasicMaterial();
            Laya.Texture2D.load("res/blur/blur11.png", Laya.Handler.create(this, (tex) => {
                material2.albedoTexture = tex;
            }));
            this.cube.meshRenderer.sharedMaterial = material2;
        }
        onChange() {
            var value = this.hSlider.value * 0.01;
            var material = this.earth.meshRenderer.sharedMaterial;
            this.directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1 * value, 0));
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

    var VertexUVVs = "#include \"Lighting.glsl\";\n\n#ifdef GPU_INSTANCE\n    attribute mat4 a_MvpMatrix;\n#else\n    uniform mat4 u_MvpMatrix;\n#endif\n\nattribute vec4 a_Position;\n\nattribute vec2 a_TexCoord0;\n\nattribute vec4 a_Color;\n\nuniform vec4 u_TilingOffset;\n\nvarying vec2 v_TexCoord0;\n\nvarying vec4 v_Color;\n\nvoid main()\n{\n    // v_TexCoord0 = a_TexCoord0;\n\n    v_TexCoord0 = a_TexCoord0 * u_TilingOffset.xy + u_TilingOffset.zw;\n\n    v_Color = a_Color;\n\n    gl_Position = u_MvpMatrix * a_Position;\n    gl_Position = remapGLPositionZ(gl_Position);\n}";

    var VertexUVFs = "#ifdef GL_FRAMMENT_PRECISION_HIGH\n    precision highp float;\n#else\n    precision mediump float;\n#endif\n\nvarying vec2 v_TexCoord0;\n\nvarying vec4 v_Color;\n\nuniform sampler2D u_AlbedoTexture;\n\nvoid main()\n{\n    vec4 color = texture2D(u_AlbedoTexture , v_TexCoord0);\n\n    color *= v_Color;\n\n    gl_FragColor = color;\n}";

    var UVAniVs = "#include \"Lighting.glsl\";\n\nattribute vec4 a_Position;\nattribute vec2 a_TexCoord0;\n\nuniform mat4 u_MvpMatrix;\n\nvarying vec2 v_TexCoord0;\n\nvoid main(){\n    v_TexCoord0 = a_TexCoord0;\n\n    gl_Position = u_MvpMatrix * a_Position;\n    gl_Position = remapGLPositionZ(gl_Position);\n}";

    var UVAniFs = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n#else\n    precision mediump float;\n#endif\n\nuniform vec4 u_AlbedoColor;\n\n#ifdef ALBEDOTEXTURE\n    uniform sampler2D u_AlbedoTexture;\n#endif\n\n\nuniform vec2 u_WH;\nuniform float u_Time;\nvarying vec2 v_TexCoord0;\n\n\nvoid main(){\n    vec4 color = u_AlbedoColor;\n\n    #ifdef ALBEDOTEXTURE\n        float index = floor(u_Time * 20.0);\n\n        float uSize = 1.0  / u_WH.x;\n        float vSize = 1.0 / u_WH.y;\n\n        float uIndex = mod(index,u_WH.x);\n        float vIndex = floor(index / u_WH.y);\n\n        vec2 uv = vec2(v_TexCoord0.x / u_WH.x + uIndex * uSize, \n                       v_TexCoord0.y / u_WH.y + vIndex * vSize);\n\n        color *= texture2D(u_AlbedoTexture,uv);\n    #endif\n    gl_FragColor = color;\n}";

    var WaterVs = "\n#include \"Lighting.glsl\"\n\nattribute vec4 a_Position;\nattribute vec2 a_TexCoord0;\n\nuniform mat4 u_MvpMatrix;\n\nvarying vec2 v_TexCoord0;\n\n\nvoid main(){\n\n    v_TexCoord0 = a_TexCoord0;\n\n\n    gl_Position = u_MvpMatrix * a_Position;\n    gl_Position = remapGLPositionZ(gl_Position);\n}";

    var WaterFs = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n#else\n    precision mediump float;\n#endif\n\nuniform vec4 u_AlbedoColor;\n\n\nuniform float u_Width;\n\nuniform float u_Speed;\n\nuniform float u_Time;\n\n\n#ifdef ALBEDOTEXTURE\n    uniform sampler2D u_AlbedoTexture;\n#endif\n\nvarying vec2 v_TexCoord0;\n\nvoid main(){\n    vec4 color = u_AlbedoColor;\n\n    #ifdef ALBEDOTEXTURE\n        float PI = 3.141592653589;\n\n        vec2 texCoord = v_TexCoord0;\n\n        //横向 和 纵向 波浪效果\n        // float sinx = sin(texCoord.x * PI * u_Width + u_Time * u_Speed) * 0.01;\n\n        // float sinx = sin(texCoord.x * PI * u_Width + u_Time * u_Speed);\n        // sinx = (sinx + 1.0) / 2.0;\n        // float siny = sinx;\n        // float siny = cos(texCoord.y * PI * u_Width + u_Time * u_Speed) * 0.01;\n\n        // float sinx = sin( u_Time * u_Speed) ;\n        // float siny = cos( u_Time * u_Speed) ;\n\n        //扩散波浪\n        vec2 op = vec2(0.5 , 0.5);\n        float len = distance(texCoord , op) * -1.0;\n\n        float sinx = sin(len * PI * u_Width + u_Time * u_Speed) * 0.01;\n        float siny = sinx;\n\n        texCoord.x += sinx;\n        texCoord.y += siny;\n\n        color *= texture2D(u_AlbedoTexture , texCoord);\n\n        sinx = (sinx * 100.0 / 2.0 + 0.5) / 2.0 + 1.0;\n        siny = (siny * 100.0 / 2.0 + 0.5) / 2.0 + 1.0;\n\n        color *= (sinx + siny) / 2.0;\n    #endif\n\n    gl_FragColor = color;\n}";

    var BlurVs = "#include \"Lighting.glsl\";\n\n#ifdef GPU_INSTANCE\n    attribute mat4 a_MvpMatrix;\n#else\n    uniform mat4 u_MvpMatrix;\n#endif\n\nattribute vec4 a_Position;\n\nattribute vec2 a_TexCoord0;\n\nvarying vec2 v_TexCoord0;\n\nvoid main()\n{\n    v_TexCoord0 = a_TexCoord0;\n\n    #ifdef GPU_INSTANCE\n        gl_Position = a_MvpMatrix * a_Position;\n    #else\n        gl_Position = u_MvpMatrix * a_Position;\n    #endif\n\n    gl_Position = remapGLPositionZ(gl_Position);\n}";

    var BlurFs = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n#else\n    precision mediump float;\n#endif\n\nvarying vec2 v_TexCoord0;\n\nuniform vec4 u_AlbedoColor;\n\n#ifdef ALBEDOTEXTURE\n    uniform sampler2D u_AlbedoTexture;\n#endif\n\nuniform float u_BlurWidth;\n\nvoid main(){\n    // vec2 uv = v_TexCoord0;\n    // color *= texture2D(u_AlbedoTexture,uv);\n\n    // uv.x = clamp(v_TexCoord0.x + u_BlurWidth,0.0,1.0);\n    // color += texture2D(u_AlbedoTexture,uv);\n\n    // uv.x = clamp(v_TexCoord0.x - u_BlurWidth,0.0,1.0);\n    // color += texture2D(u_AlbedoTexture,uv);\n\n    // uv.y = clamp(v_TexCoord0.y + u_BlurWidth,0.0,1.0);\n    // color += texture2D(u_AlbedoTexture,uv);\n\n    // uv.y = clamp(v_TexCoord0.y - u_BlurWidth,0.0,1.0);\n    // color += texture2D(u_AlbedoTexture,uv);\n\n    // color /= 5.0;\n\n    vec4 color = u_AlbedoColor;\n\n\n    #ifdef ALBEDOTEXTURE\n        // color = vec4(0.0);\n        // vec2 op = vec2(0.0);\n        // vec2 texCoord = vec2(0.0);\n        // float f = 0.0;\n        // float total = 0.0;\n\n        // for(int i = -5;i< 5;i++){\n        //     for(int j = -5;j< 5;j++){\n        //         vec2 vp = vec2(float(i),float(j));\n        //         float dis = distance(vp,op);\n        //         //dis最大 = 5根号2 = 7.xxxx\n        //         f = 1.0 - dis / 8.0;\n        //         total += f;\n\n        //         texCoord.x = v_TexCoord0.x + u_BlurWidth * float(j);\n        //         texCoord.y = v_TexCoord0.y + u_BlurWidth * float(i);\n        //         color += texture2D(u_AlbedoTexture,texCoord) * f;\n        //     }   \n        // }\n        // color /= total;\n\n\n        vec2 uv = v_TexCoord0 * 512.0;\n        uv = floor(uv / 8.0) * 8.0;\n\n        vec2 texCoord = uv / 512.0;\n        color = texture2D(u_AlbedoTexture,texCoord);\n    #endif\n\n    gl_FragColor = color ;\n}\n\n\n// #ifdef GL_FRAGMENT_PRECISION_HIGH\n//     precision highp float;\n// #else\n//     precision mediump float;\n// #endif\n\n// varying vec2 v_TexCoord0;\n\n// uniform vec4 u_AlbedoColor;\n\n// #ifdef ALBEDOTEXTURE\n//     uniform sampler2D u_AlbedoTexture;\n// #endif\n\n// uniform float u_BlurWidth;\n\n// void main()\n// {\n//     vec4 color = u_AlbedoColor;\n\n//     #ifdef ALBEDOTEXTURE\n//     /*\n//         color *= texture2D(u_AlbedoTexture , v_TexCoord0);\n\n//         vec2 uv = v_TexCoord0;\n\n//         uv.x = clamp(v_TexCoord0.x + u_BlurWidth , 0.0 , 1.0);\n//         color += texture2D(u_AlbedoTexture , uv);\n\n//         uv.x = clamp(v_TexCoord0.x - u_BlurWidth , 0.0 , 1.0);\n//         color += texture2D(u_AlbedoTexture , uv);\n\n//         uv.x = v_TexCoord0.x;\n\n//         uv.y = clamp(v_TexCoord0.y + u_BlurWidth , 0.0 , 1.0);\n//         color += texture2D(u_AlbedoTexture , uv);\n\n//         uv.y = clamp(v_TexCoord0.y - u_BlurWidth , 0.0 , 1.0);\n//         color += texture2D(u_AlbedoTexture , uv);\n\n//         color /= 5.0;\n//         */\n\n//         color = vec4(0.0);\n//         float f = 0.0;\n//         vec2 op = vec2(0.0);\n//         vec2 texCoord = vec2(0.0);\n//         float tot = 0.0;\n\n//         for(int i = -5 ; i < 5 ; i++)\n//         {\n//             for(int j = -5 ; j < 5 ; j++)\n//             {\n//                 vec2 vp = vec2(float(i) , float(j));\n//                 float dis = distance(vp , op);\n//                 f = 1.1 - dis / 8.0;\n\n//                 tot += f;\n\n//                 texCoord.x = v_TexCoord0.x + u_BlurWidth * float(j);\n//                 texCoord.y = v_TexCoord0.y + u_BlurWidth * float(i);\n\n//                 color += texture2D(u_AlbedoTexture , texCoord) * f;\n//             }\n//         }\n\n//         color /= tot;\n//     #endif\n\n//     gl_FragColor = color;\n// }";

    var MasicVs = "#include \"Lighting.glsl\";\n\n#ifdef GPU_INSTANCE\n    attribute mat4 a_MvpMatrix;\n#else\n    uniform mat4 u_MvpMatrix;\n#endif\n\nattribute vec4 a_Position;\n\nattribute vec2 a_TexCoord0;\n\nvarying vec2 v_TexCoord0;\n\nvoid main()\n{\n    v_TexCoord0 = a_TexCoord0;\n\n    #ifdef GPU_INSTANCE\n        gl_Position = a_MvpMatrix * a_Position;\n    #else\n        gl_Position = u_MvpMatrix * a_Position;\n    #endif\n\n    gl_Position = remapGLPositionZ(gl_Position);\n}";

    var MasicFs = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n#else\n    precision mediump float;\n#endif\n\nvarying vec2 v_TexCoord0;\n\nuniform vec4 u_AlbedoColor;\nuniform float u_MasicSize;\nuniform float u_TexSize;\n\n#ifdef ALBEDOTEXTURE\n    uniform sampler2D u_AlbedoTexture;\n#endif\n\nuniform float u_BlurWidth;\n\nvoid main(){\n    vec4 color = u_AlbedoColor;\n    vec2 texCoord = v_TexCoord0;\n\n\n    #ifdef ALBEDOTEXTURE\n        //正方块马赛克\n        // float width = u_TexSize;\n        // float rectSize = u_MasicSize;\n        // vec2 uv = texCoord * width;\n        // uv = floor(uv / rectSize) * rectSize;\n        // uv /= width;\n        // color *= texture2D(u_AlbedoTexture,uv);\n\n\n        //六边形的马赛克效果\n        float len = u_MasicSize / u_TexSize;\n        float TW = 1.0;\n        float TR = 1.73;\n        float x = v_TexCoord0.x;\n        float y = v_TexCoord0.y;\n\n        // float wx = floor(x / TW / len);\n        // float wy = floor(y / TR / len);\n\n        float wx = floor(x * u_TexSize / TW / u_MasicSize);\n        float wy = floor(y * u_TexSize / TR / u_MasicSize);\n\n        vec2 v1 = vec2(0.5 , 0.5);\n        vec2 v2 = vec2(0.5 , 0.6);\n\n        if(mod(wx + wy , 2.0) == 0.0){\n            v1 = vec2( wx * TW * len , wy * TR * len);\n            v2 = vec2((wx + 1.0) * TW * len , (wy + 1.0) * TR * len);\n        }else{\n            v1 = vec2( wx * TW * len , (wy + 1.0) * TR * len);\n            v2 = vec2( (wx + 1.0) * TW * len , wy * TR * len);\n        }\n        \n        float s1 = distance(v1 , v_TexCoord0);\n        float s2 = distance(v2 , v_TexCoord0);\n\n        if(s1 < s2)\n        {\n            texCoord = v1;\n        }\n        else\n        {\n            texCoord = v2;\n        }\n\n        color *= texture2D(u_AlbedoTexture , texCoord);\n    #endif\n    gl_FragColor = color ;\n}";

    var TerrainVs = "\n#include \"Lighting.glsl\";\n\nuniform mat4 u_MvpMatrix;\nuniform float u_Width;\nattribute vec4 a_Position;\nattribute vec2 a_TexCoord0;\n\nvarying vec2 v_TexCoord0;\nvarying float v_Addy;\n\nvoid main(){\n    v_TexCoord0 = a_TexCoord0;\n    float PI = 3.141592653589;\n    float len = distance(vec2(a_Position.x , a_Position.z) , vec2(0.0));\n    // len = clamp(len , 0.0 , u_Width);\n    float addy = sin(len * PI / u_Width) + 1.0;\n    vec4 position = vec4(a_Position.x , a_Position.y + addy , a_Position.z , a_Position.w);\n    v_Addy = addy;\n\n    gl_Position = u_MvpMatrix * position;\n    gl_Position = remapGLPositionZ(gl_Position);\n}";

    var TerrainFs = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n#else\n    precision mediump float;\n#endif\n\n\nuniform vec4 u_AlbedoColor;\n\n#ifdef ALBEDOTEXTURE\n    uniform sampler2D u_AlbedoTextrure;\n#endif\n\n#ifdef SECONDTEXTURE\n    uniform sampler2D u_SecondTexture;\n#endif\n\n\nvarying float v_Addy;\nvarying vec2 v_TexCoord0;\n\nvoid main()\n{\n    vec4 albedo = u_AlbedoColor;\n\n    #ifdef ALBEDOTEXTURE\n        albedo *= texture2D(u_AlbedoTextrure, v_TexCoord0);\n    #endif\n\n    #ifdef SECONDTEXTURE\n        vec4 secondColor = texture2D(u_SecondTexture, v_TexCoord0);\n        float addy = v_Addy / 2.0;\n        albedo = mix(albedo, secondColor, addy);\n    #endif\n\n    gl_FragColor = albedo;\n}";

    var BoneVs = "#include \"Lighting.glsl\";\n\n#ifdef GPU_INSTANCE\n    attribute mat4 a_MvpMatrix;\n#else\n    uniform mat4 u_MvpMatrix;\n#endif\n\nattribute vec4 a_Position;\n\nattribute vec2 a_TexCoord0;\n\nvarying vec2 v_TexCoord0;\n\n#ifdef BONE\n    attribute vec4 a_BoneIndices; //骨骼索引\n    attribute vec4 a_BoneWeights; //骨骼权重\n    uniform mat4 u_Bones[24]; // 骨骼矩阵数组\n\n    #ifdef SIMPLEBONE\n        uniform vec4 u_SimpleAnimatorParams; //动画数据\n        uniform float u_SimpleAnimatorTextureSize; //动画贴图的大小\n        uniform sampler2D u_SimpleAnimatorTexture; //骨骼动画贴图\n    #endif\n#endif\n\n#ifdef SIMPLEBONE\nmat4 loadMatFromTexture(float framePos , int boneIndices)\n{\n    vec2 uv;\n\n    float pixePos = framePos + float(boneIndices) * 4.0;\n\n    float han = floor(pixePos / u_SimpleAnimatorTextureSize); //行\n    float lie = mod(pixePos , u_SimpleAnimatorTextureSize); //列\n\n    float offset = 1.0 / u_SimpleAnimatorTextureSize;\n\n    uv.x = lie * offset + offset * 0.5;\n    uv.y = han * offset + offset * 0.5;\n\n    vec4 color0 = texture2D(u_SimpleAnimatorTexture , uv);\n\n    uv.x += offset;\n    vec4 color1 = texture2D(u_SimpleAnimatorTexture , uv);\n\n    uv.x += offset;\n    vec4 color2 = texture2D(u_SimpleAnimatorTexture , uv);\n\n    uv.x += offset;\n    vec4 color3 = texture2D(u_SimpleAnimatorTexture , uv);\n\n    mat4 m = mat4(color0.x , color0.y , color0.z , color0.w , \n                  color1.x , color1.y , color1.z , color1.w ,    \n                  color2.x , color2.y , color2.z , color2.w , \n                  color3.x , color3.y , color3.z , color3.w );\n\n    return m;\n}\n#endif\n\nvoid main()\n{\n    v_TexCoord0 = a_TexCoord0;\n\n    vec4 position = a_Position;\n\n    #ifdef BONE\n        mat4 boneMat;\n\n        #ifdef SIMPLEBONE\n            float framePos = u_SimpleAnimatorParams.x + u_SimpleAnimatorParams.y;\n\n            boneMat = loadMatFromTexture(framePos , int(a_BoneIndices.x)) * a_BoneWeights.x;\n            boneMat += loadMatFromTexture(framePos , int(a_BoneIndices.y)) * a_BoneWeights.y;\n            boneMat += loadMatFromTexture(framePos , int(a_BoneIndices.z)) * a_BoneWeights.z;\n            boneMat += loadMatFromTexture(framePos , int(a_BoneIndices.w)) * a_BoneWeights.w;\n        #else\n            boneMat = u_Bones[int(a_BoneIndices.x)] * a_BoneWeights.x;\n            boneMat += u_Bones[int(a_BoneIndices.y)] * a_BoneWeights.y;\n            boneMat += u_Bones[int(a_BoneIndices.z)] * a_BoneWeights.z;\n            boneMat += u_Bones[int(a_BoneIndices.w)] * a_BoneWeights.w;\n        #endif\n\n        position = boneMat * a_Position;\n    #endif\n\n    #ifdef GPU_INSTANCE\n\t\tgl_Position = a_MvpMatrix * position;\n\t#else\n\t\tgl_Position = u_MvpMatrix * position;\n\t#endif\n\n    gl_Position = remapGLPositionZ(gl_Position);\n}";

    var BoneFs = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#endif\n\nuniform vec4 u_AlbedoColor;\n\n#ifdef ALBEDOTEXTURE\n\tuniform sampler2D u_AlbedoTexture;\n#endif\n\nvarying vec2 v_TexCoord0;\n\n\nvoid main()\n{\n    vec4 color =  u_AlbedoColor;\n\n    #ifdef ALBEDOTEXTURE\n\t\tcolor *= texture2D(u_AlbedoTexture, v_TexCoord0);\n\t#endif\n\n    gl_FragColor = color;\n}";

    var LightingVS = "#include \"Lighting.glsl\";\n\nattribute vec4 a_Position;\nattribute vec2 a_TexCoord0;\nattribute vec3 a_Normal;\n\nuniform mat4 u_MvpMatrix;\nuniform mat4 u_WorldMat;\n\nvarying vec2 v_TexCoord0;\nvarying vec3 v_Normal;\nvarying vec3 v_Position;\n\nvoid main(){\n    mat3 _world2Object;\n\n    v_TexCoord0 = a_TexCoord0;\n\n    _world2Object = INVERSE_MAT(mat3(u_WorldMat));\n    v_Normal = normalize(a_Normal * _world2Object);\n\n    v_Position = (u_WorldMat * a_Position).xyz;\n\n    gl_Position = u_MvpMatrix * a_Position;\n    gl_Position = remapGLPositionZ(gl_Position);\n}";

    var LightingFS = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n    precision highp int;\n#else\n    precision mediump float;\n    precision mediump int;\n#endif\n#include \"Lighting.glsl\";\n\nvarying vec2 v_TexCoord0;\nvarying vec3 v_Normal;\nvarying vec3 v_Position;\n\nuniform vec4 u_AlbedoColor;\n\nuniform vec4 u_AmbientColor ;//环境光\nuniform int u_DirationLightCount; // 平行光数量\nuniform sampler2D u_LightBuffer; // 灯光缓冲\n\nuniform vec3 u_CameraPos;\nuniform float u_Shininess;\nuniform vec4 u_SpecularColor;\n\n\n#ifdef ALBEDOTEXTURE\n    uniform sampler2D u_AlbedoTexture;\n#endif\n\nvoid main(){\n    vec4 mainColor = u_AlbedoColor;\n\n    #ifdef ALBEDOTEXTURE\n        vec4 color = texture2D(u_AlbedoTexture, v_TexCoord0);\n        mainColor *= color;\n    #endif\n\n    vec3 V = normalize(u_CameraPos - v_Position);\n\n    vec3 diffuse = vec3(0.0);\n    vec3 specular = vec3(0.0);\n\n    for(int i = 0; i < 20; i++){\n        if(i >= u_DirationLightCount) break;\n        DirectionLight directionLight = getDirectionLight(u_LightBuffer , i);\n        float ln = dot(v_Normal, directionLight.direction * -1.0);\n        ln = max(0.0, ln);\n\n        // ln = ln * 0.5 + 0.5;\n        diffuse += directionLight.color * ln;\n\n        // vec3 R = reflect(directionLight.direction , v_Normal);\n        // float nR = max(dot(V , R), 0.0);\n\n        //半角高光反射 blinPhong\n        vec3 H = normalize( V + directionLight.direction * -1.0 );\n        float nR = max(0.0 , dot(H , v_Normal));\n        \n        specular += u_SpecularColor.rgb * directionLight.color * pow(nR , u_Shininess * 128.0);\n    }\n\n    mainColor = vec4(mainColor.rbg * (u_AmbientColor.rgb + diffuse) , mainColor.a);\n    mainColor.rgb += specular;\n\n    gl_FragColor = mainColor;\n\n    \n}";

    class MyShader {
        static initShader() {
            var attributeMap = {
                'a_Position': Laya.VertexMesh.MESH_POSITION0,
                "a_Color": Laya.VertexMesh.MESH_COLOR0,
                'a_TexCoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            };
            var uniformMap = {
                'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
                'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL,
                'u_TilingOffset': Laya.Shader3D.PERIOD_MATERIAL
            };
            let vertexWave = Laya.Shader3D.add('vertexWave');
            let subShader = new Laya.SubShader(attributeMap, uniformMap);
            vertexWave.addSubShader(subShader);
            subShader.addShaderPass(VertexUVVs, VertexUVFs);
            this.initUVAniMaterial();
            this.initWaterMaterial();
            this.initBlurMaterial();
            this.initMasicMaterial();
            this.initTerrainMaterial();
            this.initBoneMaterial();
            this.initLightingMaterial();
        }
        static initUVAniMaterial() {
            var attributeMap = {
                'a_Position': Laya.VertexMesh.MESH_POSITION0,
                'a_TexCoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            };
            var uniformMap = {
                'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
                'u_Time': Laya.Shader3D.PERIOD_SCENE,
                'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL,
                'u_AlbedoColor': Laya.Shader3D.PERIOD_MATERIAL,
                'u_WH': Laya.Shader3D.PERIOD_MATERIAL,
            };
            let vertexWave = Laya.Shader3D.add('UVAni');
            let subShader = new Laya.SubShader(attributeMap, uniformMap);
            vertexWave.addSubShader(subShader);
            subShader.addShaderPass(UVAniVs, UVAniFs);
        }
        static initWaterMaterial() {
            var attributeMap = {
                'a_Position': Laya.VertexMesh.MESH_POSITION0,
                'a_TexCoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            };
            var uniformMap = {
                'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
                'u_Time': Laya.Shader3D.PERIOD_SCENE,
                'u_AlbedoColor': Laya.Shader3D.PERIOD_MATERIAL,
                'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL,
                'u_Width': Laya.Shader3D.PERIOD_MATERIAL,
                'u_Speed': Laya.Shader3D.PERIOD_MATERIAL
            };
            let vertexWave = Laya.Shader3D.add('Water');
            let subShader = new Laya.SubShader(attributeMap, uniformMap);
            vertexWave.addSubShader(subShader);
            subShader.addShaderPass(WaterVs, WaterFs);
        }
        static initBlurMaterial() {
            var attributeMap = {
                'a_Position': Laya.VertexMesh.MESH_POSITION0,
                'a_TexCoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            };
            var uniformMap = {
                'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
                'u_AlbedoColor': Laya.Shader3D.PERIOD_MATERIAL,
                'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL,
                'u_MasicSize': Laya.Shader3D.PERIOD_MATERIAL,
                'u_TexSize': Laya.Shader3D.PERIOD_MATERIAL
            };
            var shader = Laya.Shader3D.add("MYBLUR");
            var subShader = new Laya.SubShader(attributeMap, uniformMap);
            shader.addSubShader(subShader);
            subShader.addShaderPass(BlurVs, BlurFs);
        }
        static initMasicMaterial() {
            var attributeMap = {
                'a_Position': Laya.VertexMesh.MESH_POSITION0,
                'a_TexCoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
            };
            var uniformMap = {
                'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
                'u_AlbedoColor': Laya.Shader3D.PERIOD_MATERIAL,
                'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL,
                'u_BlurWidth': Laya.Shader3D.PERIOD_MATERIAL,
                'u_MasicSize': Laya.Shader3D.PERIOD_MATERIAL,
                'u_TexSize': Laya.Shader3D.PERIOD_MATERIAL
            };
            var shader = Laya.Shader3D.add("MASIC");
            var subShader = new Laya.SubShader(attributeMap, uniformMap);
            shader.addSubShader(subShader);
            subShader.addShaderPass(MasicVs, MasicFs);
        }
        static initTerrainMaterial() {
            var attributeMap = {
                'a_Position': Laya.VertexMesh.MESH_POSITION0,
                'a_TexCoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0
            };
            var uniformMap = {
                'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
                'u_AlbedoColor': Laya.Shader3D.PERIOD_MATERIAL,
                'u_AlbedoTextrure': Laya.Shader3D.PERIOD_MATERIAL,
                'u_SecondTexture': Laya.Shader3D.PERIOD_MATERIAL,
                'u_Width': Laya.Shader3D.PERIOD_MATERIAL,
            };
            var shader = Laya.Shader3D.add("Terrain");
            var subShader = new Laya.SubShader(attributeMap, uniformMap);
            shader.addSubShader(subShader);
            subShader.addShaderPass(TerrainVs, TerrainFs);
        }
        static initBoneMaterial() {
            var attributeMap = {
                'a_Position': Laya.VertexMesh.MESH_POSITION0,
                'a_TexCoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
                'a_BoneIndices': Laya.VertexMesh.MESH_BLENDINDICES0,
                'a_BoneWeights': Laya.VertexMesh.MESH_BLENDWEIGHT0,
            };
            var uniformMap = {
                'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
                'u_Bones': Laya.Shader3D.PERIOD_CUSTOM,
                'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL,
                'u_AlbedoColor': Laya.Shader3D.PERIOD_MATERIAL,
                'u_SimpleAnimatorParams': Laya.Shader3D.PERIOD_SPRITE,
                'u_SimpleAnimatorTextureSize': Laya.Shader3D.PERIOD_SPRITE,
                'u_SimpleAnimatorTexture': Laya.Shader3D.PERIOD_SPRITE
            };
            var shader = Laya.Shader3D.add("Bones");
            var subShader = new Laya.SubShader(attributeMap, uniformMap);
            shader.addSubShader(subShader);
            subShader.addShaderPass(BoneVs, BoneFs);
        }
        static initLightingMaterial() {
            var attributeMap = {
                'a_Position': Laya.VertexMesh.MESH_POSITION0,
                'a_TexCoord0': Laya.VertexMesh.MESH_TEXTURECOORDINATE0,
                'a_Normal': Laya.VertexMesh.MESH_NORMAL0,
            };
            var uniformMap = {
                'u_MvpMatrix': Laya.Shader3D.PERIOD_SPRITE,
                'u_WorldMat': Laya.Shader3D.PERIOD_SPRITE,
                'u_CameraPos': Laya.Shader3D.PERIOD_CAMERA,
                'u_DirationLightCount': Laya.Shader3D.PERIOD_SCENE,
                'u_LightBuffer': Laya.Shader3D.PERIOD_SCENE,
                'u_AmbientColor': Laya.Shader3D.PERIOD_SCENE,
                'u_AlbedoColor': Laya.Shader3D.PERIOD_MATERIAL,
                'u_AlbedoTexture': Laya.Shader3D.PERIOD_MATERIAL,
                'u_Shininess': Laya.Shader3D.PERIOD_MATERIAL,
                'u_SpecularColor': Laya.Shader3D.PERIOD_MATERIAL
            };
            let shader = Laya.Shader3D.add("MyLighting");
            let subShader = new Laya.SubShader(attributeMap, uniformMap);
            shader.addSubShader(subShader);
            subShader.addShaderPass(LightingVS, LightingFS);
        }
    }

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
            MyShader.initShader();
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
