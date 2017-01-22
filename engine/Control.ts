export class Control {
    private _keyPressed : any = {};
    private _actions : any = {};

    constructor() {
        this._registerListeners();
    }

    private _registerListeners() {
        var self = this;
        onkeydown = function(event) {
            self._keyPressed[event.keyCode] = true;
        };

        onkeyup = function(event) {
            self._keyPressed[event.keyCode] = false;
        };
    }

    public excute() {
        for (var key in this._keyPressed) {
            if (!this._keyPressed[key] || !this._actions[key]) continue;

            this._actions[key].forEach(function(fn){
                fn();
            });
        }
    }

    /**
     * Registers an event
     * @param keyCode
     * @returns fn - deregister function
     */
    public on(keyCode: number, callback: any) {
        if (!this._actions[keyCode]) this._actions[keyCode] = [];
        this._actions[keyCode].push(callback);

        var self = this;

        function deregister() {
            if (!self._actions[keyCode]) return false;
            var index = self._actions[keyCode].indexOf(callback);

            self._actions[keyCode].splice(index, 1);
        }
        return deregister;
    }

    /**
     * Deregisters all events for a keycode
     */
    public off(keyCode: number) {
        if (this._actions[keyCode]) delete this._actions[keyCode];
    }
}