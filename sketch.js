let global_scale = 1;
const ref_width = 800;
const ref_height = 800;

function setup() {
	const canvas = createCanvas(windowWidth, windowHeight);
	canvas.style('display', 'block');
	windowResized();
	
	grid.init();
	
	/*for (let i = 0; i < 5; ++i) {
		for (let j = 0; j < 5; ++j) {
			makeTile("monster", i, j, { "dmg": 5, "health": 15 });
		}
	}
	makeTile("empty", 6, 3);
	makeTile("health", 6, 6);
	
	grid.reveal(0, 0);*/
	do_the_map_thing();
}

function windowResized() {
	let sx = windowWidth / ref_width;
	let sy = windowHeight / ref_height;
	global_scale = Math.min(sx, sy);
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(255);
	
	scale(global_scale);
	grid.draw();
}

function mouseClicked() {
	grid.clicked(mouseX / global_scale, mouseY / global_scale);
} 

// monstra
// hp
// 