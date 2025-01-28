window.onload = setup;

function setup() {
    console.log("events!")

    // let introSection = document.querySelector("#intro");
    // introSection.addEventListener("click", function (e) { //e is the event callback so that you can see info like where did the user click
    //     console.log(this);
    //     console.log(e)

    //a:
    //     this.style.background = `rgba(15, 6, 17, 0.5)` //change the background colour of first block when clicked
    //     console.log(document.querySelector(`#${this.id} p`)); //access the value as a string (${}) = get the child of the property that i reference 
    //     document.querySelector(`#${this.id} p`).style.background = `rgba(214, 110, 239 ,.75)`; //change the background of the paragraph 

    // let introSection = document.querySelector("#intro"); //more dynamic = interchange intro with any other section 
    // introSection.addEventListener("click", function (e) {
    //     console.log(this);
    //     let cssObj = window.getComputedStyle(this, null); //get style of object when its rendered
    //     let bgColor = cssObj.getPropertyValue("background-color"); //get only the background colour (not entire object)
    //     let backgroundColorArray = getColorObj(bgColor)
    //     console.log(backgroundColorArray)
    //     element.addEventListener("click", function (e) {
    //         console.log("is in now active");
    //         let cssObj = window.getComputedStyle(this, null);
    //         //get prop VALUE :: new
    //         let bgColor = cssObj.getPropertyValue("background-color");
    //         let backgroundColorArray = getColorObj(bgColor);
    //         // if(this.getAttribute("custom-bool") === "inactive")
    //         // {
    //         this.style.background = `rgba(
    //                               ${backgroundColorArray[0]},
    //                               ${backgroundColorArray[1]},
    //                               ${backgroundColorArray[2]},
    //                               0.5)`;
    //         document.querySelector(`#${this.id} p`).style.background = `rgba(
    //                               ${backgroundColorArray[0]},
    //                               ${backgroundColorArray[1]},
    //                               ${backgroundColorArray[2]},
    //                               0.75)`;

    //     )
    // }
    // );

    //EVENT FOR EVERY BLOCK TO CHANGE OPACITY / COLOUR WHEN CLICKED 
    // let allSections = document.querySelectorAll(".mouseclick-active-section");
    // //   //go through each section and apply the event listener
    // for (let element of allSections) {
    //     //add to each element
    //     element.addEventListener("click", function (e) {
    //         console.log("is in now active");
    //         let cssObj = window.getComputedStyle(this, null);
    //         //get prop VALUE :: new
    //         let bgColor = cssObj.getPropertyValue("background-color");
    //         let backgroundColorArray = getColorObj(bgColor);
    //         // if(this.getAttribute("custom-bool") === "inactive")
    //         // {
    //         //a:
    //         this.style.background = `rgba(
    //                             ${backgroundColorArray[0]},
    //                             ${backgroundColorArray[1]},
    //                             ${backgroundColorArray[2]},
    //                             0.5)`;
    //         document.querySelector(`#${this.id} p`).style.background = `rgba(
    //                                               ${backgroundColorArray[0]},
    //                                               ${backgroundColorArray[1]},
    //                                               ${backgroundColorArray[2]},
    //                                               0.75)`;
    //     });

    function getColorObj(inColor) { //dont need to rewrite the code if you change the element because it takes into account the computed style
        let substringColor = inColor.substring(
            inColor.indexOf("(") + 1,
            inColor.indexOf(")")
        );
        let rgbArray = [];
        rgbArray = substringColor.split(",");
        return rgbArray;
    }
    // TOGGLE FOR EVERY BLOCK SWITCH ACTIVE AND INACTIVE 
    let allSections = document.querySelectorAll(".mouseclick-active-section");
    //go through each section and apply the event listener
    for (let element of allSections) {
        //add to each element
        element.addEventListener("click", function (e) {
            console.log("is in now active");
            let cssObj = window.getComputedStyle(this, null);
            //get prop VALUE :: new
            let bgColor = cssObj.getPropertyValue("background-color");
            let backgroundColorArray = getColorObj(bgColor);
            if (this.getAttribute("custom-bool") === "inactive") {
                //a:
                this.style.background = `rgba(
                                                    ${backgroundColorArray[0]},
                                                    ${backgroundColorArray[1]},
                                                    ${backgroundColorArray[2]},
                                                    0.5)`
                document.querySelector(`#${this.id} p`).style.background = `rgba(
                                                    ${backgroundColorArray[0]},
                                                    ${backgroundColorArray[1]},
                                                    ${backgroundColorArray[2]},
                                                    0.75)`
                //mAKE active
                this.setAttribute("custom-bool", "active")
            }
            else {
                console.log('is now active')
                this.setAttribute("custom-bool", "inactive")
                this.style.background = `rgba(
                            ${backgroundColorArray[0]},
                            ${backgroundColorArray[1]},
                            ${backgroundColorArray[2]},
                            1.0)`

                document.querySelector(`#${this.id} p`).style.background = ""

            }

        })
    }

    //EVENT FOR BUBBLE BUTTON
    document.querySelector("#bubbleButton").addEventListener("click", createBubble)

    function createBubble(e) {
        console.log("button clicked");
        let bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.style.left = `${Math.random() * (window.innerWidth - 200)}px`; //scaling random
        bubble.style.top = `${Math.random() * (window.innerHeight - 200)}px`;

        let r = Math.ceil(Math.random() * 255); //new Math.ceil = using math library
        let g = Math.ceil(Math.random() * 255);
        let b = Math.ceil(Math.random() * 255);

        bubble.style.background = `rgba(${r},${g},${b})`;
        document.getElementById("top-layer").appendChild(bubble)
    }

}