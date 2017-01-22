import { Plane } from 'meshes/Plane';
import { Mesh } from './Mesh';
import { Cube } from './meshes/Cube';
import { Shader } from './Shader';
import { shader as fragmentShaderSource } from './shaders/fragment-shader';
import { shader as vertexShaderSource } from './shaders/vertex-shader';
import { m4 } from './m4';
import { degToRad } from './helper';
import { log } from './log';
import { model as f } from '../models/f';

export class Canvas {
    private _parentElement: HTMLElement;
    private _canvas: HTMLCanvasElement;
    public ctx: WebGLRenderingContext;
    private _backgroundColor: number[];

    // Shader
    private _shaderProgram: WebGLProgram;
    public _matrixLocation : WebGLUniformLocation;
    public viewProjectionLocation : WebGLUniformLocation;
    public positionLocation : number;
    public colorLocation : number;

    // Frustum
    private _cameraAngleRadians : number = degToRad(0);
    private _fieldOfViewRadians : number = degToRad(60);
    private _projectionMatrix : number[];
    private _cameraMatrix : number[];
    public _viewProjectionMatrix : number[];
    private _radius: number = 200;
    private _fPos : number[];

    constructor(private _options?: {backgroundColor?: number[]}) {
        this._parentElement = document.getElementsByTagName('body')[0];
        this._backgroundColor = _options && _options.backgroundColor || [0.1,0.2,0.2,1];

        this._createCanvas();
        this._setupContext();
        this._createShaderProgram();
        this._getShaderLocations();
        this._computeProjectionMatrix();
        this._setPositionF();
        this._computeCameraMatrix();
        this._computeViewProjectionMatrix();
    }

    private _createCanvas() : void {
        this._canvas = document.createElement("canvas");
        this._canvas.width = this._parentElement.offsetWidth;
        this._canvas.height = this._parentElement.offsetHeight;
        this._parentElement.appendChild(this._canvas);
    }

    private _setupContext() : void {
        this.ctx = <WebGLRenderingContext> this._canvas.getContext("webgl");
        if (!this.ctx) throw new Error("Unable to initialize WebGL. Your browser may not support it.");

        this.ctx.viewport(0, 0, this._canvas.width, this._canvas.height);
        this.ctx.clear(this.ctx.COLOR_BUFFER_BIT | this.ctx.DEPTH_BUFFER_BIT);
        this.ctx.enable(this.ctx.CULL_FACE);
        this.ctx.enable(this.ctx.DEPTH_TEST);
    }

    private _createShaderProgram() : void {
        this._shaderProgram = this.ctx.createProgram();

        var vertexShader = new Shader(this.ctx.VERTEX_SHADER, vertexShaderSource, this.ctx, this._shaderProgram);
        var fragmentShader = new Shader(this.ctx.FRAGMENT_SHADER, fragmentShaderSource, this.ctx, this._shaderProgram);

        this.ctx.linkProgram(this._shaderProgram);

        if (!this.ctx.getProgramParameter(this._shaderProgram, this.ctx.LINK_STATUS)) {
            throw new Error("Unable to initialize the shader program: "
                + this.ctx.getProgramInfoLog(this._shaderProgram));
        }

        this.ctx.useProgram(this._shaderProgram);

    }

    private _getShaderLocations() : void {
        this.positionLocation = this.ctx.getAttribLocation(this._shaderProgram, "a_position");
        if (this.positionLocation < 0) throw new Error("Position attribute not found on shader");

        this.colorLocation = this.ctx.getAttribLocation(this._shaderProgram, "a_color");
        if (this.colorLocation < 0) throw new Error("Color attribute not found on shader");

        this._matrixLocation = this.ctx.getUniformLocation(this._shaderProgram, "u_matrix");
        if (this._matrixLocation < 0) throw new Error("Matrix uniform not found on shader");

        this.viewProjectionLocation = this.ctx.getUniformLocation(this._shaderProgram, "u_viewProjectionMatrix");
        if (this.viewProjectionLocation < 0) throw new Error("View projection matrix uniform not found on shader");

    }

    public clear() : void {
        this.ctx.clearColor(
            this._backgroundColor[0],
            this._backgroundColor[1],
            this._backgroundColor[2],
            this._backgroundColor[3]);
        this.ctx.clear(this.ctx.COLOR_BUFFER_BIT | this.ctx.DEPTH_BUFFER_BIT);
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

        this.ctx.uniformMatrix4fv(this.viewProjectionLocation, false, new Float32Array(this._viewProjectionMatrix));
    }
}

