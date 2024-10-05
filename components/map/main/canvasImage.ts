import { Map } from 'maplibre-gl';

export function generatePulsingDot(
    myMap: Map,
    setting?: { size?: number; red?: number; green?: number; blue?: number },
) {
    const inSetting = {
        size: setting?.size || 100,
        red: setting?.red || 255,
        green: setting?.green || 100,
        blue: setting?.blue || 0,
    };
    const { size, red, green, blue } = inSetting;
    const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // get rendering context for the map canvas when layer is added to the map
        onAdd() {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            // @ts-ignore
            this.context = canvas.getContext('2d', {
                willReadFrequently: true,
            });
        },

        // called once before every frame where the icon will be used
        render() {
            const duration = 1000;
            const t = (performance.now() % duration) / duration;

            const radius = (size / 2) * 0.3;
            const outerRadius = (size / 2) * 0.7 * t + radius;
            // @ts-ignore
            const context = this.context;

            // draw outer circle
            context.clearRect(0, 0, this.width, this.height);
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                outerRadius,
                0,
                Math.PI * 2,
            );
            context.fillStyle = `rgba(${red}, ${green}, ${blue},${1 - t})`;
            context.fill();

            // Outer stroke (black)
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                radius,
                0,
                Math.PI * 2,
            );
            context.strokeStyle = 'dimgray'; // Outer stroke color
            context.lineWidth = 6; // Outer stroke width
            context.stroke();

            // draw inner circle
            context.beginPath();
            context.arc(
                this.width / 2,
                this.height / 2,
                radius,
                0,
                Math.PI * 2,
            );
            context.strokeStyle = 'white';
            context.lineWidth = 2 + 4 * (1 - t);
            context.stroke();

            // update this image's data with data from the canvas
            this.data = context.getImageData(
                0,
                0,
                this.width,
                this.height,
            ).data;

            // continuously repaint the map, resulting in the smooth animation of the dot
            myMap.triggerRepaint();

            // return `true` to let the map know that the image was updated
            return true;
        },
    };
    return pulsingDot;
}

export function generateRotatingHexagon(
    myMap: Map,
    setting?: {
        size?: number;
        red?: number;
        green?: number;
        blue?: number;
        alpha?: number;
        duration?: number;
        stroke?: number;
    },
) {
    const size = setting?.size || 75;
    const red = setting?.red || 255;
    const green = setting?.green || 100;
    const blue = setting?.blue || 0;
    const alpha = setting?.alpha || 0.8;
    const duration = setting?.duration || 2500;
    const stroke = setting?.stroke || 6;

    const rotatingHexagon = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        // get rendering context for the map canvas when layer is added to the map
        onAdd() {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            // @ts-ignore
            this.context = canvas.getContext('2d', {
                willReadFrequently: true,
            });
        },

        // called once before every frame where the icon will be used
        render() {
            const t = (performance.now() % duration) / duration; // Time variable for animation
            // @ts-ignore
            const context = this.context;
            const centerX = this.width / 2;
            const centerY = this.height / 2;
            const radius = size / 3; // Radius of the hexagon

            // Calculate the current rotation angle
            const angle = t * Math.PI * 2; // Complete rotation over `duration`

            // Draw the rotating hexagons
            context.clearRect(0, 0, this.width, this.height);
            context.save(); // Save the current context state

            // Move the origin to the center of the hexagons and rotate
            context.translate(centerX, centerY);

            // First hexagon (counterclockwise rotation)
            context.rotate(angle); // Rotates counterclockwise
            drawHexagon(
                context,
                radius,
                `rgba(${red}, ${green}, ${blue}, ${alpha})`,
                stroke,
            ); // Draws first hexagon

            // Second hexagon (clockwise rotation)
            context.rotate(-2 * angle); // Rotates clockwise (negative angle)
            drawHexagon(
                context,
                radius,
                `rgba(${red}, ${green}, ${blue}, ${alpha})`,
                stroke,
            ); // Draws second hexagon

            context.restore(); // Restore the context state after the rotation

            // Update this image's data with data from the canvas
            this.data = context.getImageData(
                0,
                0,
                this.width,
                this.height,
            ).data;

            // Continuously repaint the map for smooth animation
            myMap.triggerRepaint();

            // Return true to indicate the image was updated
            return true;
        },
    };

    function drawHexagon(
        context: any,
        radius: number,
        strokeColor: string,
        lineWidth: number,
    ) {
        context.beginPath();
        for (let i = 0; i < 6; i++) {
            const x = radius * Math.cos((i * Math.PI) / 3);
            const y = radius * Math.sin((i * Math.PI) / 3);
            if (i === 0) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
            }
        }
        context.closePath();
        context.strokeStyle = strokeColor; // Set the stroke color
        context.lineWidth = lineWidth; // Set the stroke width
        context.stroke();
    }

    return rotatingHexagon;
}
