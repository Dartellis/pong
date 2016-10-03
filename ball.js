//Ball constructor function 
function Ball(x,y,d){

		// Initialize this ball's... 
	// x and y co-ordinates as first and secound provided arguments x and y
	this.x = x;
	this.y = y;

	// x and y velocity vectors as random values between 5 and 1 for x velocity and 3 and 1 for y velocity
	this.xVel = Math.floor(Math.random() * (5-1) + 1);
	this.yVel = Math.floor(Math.random() * (7-6) + 6);

	// diameter d as the third provide constructor argument d
	this.d = d;

	// Friction coefficiant f as 0.5
	this.f = 0.5;

	// max speed maxSpeed as 10
	this.maxSpeed = 10;

	// Use P5.js ellipseMode function to set elliptical drawing mode for canvas
	ellipseMode(CENTER);

	// Method for displaying ball
	this.display = function(){
		//Ellipse at location with radius r
		fill(255);
		ellipse(this.x, this.y, this.d);
	};

	// Method for moving this ball
	this.move = function(){
		
		// Limit this ball's x and y velocits to max speed by comparing it to this ball's max speed
		if(this.xVel > this.maxSpeed){
			this.xVel = this.maxSpeed;
		}

		if(this.yVel > this.maxSpeed){
			this.yVel = this.maxSpeed;
		}

		// move the ball by this boll's velocity vector to its location vector. 
		this.x += this.xVel;
		this.y += this.yVel;
	};


	// Method for reseting this ball
	this.reset = function(){
		// Set this ball's x/y co-ordinates to the canvas's width/height divided by two
		this.x = Width/2;
		this.y = Height/2;

		// Set this ball's x and y velocity to *** 
		this.xVel = 5;
		this.yVel = 1;
	};

	// Method for checking collisions between walls as well as paddles. left and right paddle objects taken as arguments
	this.checkCollision = function(lp, rp){
		// Bounce off top and bottom walls
		// If this ball's y co-ordinate is larger than the extent of the canvas minus the balls radius...
		if(this.y >= Height - this.d/2){
			// Set this ball's y co-ordinate to the bottom edge of the canvas minus the ball's radius
			this.y = Height - this.d/2;	
			// Invert this ball's y velocity vector by multiplying it by negitive 1
			this.yVel *= -1;
		// If this ball's y co-ordinate is less than the extent of the canvas pluss the balls radius...
		} else if(this.y <= 0 + this.d/2){
			// Set this ball's y co-ordinate to the top edge of the canvas plus the ball's radius
			this.y = this.d/2;
			// Invert this ball's y velocity vector by multiplying it by negitive 1
			this.yVel *= -1;

		}

		// Check left and right paddle collision

		/* If this balls x co-ordinate is less than or equal to the right edge of the left paddle pluss the balls radius and 	
			this ball's y co-ordinate is between the co-ordinates of the top and bottom edge of left the paddle */

		if( this.x  <= lp.x + lp.width/2 + this.d/2 && this.y <= lp.y + lp.height/2 + this.d/2 && this.y >= lp.y - lp.height/2 - this.d/2){

			// Invert x velocity 
			this.xVel *= -1;

			// Add the left paddle's motion vector multiplied by this ball's friction co-eficient to this ball's y velocity vector
			this.yVel += lp.getVel() * this.f;
		}

		/* If this balls x co-ordinate is greater than or equal to the left edge of the right paddle pluss the balls radius and 	
			this ball's y co-ordinate is between the co-ordinates of the top and bottom edge of the right paddle */
		if( this.x >= rp.x - rp.width/2 - this.d/2 && this.y <= rp.y + rp.height/2 + this.d/2 && this.y >= rp.y - rp.height/2 - this.d/2){
			
			// Invert x velocity 
			this.xVel *= -1;

			// Add the right paddle's motion vector multiplied by this ball's friction co-eficient to this ball's y velocity vector
			this.yVel += rp.getVel() * this.f;
		}

		// Check left and right wall collisions and alter scores accordingly 

		// If this ball's x co-ordinate is greater than or equal to the right edge of the canvas offset by this ball's radius...
		if(this.x >= Width + this.d/2){
			// Increase player score by one 
			PlayerScore += 1;
			// Reset ball
			this.reset();
		// If this ball's x co-ordinate is less than or equal to the left edge of the canvas offset by this ball's radius...
		} else if(this.x <= 0 - this.d/2) {
			ComputerScore += 1;
			this.reset();
		}
	};
}

