import { m4 } from './m4';
import {Control} from "./Control";
import { KEYS } from './constants';
import { Canvas } from './Canvas';

export class Camera {
    //// ShaderProgram
    //private _viewMatrix : WebGLUniformLocation;
    //
    //private _ctx: WebGLRenderingContext;
    //private _program: WebGLProgram;
    //private _height : number = 0;
    //private _rotation : number = 0;
    //private _zoom : number = 1;
    //
    //constructor(private _canvas: Canvas,
    //            private _control: Control) {
    //
    //    this._ctx = _canvas.ctx;
    //    this._program = _canvas.shaderProgram;
    //    this._viewMatrix = this._ctx.getUniformLocation(this._program, "view");
    //    this._setupControls();
    //    this.move();
    //}
    //
    //public move() {
    //    var matrix = m4.identity();
    //
    //
    //
    //
    //    //matrix = m4.multiply(matrix, perspective);
    //    matrix = m4.translate(matrix, 0, this._height);
    //    matrix = m4.yRotate(matrix, this._rotation);
    //
    //    matrix = m4.scaleUniform(matrix, this._zoom);
    //
    //     //transform
    //    //if (params) matrix = m4.transform(matrix, params.position, this._zoom, params.rotation);
    //
    //     //set uniform shader variable
    //    this._ctx.uniformMatrix4fv(this._viewMatrix, false, new Float32Array(matrix));
    //}
    //
    //public zoomIn() {
    //    this._zoom = this._zoom * 1.1;
    //    this.move();
    //}
    //
    //public zoomOut() {
    //    this._zoom = this._zoom / 1.1;
    //    this.move();
    //}
    //
    //public ascend() {
    //    this._height -= 1;
    //    this.move();
    //}
    //
    //public descend() {
    //    this._height += 1;
    //    this.move();
    //}
    //
    //public rotateClockWise() {
    //    this._rotation += 10;
    //    this.move();
    //}
    //
    //public rotateCounterClockWise() {
    //    this._rotation -= 10;
    //    this.move();
    //}
    //
    //private _setupControls() {
    //    this._control.on(KEYS.Z, this.zoomIn.bind(this));
    //    this._control.on(KEYS.X, this.zoomOut.bind(this));
    //
    //    this._control.on(KEYS.W, this.ascend.bind(this));
    //    this._control.on(KEYS.S, this.descend.bind(this));
    //
    //    this._control.on(KEYS.A, this.rotateCounterClockWise.bind(this));
    //    this._control.on(KEYS.D, this.rotateClockWise.bind(this));
    //}
}