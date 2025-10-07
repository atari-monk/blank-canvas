import "./style.css";
import "./canvas.css";
import "./fullscreen-button.css";
import { createCanvas } from "./create-canvas";
import { HelloCanvas } from "./hello-canvas";
import { ResizeTest } from "./resize-test";
import { RotatingRect } from "./rotating-rect";

const renders = [
    { name: "Hello", instance: new HelloCanvas() },
    { name: "Resize", instance: new ResizeTest() },
    { name: "Rect", instance: new RotatingRect() },
];

let currentIndex = 0;
const { container, canvas, renderLoop } = createCanvas(renders[0].instance, false);

const switchButton = document.createElement("button");
switchButton.textContent = `➡️ ${renders[1].name}`;
switchButton.style.cssText = `
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1000;
  padding: 8px 12px;
`;

switchButton.onclick = () => {
    currentIndex = (currentIndex + 1) % renders.length;

    renderLoop.switchRender(renders[currentIndex].instance);

    switchButton.textContent = `➡️ ${
        renders[(currentIndex + 1) % renders.length].name
    }`;
};

document.getElementById("root")?.appendChild(container);
document.getElementById("root")?.appendChild(switchButton);

const startOnReady = () => {
    renderLoop.start();
    canvas.removeEventListener("canvas-resized", startOnReady);
};

canvas.addEventListener("canvas-resized", startOnReady);
