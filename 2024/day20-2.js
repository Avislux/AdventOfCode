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
   /* for (let y = 0; y < invertedGrid.length; y++) {
        //make  the border still a border.
        let currentLine = lines[y];
       
        for (let x = 0; x < currentLine.length; x++) {
            if (x === 0 || y === 0 || x === invertedGrid.length  - 1 || y === currentLine.length - 1 ){
                invertedGrid[y][x] = 1;
            }
        }
    }*/
    // printArray(invertedGrid);
    let pfGrid = new PF.Grid(grid);
    let count = 0;
    var finder = new PF.AStarFinder();
    var originalPath = finder.findPath(start[0], start[1], end[0], end[1], pfGrid);
    // console.log(path);
    // console.log(path.length - 1);
    let basePathLength = originalPath.length - 1;
    // console.log(basePathLength);
    // printArray(invertedGrid);
    let timeSavedArray = {};
    for (let i = 0; i < originalPath.length ; i++) {
        let shortcutStart = originalPath[i];
        
        for (let j = i +1; j < originalPath.length  ;j++) {
            let shortcutEnd = originalPath[j];
            let newGrid = JSON.parse(JSON.stringify(invertedGrid)); //clone grid
            // printArray(newGrid);
            newGrid[shortcutStart[1]][shortcutStart[0]] = 0;
            newGrid[shortcutEnd[1]][shortcutEnd[0]] = 0;
            
            pfGrid = new PF.Grid(newGrid);
            
            let path = finder.findPath(shortcutStart[0], shortcutStart[1], shortcutEnd[0], shortcutEnd[1], pfGrid);
            path.shift();
            let shortcutLength = path.length - 1;
            // console.log(shortcutEnd,shortcutEnd,shortcutLength);
            if (shortcutLength > 0 && shortcutLength <= 20){
                let pathsSpliced = j - i; 
                let newPath = JSON.parse(JSON.stringify(originalPath));
                
                newPath.splice(i + 1,pathsSpliced);
                let splicedPath = JSON.parse(JSON.stringify(newPath));
                // console.log("spliced",newPath.length, pathsSpliced);
                newPath = newPath.concat(path);
                // console.log("concat",newPath.length);
                
                let shortcuttedLength = newPath.length - 1;
                // console.log(shortcuttedLength);
                let timeSaved = basePathLength - shortcuttedLength;
                if (timeSaved >= timeSaveToLookFor) {
                    if (timeSavedArray[timeSaved] === undefined ) {
                        timeSavedArray[timeSaved] = 1;
                    } else {
                        timeSavedArray[timeSaved]++;
                    }
                    count++;
                    
                    /*if (timeSaved >= 76){
                        console.log("\n");
                        console.log(splicedPath,timeSaved,shortcutStart,shortcutEnd);
                        console.log(newPath);
                        let newReadableGrid = JSON.parse(JSON.stringify(readableGrid));
                        
                        for (let k = 0; k < path.length; k++) {
                            let shortcut = path[k];
                            newReadableGrid[shortcut[1]][shortcut[0]] = 'X';
                        }
                        printArray(newReadableGrid);
                        
                    }*/
                }
            }
        }
        
        // let diff = basePathLength - newPathLength;
        /*if (diff >= 100){
            // console.log(newPathLength, diff);
            count++;
        }*/
    }
    console.log(timeSavedArray);
    
    console.log(count);
} catch (err) {
    console.error(err);
}
//part 1 1289
//part 2 todo
// example part 2 is 295 for save >= 50;

// 228 183