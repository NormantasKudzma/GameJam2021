let global_scale = 1;
const ref_width = 800;
const ref_height = 800;
const graphics_mode = 'webgl';

let game_state = void 0;
let gl = void 0;

function setup() {
	windowResized();
	
	gui.init();
	intro.init();
	gameover.init();
	quest_completed.init();
	grid.init();
	game_state = intro;
}

function windowResized() {
	let sx = windowWidth / ref_width;
	let sy = windowHeight / ref_height;
	global_scale = Math.min(sx, sy);
	const canvas = createCanvas(windowWidth, windowHeight, graphics_mode == 'webgl' ? WEBGL : void 0);
	canvas.style('display', 'block');
	gl = canvas.GL;
	noStroke();
}

function draw() {
	translate(-width/2,-height/2,0);
	scale(global_scale);
	game_state.draw();
}

function mouseClicked() {
	if (game_state) { game_state.clicked(mouseX / global_scale, mouseY / global_scale); }
}

function mouseMoved() { 
    if (game_state) { game_state.hover(mouseX / global_scale, mouseY / global_scale); }
}
