let possibleColor = ["#5d3fd3", "#a73fd3", "#d33fb5", "#d35d3f", "#d3a73f"];

window.onload = async function () {
    console.log("task 7-8");

    try {
        //1- Load data from iris.json
        const response = await fetch("data/iris.json");
        const irisData = await response.json();
        console.log("1- Iris data loaded:", irisData);

        //2- map()
        const irisesWithColors = irisData.map(iris => {
            const randomIndex = Math.floor(Math.random() * possibleColor.length);
            return { ...iris, color: possibleColor[randomIndex] };
        });

        console.log("2- Irises with Colors:", irisesWithColors);

        //3 - Filter()
        const filteredIrises = irisesWithColors.filter(iris => iris.sepalWidth < 4);
        console.log("3- Filtered Irises (sepalWidth < 4):", filteredIrises);

        //4- Reduce()
        const totalPetalLength = irisesWithColors.reduce((accumulator, iris) => {
            return accumulator + iris.petalLength;
        }, 0);

        const averagePetalLength = totalPetalLength / irisesWithColors.length;
        console.log("4- Average petalLength:", averagePetalLength);

        //5- Find() > 1.0
        const irisWithLargePetalWidth = irisesWithColors.find(iris => iris.petalWidth > 1.0);
        console.log("5- Iris with petalWidth > 1.0:", irisWithLargePetalWidth);

        //6- Some() > 10
        const hasPetalLengthGreaterThan10 = irisesWithColors.some(iris => iris.petalLength > 10);
        console.log("6- Is there an iris with petalLength > 10?", hasPetalLengthGreaterThan10);


    } catch (error) {
        console.error("Error loading iris data:", error);
    }

}
