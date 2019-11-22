function randomIndex(n) {
    return Math.floor(Math.random()*n);
}

/* Come up with a better function for this. */
function maxAllowedMoves(nColors, boardSize) {
    return Math.floor(nColors * boardSize * 0.4);
}

class Tile {
    constructor(color, neighbors = [], isFlooded = false) {
        this.color = color;
        this.neighbors = neighbors;
        this.isFlooded = isFlooded;
    }

    flood(color) {
        if (this.isFlooded === true) {
            return null;
        }

        else if (this.color === color) {
            this.isFlooded = true;
            this.floodNeighbors(color);
        }
    }

    floodNeighbors(color) {
        for (let i = 0; i < this.neighbors.length; i++) {
            this.neighbors[i].flood(color);
        }
    }
}


class Board {
    constructor(nColors, boardSize) {
        let board = [...Array(boardSize)].map(() =>
                    [...Array(boardSize)].map(() => new Tile(randomIndex(nColors, boardSize))));

        // Add neighbors
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (row !== 0) {
                    board[row][col].neighbors.push(board[row - 1][col]);
                }
                if (row !== boardSize - 1) {
                    board[row][col].neighbors.push(board[row + 1][col]);
                }
                if (col !== 0) {
                    board[row][col].neighbors.push(board[row][col - 1]);
                }
                if (col !== boardSize - 1) {
                    board[row][col].neighbors.push(board[row][col + 1]);
                }
            }
        }

        // Flood first tile
        board[0][0].flood(board[0][0].color);

        this.board = board;
        this.boardSize = boardSize;
        this.nColors = nColors;
    }

    flood(color) {
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col].isFlooded === true) {
                    this.board[row][col].color = color;
                    this.board[row][col].floodNeighbors(color);
                }
            }
        }
    }

    isFlooded() {
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col].isFlooded === false) {
                    return false;
                }
            }
        }

        return true;
    }
}
