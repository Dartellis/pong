function Grid(numCols,numRows){

	this.numCols = numCols;
	this.numRows = numRows;

	this.cells = [];

	this.lastState = [];

	console.log('debug');
	this.init = function(){
		for(var i = 0; i < this.numCols; i++){
			var col = [];
			for(var j = 0; j < this.numRows; j++){
				col.push(new Cell(i * Width/this.numCols, j * Height/this.numRows, Width/this.numCols, Height/this.numRows));
			}
			this.cells.push(col);
		}
		this.activate();
	}

	this.display = function(){
		for(var i = 0; i < this.numCols; i++){
			for(var j = 0; j < this.numRows; j++){
				this.cells[i][j].display();
			}
		}
	}

	this.activate = function(){
		var out = [];

		for(var i = 0; i < this.numCols; i++){
			for(var j = 0; j < this.numRows; j++){
				out.push(this.cells[i][j].activate());
			}
		}
		this.lastState = out;
		return out;
	}
}

function Cell(x,y,width,height){
	this.x = x;
	this.y = y;

	this.width = width;
	this.height = height;

	this.isActive = false;

	this.display = function(){
		rectMode(CORNER);

		if(this.isActive){
			fill(0,255,0);
		} else {
			fill(255,0,0);
		}
		
		rect(this.x,this.y,this.width, this.height);
	}

	this.activate = function(){
		if((ball.x >= this.x && ball.x < this.x + this.width && ball.y >= this.y && ball.y < this.y + this.height) ||
			(right_paddle.x + right_paddle.width/2 >= this.x && right_paddle.x + right_paddle.width/2 < this.x + this.width && 
				right_paddle.y + right_paddle.height/2 >= this.y && right_paddle.y + right_paddle.height/2 < this.y + this.height)){
			this.isActive = true;

			return 1;
		}else{
			this.isActive = false;
			return 0;
		}
	}
}