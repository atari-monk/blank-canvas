import type { FrameTime } from "./types";

export const calculateTime = (
    lastTime: number,
    totalTime: number,
    currentTime: number
): FrameTime => {
    const deltaTime = lastTime === 0 ? 0 : (currentTime - lastTime) / 1000;
    return {
        deltaTime,
        totalTime: totalTime + deltaTime,
        lastTime: currentTime,
    };
};
