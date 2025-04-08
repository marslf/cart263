let keys = [];
let keyWidth, keyHeight;
let lightningBolts = [];
let backgroundColor;
let latestData = "000";
let buffer = "";
let serialPort;
let sounds = [];

function preload() {
    soundFormats('mp3');
    const soundFiles = [
        'bongo.mp3',
        'cowbell.mp3',
        'electricpiano.mp3',
        'guitar.mp3',
        'mandolin.mp3',
        'marimba.mp3',
        'piano_med.mp3',
        'simple_drum_beat.mp3',
        'tambourine.mp3'
    ];

    for (let i = 0; i < soundFiles.length; i++) {
        sounds[i] = loadSound(`assets/${soundFiles[i]}`);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    keyWidth = width / 14;
    keyHeight = height / 4;
    backgroundColor = color(30, 30, 40);

    for (let i = 0; i < 14; i++) {
        keys.push(new PianoKey(i * keyWidth, height - keyHeight, keyWidth, keyHeight, i));
    }

    setInterval(addLightning, 500);
    setInterval(flashBackground, 1000);

    setupSerial();
}

function draw() {
    background(backgroundColor);

    for (let key of keys) {
        key.display();
    }

    for (let bolt of lightningBolts) {
        bolt.update();
        bolt.display();
    }

    lightningBolts = lightningBolts.filter(bolt => !bolt.finished);
}

function flashBackground() {
    if (random() < 0.3) {
        backgroundColor = color(255);
        setTimeout(() => {
            backgroundColor = color(30, 30, 40);
        }, 100);
    }
}

function addLightning() {
    if (random() < 0.5) {
        lightningBolts.push(new Lightning(random(width), 0, random(width), height));
    }
}

class PianoKey {
    constructor(x, y, w, h, index) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.index = index;
        this.active = false;
    }

    display() {
        stroke(255);
        fill(this.active ? 'orange' : 'white');
        rect(this.x, this.y, this.w, this.h);
    }
}

class Lightning {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.lifespan = 10;
        this.finished = false;
    }

    update() {
        this.lifespan--;
        if (this.lifespan <= 0) this.finished = true;
    }

    display() {
        stroke(255, 255, 0);
        strokeWeight(3);
        line(this.x1, this.y1, this.x2, this.y2);
    }
}

function keyPressed() {
    if (key >= '1' && key <= '9') {
        let index = parseInt(key) - 1;
        if (index < keys.length) {
            triggerKey(index);
        }
    }
}

function triggerKey(index) {
    keys[index].active = true;
    if (sounds[index]) sounds[index].play();
    addLightning();
    flashBackground();
    setTimeout(() => keys[index].active = false, 200);
}

async function setupSerial() {
    if (!("serial" in navigator)) {
        console.error("Web Serial API not supported. Use Chrome or Edge on a secure origin.");
        return;
    }

    try {
        serialPort = await navigator.serial.requestPort();
        await serialPort.open({ baudRate: 115200 });
        console.log("Serial port opened");

        const textDecoder = new TextDecoderStream();
        const readableStreamClosed = serialPort.readable.pipeTo(textDecoder.writable);
        const reader = textDecoder.readable.getReader();

        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                reader.releaseLock();
                break;
            }
            if (value) {
                buffer += value;

                let lines = buffer.split("\n");
                buffer = lines.pop();

                for (let line of lines) {
                    let cleanValue = line.trim();
                    console.log("Received serial data:", cleanValue);

                    if (cleanValue.length === 3 && /^[01]+$/.test(cleanValue)) {
                        latestData = cleanValue;
                        for (let i = 0; i < 3; i++) {
                            if (latestData[i] === '1') {
                                triggerKey(i);
                            }
                        }
                    }
                }
            }
        }
    } catch (err) {
        console.error("Error setting up serial connection: ", err);
    }
}