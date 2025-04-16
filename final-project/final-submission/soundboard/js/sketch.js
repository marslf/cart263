// Global variables
let pianoSound, drumSound, tambourineSound, guitarSound, electricPianoSound, cowbellSound, marimbaSound, mandolinSound, BongoSound;

let YellowStars = [];        // Yellow stars (key 4)
let lightningBolts = [];     // Falling lightning (key 5)
let triangles = [];          // Pink triangles (key 6)
let swirls = [];             // Blue swirls (key 7)
let squares = [];            // Orange squares (key 8)
let circles = [];            // Piano circles (key 1)
let fireworks = [];          // Drum fireworks (key 2)
let stars = [];              // Tambourine stars (key 3)
let bongos = []; //bongo pulse (key 9)

// Timing variables
let duration = 3000;
let beatInterval = 619;
let lastBeatTime = 0;

let lastMicrobitData = [];

function preload() {
    pianoSound = loadSound(
        'assets/piano_med.mp3',
        () => {
            console.log('Piano sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load Piano sound:', err);
        }
    );

    drumSound = loadSound(
        'assets/simple_drum_beat.mp3',
        () => {
            console.log('Drum sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load Drum sound:', err);
        }
    );

    tambourineSound = loadSound(
        'assets/tambourine.mp3',
        () => {
            console.log('Tambourine sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load Tambourine sound:', err);
        }
    );

    guitarSound = loadSound(
        'assets/guitar.mp3',
        () => {
            console.log('Guitar sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load Guitar sound:', err);
        }
    );

    electricPianoSound = loadSound(
        'assets/electricpiano.mp3',
        () => {
            console.log('Electric Piano sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load Electric Piano sound:', err);
        }
    );

    cowbellSound = loadSound(
        'assets/cowbell.mp3',
        () => {
            console.log('Cowbell sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load Cowbell sound:', err);
        }
    );

    marimbaSound = loadSound(
        'assets/marimba.mp3',
        () => {
            console.log('Marimba sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load Marimba sound:', err);
        }
    );

    mandolinSound = loadSound(
        'assets/mandolin.mp3',
        () => {
            console.log('Mandolin sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load Mandolin sound:', err);
        }
    );

    bongoSound = loadSound(
        'assets/bongo.mp3',
        () => {
            console.log('Bongo sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load Bongo sound:', err);
        }
    );

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    noStroke();

    let button = createButton('Connect Micro:bit');
    button.position(10, 10);
    button.mousePressed(setupSerial);

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function readLoop(reader) {
    reader.read().then(({ value, done }) => {
        if (done) {
            console.log("Reader disconnected.");
            return;
        }

        if (value) {
            latestData = value.trim();
            handleMicrobitInput(latestData);
        }

        readLoop(reader);
    });
}


//MICROBIT INPUT
function handleMicrobitInput(data) {
    if (data === "1") {
        console.log("Button 1 pressed (pin0)");
        pianoSound.play();
        piano();
    } else if (data === "2") {
        console.log("Button 2 pressed (pin1)");
        drumSound.play();
        createFirework();
        lastBeatTime = millis();
    } else if (data === "3") {
        console.log("Button 3 pressed (pin2)");
        tambourineSound.play();
        createMovingStar();
    } else if (data === "4") {
        console.log("Button 4 pressed (pin7)");
        guitarSound.play();
        createGuitarStars();
    } else if (data === "5") {
        console.log("Button 5 pressed (pin9)");
        electricPianoSound.play();
        createLightning();
    } else if (data === "6") {
        console.log("Button 6 pressed (pin5)");
        cowbellSound.play();
        createTriangles();
    } else if (data === "7") {
        console.log("Button 7 pressed (pin11)");
        marimbaSound.play();
        createSwirls();
    } else if (data === "8") {
        console.log("Button 8 pressed (pin8)");
        mandolinSound.play();
        createSquares();
    } else if (data === "9") {
        console.log("Button 9 pressed (pin12)");
        bongoSound.play();
        createBongoPulses();
    }
}

function draw() {
    background(0);
    let currentMillis = millis();

    // PIANO CIRCLE EFFECT
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

    // DRUM FIREWORK EFFECT
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

    // TAMBOURINE STAR EFFECT
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

    for (let bolt of lightningBolts) {
        bolt.update();
        bolt.display();
    }

    lightningBolts = lightningBolts.filter(bolt => !bolt.finished);

    updateTriangles(currentMillis);
    updateSwirls(currentMillis);
    updateSquares(currentMillis);
    updateYellowStars(currentMillis);
    updateBongos(currentMillis);


}

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

// GUITAR EFFECT(Key 4)
// Yellow twinkling stars that last 8 seconds

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

function createBongoPulses() {
    for (let i = 0; i < 5; i++) {
        bongos.push({
            x: random(width),
            y: random(height),
            startTime: millis(),
            color: color(random(200, 255), random(50, 150), 0)
        });
    }
}

function updateBongos(currentMillis) {
    for (let i = bongos.length - 1; i >= 0; i--) {
        let b = bongos[i];
        let age = (currentMillis - b.startTime) / 1000;

        if (age > 2) {
            bongos.splice(i, 1);
            continue;
        }

        let pulse = map(age, 0, 2, 0, 100);
        let alpha = map(age, 0, 2, 255, 0);

        noFill();
        stroke(b.color.levels[0], b.color.levels[1], b.color.levels[2], alpha);
        strokeWeight(4);
        ellipse(b.x, b.y, pulse * 2);
    }
}


//USE KEYBOARD KEYS TO TEST OUT WITHOUT SOUNDBOARD

function keyPressed() {
    if (key === '1') {
        console.log("Key 1 pressed")
        pianoSound.play();
        piano();
    } else if (key === '2') {
        console.log("Key 2 pressed")
        drumSound.play();
        createFirework();
        lastBeatTime = millis();
    } else if (key === '3') {
        console.log("Key 3 pressed")
        tambourineSound.play();
        createMovingStar();
    } else if (key === '4') {
        console.log("Key 4 pressed")
        guitarSound.play();
        createGuitarStars();
    } else if (key === '5') {
        console.log("Key 5 pressed")
        electricPianoSound.play();
        createLightning();
    } else if (key === '6') {
        console.log("Key 6 pressed")
        cowbellSound.play();
        createTriangles();
    } else if (key === '7') {
        console.log("Key 7 pressed")
        marimbaSound.play();
        createSwirls();
    } else if (key === '8') {
        console.log("Key 8 pressed")
        mandolinSound.play();
        createSquares();
    } else if (key === '9') {
        console.log("Key 9 pressed")
        bongoSound.play();
        createBongoPulses();
    }
}