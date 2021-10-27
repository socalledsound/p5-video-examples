const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const GRID_SIZE = 100;
const NUMROWS = CANVAS_HEIGHT/GRID_SIZE;
const NUMCOLUMNS = CANVAS_WIDTH/GRID_SIZE;
let myCapture;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT); // we need some space...
  frameRate(25); // set framerate
  myCapture = createCapture(VIDEO); // createCapture
  myCapture.size(CANVAS_WIDTH, CANVAS_HEIGHT); //set size of capture
  // uncomment this next line if you want to see the video element below the canvas
  // myCapture.hide(); 
}

function draw() {

  for(let i = 0; i < NUMROWS; i++){
    for(let j = 0; j < NUMCOLUMNS; j++){   
      //get a pixel for each tile in the grid
      //notice i will go from 0 to 7 and so will j
        let pixcell = myCapture.get(i * GRID_SIZE, j * GRID_SIZE);
        console.log(pixcell);
      //draw the color we just got
      fill(pixcell);
        //draw a rectangle for each location of size gridsize x gridsize
        rect(i * GRID_SIZE, j * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }
  }

  //image(myCapture, 0, 0, 800, 800);

}