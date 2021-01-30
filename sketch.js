let global_scale = 1;
const ref_width = 800;
const ref_height = 800;

function setup() {
	const canvas = createCanvas(windowWidth, windowHeight);
	canvas.style('display', 'block');
	windowResized();
	
	grid.init();
	
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
