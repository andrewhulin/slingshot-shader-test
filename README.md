# Fragment Shader Editor ✨

A beautiful web-based fragment shader editor with real-time preview and export functionality. Create stunning visual effects using GLSL shaders directly in your browser!

![Fragment Shader Editor](https://img.shields.io/badge/WebGL-Enabled-blue) ![No Build Required](https://img.shields.io/badge/No%20Build-Required-green)

## Features

- **Live Preview**: Real-time shader compilation and rendering using WebGL
- **Code Editor**: Syntax-highlighted editor powered by CodeMirror with Monokai theme
- **Example Shaders**: 6 beautiful pre-built shader examples to get you started
- **Export**: Save your shaders as `.frag` files
- **Animation Controls**: Play/Pause and Reset time controls
- **Performance Monitoring**: Live FPS counter and time display
- **Resolution Scaling**: Adjust preview quality from 0.25x to 2x
- **Mouse Tracking**: Interactive shaders with mouse position support
- **Responsive Design**: Works on desktop and tablet devices

## Quick Start

1. **Open the editor**: Simply open `index.html` in a modern web browser
2. **Write or select a shader**: Use the built-in examples or write your own
3. **Watch it render**: See your shader come to life in real-time
4. **Export**: Save your creation as a `.frag` file

No installation, no build process, no dependencies to install!

## Shader Uniforms

Your fragment shaders have access to the following uniforms:

```glsl
uniform float iTime;        // Current time in seconds
uniform vec2 iResolution;   // Canvas resolution in pixels
uniform vec2 iMouse;        // Mouse position in pixels
```

## Example Shader

```glsl
precision mediump float;

uniform float iTime;
uniform vec2 iResolution;

void main() {
    // Normalize coordinates
    vec2 uv = gl_FragCoord.xy / iResolution.xy;

    // Create animated rainbow gradient
    vec3 col = 0.5 + 0.5 * cos(iTime + uv.xyx * 3.14159 + vec3(0, 2, 4));

    gl_FragColor = vec4(col, 1.0);
}
```

## Built-in Examples

- **Plasma**: Animated plasma effect with rainbow colors
- **Rainbow Gradient**: Simple animated color gradient
- **Mandelbrot Set**: Animated fractal visualization with zoom
- **Tunnel Effect**: Mesmerizing 3D tunnel illusion
- **Wave Pattern**: Radial wave interference pattern
- **Fire Effect**: Procedural fire simulation with noise

## Controls

| Control | Description |
|---------|-------------|
| **Play/Pause** | Toggle animation playback |
| **Reset** | Reset time to 0.00s |
| **Export .frag** | Download current shader as a file |
| **Examples** | Load a pre-built example shader |
| **Resolution** | Adjust preview quality (lower = better performance) |

## Browser Compatibility

Requires a modern browser with WebGL support:

- ✅ Chrome/Edge 9+
- ✅ Firefox 4+
- ✅ Safari 5.1+
- ✅ Opera 12+

## Project Structure

```
slingshot-shader-test/
├── index.html           # Main application page
├── styles.css           # UI styling
├── shader-editor.js     # Core application logic
└── README.md           # This file
```

## How It Works

1. **WebGL Context**: Creates a WebGL rendering context on the canvas
2. **Vertex Shader**: Simple pass-through shader that covers the entire canvas
3. **Fragment Shader**: Your custom shader code runs for every pixel
4. **Animation Loop**: `requestAnimationFrame` updates uniforms and renders each frame
5. **CodeMirror**: Provides syntax highlighting and editing features
6. **Auto-Compilation**: Shaders recompile automatically when you edit the code

## Tips for Writing Shaders

- Start with a basic example and modify it gradually
- Use `iTime` to create animations
- Normalize coordinates: `vec2 uv = gl_FragCoord.xy / iResolution.xy;`
- For centered coordinates: `vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution) / iResolution.y;`
- Check the error message panel below the editor for compilation errors
- Use `sin()`, `cos()`, and `length()` for interesting patterns
- Experiment with color gradients using `cos()` functions

## Advanced Techniques

### Distance Fields
```glsl
float circle(vec2 p, float r) {
    return length(p) - r;
}
```

### Rotation
```glsl
mat2 rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
}
```

### Noise (Simple)
```glsl
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}
```

## Troubleshooting

**Black screen?**
- Check the error message panel below the code editor
- Ensure your shader has a `main()` function
- Make sure you set `gl_FragColor` in your shader

**Low FPS?**
- Reduce the resolution using the slider
- Simplify complex calculations in your shader
- Avoid expensive operations in tight loops

**Shader won't compile?**
- Check for syntax errors in the error panel
- Ensure all uniforms are declared with correct types
- Use `precision mediump float;` at the top of your shader

## License

This project is open source and available for educational and personal use.

## Resources

- [The Book of Shaders](https://thebookofshaders.com/) - Learn shader programming
- [Shadertoy](https://www.shadertoy.com/) - Share and explore shaders
- [WebGL Fundamentals](https://webglfundamentals.org/) - Learn WebGL
- [GLSL Reference](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language) - Language specification

---

**Happy Shader Coding!** 🎨✨
