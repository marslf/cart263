// Global variables for sounds
let pianoSound, drumSound, tambourineSound, guitarSound, ElectricPianoSound;
let cowbellSound, marimbaSound, mandolinSound, BongoSound;

// Arrays for storing visual elements
// First code visuals
let YellowStars = [];        // Yellow stars (key 4)
let lightningBolts = [];     // Falling lightning (key 5)
let triangles = [];          // Pink triangles (key 6)
let swirls = [];             // Blue swirls (key 7)
let squares = [];            // Orange squares (key 8)

// Second code visuals
let circles = [];            // Piano circles (key 1)
let fireworks = [];          // Drum fireworks (key 2)
let stars = [];              // Tambourine stars (key 3)

// Timing variables
let duration = 3000;
let beatInterval = 619;
let lastBeatTime = 0;
let lastMicrobitData = "000000000"; // 9 zeros for 9 possible inputs

// Preload all audio files before setup
function preload() {
  soundFormats('mp3', 'wav');

  // Load sounds with success/error callbacks
  pianoSound = loadSound(
    'assets/piano_med.mp3',
    () => console.log('Piano sound loaded successfully'),
    (err) => console.error('Failed to load Piano sound:', err)
  );

  drumSound = loadSound(
    'assets/simple_drum_beat.mp3',
    () => console.log('Drum sound loaded successfully'),
    (err) => console.error('Failed to load Drum sound:', err)
  );

  tambourineSound = loadSound(
    'assets/tambourine.mp3',
    () => console.log('Tambourine sound loaded successfully'),
    (err) => console.error('Failed to load Tambourine sound:', err)
  );

  guitarSound = loadSound(
    'assets/guitar.mp3',
    () => console.log('Guitar sound loaded successfully'),
    (err) => console.error('Failed to load Guitar sound:', err)
  );

  ElectricPianoSound = loadSound(
    'assets/electricpiano.mp3',
    () => console.log('Electric Piano sound loaded successfully'),
    (err) => console.error('Failed to load Electric Piano sound:', err)
  );

  cowbellSound = loadSound(
    'assets/cowbell.mp3',
    () => console.log('Cowbell sound loaded successfully'),
    (err) => console.error('Failed to load Cowbell sound:', err)
  );

  marimbaSound = loadSound(
    'assets/marimba.mp3',
    () => console.log('Marimba sound loaded successfully'),
    (err) => console.error('Failed to load Marimba sound:', err)
  );

  mandolinSound = loadSound(
    'assets/mandolin.mp3',
    () => console.log('Mandolin sound loaded successfully'),
    (err) => console.error('Failed to load Mandolin sound:', err)
  );

  BongoSound = loadSound(
    'assets/bongo.mp3',
    () => console.log('Bongo sound loaded successfully'),
    (err) => console.error('Failed to load Bongo sound:', err)
  );
}

// Setup the canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();

  // Add Micro:bit connection button
  let button = createButton('Connect Micro:bit');
  button.position(10, 10);
  button.mousePressed(setupSerial);
}

// Main drawing loop - runs continuously
function draw() {
  // Semitransparent background creates motion trails
  background(0, 25);

  // Get current time in milliseconds
  let currentMillis = millis();

  // Check for Micro:bit data changes
  if (typeof latestData !== 'undefined' && latestData !== lastMicrobitData) {
    for (let i = 0; i < latestData.length; i++) {
      if (latestData[i] === '1' && lastMicrobitData[i] === '0') {
        triggerEvent(i);
      }
    }
    lastMicrobitData = latestData;
  }

  // Update all visual elements from first code
  updateYellowStars(currentMillis);
  updateLightning(currentMillis);
  updateTriangles(currentMillis);
  updateSwirls(currentMillis);
  updateSquares(currentMillis);

  // Update all visual elements from second code

  // PIANO CIRCLE EFFECT (key 1)
  for (let i = circles.length - 1; i >= 0; i--) {
    let c = circles[i];
    let progress = (currentMillis - c.startTime) / duration;
    if (progress >= 1) {
      circles.splice(i, 1);
    } else {
      let circleSize = map(sin(progress * PI), 0, 1, 0, c.maxSize);
      if (c.style === "solid") {
        fill(255, 180);
        noStroke();
      } else {
        noFill();
        stroke(255);
        strokeWeight(3);
      }
      ellipse(c.x, c.y, circleSize, circleSize);
    }
  }

  // DRUM FIREWORK EFFECT (key 2)
  for (let i = fireworks.length - 1; i >= 0; i--) {
    let f = fireworks[i];
    let progress = (currentMillis - f.startTime) / 1000;
    if (progress >= 1) {
      fireworks.splice(i, 1);
    } else {
      drawFirework(f.x, f.y, progress);
    }
  }

  if (drumSound.isPlaying() && currentMillis - lastBeatTime >= beatInterval) {
    createFirework();
    lastBeatTime = currentMillis;
  }

  // TAMBOURINE STAR EFFECT (key 3)
  for (let i = stars.length - 1; i >= 0; i--) {
    let s = stars[i];
    let progress = (currentMillis - s.startTime) / 1000;
    if (progress >= 1) {
      stars.splice(i, 1);
    } else {
      let x = lerp(s.startX, s.endX, progress);
      let y = lerp(s.startY, s.endY, progress);
      fill(255, 255, 0);
      noStroke();
      drawStar(x, y, 15, 30, 5);
      for (let j = 1; j <= 5; j++) {
        let trailX = lerp(s.startX, x, j / 6);
        let trailY = lerp(s.startY, y, j / 6);
        fill(255, 255, 0, 255 - j * 50);
        drawStar(trailX, trailY, 5, 10, 5);
      }
    }
  }
}

// Handle Micro:bit and keyboard input events
function triggerEvent(index) {
  switch (index) {
    case 0:
      pianoSound.play();
      piano();
      break;
    case 1:
      drumSound.play();
      createFirework();
      lastBeatTime = millis();
      break;
    case 2:
      tambourineSound.play();
      createMovingStar();
      break;
    case 3:
      guitarSound.play();
      createGuitarStars();
      break;
    case 4:
      ElectricPianoSound.play();
      createLightning();
      break;
    case 5:
      cowbellSound.play();
      createTriangles();
      break;
    case 6:
      marimbaSound.play();
      createSwirls();
      break;
    case 7:
      mandolinSound.play();
      createSquares();
      break;
    case 8:
      BongoSound.play();
      // Add a new effect for Bongo if desired
      break;
  }
}

// Visual effect handlers from second code
function piano() {
  let numCircles = int(random(4, 11));
  for (let i = 0; i < numCircles; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      maxSize: random(50, 150),
      style: random() > 0.5 ? "solid" : "outline",
      startTime: millis()
    });
  }
}

function createFirework() {
  fireworks.push({ x: random(width), y: random(height), startTime: millis() });
}

function drawFirework(x, y, progress) {
  let numLines = int(random(12, 20));
  let alpha = map(progress, 0, 1, 200, 0);
  stroke(random(100, 200), 0, 0, alpha);
  strokeWeight(8);
  for (let i = 0; i < numLines; i++) {
    let angle = random(TWO_PI);
    let length = random(20, 120) * (1 - progress);
    line(x, y, x + cos(angle) * length, y + sin(angle) * length);
  }
}

function createMovingStar() {
  stars.push({
    startX: random(width),
    startY: random(height),
    endX: random(width),
    endY: random(height),
    startTime: millis()
  });
}

function drawStar(x, y, innerRadius, outerRadius, points) {
  let angle = TWO_PI / points;
  beginShape();
  for (let i = 0; i < TWO_PI; i += angle) {
    vertex(x + cos(i) * outerRadius, y + sin(i) * outerRadius);
    vertex(x + cos(i + angle / 2) * innerRadius, y + sin(i + angle / 2) * innerRadius);
  }
  endShape(CLOSE);
}

// Visual effect functions from first code
/**
 * GUITAR EFFECT (Key 4)
 * Yellow twinkling stars that last 8 seconds
 */
function createGuitarStars() {
  for (let i = 0; i < 20; i++) {
    YellowStars.push({
      x: random(width),
      y: random(height),
      size: random(3, 6),
      birthTime: millis()
    });
  }
}

function updateYellowStars(currentMillis) {
  for (let i = YellowStars.length - 1; i >= 0; i--) {
    let star = YellowStars[i];
    // Calculate age in seconds
    let age = (currentMillis - star.birthTime) / 1000;

    // Remove stars older than 8 seconds
    if (age > 8) {
      YellowStars.splice(i, 1);
      continue;
    }

    // Draw star with slight brightness variation
    fill(255, 255, 0, 255 - random(0, 30));
    ellipse(star.x, star.y, star.size, star.size);

    // Random twinkling effect
    if (random() < 0.1) star.size = random(2, 6);
  }
}

/**
 * LIGHTNING EFFECT (Key 5)
 * Falling lightning bolts that fade out
 */
function createLightning() {
  let x = random(width);
  let points = [createVector(x, 0)];

  // Create jagged path
  for (let i = 1; i < floor(random(5, 12)); i++) {
    points.push(createVector(
      points[i - 1].x + random(-30, 30),
      points[i - 1].y + random(20, 50)
    ));
  }

  lightningBolts.push({
    points: points,
    y: 0,
    speed: random(5, 10),
    alpha: 255
  });
}

function updateLightning(currentMillis) {
  for (let i = lightningBolts.length - 1; i >= 0; i--) {
    let bolt = lightningBolts[i];
    // Make bolt fall downward
    bolt.y += bolt.speed;

    // Draw jagged lightning path
    stroke(200, 230, 255, bolt.alpha);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let pt of bolt.points) {
      vertex(pt.x, pt.y + bolt.y);
    }
    endShape();

    // Fade out and remove when invisible or off-screen
    bolt.alpha -= 1.5;
    if (bolt.alpha <= 0 || bolt.y > height + 100) {
      lightningBolts.splice(i, 1);
    }
  }
}

/**
 * TRIANGLE EFFECT - neon pink (key 6)
 */
function createTriangles() {
  for (let i = 0; i < 15; i++) {
    triangles.push({
      x: random(width),
      y: random(height),
      size: random(15, 40),
      birthTime: millis()
    });
  }
}

function updateTriangles(currentMillis) {
  for (let i = triangles.length - 1; i >= 0; i--) {
    let tri = triangles[i];
    let age = (currentMillis - tri.birthTime) / 1000;

    // Disappears after 3 seconds
    if (age > 3) {
      triangles.splice(i, 1);
      continue;
    }

    // Opacity with smooth transitions
    let opacity;
    if (age < 0.5) {
      opacity = map(age, 0, 0.5, 0, 255); // Fade in
    } else if (age > 2) {
      opacity = map(age, 2, 3, 255, 0); // Fade out
    } else {
      opacity = 255; // Full visibility
    }

    // Draw triangle
    fill(255, 20, 147, opacity);
    noStroke();
    triangle(
      tri.x, tri.y - tri.size / 2,
      tri.x - tri.size / 2, tri.y + tri.size / 2,
      tri.x + tri.size / 2, tri.y + tri.size / 2
    );
  }
}

/**
 * SWIRL EFFECT (Key 7)
 */
function createSwirls() {
  for (let i = 0; i < 8; i++) {
    swirls.push({
      x: random(width),
      y: random(height),
      size: random(20, 60),
      birthTime: millis()
    });
  }
}

function updateSwirls(currentMillis) {
  for (let i = swirls.length - 1; i >= 0; i--) {
    let swirl = swirls[i];
    let age = (currentMillis - swirl.birthTime) / 1000;

    // Leaves after 3 seconds
    if (age > 3) {
      swirls.splice(i, 1);
      continue;
    }

    // Opacity and transition
    let opacity;
    if (age < 0.5) opacity = map(age, 0, 0.5, 0, 200);
    else if (age > 2) opacity = map(age, 2, 3, 200, 0);
    else opacity = 200;

    // Draw swirling pattern
    push();
    translate(swirl.x, swirl.y);
    noFill();
    stroke(100, 200, 255, opacity);
    strokeWeight(1.5);

    // Spiral path
    beginShape();
    for (let a = 0; a < TWO_PI * 3; a += 0.2) {
      let r = swirl.size * (0.5 + 0.2 * sin(a * 5 + frameCount * 0.1));
      vertex(r * cos(a), r * sin(a));
    }
    endShape(CLOSE);
    pop();
  }
}

/**
 * Square effect (key 8)
 */
function createSquares() {
  for (let i = 0; i < 12; i++) {
    squares.push({
      x: random(width),
      y: random(height),
      size: random(15, 45),
      rotation: random(TWO_PI),
      rotationSpeed: random(-0.05, 0.05),
      birthTime: millis()
    });
  }
}

function updateSquares(currentMillis) {
  for (let i = squares.length - 1; i >= 0; i--) {
    let square = squares[i];
    let age = (currentMillis - square.birthTime) / 1000;

    // Remove after 3 seconds
    if (age > 3) {
      squares.splice(i, 1);
      continue;
    }

    // Opacity and smoothness
    let opacity;
    if (age < 0.5) opacity = map(age, 0, 0.5, 0, 220);
    else if (age > 2) opacity = map(age, 2, 3, 220, 0);
    else opacity = 220;

    // Draw rotating square
    fill(255, 165, 0, opacity);
    rectMode(CENTER);
    square.rotation += square.rotationSpeed; // Apply rotation

    push();
    translate(square.x, square.y);
    rotate(square.rotation);
    rect(0, 0, square.size, square.size);
    pop();
  }
}

// Keyboard input event handler
function keyPressed() {
  // Map keys 1-9 to effects
  if (key === '1') {
    pianoSound.play();
    piano();
  } else if (key === '2') {
    drumSound.play();
    createFirework();
    lastBeatTime = millis();
  } else if (key === '3') {
    tambourineSound.play();
    createMovingStar();
  } else if (key === '4') {
    guitarSound.play();
    createGuitarStars();
  } else if (key === '5') {
    ElectricPianoSound.play();
    createLightning();
  } else if (key === '6') {
    cowbellSound.play();
    createTriangles();
  } else if (key === '7') {
    marimbaSound.play();
    createSwirls();
  } else if (key === '8') {
    mandolinSound.play();
    createSquares();
  } else if (key === '9') {
    BongoSound.play();
    // Add bongo effect if desired
  }
}

// Handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}