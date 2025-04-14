let latestData = "0";  // store current data from microbit
let circle = null;
let duration = 2000;   // how long the circle stays
let port;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    let connectButton = createButton("Connect to Micro:bit");
    connectButton.mousePressed(connectToSerial);
}

function draw() {
    background(0);

    // Draw the circle if it's still active
    if (circle) {
        let timeSince = millis() - circle.startTime;
        if (timeSince < duration) {
            fill(circle.color);
            noStroke();
            ellipse(width / 2, height / 2, 100);
        } else {
            circle = null;
        }
    }
}

function connectToSerial() {
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

function handleMicrobitInput(data) {
    if (data === "1") {
        console.log("Button 1 pressed (pin0)");
        circle = { color: "red", startTime: millis() };
    } else if (data === "2") {
        console.log("Button 2 pressed (pin1)");
        circle = { color: "blue", startTime: millis() };
    } else if (data === "3") {
        console.log("Button 3 pressed (pin2)");
        circle = { color: "yellow", startTime: millis() };
    } else if (data === "4") {
        console.log("Button 4 pressed (pin7)");
        circle = { color: "green", startTime: millis() };
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