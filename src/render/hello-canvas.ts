import type { Frame, Render } from "zippy-shared";

export class HelloCanvas implements Render {
    private gradient: CanvasGradient | null = null;
    private positions = {
        text: { x: 0, y: 0 },
    };

    init(frame: Frame) {
        this.handleResize(frame.ctx);
        frame.ctx.canvas.addEventListener("canvas-resized", () => {
            this.handleResize(frame.ctx);
        });
    }

    private handleResize(ctx: CanvasRenderingContext2D) {
        const { width, height } = ctx.canvas;
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
