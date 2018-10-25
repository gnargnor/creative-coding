const canvasSketch = require('canvas-sketch');
// package for interpolation - pass in min, max and t value
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');
const randomColorRGB = require('random-color-rgb')

const settings = {
  dimensions: [ 2048, 2048 ],
};

// for resolution independent sizes, use fractions of width and height as sizes / units


const sketch = () => {
    const colorCount = random.rangeFloor(3, 6);
    const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);
    // console.log(`palette: ${palette}`);
    console.log(palette);
    const createGrid = () => {
        const points = [];
        const count = 25;
        for (let x = 0; x < count; x++) {
            for (let y = 0; y < count; y++) {
                const u = count <= 1 ? 0.5 : x / (count - 1);
                const v = count <= 1 ? 0.5 : y / (count - 1);

                points.push({
                    color: random.pick(palette),
                    radius: Math.abs(0.1 + random.gaussian() * 0.03),
                    position: [u, v]
                });
            }
        }
        return points;
    }
    
    // deterministic randomness - use setSeed
    // random.setSeed(512);
    const points = createGrid().filter(() => random.value() > 0.9);
    console.log(points);
    const margin = 200;

    return ({ context, width, height }) => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);

        points.forEach((data) => {
            const {color, position, radius} = data;
            // const x = u * width;
            const x = lerp(margin, width - margin, position[0]);
            // const y = v * height;
            const y = lerp(margin, height - margin, position[1]);

            context.beginPath();
            context.arc(x, y, radius * width, 0, Math.PI * 2, false);
            context.strokeStyle = color;
            context.lineWidth = 10;
            context.stroke();
        })
    };
};

canvasSketch(sketch, settings);
