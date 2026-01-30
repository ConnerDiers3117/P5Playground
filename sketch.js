function setup() {
  createCanvas(windowWidth, windowHeight);  
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  let hue = map(mouseX, 0, width, 0, 360);
  let brightness = map(mouseY, 0, height, 40, 100);
  background(hue, 80, brightness);
  }


function windowResizec () {
  resizeCanvas(windowWidth,windowHeight)
}

function dynamicBackground (){

}

function animatedObject () {
  
}

function mouseInteraction () {

}

function patternGeneration () {
    
}

function setup() {
    createCanvas(600, 400);
    colorMode(HSB, 360, 100, 100);
  }

function draw() {
    let hue = map(mouseX, 0, width, 0, 360);
    let brightness = map(mouseY, 0, height, 40, 100);
    background(hue, 80, brightness);
  }