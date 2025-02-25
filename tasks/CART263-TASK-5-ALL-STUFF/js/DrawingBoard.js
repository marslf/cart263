class DrawingBoard {
  /* Constructor */
  constructor(canvas, context, drawingBoardId) {
    this.canvas = canvas;
    this.context = context;
    this.objectsOnCanvas = [];
    let self = this;
    this.drawingBoardId = drawingBoardId;

    // Event listeners for mouse interactions
    this.canvas.addEventListener("click", function (e) {
      self.clickCanvas(e);
    });

    this.canvas.addEventListener("mousemove", function (e) {
      self.overCanvas(e);
    });
  }

  /* Handle mouse move events */
  overCanvas(e) {
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);

    // Differentiate which canvas
    if (this.drawingBoardId === "partA") {
      // Handle mouse move for Drawing Board A
    }
    if (this.drawingBoardId === "partB") {
      // Handle mouse move for Drawing Board B
    }
    if (this.drawingBoardId === "partC") {
      // Handle mouse move for Drawing Board C
    }
    if (this.drawingBoardId === "partD") {
      // Handle mouse move for Drawing Board D
    }
  }

  /* Handle mouse click events */
  clickCanvas(e) {
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);

    // Differentiate which canvas
    if (this.drawingBoardId === "partA") {
      // Handle click for Drawing Board A
    }
    if (this.drawingBoardId === "partB") {
      // Handle click for Drawing Board B
    }
    if (this.drawingBoardId === "partC") {
      // Handle click for Drawing Board C
    }
    if (this.drawingBoardId === "partD") {
      // Handle click for Drawing Board D
    }
  }

  /* Method to add an object to the canvas */
  addObj(objToAdd) {
    this.objectsOnCanvas.push(objToAdd);
  }

  /* Method to display objects on the canvas */
  display() {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].display();
    }
  }

  /* Method to animate objects on the canvas */
  animate(microphoneData) {
    // Clear the canvas before redrawing
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and display each object
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update(microphoneData); // Pass microphone data
      this.objectsOnCanvas[i].display();
    }
  }


  /* Method to run the video canvas (Drawing Board D) */
  run(videoElement) {
    // Only run for Drawing Board D
    if (this.drawingBoardId === "partD") {
      for (let i = 0; i < this.objectsOnCanvas.length; i++) {
        this.objectsOnCanvas[i].update(videoElement);
        this.objectsOnCanvas[i].display();
      }
    }
  }
}