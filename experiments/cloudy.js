function setup() {
  createCanvas(500, 500);
  background(150);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  res = 0.02;
  z = 1000;

  noiseDetail(16, 0.6);
}

function draw() {
  for (let x = 0; x < width; x += 3) {
    for (let y = 0; y < height; y += 3) {
      n1 = noise(x * res, y * res, z * res) + 0.033;
      n1 = map(n1, 0.3, 0.7, 0, 1);

      if (n1 < 0) {
        n1 += 1;
      }

      if (n1 > 1) {
        n1--;
      }

      if (n1 < 0.2) {
        col = 36; //orange
      } else if (n1 < 0.4) {
        col = 108; //yellow
      } else if (n1 < 0.6) {
        col = 180; //light blue
      } else if (n1 < 0.8) {
        col = 252; //purple
      } else col = 324; //rose

      col = n1 * 360;
      fill(col, col, 100, 255);
      rect(x, y, 6);
    }
  }
  z += 1.5;

  //   noLoop();
}
