// canvas setup
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
function randomRGB() {
return `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`;
}

// parent shape class
class Shape {
	constructor(x, y, velX, velY) {
		this.x = x;
		this.y = y;
		this.velX = velX;
		this.velY = velY;
	}
}

// Ball class
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
		if (this.x + this.size >= width || this.x - this.size <= 0){
			this.velX = -this.velX;
		}
		if( this.y + this.size >= height || this.y -this.size <= 0) {
			this.velY = -this.velY;
		}
		this.x += this.velX;
		this.y += this.velY;
	}
	collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}
// evilcricle class
class EvilCircle extends Shape {
	constructor(x, y) {
		super(x,y, 20, 20);
		this.size =20;
		this.color = "white";
	}
	
	draw() {
		ctx.beginPath();
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 3;
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		ctx.stroke();
	}
	
	checkBounds() {
		if(this.x + this.size >= width) this.x = width - this.size;
		if(this.x - this.size <= 0) this.x = this.size;
		if(this.y + this.size >= height) this.y = height - this.size;
		if(this.y - this.size <= 0) this.y = this.size;
	}
	
	collisionDetect() {
		for (const ball of balls) {
			if (ball.exists) {
				const dx = this.x - ball.x;
				const dy = this.y - ball.y;
				const distance = Math.sqrt(dx * dx + dy* dy);
				
				if(distance < this.size + ball.size) {
					ball.exists= false;
				}
			}
		}
	}
}

// create balls
const balls = [];

while (balls.length < 25) {
	const size = random(10, 20);
	const ball = new Ball(
		random(0 + size, width - size),
		random(0 + size, height - size),
		random(-7,7),
		random(-7, 7),
		randomRGB(),
		size
	);
	balls.push(ball);
}
// evilcircle movement

let evil = new EvilCircle(100, 100);
  
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "a":
      evil.x -= evil.velX;
      break;
    case "d":
      evil.x += evil.velX;
      break;
    case "w":
      evil.y -= evil.velY;
      break;
    case "s":
      evil.y += evil.velY;
      break;
  }
});
// animation loop

function loop() {
	ctx.fillStyle = "rgba(0,0,0,0.25)";
	ctx.fillRect(0, 0, width, height);
	
	// draw balls
	for (const ball of balls) {
		if (ball.exists) {
			ball.draw();
			ball.update();
			ball.collisionDetect();
		}
	}
	
	// create and display evilcircle
	evil.draw();
	evil.checkBounds();
	evil.collisionDetect();
	
	requestAnimationFrame(loop);
}

loop();

