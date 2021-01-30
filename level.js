const TILE_NO_TILE = 0;
const TILE_EMPTY = 1;
const TILE_MONSTER = 2;
const TILE_HEALTH_POT = 3;
const TILE_EXIT = 4;
const TILE_QUEST = 5;

const dimensions = 10;
const number_of_rooms = 20;

let level_nr = 1;

function TileInDungeon(level, x, y) {
	if (x < 0 || x >= dimensions || y < 0 || y >= dimensions) {
		return false;
	}
	return true;
}

function CanPlaceRoom(level, x, y) {
	if (level[x][y] > TILE_NO_TILE) {
		return false;
	}
	if (TileInDungeon(level, x - 1, y)) {
		if (level[x - 1][y] > TILE_NO_TILE) {
			return true;
		}
	}
	if (TileInDungeon(level, x + 1, y)) {
		if (level[x + 1][y] > TILE_NO_TILE) {
			return true;
		}
	}
	if (TileInDungeon(level, x, y + 1)) {
        if (level[x][y + 1] > TILE_NO_TILE) {
			return true;
		}
	}
	if (TileInDungeon(level, x, y - 1)) {
        if (level[x][y - 1] > TILE_NO_TILE) {
			return true;
		}
	}
	return false;
}

function getLevel(isRandom, nr) {
	let level;
	if (isRandom) {
		level = Array(dimensions).fill().map(() => Array(dimensions).fill(0));
		level[0][0] = TILE_EMPTY;
		let rooms_created = 0;
		while (rooms_created < number_of_rooms) {
			let level_x = []
			let level_y = []
			let tiles_created = 0
			for (var x = 0; x < dimensions; x++) {
				for (var y = 0; y < dimensions; y++) {
					if (CanPlaceRoom(level, x, y)) {
						level_x[tiles_created] = x
						level_y[tiles_created] = y
						tiles_created++
					}
				}
			}
			const selected_tile = Math.floor((Math.random() * tiles_created));
			level[level_x[selected_tile]][level_y[selected_tile]] = Math.round(1 + Math.random() * 2);
			rooms_created++;
		}

	} else if (nr == 1) {
	/*level 1*/
		level = [
	/*1*/	[TILE_EMPTY, TILE_EMPTY, TILE_MONSTER, TILE_EMPTY, TILE_NO_TILE, TILE_NO_TILE, TILE_NO_TILE, TILE_NO_TILE],
	/*2*/	[TILE_NO_TILE, TILE_EMPTY, TILE_NO_TILE, TILE_HEALTH_POT, TILE_NO_TILE, TILE_NO_TILE, TILE_NO_TILE, TILE_NO_TILE],
	/*3*/	[TILE_NO_TILE, TILE_MONSTER, TILE_MONSTER, TILE_EMPTY, TILE_NO_TILE, TILE_NO_TILE, TILE_NO_TILE, TILE_NO_TILE],
	/*4*/	[TILE_NO_TILE, TILE_EMPTY, TILE_NO_TILE, TILE_MONSTER, TILE_MONSTER, TILE_EMPTY, TILE_NO_TILE, TILE_NO_TILE],
	/*5*/	[TILE_HEALTH_POT, TILE_EMPTY, TILE_NO_TILE, TILE_NO_TILE, TILE_NO_TILE, TILE_HEALTH_POT, TILE_NO_TILE, TILE_NO_TILE],
	/*6*/	[TILE_HEALTH_POT, TILE_NO_TILE, TILE_NO_TILE, TILE_MONSTER, TILE_EMPTY, TILE_EMPTY, TILE_NO_TILE, TILE_NO_TILE],
	/*7*/	[TILE_NO_TILE, TILE_NO_TILE, TILE_HEALTH_POT, TILE_HEALTH_POT, TILE_NO_TILE, TILE_MONSTER, TILE_MONSTER, TILE_EMPTY],
	/*8*/	[TILE_NO_TILE, TILE_NO_TILE, TILE_NO_TILE, TILE_NO_TILE, TILE_NO_TILE, TILE_NO_TILE, TILE_NO_TILE, TILE_EXIT]
		];
	} else if (nr == 2) {
		level = [
			[ TILE_EMPTY ]
		];
	}

	return level;
}

function do_the_map_thing() {
	grid.clear();
	
	const level = getLevel(false, level_nr);
	
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
		].map(x => (x | 0) ? 1 : 0);
	};
	
	const what_is_that = (num) => {
		const types = [ void 0, "empty", "monster", "health", "exit" ];
		const t = types[num | 0];
		const s = t == "monster" ? { "dmg": 1, "health": 1 } : void 0;
		return { type: t, stats: s };
	};
	
	for (let y = 0; y < level.length; ++y) {
		for (let x = 0; x < level[y].length; ++x) {
			if (level[y][x] == TILE_NO_TILE) { continue; }
			
			const bg = neighbours_to_tile[neighbours_of(x, y).join("")];
			const what = what_is_that(level[y][x]);
			makeTile({ "type": what.type, "bg": bg }, x, y, what.stats);
		}
	}
	
	grid.tiles.forEach(t => t.neighbours = grid.neighbours_of(t.x, t.y));
	
	// stub
	grid.reveal(0, 0);
}
