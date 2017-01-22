import { Mesh } from "./Mesh";
import { Canvas } from "./Canvas";
import { Camera } from './Camera';
import { Control } from './Control';
import { KEYS } from './constants';

export class Engine {
    //private _gameObjects: Mesh[] = [];
    //private _fps: number = 30;
    //private _running: boolean = false;
    //private _camera: Camera;
    //private _control: Control;
    //
    //constructor(private _canvas: Canvas){
    //    this._control = new Control();
    //    this._camera = new Camera(this._canvas, this._control);
    //}
    //
    //public register(mesh: Mesh) : void {
    //    this._gameObjects.push(mesh);
    //}
    //
    //public deregister(mesh: Mesh) : void {
    //    var index = this._gameObjects.indexOf(mesh);
    //    if (index !== -1) this._gameObjects.splice(index,1);
    //}
    //
    //public start() : void {
    //    this._running = true;
    //    this._run();
    //}
    //
    //public stop() : void {
    //    this._running = false;
    //}
    //
    //private _run() : void {
    //    if (this._running) {
    //        this._draw();
    //
    //        requestAnimationFrame(this._run.bind(this));
    //    }
    //}
    //
    //private _draw() : void {
    //    //var self = this;
    //    //this._canvas.clear();
    //    //
    //    //this._gameObjects.forEach(function(gameObject){
    //    //    self._canvas.draw(gameObject);
    //    //})
    //}
}