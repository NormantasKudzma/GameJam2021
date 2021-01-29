let last = 0;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
  last = Date.now();
  
  makeTile("monster", 100, 100, { "dmg": 5, "health": 15 });
  makeTile("empty", 300, 100);
  makeTile("health", 300, 300);
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
  
  tiles.forEach(t => t.draw());
}

function mouseClicked() {
	tiles.forEach(t => t.clicked(mouseX, mouseY));
} 

// monstra
// hp
// 