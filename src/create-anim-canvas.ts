import type { Render } from "zippy-shared-lib";
import { setupCanvasResizer } from "./canvas-resizer";
import { setupFullscreenButton } from "./fullscreen-button";
import { createCanvasRenderLoop } from "./render-loop";
import type { AnimatedCanvasContainer } from "./types";

export function createAnimatedCanvas(
    renderer: Render
): AnimatedCanvasContainer {
    const container = document.createElement("div") as unknown as AnimatedCanvasContainer;
    container.className = "canvas-container";

    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    setupCanvasResizer(canvas);
    setupFullscreenButton(container);

    const renderLoop = createCanvasRenderLoop(canvas, renderer);

    const startOnReady = () => {
        renderLoop.start();
        canvas.removeEventListener("canvas-resized", startOnReady);
    };

    canvas.addEventListener("canvas-resized", startOnReady);

    // Try immediate start
    if (canvas.width > 0 && canvas.height > 0) {
        setTimeout(() => renderLoop.start(), 100);
    }

    // Add methods
    (container as any).switchRenderer = renderLoop.switchRenderer;
    (container as any).cleanup = renderLoop.stop;

    return container;
}
