// Import styles
import "./style.css";
import "./canvas.css";
import "./fullscreen-button.css";

// Export main creation function
export { createAnimatedCanvas } from "./create-anim-canvas";

// Export renderer examples (optional - for demo purposes)
export { HelloCanvas } from "./hello-canvas";
export { ResizeTest } from "./resize-test";
export { RotatingRect } from "./rotating-rect";

// Export types
export type {
    FrameTime,
    CanvasRenderLoop,
    AnimatedCanvasContainer,
} from "./types";
