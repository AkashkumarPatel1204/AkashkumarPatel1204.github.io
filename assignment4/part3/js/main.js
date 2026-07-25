// select the canvas element and get 2D draeing context
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// selecting matching width and height of canvas to browser
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// utility function: returns a random integer between min and max
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// utility function: returns random color string
function randomRGB() {
  return `rgb(${random(0, 255)} ${random(0, 255)} ${random(0, 255)})`;
}

// Ball calss
// request a single bouncing ball on the canvas
class Ball {
	constructor(x, y, velX, velY, color, size) {
		// ball position
		this.x = x;
		this.y = y;
		
		//ball speed in velocity
		this.velX = velX;
		this.velY = velY;
		
		// ball color and size
		this.color = color;
		this.size = size;
	}
	
	// creating ball on canvas
	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
		ctx.fill();
	}
	
	// updating ball position as it bounces horizontally and vertically
	update() {
		
		// bouncing horizontally
		if (this.x + this.size >= width) this.velX = -this.velX;
		if (this.x - this.size <=0) this.velX = -this.velX;
		
		// bouncing vertically
		if (this.y + this.size >= height) this.velY = -this.velY;
		if (this.y - this.size <=0) this.velY = -this.velY;
		
		// applying movement
		this.x += this.velX;
		this.y += this.velY;
	}
	
	// detect collisions with other balls and change to color
	collisionDetect() {
		for (const otherBall of Balls) {
			if (this !== otherBall) {
				// condition to check against itself
				const dx = this.x - otherBall.x;
				const dy = this.y - otherBall.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				
				// if balls overlap change their color
				if (distance < this.size + otherBall.size) {
					this.color = otherBall.color = randomRGB();
				}
			}
		}
	}
}

// creating 25 balls


const Balls = [];


while (Balls.length < 25) {
  const size = random(10, 20);
  
  // creating new ball with random color and rendoem position
  const ball = new Ball(
    // Ball position always drawn at least one Ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size,
  );

  Balls.push(ball);
}


// loop
// updating ball positions
function loop() {
// creating trail behind balls
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);
  
  // draw, update and check collision for each ball
  for (const otherBall of Balls) {
		otherBall.draw();
		otherBall.update();
		otherBall.collisionDetect();
	}
  
 // request next animation frame
  requestAnimationFrame(loop);
}
// start the animation
loop();