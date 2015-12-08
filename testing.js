function prettyprintcolor(g) {
	for (var row = 0; row < height; row++) {
		console.log(g.matrix[row].map(function(i) {return i.color;}))
	}
}

function prettyprinttruth(g) {
	for (var row = 0; row < height; row++) {
		console.log(g.matrix[row].map(function(i) {return i.flooded;}))
	}
}

function prettyprintboth(g) {
	prettyprintcolor(g);
	prettyprinttruth(g);
}