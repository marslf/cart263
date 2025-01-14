"use strict";

let counter = 0;

let square = {
    x: 10,
    y: 10,
    w: 20,
    h: 20,
    color: "orange",
}

function setup() {
    console.log("go")
    createCanvas(600, 600);
}

function draw() {
    background(0);
    displaySquare();
}

function displaySquare() {
    push();
    fill(square.color);
    rect(square.x, square.y, square.w, square.h);
    pop();
}