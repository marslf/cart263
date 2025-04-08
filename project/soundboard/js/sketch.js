// Global variables
let pianoSound, drumSound, tambourineSound;
let circles = [];
let fireworks = [];
let stars = [];
let duration = 3000;
let beatInterval = 619;
let lastBeatTime = 0;
let lastMicrobitData = "000";


function preload() {
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

    electricPianoSound = loadSound('assets/electricpiano.mp3');
    cowbellSound = loadSound('assets/cowbell.mp3');
    marimbaSound = loadSound('assets/marimba.mp3');
    mandolinSound = loadSound('assets/mandolin.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    let button = createButton('Connect Micro:bit');
    button.position(10, 10);
    button.mousePressed(setupSerial);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0, 25);
    let currentMillis = millis();

    // If Micro:bit state has changed, compare the latest data with the previous state.
    // (Ensure that 'latestData' is defined globally in serial.js.)
    if (typeof latestData !== 'undefined' && latestData !== lastMicrobitData) {
        for (let i = 0; i < 9; i++) {
            if (latestData[i] === '1' && lastMicrobitData[i] === '0') {
                triggerEvent(i);
            }
        }
        lastMicrobitData = latestData;
    }

    updateCircles(currentMillis);
    updateFireworks(currentMillis);
    updateTambourineStars(currentMillis);
    updateStars(currentMillis);
    updateLightning(currentMillis);
    updateTriangles(currentMillis);
    updateSwirls(currentMillis);
    updateSquares(currentMillis);


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
}


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
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
            console.log("Button " + index + " pressed (no action assigned)");
            break;
    }
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

/**
 * STAR EFFECT (Key 4)
 * Yellow twinkling stars that last 8 seconds
 */
function updateStars(currentMillis) {
    for (let i = stars.length - 1; i >= 0; i--) {
        let star = stars[i];
        // Calculate age in seconds
        let age = (currentMillis - star.birthTime) / 1000;

        // Remove stars older than 8 seconds
        if (age > 8) {
            stars.splice(i, 1);
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
 * TRIANGLE EFFECT- neon pink (key 6 )
 * 
 */
function updateTriangles(currentMillis) {
    for (let i = triangles.length - 1; i >= 0; i--) {
        let tri = triangles[i];
        let age = (currentMillis - tri.birthTime) / 1000;

        // disapears after 3 seconds
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

        //draw triangle
        fill(255, 20, 147, opacity);
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
function updateSwirls(currentMillis) {
    for (let i = swirls.length - 1; i >= 0; i--) {
        let swirl = swirls[i];
        let age = (currentMillis - swirl.birthTime) / 1000;

        //leaves after 3 seondds
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

/**
 * Square effect key 8
 */
function updateSquares(currentMillis) {
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

        //draw rotating square
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

function keyPressed() {
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
        electricPianoSound.play();
        stars.push({ x: random(width), y: random(height), size: random(2, 6), birthTime: millis() });
    } else if (key === '5') {
        cowbellSound.play();
        lightningBolts.push({
            y: 0,
            speed: random(4, 8),
            alpha: 255,
            points: [...Array(5)].map(() => ({ x: random(width), y: random(-50, 50) }))
        });
    } else if (key === '6') {
        marimbaSound.play();
        triangles.push({ x: random(width), y: random(height), birthTime: millis() });
        // } else if (key === '7') {
        //     mandolinSound.play();
        //     swirls.push({ ... }); 
        // } else if (key === '8') {
        //     mandolinSound.play();
        //     squares.push({ ... });
        // }
    }
}
