const intro = {
	img: void 0,
	init: () => {
		intro.img = makeImage("nor_asset/intro.png", 128, 128);
	},
	draw: () => {
		background(255);
		intro.img.draw();
	},
	clicked: (cx, cy) => {
		game_state = grid;
		stats.health = stats.maxHealth;
		do_the_map_thing();
	},
	hover: (cx, cy) => {
		
	}
}