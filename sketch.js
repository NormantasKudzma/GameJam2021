// not line 0

let last = 0;
let a = 0;
let sa = 0;
let ca = 0;

function setup() {
  createCanvas(400, 400);
  last = Date.now();
}

function rotLine(cx, cy, x1, y1, x2, y2){
  x1 -= cx;
  y1 -= cy;
  x2 -= cx;
  y2 -= cy;
  const x1t = x1 * ca - y1 * sa + cx;
  const y1t = y1 * ca + x1 * sa + cy
  const x2t = x2 * ca - y2 * sa + cx;
  const y2t = y2 * ca + x2 * sa + cy;
  line(x1t, y1t, x2t, y2t);
}

function clamp(what, min, max){
  return Math.max(min, Math.min(what, max));
}

function swas(x, y, w){
  rotLine(x, y, x, y - w, x, y + w);
  rotLine(x, y, x, y - w, x + w, y - w);
  rotLine(x, y, x - w, y + w, x, y + w);
  
  rotLine(x, y, x - w, y, x + w, y);
  rotLine(x, y, x - w, y - w, x - w, y);
  rotLine(x, y, x + w, y, x + w, y + w);
}

function draw() {
  const now = Date.now();
  const dt = (now - last) / 1000;
  last = now;
  
  a += dt;
  sa = Math.sin(a);
  ca = Math.cos(a);
  
  translate(200, 200)
  rotate(a)
  translate(-200, -200)
  
  background(220, 255 * clamp(sa, 0.2, 1.0), 255 * clamp(sa, 0.2, 1.0));
  
  swas(200, 100, 20);
  swas(200, 150, 20);
  swas(200, 200, 20);
  swas(200, 250, 20);
  swas(200, 300, 20);
  
  rect(50, 50, 100, 100, 255);
  
  swas(100, 200, 20);
  swas(150, 200, 20);
  swas(250, 200, 20);
  swas(300, 200, 20);
  
  swas(100, 100, 20);
  swas(100, 150, 20);
  swas(300, 100, 20);
  swas(250, 100, 20);
  swas(300, 300, 20);
  swas(300, 250, 20);
  swas(100, 300, 20);
  swas(150, 300, 20);
}