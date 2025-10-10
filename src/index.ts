// Import styles
import "./style/style.css";
import "./style/canvas.css";
import "./style/fullscreen-button.css";

// Export main creation function
export { createCanvas } from "./create-canvas";

// Export renderer examples (optional - for demo purposes)
export { HelloCanvas } from "./render/hello-canvas";
export { ResizeTest } from "./render/resize-test";
export { RotatingRect } from "./render/rotating-rect";

// Export testers
export {
    setupCanvasRender,
    setupCanvasRenderCollection,
} from "./render-testers";

// Export types
export type { FrameTime, RenderLoop } from "./types";
