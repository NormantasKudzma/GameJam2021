let last = 0;

function setup() {
	const canvas = createCanvas(windowWidth, windowHeight);
	canvas.style('display', 'block');
	last = Date.now();
	
	grid.init();
	
	for (let i = 0; i < 5; ++i) {
		for (let j = 0; j < 5; ++j) {
			makeTile("monster", i, j, { "dmg": 5, "health": 15 });
		}
	}
	makeTile("empty", 6, 3);
	makeTile("health", 6, 6);
	
	grid.reveal(0, 0);
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
	
	grid.draw();
}

function mouseClicked() {
	grid.clicked(mouseX, mouseY);
} 

// monstra
// hp
// 