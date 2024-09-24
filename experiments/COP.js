let particles = [];
const num = 50000;

const noiseScale = 0.02;
let iterations = 100;

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }
}

function mouseReleased() {
  noiseSeed(millis());
}

function draw() {
  background(0, 5);
  strokeWeight(0.5);

  for (let i = 0; i < num; i++) {
    let p = particles[i];

    // Calling the gradient function by creating a variable and passing it inside the stroke.
    let col = getGradientColor(p.x, p.y);
    stroke(col);

    point(p.x, p.y);

    let n = noise(p.x * noiseScale, p.y * noiseScale);
    let a = TAU * n;
    p.x += cos(a);
    p.y += sin(a);

    if (!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }

  if (frameCount >= iterations) {
    noLoop();
  }
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

/* Made this function with the help of ChatGPT. The map function is used to map a value from one range to another.
In this particular function it maps the x and y position to the particles and updates them with new values so that 
it creates a gradient effect. */
function getGradientColor(x, y) {
  let r = map(x, y, width, 100, 255);
  let g = map(y, x, height, 150, 255);
  let b = map(x + y, 0, width + height, 0, 255);

  return color(r, g, b, 255);
}
