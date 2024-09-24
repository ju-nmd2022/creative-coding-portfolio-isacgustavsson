let particles = [];
const num = 1000;
let spawnDelay = 20; // Delay in frames between spawns
let spawnCount = 0; // Counter for spawned particles

// Tone.js Synths for each direction
const synths = {
  north: new Tone.Synth().toDestination(),
  south: new Tone.Synth().toDestination(),
  east: new Tone.Synth().toDestination(),
  west: new Tone.Synth().toDestination(),
  northeast: new Tone.Synth().toDestination(),
  northwest: new Tone.Synth().toDestination(),
  southeast: new Tone.Synth().toDestination(),
  southwest: new Tone.Synth().toDestination(),
  basseast: new Tone.Synth().toDestination(),
  basswest: new Tone.Synth().toDestination(),
};

// Define the pitches for each direction
const pitches = {
  north: "C4", // Standard note
  south: "E3", // Standard note
  east: "G3", // Standard note
  west: "B3", // Standard note
  northeast: "C2", // Bass note
  northwest: "E2", // Bass note
  southeast: "G2", // Bass note
  southwest: "B2", // Bass note
  basseast: "B1", // Bass note
  basswest: "E1", // Bass note
};

// Tracking whether each tone is currently playing
let isPlaying = {
  north: false,
  south: false,
  east: false,
  west: false,
  northeast: false,
  northwest: false,
  southeast: false,
  southwest: false,
};

// Timing variables to control the release
let releaseTime = 200; // Duration of the sound in milliseconds

function setup() {
  createCanvas(600, 600);
  stroke(255);
  strokeWeight(1.0);
}

function draw() {
  background(0, 20);

  // Check if we can spawn a new particle based on the spawnDelay
  if (spawnCount < num && frameCount % spawnDelay === 0) {
    let particle = {
      position: createVector(0, 0), // Start at (0, 0)
      velocity: createVector(0, 0),
    };

    // Set a random angle between 0 and TWO_PI (0 to 360 degrees)
    let angle = random(TWO_PI);

    // Calculate velocity based on the random angle
    particle.velocity.x = cos(angle); // X direction
    particle.velocity.y = sin(angle); // Y direction

    // Determine which direction the particle is going and play the tone
    if (abs(particle.velocity.y) > abs(particle.velocity.x)) {
      if (particle.velocity.y < 0) {
        if (particle.velocity.x < 0) {
          playTone("north"); // Play northwest tone
          playTone("northeast"); // Play southeast tone
        } else {
          playTone("south"); // Play northeast tone
          playTone("southwest"); // Play southwest tone
        }
      } else {
        if (particle.velocity.x < 0) {
          playTone("west"); // Play southwest tone
          playTone("basswest");
        } else {
          playTone("east"); // Play southeast tone
          playTone("basseast");
        }
      }
    } else {
      if (particle.velocity.x < 0) {
        playTone("west"); // Play west tone
        playTone("northwest");
      } else {
        playTone("east"); // Play east tone
        playTone("southeast");
      }
    }

    particles.push(particle);
    spawnCount++; // Increment the spawn counter
  }

  // Translate the origin to the center of the canvas
  translate(width / 2, height / 2);

  // Update and draw all spawned particles
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i].position;
    let v = particles[i].velocity;

    // Draw the particle at its current position
    point(p.x, p.y);

    // Update the position based on the unique velocity for each particle
    p.x += v.x * 4;
    p.y += v.y * 4;
  }
}

function playTone(direction) {
  // Start the Tone.js audio context
  Tone.start();

  // Check if the tone is already playing
  if (!isPlaying[direction]) {
    // Trigger the appropriate tone
    synths[direction].triggerAttack(pitches[direction], Tone.now());
    isPlaying[direction] = true; // Mark that this tone is playing

    // Release the note after a short duration to avoid overlapping issues
    setTimeout(() => {
      synths[direction].triggerRelease();
      isPlaying[direction] = false; // Mark that this tone is no longer playing
    }, releaseTime); // Note duration in milliseconds
  }
}

function mousePressed() {
  Tone.start(); // Start the Tone.js context on user interaction
}
