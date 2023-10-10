// import Vertexo from "./Vertexo";

// export default class MeshData {
//     //顶点数组
//     public vertexs: Vertexo[] = [];
//     //三角形数据
//     public triangle: number[] = [];

//     public addVertex(
//         x: number, y: number, z: number,
//         nx: number, ny: number, nz: number,
//         u: number, v: number,
//         r: number, g: number, b: number, a: number): void {
//         let vertex: Vertexo = new Vertexo();
//         vertex.x = x;
//         vertex.y = y;
//         vertex.z = z;

//         vertex.nx = nx;
//         vertex.ny = ny;
//         vertex.nz = nz;

//         vertex.u = u;
//         vertex.v = v;

//         vertex.r = r;
//         vertex.g = g;
//         vertex.b = b;
//         vertex.a = a;
//         this.vertexs.push(vertex);
//     }

//     public addTriangle(a: number, b: number, c: number): void {
//         this.triangle.push(a, b, c);
//     }

//     public createMesh(): Laya.Mesh {
//         var vertexDeclaration = Laya.VertexMesh.getVertexDeclaration("POSITION,NORMAL,UV,COLOR");

//         var vbArray: Array<any> = [];
//         for (var i: number = 0; i < this.vertexs.length; i++) {
//             var ver: Vertexo = this.vertexs[i];
//             vbArray.push(ver.x, ver.y, ver.z, ver.nx, ver.ny, ver.nz, ver.u, ver.v, ver.r, ver.g, ver.b, ver.a);
//         }

//         var vertices = new Float32Array(vbArray);
//         var indices = new Uint16Array(this.triangle);

//         return Laya.PrimitiveMesh._createMesh(vertexDeclaration, vertices, indices);
//     }

//     public combineMesh(list: MeshData[]): MeshData {
//         for (let i = 0; i < list.length; i++) {
//             let data = list[i];
//             let bgein = this.vertexs.length;

//             this.vertexs.push(...data.vertexs);

//             for (let triangle of data.triangle) {
//                 this.triangle.push(triangle + bgein);
//             }
//         }
//         return this;
//     }
// }


import Vertexo from "./Vertexo";

//mesh数据类
export default class MeshData {
    //顶点数组
    public vertexs: Array<Vertexo> = [];
    //三角形数据
    public trigangle: Array<number> = [];

    public addVertex(x: number, y: number, z: number,
        nx: number, ny: number, nz: number,
        u: number, v: number,
        r: number, g: number, b: number, a: number): void {
        var vertex: Vertexo = new Vertexo();
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

    //合并多个meshdata到这个mesh身上
    public combineMesh(list: Array<MeshData>): MeshData {
        for (var i: number = 0; i < list.length; i++) {
            var data: MeshData = list[i];
            var begin: number = this.vertexs.length;

            for (var j: number = 0; j < data.vertexs.length; j++) {
                this.vertexs.push(data.vertexs[j]);
            }
            for (var j: number = 0; j < data.trigangle.length; j++) {
                this.trigangle.push(data.trigangle[j] + begin);
            }
        }
        return this;
    }

    public createMesh(): Laya.Mesh {
        var vertexDeclaration = Laya.VertexMesh.getVertexDeclaration("POSITION,NORMAL,UV,COLOR");

        var vbArray: Array<any> = [];
        for (var i: number = 0; i < this.vertexs.length; i++) {
            var ver: Vertexo = this.vertexs[i];
            vbArray.push(ver.x, ver.y, ver.z, ver.nx, ver.ny, ver.nz, ver.u, ver.v, ver.r, ver.g, ver.b, ver.a);
        }

        var vertices = new Float32Array(vbArray);
        var indices = new Uint16Array(this.trigangle);

        return Laya.PrimitiveMesh._createMesh(vertexDeclaration, vertices, indices);
    }
}