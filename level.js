const TILE_NO_TILE = 0;
const TILE_EMPTY = 1;
const TILE_MONSTER = 2;
const TILE_HEALTH_POT = 3;
const TILE_EXIT = 4;
const TILE_QUEST = 5;
const TILE_MONSTER_STRONG = 6;
const TILE_HEALTH_POT2 = 7;
const TILE_POISON = 8;
const TILE_HEART = 9;
const TILE_TRIDENT = 10;

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

	} else switch (nr) {
		case 1:
			level = [//  1  2  3  4  5  6  7  8
				/*1*/	[1, 1, 2, 1, 0, 0, 0, 0],
				/*2*/	[0, 1, 0, 3, 0, 0, 0, 0],
				/*3*/	[0, 2, 2, 1, 0, 0, 0, 0],
				/*4*/	[0, 1, 0, 2, 2, 1, 0, 0],
				/*5*/	[3, 1, 0, 0, 0, 3, 0, 0],
				/*6*/	[3, 0, 0, 2, 3, 1, 0, 0],
				/*7*/	[0, 0, 3, 3, 0, 2, 2, 1],
				/*8*/	[0, 0, 0, 0, 0, 0, 0, 4]
			];
			break;
		case 2:
			level = [//  1  2  3  4  5  6  7  8
				/*1*/	[1, 3, 1, 3, 1, 0, 3, 0],
				/*2*/	[3, 0, 0, 0, 1, 2, 1, 0],
				/*3*/	[1, 0, 3, 0, 1, 0, 0, 0],
				/*4*/	[2, 0, 1, 1, 2, 0, 4, 2],
				/*5*/	[1, 0, 1, 0, 0, 0, 0, 2],
				/*6*/	[3, 0, 2, 0, 0, 3, 1, 1],
				/*7*/	[1, 0, 2, 1, 1, 1, 0, 1],
				/*8*/	[2, 1, 1, 0, 0, 1, 1, 3]
			];
			break;
		case 3:
			level = [//  1  2  3  4  5  6  7  8
				/*1*/	[1, 3, 1, 2, 1, 0, 0, 0],
				/*2*/	[1, 1, 3, 0, 1, 1, 2, 3],
				/*3*/	[0, 0, 0, 0, 2, 0, 0, 0],
				/*4*/	[5, 2, 0, 1, 3, 1, 3, 2],
				/*5*/	[0, 3, 0, 1, 0, 0, 0, 1],
				/*6*/	[3, 2, 1, 2, 0, 0, 0, 2],
				/*7*/	[0, 2, 0, 1, 0, 0, 0, 1],
				/*8*/	[3, 3, 0, 2, 1, 3, 3, 1]
			];
			break;
		default:
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
		const types = [ void 0, "empty", "monster", "health", "exit", "quest", "monster_blu", "health2", "poison", "heart", "trident" ];
		const t = types[num | 0];
		let s = void 0;
		if (t == "monster") { s = { "dmg": 1, "health": 1 }; }
		if (t == "monster_blu") { s = { "dmg": 1, "health": 2 }; }
		if (t == "poison") { s = { "dmg": 1, "health": 1 }; }
		if (t == "health") { s = { "heal": 1 }; }
		if (t == "health2") { s = { "heal": 2 }; }
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
