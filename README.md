# Shader Studio

A minimal no-code shader creator for generating water-based thinking animations. Designed for the Ash AI therapy mobile app, these shaders artistically simulate different modes of thinking through water metaphors.

## Overview

Create calming, contemplative shader backgrounds that represent thinking as water - flowing, rippling, reflecting. Features 6 unique water-based presets with stepped controls and curated color harmonies that always look beautiful.

## Features

- **6 Water-Based Thinking Modes** - Each preset simulates a different way of thinking through water behavior
- **Icon-Based Preset Selection** - Visual buttons with symbolic icons for each mode
- **Stepped Controls** - Discrete button controls instead of sliders for better results
- **Curated Color Harmonies** - 6 pre-designed palettes that always work well together
- **Technical Aesthetic** - Minimal black/white UI with conservative blue accents
- **Full-Screen Preview** - Immersive shader background with right sidebar controls
- **Real-Time Updates** - See changes instantly as you adjust controls
- **Export Functionality** - Save generated shaders as .frag files

## Quick Start

1. Open `index.html` in a modern web browser
2. Select a thinking mode by clicking one of the 6 preset buttons
3. Adjust Flow, Depth, and Movement using stepped button controls
4. Choose a color harmony from the 6 curated palettes
5. Use Play/Pause and Reset Time controls as needed
6. Export your shader when satisfied

No installation or build process required.

## Water-Based Thinking Modes

### 1. Ripples (◯)
**Thoughts spreading outward**
- Concentric ripples emanating from center
- Multiple overlapping wave patterns
- Represents ideas radiating outward from a central insight
- Good for: Initial exploration, brainstorming

### 2. Current (≋)
**Directional thinking**
- Flowing horizontal current with vertical variation
- Consistent directional movement
- Represents focused, goal-directed thought
- Good for: Problem-solving, linear reasoning

### 3. Deep (●)
**Layered stratified thinking**
- Multiple depth layers with distinct characteristics
- Stratified water patterns
- Represents complex, multi-level analysis
- Good for: Deep reflection, analyzing complexity

### 4. Surface (∼)
**Scattered light thoughts**
- Dancing light reflections on water surface
- Shimmering, scattered patterns
- Represents quick, surface-level ideation
- Good for: Fast thinking, first impressions

### 5. Tide (⟍)
**Rhythmic cyclical thinking**
- Slow, rhythmic tidal movement
- Diagonal flow patterns
- Represents cyclic thought processes
- Good for: Meditation, pattern recognition

### 6. Reflect (◇)
**Introspective mirror thinking**
- Radial mirror-like reflection patterns
- Symmetrical arrangements
- Represents self-reflection and introspection
- Good for: Self-awareness, contemplation

## Color Harmonies

Six curated color palettes designed to always work well together. Each harmony contains three colors that complement each other beautifully.

### 1. Ash Warmth
- #E67E50 (Warm Coral)
- #7D8F69 (Sage Green)
- #F5A962 (Golden Orange)
- **Character**: Brand-aligned warmth with natural balance

### 2. Ocean Deep
- #4A90A4 (Deep Teal)
- #5AB1BB (Turquoise)
- #2D5F6D (Dark Ocean)
- **Character**: Cool, calming water depths

### 3. Forest Moss
- #6B8F71 (Forest Green)
- #8FA888 (Soft Moss)
- #4A6B52 (Deep Moss)
- **Character**: Natural, grounded earth tones

### 4. Sunset Glow
- #E88D67 (Peach)
- #9B6B9E (Soft Purple)
- #F4A261 (Warm Amber)
- **Character**: Warm evening light

### 5. Moonlight
- #7B8FA3 (Cool Blue-Gray)
- #A8B5C7 (Soft Lavender)
- #4E5D6C (Deep Night)
- **Character**: Cool, serene nighttime

### 6. Earth & Sky
- #9B7E6F (Warm Earth)
- #6B8FA3 (Sky Blue)
- #C4A57B (Golden Earth)
- **Character**: Balance of earth and air

## Stepped Controls

Instead of continuous sliders, Shader Studio uses discrete stepped controls that map to carefully tuned values. This ensures every combination produces beautiful results.

### Flow (4 Steps)
Controls animation speed and temporal dynamics:
- **Still** (0): Minimal animation (speed: 0.2)
- **Gentle** (1): Slow, calm movement (speed: 0.5)
- **Moderate** (2): Comfortable pace (speed: 1.0)
- **Active** (3): Energetic flow (speed: 1.8)

### Depth (3 Steps)
Controls pattern complexity and layering:
- **Shallow** (0): Simple, clear patterns (complexity: 0.8)
- **Medium** (1): Balanced detail (complexity: 1.2)
- **Deep** (2): Rich, complex layers (complexity: 2.0)

### Movement (3 Steps)
Controls pattern intensity and variation:
- **Calm** (0): Gentle, subtle variation (intensity: 0.6)
- **Flowing** (1): Natural movement (intensity: 1.0)
- **Dynamic** (2): Energetic variation (intensity: 1.5)

## Controls

### Thinking Mode Presets
Click any of the 6 preset buttons to switch between water-based thinking modes. Active preset is highlighted with blue accent.

### Stepped Parameters
Click buttons in each control section to adjust:
- **Flow**: Still → Gentle → Moderate → Active
- **Depth**: Shallow → Medium → Deep
- **Movement**: Calm → Flowing → Dynamic

### Color Harmonies
Click any harmony button to apply a curated 3-color palette. Visual swatches show the colors before applying.

### Action Buttons
- **RESET TIME**: Reset animation to t=0
- **PAUSE/PLAY**: Toggle animation playback
- **EXPORT .FRAG**: Download GLSL shader code

## Design Philosophy

### Water as Thinking
- Water metaphors represent different cognitive modes
- Flow, depth, and movement mirror thought processes
- Each preset has unique character and purpose
- Visual representation of mental states
- Calming yet engaging animations

### Curated Simplicity
- Stepped controls prevent overwhelming choices
- Pre-designed color harmonies ensure good results
- No "bad" combinations possible
- Creative control within guided boundaries
- Focus on exploration, not technical tuning

### Technical Aesthetic
- Monospace Monaco/Courier New typography
- Black background with subtle white/gray UI elements
- Conservative use of blue accent color (rgba(100, 180, 255))
- Icon-based preset selection
- Minimal visual hierarchy

### Therapeutic Focus
- Designed for calm, supportive backgrounds
- Water themes promote contemplation
- Color harmonies create emotional safety
- Professional aesthetic for healthcare
- Accessible to non-technical users

## Use in Ash AI Therapy App

These shaders are specifically designed as contemplative backgrounds for Ash:

- **Thinking Metaphors**: Water-based animations represent different mental states
- **Accessible**: No-code interface appropriate for all users
- **Curated**: Color harmonies include Ash brand palette options
- **Supportive**: Water themes promote calm reflection
- **Natural**: Organic movements mirror breathing and thought
- **Professional**: Appropriate for therapeutic context
- **Performance**: Optimized for mobile devices

## Technical Details

### Generated Uniforms

All shaders include:
```glsl
uniform float iTime;              // Animation time
uniform vec2 iResolution;         // Canvas resolution
uniform float speed;              // From Flow control (0.2 - 1.8)
uniform float complexity;         // From Depth control (0.8 - 2.0)
uniform float intensity;          // From Movement control (0.6 - 1.5)
uniform vec3 color1;              // First harmony color
uniform vec3 color2;              // Second harmony color
uniform vec3 color3;              // Third harmony color
```

### Stepped Parameter Mapping

**Flow → Speed**
- Still (0): 0.2
- Gentle (1): 0.5
- Moderate (2): 1.0
- Active (3): 1.8

**Depth → Complexity**
- Shallow (0): 0.8
- Medium (1): 1.2
- Deep (2): 2.0

**Movement → Intensity**
- Calm (0): 0.6
- Flowing (1): 1.0
- Dynamic (2): 1.5

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

Each water-based thinking mode is designed with distinct visual character:

- **Ripples**: Concentric waves spreading outward - exploratory, expansive thinking
- **Current**: Directional flow - focused, goal-oriented thought
- **Deep**: Stratified layers - complex, multi-level analysis
- **Surface**: Scattered shimmer - quick, surface-level ideation
- **Tide**: Rhythmic cycles - meditative, pattern-based thinking
- **Reflect**: Radial symmetry - introspective, self-examining thought

All modes use water behaviors to create calming yet engaging animations that represent different cognitive states. The metaphor helps users connect with their thinking process visually.

## License

Free to use for personal and commercial projects.

---

**Shader Studio** - Water-based thinking animations for Ash AI Therapy App
