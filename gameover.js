const gameover = {
	img: void 0,
	gif: void 0,
	init: () => {
		gameover.gif = makeImage("nor_asset/gameover.gif", 128, 128);
		gameover.img = makeImage("nor_asset/gameover.png", 110, 310);
	},
	draw: () => {
		background(37, 19, 26);
		gameover.img.draw();
		gameover.gif.draw();
	},
	clicked: (cx, cy) => {
		level_nr = 1;
		game_state = intro;
	},
	hover: (cx, cy) => {
		
	}
}