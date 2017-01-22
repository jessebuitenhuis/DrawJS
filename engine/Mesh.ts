import { m4 } from './m4';
import {Canvas} from "./Canvas";

export class Mesh {
    //protected _ctx: WebGLRenderingContext;
    //protected _program: WebGLProgram;
    //
    //// Buffers
    //private _vertexBuffer : WebGLBuffer;
    //private _indexBuffer : WebGLBuffer;
    //private _colorBuffer : WebGLBuffer;
    //
    //// Shader Attributes
    //private _uMatrix : WebGLUniformLocation;
    //private _aPosition : number;
    //private _aColor : number;
    //
    //// Model
    //protected _itemSize : number = 3;
    //protected _numItems : number;
    //protected _dimensions : {w: number, h: number, d: number};
    //protected _position : {x: number, y: number, z: number} = {x:0, y: 0, z: 0};
    //protected _origin : {x: number, y?: number, z?: number} = {x: 0, y: 0, z: 0};
    //protected _rotation : {x?: number, y?: number, z?: number} = {x: 0, y: 0, z: 0};
    //protected _scale : {x?: number, y?: number, z?: number} = {x: 1, y: 1, z: 1};
    //protected _vertices : number[];
    //protected _indices : number[];
    //protected _colors : number[] = [];
    //
    //constructor(protected _canvas : Canvas){
    //    this._ctx = _canvas.ctx;
    //    this._program = _canvas.shaderProgram;
    //
    //    this._getAttributes();
    //    this._createBuffers();
    //    //this._setVertices();
    //    //this._setIndexes();
    //    this._setColor();
    //}
    //
    //private _getAttributes() : void {
    //    this._aPosition = this._ctx.getAttribLocation(this._program, "aPosition");
    //    this._aColor = this._ctx.getAttribLocation(this._program, "aColor");
    //}
    //
    //private _createBuffers() : void {
    //    this._vertexBuffer = this._ctx.createBuffer();
    //    this._colorBuffer = this._ctx.createBuffer();
    //    this._indexBuffer = this._ctx.createBuffer();
    //}
    //
    //protected _setVertexBuffer() : void {
    //    this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._vertexBuffer);
    //    this._ctx.bufferData(this._ctx.ARRAY_BUFFER, new Float32Array(this._vertices), this._ctx.STATIC_DRAW);
    //
    //    this._ctx.enableVertexAttribArray(this._aPosition);
    //
    //    this._ctx.vertexAttribPointer(this._aPosition, this._itemSize, this._ctx.FLOAT, false, 0, 0);
    //    this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, null);
    //}
    //
    //protected _setIndexBuffer() : void {
    //    this._ctx.bindBuffer(this._ctx.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
    //    this._ctx.bufferData(this._ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(this._indices), this._ctx.STATIC_DRAW);
    //    this._ctx.bindBuffer(this._ctx.ELEMENT_ARRAY_BUFFER, null);
    //}
    //
    //protected _setColorBuffer() : void {
    //    this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._colorBuffer);
    //    this._ctx.bufferData(this._ctx.ARRAY_BUFFER, new Uint8Array(this._colors), this._ctx.STATIC_DRAW);
    //    this._ctx.enableVertexAttribArray(this._aColor);
    //    this._ctx.vertexAttribPointer(this._aColor, 3, this._ctx.UNSIGNED_BYTE, true, 0, 0);
    //
    //
    //    this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, null);
    //}
    //
    //protected _setVertices() {
    //    throw new Error("No Set Vertices method provided");
    //}
    //
    //protected _setColor() : void {
    //    throw new Error("No Set Color method provided");
    //}
    //
    //protected _setIndexes() : void {
    //
    //}
    //
    //public draw() : void {
    //    this._setModelMatrix();
    //
    //    this._ctx.enableVertexAttribArray(this._aColor);
    //    this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._colorBuffer);
    //    //this._ctx.bufferData(this._ctx.ARRAY_BUFFER, new Uint8Array(this._colors), this._ctx.STATIC_DRAW);
    //    this._ctx.vertexAttribPointer(this._aColor, 3, this._ctx.UNSIGNED_BYTE, true, 0, 0);
    //
    //
    //    this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, null);
    //
    //    //this._rotation.x += 0.7;
    //    //this._rotation.y += 0.5;
    //    //this._rotation.z += 0.3;
    //
    //    if (this._indices) {
    //        this._ctx.bindBuffer(this._ctx.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
    //        this._ctx.drawElements(this._ctx.TRIANGLES, this._numItems, this._ctx.UNSIGNED_SHORT, 0);
    //        this._ctx.bindBuffer(this._ctx.ELEMENT_ARRAY_BUFFER, null);
    //    } else {
    //        this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._vertexBuffer);
    //        this._ctx.drawArrays(this._ctx.TRIANGLES, 0, this._numItems);
    //        this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, null);
    //    }
    //
    //
    //}
    //
    //private _setModelMatrix() : void {
    //    var matrix = m4.identity();
    //
    //    // transform
    //    matrix = m4.transform(matrix, this._position, this._scale, this._rotation);
    //
    //    // change origin
    //    if (this._origin) {
    //        var originX = this._origin.x || 0;
    //        var originY = this._origin.y || 0;
    //        var originZ = this._origin.z || 0;
    //
    //        matrix = m4.translate(matrix,
    //            -originX * this._dimensions.w,
    //            -originY * this._dimensions.h,
    //            -originZ * this._dimensions.d
    //        );
    //    }
    //
    //    // set uniform shader variable
    //    //this._ctx.uniformMatrix4fv(this._canvas.modelMatrix, false, new Float32Array(matrix));
    //
    //}
}