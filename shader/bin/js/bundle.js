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

    class TerrainMaterial extends Laya.Material {
        constructor() {
            super();
            this.setShaderName("Terrain");
            this.albedoColor = new Laya.Vector4(1, 1, 1, 1);
            this.width = 4.0;
        }
        set width(value) {
            this._shaderValues.setNumber(TerrainMaterial.WIDTH, value);
        }
        set secondTexture(value) {
            if (value) {
                this._shaderValues.addDefine(TerrainMaterial.DEFINE_SECONDTEXTURE);
            }
            else {
                this._shaderValues.removeDefine(TerrainMaterial.DEFINE_SECONDTEXTURE);
            }
            this._shaderValues.setTexture(TerrainMaterial.SECONDTEXTURE, value);
        }
        set albedoColor(value) {
            this._shaderValues.setVector(TerrainMaterial.ALBEDOCOLOR, value);
        }
        get albedoColor() {
            return this._shaderValues.getVector(TerrainMaterial.ALBEDOCOLOR);
        }
        set albedoTexture(value) {
            if (value) {
                this._shaderValues.addDefine(TerrainMaterial.DEFINE_ALBEDOTEXTURE);
            }
            else {
                this._shaderValues.removeDefine(TerrainMaterial.DEFINE_ALBEDOTEXTURE);
            }
            this._shaderValues.setTexture(TerrainMaterial.ALBEDOTEXTURE, value);
        }
        get albedoTexture() {
            return this._shaderValues.getTexture(TerrainMaterial.ALBEDOTEXTURE);
        }
    }
    TerrainMaterial.ALBEDOCOLOR = Laya.Shader3D.propertyNameToID("u_AlbedoColor");
    TerrainMaterial.ALBEDOTEXTURE = Laya.Shader3D.propertyNameToID("u_AlbedoTextrure");
    TerrainMaterial.SECONDTEXTURE = Laya.Shader3D.propertyNameToID("u_SecondTexture");
    TerrainMaterial.WIDTH = Laya.Shader3D.propertyNameToID("u_Width");
    TerrainMaterial.DEFINE_ALBEDOTEXTURE = Laya.Shader3D.getDefineByName("ALBEDOTEXTURE");
    TerrainMaterial.DEFINE_SECONDTEXTURE = Laya.Shader3D.getDefineByName("SECONDTEXTURE");

    class GameUI extends ui.test.TestSceneUI {
        constructor() {
            super();
            this.gameScene = null;
            this.cube = null;
            this.gameScene = Laya.stage.addChild(new Laya.Scene3D());
            var camera = (this.gameScene.addChild(new Laya.Camera(0, 0.1, 100)));
            camera.transform.translate(new Laya.Vector3(0, 3, 3));
            camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
            var directionLight = this.gameScene.addChild(new Laya.DirectionLight());
            directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
            directionLight.transform.worldMatrix.setForward(new Laya.Vector3(1, -1, 0));
            this.hSlider.on(Laya.Event.CHANGE, this, this.onChange);
            Laya.loader.load([
                "res/bg1.jpg",
                "res/bg2.jpg"
            ], Laya.Handler.create(this, this.onLoad3DComplete));
        }
        onLoad3DComplete() {
            var box = this.gameScene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(10, 20, 100, 100)));
            box.transform.position = new Laya.Vector3(0, 0, -7);
            var material = new TerrainMaterial();
            material.albedoTexture = Laya.loader.getRes("res/bg1.jpg");
            material.secondTexture = Laya.loader.getRes("res/bg2.jpg");
            box.meshRenderer.material = material;
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
            let width = this.hSlider.value / this.hSlider.max * 8.0;
            let material = this.cube.meshRenderer.sharedMaterial;
            material.width = width;
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

    var TerrainVs = "#ifdef GL_FRAGMENT_PRECISION_HIGH\n    precision highp float;\n#else\n    precision mediump float;\n#endif\n\n\nuniform vec4 u_AlbedoColor;\n\n#ifdef ALBEDOTEXTURE\n    uniform sampler2D u_AlbedoTextrure;\n#endif\n\n#ifdef SECONDTEXTURE\n    uniform sampler2D u_SecondTexture;\n#endif\n\n\n// varying float v_Addy;\n// varying vec2 v_TexCoord0;\n\nvoid main(){\n    vec4 albedo = u_AlbedoColor;\n\n    // #ifdef ALBEDOTEXTURE\n    //     albedo *= texture2D(u_AlbedoTextrure, v_TexCoord0);\n    // #endif\n\n    // #ifdef SECONDTEXTURE\n    //     vec4 secondColor = texture2D(u_SecondTexture, v_TexCoord0);\n    //     float addy = v_Addy / 2.0;\n    //     albedo = mix(albedo, secondColor, addy);\n    // #endif\n\n    gl_FragColor = albedo;\n}";

    var TerrainFs = "#include \"Lighting.glsl\";\n\nuniform mat4 u_MvpMatrix;\n// uniform float u_Width;\nattribute vec4 a_Position;\nattribute vec2 a_TexCoord0;\n\n// varying vec2 v_TexCoord0;\n// varying float v_Addy;\n\nvoid main()\n{\n    // v_TexCoord0 = a_TexCoord0;\n    // float PI = 3.141592653589;\n    // float len = distance(vec2(a_Position.x , a_Position.z) , vec2(0.0));\n    // len = clamp(len , 0.0 , u_Width);\n    // float addy = sin(len * PI / u_Width) + 1.0;\n    // vec4 position = vec4(a_Position.x , a_Position.y + addy , a_Position.z , a_Position.w);\n    // v_Addy = addy;\n\n    gl_Position = u_MvpMatrix * a_Position;\n    gl_Position = remapGLPositionZ(gl_Position);\n}";

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
            };
            var shader = Laya.Shader3D.add("Terrain");
            var subShader = new Laya.SubShader(attributeMap, uniformMap);
            shader.addSubShader(subShader);
            subShader.addShaderPass(TerrainVs, TerrainFs);
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
