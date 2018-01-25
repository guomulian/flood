function randomIndex(n) {
    return Math.floor(Math.random()*n);
}

/* Come up with a better function for this. */
function maxAllowedMoves(number_of_colors, size) {
    return Math.floor(number_of_colors * size * 0.4);
}