# Shader Studio

A minimal no-code shader creator for generating warm, earthy therapeutic background animations. Designed for the Ash AI therapy mobile app with brand-aligned colors and artistic direction.

## Overview

Create calming, visually prominent shader backgrounds using Ash's warm orange/coral and sage green color palette. Features 12 artistically curated presets that feel cohesive with the brand's earthy, natural aesthetic.

## Features

- **12 Brand-Aligned Presets** - Warm, earthy shaders using orange, coral, sage, and earth tones
- **Prominent Visual Presence** - More visible and engaging than traditional therapy backgrounds
- **Artistic Direction** - Each preset has a unique character (glow, waves, gradients, textures)
- **Technical Aesthetic** - Minimal black/white UI with conservative blue accents
- **Full-Screen Preview** - Immersive shader background with right sidebar controls
- **Real-Time Adjustments** - See changes instantly as parameters are modified
- **Export Functionality** - Save generated shaders as .frag files

## Quick Start

1. Open `index.html` in a modern web browser
2. Select a preset from the dropdown
3. Adjust parameters using sliders
4. Customize with brand color pickers
5. Export your shader when satisfied

No installation or build process required.

## Brand-Aligned Presets

### 1. Warm Glow
Radiant warmth emanating from the center with gentle pulsing.
- Central radial glow
- Soft pulsing animation
- Perfect for welcoming moments

### 2. Earth Rise
Rising gradient with organic wave movement.
- Bottom-to-top gradient
- Flowing horizontal waves
- Represents growth and progress

### 3. Sage Garden
Organic flowing patterns inspired by sage leaves.
- Soft, natural flow
- Green-dominant palette
- Calm, grounded feeling

### 4. Sunset Fade
Warm sunset gradient with soft shimmer.
- Top-to-bottom warm fade
- Gentle horizontal drift
- Evening calm aesthetic

### 5. Terracotta Dream
Earthy terracotta waves with layered texture.
- Crossing wave patterns
- Clay-like earth tones
- Warm, grounded presence

### 6. Golden Hour
Warm diffusion with subtle ray patterns.
- Radial rays of light
- Golden diffuse glow
- Uplifting and warm

### 7. Forest Path
Dappled light through forest canopy.
- Organic dappled patterns
- Green-forward palette
- Natural, peaceful movement

### 8. Amber Waves
Flowing amber warmth across the canvas.
- Wave interference patterns
- Honey-amber tones
- Smooth, continuous flow

### 9. Zen Stone
Concentric ripples like water on stone.
- Centered ripple patterns
- Meditative quality
- Calm, focused energy

### 10. Clay & Earth
Textured earth with clay-like qualities.
- Cross-hatched texture
- Raw earth aesthetic
- Organic, handcrafted feel

### 11. Meadow Breeze
Gentle breeze moving through a meadow.
- Soft flowing movement
- Green and warm tones
- Light, airy feeling

### 12. Inner Warmth
Core warmth radiating outward with rings.
- Central warmth source
- Gentle rings of energy
- Nurturing, safe feeling

## Brand Color Palette

### Primary Colors
- **Warm Coral**: #E67E50
- **Golden Orange**: #F5A962
- **Sage Green**: #7D8F69

### Extended Palette
**Warm Oranges & Corals**
- #E67E50, #F5A962, #FF8C42, #E8956C, #F4A261, #ED9455

**Sage & Olive Greens**
- #7D8F69, #6B7F5C, #8B9D6F, #73856A, #8A9B7A, #6F8062

**Earth Tones**
- #B89176, #A17F6B, #C4A578, #9B8169, #D4A574

**Creams & Warm Neutrals**
- #EDE8DC, #F5F1E8, #E8DCC8, #DDD5C7

## Parameters

### Animation
- **Speed** (0-3): Controls animation speed - Default: 0.6
- **Intensity** (0.1-3): Pattern complexity and detail - Default: 1.2
- **Scale** (0.1-5): Zoom level of the effect - Default: 1.0

### Colors
- **Color 1/2/3**: Three brand-aligned color pickers
- **Saturation** (0-2): Overall color intensity - Default: 1.2

### Pattern
- **Flow** (0-2): Pattern warping and movement - Default: 0.5
- **Glow** (0-1): Radial glow intensity - Default: 0.3
- **Brightness** (0-2): Overall brightness level - Default: 1.1

## Controls

- **RANDOMIZE**: Generate random brand-aligned shader
- **RESET TIME**: Reset animation to t=0
- **PAUSE/PLAY**: Toggle animation playback
- **EXPORT .FRAG**: Download GLSL shader code

## Design Philosophy

### Brand Alignment
- Warm, earthy color palette (orange, coral, sage, earth tones)
- Natural, organic movements
- More prominent than traditional therapy backgrounds
- Artistic direction for each preset
- Visually engaging while remaining calming

### Technical Aesthetic
- Monospace Monaco/Courier New typography
- Black background with subtle white/gray UI elements
- Conservative use of blue accent color (rgba(100, 180, 255))
- Sharp, precise controls
- Minimal visual hierarchy

### Therapeutic Focus
- Designed for calm, supportive backgrounds
- Moderate movement (not too slow, not jarring)
- Warm color palettes for comfort and safety
- Increased brightness for prominence (1.1 default)
- Professional aesthetic for healthcare

## Use in Ash AI Therapy App

These shaders are specifically designed as background elements for Ash:

- **Brand-Aligned**: Uses Ash's warm orange/coral and sage green palette
- **Prominent**: Visible and engaging without overwhelming foreground
- **Supportive**: Warm colors create feeling of safety and comfort
- **Natural**: Organic movements mirror nature and breathing
- **Professional**: Appropriate for therapeutic context
- **Performance**: Optimized for mobile devices

## Technical Details

### Generated Uniforms

All shaders include:
```glsl
uniform float iTime;              // Animation time
uniform vec2 iResolution;         // Canvas resolution
uniform float speed;              // Speed multiplier (default: 0.6)
uniform float complexity;         // Pattern intensity (default: 1.2)
uniform float scale;              // Zoom level (default: 1.0)
uniform vec3 color1;              // Primary color (E67E50)
uniform vec3 color2;              // Secondary color (F5A962)
uniform vec3 color3;              // Tertiary color (7D8F69)
uniform float colorIntensity;     // Color saturation (default: 1.2)
uniform float distortion;         // Pattern flow (default: 0.5)
uniform float glow;               // Glow intensity (default: 0.3)
uniform float brightness;         // Brightness multiplier (default: 1.1)
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
- React Native with expo-gl
- Flutter with custom shaders

The export includes all uniforms and requires the host application to provide uniform values at runtime.

## Artistic Direction

Each preset is designed with a specific mood and visual character:

- **Warm Glow / Inner Warmth**: Central, radiating warmth
- **Earth Rise / Sunset**: Gradient-based with directional flow
- **Sage Garden / Meadow Breeze**: Organic, flowing movement
- **Terracotta / Clay & Earth**: Textured, earthy quality
- **Golden Hour / Amber Waves**: Light and warmth diffusion
- **Forest Path**: Dappled, natural light patterns
- **Zen Stone**: Meditative, centered ripples

All presets maintain therapeutic qualities while being visually engaging enough to serve as prominent app backgrounds.

## License

Free to use for personal and commercial projects.

---

**Shader Studio** - Brand-aligned therapeutic backgrounds for Ash AI Therapy App
