let particles = [];
const num = 20000;

const noiseScale = 0.015;

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }
  stroke(45, 145, 50, 255);
  strokeWeight(0.25);
}

function draw() {
  background(0, 10);

  for (let i = 0; i < num; i++) {
    let p = particles[i];
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
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
