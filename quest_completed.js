const quest_completed = {
	img: void 0,
	init: () => {
		quest_completed.img = makeImage("nor_asset/win.png", 128, 128);
	},
	draw: () => {
		background(255);
		quest_completed.img.draw();
	},
	clicked: (cx, cy) => {
		level_nr = 1;
		game_state = intro;
	},
	hover: (cx, cy) => {
		
	}
}