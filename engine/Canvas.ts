import { Plane } from 'meshes/Plane';
import { Mesh } from './Mesh';
import { Cube } from './meshes/Cube';
import { Shader } from './Shader';
import { shader as fragmentShaderSource } from './shaders/fragment-shader';
import { shader as vertexShaderSource } from './shaders/vertex-shader';
import { m4 } from './m4';
import { degToRad } from './helper';
import { log } from './log';
import { f } from '../models/f';

export class Canvas {
    private _parentElement: HTMLElement;
    private _canvas: HTMLCanvasElement;
    private _ctx: WebGLRenderingContext;
    private _backgroundColor: number[];

    // Shader
    private _shaderProgram: WebGLProgram;
    private _matrixLocation : WebGLUniformLocation;
    private _positionLocation : number;
    private _colorLocation : number;
    private _positionBuffer : WebGLBuffer;
    private _colorBuffer : WebGLBuffer;

    // Frustum
    private _cameraAngleRadians : number = degToRad(0);
    private _fieldOfViewRadians : number = degToRad(60);
    private _radius : number = 200;
    private _projectionMatrix : number[];
    private _cameraMatrix : number[];
    private _viewProjectionMatrix : number[];

    // Object
    private _fPos : number[];
    private _qty : number = 5;
    
    constructor(private _options?: {backgroundColor?: number[]}) {
        this._parentElement = document.getElementsByTagName('body')[0];
        this._backgroundColor = _options && _options.backgroundColor || [0.1,0.2,0.2,1];

        this._createCanvas();
        this._setupContext();
        this._createShaderProgram();
        this._getShaderLocations();
        this._createBuffers();
        this._setGeometry();
        this._setColors();
        this._setupPositionAttribute();
        this._setupColorAttribute();
    }

    private _createCanvas() : void {
        this._canvas = document.createElement("canvas");
        this._canvas.width = this._parentElement.offsetWidth;
        this._canvas.height = this._parentElement.offsetHeight;
        this._parentElement.appendChild(this._canvas);
    }

    private _setupContext() : void {
        this._ctx = <WebGLRenderingContext> this._canvas.getContext("webgl");
        if (!this._ctx) throw new Error("Unable to initialize WebGL. Your browser may not support it.");

        this._ctx.viewport(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.clear(this._ctx.COLOR_BUFFER_BIT | this._ctx.DEPTH_BUFFER_BIT);
        this._ctx.enable(this._ctx.CULL_FACE);
        this._ctx.enable(this._ctx.DEPTH_TEST);
    }

    private _createShaderProgram() : void {
        this._shaderProgram = this._ctx.createProgram();

        var vertexShader = new Shader(this._ctx.VERTEX_SHADER, vertexShaderSource, this._ctx, this._shaderProgram);
        var fragmentShader = new Shader(this._ctx.FRAGMENT_SHADER, fragmentShaderSource, this._ctx, this._shaderProgram);

        this._ctx.linkProgram(this._shaderProgram);

        if (!this._ctx.getProgramParameter(this._shaderProgram, this._ctx.LINK_STATUS)) {
            throw new Error("Unable to initialize the shader program: "
                + this._ctx.getProgramInfoLog(this._shaderProgram));
        }

        this._ctx.useProgram(this._shaderProgram);

    }

    private _getShaderLocations() : void {
        this._positionLocation = this._ctx.getAttribLocation(this._shaderProgram, "a_position");
        if (this._positionLocation < 0) throw new Error("Position attribute not found on shader");

        this._colorLocation = this._ctx.getAttribLocation(this._shaderProgram, "a_color");
        if (this._colorLocation < 0) throw new Error("Color attribute not found on shader");

        this._matrixLocation = this._ctx.getUniformLocation(this._shaderProgram, "u_matrix");
        if (this._matrixLocation < 0) throw new Error("Matrix uniform not found on shader");

    }

    private _createBuffers() : void {
        this._positionBuffer = this._ctx.createBuffer();
        this._colorBuffer = this._ctx.createBuffer();
    }

    private _setGeometry() : void {
        this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._positionBuffer);
        this._ctx.bufferData(this._ctx.ARRAY_BUFFER, f.positions, this._ctx.STATIC_DRAW);
    }

    private _setColors() : void {
        this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._colorBuffer);
        this._ctx.bufferData(this._ctx.ARRAY_BUFFER, f.colors, this._ctx.STATIC_DRAW);
    }

    private _clear() : void {
        this._ctx.clearColor(
            this._backgroundColor[0],
            this._backgroundColor[1],
            this._backgroundColor[2],
            this._backgroundColor[3]);
        this._ctx.clear(this._ctx.COLOR_BUFFER_BIT | this._ctx.DEPTH_BUFFER_BIT);
    }

    public draw() : void {
        this._computeProjectionMatrix();
        this._setPositionF();
        this._computeCameraMatrix();
        this._computeViewProjectionMatrix();
        this._clear();
        this._drawF();
    }
    private _setupPositionAttribute() : void {
        this._ctx.enableVertexAttribArray(this._positionLocation);
        this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._positionBuffer);

        var size = 3,
            type = this._ctx.FLOAT,
            normalize = false,
            stride = 0,
            offset = 0;

        this._ctx.vertexAttribPointer(this._positionLocation, size, type, normalize, stride, offset);
    }

    private _setupColorAttribute() : void {
        this._ctx.enableVertexAttribArray(this._colorLocation);
        this._ctx.bindBuffer(this._ctx.ARRAY_BUFFER, this._colorBuffer);

        var size = 3,
            type = this._ctx.UNSIGNED_BYTE,
            normalize = true,
            stride = 0,
            offset = 0;

        this._ctx.vertexAttribPointer(this._colorLocation, size, type, normalize, stride, offset);
    }

    private _computeProjectionMatrix() : void {
        var aspect = this._canvas.clientWidth / this._canvas.clientHeight;
        var zNear = 1;
        var zFar = 2000;
        this._projectionMatrix = m4.perspective(this._fieldOfViewRadians, aspect, zNear, zFar);
    }

    private _setPositionF() : void {
        this._fPos = [this._radius, 0, 0];
    }

    private _computeCameraMatrix() : void {
        var matrix = m4.yRotation(this._cameraAngleRadians);
        matrix = m4.translate(matrix, 0, 0, this._radius * 1.5);

        var cameraPosition = [
            matrix[12],
            matrix[13],
            matrix[14]
        ];

        var up = [0, 1, 0];

        this._cameraMatrix = m4.lookAt(cameraPosition, this._fPos, up);
    }

    private _computeViewProjectionMatrix() : void {
        var viewMatrix = m4.inverse(this._cameraMatrix);
        this._viewProjectionMatrix = m4.multiply(this._projectionMatrix, viewMatrix);
    }

    private _drawF() : void {
        for (var i = 0; i < this._qty; i++) {
            log("Drawing f nr. " + i);

            var angle = i * Math.PI * 2 / this._qty;
            var x = Math.cos(angle) * this._radius;
            var y = Math.sin(angle) * this._radius;

            var matrix = m4.translate(this._viewProjectionMatrix, x, 0, y);
            this._ctx.uniformMatrix4fv(this._matrixLocation, false, new Float32Array(matrix));

            var primitiveType = this._ctx.TRIANGLES;
            var offset = 0;
            var count = 16 * 6;
            this._ctx.drawArrays(primitiveType, offset, count);
        }
    }
}

