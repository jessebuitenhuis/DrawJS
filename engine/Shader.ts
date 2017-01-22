export class Shader {
    constructor(type: number, source: string, ctx: WebGLRenderingContext, program: WebGLProgram) {
        var shader = ctx.createShader(type);
        ctx.shaderSource(shader, source);
        ctx.compileShader(shader);

        if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
            throw new Error("An error occurred compiling the shaders: " + ctx.getShaderInfoLog(shader));
        }

        ctx.attachShader(program, shader);

        return shader;
    }
}