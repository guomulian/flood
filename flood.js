var colors0 = ['#FF6C00', '#FFA500', '#1047A9', '#009E8E','#6A0C62'];
var colors1 = ['#8E6800', '#8E8E00', '#8E3700', '#050E62','#322500'];
var colors2 = ['#206176', '#BD882E', '#654308', '#BD602E','#652908'];
var colors3 = ['#FFD4A7', '#00A48D', '#FF8300', '#FF4900', '#904A00'];
var colors4 = ['#FF7A07', '#FFDB07', '#D20686', '#06A7AF', '#848A8B'];

var colorPalattes = [colors0, colors1, colors2, colors3, colors4];

// creates the initial game table, with specified size (table is square)
function initialTable(size) {
	var mainTable = document.getElementById("main_table");
	
	for(var i = 0; i < size; i++)
	{
		// creates a <tr> element
		var currentRow = document.createElement("tr");
	
		for(var j = 0; j < size; j++)
		{
			// creates a <td> element
			var currentCell = document.createElement("td");
			// puts the cell into the row
			currentRow.appendChild(currentCell);
		}
		
		// puts the row into the table
		mainTable.appendChild(currentRow);
	}
	}

// get a random color from colors
function randomColor(colors) {
    return colors[Math.floor(Math.random()*colors.length)];
	}

// create a table of colors for gameplay
function colorTable(colors) {
	var colourTable = document.createElement("table");
	var colourTableRow = document.createElement("tr");
	
	// create one <td> for each color, id is index of color in colors
	for(var i = 0; i < colors.length; i++){
		var colourCell = document.createElement("td");
		colourCell.style.backgroundColor = colors[i];
		colourTableRow.appendChild(colourCell);
	}
	colourTable.appendChild(colourTableRow);
	colourTable.setAttribute("id","color_table");
	document.body.appendChild(colourTable);
	}

// update counter text
function updateCounter(moves,maxMoves) {
	$('#counter').text(moves+"/"+maxMoves);
	}

// create array corresponding to main_table
function getArray() {
	var myTableArray = [];
	$("#main_table tr").each(function() {
    	var arrayOfThisRow = [];
		$(this).find('td').each(function() {
			arrayOfThisRow.push(false);
			});
		myTableArray.push(arrayOfThisRow);
		});
	return myTableArray
	}

// convert rgb to hex
function rgb2hex(rgb) {
    var rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    	}
    result = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    return result.toUpperCase();
	}

// get background color of (row,col) in main_table
function getColor(row,col) {
	return rgb2hex($("#main_table tr:eq("+row+") td:eq("+col+")").css("backgroundColor"));
	}

// tests to see if color of (row,col) is color (returns true/false)
function testColor(row,col,color) {
	if (getColor(row,col) == color) {
		return true;
		}
	else {
		return false;
		}
	}

// create sizes menu
function createSizesMenu(sizes) {
	var sizeOptions = document.getElementById("sizes_content");
    var sizeOptionsTable = document.createElement("table");
    var sizeOptionsTableRow = document.createElement("tr");
	for(var i = 0; i < sizes.length; i++){
		var sizeTableOptionsCell = document.createElement("td");
		sizeTableOptionsCell.appendChild(document.createTextNode(sizes[i]));
		sizeTableOptionsCell.setAttribute("class","option");
		sizeOptionsTableRow.appendChild(sizeTableOptionsCell);
		}
    sizeOptionsTable.appendChild(sizeOptionsTableRow);    
    sizeOptions.appendChild(sizeOptionsTable);
	}

// create color palattes menu
function createColorsMenu(colorPalattes) {
	var colorOptions = document.getElementById("colors_content");
    var colorOptionsTable = document.createElement("table");
    var colorOptionsTableRow = document.createElement("tr");

    // loop through palattes
	for(var i = 0; i < colorPalattes.length; i++){
		var colorOptionsTableCell = document.createElement("td");
		var currentPalatte = colorPalattes[i];
		var colorCanvas = document.createElement("canvas");
		colorCanvas.width = 50;
		colorCanvas.height = 50;
		var context = colorCanvas.getContext('2d');
		var canvasWidth = colorCanvas.width;
		var canvasHeight = colorCanvas.height;

		// loop through colors in palatte
		for(var j = 0; j < currentPalatte.length; j++) {
			context.beginPath();
			context.rect(10*j, 0, 10, canvasHeight);
			context.fillStyle = currentPalatte[j];
			context.fill();
		}
		colorOptionsTableCell.appendChild(colorCanvas);
		colorOptionsTableCell.setAttribute("class","option");
		colorOptionsTableCell.setAttribute("id","colors"+i);
		colorOptionsTableRow.appendChild(colorOptionsTableCell);
		}
    colorOptionsTable.appendChild(colorOptionsTableRow);    
    colorOptions.appendChild(colorOptionsTable);
	}

// change color of (row,col) to color
function changeColor(row,col,color) {
	$("#main_table tr:eq("+row+") td:eq("+col+")").animate({backgroundColor:color},1000);
	}

// test cell
function testCell(colorArray,row,col,color) {
	//color must be hex
	if (colorArray[row][col] == true){
		return;
		}
	else if (testColor(row,col,color)) {
		colorArray[row][col] = true;
		neighborCells(colorArray,row,col,color);
		}
	}

// test neighbors
function neighborCells(colorArray,row,col,color) {
	var size = colorArray.length
	//right neighbor (size-1 is rightmost column)
	if (col < size-1) {
		testCell(colorArray,row,col+1,color);
		}
	//left neighbor (0 is leftmost column)
	if (col > 0) {
		testCell(colorArray,row,col-1,color);
		}
	//below neighbor (size-1 is bottommost row)
	if (row < size-1) {
		testCell(colorArray,row+1,col,color);
		}
	//above neighbor (0 is topmost row)
	if (row > 0) {
		testCell(colorArray,row-1,col,color);
		}
	}

$(document).ready(
	function() {
		// set color scheme and size options
		var colors = colors0;
		var sizes = [5,10,15,20,25];

		// create menus
		createSizesMenu(sizes);
		createColorsMenu(colorPalattes);

		// menu slide down
		$("#help, #sizes, #colors").click(
			function(){
				if ($("#"+this.id+"_content").is(":hidden")) {
					$("#"+this.id+"_content").slideDown("slow");
					$("#"+this.id+"_content").animate({opacity: 1},{queue: false});
				}
				else {
					$("#"+this.id+"_content").slideUp("slow");
					$("#"+this.id+"_content").animate({opacity: 0},{queue: false});
				}
			});

		// menu hover effect
		$(".menu_item").hover(
			function() {
				var randColor = randomColor(colors);
				var rgbaColor = 'rgba(' + parseInt(randColor.slice(-6,-4),16) 
					+ ',' + parseInt(randColor.slice(-4,-2),16)
					+ ',' + parseInt(randColor.slice(-2),16)
					+ ', 0.5)'
				$(this).stop().animate({"backgroundColor": rgbaColor});
				},
			function() {
				$(this).stop().animate({"backgroundColor": "initial"});
				}
			);

		// option hover effect
		$(".option").each(
			function() {
				// hover effect
				$(this).hover(
					function() {
						$(this).stop().animate({"opacity": 1});
					},
					function() {
						$(this).stop().animate({"opacity": 0.5});
					}
				);
			});
		
		function newGame(size,colors) {
			$("#color_table").remove();
			$("#main_table, #counter, #end").empty();
			$("#end").css("display","none");

			// number of moves
			var moves = 0;
			var previousColorIndex;

			// is the game finished
			var finish = false;

			// change move limit to depend on size
			var maxMoves = Math.ceil(1.5*size);

			// update counter
			updateCounter(moves,maxMoves);

			// create table for color changing
			colorTable(colors);

			// create main_table
			initialTable(size);

			// randomize colors
			$("#main_table td").each(
				function() {
					$(this).css("backgroundColor", randomColor(colors))
				});

			// initial array
			var mainTableArray = getArray();

			// start with first cell
			mainTableArray[0][0] = true;

			// add neighbors of first cell
			neighborCells(mainTableArray,0,0,getColor(0,0));

			// color table (controls)
			$("#color_table td").each(
				function() {
				//set what happens when a color is clicked
				$(this).click(
					function() {
						var currentColor = rgb2hex($(this).css("backgroundColor"));
						if (finish == false && currentColor != colors[previousColorIndex]) {
							moves++;
							updateCounter(moves,maxMoves);
							previousColorIndex = $.inArray(currentColor,colors);
							}
				
						for(var row = 0; row < size; row++) {
							for(var col = 0; col < size; col++) {
								if(mainTableArray[row][col] == true) {
									changeColor(row,col,currentColor);
									neighborCells(mainTableArray,row,col,currentColor);
									}
								}
							}
					
						if (mainTableArray.every(function(arr) {return arr.every(Boolean)}) && finish != true) {
							document.getElementById("end").innerHTML="<span>You win!</span>";
							$("#end").fadeIn("slow");
							$("#again").fadeIn("slow");
							finish = true;
							}

						else if (moves == maxMoves && finish != true) {
							document.getElementById("end").innerHTML="<span>You lose!</span>";
							$("#end").fadeIn("slow");
							$("#again").fadeIn("slow");
							finish = true;
							}
				});
				
					// hover effect
					$(this).hover(
						function() {
							$(this).stop().animate({"opacity": 0.75});
						},
						function() {
							$(this).stop().animate({"opacity": 1});
						}
					);
				});
			}

		// (first time)
		newGame(15,colors)

		// start new game
		$("#new_game").click(
			function() {
				newGame($('#main_table tr').length,colors);
				}
			);

		// set dimensions of table (starts new game)
		$("#sizes_content td").each(
			function() {
				$(this).click(
					function() {
						newGame(Number($(this).text()),colors);
						}
					);	
				}
			);

		$("#colors_content td").each(
				function() {
					$(this).click(
						function() {
							var newColors = eval(this.id);
							$("#main_table td").each(
								function() {
									var colorIndex = $.inArray(rgb2hex($(this).css("backgroundColor")),colors);
									var newColor = newColors[colorIndex];
									$(this).css("backgroundColor",newColor)
								});
							$("#color_table td").each(
								function() {
									var colorIndex = $.inArray(rgb2hex($(this).css("backgroundColor")),colors);
									var newColor = newColors[colorIndex];
									$(this).css("backgroundColor",newColor)
								}
								)
							colors = newColors;
							}
						);
					}
				);
	});