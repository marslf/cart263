window.onload = setup;

function setup() {
    console.log("events!")
    
    let introSection = document.querySelector("#intro");
    introSection.addEventListener("click", function (e) {
        console.log(this);
        console.log(e)

        //a:
        this.style.background = `rgba(214, 110, 239, 0.5)`
    });
}