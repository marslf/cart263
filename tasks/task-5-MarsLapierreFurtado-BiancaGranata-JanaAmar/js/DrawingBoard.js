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

    // Right-click listener for object removal (Task 1)
    this.canvas.addEventListener("contextmenu", function (e) {
      e.preventDefault(); // Prevent the default context menu
      self.rightClickCanvas(e);
    });
  }

  /* Handle mouse move events */
  overCanvas(e) {
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);

    // Differentiate which canvas
    if (this.drawingBoardId === "partA") {
      // Update circular objects based on mouse position (Task 1)
      this.objectsOnCanvas.forEach(obj => obj.update(this.mouseOffsetX, this.mouseOffsetY));
      this.animate();
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
      // Add a new circular object on click (Task 1)
      const radius = 20; // Fixed or random radius
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      this.addObj(new CircularObj(this.mouseOffsetX, this.mouseOffsetY, radius, color, '#000', this.context));
      this.display(); // Re-draw to show new object
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

  /* Handle right-click events (Task 1) */
  rightClickCanvas(e) {
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    const x = parseInt(e.clientX - this.canvasBoundingRegion.x);
    const y = parseInt(e.clientY - this.canvasBoundingRegion.y);

    // Remove objects if right-clicked on them (Task 1)
    this.objectsOnCanvas = this.objectsOnCanvas.filter(obj =>
      Math.sqrt(Math.pow(obj.x - x, 2) + Math.pow(obj.y - y, 2)) > obj.radius
    );
    this.display(); // Re-draw to show the updated set of objects
  }

  /* Method to add an object to the canvas */
  addObj(objToAdd) {
    this.objectsOnCanvas.push(objToAdd);
  }

  /* Method to display objects on the canvas */
  display() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.objectsOnCanvas.forEach(obj => obj.display());
  }

  /* Method to animate objects on the canvas */
  animate(microphoneData) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and display each object
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      if (this.drawingBoardId === "partC" && microphoneData) {
        // Pass microphone data to Drawing Board C (Task 3)
        this.objectsOnCanvas[i].update(microphoneData);
      } else {
        // Default animation for other canvases
        this.objectsOnCanvas[i].update();
      }
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