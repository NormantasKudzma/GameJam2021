/** You no touch this okay */
const img = void 0;

function makeImage(path, x, y){
	const img = {
		tex: void 0,
		w: 0,
		h: 0,
		x: x,
		y: y,
		draw: () => {
			if (img.tex) { image(img.tex, x, y); }
		},
		contains: (cx, cy) => {
			return cx >= img.x && cx <= img.x + img.w && cy >= img.y && cy <= img.y + img.h;
		}
	};
	
	img.tex = path && loadImage(path, tex => {
		img.w = tex.width;
		img.h = tex.height;
	});
	
	return img;
}
