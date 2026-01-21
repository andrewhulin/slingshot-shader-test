// Shader Studio - Water-Based Thinking Shaders for Ash AI Therapy App

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
            preset: 'ripples',
            flow: 0,          // 0-3: Still, Gentle, Moderate, Active
            depth: 0,         // 0-2: Shallow, Medium, Deep
            movement: 0,      // 0-2: Calm, Flowing, Dynamic
            harmony: 'ash'    // Color harmony preset
        };

        // Color harmonies - curated palettes that always look good
        this.harmonies = {
            ash: {
                color1: [0.902, 0.494, 0.314], // #E67E50
                color2: [0.490, 0.561, 0.412], // #7D8F69
                color3: [0.961, 0.663, 0.384]  // #F5A962
            },
            ocean: {
                color1: [0.290, 0.565, 0.643], // #4A90A4
                color2: [0.353, 0.694, 0.733], // #5AB1BB
                color3: [0.176, 0.373, 0.427]  // #2D5F6D
            },
            forest: {
                color1: [0.420, 0.561, 0.443], // #6B8F71
                color2: [0.561, 0.659, 0.533], // #8FA888
                color3: [0.290, 0.420, 0.322]  // #4A6B52
            },
            sunset: {
                color1: [0.910, 0.553, 0.404], // #E88D67
                color2: [0.608, 0.420, 0.620], // #9B6B9E
                color3: [0.957, 0.635, 0.380]  // #F4A261
            },
            moonlight: {
                color1: [0.482, 0.561, 0.639], // #7B8FA3
                color2: [0.659, 0.710, 0.780], // #A8B5C7
                color3: [0.306, 0.365, 0.424]  // #4E5D6C
            },
            earth: {
                color1: [0.608, 0.494, 0.435], // #9B7E6F
                color2: [0.420, 0.561, 0.639], // #6B8FA3
                color3: [0.769, 0.647, 0.482]  // #C4A57B
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
        const speed = [0.2, 0.5, 1.0, 1.8][p.flow];
        const complexity = [0.8, 1.2, 2.0][p.depth];
        const intensity = [0.6, 1.0, 1.5][p.movement];

        let shaderEffectCode = '';

        switch (p.preset) {
            case 'ripples':
                // Concentric ripples - thoughts spreading outward
                shaderEffectCode = `
    vec2 p = uv;
    float dist = length(p);

    // Multiple ripple sources for depth
    float ripple1 = sin(dist * 12.0 * complexity - t * speed * 2.0) * 0.5 + 0.5;
    float ripple2 = sin(dist * 8.0 * complexity - t * speed * 1.5 + 1.0) * 0.5 + 0.5;
    float ripple3 = sin(dist * 15.0 * complexity - t * speed * 2.5 + 2.0) * 0.5 + 0.5;

    // Exponential falloff for depth
    float falloff = exp(-dist * (2.0 - intensity));

    float pattern = (ripple1 * 0.5 + ripple2 * 0.3 + ripple3 * 0.2) * falloff;

    // Color based on ripple intensity
    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, ripple1 * falloff);
                `;
                break;

            case 'current':
                // Flowing current - directional thinking
                shaderEffectCode = `
    vec2 p = uv;

    // Flowing horizontal current with vertical variation
    float current = sin(p.x * 4.0 * complexity - t * speed * 1.5);
    current += sin((p.x - p.y * 0.5) * 6.0 * complexity - t * speed * 2.0) * 0.5;
    current += cos(p.x * 3.0 * complexity + p.y * 2.0 - t * speed) * 0.3;

    // Vertical gradient for depth
    float depthGrad = (p.y + 1.0) * 0.5;
    depthGrad = pow(depthGrad, 1.5 - intensity * 0.5);

    float pattern = (current * 0.4 + 0.5) * depthGrad;

    // Flowing color shifts
    vec3 col = mix(color2, color1, pattern);
    col = mix(col, color3, sin(pattern * 3.14159 + t * speed * 0.5) * 0.5 + 0.5);
                `;
                break;

            case 'deep':
                // Deep layered thinking - stratified water layers
                shaderEffectCode = `
    vec2 p = uv;
    float dist = length(p);

    // Layered depth with different speeds
    float layer1 = sin(p.y * 5.0 * complexity + t * speed * 0.3);
    float layer2 = sin(p.y * 8.0 * complexity + t * speed * 0.5 + 1.0);
    float layer3 = sin(p.y * 12.0 * complexity + t * speed * 0.7 + 2.0);

    // Add horizontal variation
    float variation = sin(p.x * 3.0 + t * speed * 0.2) * 0.3;

    // Combine layers with depth
    float pattern = (layer1 * 0.5 + layer2 * 0.3 + layer3 * 0.2 + variation);
    pattern = pattern * 0.5 + 0.5;

    // Depth darkening
    pattern *= 1.0 - dist * (1.5 - intensity * 0.5);

    vec3 col = mix(color3, color2, pattern);
    col = mix(col, color1, layer1 * 0.3 + 0.4);
                `;
                break;

            case 'surface':
                // Surface patterns - scattered light thoughts
                shaderEffectCode = `
    vec2 p = uv;

    // Scattered surface reflections
    float scatter1 = sin(p.x * 10.0 * complexity + t * speed * 2.0);
    float scatter2 = sin(p.y * 8.0 * complexity - t * speed * 1.5);
    float scatter3 = sin((p.x + p.y) * 6.0 * complexity + t * speed * 1.8);

    // Combine with interference
    float pattern = scatter1 * scatter2 * 0.5 + scatter3 * 0.3 + 0.5;
    pattern *= 1.0 + sin(t * speed * 0.5) * intensity * 0.3;

    // Shimmer effect
    float shimmer = sin(p.x * 20.0 + p.y * 15.0 + t * speed * 3.0) * 0.1;
    pattern += shimmer;

    vec3 col = mix(color1, color3, pattern * 0.8);
    col = mix(col, color2, scatter1 * 0.4 + 0.5);
                `;
                break;

            case 'tide':
                // Rhythmic tide - cyclical thinking
                shaderEffectCode = `
    vec2 p = uv;

    // Rhythmic tidal movement
    float tide = sin(t * speed * 0.8) * intensity * 0.5;

    // Horizontal waves with tide influence
    float wave1 = sin(p.x * 6.0 * complexity + t * speed * 1.2 + tide);
    float wave2 = sin(p.x * 4.0 * complexity - t * speed * 0.8 + tide * 1.5);

    // Vertical gradient modified by tide
    float gradient = (p.y + 1.0 + tide * 0.3) * 0.5;

    float pattern = (wave1 * 0.6 + wave2 * 0.4) * 0.5 + 0.5;
    pattern *= gradient;

    // Tidal color shift
    vec3 col = mix(color2, color1, pattern);
    col = mix(col, color3, abs(sin(t * speed * 0.4)) * 0.6 + 0.2);
                `;
                break;

            case 'reflect':
                // Mirror reflection - introspective thinking
                shaderEffectCode = `
    vec2 p = uv;

    // Symmetrical reflection from center
    float dist = length(p);
    float angle = atan(p.y, p.x);

    // Mirror patterns
    float reflect1 = sin(dist * 10.0 * complexity - t * speed) * cos(angle * 4.0);
    float reflect2 = cos(dist * 8.0 * complexity + t * speed * 0.7) * sin(angle * 6.0);

    // Combine with radial gradient
    float radial = exp(-dist * (2.0 - intensity * 0.5));

    float pattern = (reflect1 * 0.6 + reflect2 * 0.4) * 0.5 + 0.5;
    pattern *= radial;

    // Reflective color mixing
    vec3 col = mix(color1, color2, pattern);
    col = mix(col, color3, reflect1 * radial * 0.5 + 0.5);
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

    // Subtle overall glow
    float dist = length(uv);
    col += vec3(0.15) / (dist * 3.0 + 1.0);

    // Clamp and enhance
    col = clamp(col, 0.0, 1.2);

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
