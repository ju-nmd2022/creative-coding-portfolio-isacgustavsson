let numFrames = 300;
let m = 1000;
let delay_factor = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);

  stroke(255);
  fill(255);
}

function x1(t) {
  return 0.25 * width + 100 * cos(TWO_PI * t);
}
function y1(t) {
  return 0.5 * height + 100 * sin(TWO_PI * t);
}
function x2(t) {
  return 0.75 * width + 100 * cos(2 * TWO_PI * t);
}
function y2(t) {
  return 0.5 * height + 100 * sin(2 * TWO_PI * t);
}

function draw() {
  let t = (1.0 * (frameCount - 1)) / numFrames;

  background(0);

  //   ellipse(x1(t), y1(t), 6, 6);
  //   ellipse(x2(t), y2(t), 6, 6);

  push();
  strokeWeight(2);
  stroke(255, 100);
  for (let i = 0; i < m; i++) {
    let tt = (1.0 * i) / m;

    let x = lerp(
      x1((t / delay_factor) * tt),
      x2(t + delay_factor * tt * 0.004),
      tt
    );
    let y = lerp(y1((t / delay_factor) * tt), y2(t * delay_factor * tt), tt);

    point(x, y);
  }

  pop();
}
