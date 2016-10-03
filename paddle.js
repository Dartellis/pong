// Paddle Constructor Function 

function Paddle(x,width,height,controlMode){
	//Initialize original x value as first provided argument x
	this.originX = x;

	//Initialize this paddles x co-ordinate as the first provided argument x
	this.x = x;
	//Initialize this paddles y co-ordinate as the Global(canvas) Width divded by 2. 
	this.y = Width/2;

	//Initialize this paddles previous y co-ordinate as its current because it has yet to move
	this.prevY = this.y;

	//Initialize this paddles width and height as the secound and third provided arguments width and height
	this.width = width;
	this.height = height;

	//Initialize this paddles controle mode as the fourth provided argument controlMode
	this.controlMode = controlMode;

	//TODO: Allow for dynamic maxSpeed

	//Initialize this paddles max speed as 5
	this.maxSpeed = 5;

	//Initialize this paddles artificial intelligence as a new Brain object with 5 input neurons and 5 neurons in the hidden layer=
	this.ai = new Brain(5,5);


	//Method for initialize its brain *Unfinished
	this.initBrain = function(){
		//Initialize this ai with the Brain object init method
		this.ai.init();

		// Reset paddle location by reseting x and y co-ordinates to their original states
		this.x = this.originX;
		this.y = Width/2;
	};

	// Method for displaying Paddle object
	this.display = function(){
		rectMode(CENTER);
		// Set fill color of following shape using p5.js fill function 
		fill(255);
		// Draw visual representation of paddle using p5.js rect function with required arguments (X Co-ordinate, Y Co-ordinate, rect width, rect height)
		rect(this.x,this.y,this.width,this.height);
	};


	// Method for moving paddle using controle mode defined at object construction
	this.move = function(){

		// Set this paddles previous y co-ordinate to this paddles current location (before alteration of y co-ordinate)
		this.prevY = this.y;

		// Move paddle bassed on this paddles controll mode 
		switch(this.controlMode){
			// In the case of a control mode of MOUSE...
			case 'MOUSE':
				// Set this paddles y co-ordinate to the current mouse y co-ordinate using p5.js, globally defined mouseY variable 
				this.y = mouseY;
				break;

			// In the case of a control mode of KEYS...
			case 'KEYS':

				// If the up arrow key is pressed move this paddle up by decreasing its y position value by its max speed. 
					// Detect key using p5.js keyIsDown function with special key code. 
				if(keyIsDown(UP_ARROW)){
					this.y -= this.maxSpeed;
				}

				// If the down arrow key is pressed move this paddle down by increasing its y position value by its max speed. 
				if(keyIsDown(DOWN_ARROW)){
					this.y += this.maxSpeed;
				}
				break;

			// In the case of a control mode of AUTO...
			case 'AUTO':

				// If the absolute horizontal distance between this paddle's and this ball's x position is above 40px ...
				if(Math.sqrt((ball.x - this.x) * (ball.x - this.x)) > this.width/2 + ball.d/2 + 1) {
					// If this ball's y co-ordinate is less than that of this ball's y co-ordinate...
					if(this.y < ball.y){
						// If this paddle and ball's y co-ordinates are offset more than the max speed...
						if(ball.y - this.y > this.maxSpeed){
							// Move this paddle down by increasing its y co-ordinate by max speed.
							this.y += this.maxSpeed;
						} else {
							// Otherwise, move this paddle down by increasing its y co-ordinate by the calculated offset.
							this.y += ball.y - this.y;
						}
					// If this ball's y co-ordinate is greater than that of this ball's y co-ordinate...
					}else if(this.y > ball.y){
						// If this paddle and ball's y co-ordinates are offset more than the max speed...
						if(this.y - ball.y > this.maxSpeed){
							// Move this paddle up by decreasing its y co-ordinate by max speed.
							this.y -= this.maxSpeed;
						} else {
							// Move this paddle up by decreasing its y co-ordinate by the calculated offset.
							this.y -= this.y - ball.y;
						}
					}	
				}
				break;

			// NOTE: Neural network controll functionality is currently unfinished and non functional 
			// In the case of a control mode of NEURAL...
			case 'NEURAL':
				// Move paddle up or down bassed on the activation level of the first output neuron of this paddles brain
				if(this.ai.feedForward(ball.x,ball.y,ball.xVel,ball.yVel,this.y)[0] > 1.5){
					this.y-=2;
				}else if (this.ai.feedForward(ball.x,ball.y,ball.xVel,ball.yVel,this.y)[0] > 0.5) {
					this.y+=2;
				}
				break;
		}
	};

	// Method for retrieving this paddle's current vertical velocity
	this.getVel = function(){
		// Calculate this paddle's current velocity by subtracting its current veritical position by its previous vertical position 
		return this.y - this.prevY;
	};
}