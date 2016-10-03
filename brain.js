function Brain(inputsLength,outPutsLength){
	this.neurons = [];
	this.weights = [];

	this.inputsLength = inputsLength;
	this.outPutsLength = outPutsLength;

	this.C = -0.01;

	//Brain initialization
	this.init = function(){

		this.weights = [];
		this.neurons = [];
	
		for(var i = 0; i < this.inputsLength; i++){
			var w1 = [];
			for(var j = 0; j < this.outPutsLength; j++){
				var w2 = [];
				for(var k = 0; k < this.outPutsLength; k++){
					//Weights are initialized as random float between -1 and 1
					w2.push( (Math.random() - 0.5)*2 );
				}
				w1.push(w2);
			}
			this.weights.push(w1);
		}

		for(var i = 0; i < this.inputsLength; i++){
			var n1 = [];
			for(var j = 0; j < this.outPutsLength; j++){
				//Neurons initialized with a constant (-0.01) and corresponding weights
				n1.push(new Nueron(this.C, this.weights[i][j]));
			}
			this.neurons.push(n1);
		}
	}

	this.feedForward = function(inputs){
		var hiddenOut = [];
		var out = [];

		//Output of hidden layer
		for(var i = 0; i < this.neurons[0].length; i++){
			hiddenOut.push(this.neurons[0][i].feedForward(inputs));
		}

		for(var i = 0; i < this.neurons[1].length; i++){
			out.push(this.neurons[1][i].feedForward(hiddenOut));
		}

		return out;
	}
}