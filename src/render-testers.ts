import type { RenderLoop } from "./types";
import { createCanvas } from "./create-canvas";
import { getScenes, SceneID } from "./scenes-list";

export function setupCanvasRender(id: SceneID) {
    const scenes = getScenes();
    const scene = scenes[id];

    if (!scene) {
        console.error(`Scene with id "${id}" not found.`);
        return;
    }

    const canvasObj = createCanvas(scene);
    document.getElementById("root")?.appendChild(canvasObj.container);
    canvasObj.renderLoop.start();
}

export function setupCanvasRenderCollection(initialScene?: SceneID) {
    const scenes = getScenes();
    const sceneIds = Object.keys(scenes) as SceneID[];

    let currentIndex = initialScene ? sceneIds.indexOf(initialScene) : 0;
    if (currentIndex === -1) {
        console.warn(`Scene "${initialScene}" not found, using first scene`);
        currentIndex = 0;
    }

    const { container, canvas, renderLoop } = createCanvas(
        scenes[sceneIds[currentIndex]],
        false
    );

    document.getElementById("root")?.appendChild(container);
    document
        .getElementById("root")
        ?.appendChild(
            createSwitchButton(sceneIds, currentIndex, renderLoop, scenes)
        );

    const startOnReady = () => {
        renderLoop.start();
        canvas.removeEventListener("canvas-resized", startOnReady);
    };

    canvas.addEventListener("canvas-resized", startOnReady);
}

function createSwitchButton(
    sceneIds: SceneID[],
    currentIndex: number,
    renderLoop: RenderLoop,
    scenes: Record<SceneID, any>
) {
    const switchButton = document.createElement("button");
    switchButton.className = "scene-switcher-btn";
    updateButtonText(switchButton, sceneIds, currentIndex);

    switchButton.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 1000;
        padding: 8px 12px;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
        font-family: inherit;
    `;

    switchButton.onclick = () => {
        currentIndex = (currentIndex + 1) % sceneIds.length;
        const nextSceneId = sceneIds[currentIndex];
        renderLoop.switchRender(scenes[nextSceneId]);
        updateButtonText(switchButton, sceneIds, currentIndex);
    };

    return switchButton;
}

function updateButtonText(
    button: HTMLButtonElement,
    sceneIds: SceneID[],
    currentIndex: number
) {
    const nextIndex = (currentIndex + 1) % sceneIds.length;
    button.textContent = `➡️ ${sceneIds[nextIndex]}`;
}
