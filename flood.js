function randomElement(array) {
    return array[Math.floor(Math.random()*array.length)];
	}

function GraphNode(color,flooded,neighbors) {
	var self = this;

	self.color = color; // integer
	self.flooded = flooded || false; // boolean
	self.neighbors = neighbors || []; // array

	self.testCell = function(color) {
		if (self.flooded == true){
			return;
		}
		else if (self.color == color) {
			self.flooded = true;
			self.testNeighbors(color);
		}
	}

	self.testNeighbors = function(color) {
		for (var i = 0; i < self.neighbors.length; i++) {
			self.neighbors[i].testCell(color)
		}
	}
}

// generate some connected graph
function Grid(width,height,ncolors) {
	var matrix = [];

	// create matrix
	for (var i = 0; i < height; i++) {
		var row = [];
		for (var j = 0; j < width; j++) {
			node = new GraphNode(randomElement(_.range(ncolors)));
			row.push(node);
		}
		matrix.push(row);
	}

	// add neighbors
	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			if (i !== 0) {
				matrix[i][j].neighbors.push(matrix[i-1][j])
			}
			if (i !== height-1) {
				matrix[i][j].neighbors.push(matrix[i+1][j])
			}
			if (j !== 0) {
				matrix[i][j].neighbors.push(matrix[i][j-1])
			}
			if (j !== width-1) {
				matrix[i][j].neighbors.push(matrix[i][j+1])
			}
		}
	}

	// flood first cells
	matrix[0][0].flooded = true;
	matrix[0][0].testNeighbors(matrix[0][0].color);

	// add properties and methods
	var self = this;
	self.matrix = matrix;

	self.flood = function(color) {		
		for (var i = 0; i < height; i++) {
			for (var j = 0; j < width; j++) {
				if (self.matrix[i][j].flooded) {
					self.matrix[i][j].color = color;
					self.matrix[i][j].testNeighbors(color);
				}
			}
		}
	}
}