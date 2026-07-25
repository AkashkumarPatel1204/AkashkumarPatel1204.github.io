const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)} ${random(0, 255)} ${random(0, 255)})`;
}

// shape
class Shape {
	constructor(x, y, velX, velY) {
		this.x =x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
	}
}

// Ball
class Ball extends Shape {
	constructor(x, y, velX, velY, color, size) {
		super(x, y, velX, velY);
		this.color = color;
		this.size = size;
		this.exists = true;
	}
	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		ctx.fill();
	}
	update() {
		if (this.x + this.size >= width) this.velX = -this.velX;
		if (this.x - this.size <=0) this.velX = -this.velX;
		if (this.y + this.size >= height) this.velY = -this.velY;
		if (this.y - this.size <=0) this.velY = -this.velY;
		
		this.x += this.velX;
		this.y += this.velY;
	}
	
	collisionDetect() {
		for (const otherBall of Balls) {
			if (this !== otherBall && otherBall.exists) {
				const dx = this.x - otherBall.x;
				const dy = this.y - otherBall.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				
				if (distance < this.size + otherBall.size) {
					otherBall.color = this.color = randomRGB();
				}
			}
		}
	}
}

// EvilCircle

class EvilCircle extends Shape {
	constructor(x, y) {
		super(x, y, 20, 20);
		this.size = 20;
		this.color = 'white';
		
		window.addEventListener('keydown', (e) => {
			if (e.key === 'a') this.x -= this.velX;
			if (e.key === 'd') this.x += this.velX;
			if (e.key === 'w') this.y -= this.velY;
			if (e.key === 's') this.y += this.velY;
		});
	}
	
	draw() {
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 3;
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		ctx.stroke();
	}
	
	checkBounds() {
		if (this.x + this.size >= width) this.x = width - this.size;
		if (this.x - this.size <= 0) this.x = this.size;
		if (this.y + this.size >= height) this.y = height - this.size;
		if (this.y - this.size <= 0) this.y = this.size;
	}
	
	collisionDetect() {
		for (const otherBall of Balls) {
			if (otherBall.exists) {
				const dx = this.x - otherBall.x;
				const dy = this.y - otherBall.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				
				if (distance < this.size + otherBall.size) {
					otherBall.exists = false;
				}
			}
		}
	}
}

// Balls array


const Balls = [];


while (Balls.length < 25) {
  const size = random(10, 20);
  const ballobj = new Ball(
    // Ball position always drawn at least one Ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );

  Balls.push(ballobj);
}


// loop

let evil = new EvilCircle(random(0, width), random(0,height));;

function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);
  
  
  evil.draw();
  evil.checkBounds();
  evil.collisionDetect();
  

  for (const otherBall of Balls) {
	if (otherBall.exists) {
		otherBall.draw();
		otherBall.update();
		otherBall.collisionDetect();
	}
  }


  requestAnimationFrame(loop);
}

loop();