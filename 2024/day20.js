const fs = require('node:fs');
var PF = require('pathfinding');


try {
    const data = fs.readFileSync('inputs/day20.txt', 'utf8');

    let lines = data.split("\r\n")
    let grid = [];
    let readableGrid = []
    let end = [];
    let start = [];
    let walls = [];
    for (let y = 0; y < lines.length; y++) {
        let currentLine = lines[y];
        grid[y] = [];
        readableGrid[y] = [];
        for (let x = 0; x < currentLine.length; x++) {
            if (currentLine.charAt(x) === '#') {
                grid[y].push(1);
                readableGrid[y].push("#");

                if (x > 0 && x < currentLine.length - 1 && y > 0 && lines.length - 1){
                    walls.push([x, y]);
                }
            } else {
                grid[y].push(0);
                readableGrid[y].push(".");
                if (currentLine.charAt(x) === 'E') {
                    end = [x, y];
                } else if (currentLine.charAt(x) === 'S') {
                    start = [x, y];
                }
            }
            
            
        }
    }

    let pfGrid = new PF.Grid(grid);
    let count = 0;
    var finder = new PF.AStarFinder();
    var path = finder.findPath(start[0], start[1], end[0], end[1], pfGrid);
    console.log(path);
    console.log(path.length - 1);
    let basePathLength = path.length - 1;
    for (let i = 0; i < walls.length ; i++) {
        let wall = walls[i];
        let x = wall[0];
        let y = wall[1];
        let newGrid = JSON.parse(JSON.stringify(grid)); //clone grid
        newGrid[y][x] = 0;
        pfGrid = new PF.Grid(newGrid);
        path = finder.findPath(start[0], start[1], end[0], end[1], pfGrid);
        let newPathLength = path.length - 1;
        let diff = basePathLength - newPathLength;
        if (diff >= 100){
            // console.log(newPathLength, diff);
            count++;
        }
    }
    console.log(count);
} catch (err) {
    console.error(err);
}
//part 1 1289
//part 2 todo