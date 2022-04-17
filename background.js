let canvas;
let images = [];

let objects = [];
let locked;
let oldMX = Number.MIN_VALUE, oldMY = Number.MIN_VALUE;

function setup() {

  images.push(loadImage('https://crafatar.com/avatars/a1ce5c43-55ca-4ada-a605-cb6bc7928994?overlay')); // Kup1995
  images.push(loadImage('https://crafatar.com/avatars/99f2d35c-376c-42ee-8d32-10206cfd3ce0?overlay')); // Boxeyy
  images.push(loadImage('https://crafatar.com/avatars/a376fb62-ce3f-42f8-ae85-0e5d8a9cd527?overlay')); // Cytrii
  images.push(loadImage('https://crafatar.com/avatars/00b59d31-f84f-486d-b29b-7c37b60a0be0?overlay')); // Vaapukkax
  images.push(loadImage('https://crafatar.com/avatars/dcbbf0a5-c12e-4e8b-ab3d-fcf4f510a6ef?overlay')); // Ramezsushi
  images.push(loadImage('https://crafatar.com/avatars/9f59a14c-709b-407a-ae6d-604d85b1e729?overlay')); // CommandWizard

	canvas = createCanvas(5, 5);
  updateSize();
  canvas.style('z-index', '-1');
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
  background(250);
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
      locked = o;
      oldMX = mouseX;
      oldMY = mouseY;
      return;
    }
  }
}  

class Head {

  constructor(x) {
    this.x = x*(canvas.width*0.125)+20;//random(width);
    this.y = windowHeight < 550 ? 25 : 110;//random(height)-100;
    this.size = canvas.width*0.1;

    this.velX = 0;
    this.velY = 0;

    this.img = images[objects.length];//random(images);
  }

  move() {
    if (mouseY == Number.MIN_VALUE) return;

    this.x -= (mouseX-oldMX)*0.01;
    this.y -= (mouseY-oldMY)*0.01;

    if (locked == this) {
      this.velX += ((mouseX-oldMX)*0.6-this.velX)*0.5;
      this.velY += ((mouseY-oldMY)*0.6-this.velY)*0.5;//this.y+this.size/2));

      this.x += mouseX-oldMX;//mouseX-this.size/2;
      this.y += mouseY-oldMY;//mouseY-this.size/2;

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
    image(this.img, this.x, this.y, this.size, this.size);
    //ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
