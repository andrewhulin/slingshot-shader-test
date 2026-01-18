// Fragment Shader Editor
// WebGL-based shader editor with live preview

class ShaderEditor {
    constructor() {
        this.canvas = document.getElementById('glCanvas');
        this.gl = null;
        this.program = null;
        this.editor = null;
        this.isPlaying = true;
        this.startTime = Date.now();
        this.currentTime = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.frameCount = 0;
        this.lastFPSUpdate = Date.now();
        this.fps = 0;
        this.resolutionScale = 1.0;

        this.init();
    }

    init() {
        this.setupWebGL();
        this.setupCodeEditor();
        this.setupEventListeners();
        this.loadDefaultShader();
        this.render();
    }

    setupWebGL() {
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');

        if (!this.gl) {
            this.showError('WebGL is not supported in your browser!');
            return;
        }

        // Set initial canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        const width = Math.floor(container.clientWidth * this.resolutionScale);
        const height = Math.floor(container.clientHeight * this.resolutionScale);

        this.canvas.width = width;
        this.canvas.height = height;

        if (this.gl) {
            this.gl.viewport(0, 0, width, height);
        }
    }

    setupCodeEditor() {
        const textarea = document.getElementById('shaderCode');
        this.editor = CodeMirror.fromTextArea(textarea, {
            mode: 'text/x-c',
            theme: 'monokai',
            lineNumbers: true,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: false,
            lineWrapping: false,
            autofocus: true
        });

        this.editor.on('change', () => {
            this.compileShader();
        });
    }

    setupEventListeners() {
        // Play/Pause button
        document.getElementById('playBtn').addEventListener('click', () => {
            this.isPlaying = !this.isPlaying;
            const btn = document.getElementById('playBtn');
            const icon = document.getElementById('playIcon');
            if (this.isPlaying) {
                btn.innerHTML = '<span id="playIcon">⏸</span> Pause';
                this.startTime = Date.now() - this.currentTime * 1000;
            } else {
                btn.innerHTML = '<span id="playIcon">▶</span> Play';
            }
        });

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.currentTime = 0;
            this.startTime = Date.now();
        });

        // Export button
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportShader();
        });

        // Example selector
        document.getElementById('exampleSelect').addEventListener('change', (e) => {
            if (e.target.value) {
                this.loadExample(e.target.value);
                e.target.value = '';
            }
        });

        // Resolution slider
        const resSlider = document.getElementById('resolutionSlider');
        resSlider.addEventListener('input', (e) => {
            this.resolutionScale = parseFloat(e.target.value);
            document.getElementById('resolutionValue').textContent = this.resolutionScale.toFixed(2) + 'x';
            this.resizeCanvas();
        });

        // Mouse tracking
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = rect.height - (e.clientY - rect.top);
        });
    }

    loadDefaultShader() {
        const defaultShader = `precision mediump float;

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

void main() {
    // Normalize coordinates to -1 to 1
    vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution) / iResolution.y;

    // Create animated plasma effect
    float t = iTime * 0.5;

    float a = sin(uv.x * 3.0 + t);
    float b = sin(uv.y * 4.0 + t * 1.3);
    float c = sin((uv.x + uv.y) * 2.0 + t * 0.8);
    float d = sin(length(uv) * 5.0 - t * 2.0);

    float plasma = (a + b + c + d) / 4.0;

    // Create rainbow colors
    vec3 col = 0.5 + 0.5 * cos(t + uv.xyx + vec3(0, 2, 4));
    col += plasma * 0.3;

    // Add glow effect
    float glow = 0.02 / length(uv);
    col += vec3(glow * 0.5, glow * 0.3, glow);

    gl_FragColor = vec4(col, 1.0);
}`;

        this.editor.setValue(defaultShader);
        this.compileShader();
    }

    loadExample(name) {
        const examples = {
            plasma: `precision mediump float;

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution) / iResolution.y;

    float t = iTime * 0.5;
    float a = sin(uv.x * 3.0 + t);
    float b = sin(uv.y * 4.0 + t * 1.3);
    float c = sin((uv.x + uv.y) * 2.0 + t * 0.8);
    float d = sin(length(uv) * 5.0 - t * 2.0);

    float plasma = (a + b + c + d) / 4.0;
    vec3 col = 0.5 + 0.5 * cos(t + uv.xyx + vec3(0, 2, 4));
    col += plasma * 0.3;

    gl_FragColor = vec4(col, 1.0);
}`,

            rainbow: `precision mediump float;

uniform float iTime;
uniform vec2 iResolution;

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;

    vec3 col = 0.5 + 0.5 * cos(iTime + uv.xyx * 3.14159 + vec3(0, 2, 4));

    gl_FragColor = vec4(col, 1.0);
}`,

            mandelbrot: `precision mediump float;

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

void main() {
    vec2 uv = (gl_FragCoord.xy - iResolution.xy * 0.5) / iResolution.y;

    float zoom = 0.5 + sin(iTime * 0.3) * 0.3;
    vec2 c = uv * 3.0 * zoom - vec2(0.5, 0.0);
    vec2 z = vec2(0.0);

    float iter = 0.0;
    const float maxIter = 100.0;

    for (float i = 0.0; i < maxIter; i++) {
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        if (length(z) > 2.0) break;
        iter++;
    }

    float t = iter / maxIter;
    vec3 col = 0.5 + 0.5 * cos(3.0 + t * 6.28 + vec3(0.0, 0.6, 1.0));

    gl_FragColor = vec4(col, 1.0);
}`,

            tunnel: `precision mediump float;

uniform float iTime;
uniform vec2 iResolution;

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution) / iResolution.y;

    float r = length(uv);
    float a = atan(uv.y, uv.x);

    float tunnel = 0.5 / r + iTime;
    float spiral = a / 3.14159 * 5.0;

    vec2 tuv = vec2(tunnel, spiral);
    vec3 col = 0.5 + 0.5 * cos(tuv.xyx + vec3(0, 2, 4));

    col *= smoothstep(2.0, 0.5, r);

    gl_FragColor = vec4(col, 1.0);
}`,

            wave: `precision mediump float;

uniform float iTime;
uniform vec2 iResolution;

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution) / iResolution.y;

    float d = length(uv);
    float wave = sin(d * 10.0 - iTime * 3.0) * 0.5 + 0.5;
    wave *= exp(-d * 2.0);

    vec3 col = vec3(wave);
    col += 0.5 + 0.5 * cos(iTime + uv.xyx + vec3(0, 2, 4));

    gl_FragColor = vec4(col * wave, 1.0);
}`,

            fire: `precision mediump float;

uniform float iTime;
uniform vec2 iResolution;

float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    uv.x += sin(uv.y * 5.0 + iTime * 2.0) * 0.1;

    float n = 0.0;
    float amp = 0.5;
    for (float i = 0.0; i < 5.0; i++) {
        n += noise(uv * pow(2.0, i) + iTime * 0.5) * amp;
        amp *= 0.5;
    }

    float fire = pow(1.0 - uv.y, 2.0) * n;

    vec3 col = vec3(fire * 2.0, fire * fire * 4.0, fire * fire * fire * 8.0);
    col = clamp(col, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
}`
        };

        if (examples[name]) {
            this.editor.setValue(examples[name]);
        }
    }

    compileShader() {
        const fragmentShaderSource = this.editor.getValue();

        // Vertex shader (simple pass-through)
        const vertexShaderSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        try {
            // Create shaders
            const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
            const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

            // Create program
            const program = this.gl.createProgram();
            this.gl.attachShader(program, vertexShader);
            this.gl.attachShader(program, fragmentShader);
            this.gl.linkProgram(program);

            if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
                const info = this.gl.getProgramInfoLog(program);
                throw new Error('Program link error: ' + info);
            }

            // Clean up old program
            if (this.program) {
                this.gl.deleteProgram(this.program);
            }

            this.program = program;

            // Setup geometry
            this.setupGeometry();

            // Clear error
            this.hideError();

        } catch (error) {
            this.showError(error.message);
        }
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            const info = this.gl.getShaderInfoLog(shader);
            this.gl.deleteShader(shader);
            throw new Error('Shader compilation error:\n' + info);
        }

        return shader;
    }

    setupGeometry() {
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
             1,  1,
        ]);

        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

        const positionLocation = this.gl.getAttribLocation(this.program, 'position');
        this.gl.enableVertexAttribArray(positionLocation);
        this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, 0, 0);
    }

    render() {
        if (!this.gl || !this.program) {
            requestAnimationFrame(() => this.render());
            return;
        }

        // Update time
        if (this.isPlaying) {
            this.currentTime = (Date.now() - this.startTime) / 1000;
        }

        // Update FPS
        this.frameCount++;
        const now = Date.now();
        if (now - this.lastFPSUpdate >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastFPSUpdate = now;
            document.getElementById('fpsCounter').textContent = `FPS: ${this.fps}`;
        }

        document.getElementById('timeCounter').textContent = `Time: ${this.currentTime.toFixed(2)}s`;

        // Clear canvas
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        // Use program
        this.gl.useProgram(this.program);

        // Set uniforms
        const timeLocation = this.gl.getUniformLocation(this.program, 'iTime');
        const resolutionLocation = this.gl.getUniformLocation(this.program, 'iResolution');
        const mouseLocation = this.gl.getUniformLocation(this.program, 'iMouse');

        if (timeLocation) {
            this.gl.uniform1f(timeLocation, this.currentTime);
        }
        if (resolutionLocation) {
            this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);
        }
        if (mouseLocation) {
            this.gl.uniform2f(mouseLocation, this.mouseX, this.mouseY);
        }

        // Draw
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

        requestAnimationFrame(() => this.render());
    }

    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.textContent = message;
        errorDiv.classList.add('visible');
    }

    hideError() {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.classList.remove('visible');
    }

    exportShader() {
        const shaderCode = this.editor.getValue();
        const blob = new Blob([shaderCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `shader_${Date.now()}.frag`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize the editor when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ShaderEditor();
});
