let global_scale = 1;
const ref_width = 800;
const ref_height = 800;

function setup() {
	const canvas = createCanvas(windowWidth, windowHeight);
	canvas.style('display', 'block');
	windowResized();
	
	gui.init();
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
	scale(global_scale);
	grid.draw();
	
	gui.draw();
}

function mouseClicked() {
	grid.clicked(mouseX / global_scale, mouseY / global_scale);
}

function mouseMoved() { 
    grid.hover(mouseX / global_scale, mouseY / global_scale);
} 
