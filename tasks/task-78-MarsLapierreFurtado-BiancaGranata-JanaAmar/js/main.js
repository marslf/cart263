let possibleColor = ["#5d3fd3", "#a73fd3", "#d33fb5", "#d35d3f", "#d3a73f"];

const irisesWithColors = irisData.map(iris => {
    //2- Map() = Randomly select color from array
    const randomIndex = Math.floor(Math.random() * possibleColor.length);
    return { ...iris, color: possibleColor[randomIndex] };
});

console.log("Irises with Colors:", irisesWithColors);

window.onload = async function () {
    console.log("task 7-8");

    //1- Load data from iris.json
    try {
        const response = await fetch("data/iris.json");
        const irisData = await response.json();
        console.log("Iris data loaded:", irisData);

    } catch (error) {
        console.error("Error loading iris data:", error);
    }
}