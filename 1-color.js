let video


function setup(){
    createCanvas(640,360)
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

}

function trackAveragePixel(){
    const threshold = 80
    let avgX = 0
    let avgY = 0
    let count = 0

    // Begin loop to walk through every pixel
    for (let x = 0; x < video.width; x++ ) {
        for (let y = 0; y < video.height; y++ ) {
            let loc = x + y * video.width;
            // What is current color
            // gotta convert this to js 
            let currentColor = video.pixels[loc];
            let r1 = red(currentColor);
            let g1 = green(currentColor);
            let b1 = blue(currentColor);
            let r2 = red(trackColor);
            let g2 = green(trackColor);
            let b2 = blue(trackColor);

            let d = distSq(r1, g1, b1, r2, g2, b2); 

            if (d < threshold*threshold) {
                stroke(255);
                strokeWeight(1);
                point(x, y);
                avgX += x;
                avgY += y;
                count++;
            }
        }
    }
    if (count > 0) { 
        avgX = avgX / count;
        avgY = avgY / count;
        // Draw a circle at the tracked pixel
        fill(255);
        strokeWeight(4.0);
        stroke(0);
        ellipse(avgX, avgY, 24, 24);
      }

}

function distSq(x1, y1, z1, x2, y2, z2) {
    const d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) +(z2-z1)*(z2-z1);
    return d;
  }

function draw(){

    background(0)
    video.loadPixels();
    image(video, 0, 0)
}