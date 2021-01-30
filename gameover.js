const gameover = {
	img: void 0,
	init: () => {
		gameover.img = makeImage("nor_asset/gameover.png", 128, 128);
	},
	draw: () => {
		background(255);
		gameover.img.draw();
	},
	clicked: (cx, cy) => {
		game_state = intro;
	},
	hover: (cx, cy) => {
		
	}
}