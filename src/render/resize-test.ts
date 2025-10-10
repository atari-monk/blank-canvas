import type { Frame, Render } from "zippy-shared";

export class ResizeTest implements Render {
    private readonly fontSize: string = "20px Arial";
    private readonly smallFontSize: string = "14px Arial";
    private gridSize: number = 50;
    private cornerMarkers: { x: number; y: number }[] = [];

    init(frame: Frame) {
        this.handleResize(frame.ctx);
        frame.ctx.canvas.addEventListener("canvas-resized", () => {
            this.handleResize(frame.ctx);
        });
    }

    private handleResize(ctx: CanvasRenderingContext2D) {
        const { width, height } = ctx.canvas;
        // Update corner markers for the new size
        this.cornerMarkers = [
            { x: 10, y: 10 }, // top-left
            { x: width - 10, y: 10 }, // top-right
            { x: 10, y: height - 10 }, // bottom-left
            { x: width - 10, y: height - 10 }, // bottom-right
            { x: width / 2, y: 10 }, // top-center
            { x: width / 2, y: height - 10 }, // bottom-center
            { x: 10, y: height / 2 }, // middle-left
            { x: width - 10, y: height / 2 }, // middle-right
        ];
    }

    render(frame: Frame) {
        const { ctx, width, height } = frame;

        // Clear with a light background
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, width, height);

        // Draw grid
        this.drawGrid(ctx, width, height);

        // Draw border
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, width, height);

        // Draw corner and edge markers
        this.drawMarkers(ctx);

        // Draw dimensions text
        this.drawDimensions(ctx, width, height);

        // Draw center crosshair
        this.drawCrosshair(ctx, width, height);

        // Draw resize instructions
        this.drawInstructions(ctx, width, height);
    }

    private drawGrid(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number
    ) {
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x <= width; x += this.gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y <= height; y += this.gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // Grid coordinates
        ctx.fillStyle = "#999";
        ctx.font = this.smallFontSize;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        for (let x = 0; x <= width; x += this.gridSize * 2) {
            for (let y = 0; y <= height; y += this.gridSize * 2) {
                ctx.fillText(`${x},${y}`, x + 2, y + 2);
            }
        }
    }

    private drawMarkers(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "red";
        this.cornerMarkers.forEach((marker) => {
            ctx.beginPath();
            ctx.arc(marker.x, marker.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    private drawDimensions(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number
    ) {
        ctx.fillStyle = "#333";
        ctx.font = this.fontSize;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const dimensionsText = `${width} × ${height}`;
        const pixelRatio = window.devicePixelRatio || 1;
        const pixelRatioText = `Device Pixel Ratio: ${pixelRatio}`;

        ctx.fillText(dimensionsText, width / 2, height / 2 - 20);

        ctx.font = this.smallFontSize;
        ctx.fillText(pixelRatioText, width / 2, height / 2 + 20);
    }

    private drawCrosshair(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number
    ) {
        const centerX = width / 2;
        const centerY = height / 2;

        ctx.strokeStyle = "blue";
        ctx.lineWidth = 1;

        // Horizontal line
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();

        // Vertical line
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        ctx.stroke();

        // Center circle
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
        ctx.stroke();
    }

    private drawInstructions(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number
    ) {
        ctx.fillStyle = "#666";
        ctx.font = this.smallFontSize;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        const instructions = [
            "Resize Test Pattern",
            "• Red dots should stay at corners/edges",
            "• Blue crosshair should stay centered",
            "• Grid should fill entire canvas",
            "• Dimensions should update correctly",
        ];

        instructions.forEach((line, index) => {
            ctx.fillText(line, 10, 30 + index * 20);
        });

        // Also draw on bottom right
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.fillText("Look for stretching/cropping", width - 10, height - 10);
    }
}
