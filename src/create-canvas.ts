import type { Render } from "zippy-shared";
import { createLoop } from "./create-loop";
import type { RenderLoop } from "./types";

/*

*/
export function createCanvas(
    renderer: Render,
    showFullscreenBtn = false
): {
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    renderLoop: RenderLoop;
} {
    const container = document.createElement("div");
    container.className = "canvas-container";

    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    setupResizer(canvas);

    const isMobile = "ontouchstart" in window;
    if (isMobile || showFullscreenBtn) setupFullscreenButton(container);

    const renderLoop = createLoop(canvas, renderer);

    return { container, canvas, renderLoop };
}

function setupResizer(canvas: HTMLCanvasElement): void {
    const resize = () => {
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width;
        canvas.height = rect.height;

        canvas.dispatchEvent(new CustomEvent("canvas-resized"));
    };

    new ResizeObserver(resize).observe(canvas);

    resize();
}

/* 
Automatically removes the button once fullscreen is entered
*/
function setupFullscreenButton(container: HTMLElement): void {
    const button = document.createElement("button");
    button.textContent = "⛶ Fullscreen";
    button.className = "fullscreen-button";
    button.classList.toggle("visible", document.fullscreenElement === null);

    button.onclick = () => container.requestFullscreen();
    document.onfullscreenchange = () => button.remove();

    container.appendChild(button);
}
