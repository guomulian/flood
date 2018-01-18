var schemes = [
	['#FF6C00', '#FFA500', '#1047A9', '#009E8E', '#6A0C62'],
	['#D60061', '#FF5C00', '#8BEA00', '#00A779', '#3D281D'],
	['#206176', '#BD882E', '#654308', '#BD602E', '#652908'],
	['#DAEBB0', '#849E44', '#3B3F74', '#A78E48', '#813868']
];

// initial values
var colors = schemes[0];
var width = 10;
var height = 10;
var ncolors = 3;
var sizing = 300;

var moves = maxAllowedMoves(height,width,ncolors);
var counter = 0;
// ncolors <= colors

var game = new Grid(width,height,ncolors);

$(document).ready(function() {
	// initialize
	function refreshGraph(game,colors,height,width,sizing) {
		$('#graph-container').html(gridTableHTML(game,colors,height,width,sizing));
		// $('#control-container').width(sizing)
	}

	function refreshButtons(colors,ncolors) {
		// buttons
		$('#buttons-container').html(buttonsHTML(colors,ncolors));

		// actions
		$('#buttons-container button').click(function() {
			$('#graph-container').html(gridTableHTML(game,colors,height,width,sizing));
			$('#counter-container').html(counter.toString() + '/' + moves.toString());

			if(game.matrix.every(
				function(e) { return e.every(function(f) { return f.flooded; }); })) {
				$('#buttons-container button').prop('disabled',true);
				alert('You win!');
			}

			else if(counter >= moves) {
				$('#buttons-container button').prop('disabled',true);
				alert('You lose!');
			}
		});
	}

	function refreshCounter(counter,moves) {
		$('#counter-container').html(counter.toString() + '/' + moves.toString());
	}

	function refreshSchemes(schemes) {
		$('#options-colors').html(colorSchemesHTML(schemes));
		$('#options-colors button').click(function() {
			index = $(this).val()
			colors = schemes[index];
			refreshGraph(game,colors,height,width,sizing);
			refreshButtons(colors,ncolors);
		})
	}

	// initialize
	refreshGraph(game,colors,height,width,sizing);
	refreshButtons(colors,ncolors);	
	refreshCounter(counter,moves);
	refreshSchemes(schemes);

	// set new game button
	$('#new-game').click(function() {
		game = new Grid(width,height,ncolors);
		refreshGraph(game,colors,height,width,sizing);

		// re-enable buttons
		$('#buttons-container button').prop('disabled',false);

		// reset counter
		counter = 0;
		refreshCounter(counter,moves);
	});

	// set toggle show/hide
	$('#options-toggle').click(function() {
		$('#options-container').fadeToggle()
	});

	$('#help-toggle').click(function() {
		$('#help-container').fadeToggle()
	});

	$.each(['colors','ncolors','height','width','sizing'],function(index, value) {
		$('#options-' + value + '-toggle').click(function() {
			$('#options-' + value).fadeToggle();
		});
	});

	// options control
	$('#options-ncolors input').change(function() {
		ncolors = $(this).val();
		counter = 0;

		moves = maxAllowedMoves(height,width,ncolors);

		game = new Grid(width,height,ncolors);

		refreshCounter(counter,moves);
		refreshButtons(colors,ncolors);
		refreshGraph(game,colors,height,width,sizing);
	});

	$('#options-height input').change(function() {
		height = $(this).val();
		counter = 0;

		moves = maxAllowedMoves(height,width,ncolors);

		game = new Grid(width,height,ncolors);

		refreshCounter(counter,moves);
		refreshButtons(colors,ncolors);
		refreshGraph(game,colors,height,width,sizing);
	});

	$('#options-width input').change(function() {
		width = $(this).val();
		counter = 0;

		moves = maxAllowedMoves(height,width,ncolors);

		game = new Grid(width,height,ncolors);

		refreshCounter(counter,moves);
		refreshButtons(colors,ncolors);
		refreshGraph(game,colors,height,width,sizing);
	});

	$('#options-sizing input').change(function() {
		sizing = $(this).val();
		counter = 0;

		moves = maxAllowedMoves(height,width,ncolors);

		refreshCounter(counter,moves);
		refreshButtons(colors,ncolors);
		refreshGraph(game,colors,height,width,sizing);
	});
});