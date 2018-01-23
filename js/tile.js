function Tile(color, is_flooded, neighbors) {
    this.color = color;
    this.is_flooded = typeof is_flooded !== 'undefined' ? is_flooded : false;
    this.neighbors = typeof neighbors !== 'undefined' ? neighbors : [];
}

Tile.prototype.floodTile = function(flood_color) {
    if (this.is_flooded === true) {
        return;
    }

    else if (this.color === flood_color) {
        this.is_flooded = true;
        this.floodNeighbors(flood_color);
    }
};

Tile.prototype.floodNeighbors = function(flood_color) {
    for (let i = 0; i < this.neighbors.length; i++) {
        this.neighbors[i].floodTile(flood_color);
    }
};