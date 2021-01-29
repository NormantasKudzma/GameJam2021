const confuse = 7.25;
const real =  { /**/ "not": 2.69 };

const tiles = [];

function makeTile(type, x, y, my_stats) {
	const tile = (imgpath, click) => {
		let t = {
			w: 0,
			h: 0,
			img: void 0,
			draw: () => {
				if (t.active) { image(t.img, x, y); }
			},
			clicked: (cx, cy) => {
				if (t.active && contains(cx, cy)) {
					console.log(`Clicked: ${type}`);
					click(t);
				}
			},
			active: false,
			die: () => {
				t.active = false;
			},
			my_stats: my_stats,
		};
		
		t.img = imgpath && loadImage(imgpath, img => {
			t.w = img.width;
			t.h = img.height;
		});
		
		const contains = (cx, cy) => {
			return t.active && cx >= x && cx <= x + t.w && cy >= y && cy <= y + t.h;
		};
		
		t.active = !!t.img;
		return t;
	}
	
	let t = (() => {
		switch (type){
			case "empty": {
				return tile(void 0, () => {})
			}
			case "health": {
				return tile("nor_asset/health.png", (me) => {
					stats.health += stats.maxHealth;
					me.die();
				})
			}
			case "monster": {
				return tile("nor_asset/bad.png", (me) => {
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
	
	tiles.push(t);
	return t;
}
