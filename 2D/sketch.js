const canvasSketch = require('canvas-sketch');

const settings = {
  // can use an array of pixels, common paper sizes
  dimensions: [ 2048, 2048],
  orientation: 'landscape',
  // set the units of the image that's output
  // units: 'cm',
  // increase the pixel resolution thusly
  pixelsPerInch: 300
};

// for resolution independent sizes, use fractions of width and height as sizes / units


const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'cyan';
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.arc(width / 2, height / 2, 200, 0, Math.PI * 2, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 40;
    context.strokeStyle = 'blue';
    context.stroke();
  };
};

canvasSketch(sketch, settings);
