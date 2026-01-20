# Shader Studio

A minimal no-code shader creator for generating therapeutic background animations. Designed with a technical black/white aesthetic for the Ash AI therapy mobile app.

## Overview

Create calming, professional shader backgrounds without writing code. Features 12 carefully curated therapeutic presets suitable for mental health and wellness applications.

## Features

- **12 Therapeutic Presets** - Curated shader effects designed for calm, focus, and wellbeing
- **No-Code Interface** - Visual controls with real-time preview
- **Technical Aesthetic** - Minimal black/white design with subtle blue accents
- **Full-Screen Preview** - Immersive shader background with right sidebar controls
- **Real-Time Adjustments** - See changes instantly as parameters are modified
- **Export Functionality** - Save generated shaders as .frag files

## Quick Start

1. Open `index.html` in a modern web browser
2. Select a preset from the dropdown
3. Adjust parameters using sliders
4. Customize colors with the color pickers
5. Export your shader when satisfied

No installation or build process required.

## Therapeutic Presets

### 1. Gentle Breath
Slow, centered breathing patterns. Ideal for meditation and breathing exercises.
- Mimics inhalation/exhalation cycles
- Calming radial waves
- Very slow, deliberate movement

### 2. Serene Flow
Soft flowing gradients with gentle transitions.
- Horizontal and vertical flow
- Smooth color blending
- Peaceful, continuous movement

### 3. Quiet Mind
Minimal, subtle movement for deep focus states.
- Almost imperceptible motion
- Quiet, contemplative aesthetic
- Perfect for concentration sessions

### 4. Ocean Calm
Gentle water-like wave patterns.
- Horizontal wave motion
- Soft, rhythmic movement
- Evokes peaceful seascape

### 5. Dawn Light
Soft light transitions from bottom to top.
- Gradual brightening effect
- Warm, hopeful aesthetic
- Vertical gradient movement

### 6. Evening Fade
Sunset-inspired gradient with gentle fading.
- Top-to-bottom gradient
- Calming evening colors
- Slow, peaceful transition

### 7. Meditation
Centered radial patterns with gentle pulsing.
- Concentric rings from center
- Subtle breathing rhythm
- Focus point for meditation

### 8. Balance
Symmetrical, harmonious patterns.
- Four-fold symmetry
- Balanced, stable aesthetic
- Represents equilibrium

### 9. Clarity
Clean, clear patterns with defined structure.
- Grid-like formations
- Sharp yet subtle
- Represents mental clarity

### 10. Peace
Very subtle, almost static background.
- Minimal movement
- Extremely gentle
- Pure tranquility

### 11. Focus
Centered focus point with radial fade.
- Strong center, soft edges
- Directs attention inward
- Aids concentration

### 12. Tranquil
Soft ambient movement across the canvas.
- Gentle, wandering motion
- No sharp transitions
- Ambient, soothing

## Parameters

### Animation
- **Speed** (0-3): Controls animation speed
- **Intensity** (0.1-3): Pattern complexity and detail level
- **Scale** (0.1-5): Zoom level of the effect

### Colors
- **Color 1/2/3**: Three color pickers for gradient control
- **Intensity** (0-2): Overall color saturation

### Pattern
- **Distortion** (0-2): Pattern warping amount
- **Glow** (0-1): Radial glow intensity
- **Brightness** (0-2): Overall brightness level

## Controls

- **RANDOMIZE**: Generate random therapeutic shader
- **RESET TIME**: Reset animation to t=0
- **PAUSE/PLAY**: Toggle animation playback
- **EXPORT .FRAG**: Download GLSL shader code

## Design Philosophy

### Technical Aesthetic
- Monospace Monaco/Courier New typography
- Black background with subtle white/gray UI elements
- Conservative use of blue accent color (rgba(100, 180, 255))
- No gradients on UI elements
- Sharp, precise controls
- Minimal visual hierarchy

### Therapeutic Focus
- All presets designed for calm, non-distracting backgrounds
- Slow, deliberate movements (no jarring transitions)
- Dark color palettes suitable for extended viewing
- Brightness clamped to prevent eye strain
- Subtle, professional aesthetic appropriate for healthcare

## Use in Ash AI Therapy App

These shaders are specifically designed as background elements for a mental health application:

- **Non-Distracting**: Subtle enough to not interfere with foreground content
- **Calming**: Scientifically-informed patterns that promote relaxation
- **Professional**: Appropriate for healthcare/therapy context
- **Accessible**: Low contrast, not overwhelming
- **Performance**: Optimized for mobile devices

## Technical Details

### Generated Uniforms

All shaders include:
```glsl
uniform float iTime;              // Animation time
uniform vec2 iResolution;         // Canvas resolution
uniform float speed;              // Speed multiplier
uniform float complexity;         // Pattern intensity
uniform float scale;              // Zoom level
uniform vec3 color1;              // Primary color
uniform vec3 color2;              // Secondary color
uniform vec3 color3;              // Tertiary color
uniform float colorIntensity;     // Color saturation
uniform float distortion;         // Pattern distortion
uniform float glow;               // Glow intensity
uniform float brightness;         // Brightness multiplier
```

### Browser Compatibility

Requires WebGL support:
- Chrome/Edge 9+
- Firefox 4+
- Safari 5.1+
- Opera 12+

### Performance

All presets are optimized for:
- 60 FPS on modern mobile devices
- Low GPU usage
- Efficient shader compilation
- Minimal JavaScript overhead

## Project Structure

```
slingshot-shader-test/
├── index.html          # Main application
├── styles.css          # UI styling (technical aesthetic)
├── shader-editor.js    # Shader generation engine
└── README.md           # This file
```

## Exporting Shaders

Exported .frag files contain complete GLSL fragment shaders that can be integrated into:

- Mobile apps (iOS/Android with OpenGL ES)
- Web applications (Three.js, WebGL)
- Unity projects
- Game engines
- VJ software

The export includes all uniforms and requires the host application to provide uniform values at runtime.

## Color Palettes

Default therapeutic color palettes used in randomization:

**Palette 1 - Deep Navy**
- #1a1a2e, #16213e, #0f3460, #1b2631, #1c2833

**Palette 2 - Midnight Blue**
- #0a0e27, #1a237e, #283593, #1e1e2e, #191970

**Palette 3 - Charcoal**
- #0d1117, #161b22, #21262d, #1f2937, #111827

**Palette 4 - Indigo Night**
- #1a1a40, #1e1e3f, #25274d, #1b1b3a, #2c2c54

All palettes are designed for dark backgrounds suitable for extended viewing in therapy/wellness contexts.

## License

Free to use for personal and commercial projects.

---

**Shader Studio** - Therapeutic background generator for Ash AI Therapy App
