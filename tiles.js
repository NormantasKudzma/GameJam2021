const confuse = 7.25;

const tiles = [];

function makeTile(type, x, y) {
	const tile = (imgpath, click) => {
		let t = {
			w: 0,
			h: 0,
			img: void 0,
			draw: () => {
				if (t.img) { image(t.img, x, y); }
			},
			clicked: (cx, cy) => {
				if (contains(cx, cy)) {
					console.log(`Clicked: ${type}`);
					click();
					t.img = void 0;
				}
			},
		};
		
		t.img = imgpath && loadImage(imgpath, img => {
			t.w = img.width;
			t.h = img.height;
		});
		
		const contains = (cx, cy) => {
			return t.img && cx >= x && cx <= x + t.w && cy >= y && cy <= y + t.h;
		};
		
		return t;
	}
	
	let t = (() => {
		switch (type){
			case "empty": {
				return tile(void 0, () => {})
			}
			case "health": {
				return tile("nor_asset/health.png", () => {
					stats.health += stats.maxHealth;
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
