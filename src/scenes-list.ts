import { HelloCanvas } from "./render/hello-canvas";
import { ResizeTest } from "./render/resize-test";
import { RotatingRect } from "./render/rotating-rect";

export const SceneID = {
    HelloCanvas: "hello-canvas",
    ResizeTest: "resize-test",
    RotatingRect: "rotating-rect",
} as const;

export type SceneID = (typeof SceneID)[keyof typeof SceneID];

export function getScenes(): Record<SceneID, any> {
    return {
        [SceneID.HelloCanvas]: new HelloCanvas(),
        [SceneID.ResizeTest]: new ResizeTest(),
        [SceneID.RotatingRect]: new RotatingRect(),
    };
}
