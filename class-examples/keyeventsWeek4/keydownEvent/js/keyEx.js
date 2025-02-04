let speedX = 5;

window.onload = function () {
    console.log("keys");

    //Timeout = 2 seconds after window is loaded = event triggered (2000 milliseconds)
    window.setTimeout(addTimeoutText, 2000);
    function addTimeoutText() {
        let parent = document.getElementById("parent");
        parent.innerHTML += "<p> NEW TEXT TO APPEAR </p>";
    }

//Interval = every 2 seconds, add new text 
    window.setInterval(addTextRecur, 2000);

    function addTextRecur() {
        let parent = document.getElementById("parent");
        parent.innerHTML += "<p> NEW TEXT TO APPEAR RECUR </p>";
    }

    window.addEventListener("keydown", keyHandler)

    function keyHandler(event) {
        console.log(event); //use it to see what happens

        //access the element with the idea + change the text content
        document.querySelector("#textContainer").textContent =
            document.querySelector("#textContainer").textContent += event.code + ' '; //output the keys 

        document.querySelector("#textContainer").textContent =
            document.querySelector("#textContainer").textContent += event.code + ' ';

        if (event.key === "ArrowRight") { //move boxA if arrow keys are pressed
            //parseInt = extract the string into a number = parse a value as a string and return the first integer in a specified radix
            document.getElementById("boxA").style.left = parseInt(document.getElementById("boxA").style.left) + speedX + "px";
        }
        else if (event.key === "ArrowLeft") {

            document.getElementById("boxA").style.left = parseInt(document.getElementById("boxA").style.left) - speedX + "px";


        }

        //     //turn boxB orange
        // else if (event.code === "Space") {
        //     document.getElementById("boxB").style.background = "orange";

        // }

        //toggle on and off orange BoxB
        //access custom boolean attribute which we turn on or off to dictate color (custom bool already in HTML)
        else if (event.code === "Space") {
            let bool = document.getElementById("boxB").getAttribute("custom-bool");
            if (bool === "off") {
                document.getElementById("boxB").style.background = "orange";
                document.getElementById("boxB").setAttribute("custom-bool", "on");
            } else {
                document.getElementById("boxB").style.background = "rgb(112, 184, 226)";
                document.getElementById("boxB").setAttribute("custom-bool", "off");
            }
        }
        // turn boxA pink when Shift pressed
        else if (event.key === "Shift") {
            document.getElementById("boxA").style.background = "rgb(226, 112, 177)";
        }

    }
    // when shift is let go =  boxA goes back to blue 
    window.addEventListener("keyup", function (event) {
        console.log("keyup")
        //2: change color when space is down
        if (event.key === "Shift") {
            document.getElementById("boxA").style.background = "rgb(112, 184, 226)";

        }
        else {
            console.log(`key up not shift:`)
            console.log(event)
        }

    })

}

