const canvasSketch = require('canvas-sketch');
// package for interpolation - pass in min, max and t value
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');
const randomColorRGB = require('random-color-rgb')

const settings = {
  dimensions: [ 2048, 2048 ],
  // places a suffix at the end of your file name upon saving
  suffix: 'hi'
};

// for resolution independent sizes, use fractions of width and height as sizes / units


const sketch = () => {
    const colorCount = random.rangeFloor(1, 6);
    const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);
    // console.log(`palette: ${palette}`);
    const createGrid = () => {
        const points = [];
        const count = 15;
        for (let x = 0; x < count; x++) {
            for (let y = 0; y < count; y++) {
                const u = count <= 1 ? 0.5 : x / (count - 1);
                const v = count <= 1 ? 0.5 : y / (count - 1);
                const radius = Math.abs(random.noise2D(u,v)) * 0.25;
                points.push({
                    color: random.pick(palette),
                    radius: radius,
                    rotation: random.noise2D(u, v) * 0.9,
                    position: [u, v]
                });
            }
        }
        return points;
    }
    
    // deterministic randomness - use setSeed
    // random.setSeed(512);
    const points = createGrid().filter(() => random.value() > 0.3);
    const margin = 200;

    return ({ context, width, height }) => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);

        points.forEach((data) => {
            const {color, radius, rotation, position} = data;
            const [u, v] = position;
            const x = lerp(margin, width - margin, u);
            const y = lerp(margin, height - margin, v);
            
            context.save();
            context.fillStyle = color;
            context.font = `${radius * width}px "Helvetica"`
            context.translate(x, y);
            context.rotate(rotation);
            context.fillText('=', x, y)
        })
    };
};

canvasSketch(sketch, settings);


