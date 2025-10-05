# Zippy Canvas Library

A lightweight, responsive canvas animation library for creating dynamic, full-screen HTML5 Canvas applications with automatic resizing and smooth rendering.

## Features

- 🎨 **Responsive Canvas** - Automatically adjusts to container size with proper pixel ratio handling
- 🔄 **Smooth Animation Loop** - Optimized requestAnimationFrame-based rendering
- 📱 **Fullscreen Support** - Touch device detection and fullscreen toggle
- 🎯 **Renderer Switching** - Hot-swap renderers without losing state
- ⚡ **TypeScript Ready** - Fully typed for better development experience
- 🎪 **Demo Renderers** - Includes example renderers for testing and learning

## Installation

```bash
npm install zippy-canvas
```

## Quick Start

```typescript
import { createAnimatedCanvas, HelloCanvas } from 'zippy-canvas';

// Create a canvas with a renderer
const canvas = createAnimatedCanvas(new HelloCanvas());

// Add to your page
document.getElementById('app')?.appendChild(canvas);
```

## Basic Usage

### Creating a Custom Renderer

```typescript
import type { Render, Frame } from 'zippy-canvas';

export class MyRenderer implements Render {
    init(frame: Frame) {
        // Initialize your renderer
        // This runs once when the renderer starts
    }

    render(frame: Frame) {
        const { ctx, width, height, deltaTime } = frame;
        
        // Your rendering logic here
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, width, height);
    }
}

// Use your custom renderer
const canvas = createAnimatedCanvas(new MyRenderer());
```

### Switching Between Renderers

```typescript
import { createAnimatedCanvas, HelloCanvas, RotatingRect } from 'zippy-canvas';

const canvas = createAnimatedCanvas(new HelloCanvas());
const rotatingRect = new RotatingRect();

// Switch renderers dynamically
canvas.switchRenderer(rotatingRect);
```

## API Reference

### Core Functions

#### `createAnimatedCanvas(renderer: Render): AnimatedCanvasContainer`
Creates a new canvas container with the specified renderer.

#### `setupCanvasResizer(canvas: HTMLCanvasElement): void`
Sets up automatic canvas resizing based on container dimensions.

#### `createCanvasRenderLoop(canvas: HTMLCanvasElement, renderer: Render): CanvasRenderLoop`
Creates an animation loop for the canvas.

### Interfaces

#### `Render`
```typescript
interface Render {
    init(frame: Frame): void;
    render(frame: Frame): void;
}
```

#### `Frame`
```typescript
interface Frame {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    deltaTime: number;
    totalTime: number;
}
```

#### `AnimatedCanvasContainer`
Extends HTMLElement with additional methods:
- `switchRenderer(renderer: Render): void` - Switch to a new renderer
- `cleanup(): void` - Stop the animation and clean up

## Included Demo Renderers

### HelloCanvas
Displays a gradient background with "Hello Canvas!" text in the center.

### ResizeTest
A comprehensive test pattern that helps verify canvas resizing behavior:
- Grid overlay with coordinates
- Corner and edge markers
- Dimension display
- Crosshair for center alignment

### RotatingRect
A colorful rotating rectangle with trail effects, demonstrating animation basics.

## Advanced Usage

### Handling Resize Events

```typescript
class MyResponsiveRenderer implements Render {
    private centerX = 0;
    private centerY = 0;

    init(frame: Frame) {
        this.handleResize(frame.width, frame.height);
        
        // Listen for resize events
        frame.ctx.canvas.addEventListener('canvas-resized', (event) => {
            const { width, height } = (event as CustomEvent).detail;
            this.handleResize(width, height);
        });
    }

    private handleResize(width: number, height: number) {
        this.centerX = width / 2;
        this.centerY = height / 2;
    }

    render(frame: Frame) {
        // Use this.centerX, this.centerY in your rendering
    }
}
```

### Using Time-based Animations

```typescript
class AnimatedRenderer implements Render {
    private rotation = 0;

    render(frame: Frame) {
        const { ctx, width, height, deltaTime } = frame;
        
        // Use deltaTime for smooth, frame-rate independent animations
        this.rotation += deltaTime * 2; // 2 radians per second
        
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(this.rotation);
        ctx.fillRect(-50, -50, 100, 100);
        ctx.restore();
    }
}
```

## CSS Customization

The library includes minimal CSS for full-screen display. You can customize the appearance:

```css
.canvas-container {
    /* Override default black background */
    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
}

.fullscreen-button {
    /* Customize the fullscreen button */
    background-color: rgba(255, 255, 255, 0.2);
    border: 2px solid white;
}
```

## Building from Source

```bash
# Clone the repository
git clone <repository-url>
cd zippy-canvas

# Install dependencies with pnpm (recommended)
pnpm install

# Or with npm
npm install

# Development server
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm type-check
```

## Browser Support

- Modern browsers with ES6+ support
- Canvas API support required
- Fullscreen API for fullscreen functionality

## Performance Tips

1. **Reuse objects** - Avoid creating new objects in the render loop
2. **Use deltaTime** - For frame-rate independent animations
3. **Minimize context state changes** - Batch similar operations
4. **Use transform** - Instead of redrawing at new positions

## License

MIT License - feel free to use in personal and commercial projects.

---

For more examples and advanced usage, check the source code and demo implementations included in the package.