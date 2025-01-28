window.onload = function () {
    console.log("move");

    // we want to do something when the mouse is over the box :)
    let drawBox = document.querySelector("#draw-box-a");

    //A: add event listener + callback (listen when the mouse is in the draw box)
    drawBox.addEventListener("mousemove", moveCallBack);

    function moveCallBack(e) {
        console.log("mouse move");
        // // B: note these are the same ... 
        // console.log(this); 
        // console.log(e.target); //e.target = this 
        //C: get the mouse coords
        //access to coordinates (relative to the window) when mouse moves on the draw box
        console.log(e.clientX, e.clientY)
        //relative to the WINDOW..

        let rect = this.getBoundingClientRect(); //access render coordinates
        console.log(rect);
        //DIFFERENCE TO ENSURE COORDS ARE RELATIVE (to the canvas)
        let offsetX = e.clientX - rect.x;
        let offsetY = e.clientY - rect.y;
        //check the mouse x and y relative to canvas
        //drawBox.innerHTML = `<p> offset_x: ${offsetX}, offset_y:${offsetY} </p>`; 

        //draw the dots to mouse x and y 
        //create element every time mouse is moved
        let p = document.createElement("div"); 
        p.classList.add("point");
        p.style.left = offsetX + "px";
        p.style.top = offsetY + "px";
        this.appendChild(p);
    }

}