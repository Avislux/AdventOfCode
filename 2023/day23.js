const fs = require('node:fs');
var PF = require('pathfinding');
var WorstFinder = require('./library/WorstFinder.js');
try {
    let data = fs.readFileSync('inputs/day23_example.txt', 'utf8');
    //POC start
    /*let grid = data.replaceAll('#','1').replaceAll(/[.^><v]/g,'0');
    let lines = grid.split("\r\n")
    let matrix = [];
    lines.forEach(function(line,index){
        let lineArray = line.split('');
        lineArray = lineArray.map(function(x){
            return parseInt(x);
        })
        matrix.push(lineArray);
    })
    let pfGrid = new PF.Grid(matrix);
    let finder = new PF.AStarFinder();
    let path = finder.findPath(1, 0, 21, 22, pfGrid);*/
    //POC End
    
    
    console.log(path);
    console.log(path.length);
    console.log("Solution: ", path.length -1);
} catch (err) {
    console.error(err);
}

// var matrix = [
//     [0, 0, 0, 1, 0],
//     [1, 0, 0, 0, 1],
//     [0, 0, 1, 0, 0],
// ];
// var grid = new PF.Grid(matrix);
// grid.setWalkableAt(0, 1, false);
// var finder = new PF.AStarFinder();
// var path = finder.findPath(1, 2, 4, 2, grid);
/*
* *  `AStarFinder` *
*  `BestFirstFinder`
*  `BreadthFirstFinder` *
*  `DijkstraFinder` *
*  `IDAStarFinder.js` *
*  `JumpPointFinder` *
*  `OrthogonalJumpPointFinder` *
*  `BiAStarFinder`
*  `BiBestFirstFinder`
*  `BiBreadthFirstFinder` *
*  `BiDijkstraFinder` *
* */