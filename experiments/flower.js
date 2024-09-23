let pendulums = [];
let pendulumCount = 300;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  for (let i = 0; i < pendulumCount; i++) {
    pendulums[i] = new Pendulum(i);
  }
}

function draw() {
  blendMode(NORMAL);
  background(255);
  translate(width / 2, height / 2);

  for (let i = 0; i < pendulumCount; i++) {
    pendulums[i].display();
    pendulums[i].update();
  }

  push();
  noStroke();
  blendMode(DIFFERENCE);
  fill(20, 135, 120, 180);
  ellipse(0, 0, 100, 100);
  push();
  noFill();
  pop();
  pop();
}

class Pendulum {
  constructor(n) {
    this.angle = 0;
    this.angleSpeed = 0.001 + n * 0.001;
    this.radius = 150 + n / 10;
    this.rotation = 0;
    this.noise = noise(this.angleSpeed - 0.01);
  }

  update() {
    this.angle += this.angleSpeed;
  }

  display() {
    let x = this.radius * cos(this.angle);
    let y = this.radius * sin(this.angle);

    push();
    rotate(this.rotation);
    line(x, y, 50, 10);
    fill(0);
    this.rotation += x * y * this.noise;
    pop();

    if (frameCount >= pendulumCount / 5) {
      this.angleSpeed *= -1;
      noLoop();
    }
  }
}
