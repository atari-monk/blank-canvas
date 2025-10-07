# Zippy Canvas Library

A lightweight, responsive canvas animation library for creating dynamic, full-screen HTML5 Canvas applications with automatic resizing and smooth rendering.

## Features

- 🎨 **Responsive Canvas** - Automatically adjusts to container size
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
import { createCanvas, HelloCanvas } from 'zippy-canvas';

// Create a canvas with a renderer
const { container, renderLoop } = createCanvas(new HelloCanvas());

// Add to your page
document.getElementById('app')?.appendChild(container);

// Start the animation loop
renderLoop.start();
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
const { container, renderLoop } = createCanvas(new MyRenderer());
document.body.appendChild(container);
renderLoop.start();
```

### Switching Between Renderers

```typescript
import { createCanvas, HelloCanvas, RotatingRect } from 'zippy-canvas';

const renders = [
    new HelloCanvas(),
    new RotatingRect()
];

const { container, renderLoop } = createCanvas(renders[0]);
document.body.appendChild(container);
renderLoop.start();

// Switch to another renderer
renderLoop.switchRender(renders[1]);
```

## API Reference

### Core Functions

#### `createCanvas(renderer: Render, showFullscreenBtn?: boolean)`
Creates a new canvas container with the specified renderer.

Returns:
- `container: HTMLDivElement` - The canvas container element
- `canvas: HTMLCanvasElement` - The canvas element
- `renderLoop: RenderLoop` - The animation loop controller

#### `RenderLoop`
```typescript
interface RenderLoop {
    start: () => void;
    stop: () => void;
    switchRender: (newRender: Render) => void;
}
```

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
        this.handleResize(frame.ctx);
        
        // Listen for resize events
        frame.ctx.canvas.addEventListener('canvas-resized', () => {
            this.handleResize(frame.ctx);
        });
    }

    private handleResize(ctx: CanvasRenderingContext2D) {
        const { width, height } = ctx.canvas;
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

## Example Implementation

Here's a complete example showing how to use the library with renderer switching:

```typescript
import { createCanvas, HelloCanvas, ResizeTest, RotatingRect } from 'zippy-canvas';

const renders = [
    { name: "Hello", instance: new HelloCanvas() },
    { name: "Resize", instance: new ResizeTest() },
    { name: "Rect", instance: new RotatingRect() },
];

let currentIndex = 0;
const { container, canvas, renderLoop } = createCanvas(renders[0].instance, false);

// Create a button to switch between renderers
const switchButton = document.createElement("button");
switchButton.textContent = `➡️ ${renders[1].name}`;
switchButton.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 1000;
    padding: 8px 12px;
`;

switchButton.onclick = () => {
    currentIndex = (currentIndex + 1) % renders.length;
    renderLoop.switchRender(renders[currentIndex].instance);
    switchButton.textContent = `➡️ ${renders[(currentIndex + 1) % renders.length].name}`;
};

document.body.appendChild(container);
document.body.appendChild(switchButton);

// Start the animation when canvas is ready
const startOnReady = () => {
    renderLoop.start();
    canvas.removeEventListener("canvas-resized", startOnReady);
};

canvas.addEventListener("canvas-resized", startOnReady);
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