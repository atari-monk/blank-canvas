import type { Frame, Render } from "zippy-shared-lib";

export class HelloCanvas implements Render {
    private gradient: CanvasGradient | null = null;
    private positions = {
        text: { x: 0, y: 0 },
    };

    init(frame: Frame) {
        this.handleResize(frame.width, frame.height, frame.ctx);

        const handleCanvasResized = (event: Event) => {
            const customEvent = event as CustomEvent<{
                width: number;
                height: number;
                pixelRatio: number;
            }>;
            this.handleResize(
                customEvent.detail.width,
                customEvent.detail.height,
                frame.ctx
            );
        };

        frame.ctx.canvas.addEventListener(
            "canvas-resized",
            handleCanvasResized
        );
    }

    private handleResize(
        width: number,
        height: number,
        ctx: CanvasRenderingContext2D
    ) {
        this.gradient = ctx.createLinearGradient(0, 0, width, height);
        this.gradient.addColorStop(0, "#ff6b6b");
        this.gradient.addColorStop(1, "#4ecdc4");

        this.positions.text.x = width / 2;
        this.positions.text.y = height / 2;
    }

    render(frame: Frame) {
        const { ctx, width, height } = frame;

        ctx.fillStyle = this.gradient!;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = "white";
        ctx.font = "48px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
            "Hello Canvas!",
            this.positions.text.x,
            this.positions.text.y
        );
    }
}
