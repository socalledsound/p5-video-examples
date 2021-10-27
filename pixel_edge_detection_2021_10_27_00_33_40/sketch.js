// Example 15-12: Pixel neighbor differences (edges)

let img;         // Source image
let destination; // Destination image

function preload(){
  img = loadImage("sunflower400.jpg");
}


function setup() {
  createCanvas(400,400);

  destination = createImage(img.width, img.height);
  //console.log(img.width);
}

function draw() {
  
  // We are going to look at both image's pixels
  img.loadPixels();
  destination.loadPixels();
  
  // Since we are looking at left neighbors
  // We skip the first column
  for (let x = 1; x < width; x++ ) {
    for (let y = 0;  y < height; y++ ) {
      
//       // Pixel location and color
       let loc = (x + y * width) * 4;
      let red1 = img.pixels[loc];
      let green1 = img.pixels[loc+1];
       let blue1 = img.pixels[loc+2];
       let alpha1 = img.pixels[loc+3];
      
      console.log(red1);
      // Pixel to the left location and color
          let loc2 = ((x-1) + y * img.width)*4;
          let red2 = img.pixels[loc2];
          let green2 = img.pixels[loc2+1];
          let blue2 = img.pixels[loc2+2];
          let alpha2 = img.pixels[loc2+3];
      
      
      // New color is difference between pixel and left neighbor
      let diff = abs(((red1+green1+blue1)/3) - ((red2+green2+blue2)/3) );
      
      //let diff = 220;
      destination.pixels[loc] = diff; 
      destination.pixels[loc+1] = diff; 
      destination.pixels[loc+2] = diff; 
      destination.pixels[loc+3] = 255; 
    }
  }
  
  // We changed the pixels in destination
  destination.updatePixels();
  // Display the destination
  image(destination,0,0);
// //  image(img,0,0);
 }