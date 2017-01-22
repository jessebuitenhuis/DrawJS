import { Mesh } from '../Mesh';
import {Canvas} from "../Canvas";

export class Plane extends Mesh {
    //constructor(protected _canvas: Canvas,
    //            protected _width: number,
    //            protected _height: number,
    //            private _translateX: number = 0,
    //            private _translateY: number = 0,
    //            protected _origin : {x: number, y?: number, z?: number} = {x: 0, y: 0, z: 0}) {
    //    super(_canvas);
    //}
    //
    //protected _setVertices() : void {
    //    this._numItems = 36;
    //    this._itemSize = 3;
    //    var x = 0.5;
    //    var y = 0.5;
    //    var z = 0.5;
    //
    //    var a = [0, 0, 0];
    //    var b = [x, 0, 0];
    //    var c = [x, y, 0];
    //    var d = [0, y, 0];
    //
    //    var e = [0, 0, z];
    //    var f = [x, 0, z];
    //    var g = [x, y, z];
    //    var h = [0, y, z];
    //
    //    var front = a.concat(b, d, d, b, c);
    //    var top = d.concat(c, h, c, g, h);
    //    var back = e.concat(h, f, f, h, g);
    //    var bottom = a.concat(e, b, e, f, b);
    //    var right = b.concat(g, c, g, b, f);
    //    var left = a.concat(d, e, d, h, e);
    //
    //    this._vertices = front.concat(top, back, bottom, right, left);
    //}
    //
    //public draw() : void{
    //    super.draw();
    //    this._rotation.x += 0.7;
    //    this._rotation.y += 0.5;
    //    this._rotation.z += 0.3;
    //}
}