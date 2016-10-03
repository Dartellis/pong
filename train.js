function TrainPaddle(brains, trainingSets){
	this.inputs = [];
	this.keys = [];

	this.brains = brains;

	this.fitness = [];

	this.trainingSets = trainingSets;

	this.mostFit = 9000;
	this.mostFitIndex = 0;

	this.secoundMostFit = 9000;
	this.secoundMostFitIndex = 0;

	this.init = function(){
		for(var i = 0; i < this.trainingSets.length; i++){
			this.inputs.push([]);
			this.keys.push(this.trainingSets[i][this.trainingSets[i].length-1]);
			for(var j = 0; j < 5; j++){
				this.inputs[i].push(this.trainingSets[i][j]);
			}
		}
	}

	this.train = function(){

		var fitSum = 100;
		var fit = 100;

		var parentWeights;
		var children;
		var rawOut;

		for(var i = 0; i < this.brains.length; i++){

			fit = 0;

			for(var j = 0; j < this.trainingSets.length; j++){
				rawOut = this.brains[i].feedForward(this.inputs[j])[0];
				
				if(rawOut > 2) {
					rawOut = -1;
				} else if (rawOut > 1){
					rawOut = 1;
				}


				fitSum = this.keys[j] + rawOut;

				
				fit += Math.sqrt(fitSum * fitSum);
			}

			if(fit < this.mostFit){
				this.mostFitIndex = i;
				this.mostFit = fit;
			} else if(fit < this.secoundMostFit){
				this.scoundMostFitIndex = i;
				this.secoundMostFit = fit;
			}
		}

		parentWeights = [];

		parentWeights.push(this.brains[this.mostFitIndex].weights);
		parentWeights.push(this.brains[this.secoundMostFitIndex].weights);

		children = crossOver(parentWeights, 2);

		children.push(this.brains[this.mostFitIndex]);

		return children;
	}
}

//Paddle Training Function
function getTrainingSet(){
	var state;

	var action = 0;

	if(right_paddle.y > right_paddle.prevY){
		action = -1;
	} else if (right_paddle.y < right_paddle.prevY) {
		action = 1;
	} else {
		action = 0;
	}

	state = [ball.x, ball.y, ball.xVel, ball.yVel, right_paddle.y, action];

	return state;
}

function Train(brains,inputs){

	var brainsOutput = [];
	var brainsFitness = [];

	var bestFitness = 20;
	var mostFitIndex = 0;

	var secoundBestFitness = 30;
	var secoundMostFitIndex = 0;

	var fit = 0;

	for(var i = 0; i < brains.length; i++){
		brainsOutput.push([]);

		fit = 0;
		for(var j = 0; j < inputs.length; j++){
			var In = [inputs[j][0],inputs[j][1]];
			var Key = inputs[j][2];

			brainsOutput[i].push(brains[i].feedForward(In));

			//console.log('Output: ' + brainsOutput[i][j][0]);
			//console.log('Key: ' + Key);

			//key = 1 and output = 0.8, sum += 0.2, key = 0 and output = 0.2, sum += abs
	
			if(brains[i].feedForward(In)[0]){
			}
			//console.log('Sum' + fit);
		}



		brainsFitness.push(fit);

		console.log(brainsFitness[i]);

		if (fit < bestFitness){
			mostFitIndex = i;
			bestFitness = brainsFitness[i];
		} else if (fit < secoundBestFitness && fit > bestFitness){	
			secoundMostFitIndex = i;
			secoundBestFitness = brainsFitness[i];
		}
	}

	console.log('Best fitness: ' + bestFitness);
	console.log('Secound Best fitness: ' + secoundBestFitness);

	var parents = [];
	var children = [];

	parents.push(brains[mostFitIndex].weights);
	parents.push(brains[secoundMostFitIndex].weights);

	children = crossOver(parents,9);

	children.push(brains[mostFitIndex]);

	return children; 
}

function crossOver(parentWeights,numOfChildren){
	var childrenBrains = [];

	for(var i = 0; i < numOfChildren; i++){
		childrenBrains.push(new Brain(2,2));
		childrenBrains[i].init();
	}

	for(var i = 0; i < numOfChildren; i++){
		for(var j = 0; j < parentWeights[0].length; j++){
			for(var k = 0; k < parentWeights[0][0].length; k++){
				for(var l = 0; l < parentWeights[0][0][0].length; l++){
					if(Math.random() > 0.2){
						if(Math.random() > 0.5){
							childrenBrains[i].weights[j][k][l] = parentWeights[0][j][k][l];
						} else {
							childrenBrains[i].weights[j][k][l] = parentWeights[1][j][k][l];
						}
					} else {
						childrenBrains[i].weights[j][k][l] = (Math.random() - 0.5)*2;
					}
				}
			}
		}
	}

	return childrenBrains;
}
