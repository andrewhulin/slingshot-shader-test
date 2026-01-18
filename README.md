# Shader Studio ✨

A beautiful **no-code** shader creator with real-time preview and export functionality. Create stunning visual effects with sliders and color pickers - no programming required!

![No Code Required](https://img.shields.io/badge/No%20Code-Required-green) ![WebGL](https://img.shields.io/badge/WebGL-Enabled-blue) ![100% Visual](https://img.shields.io/badge/100%25-Visual-purple)

## Features

🎨 **100% No-Code** - Create beautiful shaders without writing a single line of code
🌈 **8 Effect Types** - Plasma, Waves, Tunnel, Spiral, Kaleidoscope, Fractal, Aurora, Nebula
🎚️ **Full Parameter Control** - Speed, Complexity, Scale, Distortion, Symmetry, Glow, Brightness
🎨 **Color Customization** - Three color pickers with intensity and shift controls
🎲 **Randomize** - Instantly generate random beautiful shaders
💾 **Export** - Save generated shaders as `.frag` files
📺 **Full-Screen Preview** - Immersive shader background with floating control panel
⚡ **Real-Time** - See changes instantly as you adjust parameters
📊 **Performance Monitor** - Live FPS counter

## Quick Start

1. **Open `index.html`** in any modern web browser
2. **Choose an effect type** from the dropdown
3. **Adjust sliders** to customize the effect
4. **Pick colors** with the color pickers
5. **Click Randomize** for instant inspiration
6. **Export** to save your creation as a shader file

**That's it! No installation, no setup, no coding required!**

## Effect Types

### 🌀 Plasma
Animated plasma effect with flowing colors and organic movement.

### 🌊 Waves
Radial wave patterns with exponential falloff creating ripple effects.

### 🕳️ Tunnel
Mesmerizing 3D tunnel illusion with spiral patterns.

### 🌀 Spiral
Rotating spiral patterns with customizable symmetry.

### 🔷 Kaleidoscope
Symmetrical kaleidoscope patterns with mirror reflections.

### 🔮 Fractal
Fractal iteration patterns with Julia set-inspired mathematics.

### 🌌 Aurora
Aurora borealis-inspired flowing waves and gradients.

### 🌠 Nebula
Space nebula effect with procedural noise and stars.

## Controls

### Effect Type
Select from 8 different shader effects.

### Animation
- **Speed** (0-3): Animation speed multiplier
- **Complexity** (0.1-3): Pattern complexity and detail level
- **Scale** (0.1-5): Zoom level and pattern size

### Colors
- **Color 1/2/3**: Three color pickers for gradient control
- **Color Intensity** (0-2): Overall color saturation
- **Color Shift** (-3.14 to 3.14): Hue rotation offset

### Pattern
- **Distortion** (0-2): Pattern warping and deformation
- **Symmetry** (1-12): Number of symmetry axes
- **Glow** (0-1): Radial glow intensity
- **Brightness** (0-2): Overall brightness multiplier

### Buttons
- **🎲 Randomize**: Generate random shader with all parameters
- **🔄 Reset**: Reset animation time to zero
- **⏸ Pause / ▶ Play**: Toggle animation playback
- **💾 Export .frag**: Download generated shader code

## Usage Tips

### Creating Beautiful Shaders

1. **Start with an Effect** - Choose a base effect type
2. **Adjust Speed** - Slower speeds (0.3-0.7) are often more elegant
3. **Play with Colors** - Try complementary or analogous color schemes
4. **Add Symmetry** - Values like 3, 6, 8, or 12 create pleasing patterns
5. **Fine-tune Glow** - Small amounts (0.1-0.3) add depth
6. **Experiment** - Hit Randomize until you find something inspiring!

### Color Scheme Ideas

- **Sunset**: Orange (#ff6b35), Pink (#ff006e), Purple (#8338ec)
- **Ocean**: Cyan (#06ffa5), Blue (#3a86ff), Deep Blue (#0077b6)
- **Fire**: Yellow (#ffbe0b), Orange (#fb5607), Red (#ff006e)
- **Forest**: Light Green (#80ed99), Green (#57cc99), Dark Green (#22577a)
- **Neon**: Pink (#ff006e), Cyan (#00f5ff), Yellow (#fbff00)

### Performance Tips

- Lower **Complexity** values improve performance
- **Fractal** and **Nebula** effects are more computationally intensive
- Check the **FPS counter** - aim for 60 FPS for smooth animation
- On slower devices, reduce complexity and avoid fractal effects

## Browser Compatibility

Requires WebGL support:

- ✅ Chrome/Edge 9+
- ✅ Firefox 4+
- ✅ Safari 5.1+
- ✅ Opera 12+

## Project Structure

```
slingshot-shader-test/
├── index.html          # Main application
├── styles.css          # UI styling
├── shader-editor.js    # Shader generation engine
└── README.md          # This file
```

## How It Works

1. **Parameter UI**: Sliders and color pickers set shader parameters
2. **Shader Generation**: JavaScript generates GLSL code based on parameters
3. **WebGL Rendering**: Generated shader renders full-screen in real-time
4. **Live Updates**: Changes trigger immediate shader recompilation
5. **Export**: Current shader code can be exported as `.frag` file

## Technical Details

### Generated Uniforms

All created shaders include these uniforms:

```glsl
uniform float iTime;              // Current time
uniform vec2 iResolution;         // Screen resolution
uniform float speed;              // Speed multiplier
uniform float complexity;         // Pattern complexity
uniform float scale;              // Zoom level
uniform vec3 color1;              // First color (RGB)
uniform vec3 color2;              // Second color (RGB)
uniform vec3 color3;              // Third color (RGB)
uniform float colorIntensity;     // Color saturation
uniform float colorShift;         // Hue rotation
uniform float distortion;         // Pattern distortion
uniform int symmetry;             // Symmetry count
uniform float glow;               // Glow intensity
uniform float brightness;         // Brightness multiplier
```

### Shader Template

Each effect type has a unique algorithm that responds to the parameters above. The final shader applies color adjustments, glow, and brightness uniformly across all effects.

## Use Cases

- **VJ Loops**: Create animated backgrounds for live performances
- **Game Assets**: Generate shader effects for games
- **Art Projects**: Create generative art with shaders
- **Learning**: Understand shader programming without coding
- **Wallpapers**: Export and use as animated desktop backgrounds
- **Web Backgrounds**: Use generated shaders in web projects

## Exporting Shaders

When you click **Export .frag**, the app generates a complete GLSL fragment shader file including:

- All uniform declarations
- Your chosen effect algorithm
- Color processing and post-effects
- The shader is ready to use in ShaderToy, Unity, or other WebGL applications

**Note**: Exported shaders include the uniform values as declarations but rely on the host application to pass uniform values at runtime.

## FAQ

**Q: Can I write custom shader code?**
A: No, this is a no-code editor. All shaders are generated from UI parameters.

**Q: Can I save my parameters?**
A: Currently, parameters aren't saved. Use the Export button to save the generated shader code.

**Q: Why is my FPS low?**
A: Try reducing Complexity or choosing simpler effects like Plasma or Waves.

**Q: Can I use exported shaders commercially?**
A: Yes! Generated shaders are yours to use however you like.

**Q: How do I get the shader into my game/app?**
A: Export the .frag file and integrate it into your WebGL, Three.js, Unity, or other shader pipeline.

## Advanced: Using Exported Shaders

### In Three.js

```javascript
const material = new THREE.ShaderMaterial({
    uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(width, height) },
        // ... add other uniforms
    },
    fragmentShader: `/* paste exported shader here */`,
    // ... vertex shader
});
```

### In ShaderToy

Replace ShaderToy's uniforms (`iTime`, `iResolution`) with your exported shader's code and add sliders for custom uniforms.

### In Unity

Convert the shader to Unity's shader syntax or use as a compute shader with appropriate uniform mapping.

## Contributing

Found a bug or want to suggest a new effect? This is an open-source project - contributions welcome!

## License

Free to use for personal and commercial projects.

---

**Create Beautiful Shaders Visually** 🎨✨

No code. Just creativity.
