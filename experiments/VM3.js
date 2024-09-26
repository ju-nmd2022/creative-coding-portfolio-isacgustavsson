let size;

let step = 15;

function setup() {
  size = windowWidth;
  createCanvas(600, 600);

  strokeWeight(2);
}

function draw() {
  background(0);
  stroke(255);

  /* The nested for loops create a grid pattern by iterating through every possible
     position on the canvas = if x and y  is less than size = canvas size, X and Y 
     will increment in steps of 80 pixels. for each position it will call the drawLine 
     function to draw a line. */

  for (let x = 0; x < size; x += step) {
    for (let y = 0; y < size; y += step) {
      drawLine(x, y, step, step);
    }
  }

  noLoop();
}

function drawLine(x, y, width, height) {
  let leftToRight = random() <= 0.5;

  if (leftToRight) {
    rect(x, y, width, height);
    // line(x + width, y, x, y);
  } else {
    return;
    // line(x, y + height, x, y);
  }
}
