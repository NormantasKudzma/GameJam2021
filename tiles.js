// Draw fog of war
const draw_fog_of_war = true;
// Only draw fog of war on unrevealed neighbours
const fog_only_neighbours = true;

const hero = {
	img: void 0,
	init: () => {
		if (!hero.img) { hero.img = makeImage("nor_asset/Hyro.png", 0, 0); }
		hero.move(0, 0);
	},
	move: (x, y) => {
		hero.img.x = x * grid.step;
		hero.img.y = y * grid.step;
	},
	draw: () => {
		hero.img.draw();
	}
}

const grid = {
	step: 80,
	tiles: [],
	fog_of_war: void 0,
	background: void 0,
	is_game_over: false,
	hit_color: 0,
	current_frame: 0,
	draw: () => {
		++grid.current_frame;
		grid.hit_color = Math.max(grid.hit_color - 7, 0);
		background(37 + grid.hit_color, 19, 26);
		
		texture(grid.background);
		const u = 1 + width / grid.background.width;
		const v = 1 + height / grid.background.height;
		for (let i = 0; i < v; ++i) {
			for (let j = 0; j < u; ++j) {
				rect(j * grid.background.width, i * grid.background.height, grid.background.width, grid.background.height);
			}
		}

		grid.tiles.forEach(t => t.draw());

		hero.draw();
		gui.draw();
	},
	clicked: (x, y) => {
		if (grid.is_game_over) { return; }
		grid.tiles.forEach(t => t.clicked(x, y));
	},
	last_hovered: void 0,
	hover: (x, y) => {
		if (grid.is_game_over) { return; }
		const new_hovered = grid.tiles.find(t => t.hovered(x, y));
		if (new_hovered != grid.last_hovered) {
			if (grid.last_hovered) { grid.last_hovered.highlight(false); }
			if (new_hovered) { new_hovered.highlight(true); }
			grid.last_hovered = new_hovered;
		}
	},
	init: () => {
		grid.fog_of_war = loadImage("nor_asset/fog.png");
		grid.background = loadImage("nor_asset/BackgroundTexture.png");
		grid.clear();
	},
	find: (x, y) => {
		return grid.tiles.find(t => t.x == x && t.y == y);
	},
	reveal: (x, y) => {
		const t = grid.find(x, y);
		if (t) { t.reveal(); }
	},
	neighbours_of: (x, y) => {
		return [
			grid.find(x + 1, y + 0),
			grid.find(x - 1, y + 0),
			grid.find(x + 0, y + 1),
			grid.find(x + 0, y - 1),
		].filter(n => n);
	},
	clear: () => {
		grid.is_game_over = false;
		grid.hit_color = 0;
		grid.tiles = [];
		hero.init();
		stats.maxHealth = stats.initHealth;
		gui.init();
	},
	gameover: () => {
		console.log("Game over, stub");
		grid.is_game_over = true;
	},
	onhit: () => {
		grid.hit_color = 255;
	}
};

function makeTile(content, x, y, my_stats) {
	const tile = (imgpaths, click) => {
		let t = {
			x: x,
			y: y,
			frame_index: 0,
			fg: imgpaths.fg && imgpaths.fg.map(p => makeImage(p, x * grid.step, y * grid.step)),
			bg: makeImage(imgpaths.bg, x * grid.step, y * grid.step),
			draw: () => {
				if (!t.revealed && draw_fog_of_war) {
					const draw_fog = !fog_only_neighbours || t.neighbours.find(n => n.revealed);
					if (draw_fog) {
						texture(grid.fog_of_war);
						rect(t.bg.x, t.bg.y, 80, 80);
					}
				}
				if (t.revealed) { t.bg.draw(); }
				if (t.active && t.revealed && t.fg) {
					if (grid.current_frame % 30 == 0) { t.frame_index = (t.frame_index + 1) % t.fg.length; }
					t.fg[t.frame_index].draw();
				}
			},
			clicked: (cx, cy) => {
				if (t.hovered(cx, cy)) {
					console.log(`Clicked: ${content.type}`);
					if (t.active) { click(t); } 
					if (!t.active) {
						hero.move(t.x, t.y);
					}
					else {
						const revealed_neighbour = t.neighbours.find(n => n.revealed && !n.active);
						if (revealed_neighbour) { hero.move(revealed_neighbour.x, revealed_neighbour.y); }
					}
				}
			},
			hovered: (cx, cy) => {
				return t.revealed && t.bg.contains(cx, cy);
			},
			active: false,
			revealed: false,
			die: () => {
				t.active = false;
				t.highlight(false);
				grid.neighbours_of(t.x, t.y).forEach(n => n.reveal());
			},
			reveal: () => {
				const die_now = !t.active && !t.revealed;
				t.revealed = true;
				if (die_now) { t.die(); }
			},
			highlight: (on) => {
				t.bg.highlight(on);
			},
			my_stats: my_stats,
			neighbours: [],
		};
		
		t.active = !!imgpaths.fg;
		return t;
	}
	
	let t = (() => {
		switch (content.type){
			case "empty": {
				return tile({ bg: content.bg }, (me) => {});
			}
			case "health": {
				return tile({ fg: ["nor_asset/health.png"], bg: content.bg }, (me) => {
					stats.health += my_stats.heal;
					stats.health = Math.min(stats.maxHealth, stats.health);
					me.die();
				});
			}
			case "poison":
			case "monster_blu":
			case "monster": {
				const types = [
					["nor_asset/Monster1-1.png", "nor_asset/Monster1-2.png"],
					["nor_asset/Monster2-1.png", "nor_asset/Monster2-2.png"],
				];
				let t = types[(Math.random() * types.length) | 0];
				if (content.type == "monster_blu") { t = ["nor_asset/Monster3-1.png", "nor_asset/Monster3-2.png"]; }
				if (content.type == "poison") { t = ["nor_asset/poison.png"]; }
				
				return tile({ fg: t, bg: content.bg }, (me) => {
					stats.health -= me.my_stats.dmg;
					stats.health = Math.max(0, stats.health);
					if (stats.health <= 0) { game_state = gameover; }
					
					me.my_stats.health -= stats.dmg;
					if (me.my_stats.health <= 0) { me.die(); }
					
					grid.onhit();
				});
			}
			case "exit": {
				return tile({ fg: ["nor_asset/exit.png"], bg: content.bg }, (me) => {
					level_nr++;
					do_the_map_thing();
				});
			}
			case "quest": {
				return tile({ fg: [ "nor_asset/goal1_1.png", "nor_asset/goal1_2.png" ], bg: content.bg }, (me) => {
					console.log("stub, picked up quest item");
					game_state = quest_completed;
				});
			}
			case "heart": {
				return tile({ fg: ["nor_asset/potion_max_health.png"], bg: content.bg }, (me) => {
					stats.maxHealth += 1;
					me.die();
					gui.init();
				});
			}
			default: {
				console.error("no, don't");
			}
		}
	})();
	
	grid.tiles.push(t);
	return t;
}
