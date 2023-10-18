import Vertexo from "./Vertexo";

export default class MeshData{

    private vbArray: Array<any> = [];

    /**顶点数据 position(x,y,z) + normal(nx,ny,nz) + UV(u,v)*/
    public vertexs:Array<Vertexo> = [];
    /**三角形数据 */
    public triangle:Array<number> = [];

    /**mesh资源 */
    private _mesh:Laya.Mesh = null;

    /**
     * 添加顶点
     * @param x position.x 位置
     * @param y position.y
     * @param z position.z
     * @param nx normal.x 法线
     * @param ny normal.y
     * @param nz normal.z
     * @param u u  UV坐标
     * @param v v
     */
    public addVertex(x:number, y:number, z:number,
                     nx:number, ny:number, nz:number,
                     u:number , v:number,
                     r:number , g:number , b:number , a:number):void
    {
        var vertex:Vertexo = new Vertexo();
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

    /**
     * 合并多个mesh到这个mesh的身上
     * @param list mesh数组
     */
    public combineMesh(list:Array<MeshData>):MeshData{
        for(var i:number = 0 ; i < list.length ; i++){
            var data:MeshData = list[i];
            var begin:number = this.vertexs.length;

            for(var j:number = 0 ; j < data.vertexs.length ; j++){
                this.vertexs.push(data.vertexs[j]);
            }
            for(var j:number = 0 ; j < data.triangle.length ; j++){
                this.triangle.push(data.triangle[j] + begin);
            }
        }
        return this;
    }

    /**
     * 创建mesh资源对象
     */
    public createMesh():Laya.Mesh{
        if(this._mesh == null){
            var vertexDeclaration = Laya.VertexMesh.getVertexDeclaration("POSITION,NORMAL,UV,COLOR");
        
            for(var i:number = 0 ; i < this.vertexs.length ; i++){
                var ver:Vertexo = this.vertexs[i];
                this.vbArray.push(ver.x , ver.y , ver.z , ver.nx , ver.ny , ver.nz , ver.u , ver.v , ver.r , ver.g , ver.b , ver.a);
            }

            var vertices = new Float32Array(this.vbArray);
            var indices = new Uint16Array(this.triangle);

            this._mesh = Laya.PrimitiveMesh._createMesh(vertexDeclaration, vertices, indices);
        }
        
        return this._mesh;
    }

    /**
     * 获取网格资源
     */
    public get mesh():Laya.Mesh{
        return this.createMesh();
    }

    /**
     * 释放网格资源
     */
    public destroy():void{
        if(this._mesh != null){
            this._mesh.destroy();
        }
    }
}