const fs = require('node:fs');
var PF = require('pathfinding');

function printArray(array){
    for (let i = 0; i < array.length; i++) {
        console.log(array[i].join(''));
    }
}
try {
    const data = fs.readFileSync('inputs/day20.txt', 'utf8');
    const timeSaveToLookFor = 100;
    // const timeSaveToLookFor = 50;

    let lines = data.split("\r\n")
    let grid = [];
    let readableGrid = []
    let invertedGrid = [];
    let end = [];
    let start = [];
    let walls = [];
    for (let y = 0; y < lines.length; y++) {
        let currentLine = lines[y];
        grid[y] = [];
        invertedGrid[y] = [];
        readableGrid[y] = [];
        for (let x = 0; x < currentLine.length; x++) {
            if (currentLine.charAt(x) === '#') {
                grid[y].push(1);
                readableGrid[y].push("#");
                invertedGrid[y].push(0);

                if (x > 0 && x < currentLine.length - 1 && y > 0 && lines.length - 1){
                    walls.push([x, y]);
                }
            } else {
                grid[y].push(0);
                invertedGrid[y].push(1);
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
    var originalPath = finder.findPath(start[0], start[1], end[0], end[1], pfGrid);
    let basePathLength = originalPath.length - 1;
    let timeSavedArray = {};
    for (let i = 0; i < originalPath.length ; i++) {
        let shortcutStart = originalPath[i];
        
        for (let j = i +1; j < originalPath.length  ;j++) {
           let shortcutEnd = originalPath[j];
           
            let diffY = Math.abs(shortcutEnd[1] - shortcutStart[1]);
            let diffX = Math.abs( shortcutEnd[0] - shortcutStart[0]);
            let shortcutLength = diffY + diffX;
            if (shortcutLength > 0 && shortcutLength <= 20){
                let pathsSpliced = j - i; 
              
                let shortcuttedLength = shortcutLength + basePathLength - pathsSpliced;
                let timeSaved = basePathLength - shortcuttedLength;
                if (timeSaved >= timeSaveToLookFor) {
                    if (timeSavedArray[timeSaved] === undefined ) {
                        timeSavedArray[timeSaved] = 1;
                    } else {
                        timeSavedArray[timeSaved]++;
                    }
                    count++;
                }
            }
        }
        
    }
    console.log(timeSavedArray);
    
    console.log(count);
} catch (err) {
    console.error(err);
}
//part 1 1289
//part 2 982425
// example part 2 is 295 for save >= 50;

// 228 183 