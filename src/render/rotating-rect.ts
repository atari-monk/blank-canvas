import type { Render, Frame } from "zippy-shared";

export class RotatingRect implements Render {
    private rotation = 0;
    private hue = 0;
    private rectSize = 400;
    private centerX = 0;
    private centerY = 0;

    init(frame: Frame) {
        this.handleResize(frame.ctx);
        frame.ctx.canvas.addEventListener("canvas-resized", () => {
            this.handleResize(frame.ctx);
        });
    }

    private handleResize(ctx: CanvasRenderingContext2D) {
        const { width, height } = ctx.canvas;
        this.centerX = width / 2;
        this.centerY = height / 2;
    }

    render(frame: Frame) {
        const { ctx, width, height } = frame;

        // Clear canvas with semi-transparent black for trail effect
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, width, height);

        // Update rotation and color
        this.rotation += 0.005;
        this.hue = (this.hue + 1) % 360;

        // Save the current context state
        ctx.save();

        // Move to center and rotate
        ctx.translate(this.centerX, this.centerY);
        ctx.rotate(this.rotation);

        // Draw the rotating rectangle with changing color
        ctx.fillStyle = `hsl(${this.hue}, 70%, 60%)`;
        ctx.fillRect(
            -this.rectSize / 2,
            -this.rectSize / 2,
            this.rectSize,
            this.rectSize
        );

        // Add a border
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.strokeRect(
            -this.rectSize / 2,
            -this.rectSize / 2,
            this.rectSize,
            this.rectSize
        );

        // Restore the context state
        ctx.restore();
    }
}
