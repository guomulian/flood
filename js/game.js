function Game(color_scheme, number_of_colors, size) {
    if (number_of_colors > color_scheme.length) {
        throw new Error("Number of colors must be less than or equal to the number of colors available in the color scheme.");
    }

    this.color_scheme = color_scheme;
    this.number_of_colors = number_of_colors;
    this.size = size;
    this.board = new Board(number_of_colors, size);
    this.counter = 0;
    this.max_moves = maxAllowedMoves(number_of_colors, size);
}

Game.prototype.testGameOver = function() {
    let gameover = this.board.testAllFlooded() || (this.counter >= this.max_moves);
    let won = this.board.testAllFlooded() && (this.counter <= this.max_moves);

    return [gameover, won];
};

Game.prototype.drawBoard = function() {
    const table = document.getElementById("board");

    /* Make sure any old stuff is cleared */
    table.innerHTML = "";

    for (let i = 0; i < this.size; i++) {
        let tr = document.createElement("tr");

        for (let j = 0; j < this.size; j++) {
            let td = document.createElement("td");
            td.classList.add("padding-none");
            td.style.backgroundColor = this.color_scheme[this.board.board[i][j].color];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
};

Game.prototype.drawControls = function() {
    const controls = document.getElementById("controls");
    const self = this;

    /* Make sure any old stuff is cleared */
    controls.innerHTML = "";

    for (let i = 0; i < self.number_of_colors; i++) {
        let button = document.createElement("button");
        let color = self.color_scheme[i];

        button.classList.add("control-button");
        button.style.backgroundColor = color;
        button.addEventListener("click", function() {
            self.board.flood(i);
            self.counter += 1;
            self.drawBoard();
            self.drawCounter();

            let t = self.testGameOver();

            if (t[0] === true) {
                alert("You " + (t[1] ? "won" : "lost") + "!");
                let btns = document.getElementsByClassName("btn");

                for (let i = 0; i < btns.length; i++) {
                    btns[i].disabled = true;
                }
            }
        });

        controls.appendChild(button);
    }
};

Game.prototype.drawCounter = function() {
    const counter = document.getElementById("counter");
    counter.innerHTML = this.counter.toString() + "/" + this.max_moves;
};

Game.prototype.drawEverything = function() {
    this.drawBoard();
    this.drawControls();
    this.drawCounter();
};

Game.prototype.restartGame = function() {
    this.counter = 0;
    this.max_moves = maxAllowedMoves(this.number_of_colors, this.size);
    this.board = new Board(this.number_of_colors, this.size);
    this.drawEverything();
};

Game.prototype.changeColorScheme = function(color_scheme) {
    this.color_scheme = color_scheme;
    this.drawBoard();
    this.drawControls();
};

Game.prototype.changeNumberOfColors = function(number_of_colors) {
    this.number_of_colors = number_of_colors;
    this.restartGame();
};

Game.prototype.changeSize = function(size) {
    this.size = size;
    this.restartGame();
};