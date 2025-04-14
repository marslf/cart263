let keys = [];
let keyWidth, keyHeight;
// let lightningBolts = [];
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

    // for (let i = 0; i < 14; i++) {
    //     keys.push(new PianoKey(i * keyWidth, height - keyHeight, keyWidth, keyHeight, i));
    // }

    // setInterval(addLightning, 500);
    // setInterval(flashBackground, 1000);

    // setupSerial();
}

// function draw() {
//     background(backgroundColor);

//     for (let key of keys) {
//         key.display();
//     }

    // for (let bolt of lightningBolts) {
    //     bolt.update();
    //     bolt.display();
    // }

    // lightningBolts = lightningBolts.filter(bolt => !bolt.finished);
// }

// function flashBackground() {
//     if (random() < 0.3) {
//         backgroundColor = color(255);
//         setTimeout(() => {
//             backgroundColor = color(30, 30, 40);
//         }, 100);
//     }
// }

function createLightning() {
    if (random() < 0.5) {
        lightningBolts.push(new Lightning(random(width), 0, random(width), height));
    }
}

// class PianoKey {
//     constructor(x, y, w, h, index) {
//         this.x = x;
//         this.y = y;
//         this.w = w;
//         this.h = h;
//         this.index = index;
//         this.active = false;
//     }

// display() {
//     stroke(255);
//     fill(this.active ? 'orange' : 'white');
//     rect(this.x, this.y, this.w, this.h);
// }

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

// function keyPressed() {
//     if (key >= '1' && key <= '9') {
//         let index = parseInt(key) - 1;
//         if (index < keys.length) {
//             //triggerKey(index);
//         }
//     }
// }

// function triggerEvent(index) {
//     keys[index].active = true;
//     if (sounds[index]) sounds[index].play();
//     //addLightning();
//    //flashBackground();
//     setTimeout(() => keys[index].active = false, 200);
// }

async function setupSerial() {
    navigator.serial.requestPort().then((selectedPort) => {
        port = selectedPort;
        return port.open({ baudRate: 115200 });
    }).then(() => {
        const decoder = new TextDecoderStream();
        const inputDone = port.readable.pipeTo(decoder.writable);
        const inputStream = decoder.readable;
        const reader = inputStream.getReader();

        console.log("Serial connection established.");

        readLoop(reader);
    }).catch((err) => {
        console.error("Serial connection failed:", err);
    });
}