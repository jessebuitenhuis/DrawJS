import { Mesh } from "./Mesh";
import { Canvas } from "./Canvas";
import { Camera } from './Camera';
import { Control } from './Control';
import { KEYS } from './constants';
import {Model} from "./Model";

export class Engine {
    private _gameObjects: Mesh[] = [];
    private _running: boolean = false;
    private _canvas : Canvas;
    private _control: Control;

    constructor(){
        this._canvas = new Canvas();
        this._control = new Control();

        var self = this;

        var deregister = this._control.on(KEYS.UP, function(){
            console.log('pressed keyup!');

            self._control.on(KEYS.DOWN, deregister);
        });

        //this._camera = new Camera(this._canvas, this._control);
    }

    public register(mesh: Mesh) : void {
        this._gameObjects.push(mesh);
    }

    public deregister(mesh: Mesh) : void {
        var index = this._gameObjects.indexOf(mesh);
        if (index !== -1) this._gameObjects.splice(index,1);
    }

    public start() : void {
        this._running = true;
        this._run();
    }

    public stop() : void {
        this._running = false;
    }

    private _run() : void {
        if (this._running) {
            this._control.excute();
            this._draw();

            requestAnimationFrame(this._run.bind(this));
        }
    }

    private _draw() : void {
        this._gameObjects.forEach(function(gameObject){
            gameObject.draw();
        });
    }

    public createObject(model: Model, translation?: {x: number, y: number, z: number}) {
        var object = new Mesh(this._canvas, model, translation);
        this.register(object);
    }
}