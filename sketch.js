function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
  last = Date.now();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  const now = Date.now();
  const dt = (now - last) / 1000;
  last = now;
  
  text("hello, this is working", 200, 200);
}