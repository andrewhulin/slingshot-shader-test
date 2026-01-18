// Shader Studio - No-Code Shader Creator
// Generates beautiful shaders based on UI parameters

class ShaderStudio {
    constructor() {
        this.canvas = document.getElementById('glCanvas');
        this.gl = null;
        this.program = null;
        this.isPlaying = true;
        this.startTime = Date.now();
        this.currentTime = 0;
        this.frameCount = 0;
        this.lastFPSUpdate = Date.now();
        this.fps = 0;

        // Shader parameters
        this.params = {
            effectType: 'plasma',
            speed: 1.0,
            complexity: 1.0,
            scale: 1.0,
            color1: '#ff006e',
            color2: '#8338ec',
            color3: '#3a86ff',
            colorIntensity: 1.0,
            colorShift: 0.0,
            distortion: 0.5,
            symmetry: 1,
            glow: 0.2,
            brightness: 1.0
        };

        this.init();
    }

    init() {
        this.setupWebGL();
        this.setupUI();
        this.generateAndCompileShader();
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.render();
    }

    setupWebGL() {
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');

        if (!this.gl) {
            alert('WebGL is not supported in your browser!');
            return;
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        if (this.gl) {
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    setupUI() {
        // Panel toggle
        document.getElementById('togglePanel').addEventListener('click', () => {
            const panel = document.getElementById('controlPanel');
            const btn = document.getElementById('togglePanel');
            panel.classList.toggle('collapsed');
            btn.textContent = panel.classList.contains('collapsed') ? '+' : '−';
        });

        // Effect type
        this.setupControl('effectType', (value) => {
            this.params.effectType = value;
            this.generateAndCompileShader();
        });

        // Sliders
        this.setupSlider('speed', 'speedValue', (value) => this.params.speed = value);
        this.setupSlider('complexity', 'complexityValue', (value) => this.params.complexity = value);
        this.setupSlider('scale', 'scaleValue', (value) => this.params.scale = value);
        this.setupSlider('colorIntensity', 'colorIntensityValue', (value) => this.params.colorIntensity = value);
        this.setupSlider('colorShift', 'colorShiftValue', (value) => this.params.colorShift = value);
        this.setupSlider('distortion', 'distortionValue', (value) => this.params.distortion = value);
        this.setupSlider('symmetry', 'symmetryValue', (value) => this.params.symmetry = parseInt(value));
        this.setupSlider('glow', 'glowValue', (value) => this.params.glow = value);
        this.setupSlider('brightness', 'brightnessValue', (value) => this.params.brightness = value);

        // Color pickers
        this.setupColorPicker('color1');
        this.setupColorPicker('color2');
        this.setupColorPicker('color3');

        // Buttons
        document.getElementById('playBtn').addEventListener('click', () => this.togglePlay());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('randomizeBtn').addEventListener('click', () => this.randomize());
        document.getElementById('exportBtn').addEventListener('click', () => this.export());
    }

    setupControl(id, callback) {
        const element = document.getElementById(id);
        element.addEventListener('change', (e) => callback(e.target.value));
    }

    setupSlider(id, valueId, callback) {
        const slider = document.getElementById(id);
        const valueDisplay = document.getElementById(valueId);

        slider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            callback(value);
            valueDisplay.textContent = value.toFixed(value >= 10 ? 0 : 1);
        });
    }

    setupColorPicker(id) {
        const picker = document.getElementById(id);
        picker.addEventListener('input', (e) => {
            this.params[id] = e.target.value;
        });
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        const btn = document.getElementById('playBtn');
        const icon = document.getElementById('playIcon');
        const text = document.getElementById('playText');

        if (this.isPlaying) {
            icon.textContent = '⏸';
            text.textContent = 'Pause';
            this.startTime = Date.now() - this.currentTime * 1000;
        } else {
            icon.textContent = '▶';
            text.textContent = 'Play';
        }
    }

    reset() {
        this.currentTime = 0;
        this.startTime = Date.now();
    }

    randomize() {
        // Randomize effect type
        const effects = ['plasma', 'waves', 'tunnel', 'spiral', 'kaleidoscope', 'fractal', 'aurora', 'nebula'];
        this.params.effectType = effects[Math.floor(Math.random() * effects.length)];
        document.getElementById('effectType').value = this.params.effectType;

        // Randomize parameters
        this.params.speed = Math.random() * 3;
        this.params.complexity = 0.1 + Math.random() * 2.9;
        this.params.scale = 0.1 + Math.random() * 4.9;
        this.params.colorIntensity = Math.random() * 2;
        this.params.colorShift = (Math.random() - 0.5) * 6.28;
        this.params.distortion = Math.random() * 2;
        this.params.symmetry = Math.floor(1 + Math.random() * 12);
        this.params.glow = Math.random();
        this.params.brightness = 0.5 + Math.random() * 1.5;

        // Random colors
        this.params.color1 = this.randomColor();
        this.params.color2 = this.randomColor();
        this.params.color3 = this.randomColor();

        // Update UI
        this.updateUI();
        this.generateAndCompileShader();
    }

    randomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    updateUI() {
        document.getElementById('speed').value = this.params.speed;
        document.getElementById('speedValue').textContent = this.params.speed.toFixed(1);

        document.getElementById('complexity').value = this.params.complexity;
        document.getElementById('complexityValue').textContent = this.params.complexity.toFixed(1);

        document.getElementById('scale').value = this.params.scale;
        document.getElementById('scaleValue').textContent = this.params.scale.toFixed(1);

        document.getElementById('colorIntensity').value = this.params.colorIntensity;
        document.getElementById('colorIntensityValue').textContent = this.params.colorIntensity.toFixed(1);

        document.getElementById('colorShift').value = this.params.colorShift;
        document.getElementById('colorShiftValue').textContent = this.params.colorShift.toFixed(1);

        document.getElementById('distortion').value = this.params.distortion;
        document.getElementById('distortionValue').textContent = this.params.distortion.toFixed(1);

        document.getElementById('symmetry').value = this.params.symmetry;
        document.getElementById('symmetryValue').textContent = this.params.symmetry;

        document.getElementById('glow').value = this.params.glow;
        document.getElementById('glowValue').textContent = this.params.glow.toFixed(2);

        document.getElementById('brightness').value = this.params.brightness;
        document.getElementById('brightnessValue').textContent = this.params.brightness.toFixed(1);

        document.getElementById('color1').value = this.params.color1;
        document.getElementById('color2').value = this.params.color2;
        document.getElementById('color3').value = this.params.color3;
    }

    hexToRGB(hex) {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        return [r, g, b];
    }

    generateShaderCode() {
        const p = this.params;
        const rgb1 = this.hexToRGB(p.color1);
        const rgb2 = this.hexToRGB(p.color2);
        const rgb3 = this.hexToRGB(p.color3);

        let shaderEffectCode = '';

        switch (p.effectType) {
            case 'plasma':
                shaderEffectCode = `
    float a = sin(uv.x * complexity * 3.0 + t);
    float b = sin(uv.y * complexity * 4.0 + t * 1.3);
    float c = sin((uv.x + uv.y) * complexity * 2.0 + t * 0.8);
    float d = sin(length(uv * scale) * complexity * 5.0 - t * 2.0);

    float pattern = (a + b + c + d) / 4.0;
    vec3 col = mix(mix(color1, color2, pattern * 0.5 + 0.5), color3, sin(pattern * 3.14159 + t) * 0.5 + 0.5);
                `;
                break;

            case 'waves':
                shaderEffectCode = `
    float dist = length(uv * scale);
    float wave = sin(dist * complexity * 10.0 - t * speed * 3.0);
    wave *= exp(-dist * distortion);

    float pattern = wave * 0.5 + 0.5;
    vec3 col = mix(color1, mix(color2, color3, pattern), pattern);
    col += vec3(wave) * glow * 2.0;
                `;
                break;

            case 'tunnel':
                shaderEffectCode = `
    float r = length(uv * scale);
    float a = atan(uv.y, uv.x);

    float tunnel = complexity / max(r, 0.1) + t * speed;
    float spiral = a / 3.14159 * complexity * 5.0;

    float pattern = sin(tunnel * 2.0) * sin(spiral * 2.0);
    vec3 col = mix(color1, mix(color2, color3, pattern * 0.5 + 0.5), pattern * 0.5 + 0.5);
    col *= smoothstep(2.0, 0.5, r);
                `;
                break;

            case 'spiral':
                shaderEffectCode = `
    float angle = atan(uv.y, uv.x);
    float radius = length(uv * scale);

    float spiral = sin(radius * complexity * 10.0 - angle * float(symmetry) + t * speed * 2.0);
    spiral += sin(radius * complexity * 15.0 + t * speed);

    float pattern = spiral * 0.5 + 0.5;
    vec3 col = mix(mix(color1, color2, pattern), color3, sin(angle * float(symmetry)) * 0.5 + 0.5);
                `;
                break;

            case 'kaleidoscope':
                shaderEffectCode = `
    float angle = atan(uv.y, uv.x);
    float radius = length(uv * scale);

    angle = mod(angle, 6.28318 / float(symmetry)) * float(symmetry);
    vec2 kaleido = vec2(cos(angle), sin(angle)) * radius;

    float pattern = sin(kaleido.x * complexity * 5.0 + t * speed) *
                    cos(kaleido.y * complexity * 5.0 - t * speed * 0.7);

    vec3 col = mix(color1, color2, pattern * 0.5 + 0.5);
    col = mix(col, color3, sin(radius * complexity * 3.0 + t) * 0.5 + 0.5);
                `;
                break;

            case 'fractal':
                shaderEffectCode = `
    vec2 z = uv * scale * 2.0;
    float pattern = 0.0;

    for (int i = 0; i < 5; i++) {
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y);
        z += uv * complexity + vec2(sin(t * speed * 0.3), cos(t * speed * 0.2));
        pattern += exp(-length(z));
    }

    pattern *= 0.2;
    vec3 col = mix(color1, mix(color2, color3, pattern), pattern);
                `;
                break;

            case 'aurora':
                shaderEffectCode = `
    float wave1 = sin(uv.x * complexity * 2.0 + t * speed + sin(uv.y * 3.0));
    float wave2 = sin(uv.x * complexity * 3.0 - t * speed * 0.7 + cos(uv.y * 2.0));
    float wave3 = sin((uv.x + uv.y) * complexity * 1.5 + t * speed * 0.5);

    float pattern = (wave1 + wave2 + wave3) / 3.0;
    pattern *= smoothstep(-1.0, 1.0, uv.y + distortion * sin(uv.x * 2.0 + t * speed));

    vec3 col = mix(color1, color2, pattern * 0.5 + 0.5);
    col = mix(col, color3, wave3 * 0.5 + 0.5);
    col += vec3(glow) * exp(-abs(uv.y) * 2.0);
                `;
                break;

            case 'nebula':
                shaderEffectCode = `
    vec2 p = uv * scale;
    float noise = 0.0;
    float amp = 1.0;

    for (int i = 0; i < 5; i++) {
        noise += sin(p.x * complexity + t * speed * 0.5) *
                 cos(p.y * complexity - t * speed * 0.3) * amp;
        p = p * 2.0 + vec2(sin(t * speed * 0.1), cos(t * speed * 0.15));
        amp *= 0.5;
    }

    float pattern = noise * 0.5 + 0.5;
    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, sin(pattern * 6.28318 + t * speed) * 0.5 + 0.5);

    float stars = step(0.99, fract(sin(dot(floor(uv * 100.0), vec2(12.9898, 78.233))) * 43758.5453));
    col += vec3(stars) * brightness;
                `;
                break;
        }

        const fragmentShader = `
precision mediump float;

uniform float iTime;
uniform vec2 iResolution;
uniform float speed;
uniform float complexity;
uniform float scale;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform float colorIntensity;
uniform float colorShift;
uniform float distortion;
uniform int symmetry;
uniform float glow;
uniform float brightness;

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution) / iResolution.y;
    float t = iTime * speed;

    ${shaderEffectCode}

    // Apply color adjustments
    col *= colorIntensity;
    col = 0.5 + 0.5 * cos(colorShift + col.rgb * 3.14159);

    // Apply glow
    float dist = length(uv);
    col += vec3(glow * 0.5) / (dist + 0.1);

    // Apply brightness
    col *= brightness;

    // Clamp values
    col = clamp(col, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
}
        `;

        return fragmentShader;
    }

    generateAndCompileShader() {
        const fragmentShaderSource = this.generateShaderCode();

        const vertexShaderSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        try {
            const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSource);
            const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource);

            const program = this.gl.createProgram();
            this.gl.attachShader(program, vertexShader);
            this.gl.attachShader(program, fragmentShader);
            this.gl.linkProgram(program);

            if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
                const info = this.gl.getProgramInfoLog(program);
                throw new Error('Program link error: ' + info);
            }

            if (this.program) {
                this.gl.deleteProgram(this.program);
            }

            this.program = program;
            this.setupGeometry();

        } catch (error) {
            console.error('Shader compilation error:', error);
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

        // Clear and render
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.gl.useProgram(this.program);

        // Set uniforms
        const timeLocation = this.gl.getUniformLocation(this.program, 'iTime');
        const resolutionLocation = this.gl.getUniformLocation(this.program, 'iResolution');

        if (timeLocation) this.gl.uniform1f(timeLocation, this.currentTime);
        if (resolutionLocation) this.gl.uniform2f(resolutionLocation, this.canvas.width, this.canvas.height);

        // Set parameter uniforms
        this.setUniform('speed', this.params.speed);
        this.setUniform('complexity', this.params.complexity);
        this.setUniform('scale', this.params.scale);
        this.setUniform('colorIntensity', this.params.colorIntensity);
        this.setUniform('colorShift', this.params.colorShift);
        this.setUniform('distortion', this.params.distortion);
        this.setUniform('glow', this.params.glow);
        this.setUniform('brightness', this.params.brightness);

        this.setUniformInt('symmetry', this.params.symmetry);

        this.setUniformVec3('color1', this.hexToRGB(this.params.color1));
        this.setUniformVec3('color2', this.hexToRGB(this.params.color2));
        this.setUniformVec3('color3', this.hexToRGB(this.params.color3));

        // Draw
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

        requestAnimationFrame(() => this.render());
    }

    setUniform(name, value) {
        const location = this.gl.getUniformLocation(this.program, name);
        if (location) this.gl.uniform1f(location, value);
    }

    setUniformInt(name, value) {
        const location = this.gl.getUniformLocation(this.program, name);
        if (location) this.gl.uniform1i(location, value);
    }

    setUniformVec3(name, rgb) {
        const location = this.gl.getUniformLocation(this.program, name);
        if (location) this.gl.uniform3f(location, rgb[0], rgb[1], rgb[2]);
    }

    export() {
        const shaderCode = this.generateShaderCode();
        const blob = new Blob([shaderCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `shader_${this.params.effectType}_${Date.now()}.frag`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ShaderStudio();
});
