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
