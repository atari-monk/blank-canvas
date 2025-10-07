import type { Render } from "zippy-shared";

export interface FrameTime {
    deltaTime: number;
    totalTime: number;
    lastTime: number;
}

export interface RenderLoop {
    start: () => void;
    stop: () => void;
    switchRender: (newRender: Render) => void;
}
