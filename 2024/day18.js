const fs = require('node:fs');
var PF = require('pathfinding');
let height = 71;
let width = 71;
let maxRocks = 1024;
try {
    const data = fs.readFileSync('inputs/day18.txt', 'utf8');

    let lines = data.split("\r\n")
    let grid = [];
    let readableGrid = []
    let end = [width-1,height-1];
    let start = [0,0];
    for (let y = 0; y < height; y++) {
        let row = []
        for (let x = 0; x < width; x++) {
            row.push(0);
        }
        grid.push(row);
    }
    
    for (let i = 0; i < maxRocks; i++) {
        let rock = lines[i];
        let rockSplit = rock.split(",").map((v) => { return parseInt(v); });
        let x = rockSplit[0];
        let y = rockSplit[1];
        // console.log(rockSplit);
        grid[y][x] = 1;
    }

    let pfGrid =  new PF.Grid(grid);

    var finder = new PF.AStarFinder();
    var path = finder.findPath(start[0], start[1], end[0], end[1], pfGrid);
    console.log("Part 1 ", path.length - 1);
    //part 2 starto
    for (let i = maxRocks; i < lines.length; i++) {
        let rock = lines[i];
        let rockSplit = rock.split(",").map((v) => { return parseInt(v); });
        let x = rockSplit[0];
        let y = rockSplit[1];
        grid[y][x] = 1;
        pfGrid =  new PF.Grid(grid);
        path = finder.findPath(start[0], start[1], end[0], end[1], pfGrid);
        if (path.length === 0){
            console.log("Blocked at", i );
            console.log("Part 2 ",rock);
            break;
        }
    }

    
} catch (err) {
    console.error(err);
}
/*Part 1  306
Blocked at 2940
Part 2  38,63
*/