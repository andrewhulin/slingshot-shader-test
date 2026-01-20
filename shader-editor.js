// Shader Studio - Therapeutic Background Generator for Ash AI Therapy App
// Brand-aligned warm & earthy shader presets

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

        // Shader parameters - Brand-aligned defaults
        this.params = {
            effectType: 'warmglow',
            speed: 0.6,
            complexity: 1.2,
            scale: 1.0,
            color1: '#E67E50',  // Warm coral/orange
            color2: '#F5A962',  // Golden orange
            color3: '#7D8F69',  // Sage green
            colorIntensity: 1.2,
            colorShift: 0.0,
            distortion: 0.5,
            symmetry: 1,
            glow: 0.3,
            brightness: 1.1
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
        const effects = ['warmglow', 'earthrise', 'sage', 'sunset', 'terracotta', 'goldenhr', 'forest', 'amber', 'zenstone', 'clay', 'meadow', 'warmth'];
        this.params.effectType = effects[Math.floor(Math.random() * effects.length)];
        document.getElementById('effectType').value = this.params.effectType;

        this.params.speed = 0.3 + Math.random() * 1.2;
        this.params.complexity = 0.8 + Math.random() * 1.5;
        this.params.scale = 0.7 + Math.random() * 1.8;
        this.params.colorIntensity = 1.0 + Math.random() * 0.8;
        this.params.distortion = 0.2 + Math.random() * 1.0;
        this.params.glow = 0.2 + Math.random() * 0.5;
        this.params.brightness = 0.9 + Math.random() * 0.8;

        // Brand-aligned color randomization
        this.params.color1 = this.randomBrandColor();
        this.params.color2 = this.randomBrandColor();
        this.params.color3 = this.randomBrandColor();

        this.updateUI();
        this.generateAndCompileShader();
    }

    randomBrandColor() {
        const brandPalette = [
            // Warm oranges & corals
            '#E67E50', '#F5A962', '#FF8C42', '#E8956C', '#F4A261', '#ED9455',
            // Sage & olive greens
            '#7D8F69', '#6B7F5C', '#8B9D6F', '#73856A', '#8A9B7A', '#6F8062',
            // Earth tones
            '#B89176', '#A17F6B', '#C4A578', '#9B8169', '#D4A574',
            // Creams & warm neutrals
            '#EDE8DC', '#F5F1E8', '#E8DCC8', '#DDD5C7'
        ];
        return brandPalette[Math.floor(Math.random() * brandPalette.length)];
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
            case 'warmglow':
                // Warm radial glow emanating from center
                shaderEffectCode = `
    vec2 p = uv * scale;
    float dist = length(p);

    float glow1 = exp(-dist * complexity * 0.8);
    float glow2 = exp(-dist * complexity * 1.5);
    float pulse = sin(t * 0.8) * 0.3 + 0.7;

    float pattern = (glow1 * 0.7 + glow2 * 0.3) * pulse;
    pattern += sin(dist * 3.0 - t * 0.5) * 0.15 * exp(-dist * 0.5);

    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, sin(t * 0.3 + dist * 2.0) * 0.4 + 0.5);
                `;
                break;

            case 'earthrise':
                // Rising gradient with organic waves
                shaderEffectCode = `
    vec2 p = uv * scale;
    float rise = (p.y + 1.0) * 0.5;

    float wave = sin(p.x * complexity * 3.0 + t * 0.4) * 0.15;
    wave += sin(p.x * complexity * 1.5 - t * 0.3) * 0.1;

    float pattern = pow(rise + wave, 1.3);
    pattern *= sin(t * 0.2) * 0.2 + 0.9;

    vec3 col = mix(color3, color2, pattern);
    col = mix(col, color1, pattern * 0.7);
                `;
                break;

            case 'sage':
                // Organic flowing sage-inspired patterns
                shaderEffectCode = `
    vec2 p = uv * scale;

    float flow1 = sin(p.x * complexity + t * 0.3 + sin(p.y * 2.0));
    float flow2 = cos(p.y * complexity * 0.8 - t * 0.25 + cos(p.x * 1.5));

    float pattern = (flow1 + flow2) * 0.35 + 0.5;
    pattern *= exp(-length(p) * distortion * 0.2);

    float accent = sin(length(p) * 4.0 - t * 0.4) * 0.2 + 0.8;

    vec3 col = mix(color3, mix(color2, color1, pattern * 0.6), pattern);
    col *= accent;
                `;
                break;

            case 'sunset':
                // Warm sunset gradient with soft movement
                shaderEffectCode = `
    vec2 p = uv * scale;
    float gradient = 1.0 - (p.y + 1.0) * 0.5;
    gradient = pow(gradient, 1.2);

    float drift = sin(t * 0.2 + p.x * 2.0) * 0.15;
    float pattern = gradient + drift;

    float shimmer = sin(p.x * complexity * 5.0 + t * 0.5) * 0.1;
    pattern += shimmer;

    vec3 col = mix(color2, color1, pattern * 0.8);
    col = mix(col, color3, (1.0 - pattern) * 0.4);
                `;
                break;

            case 'terracotta':
                // Earthy terracotta waves
                shaderEffectCode = `
    vec2 p = uv * scale;

    float wave1 = sin(p.y * complexity * 2.0 + t * 0.35);
    float wave2 = cos(p.x * complexity * 1.5 - t * 0.4);

    float pattern = (wave1 * wave2) * 0.4 + 0.5;
    pattern *= smoothstep(1.8, 0.2, length(p));

    float layer = sin(p.x * 3.0 + p.y * 2.0 + t * 0.25) * 0.2 + 0.8;

    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, wave1 * 0.3 + 0.4);
    col *= layer;
                `;
                break;

            case 'goldenhr':
                // Golden hour warm diffusion
                shaderEffectCode = `
    vec2 p = uv * scale;
    float dist = length(p);

    float rays = sin(atan(p.y, p.x) * 8.0 + t * 0.3) * 0.2 + 0.8;
    float diffuse = exp(-dist * complexity * 0.6);

    float pattern = diffuse * rays;
    pattern += sin(dist * 4.0 - t * 0.5) * 0.15 * diffuse;

    vec3 col = mix(color2, color1, pattern * 0.9);
    col = mix(col, color3, (1.0 - diffuse) * 0.5);
                `;
                break;

            case 'forest':
                // Forest dappled light pattern
                shaderEffectCode = `
    vec2 p = uv * scale;

    float dapple = sin(p.x * complexity * 4.0 + sin(p.y * 3.0 + t * 0.2)) * 0.5 + 0.5;
    dapple *= cos(p.y * complexity * 3.0 + cos(p.x * 2.0 - t * 0.15)) * 0.5 + 0.5;

    float depth = exp(-length(p) * 0.3);
    float pattern = dapple * depth * 0.8 + 0.2;

    vec3 col = mix(color3, color2, pattern);
    col = mix(col, color1, dapple * 0.4);
                `;
                break;

            case 'amber':
                // Amber waves of warmth
                shaderEffectCode = `
    vec2 p = uv * scale;

    float wave = sin(p.x * complexity * 2.5 + t * 0.4) * cos(p.y * complexity * 1.8 - t * 0.3);
    wave = wave * 0.4 + 0.5;

    float flow = sin(length(p) * 3.0 - t * 0.35) * 0.2 + 0.8;
    float pattern = wave * flow;

    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, sin(wave * 6.28 + t * 0.3) * 0.3 + 0.5);
                `;
                break;

            case 'zenstone':
                // Zen stone ripples
                shaderEffectCode = `
    vec2 p = uv * scale;
    float dist = length(p);

    float ripples = sin(dist * complexity * 6.0 - t * 0.4) * 0.5 + 0.5;
    ripples *= exp(-dist * 0.6);

    float pulse = sin(t * 0.35) * 0.25 + 0.75;
    float pattern = ripples * pulse;

    vec3 col = mix(color3, color2, pattern);
    col = mix(col, color1, ripples * 0.5);
                `;
                break;

            case 'clay':
                // Clay and earth texture
                shaderEffectCode = `
    vec2 p = uv * scale;

    float texture1 = sin(p.x * complexity * 6.0 + t * 0.2) * 0.5 + 0.5;
    float texture2 = cos(p.y * complexity * 5.0 - t * 0.15) * 0.5 + 0.5;

    float pattern = (texture1 * texture2) * 0.7 + 0.3;
    pattern *= smoothstep(2.0, 0.3, length(p));

    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, texture1 * 0.4 + 0.3);
                `;
                break;

            case 'meadow':
                // Meadow breeze movement
                shaderEffectCode = `
    vec2 p = uv * scale;

    float breeze1 = sin(p.x * complexity * 2.0 + t * 0.3 + sin(p.y * 3.0));
    float breeze2 = cos(p.y * complexity * 1.5 - t * 0.25 + cos(p.x * 2.5));

    float pattern = (breeze1 + breeze2) * 0.35 + 0.5;
    float fade = smoothstep(2.0, 0.0, length(p));

    vec3 col = mix(color3, color2, pattern * fade);
    col = mix(col, color1, breeze1 * 0.3 + 0.4);
                `;
                break;

            case 'warmth':
                // Inner warmth radiating outward
                shaderEffectCode = `
    vec2 p = uv * scale;
    float dist = length(p);

    float warmth = exp(-dist * complexity);
    float pulse = sin(t * 0.4) * 0.3 + 0.7;

    float rings = sin(dist * 5.0 - t * 0.3) * 0.15;
    float pattern = warmth * pulse + rings;

    vec3 col = mix(color1, color2, pattern * 0.8);
    col = mix(col, color3, (1.0 - warmth) * 0.6);
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

    // Apply color saturation
    col *= colorIntensity;

    // Apply glow
    float dist = length(uv);
    col += vec3(glow * 0.4) / (dist * 2.5 + 1.0);

    // Apply brightness
    col *= brightness;

    // Clamp to prevent too much brightness while keeping prominence
    col = clamp(col, 0.0, 1.3);

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
