//Screen Dimensions: 800 x 600
var Width = 800;
var Height = 600;

//Player and Computer Scores initialized as global variables
	//Future Improvements: Implement player and computer objects for ease of scalability 
var PlayerScore = 0;
var ComputerScore = 0;

//Initialize ball and paddle objects as global variables
var ball;
var left_paddle;
var light_paddle;

//Initialize Score Display dom objects (computer and player) as global variables
var Player_Score_Display;
var Computer_Score_Display;

// Initialize boolean variable to track game state recording (for neural paddle training)
var recording = true;

// Initialize variable to track frame count. 
var frame = 0;

//Initialize simulated visual cortex through optical grid 
//var grid;

//Initialize Training Set array as a global. 
//var trainingSets = [];

// P5.js Native function Setup is called on program start
function setup(){

	//Create canvas object named canvas 
	canvas = createCanvas(Width,Height);

	//Position canvas so it appears horizontally centered and below the Scores Display div
	canvas.position(CENTER,50);

	//Initialize Ball object ball with a centered position and radius of 20px
	ball = new Ball(400,300,20);

	/* Initialize Left and Right Paddles with X co-oridinates offset by 20px from either side of the screen,
		with rectangular dimensions of 20px x 100px and controll modes of auto. */
	left_paddle = new Paddle(20,20,100,'MOUSE');
	right_paddle = new Paddle(Width-20,20,100, 'AUTO');

	// Initialize Player and Computer score dom object element refrences for score displays
	Player_Score_Display = document.getElementById("Player_Score");
	Computer_Score_Display = document.getElementById("Computer_Score");

	/* The following code is unformated and unfinished hotfix testing of the neural network controll system and associated training 

	// Initialize array to store brains
	var b = [];

	// Initialize binary training set to test training
	var trainingSet = [[1,1,0],[0,0,0],[1,0,1],[0,1,1]];

	frameRate(150);

	//Initiialize brains to train
	for(var i = 0; i < 10; i++){
		b.push(new Brain(2,2));
		b[i].init();
	}

	var input = [1,0];
	console.log('debug: ' + b[0].feedForward(input)[0])

	var trainedWeights = Train(b,trainingSet);

	for(var i = 0; i < 1000; i++){
		trainedWeights = Train(trainedWeights,trainingSet);

	}

	for(var trained of trainedWeights){
		console.log(trained.feedForward(input));
	}

	console.log('test' + trainedWeights[trainedWeights.length-1].feedForward(input)[0]);
	
	console.log(trainedWeights[trainedWeights.length-1].feedForward(input)[0]);

	//right_paddle.initBrain();

	*/
}

function draw(){
	//Set Canvas back 
	background(0);

	//Check Ball-Paddle collisions using the ball objects checkCollisions method with supplied paddle objects 
	ball.checkCollision(left_paddle,right_paddle);

	//Move the ball object using its move method
	ball.move();

	//Display the ball object using its display methoud
	ball.display();

	//Move left and right paddles by invoking the paddles move method
	left_paddle.move();
	right_paddle.move();

	//Display left and right paddles by invoking the paddles move method
	left_paddle.display();
	right_paddle.display();

	//Updates pre-defined player and computer dom objects with associated valuse in player and computer score variables 
	Player_Score_Display.innerHTML = PlayerScore;
	Computer_Score_Display.innerHTML = ComputerScore;

	/* Game state recording functionality to build training set for training of paddle AI  

	if(recording && frame%2 == 0){
		trainingSets.push(getTrainingSet());
		console.log(trainingSets[trainingSets.length - 1]);
	}
	frame++;

	*/
}


/* Unfinished Paddle AI training hotfix testing 
function keyReleased(){
	//When Key is pressed...


	//Stop recording game state
	recording = false;

	//Initialize variable to store brains being trained.
	var trainer;

	//Train brains by repeating survival of the fitest algorithm with its previouse result multiple times *This explanation needs work

	for(var i = 0; i < 10; i++){
		trainer = new TrainPaddle(testBrains,trainingSets);

		trainer.init();

		testBrains = trainer.train();
	}

	//Log and implant trained brain into paddle 

	console.log(trainer.mostFit);

	right_paddle.ai = testBrains[trainer.mostFitIndex];

	right_paddle.controlMode = 'NEURAL';
}
*/

















