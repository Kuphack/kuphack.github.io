let canvas;
let images = [];

let objects = [];
let locked;
let oldMX = Number.MIN_VALUE, oldMY = Number.MIN_VALUE;

function setup() {

  let uuids = [
    'a1ce5c43-55ca-4ada-a605-cb6bc7928994', // Kup1995
    '99f2d35c-376c-42ee-8d32-10206cfd3ce0', // Boxeyy
    '00b59d31-f84f-486d-b29b-7c37b60a0be0', // Vaapukkax
    'a376fb62-ce3f-42f8-ae85-0e5d8a9cd527', // Cytrii
    'dcbbf0a5-c12e-4e8b-ab3d-fcf4f510a6ef' // Ramezsushi
  ];

  for (let i = 0; i < uuids.length; i++) {
    images.push(loadImage('https://mc-heads.net/head/'+uuids[i].replaceAll("-", "")));
  }

	canvas = createCanvas(5, 5);
  updateSize();
  canvas.style('z-index', '-1');
}

function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}

function isDarkMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function windowResized() {
  updateSize();
}

function updateSize() {
  var element = document.getElementById('content');
  var rect = element.getBoundingClientRect();
  canvas.position(rect.x, rect.y+window.scrollY);
  resizeCanvas(rect.width, rect.height);

  objects = [];
  for (let i = 0; i < images.length; i++) {
    objects.push(new Head(objects.length));
  }
}

function draw() {
  background(isDarkMode() ? 5 : 250);
  for (let i = 0; i < objects.length; i++) {
    let object = objects[i];
    object.move();
    object.display();
  }
  oldMX = mouseX;
  oldMY = mouseY;
}

function mouseReleased() {
  locked = false;
}

function mousePressed() {
  for (let i = objects.length-1; i >= 0; i--) {
    let o = objects[i];
    if (mouseX >= o.x && mouseX < o.x+o.size && mouseY >= o.y && mouseY < o.y+o.size) {
      objects.push(objects.splice(objects.indexOf(o), 1)[0]);
      locked = o;
      oldMX = mouseX;
      oldMY = mouseY;
      return;
    }
  }
}  

class Head {

  constructor(index) {
    this.size = canvas.width < 690 ? canvas.height / 6 : canvas.width / 7.5;
    this.x = canvas.width < 690 ? canvas.width - this.size - 20 : index * (canvas.width / 6.5) + 20;
    this.y = canvas.width < 690 ? index * (this.size + 10) + 20 : 110 - (270 - this.size) * 0.5;

    this.velX = 0;
    this.velY = 0;

    this.img = images[objects.length];
  }

  move() {
    if (mouseY == Number.MIN_VALUE) return;

    if (!isTouchDevice()) {
      this.x -= (mouseX-oldMX)*0.01;
      this.y -= (mouseY-oldMY)*0.01;
    }
    if (locked == this) {
      this.velX += ((mouseX-oldMX)*0.8-this.velX)*0.35;
      this.velY += ((mouseY-oldMY)*0.8-this.velY)*0.35;

      this.x += mouseX-oldMX;
      this.y += mouseY-oldMY;

    } else {
      this.velX *= 0.99;
      this.velY *= 0.99;

      this.x += this.velX;
      this.y += this.velY;

      for (let i = 0; i < objects.length; i++) {
        let o = objects[i];
  
        if (this.intersects(o)) {
          
          let deg = atan2(this.y-o.y, this.x-o.x);
          let speed = Math.max(1, Math.max(Math.abs(this.velX), Math.abs(this.velY)));
          
          this.velX = cos(deg)*speed;
          this.velY = sin(deg)*speed;
  
          o.velX += cos(deg+180)*(speed/2);
          o.velY += sin(deg+180)*(speed/2);
  
          this.x += this.velX;
          this.y += this.velY;
          if (locked != o) {
            o.x += o.velX;
            o.y += o.velY;
          }
        }
      }
    }

    if (this.x < 0) {
      this.velX = -this.velX;
      this.x = 1;
    }
    if (this.y < 0) {
      this.velY = -this.velY;
      this.y = 1;
    }
    if (this.x > canvas.width-this.size) {
      this.velX = -this.velX;
      this.x = canvas.width-1-this.size;
    }
    if (this.y > canvas.height-this.size) {
      this.velY = -this.velY;
      this.y = canvas.height-1-this.size;
    }
  }

  intersects(o) {
    return o != this && this.x+this.size >= o.x && this.x < o.x+o.size && this.y+this.size >= o.y && this.y < o.y+o.size;
  }

  display() {
    fill(color(200, 200, 200));
    noStroke();
    image(this.img, this.x, this.y, (this.size/this.img.height)*this.img.width, this.size);
  }
}