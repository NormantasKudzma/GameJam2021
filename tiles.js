// Draw fog of war
const draw_fog_of_war = true;
// Only draw fog of war on unrevealed neighbours
const fog_only_neighbours = true;

const hero = {
	frame_index: 0,
	imgs: void 0,
	img_weak: void 0,
	img_strong: void 0,
	init: () => {
		if (!hero.imgs) {
			hero.img_weak = [ makeImage("nor_asset/Hyro-1.png", 0, 0), makeImage("nor_asset/Hyro-2.png", 0, 0) ];
			hero.img_strong = [ makeImage("nor_asset/Hyro_cool_1.png", 0, 0), makeImage("nor_asset/Hyro_cool_2.png", 0, 0) ] ;
		}
		hero.imgs = hero.img_weak;
		hero.move(0, 0);
	},
	move: (x, y) => {
		hero.img_weak.forEach(i => {
			i.x = x * grid.step;
			i.y = y * grid.step;
		});
		hero.img_strong.forEach(i => {
			i.x = x * grid.step;
			i.y = y * grid.step;
		});
	},
	draw: () => {
		if (grid.current_frame % 30 == 0) { hero.frame_index = (hero.frame_index + 1) % hero.imgs.length; }
		hero.imgs[hero.frame_index].draw();
	},
	upgrade: () => {
		hero.imgs = hero.img_strong;
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
		stats.dmg = stats.initDmg;
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
			hearts_full: [],
			fg: imgpaths.fg && imgpaths.fg.map(p => makeImage(p, x * grid.step, y * grid.step)),
			bg: makeImage(imgpaths.bg, x * grid.step, y * grid.step),
			monster_sound: makeSound(imgpaths.sound),
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
					
					for (let i = 0; my_stats && i < my_stats.health | 0; ++i) {
						if (t.hearts_full[i]) { t.hearts_full[i].draw(); }
					}
				}
			},
			clicked: (cx, cy) => {
				if (t.hovered(cx, cy)) {
					console.log(`Clicked: ${content.type}`);
					const bro_what_level = level_nr;
					if (t.active) { click(t); } 
					
					/**
					* This be workaround for when you climb ladder
					* Im lazy now to fix it, so dont move anything around
					* And may god be with you if you do decide to understand this
					* hot garbage
					*/
					if (bro_what_level == level_nr) {
						if (!t.active) {
							hero.move(t.x, t.y);
						}
						else {
							const revealed_neighbour = t.neighbours.find(n => n.revealed && !n.active);
							if (revealed_neighbour) { hero.move(revealed_neighbour.x, revealed_neighbour.y); }
						}
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
			case "health2":
			case "health": {
				return tile({ fg: [ content.type == "health" ? "nor_asset/health.png" : "nor_asset/two_potions.png" ], bg: content.bg }, (me) => {
					stats.health += my_stats.heal;
					stats.health = Math.min(stats.maxHealth, stats.health);
					me.die();
					console.log(" *** health die *** ");
				});
			}
			case "poison":
			case "monster_blu":
			case "monster": {
				const types = [
					["nor_asset/Monster1-1.png", "nor_asset/Monster1-2.png"],
					["nor_asset/Monster2-1.png", "nor_asset/Monster2-2.png"],
				];
				const sounds = [
					"nor_asset/sounds/monster_die_1",
					"nor_asset/sounds/monster_die_2",
				];
				const index = (Math.random() * types.length) | 0;
				let t = types[index];
				let s = sounds[index];
				if (content.type == "monster_blu") {
					t = ["nor_asset/Monster3-1.png", "nor_asset/Monster3-2.png"];
					s = "nor_asset/sounds/monster_die_3";
				}
				if (content.type == "poison") {
					t = ["nor_asset/potion_poison.png"];
					s = "nor_asset/sounds/monster_die_3";
				}

				const monster = tile({ fg: t, bg: content.bg, sound: s }, (me) => {
					stats.health -= me.my_stats.dmg;
					stats.health = Math.max(0, stats.health);
					if (stats.health <= 0) { game_state = gameover; }
					
					me.my_stats.health -= stats.dmg;
					if (me.my_stats.health <= 0) {
						if (me.monster_sound) { 
							console.log(" *** sound *** ");
							me.monster_sound.play();
						}
						console.log(" *** monster die *** ");
						me.die();
					}
					grid.onhit();
				});
				
				if (content.type != "poison") { 
					const offx = grid.step / 2 - my_stats.health / 2 * 16;
					for (let i = 0; i < my_stats.health; ++i) {
						monster.hearts_full.push(makeImage("nor_asset/mini_life.png", offx + i * 22 + x * grid.step, 2 + y * grid.step));
					}
				}
				
				return monster;
			}
			case "exit": {
				return tile({ fg: ["nor_asset/exit.png"], bg: content.bg }, (me) => {
					level_nr++;
					do_the_map_thing();
					hero.move(0, 0);
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
			case "trident": {
				return tile({ fg: ["nor_asset/trident.png"], bg: content.bg }, (me) => {
					stats.dmg += 1;
					me.die();
					hero.upgrade();
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
