import type { Frame, Render } from "zippy-shared-lib";
import { calculateTime } from "./time.js";
import type { CanvasRenderLoop, FrameTime } from "./types.js";

export const createCanvasRenderLoop = (
    canvas: HTMLCanvasElement,
    initialRenderer: Render
): CanvasRenderLoop => {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not available");

    let timeState: FrameTime = { lastTime: 0, totalTime: 0, deltaTime: 0 };
    let rafId: number = 0;
    let currentRenderer = initialRenderer;

    const getFrame = (): Frame => ({
        ctx,
        width: canvas.width,
        height: canvas.height,
        deltaTime: timeState.deltaTime,
        totalTime: timeState.totalTime,
    });

    currentRenderer.init(getFrame());

    const tick = (currentTime: number) => {
        timeState = calculateTime(
            timeState.lastTime,
            timeState.totalTime,
            currentTime
        );

        const frame = getFrame();
        ctx.clearRect(0, 0, frame.width, frame.height);
        currentRenderer.render(frame);
        rafId = requestAnimationFrame(tick);
    };

    const start = () => {
        timeState = { lastTime: 0, totalTime: 0, deltaTime: 0 };
        rafId = requestAnimationFrame(tick);
    };

    const stop = () => cancelAnimationFrame(rafId);

    const switchRenderer = (newRenderer: Render) => {
        currentRenderer = newRenderer;
        // Re-initialize with current dimensions
        currentRenderer.init(getFrame());
        // Force a re-render by triggering resize event
        canvas.dispatchEvent(
            new CustomEvent("canvas-resized", {
                detail: {
                    width: canvas.width,
                    height: canvas.height,
                    pixelRatio: window.devicePixelRatio || 1,
                },
            })
        );
    };

    return { start, stop, switchRenderer };
};