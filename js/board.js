function Board(number_of_colors, size) {
    /* Initialize board */
    let board = [];

    for (let i = 0; i < size; i++) {
        let row = [];

        for (let j = 0; j < size; j++) {
            let tile = new Tile(randomIndex(number_of_colors));
            row.push(tile);
        }

        board.push(row);
    }

    /* Add neighbors */
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (i !== 0) {
                board[i][j].neighbors.push(board[i-1][j]);
            }
            if (i !== size - 1) {
                board[i][j].neighbors.push(board[i+1][j]);
            }
            if (j !== 0) {
                board[i][j].neighbors.push(board[i][j-1]);
            }
            if (j !== size - 1) {
                board[i][j].neighbors.push(board[i][j+1]);
            }
        }
    }

    /* Flood first tile(s) */
    board[0][0].is_flooded = true;
    board[0][0].floodNeighbors(board[0][0].color);

    this.board = board;
    this.size = size;
}

Board.prototype.flood = function(flood_color) {
    for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
            if (this.board[i][j].is_flooded === true) {
                this.board[i][j].color = flood_color;
                this.board[i][j].floodNeighbors(flood_color);
            }
        }
    }
};

Board.prototype.testAllFlooded = function() {
    for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
            if (this.board[i][j].is_flooded === false) {
                return false;
            }
        }
    }

    return true;
};