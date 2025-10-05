import type { Render } from "zippy-shared-lib";

export interface FrameTime {
    deltaTime: number;
    totalTime: number;
    lastTime: number;
}

export interface CanvasRenderLoop {
    start: () => void;
    stop: () => void;
    switchRenderer: (newRenderer: Render) => void;
}

export interface AnimatedCanvasContainer extends HTMLElement {
    switchRenderer: (renderer: Render) => void;
    cleanup: () => void;
}
