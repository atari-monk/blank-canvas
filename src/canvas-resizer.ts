export function setupCanvasResizer(canvas: HTMLCanvasElement): void {
    let timer: number;
    let lastWidth = 0,
        lastHeight = 0;

    canvas.style.width = canvas.style.height = "100%";

    const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const pr = window.devicePixelRatio || 1;
        const w = Math.floor(rect.width * pr);
        const h = Math.floor(rect.height * pr);

        if (w > 0 && h > 0 && (w !== lastWidth || h !== lastHeight)) {
            canvas.width = lastWidth = w;
            canvas.height = lastHeight = h;
            canvas.dispatchEvent(
                new CustomEvent("canvas-resized", {
                    detail: { width: w, height: h, pixelRatio: pr },
                })
            );
        }
    };

    new ResizeObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(resize, 100);
    }).observe(canvas);

    // Use DOMContentLoaded instead of load for faster initialization
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        // Already loaded, resize immediately
        resize();
    } else {
        // Wait for DOM to be ready (faster than window.load)
        document.addEventListener('DOMContentLoaded', resize);
    }
    
    // Fallback for cases where DOMContentLoaded might be too early
    setTimeout(resize, 0);
}