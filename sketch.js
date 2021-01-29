let tile = void 0;
let last = 0;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
  last = Date.now();
  
  tile = makeTile("health", 300, 300);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  const now = Date.now();
  const dt = (now - last) / 1000;
  last = now;
  
  background(255);
  
  //translate(windowWidth/2, windowHeight/2);
  text("hello, this is working", 0, 0);
  
  image(tile.img, tile.x, tile.y);
}

function mouseClicked() { 
    console.log(mouseX);
    console.log(mouseY); 
	tiles.forEach(t => t.clicked(mouseX, mouseY));
} 

// monstra
// hp
// 