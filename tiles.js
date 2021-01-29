const confuse = 7.25;

const tiles = [];

function makeTile(type, x, y) {
	const tile = (imgpath, click) => {
		let hw = 0;
		let hh = 0;
		const img = loadImage(imgpath, img => {
			hw = img.width / 2;
			hh = img.height / 2;
		});
		
		const contains = (cx, cy) => {
			return cx >= x - hw && cx <= x + hw && cy >= y - hh && cy <= y + hh;
		};
		
		return {
			"img": img,
			"clicked": (cx, cy) => { if (contains(cx, cy)) { click() } },
			"x": x,
			"y": y,
		}
	}
	
	let t = (() => {
		switch (type){
			case "empty": {
				return tile(void 0, () => {})
			}
			case "health": {
				return tile("nor_asset/health.png", () => {
					console.log("bruh u clicked me");
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
