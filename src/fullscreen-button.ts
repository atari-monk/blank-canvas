export function setupFullscreenButton(container: HTMLElement): void {
    if (!checkTouchDevice() && document.fullscreenElement) return;

    const button = createButton();
    container.appendChild(button);

    const updateButton = () => {
        const isFullscreen = document.fullscreenElement !== null;
        button.textContent = isFullscreen
            ? "Exit Fullscreen"
            : "Enter Fullscreen";
        button.classList.toggle("visible", !isFullscreen);
    };

    button.addEventListener("click", () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            container.requestFullscreen();
        }
    });

    document.addEventListener("fullscreenchange", updateButton);
    updateButton();
}

function checkTouchDevice(): boolean {
    return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
    );
}

function createButton(): HTMLButtonElement {
    const button = document.createElement("button");
    button.className = "fullscreen-button";
    button.textContent = "Enter Fullscreen";
    return button;
}
