/** You no touch this okay */
const img = void 0;
const img_cache = {};
const mouseover_tint = [190, 250, 190];

function makeImage(path, x, y){
	const img = {
		x: x,
		y: y,
		tint: false,
		draw: () => {
			const tex = img_cache[path];
			if (tex && tex.tex) {
				//image(tex.tex, x, y);
				if (img.tint) { tint(mouseover_tint[0], mouseover_tint[1], mouseover_tint[2]); }
				texture(tex.tex);
				rect(img.x, img.y, tex.w, tex.h);
				if (img.tint) { tint(255, 255, 255); }
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
			/*gl.bindTexture(gl.TEXTURE_2D, tex);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);*/
			img_cache[path] = { tex: tex, w: tex.width, h: tex.height };
		});
	}
	
	return img;
}
