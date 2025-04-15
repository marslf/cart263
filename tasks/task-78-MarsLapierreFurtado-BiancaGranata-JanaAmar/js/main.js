window.onload = async function () {
    console.log("task 7-8");
    try {
        const response = await fetch("data/iris.json");
        const irisData = await response.json();
        console.log("Iris data loaded:", irisData);

    } catch (error) {
        console.error("Error loading iris data:", error);
    }
}