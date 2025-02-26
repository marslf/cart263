class FreeStyleObj {
  constructor(x, y, length, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.theta = 0;
    this.length = length;
    this.yOffset = 20;
    this.angularSpeed = .07;
    this.context = context;

    // Properties for microphone interaction
    this.amplitude = 5;
    this.baseLength = length;
    this.baseAmplitude = 5;
    this.colorHue = 0;

  }

  display() {
    this.theta = 0; // Reset every time
    this.context.fillStyle = this.fill_color; // Change the fill color
    this.context.strokeStyle = this.stroke_color; // Change the stroke color
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);

    // Draw the wave-like shape
    for (let i = this.x; i < this.x + this.length; i++) {
      this.context.lineTo(i, (Math.sin(this.theta) * this.amplitude) + this.y);
      this.context.lineTo(i, (Math.sin(this.theta) * this.amplitude) + this.y + this.yOffset);
      this.theta += this.angularSpeed;
    }

    this.context.stroke(); // Set the stroke
  }

  update(microphoneData) {
    // Update properties based on microphone input
    if (microphoneData) {
      // Example: Change amplitude and length based on microphone volume
      this.amplitude = this.baseAmplitude + microphoneData.volume * 20; // Scale amplitude
      this.length = this.baseLength + microphoneData.volume * 50; // Scale length

      // Example: Change color based on frequency
      this.colorHue = microphoneData.frequency % 360; // Use frequency to change hue
      this.fill_color = `hsl(${this.colorHue}, 100%, 50%)`; // Update fill color
      this.stroke_color = `hsl(${this.colorHue}, 100%, 30%)`; // Update stroke color
    }

    // Arbitrary animation: Move the shape horizontally
    this.x += 1;
    if (this.x > this.context.canvas.width) {
      this.x = -this.length; // Reset position when it goes off-screen
    }
  }
}
