// Global variables
let pianoSound, drumSound, tambourineSound, guitarSound, ElectricPianoSound, cowbellSound, marimbaSound, mandolinSound, BongoSound;

let YellowStars = [];        // Yellow stars (key 4)
//let lightningBolts = [];     // Falling lightning (key 5)
let triangles = [];          // Pink triangles (key 6)
let swirls = [];             // Blue swirls (key 7)
let squares = [];            // Orange squares (key 8)
let circles = [];            // Piano circles (key 1)
let fireworks = [];          // Drum fireworks (key 2)
let stars = [];              // Tambourine stars (key 3)

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

    ElectricPianoSound = loadSound(
        'assets/electricpiano.mp3',
        () => {
            console.log('Electric Piano sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load Electric Piano sound:', err);
        }
    );

    CowbellSound = loadSound(
        'assets/cowbell.mp3',
        () => {
            console.log('Cowbell sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load Cowbell sound:', err);
        }
    );

    MarimbaSound = loadSound(
        'assets/marimba.mp3',
        () => {
            console.log('Marimba sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load Marimba sound:', err);
        }
    );

    MandolinSound = loadSound(
        'assets/mandolin.mp3',
        () => {
            console.log('Mandolin sound loaded successfully');
        },
        (err) => {
            console.error('Failed to load Mandolin sound:', err);
        }
    );

    BongoSound = loadSound(
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
        circle = { color: "pink", startTime: millis() };
    } else if (data === "6") {
        console.log("Button 6 pressed (pin5)");
        circle = { color: "purple", startTime: millis() };
    } else if (data === "7") {
        console.log("Button 7 pressed (pin11)");
        circle = { color: "orange", startTime: millis() };
    } else if (data === "8") {
        console.log("Button 8 pressed (pin8)");
        circle = { color: "white", startTime: millis() };
    } else if (data === "9") {
        console.log("Button 9 pressed (pin12)");
        circle = { color: "brown", startTime: millis() };
    }
}

function draw() {
    background(0);
    let currentMillis = millis();

    // If Micro:bit state has changed, compare the latest data with the previous state.
    // (Ensure that 'latestData' is defined globally in serial.js.)
    // if (typeof latestData !== 'undefined' && latestData !== lastMicrobitData) {
    //     for (let i = 0; i < 9; i++) {
    //         if (latestData[i] === '1' && lastMicrobitData[i] === '0') {
    //             triggerEvent(i);
    //         }
    //     }
    //     lastMicrobitData = latestData;
    // }


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


function keyPressed() {
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
    //     else if (key === '4') {
    //         if (guitarSound) guitarSound.play();
    //         createGuitarStars();
    //     } else if (key === '5') {
    //         if (electricPianoSound) electricPianoSound.play();
    //         createLightning();
    //     } else if (key === '6') {
    //         if (cowbellSound) cowbellSound.play();
    //         createTriangles();
    //     } else if (key === '7') {
    //         if (marimbaSound) marimbaSound.play();
    //         createSwirls();
    //     } else if (key === '8') {
    //         if (mandolinSound) mandolinSound.play();
    //         createSquares();
    //     }
}
