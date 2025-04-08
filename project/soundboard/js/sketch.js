let pianoSound, drumSound, tambourineSound;
let circles = [];
let fireworks = [];
let stars = [];
let duration = 3000;
let beatInterval = 619;
let lastBeatTime = 0;
let lastMicrobitData = "000000000";

function preload() {
    pianoSound = loadSound('assets/piano_med.mp3', () => {
        console.log('Piano sound loaded successfully');
    }, (err) => {
        console.error('Failed to load piano sound:', err);
    });

    drumSound = loadSound('assets/simple_drum_beat.mp3', () => {
        console.log('Drum sound loaded successfully');
    }, (err) => {
        console.error('Failed to load drum sound:', err);
    });

    tambourineSound = loadSound('assets/tambourine.mp3', () => {
        console.log('Tambourine sound loaded successfully');
    }, (err) => {
        console.error('Failed to load tambourine sound:', err);
    });
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    setupSerial();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
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
}