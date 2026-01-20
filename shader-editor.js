// Shader Studio - Therapeutic Background Generator for Ash AI Therapy App

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
            effectType: 'breath',
            speed: 0.5,
            complexity: 0.8,
            scale: 1.0,
            color1: '#1a1a2e',
            color2: '#16213e',
            color3: '#0f3460',
            colorIntensity: 0.8,
            colorShift: 0.0,
            distortion: 0.3,
            symmetry: 1,
            glow: 0.15,
            brightness: 0.6
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
        this.setupSlider('distortion', 'distortionValue', (value) => this.params.distortion = value);
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
        const text = document.getElementById('playText');

        if (this.isPlaying) {
            text.textContent = 'PAUSE';
            this.startTime = Date.now() - this.currentTime * 1000;
        } else {
            text.textContent = 'PLAY';
        }
    }

    reset() {
        this.currentTime = 0;
        this.startTime = Date.now();
    }

    randomize() {
        const effects = ['breath', 'flow', 'quiet', 'ocean', 'dawn', 'evening', 'meditation', 'balance', 'clarity', 'peace', 'focus', 'tranquil'];
        this.params.effectType = effects[Math.floor(Math.random() * effects.length)];
        document.getElementById('effectType').value = this.params.effectType;

        this.params.speed = 0.2 + Math.random() * 1.5;
        this.params.complexity = 0.3 + Math.random() * 1.5;
        this.params.scale = 0.5 + Math.random() * 2;
        this.params.colorIntensity = 0.5 + Math.random() * 1;
        this.params.distortion = Math.random() * 0.8;
        this.params.glow = Math.random() * 0.4;
        this.params.brightness = 0.4 + Math.random() * 0.8;

        // Subtle colors for therapy app
        this.params.color1 = this.randomTherapeuticColor();
        this.params.color2 = this.randomTherapeuticColor();
        this.params.color3 = this.randomTherapeuticColor();

        this.updateUI();
        this.generateAndCompileShader();
    }

    randomTherapeuticColor() {
        const palettes = [
            ['#1a1a2e', '#16213e', '#0f3460', '#1b2631', '#1c2833'],
            ['#0a0e27', '#1a237e', '#283593', '#1e1e2e', '#191970'],
            ['#0d1117', '#161b22', '#21262d', '#1f2937', '#111827'],
            ['#1a1a40', '#1e1e3f', '#25274d', '#1b1b3a', '#2c2c54']
        ];
        const palette = palettes[Math.floor(Math.random() * palettes.length)];
        return palette[Math.floor(Math.random() * palette.length)];
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

        document.getElementById('distortion').value = this.params.distortion;
        document.getElementById('distortionValue').textContent = this.params.distortion.toFixed(1);

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
        let shaderEffectCode = '';

        switch (p.effectType) {
            case 'breath':
                // Gentle breathing pattern - slow, centered waves
                shaderEffectCode = `
    vec2 centered = uv * scale;
    float breathe = sin(t * 0.5) * 0.5 + 0.5;

    float dist = length(centered);
    float wave = sin(dist * 2.0 - t * 0.3) * exp(-dist * 0.5);
    wave *= breathe;

    float pattern = wave * 0.5 + 0.5;
    vec3 col = mix(color1, mix(color2, color3, breathe), pattern);
    col *= 0.3 + breathe * 0.4;
                `;
                break;

            case 'flow':
                // Serene flowing gradients
                shaderEffectCode = `
    vec2 p = uv * scale;
    float flow1 = sin(p.x * complexity + t * 0.2);
    float flow2 = cos(p.y * complexity - t * 0.15);

    float pattern = (flow1 + flow2) * 0.25 + 0.5;
    pattern *= exp(-length(p) * distortion * 0.3);

    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, sin(t * 0.1 + pattern) * 0.5 + 0.5);
                `;
                break;

            case 'quiet':
                // Minimal, quiet movement
                shaderEffectCode = `
    vec2 p = uv * scale;
    float quiet = sin(t * 0.1) * 0.1;

    float pattern = length(p + vec2(quiet, -quiet * 0.7));
    pattern = sin(pattern * complexity) * 0.3 + 0.5;

    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, sin(t * 0.05) * 0.2 + 0.3);
                `;
                break;

            case 'ocean':
                // Gentle ocean waves
                shaderEffectCode = `
    vec2 p = uv * scale;
    float wave1 = sin(p.x * complexity * 2.0 + t * 0.3);
    float wave2 = sin((p.x + p.y) * complexity + t * 0.2);

    float pattern = (wave1 + wave2) * 0.25 + 0.5;
    pattern *= smoothstep(1.5, 0.0, length(p));

    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, wave1 * 0.3 + 0.5);
                `;
                break;

            case 'dawn':
                // Soft dawn light transitions
                shaderEffectCode = `
    vec2 p = uv * scale;
    float dawn = sin(t * 0.15) * 0.5 + 0.5;

    float gradient = (p.y + 1.0) * 0.5;
    gradient = pow(gradient, 1.5);

    float pattern = gradient * dawn;

    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, dawn * 0.6);
                `;
                break;

            case 'evening':
                // Evening fade effect
                shaderEffectCode = `
    vec2 p = uv * scale;
    float evening = cos(t * 0.12) * 0.5 + 0.5;

    float gradient = 1.0 - (p.y + 1.0) * 0.5;
    gradient = pow(gradient, 1.2);

    float pattern = gradient * evening;

    vec3 col = mix(color3, color2, pattern);
    col = mix(col, color1, evening * 0.5);
                `;
                break;

            case 'meditation':
                // Centered radial calm
                shaderEffectCode = `
    vec2 p = uv * scale;
    float dist = length(p);

    float rings = sin(dist * complexity * 5.0 - t * 0.2) * 0.5 + 0.5;
    rings *= exp(-dist * 0.8);

    float pulse = sin(t * 0.3) * 0.3 + 0.7;

    float pattern = rings * pulse;
    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, rings);
                `;
                break;

            case 'balance':
                // Symmetrical, balanced patterns
                shaderEffectCode = `
    vec2 p = uv * scale;
    float angle = atan(p.y, p.x);
    float radius = length(p);

    float symmetry = sin(angle * 4.0) * cos(radius * complexity - t * 0.2);
    symmetry = symmetry * 0.5 + 0.5;

    float pattern = symmetry * exp(-radius * 0.5);
    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, symmetry * 0.7);
                `;
                break;

            case 'clarity':
                // Clean, clear patterns
                shaderEffectCode = `
    vec2 p = uv * scale;

    float clear = abs(sin(p.x * complexity + t * 0.2));
    clear *= abs(cos(p.y * complexity - t * 0.15));

    float pattern = smoothstep(0.3, 0.7, clear);

    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, sin(t * 0.1) * 0.3 + 0.5);
                `;
                break;

            case 'peace':
                // Very subtle, peaceful movement
                shaderEffectCode = `
    vec2 p = uv * scale;
    float peace = sin(t * 0.08) * 0.15 + 0.85;

    float soft = smoothstep(1.0, 0.0, length(p));
    soft *= peace;

    float pattern = soft * (sin(t * 0.05) * 0.1 + 0.9);

    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, soft * 0.5);
                `;
                break;

            case 'focus':
                // Centered focus point
                shaderEffectCode = `
    vec2 p = uv * scale;
    float dist = length(p);

    float focus = exp(-dist * complexity);
    focus *= sin(t * 0.15) * 0.2 + 0.8;

    float pattern = focus;

    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, focus * 0.6);
                `;
                break;

            case 'tranquil':
                // Soft ambient movement
                shaderEffectCode = `
    vec2 p = uv * scale;

    float ambient = sin(p.x * complexity * 0.5 + t * 0.1);
    ambient += cos(p.y * complexity * 0.7 - t * 0.08);
    ambient = ambient * 0.25 + 0.5;

    float fade = exp(-length(p) * 0.4);
    float pattern = ambient * fade;

    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, ambient);
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
uniform float distortion;
uniform float glow;
uniform float brightness;

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution) / iResolution.y;
    float t = iTime * speed;

    ${shaderEffectCode}

    // Apply subtle color adjustments
    col *= colorIntensity;

    // Apply gentle glow
    float dist = length(uv);
    col += vec3(glow * 0.3) / (dist * 3.0 + 1.0);

    // Apply brightness
    col *= brightness;

    // Clamp and ensure dark, therapeutic aesthetic
    col = clamp(col, 0.0, 0.8);

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
            document.getElementById('fpsCounter').textContent = this.fps;
        }

        document.getElementById('timeCounter').textContent = this.currentTime.toFixed(2) + 's';

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
        this.setUniform('distortion', this.params.distortion);
        this.setUniform('glow', this.params.glow);
        this.setUniform('brightness', this.params.brightness);

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
