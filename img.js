/** You no touch this okay */
const img = void 0;
const img_cache = {};

function makeImage(path, x, y){
	const img = {
		x: x,
		y: y,
		draw: () => {
			const tex = img_cache[path];
			if (tex.tex) { image(tex.tex, x, y); }
		},
		contains: (cx, cy) => {
			const tex = img_cache[path];
			return tex && cx >= img.x && cx <= img.x + tex.w && cy >= img.y && cy <= img.y + tex.h;
		}
	};
	
	if (path && !img_cache[path]) {
		img_cache[path] = {};
		loadImage(path, tex => {
			img_cache[path] = { tex: tex, w: tex.width, h: tex.height };
		});
	}
	
	return img;
}
