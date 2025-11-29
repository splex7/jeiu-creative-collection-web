// WebGL Shader Background
const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl");

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
}

addEventListener("resize", resize);
resize();

const vsSource = `attribute vec4 a_position; void main(){gl_Position=a_position;}`;
const fsSource = `
    precision mediump float;
    uniform vec2 u_resolution;
    uniform float u_time;

    void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;

        // 더 굵고 거친 느낌을 위해 주파수 낮춤
        float t = u_time * 0.3;
        vec2 pos = st * 1.5;  // 3.0 -> 1.5로 줄여서 더 큰 패턴

        // 더 거친 움직임과 대비 강화
        float r = sin(pos.x * 0.8 + t) * cos(pos.y * 0.6 + t * 0.3);
        float g = sin(pos.y * 0.7 - t * 0.8) * cos(pos.x * 0.9 + t);
        float b = sin((pos.x + pos.y) * 0.5 + t * 1.2);

        // 색상 대비 강화 - 더 극적인 변화
        vec3 color = vec3(
            0.3 + 0.7 * abs(r),  // abs()로 더 극적인 변화
            0.1 + 0.4 * abs(g),
            0.1 + 0.6 * abs(b)
        );

        // 더 어두운 배경과 강한 오렌지 틴트
        vec3 finalColor = mix(vec3(0.02, 0.02, 0.02), color, 0.4);
        finalColor = mix(finalColor, vec3(1.0, 0.3, 0.0), 0.15 * sin(u_time * 0.7));

        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

function shader(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
}

const vs = shader(gl, gl.VERTEX_SHADER, vsSource);
const fs = shader(gl, gl.FRAGMENT_SHADER, fsSource);
const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);
gl.useProgram(program);

const pos = gl.getAttribLocation(program, "a_position");
const res = gl.getUniformLocation(program, "u_resolution");
const time = gl.getUniformLocation(program, "u_time");

const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
);

gl.enableVertexAttribArray(pos);
gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

function loop(t) {
    gl.uniform2f(res, canvas.width, canvas.height);
    gl.uniform1f(time, t * 0.001);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
