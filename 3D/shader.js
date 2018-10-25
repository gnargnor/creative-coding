const canvasSketch = require('canvas-sketch');
const createShader = require('canvas-sketch-util/shader');
const glsl = require('glslify');


// Setup our sketch
const settings = {
  dimensions : [512, 512],
  fps: 24,
  context: 'webgl',
  animate: true
};

// Your glsl code - the glsl function is unnecessary unless you're bringing in glsl modules
// floating point numbers have to have a decimal point or you may get weird errors
// vec4 indicates there will be 4 values in the vector
// float alpha = smoothstep(sin(time) * 0.75, 0.5, dist);
const frag = glsl(/* glsl */`
  precision highp float;
  
  uniform float time;
  uniform float aspect;
  varying vec2 vUv;
  //   vec3 colorA = sin(time) + vec3(1.0, 2.0, 0.4);
  //   vec3 colorB = cos(time) + vec3(0.35, 0.58, 0.3);




  //   vec3 color = mix(colorA, colorB, vUv.x + vUv.y * sin(time));
  //   gl_FragColor = vec4(color, alpha);
  #pragma glslify: noise = require('glsl-noise/simplex/3d');
  #pragma glslify: hsl2rgb = require('glsl-hsl2rgb');
  void main () {
    vec2 center = vUv - 0.5;
    center.x *= aspect;

    float dist = length(center);

    float alpha = smoothstep(0.3, 0.25, dist);

    float n = noise(vec3(center * 60.0, time));
    vec3 color = hsl2rgb(0.2 + n * 0.9, 0.9, 0.7);
    gl_FragColor = vec4(color, alpha);
  }
`);

// Your sketch, which simply returns the shader
const sketch = ({ gl }) => {
  // Create the shader and return it
  return createShader({
    clearColor: 'pink',
    // Pass along WebGL context
    gl,
    // Specify fragment and/or vertex shader strings
    frag,
    // Specify additional uniforms to pass down to the shaders
    uniforms: {
      // Expose props from canvas-sketch
      aspect: ({width, height}) => width / height,
      time: ({ time }) => time
    }
  });
};

canvasSketch(sketch, settings);
