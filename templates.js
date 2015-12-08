function buttonsHTML(colors,ncolors) {
	return colors.slice(0,ncolors).map(function(color,index) {
		return '<button type="button" style="background-color: '+ color + '; border: none; padding: 1%; height: 50px; width: 50px;" value="' + color + '" onclick="game.flood(' + index + '); counter = counter + 1;"></button> '
	});
}

// game must be grid
function gridTableHTML(game,colors,height,width,sizing) {
	return '<table cellpadding="0px" cellspacing="0px" height="' + ((height/width)*sizing).toString() + 'px" width="' + sizing.toString() + 'px"><tbody>' + 
		game.matrix.map(function(row) {
			return '<tr>' + 
					row.map(function(cell) {
						return '<td style="background-color:' + colors[cell.color] + ';"></td>'
					}).join("")
			 		+ '</tr>'
			}).join("")
		+ '</tbody></table>';
}

function colorSchemesHTML(schemes) {
	return schemes.map(function(scheme,index) {
			return '<p><button style="border: none; padding: 0px; display: block; width: 100%;" value="' + index + '"><table cellpadding="0px" cellspacing="0px" height="20px" width="100%"><tbody><tr>' +
					scheme.map(function(color) {
					return '<td style="background-color:' + color + '; border: none;"></td>'
					}).join("")
					+ '</tr></tbody></table></button></p>'
			}).join("")
}