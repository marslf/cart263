let serialPort; 

async function setupSerial() {
    if (!("serial" in navigator)) {
        console.error("Web Serial API not supported. Use Chrome or Edge on a secure origin.");
        return;
    }

    try {
        // Request a port and open it
        serialPort = await navigator.serial.requestPort();
        await serialPort.open({ baudRate: 115200 });
        console.log("Serial port opened");

        // Create a reader to continuously read data
        const textDecoder = new TextDecoderStream();
        const readableStreamClosed = serialPort.readable.pipeTo(textDecoder.writable);
        const reader = textDecoder.readable.getReader();

        // Continuously read data in a loop
        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                // Allow the serial port to be closed later.
                reader.releaseLock();
                break;
            }
            if (value) {
                // Assume the micro:bit sends a 9-character string ending with a newline
                const cleanValue = value.trim();
                if (cleanValue.length === 9 && /^[01]+$/.test(cleanValue)) {
                    latestData = cleanValue;
                    // Log or trigger events using the updated latestData, if necessary
                    // console.log("Received data:", latestData);
                }
            }
        }
    } catch (err) {
        console.error("Error setting up serial connection: ", err);
    }
}
