function getLevel() {
	let level = [
		[ 1, 1, 1, 0, 1 ],
		[ 0, 0, 1, 1, 1 ],
		[ 0, 1, 1, 0, 1 ],
		[ 1, 1, 0, 1, 1 ],
		[ 0, 1, 1, 0, 0 ],
	];
	return level;
}

function do_the_map_thing() {
	grid.clear();
	
	const level = getLevel();
	
	const neighbours_to_tile = {
		"0100": "nor_asset/tiles/one_down.png",
		"0010": "nor_asset/tiles/one_left.png",
		"0001": "nor_asset/tiles/one_right.png",
		"1000": "nor_asset/tiles/one_up.png",
		
		"0110": "nor_asset/tiles/two_down_left.png",
		"0101": "nor_asset/tiles/two_down_right.png",
		"0011": "nor_asset/tiles/two_left_right.png",
		"1100": "nor_asset/tiles/two_up_down.png",
		"1010": "nor_asset/tiles/two_up_left.png",
		"1001": "nor_asset/tiles/two_up_right.png",
		
		"0111": "nor_asset/tiles/try_down_left_right.png",
		"1110": "nor_asset/tiles/try_up_down_left.png",
		"1101": "nor_asset/tiles/try_up_down_right.png",
		"1011": "nor_asset/tiles/try_up_left_right.png",
		
		"1111": "nor_asset/tiles/four.png",
	};
	
	const neighbours_of = (x, y) => {
		return [
			y > 0 && level[y - 1][x],
			y < level.length - 1 && level[y + 1][x],
			x > 0 && level[y][x - 1],
			x < level[y].length - 1 && level[y][x + 1],
		].map(x => x | 0);
	};
	
	for (let y = 0; y < level.length; ++y) {
		for (let x = 0; x < level[y].length; ++x) {
			if (level[y][x] == 0) { continue; }
			
			const tile = neighbours_to_tile[neighbours_of(x, y).join("")];
			makeTile({ "type": "health", "bg": tile }, x, y);
		}
	}
	
	// stub
	grid.reveal(0, 0);
}
