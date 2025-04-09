let latestData = "0";
let circleVisible = false;
let circleStartTime = 0;
let duration = 2000;

let port;
let reader;
let keepReading = true;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();

    const connectButton = select("#connect");
    connectButton.mousePressed(connectToMicrobit);
}

function draw() {
    background(0);

    if (latestData === "1") {
        circleVisible = true;
        circleStartTime = millis();
        latestData = "0"; // reset
    }

    if (circleVisible) {
        fill(255, 0, 0);
        ellipse(width / 2, height / 2, 100);

        if (millis() - circleStartTime > duration) {
            circleVisible = false;
        }
    }
}

// Web Serial Connection
async function connectToMicrobit() {
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });

        const decoder = new TextDecoderStream();
        const inputDone = port.readable.pipeTo(decoder.writable);
        reader = decoder.readable.getReader();

        readSerialLoop();
    } catch (err) {
        console.error("Connection failed: ", err);
    }
}

async function readSerialLoop() {
    while (keepReading) {
        try {
            const { value, done } = await reader.read();
            if (done) break;
            if (value) {
                let clean = value.trim();
                if (clean === "1" || clean === "0") {
                    latestData = clean;
                }
            }
        } catch (err) {
            console.error("Reading error: ", err);
            break;
        }
    }
}
