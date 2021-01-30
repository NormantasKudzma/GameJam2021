/** You no touch this okay */
const img = void 0;
const img_cache = {};
const mouseover_tint = [240, 253, 255];

function makeImage(path, x, y){
	const img = {
		x: x,
		y: y,
		tint: false,
		draw: () => {
			const tex = img_cache[path];
			if (tex && tex.tex) {
				if (img.tint) { tint(mouseover_tint[0], mouseover_tint[1], mouseover_tint[2]); }
				image(tex.tex, x, y);
				noTint();
			}
		},
		contains: (cx, cy) => {
			const tex = img_cache[path];
			return tex && cx >= img.x && cx <= img.x + tex.w && cy >= img.y && cy <= img.y + tex.h;
		},
		highlight: (on) => {
			if (on) { img.tint = true; }
			else { img.tint = false; }
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
