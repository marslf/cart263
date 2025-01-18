"use strict";

let counter = 0;

let square = {
    x: 10,
    y: 10,
    w: 30,
    h: 30,
    color: {
        r: 255,
        g: 138,
        b: 0,
    }
}

function setup() {
    console.log("go")
    createCanvas(600, 600);
}

function draw() {
    background(0);
    
    if (checkCollisionWithSquare()) {
        fill(255, 180, 100);
    } else {
        fill(square.color.r, square.color.g, square.color.b);
    }
    displaySquare();
}

function displaySquare() {
    push();
    rect(square.x, square.y, square.w, square.h);
    pop();
}

function checkCollisionWithSquare() {
    return mouseX >= square.x &&
        mouseX <= square.x + square.w &&
        mouseY >= square.y &&
        mouseY <= square.y + square.h;
}

function mousePressed() {
    if (checkCollisionWithSquare()) {
        counter++;
    }
}