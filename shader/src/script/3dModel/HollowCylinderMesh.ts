import MeshData from "./MeshData";

export class SanMesh {
    public static create(radius: number, slices: number = 32, height: number = 2): MeshData {
        let sliceAngle = Math.PI / 2 / slices;
        let halfHeight = height / 2;
        let curAngle = 0;

        //上扇面
        let upMesh = new MeshData();
        upMesh.addVertex(
            0, halfHeight, 0,
            0, 1, 0,
            0.5, 0.5,
            1, 0, 0, 1
        )
        for (let tv = 0; tv <= slices; tv++) {
            curAngle = sliceAngle * tv;
            upMesh.addVertex(
                Math.cos(curAngle) * radius, halfHeight, Math.sin(curAngle) * radius,
                0, 1, 0,
                Math.cos(curAngle) * 0.5 + 0.5, Math.sin(curAngle) * 0.5 + 0.5,
                1, 0, 0, 1
            )
        }
        this.setTriangle(upMesh, slices, true);

        //下扇面
        let downMesh = new MeshData();
        for (let tv = 0; tv < upMesh.vertexs.length; tv++) {
            let upData = upMesh.vertexs[tv];
            downMesh.addVertex(
                upData.x, -halfHeight, upData.z,
                upData.nx, -upData.ny, upData.nz,
                upData.u, upData.v,
                0, 0, 1, 1
            )
        }
        this.setTriangle(downMesh, slices, false);

        //外柱面
        let outerMesh = new MeshData();
        for (let tv = 1; tv < upMesh.vertexs.length; tv++) {
            let upData = upMesh.vertexs[tv];
            outerMesh.addVertex(
                upData.x, halfHeight, upData.z,
                upData.x, 0, upData.z,
                upData.u, upData.v,
                1, 0, 0, 1
            )
        }
        for (let tv = 1; tv < downMesh.vertexs.length; tv++) {
            let downData = downMesh.vertexs[tv];
            outerMesh.addVertex(
                downData.x, -halfHeight, downData.z,
                downData.x, 0, downData.z,
                downData.u, downData.v,
                0, 0, 1, 1
            )
        }
        this.setTriangle1(outerMesh, slices);


        // 右侧面
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
            sideMesh.addVertex(
                vertex.x, vertex.y, vertex.z,
                vector.x, vector.y, vector.z,
                vertex.u, vertex.v,
                vertex.r, vertex.g, vertex.b, vertex.a
            )
        }
        sideMesh.trigangle.push(0, 1, 2);
        sideMesh.trigangle.push(2, 3, 0);
        sideMesh.trigangle.push(0, 3, 5);
        sideMesh.trigangle.push(5, 4, 0);

        return upMesh.combineMesh([downMesh, outerMesh, sideMesh]);
    }

    private static calculateNormalVector(point1, point2, point3) {
        // 计算从第一个点到第二个点的向量
        var vector1 = {
            x: point2.x - point1.x,
            y: point2.y - point1.y,
            z: point2.z - point1.z
        };

        // 计算从第一个点到第三个点的向量
        var vector2 = {
            x: point3.x - point1.x,
            y: point3.y - point1.y,
            z: point3.z - point1.z
        };

        // 计算法向量（两个向量的叉积）
        var normalVector = {
            x: vector1.y * vector2.z - vector1.z * vector2.y,
            y: vector1.z * vector2.x - vector1.x * vector2.z,
            z: vector1.x * vector2.y - vector1.y * vector2.x
        };

        // 返回法向量
        return normalVector;
    }

    public static setTriangle1(mesh: MeshData, slices: number): void {
        for (let tv = 0; tv <= slices; tv++) {
            var nn = tv + 1; //内圈的下一个顶点

            var wd = tv + slices; //外圈对应的顶点
            var wn = wd + 1; //外圈的下一个顶点

            mesh.trigangle.push(tv, wd, wn);
            mesh.trigangle.push(wn, nn, tv);
        }
    }




    public static setTriangle(mesh: MeshData, slices: number, isUp: boolean = true) {
        if (isUp) {
            for (let tv = 1; tv <= slices; tv++) {
                let wn = tv + 1;
                mesh.trigangle.push(0, tv, wn);
            }
        } else {
            for (let tv = 1; tv <= slices; tv++) {
                let wn = tv + 1;
                mesh.trigangle.push(0, wn, tv);
            }
        }
    }
}

export default class HollowCylinderMesh {
    public static create(minRadius: number = 0.5, maxRadius: number = 1.0, slices: number = 32, height: number = 2): MeshData {

        let sliceAngle = Math.PI * 2 / slices;
        let halfHeight = height / 2;
        let curAngle = 0;

        //上圆面
        let upMesh = new MeshData();
        for (let tv = 0; tv < slices; tv++) {
            curAngle = sliceAngle * tv;
            upMesh.addVertex(
                Math.cos(curAngle) * minRadius, halfHeight, Math.sin(curAngle) * minRadius,
                0, 1, 0,
                Math.cos(curAngle) * 0.25 + 0.5, Math.sin(curAngle) * 0.25 + 0.5,
                1, 0, 0, 1
            )
        }

        for (var tv = 0; tv < slices; tv++) {
            curAngle = tv * sliceAngle;
            upMesh.addVertex(Math.cos(curAngle) * maxRadius, halfHeight, Math.sin(curAngle) * maxRadius,
                0, 1, 0,
                Math.cos(curAngle) * 0.5 + 0.5, Math.sin(curAngle) * 0.5 + 0.5,
                1, 0, 0, 1);
        }
        this.setTriangle(upMesh, slices);

        //下圆面
        let downMesh = new MeshData();
        for (let tv = 0; tv < upMesh.vertexs.length; tv++) {
            curAngle = sliceAngle * tv;
            let upData = upMesh.vertexs[tv];
            downMesh.addVertex(
                upData.x, -halfHeight, upData.z,
                0, -1, 0,
                upData.u, upData.v,
                0, 0, 1, 1
            )
        }
        this.setTriangle2(downMesh, slices);

        //外柱面
        let outerMesh = new MeshData();
        for (let tv = slices; tv < slices * 2; tv++) {
            let upData = upMesh.vertexs[tv];
            outerMesh.addVertex(
                upData.x, upData.y, upData.z,
                upData.x, 0, upData.z,
                (tv - slices) / slices, 0,
                1, 0, 0, 1
            )
        }
        for (let tv = slices; tv < slices * 2; tv++) {
            let downData = downMesh.vertexs[tv];
            outerMesh.addVertex(
                downData.x, downData.y, downData.z,
                downData.x, 0, downData.z,
                (tv - slices) / slices, 0,
                0, 0, 1, 1
            )
        }
        this.setTriangle(outerMesh, slices);

        //内柱面
        let innerMesh = new MeshData();
        for (let tv = 0; tv < slices; tv++) {
            let upData = upMesh.vertexs[tv];
            innerMesh.addVertex(
                upData.x, upData.y, upData.z,
                -upData.x, 0, -upData.z,
                tv / slices, 0,
                1, 0, 0, 1
            )
        }
        for (let tv = 0; tv < slices; tv++) {
            let downData = downMesh.vertexs[tv];
            innerMesh.addVertex(
                downData.x, downData.y, downData.z,
                -downData.x, 0, -downData.z,
                tv / slices, 0,
                0, 1, 0, 1
            )
        }
        this.setTriangle2(innerMesh, slices);


        return upMesh.combineMesh([downMesh, outerMesh, innerMesh]);
    }

    public static setTriangle(mesh: MeshData, slices: number): void {
        for (let tv = 0; tv < slices; tv++) {
            var nn = tv + 1 >= slices ? 0 : tv + 1; //内圈的下一个顶点

            var wd = tv + slices; //外圈对应的顶点
            var wn = wd + 1 >= slices + slices ? slices : wd + 1; //外圈的下一个顶点

            mesh.trigangle.push(tv, wd, wn);
            mesh.trigangle.push(wn, nn, tv);
        }
    }

    public static setTriangle2(mesh: MeshData, slices: number): void {
        for (let tv = 0; tv < slices; tv++) {
            var nn = tv + 1 >= slices ? 0 : tv + 1; //内圈的下一个顶点

            var wd = tv + slices; //外圈对应的顶点
            var wn = wd + 1 >= slices + slices ? slices : wd + 1; //外圈的下一个顶点

            mesh.trigangle.push(tv, nn, wn);
            mesh.trigangle.push(wn, wd, tv);
        }
    }
}

// import MeshData from "./MeshData";

// export default class HollowCylinderMesh {

// public static create(minRadius: number = 0.5,
//     maxRadius: number = 1,
//     slices: number = 32,
//     height: number = 2): MeshData {
//     var sliceAngle = (Math.PI * 2.0) / slices;
//     var halfHeight = height / 2.0;
//     var curAngle = 0;

//     var upMesh: MeshData = new MeshData();
//     //上圆面
//     for (var tv = 0; tv < slices; tv++) {
//         curAngle = tv * sliceAngle;
//         upMesh.addVertex(Math.cos(curAngle) * minRadius, halfHeight, Math.sin(curAngle) * minRadius,
//             0, 1, 0,
//             Math.cos(curAngle) * 0.25 + 0.5, Math.sin(curAngle) * 0.25 + 0.5,
//             1, 0, 0, 1);
//     }
//     for (var tv = 0; tv < slices; tv++) {
//         curAngle = tv * sliceAngle;
//         upMesh.addVertex(Math.cos(curAngle) * maxRadius, halfHeight, Math.sin(curAngle) * maxRadius,
//             0, 1, 0,
//             Math.cos(curAngle) * 0.5 + 0.5, Math.sin(curAngle) * 0.5 + 0.5,
//             1, 0, 0, 1);
//     }
//     this.setTriangle(upMesh, slices);
//     return upMesh

// //下圆面
// var downMesh: MeshData = new MeshData();
// for (var tv = 0; tv < upMesh.vertexs.length; tv++) {
//     downMesh.addVertex(upMesh.vertexs[tv].x, -halfHeight, upMesh.vertexs[tv].z,
//         0, -1, 0,
//         upMesh.vertexs[tv].u, upMesh.vertexs[tv].v,
//         0, 0, 1, 1);
// }
// this.setTriangle2(downMesh, slices);

// //外柱面
// var waiZhuMesh: MeshData = new MeshData();
// for (var tv = slices; tv < slices + slices; tv++) {
//     waiZhuMesh.addVertex(upMesh.vertexs[tv].x, upMesh.vertexs[tv].y, upMesh.vertexs[tv].z,
//         upMesh.vertexs[tv].x, 0, upMesh.vertexs[tv].z,
//         (tv - slices) / slices, 0,
//         1, 0, 0, 1);
// }
// for (var tv = slices; tv < slices + slices; tv++) {
//     waiZhuMesh.addVertex(downMesh.vertexs[tv].x, downMesh.vertexs[tv].y, downMesh.vertexs[tv].z,
//         downMesh.vertexs[tv].x, 0, downMesh.vertexs[tv].z,
//         (tv - slices) / slices, 1,
//         0, 0, 1, 1);
// }
// this.setTriangle(waiZhuMesh, slices);

// //内柱面
// var neiZhuMesh: MeshData = new MeshData();
// for (var tv = 0; tv < slices; tv++) {
//     neiZhuMesh.addVertex(upMesh.vertexs[tv].x, upMesh.vertexs[tv].y, upMesh.vertexs[tv].z,
//         -upMesh.vertexs[tv].x, 0, -upMesh.vertexs[tv].z,
//         tv / slices, 0,
//         1, 0, 0, 1);
// }
// for (var tv = 0; tv < slices; tv++) {
//     neiZhuMesh.addVertex(downMesh.vertexs[tv].x, downMesh.vertexs[tv].y, downMesh.vertexs[tv].z,
//         -downMesh.vertexs[tv].x, 0, -downMesh.vertexs[tv].z,
//         tv / slices, 1,
//         0, 1, 0, 1);
// }
// this.setTriangle2(neiZhuMesh, slices);

// return upMesh.combineMesh([downMesh, waiZhuMesh, neiZhuMesh]);
// }

//     private static setTriangle(mesh: MeshData, slices: number): void {
//     for(var tv = 0; tv<slices; tv++) {
//     var nn = tv + 1 >= slices ? 0 : tv + 1; //内圈的下一个顶点

//     var wd = tv + slices; //外圈对应的顶点
//     var wn = wd + 1 >= slices + slices ? slices : wd + 1; //外圈的下一个顶点

//     mesh.trigangle.push(tv, wd, wn);
//     mesh.trigangle.push(wn, nn, tv);
// }
//     }

//     private static setTriangle2(mesh: MeshData, slices: number): void {
//     for(var tv = 0; tv<slices; tv++) {
//     var nn = tv + 1 >= slices ? 0 : tv + 1; //内圈的下一个顶点

//     var wd = tv + slices; //外圈对应的顶点
//     var wn = wd + 1 >= slices + slices ? slices : wd + 1; //外圈的下一个顶点

//     mesh.trigangle.push(tv, nn, wn);
//     mesh.trigangle.push(wn, wd, tv);
// }
//     }
// }