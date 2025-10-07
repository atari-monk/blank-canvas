import type { Frame, Render } from "zippy-shared";
import type { RenderLoop, FrameTime } from "./types.js";

export const createLoop = (
    canvas: HTMLCanvasElement,
    initialRenderer: Render
): RenderLoop => {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not available");

    let time: FrameTime = { lastTime: 0, totalTime: 0, deltaTime: 0 };
    let rafId: number = 0;
    let renderer = initialRenderer;

    const getFrame = (): Frame => ({
        ctx,
        width: canvas.width,
        height: canvas.height,
        deltaTime: time.deltaTime,
        totalTime: time.totalTime,
    });

    renderer.init(getFrame());

    const tick = (currentTime: number) => {
        const deltaTime =
            time.lastTime === 0 ? 0 : (currentTime - time.lastTime) / 1000;
        time = {
            deltaTime,
            totalTime: time.totalTime + deltaTime,
            lastTime: currentTime,
        };

        renderer.render(getFrame());
        rafId = requestAnimationFrame(tick);
    };

    const start = () => {
        time = { lastTime: 0, totalTime: 0, deltaTime: 0 };
        rafId = requestAnimationFrame(tick);
    };

    const stop = () => cancelAnimationFrame(rafId);

    const switchRender = (newRenderer: Render) => {
        renderer = newRenderer;
        renderer.init(getFrame());
        canvas.dispatchEvent(new CustomEvent("canvas-resized"));
    };

    return { start, stop, switchRender };
};
