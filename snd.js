/** You no touch this okay */
const snd = void 0;
const snd_cache = {};

function makeSound(path){
	//console.log("makeSound");
	console.log(`makeSound: ${path}`);
	const snd = {
		play: () => {
			if (path) {
				console.log("playing sound");
				const sound = snd_cache[path];
				if (sound && sound.s) {
					console.log("sound found");
					sound.s.play();
				}
			}
		},
	};

	if (path && !snd_cache[path]) {
		snd_cache[path] = {};
		console.log("before loading sound");
		soundFormats('mp3', 'ogg');
		loadSound(path, loaded_snd => {
			console.log("loaded sound");
			snd_cache[path] = { s: loaded_snd };
		});
	}

	return snd;
}
