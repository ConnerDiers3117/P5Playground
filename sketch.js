//Global variables
//array to hold shapes for mouse interaction mode
let shapes = [];
//current mode
let mode = null;
//buttons
let bgButton, aoButton, miButton, pgButton;
//ball position
let ballX, ballY;
//velocity x direction
let ballDX = 50;
//velocity y direction
let ballDY = 40;
//radius
let ballR = 25;



function setup() {
  createCanvas(windowWidth, windowHeight);  
  colorMode(HSB, 360, 100, 100);

  //initializing ball position for animated object mode
  ballX = width / 2;
  ballY = height / 2;



  //Creating buttons for different modes
  bgButton = createButton('Dynamic Background');
  bgButton.position(10, 10);
  bgButton.mousePressed(() => mode = 'dynamicBackground');
  
  aoButton = createButton('Animated Object');
  aoButton.position(10, 40);
  aoButton.mousePressed(() => mode = 'animatedObject');

  miButton = createButton('Mouse Interaction');
  miButton.position(10, 70);
  miButton.mousePressed(() => mode = 'mouseInteraction');

  pgButton = createButton('Pattern Generation');
  pgButton.position(10, 100);
  pgButton.mousePressed(() => mode = 'patternGeneration');

}

function windowResized () {
  // Adjust canvas size when window is resized
  resizeCanvas(windowWidth,windowHeight)
}

function keyPressed() {
  // Switch modes based on number keys
  //Googled it cause I thought it would be a nice touch
  if (key === '1') mode = "dynamicBackground";
  if (key === '2') mode = "animatedObject";
  if (key === '3') mode = "mouseInteraction";
  if (key === '4') mode = "patternGeneration";
}

function mousePressed() {
  // In mouse interaction mode, add a shape at mouse position
  shapes.push({
    // position
    x: mouseX,
    y: mouseY,
    // random type, size, color
    type: random(['circle', 'square', 'triangle']),
    size: random(20, 100),
    col: color(random(360), 80, 100)
  });
}


function draw() {
  background(0); // Default background
  // Call the function based on the current mode
  if (mode === "dynamicBackground") {
    dynamicBackground();
  } 
  else if (mode === "animatedObject") {
    animatedObject();
  } 
  else if (mode === "mouseInteraction") {
    mouseInteraction();
  } 
  else if (mode === "patternGeneration") {
    patternGeneration();
  }
  
}

function dynamicBackground (){
  //Changes background color based on mouse position, with hue on X axis and brightness on Y axis
  let hue = map(mouseX, 0, width, 0, 360);
  let brightness = map(mouseY, 0, height, 40, 100);
  background(hue, 80, brightness);
  //This code is what i thought mouse interaction was at first but it wasnt, so im throwing it in here
  //Follows the mouse with eyeballs, pupils looking towards the mouse pointer make a cool background
  // EyeBall 1 left side looking right
  fill(255);
  //main eyeball
  circle((mouseX-100), (mouseY-100), 100, 100);
  fill(0);
  //pupil
  circle((mouseX-85), (mouseY-80), 50, 50);
  fill(255);
  
  //EyeBall 2 right side looking left
  fill(255);
  //main eyeball
  circle((mouseX+100), (mouseY-100), 100, 100);
  fill(0);
  //pupil
  circle((mouseX+85), (mouseY-80), 50, 50);
  fill(255);

  //EyeBall 3 looking up from center below 
  fill(255);
  //main eyeball
  circle((mouseX), (mouseY+100), 100, 100);
  fill(0);
  //pupil
  circle((mouseX), (mouseY+80), 50, 50);
  fill(255);

  
}

function animatedObject () {
  // draw background as neon pink
  background(330, 100, 100);
  fill(0);
  noStroke();
  circle(ballX, ballY, ballR * 2);

  // move ball
  ballX += ballDX;
  ballY += ballDY;

  // bounce edges
  if (ballX > width - ballR || ballX < ballR) {
    ballDX *= -1;
  }
  // bounce top and bottom 
  if (ballY > height - ballR || ballY < ballR) {
    ballDY *= -1;
  }
 
}

function mouseInteraction () {
  background(0); // or whatever background you want
  // draw all shapes
  //auto complete added the chunk of if statements here, made it easier to get sizes and positions right
  for (let s of shapes) {
    fill(s.col);
    noStroke();
    // draw shape based on type, and center shapes properly
    if (s.type === 'circle') {
      circle(s.x, s.y, s.size);
      // center circle at (s.x, s.y)
    } else if (s.type === 'square') {
      rect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
    } else if (s.type === 'triangle') {
      // draw triangle centered at (s.x, s.y)
      triangle(
        s.x, s.y - s.size / 2,
        s.x - s.size / 2, s.y + s.size / 2,
        s.x + s.size / 2, s.y + s.size / 2
      );
    }
  }

}

function patternGeneration () {
  // pattern of intermixing circles and rectangles with random colors in a grid pattern that moves left and right slowly
  background(220, 20, 100);
  //grid size, offset for animation
  let gridSize = 100;
  let offsetX = frameCount % gridSize;
  
  for (let x = -gridSize + offsetX; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      //randomly choose circle or rectangle
      let shapeType = random(['circle', 'rectangle']);
      //random color
      let col = color(random(360), 80, 100);
      fill(col);
      noStroke();
      //draw shape, and center it in the grid cell, computer did math to get it centered
      if (shapeType === 'circle') {
        circle(x + gridSize / 2, y + gridSize / 2, gridSize * 0.8);
      }
      else {
        rect(x + gridSize * 0.1, y + gridSize * 0.1, gridSize * 0.8, gridSize * 0.8);
      }
    }
  } 
  
  


    
}

