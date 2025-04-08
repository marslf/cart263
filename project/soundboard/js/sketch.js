// Global variables
let pianoSound, drumSound, tambourineSound;
let guitarSound, cowbellSound, marimbaSound, mandolinSound, electricPianoSound;
let circles = [];
let fireworks = [];
let movingStars = []; // Renamed from stars to avoid conflicts
let twinkling_stars = []; // Renamed for clarity
let lightningBolts = [];
let triangles = [];
let swirls = [];
let squares = [];
let duration = 3000;
let beatInterval = 619;
let lastBeatTime = 0;
let lastMicrobitData = "000";

function preload() {
    // Load original sounds
    pianoSound = loadSound(
        'assets/piano_med.mp3',
        () => {
            console.log('Piano sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load piano sound:', err);
        }
    );

    drumSound = loadSound(
        'assets/simple_drum_beat.mp3',
        () => {
            console.log('Drum sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load drum sound:', err);
        }
    );

    tambourineSound = loadSound(
        'assets/tambourine.mp3',
        () => {
            console.log('Tambourine sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load tambourine sound:', err);
        }
    );

    // Load additional sounds for keys 4-8
    guitarSound = loadSound(
        'assets/guitar.mp3',
        () => {
            console.log('Guitar sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load guitar sound:', err);
        }
    );

    electricPianoSound = loadSound(
        'assets/electricpiano.mp3',
        () => {
            console.log('Electric piano sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load electric piano sound:', err);
        }
    );

    cowbellSound = loadSound(
        'assets/cowbell.mp3',
        () => {
            console.log('Cowbell sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load cowbell sound:', err);
        }
    );

    marimbaSound = loadSound(
        'assets/marimba.mp3',
        () => {
            console.log('Marimba sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load marimba sound:', err);
        }
    );

    mandolinSound = loadSound(
        'assets/mandolin.mp3',
        () => {
            console.log('Mandolin sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load mandolin sound:', err);
        }
    );
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Set defaults
    rectMode(CENTER); // Set rectMode to CENTER globally
    noStroke();

    let button = createButton('Connect Micro:bit');
    button.position(10, 10);
    button.mousePressed(setupSerial);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    // Solid black background to prevent flickering
    background(0);

    let currentMillis = millis();

    // If Micro:bit state has changed, compare the latest data with the previous state.
    if (typeof latestData !== 'undefined' && latestData !== lastMicrobitData) {
        for (let i = 0; i < 9; i++) {
            if (latestData[i] === '1' && lastMicrobitData[i] === '0') {
                triggerEvent(i);
            }
        }
        lastMicrobitData = latestData;
    }

    // PIANO CIRCLE EFFECT (Key 1)
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

    // DRUM FIREWORK EFFECT (Key 2)
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

    // TAMBOURINE MOVING STAR EFFECT (Key 3)
    for (let i = movingStars.length - 1; i >= 0; i--) {
        let s = movingStars[i];
        let progress = (currentMillis - s.startTime) / 1000;
        if (progress >= 1) {
            movingStars.splice(i, 1);
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

    // GUITAR YELLOW TWINKLING STARS (Key 4)
    updateTwinklingStars(currentMillis);

    // ELECTRIC PIANO LIGHTNING EFFECT (Key 5)
    updateLightning(currentMillis);

    // COWBELL TRIANGLE EFFECT (Key 6)
    updateTriangles(currentMillis);

    // MARIMBA SWIRL EFFECT (Key 7)
    updateSwirls(currentMillis);

    // MANDOLIN SQUARE EFFECT (Key 8)
    updateSquares(currentMillis);
}

// Main function to handle events for both Micro:bit and keyboard
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
        case 3: // Key 4
            guitarSound.play();
            createGuitarStars();
            break;
        case 4: // Key 5
            electricPianoSound.play();
            createLightning();
            break;
        case 5: // Key 6
            cowbellSound.play();
            createTriangles();
            break;
        case 6: // Key 7
            marimbaSound.play();
            createSwirls();
            break;
        case 7: // Key 8
            mandolinSound.play();
            createSquares();
            break;
        case 8:
            console.log("Button " + index + " pressed (no action assigned)");
            break;
    }
}

// ORIGINAL EFFECTS (Keys 1-3)
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
    movingStars.push({
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

// NEW EFFECTS (Keys 4-8)
// GUITAR TWINKLING STARS EFFECT (Key 4)
function createGuitarStars() {
    for (let i = 0; i < 20; i++) {
        twinkling_stars.push({
            x: random(width),
            y: random(height),
            size: random(3, 6),
            birthTime: millis()
        });
    }
}

function updateTwinklingStars(currentMillis) {
    for (let i = twinkling_stars.length - 1; i >= 0; i--) {
        let star = twinkling_stars[i];

        // Calculate age in seconds
        let age = (currentMillis - star.birthTime) / 1000;

        // Remove stars older than 8 seconds
        if (age > 8) {
            twinkling_stars.splice(i, 1);
            continue;
        }

        // Draw star with slight brightness variation
        fill(255, 255, 0, 255 - random(0, 30));
        noStroke();
        ellipse(star.x, star.y, star.size, star.size);

        // Random twinkling effect
        if (random() < 0.1) star.size = random(2, 6);
    }
}

// LIGHTNING EFFECT (Key 5)
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

// TRIANGLE EFFECT (Key 6)
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

        // disappears after 3 seconds
        if (age > 3) {
            triangles.splice(i, 1);
            continue;
        }

        // opacity with smooth transitions
        let opacity;
        if (age < 0.5) {
            opacity = map(age, 0, 0.5, 0, 255); // Fade in
        } else if (age > 2) {
            opacity = map(age, 2, 3, 255, 0); // Fade out
        } else {
            opacity = 255; // Full visibility
        }

        // draw triangle
        fill(255, 20, 147, opacity);
        noStroke();
        triangle(
            tri.x, tri.y - tri.size / 2,
            tri.x - tri.size / 2, tri.y + tri.size / 2,
            tri.x + tri.size / 2, tri.y + tri.size / 2
        );
    }
}

// SWIRL EFFECT (Key 7)
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

        // leaves after 3 seconds
        if (age > 3) {
            swirls.splice(i, 1);
            continue;
        }

        // opacity and transition
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

        // spiral path
        beginShape();
        for (let a = 0; a < TWO_PI * 3; a += 0.2) {
            let r = swirl.size * (0.5 + 0.2 * sin(a * 5 + frameCount * 0.1));
            vertex(r * cos(a), r * sin(a));
        }
        endShape(CLOSE);
        pop();
    }
}

// SQUARE EFFECT (Key 8)
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
    // Temporarily set rectMode to CENTER for drawing squares
    rectMode(CENTER);

    for (let i = squares.length - 1; i >= 0; i--) {
        let square = squares[i];
        let age = (currentMillis - square.birthTime) / 1000;

        // Remove after 3 seconds
        if (age > 3) {
            squares.splice(i, 1);
            continue;
        }

        // opacity and smoothness
        let opacity;
        if (age < 0.5) opacity = map(age, 0, 0.5, 0, 220);
        else if (age > 2) opacity = map(age, 2, 3, 220, 0);
        else opacity = 220;

        // draw rotating square
        fill(255, 165, 0, opacity);
        noStroke();

        push();
        translate(square.x, square.y);
        rotate(square.rotation);
        rect(0, 0, square.size, square.size);
        pop();

        // Update rotation
        square.rotation += square.rotationSpeed;
    }
}

// Keyboard event handling for all keys (1-8)
function keyPressed() {
    // Original keys (1-3)
    if (key === '1') {
        pianoSound.play();
        piano();
    }
    if (key === '2') {
        drumSound.play();
        createFirework();
        lastBeatTime = millis();
    }
    if (key === '3') {
        tambourineSound.play();
        createMovingStar();
    }

    // New keys (4-8)
    if (key === '4') {
        guitarSound.play();
        createGuitarStars();
    }
    if (key === '5') {
        electricPianoSound.play();
        createLightning();
    }
    if (key === '6') {
        cowbellSound.play();
        createTriangles();
    }
    if (key === '7') {
        marimbaSound.play();
        createSwirls();
    }
    if (key === '8') {
        mandolinSound.play();
        createSquares();
    }
}