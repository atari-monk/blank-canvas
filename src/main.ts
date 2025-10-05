import "./style.css";
import "./canvas.css";
import "./fullscreen-button.css";
import { createAnimatedCanvas } from "./create-anim-canvas";
import { HelloCanvas } from "./hello-canvas";
import { ResizeTest } from "./resize-test";
import { RotatingRect } from "./rotating-rect";

const renders = [
    { name: "Hello", instance: new HelloCanvas() },
    { name: "Resize", instance: new ResizeTest() },
    { name: "Rect", instance: new RotatingRect() },
];

let currentIndex = 0;
const canvasComponent = createAnimatedCanvas(renders[0].instance);

// Create simple button
const switchButton = document.createElement("button");
switchButton.textContent = `Switch to ${renders[1].name}`;
switchButton.style.cssText = `
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1000;
  padding: 8px 12px;
`;

switchButton.onclick = () => {
    currentIndex = (currentIndex + 1) % renders.length;

    canvasComponent.switchRenderer(renders[currentIndex].instance);

    switchButton.textContent = `Switch to ${
        renders[(currentIndex + 1) % renders.length].name
    }`;
};

document.getElementById("root")?.appendChild(canvasComponent);
document.getElementById("root")?.appendChild(switchButton);
