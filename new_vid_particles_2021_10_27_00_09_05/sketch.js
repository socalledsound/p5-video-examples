let myParticle;
let particles;
let particleSize = 10
const maxParticleSize = particleSize * 3;
const minParticleSize = particleSize / 10;
let numWide, numHigh;
let video;
let myPixels;

function setup() {
  createCanvas(400, 400);
  frameRate(25);
  //here I am dividing the total width and height by the size of each particle so I know how big my grid is
  numWide = width/particleSize;
  numHigh = height/particleSize;
  
  
  //we need this helper function to make a 2d array in javascript.
  particles = make2DArray(numWide, numHigh);
  console.log(particles);
    //as a reminder, a 2d array is an array of arrays, like this:
  //[[x,x,x],[x,x,y],[x,x,x]]
  //I can access the y in this 2d array like this:
  //array[1][2]
  
  //here is where we create a capture tag in our sketch.
  //we set the size of it to the size of our canvas
  video = createCapture(VIDEO);
  video.size(width, height);
 // video.hide();
  

  //our nested for loop which will fill our 2d array with particles.
  //later on we will use another nested for loop in the draw loop
  //to draw the particles on the screen
  for(let i = 0; i < numWide; i++){
    for(let j = 0; j < numHigh; j++){
  particles[i][j] = new Particle(i * particleSize, j * particleSize, particleSize, [220, 90, 220, 100])
      
    }
  } 
 // console.log(myParticle);
  console.log(particles);
  
  
  
}

function draw() {
  // background(255);
  
  //"load" the pixels, each time through the draw loop so that the pixel array gets updated with new info from the camera.
  video.loadPixels();
  // console.log(video.pixels.length)
  
  
  //here is where we update, move and display each particle
  for(let i = 0; i < numWide; i++){
    for(let j = 0; j < numHigh; j++){
      
        //get r, g, b values for this location
        let thisColor = getColorFromPixels(i, j);
        // console.log(thisColor);
        //feed them in to our particle
        particles[i][j].updateColor(thisColor);
        particles[i][j].updateSize(thisColor);
        particles[i][j].move();
        particles[i][j].display();
    }
  }
}


//our constructor function

class Particle{
  constructor(x,y,size,col){
    this.x =x;
    this.y = y;
    this.size = size;
    this.col = col;
  }


  updateSize(thisColor){
    if(thisColor[0] > thisColor[1] && this.size > minParticleSize){
      this.size -= 1;
    } else if(this.size < maxParticleSize) {
      this.size += 1
    }
  }
  
  move(){
  
    this.x+= random(-0.5, 0.5);
    this.y+= random(-0.5, 0.5);
  
  }

  
  updateColor(thisColor){
  
    // let thisColor = video.get(this.x, this.y);
  
    this.col = [thisColor[0], thisColor[1], thisColor[2], 20];
    // this.col.push(20);
    noStroke();
  
  }
  
  display(){
    fill(this.col);
    ellipse(this.x, this.y, this.size * 2);
  }

}

//a helper function to get color from the pixel array
function getColorFromPixels(i, j){
  
  // [0..10]
  // [0..10]
  // 0,0
  //[red, green, blue, alpha, red, green, blue, alpha, red, green, blue, alpha];
 //0, 0
  
  // j * canvasWidth
  //0
  //0 + 0 * 4
  //0
  
  // 0 + 1 * 4;
  //4
  
  // 0 + 2 * 4;
  //8
  
  
  
  
  let index = ((j * particleSize * video.width) + i * particleSize)  * 4;
  
  let r = video.pixels[index];
  let g = video.pixels[index + 1];
  let b = video.pixels[index + 2];
  let a = video.pixels[index+ 3];
  let newColor = [r,g,b,a];
  return newColor
}



//the helper function which returns a 2d array
function make2DArray(rows, cols){
  let arr = new Array(rows);
  for(let i = 0; i < arr.length; i++){
      arr[i] = new Array(cols)
  }
  return arr
}