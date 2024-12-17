const fs = require('node:fs');
var PF = require('pathfinding');
//TODO add djikstra's
try {
    const data = fs.readFileSync('inputs/day16_ex.txt', 'utf8');

    let lines = data.split("\r\n")
    let grid = [];
    let readableGrid = []
    let end = [];
    let start = [];
    for (let y = 0; y < lines.length; y++) {
        let currentLine = lines[y];
        grid[y] = [];
        readableGrid[y] = [];
        for (let x = 0; x < currentLine.length; x++) {
            if (currentLine.charAt(x) === '#') {
                grid[y].push(1);
                readableGrid[y].push("#");
            } else {
                grid[y].push(0);
                readableGrid[y].push(".");
                if (currentLine.charAt(x) === 'E'){
                    end = [x,y];
                } else if (currentLine.charAt(x) === 'S'){
                    start = [x,y];
                }
            }
        }
    }
    let pfGrid =  new PF.Grid(grid);
    // console.log(grid,start,end);
    //chebyshev euclidean  octile
    var finder = new PF.AStarFinder({
        heuristic: PF.Heuristic.octile
    });
    var path = finder.findPath(start[0], start[1], end[0], end[1], pfGrid);
    let turns = 0;
    let prevVectorX = 1;
    let prevVectorY = 0;
    for (let i = 0; i < path.length - 1; i++) {
        let x = path[i][0];
        let y = path[i][1];
        let nextX = path[i+1][0];
        let nextY = path[i+1][1];
        let vectorX = nextX - x;
        let vectorY = nextY - y;
        console.log(vectorX,vectorY)
        if (vectorX == prevVectorX && vectorY == prevVectorY) {
            
        } else {
            turns++;
        }
        prevVectorX = vectorX;
        prevVectorY = vectorY;
        readableGrid[y][x] = "X";
    }
    for (let y = 0; y < grid.length; y++) {
        let line = readableGrid[y];
        console.log(line.join(""));
    }
    
    // console.log(path);
    let score = turns * 1000 + path.length;
    console.log(score);
} catch (err) {
    console.error(err);
}
