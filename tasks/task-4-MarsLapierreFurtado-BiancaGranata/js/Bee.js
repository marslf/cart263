class Bee {
    constructor(x, y, beeColor) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 10; //random between 5-15
        this.beeColor = beeColor;
        this.speed = Math.random() * 0.9 + 0.2; //random between 0.2 to 1.1
        this.beeDiv = document.createElement("div");
        this.wingsDiv = document.createElement("div");
        this.animationId = null;

        //store mouse position
        this.mosueX = x;
        this.mouseY = y;

        // Bind the mouse move handler to this instance
        this.handleMouseMove = this.handleMouseMove.bind(this);

        // Mouse move listener
        document.addEventListener('mousemove', this.handleMouseMove);

    }

    handleMouseMove(event) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;

    };

    //render method
    renderBee() {

        //bee main body 
        this.beeDiv.classList.add("bee");
        this.beeDiv.style.width = this.size + "px";
        this.beeDiv.style.height = this.size + "px";
        this.beeDiv.style.background = `rgb(${this.beeColor.r},${this.beeColor.g},${this.beeColor.b})`;
        this.beeDiv.style.position = "absolute";
        this.beeDiv.style.borderRadius = "50%";
        this.beeDiv.style.left = this.x + "px";
        this.beeDiv.style.top = this.y + "px";
        this.beeDiv.style.border = "2px solid black";


        //bee wings
        this.wingsDiv.style.width = (this.size * 0.8) + "px";
        this.wingsDiv.style.height = (this.size * 0.8) + "px";
        this.wingsDiv.style.background = "rgba(255, 255, 255, 0.8)";
        this.wingsDiv.style.position = "absolute";
        this.wingsDiv.style.borderRadius = "50%";
        this.wingsDiv.style.left = "50%";
        this.wingsDiv.style.top = "-30%";
        this.wingsDiv.style.transform = "translateX(-50%)";

        this.beeDiv.appendChild(this.wingsDiv); //add wings to bee body
        document.querySelector(".sky").appendChild(this.beeDiv); //add bee to sky 
    };


    animateBee() {
        const animate = () => {
            // Calculate direction to mouse
            let dx = this.mouseX - this.x;
            let dy = this.mouseY - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            //slight delay / smoothing to movement 
            let speedFactor = 0.02;

            //update position
            if (distance > 1) {
                this.x += dx * speedFactor * this.speed;
                this.y += dy * speedFactor * this.speed;

                // Update position
                this.beeDiv.style.left = this.x + "px";
                this.beeDiv.style.top = this.y + "px";
            }
            this.animationId = requestAnimationFrame(animate);
        };

        animate();
    };

    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            document.removeEventListener('mousemove', this.handleMouseMove);
        }
    }

}