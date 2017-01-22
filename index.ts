import { Engine } from 'engine/Engine';
import { model as fModel } from './models/f';
import { Mesh } from './engine/Mesh';

var engine = new Engine();


for (var i = 0; i < 5; i++) {
    var angle = i * Math.PI * 2 / 5;
    var x = Math.cos(angle) * 200;
    var y = Math.sin(angle) * 200;

    engine.createObject(fModel, {x: x, y: 0, z: y});
}

engine.start();





//canvas.draw();
//var ctx = canvas.ctx;
//var shader = canvas.shaderProgram;

//var engine = new Engine(canvas);

//var cube = new Cube(canvas, {
//    dimensions: {w: 0.5, h: 0.5, d: 0.5},
//    position: {x: -0.5, y: 0, z: -5},
//    origin: {x: 0.5, y: 0.5, z: 0.5}
//});
//engine.register(cube);
//
//var cube2 = new Cube(canvas, {
//    dimensions: {w: 0.5, h: 0.5, d    : 0.5},
//    position: {x: 0.5, y: 0, z: -5},
//    origin: {x: 0.5, y: 0.5, z: 0.5}
//});
//engine.register(cube2);
//
//for (var x = 0; x < 3; x++) {
//    for (var y = 0; y < 3; y++) {
//        for (var z = 0; z < 3; z++) {
//            var cube = new Cube(canvas, {
//                dimensions: {w: 1, h: 1, d: 1},
//                position: {x: -10 + x*10, y: -10 + y*10, z: -z * 30},
//                //origin: {x: 0.5, y: 0.5, z: 0.5}
//            });
//            engine.register(cube);
//        }
//    }
//}




//var cube4 = new Cube(ctx, shader, {
//    dimensions: {w: 0.1, h: 0.1, d: 0.1},
//    position: {x: 0, y: 0, z: 0},
//    origin: {x: 0.5, y: 0.5, z: 0.5}
//});
//engine.register(cube4);
//
//var cube5 = new Cube(ctx, shader, {
//    dimensions: {w: 0.1, h: 0.1, d: 0.1},
//    position: {x: 0.5, y: 0, z: 0},
//    origin: {x: 0.5, y: 0.5, z: 0.5}
//});
//engine.register(cube5);


//engine.start();