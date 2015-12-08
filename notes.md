# Parameters
- number of colors
- graph/grid layout
- number of moves allowed

# Objects
graph
	nodes
		flooded : boolean
		color : integer
	edges

# Methods
TEST CELL (node, color)
	if node is flooded:
		end
	else if node is color
		node = flooded
		TEST NEIGHBORS (node, color)

TEST NEIGHBORS (node, color)
	for neighbor in neighbors of node:
		TEST CELL(neighbor, color)