let serial;
let latestData = "000000000";

function setupSerial() {
    serial = new p5.SerialPort();
    serial.list();
    serial.openPrompt(); // Ask user to choose the Micro:bit port

    serial.on("connected", () => console.log("Serial connected"));
    serial.on("data", serialEvent);
    serial.on("error", err => console.error(err));
}

function serialEvent() {
    let data = serial.readLine().trim();
    if (data.length === 9 && /^[01]+$/.test(data)) {
        latestData = data;
    }
}
