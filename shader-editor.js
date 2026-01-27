// Fire Shader Studio - Fire-Based Visual Effects

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

        // Stepped parameters
        this.params = {
            preset: 'flames',
            flow: 0,          // 0-3: Cool, Warm, Hot, Blazing (heat)
            depth: 0,         // 0-2: Low, Medium, High (intensity)
            movement: 0,      // 0-2: Steady, Flickering, Chaotic (turbulence)
            harmony: 'classic'    // Color harmony preset
        };

        // Color harmonies - fire-themed palettes
        this.harmonies = {
            classic: {
                color1: [1.000, 0.271, 0.000], // #FF4500 - Orange Red
                color2: [1.000, 0.549, 0.000], // #FF8C00 - Dark Orange
                color3: [1.000, 0.843, 0.000]  // #FFD700 - Gold
            },
            infernal: {
                color1: [0.545, 0.000, 0.000], // #8B0000 - Dark Red
                color2: [0.863, 0.078, 0.235], // #DC143C - Crimson
                color3: [1.000, 0.271, 0.000]  // #FF4500 - Orange Red
            },
            lava: {
                color1: [1.000, 0.388, 0.278], // #FF6347 - Tomato
                color2: [1.000, 0.549, 0.000], // #FF8C00 - Dark Orange
                color3: [0.290, 0.000, 0.000]  // #4A0000 - Deep Dark Red
            },
            ember: {
                color1: [0.545, 0.271, 0.075], // #8B4513 - Saddle Brown
                color2: [0.824, 0.412, 0.118], // #D2691E - Chocolate
                color3: [1.000, 0.498, 0.314]  // #FF7F50 - Coral
            },
            plasma: {
                color1: [1.000, 0.078, 0.576], // #FF1493 - Deep Pink
                color2: [1.000, 0.271, 0.000], // #FF4500 - Orange Red
                color3: [1.000, 0.843, 0.000]  // #FFD700 - Gold
            },
            solar: {
                color1: [1.000, 0.647, 0.000], // #FFA500 - Orange
                color2: [1.000, 1.000, 0.000], // #FFFF00 - Yellow
                color3: [1.000, 1.000, 1.000]  // #FFFFFF - White
            }
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
        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.params.preset = btn.dataset.preset;
                this.generateAndCompileShader();
            });
        });

        // Flow step buttons
        const flowBtns = document.querySelectorAll('.control-section')[1].querySelectorAll('.step-btn');
        flowBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                flowBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.params.flow = parseInt(btn.dataset.value);
            });
        });

        // Depth step buttons
        const depthBtns = document.querySelectorAll('.control-section')[2].querySelectorAll('.step-btn');
        depthBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                depthBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.params.depth = parseInt(btn.dataset.value);
            });
        });

        // Movement step buttons
        const movementBtns = document.querySelectorAll('.control-section')[3].querySelectorAll('.step-btn');
        movementBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                movementBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.params.movement = parseInt(btn.dataset.value);
            });
        });

        // Harmony buttons
        document.querySelectorAll('.harmony-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.harmony-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.params.harmony = btn.dataset.harmony;
            });
        });

        // Action buttons
        document.getElementById('playBtn').addEventListener('click', () => this.togglePlay());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('exportBtn').addEventListener('click', () => this.export());
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

    generateShaderCode() {
        const p = this.params;

        // Map stepped values to shader parameters
        const speed = [0.3, 0.7, 1.2, 2.0][p.flow];
        const complexity = [0.8, 1.3, 2.0][p.depth];
        const intensity = [0.5, 1.0, 1.8][p.movement];

        let shaderEffectCode = '';

        switch (p.preset) {
            case 'flames':
                // Rising flames effect
                shaderEffectCode = `
    vec2 p = uv;

    // Create upward-moving noise for flames
    float flame1 = sin(p.x * 8.0 * complexity + sin(p.y * 3.0 + t * speed * 2.0) * 2.0);
    float flame2 = sin(p.x * 12.0 * complexity + sin(p.y * 4.0 + t * speed * 2.5) * 1.5 + 1.0);
    float flame3 = sin(p.x * 6.0 * complexity + sin(p.y * 2.0 + t * speed * 1.8) * 2.5 + 2.0);

    // Vertical gradient - flames stronger at bottom
    float vertGrad = 1.0 - (p.y + 1.0) * 0.5;
    vertGrad = pow(max(vertGrad, 0.0), 0.8);

    // Combine flames with flickering
    float flicker = sin(t * speed * 8.0) * 0.1 * intensity + 0.9;
    float pattern = (flame1 * 0.4 + flame2 * 0.35 + flame3 * 0.25) * 0.5 + 0.5;
    pattern *= vertGrad * flicker;

    // Fire color gradient - red at edges, yellow/white at core
    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, pow(pattern, 2.0) * intensity);
                `;
                break;

            case 'inferno':
                // Intense upward rushing fire
                shaderEffectCode = `
    vec2 p = uv;

    // Fast upward movement with turbulence
    float turb1 = sin(p.x * 10.0 * complexity + t * speed * 3.0);
    float turb2 = cos(p.x * 15.0 * complexity - t * speed * 2.5 + p.y * 5.0);

    // Rising columns of fire
    float rise = sin(p.x * 6.0 * complexity) * cos(p.y * 2.0 - t * speed * 4.0);
    rise += sin(p.x * 9.0 * complexity + 1.5) * cos(p.y * 3.0 - t * speed * 3.5) * 0.7;

    // Vertical intensity
    float vertGrad = 1.0 - (p.y + 1.0) * 0.4;
    vertGrad = pow(max(vertGrad, 0.0), 0.6);

    float pattern = (rise * 0.5 + turb1 * 0.3 + turb2 * 0.2) * 0.5 + 0.5;
    pattern *= vertGrad * (1.0 + sin(t * speed * 10.0) * intensity * 0.2);

    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, pow(pattern, 1.5) * intensity * 0.8);
                `;
                break;

            case 'embers':
                // Glowing embers pulsing
                shaderEffectCode = `
    vec2 p = uv;
    float dist = length(p);

    // Pulsing ember glow
    float pulse1 = sin(dist * 8.0 * complexity - t * speed * 1.5) * 0.5 + 0.5;
    float pulse2 = sin(dist * 12.0 * complexity - t * speed * 2.0 + 2.0) * 0.5 + 0.5;
    float pulse3 = sin(dist * 6.0 * complexity - t * speed * 1.2 + 4.0) * 0.5 + 0.5;

    // Breathing effect
    float breath = sin(t * speed * 0.8) * 0.3 * intensity + 0.7;

    // Scattered hot spots
    float spots = sin(p.x * 15.0 + t * speed) * sin(p.y * 15.0 - t * speed * 0.8);
    spots = pow(max(spots, 0.0), 2.0) * intensity;

    float pattern = (pulse1 * 0.4 + pulse2 * 0.35 + pulse3 * 0.25) * breath + spots * 0.3;

    // Ember colors - deep red to orange glow
    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, spots + pattern * 0.3);
                `;
                break;

            case 'sparks':
                // Flying sparks effect
                shaderEffectCode = `
    vec2 p = uv;

    // Scattered spark patterns
    float spark1 = sin(p.x * 20.0 * complexity + t * speed * 3.0);
    float spark2 = sin(p.y * 18.0 * complexity - t * speed * 2.5);
    float spark3 = sin((p.x - p.y) * 15.0 * complexity + t * speed * 4.0);

    // Combine for interference pattern
    float sparks = spark1 * spark2 * 0.5 + spark3 * 0.3;
    sparks = pow(max(sparks, 0.0), 1.5);

    // Rising motion
    float rise = sin(p.y * 3.0 - t * speed * 2.0 + p.x * 2.0) * 0.5 + 0.5;

    // Flickering intensity
    float flicker = sin(t * speed * 15.0 + p.x * 10.0) * 0.2 * intensity + 0.8;

    float pattern = sparks * rise * flicker;
    pattern += sin(p.x * 30.0 + p.y * 25.0 + t * speed * 5.0) * 0.1 * intensity;

    vec3 col = mix(color1, color3, pattern);
    col = mix(col, color2, sparks * intensity);
                `;
                break;

            case 'blaze':
                // Intense wall of fire
                shaderEffectCode = `
    vec2 p = uv;

    // Horizontal waves of fire
    float wave1 = sin(p.y * 4.0 * complexity + t * speed * 2.0 + sin(p.x * 3.0) * 2.0);
    float wave2 = sin(p.y * 6.0 * complexity + t * speed * 2.5 + sin(p.x * 4.0) * 1.5);
    float wave3 = sin(p.y * 3.0 * complexity + t * speed * 1.8 + sin(p.x * 2.0) * 2.5);

    // Intensity modulation
    float blaze = sin(t * speed * 1.5) * 0.2 * intensity + 0.8;

    // Combine waves
    float pattern = (wave1 * 0.4 + wave2 * 0.35 + wave3 * 0.25) * 0.5 + 0.5;
    pattern *= blaze;

    // Add heat distortion
    float distort = sin(p.x * 8.0 + t * speed * 3.0) * sin(p.y * 6.0 + t * speed * 2.5) * 0.2 * intensity;
    pattern += distort;

    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, pow(pattern, 1.8) * intensity);
                `;
                break;

            case 'corona':
                // Solar corona / radial fire
                shaderEffectCode = `
    vec2 p = uv;
    float dist = length(p);
    float angle = atan(p.y, p.x);

    // Radial flares
    float flare1 = sin(angle * 8.0 + t * speed * 2.0) * cos(dist * 5.0 * complexity - t * speed);
    float flare2 = sin(angle * 12.0 - t * speed * 1.5) * cos(dist * 8.0 * complexity + t * speed * 0.8);
    float flare3 = sin(angle * 6.0 + t * speed * 2.5) * cos(dist * 4.0 * complexity - t * speed * 1.2);

    // Central glow
    float glow = exp(-dist * (2.5 - intensity * 0.8));

    // Pulsing core
    float pulse = sin(t * speed * 2.0) * 0.15 * intensity + 0.85;

    float pattern = (flare1 * 0.4 + flare2 * 0.35 + flare3 * 0.25) * 0.5 + 0.5;
    pattern = pattern * glow * pulse + glow * 0.5;

    // Corona colors - white hot center to red edges
    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, glow * intensity);
                `;
                break;
        }

        const fragmentShader = `
precision mediump float;

uniform float iTime;
uniform vec2 iResolution;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution) / iResolution.y;
    float t = iTime;

    // Parameters from stepped controls
    float speed = ${speed.toFixed(2)};
    float complexity = ${complexity.toFixed(2)};
    float intensity = ${intensity.toFixed(2)};

    ${shaderEffectCode}

    // Fire glow effect
    float dist = length(uv);
    col += color2 * 0.1 / (dist * 2.0 + 0.5);

    // Clamp and enhance
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

        // Set color harmony
        const harmony = this.harmonies[this.params.harmony];
        this.setUniformVec3('color1', harmony.color1);
        this.setUniformVec3('color2', harmony.color2);
        this.setUniformVec3('color3', harmony.color3);

        // Draw
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

        requestAnimationFrame(() => this.render());
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
        a.download = `shader_${this.params.preset}_${Date.now()}.frag`;
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
