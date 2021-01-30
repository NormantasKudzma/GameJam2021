const gui = {
	health_imgs: [],
	health_empty: [],
	help: void 0,
	init: () => {
		gui.health_imgs = [];
		for (let i = 0; i < stats.maxHealth; ++i) {
			gui.health_imgs.push(makeImage("nor_asset/life.png", (7 + i) * grid.step, 0 * grid.step));
		}
		
		gui.health_empty = [];
		for (let i = 0; i < stats.maxHealth; ++i) {
			gui.health_empty.push(makeImage("nor_asset/life_empty.png", (7 + i) * grid.step, 0 * grid.step));
		}
		
		if (!gui.help) { gui.help = makeImage("nor_asset/f.png", 7 * grid.step, 1 * grid.step); }
	},
	draw: () => {
		for (let i = 0; i < stats.health; ++i) {
			gui.health_imgs[i].draw();
		}
		for (let i = stats.health; i < stats.maxHealth; ++i) {
			gui.health_empty[i].draw();
		}
		gui.help.draw();
	}
}
