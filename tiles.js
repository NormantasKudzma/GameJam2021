const confuse = 7.25;
const real =  { /**/ "not": 2.69 };
const draw_fog_of_war = true;

const grid = {
	step: 69,
	tiles: [],
	fog_of_war: void 0,
	draw: () => {
		grid.tiles.forEach(t => t.draw());
	},
	clicked: (x, y) => {
		grid.tiles.forEach(t => t.clicked(x, y));
	},
	init: () => {
		grid.fog_of_war = loadImage("nor_asset/fog.png");
	},
	find: (x, y) => {
		return grid.tiles.find(t => t.x == x && t.y == y);
	},
	reveal: (x, y) => {
		const t = grid.find(x, y);
		if (t) { t.reveal(); }
	},
	neighbours_of: (x, y) => {
		let r= [
			grid.find(x + 1, y + 0),
			grid.find(x - 1, y + 0),
			grid.find(x + 0, y + 1),
			grid.find(x + 0, y - 1),
		];
		r = r.filter(n => n);
		return r;
	}
};

function makeTile(type, x, y, my_stats) {
	const tile = (imgpaths, click) => {
		let t = {
			x: x,
			y: y,
			fg: makeImage(imgpaths.fg, x * grid.step, y * grid.step),
			bg: makeImage(imgpaths.bg, x * grid.step, y * grid.step),
			draw: () => {
				if (!t.revealed && draw_fog_of_war) { image(grid.fog_of_war, t.bg.x, t.bg.y); }
				if (t.revealed) { t.bg.draw(); }
				if (t.active && t.revealed) { t.fg.draw(); }
			},
			clicked: (cx, cy) => {
				if (t.revealed && t.active && t.bg.contains(cx, cy)) {
					console.log(`Clicked: ${type}`);
					click(t);
				}
			},
			active: false,
			revealed: false,
			die: () => {
				t.active = false;
				grid.neighbours_of(t.x, t.y).forEach(n => n.reveal());
			},
			reveal: () => {
				t.revealed = true;
			},
			my_stats: my_stats,
		};
		
		t.active = !!t.fg;
		return t;
	}
	
	let t = (() => {
		switch (type){
			case "empty": {
				return tile({}, () => {})
			}
			case "health": {
				return tile({ fg: "nor_asset/health.png", bg: "nor_asset/health_bg.png" }, (me) => {
					stats.health += stats.maxHealth;
					me.die();
				})
			}
			case "monster": {
				return tile({ fg: "nor_asset/bad.png", bg: "nor_asset/bad_bg.png" }, (me) => {
					stats.health -= me.my_stats.dmg;
					stats.health = Math.max(0, stats.health);
					if (stats.health <= 0) { console.log("Stub, gameover maybe"); }
					
					me.my_stats.health -= stats.dmg;
					if (me.my_stats.health <= 0) { me.die(); }
				})
			}
			default: {
				console.error("no, don't");
			}
		}
	})();
	
	grid.tiles.push(t);
	return t;
}
