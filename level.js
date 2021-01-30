const TILE_ALIVE = 1;
const TILE_DEAD = 0;
const dimensions = 10;
const number_of_rooms = 20;

function TileInDungeon(level, x, y) {
	if (x < 0 || x >= dimensions || y < 0 || y >= dimensions) {
		return false;
	}
	return true;
}

function CanPlaceRoom(level, x, y) {
	if (level[x][y] == TILE_ALIVE) {
		return false;
	}
	if (TileInDungeon(level, x - 1, y)) {
		if (level[x - 1][y] == TILE_ALIVE) {
			return true;
		}
	}
	if (TileInDungeon(level, x + 1, y)) {
		if (level[x + 1][y] == TILE_ALIVE) {
			return true;
		}
	}
	if (TileInDungeon(level, x, y + 1)) {
        if (level[x][y + 1] == TILE_ALIVE) {
			return true;
		}
	}
	if (TileInDungeon(level, x, y - 1)) {
        if (level[x][y - 1] == TILE_ALIVE) {
			return true;
		}
	}
	return false;
}

function getLevel() {
	let level = Array(dimensions).fill().map(() => Array(dimensions).fill(0));
	level[0][0] = TILE_ALIVE;
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
		level[level_x[selected_tile]][level_y[selected_tile]] = TILE_ALIVE;
		rooms_created++;
	}
	return level;
}

function do_the_map_thing() {
	grid.clear();
	
	const level = getLevel();
	for (let i = 0; i < level.length; ++i) {
		for (let j = 0; j < level[i].length; ++j) {
			if (level[i][j] == 0) { continue; }
			//makeTile("empty", i, j);
			makeTile("health", j, i);
		}
	}
	
	// stub
	grid.reveal(0, 0);
}
