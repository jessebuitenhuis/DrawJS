import { Mesh } from '../Mesh';
import { m4 } from '../m4';
import {Canvas} from "../Canvas";

export class Cube extends Mesh {
    //constructor(protected _canvas: Canvas,
    //            private config:{
    //                dimensions: {w: number, h: number, d: number},
    //                position: {x: number, y: number, z: number},
    //                origin?: {x: number, y?: number, z?: number}
    //            }) {
    //
    //    super(_canvas);
    //
    //    this._dimensions = config.dimensions;
    //    this._position = config.position;
    //    this._origin = config.origin;
    //    this._setVertices();
    //}
    //
    //protected _setVertices() : void {
    //    this._numItems = 36;
    //    this._itemSize = 3;
    //
    //    var x = this._dimensions.w;
    //    var y = this._dimensions.h;
    //    var z = this._dimensions.d;
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
    //
    //    this._setVertexBuffer();
    //}
    //
    //protected _setColor() : void {
    //    var colors = [
    //        [200,  70, 100],
    //        [80, 70, 200],
    //        [70, 200, 210],
    //        [200, 200, 70],
    //        [210, 100, 70],
    //        [70, 180, 210]
    //    ];
    //
    //    for (var i in colors) {
    //        var color = colors[i];
    //
    //        for (var j = 0; j < 6; j++) {
    //            this._colors = this._colors.concat(color);
    //        }
    //    }
    //
    //    this._setColorBuffer();
    //}
}