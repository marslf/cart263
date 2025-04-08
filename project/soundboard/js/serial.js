let serialPort;
let latestData = "000000000";
let buffer = ""; // new buffer to build complete lines

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
                buffer += value; // accumulate incoming data

                let lines = buffer.split("\n");
                buffer = lines.pop(); // keep the unfinished line for next read

                for (let line of lines) {
                    let cleanValue = line.trim();
                    console.log("Received serial data:", cleanValue);

                    if (cleanValue.length === 9 && /^[01]+$/.test(cleanValue)) {
                        latestData = cleanValue;
                    }
                }
            }
        }
    } catch (err) {
        console.error("Error setting up serial connection: ", err);
    }
}
