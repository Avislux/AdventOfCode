const fs = require('node:fs');
startingPosition = {};
width = null;
height = null;
function simulateGrid(grid,index){
    // console.log("doing index",index)
    let direction = "up";
    let path = [];
    let withinBounds = true;
    let steps = 0;
    let position = {
        x: startingPosition.x,
        y: startingPosition.y,
    };
    let retrace = 0;
    if ( index === 0 || index === 50){
        // printArray(grid);
        // console.log("\n\n\n")
        
    }
    while (withinBounds){
        steps++;
        grid[position.y][position.x] = "O";
        let nextPosition = {};
        switch (direction) {
            case "up":
                nextPosition.x = position.x;
                nextPosition.y = position.y - 1;
                break;
            case "right":
                nextPosition.x = position.x + 1;
                nextPosition.y = position.y;
                break;
            case "down":
                nextPosition.x = position.x;
                nextPosition.y = position.y + 1;
                break;
            case "left":
                nextPosition.x = position.x - 1;
                nextPosition.y = position.y;
                break;
        }
        
        if (grid[nextPosition.y] === undefined || grid[nextPosition.y][nextPosition.x] === undefined){
            break;
        }
        if (steps === index){
            // console.log("block at", nextPosition);
            if (grid[nextPosition.y][nextPosition.x] === "O"){
                //we did this location already
                return false;
                
            }
            else if (grid[nextPosition.y][nextPosition.x] !== "#"){
                grid[nextPosition.y][nextPosition.x] = "#"; //add a block
            } else{
                return false;
            }
        }
        if (grid[nextPosition.y][nextPosition.x] === "O" || grid[nextPosition.y][nextPosition.x] === "#") {
            retrace++;
            // console.log(retrace);
            if (retrace > 500){
                // printArray(grid);
                // console.log("\n\n\n")
                return true;
            }
        } else {
            retrace = 0;
        }
        if (grid[nextPosition.y][nextPosition.x] === "#") {
            switch (direction) {
                case "up":
                    direction = "right";
                    break;
                case "right":
                    direction = "down";
                    break;
                case "down":
                    direction = "left";
                    break;
                case "left":
                    direction = "up";
                    break;
            }
        } else {
            position.y = nextPosition.y;
            position.x = nextPosition.x;
        }

        if ( position.x >= width || position.x < 0 || position.y >= height || position.y < 0) {
            withinBounds = false;
            return false;
        }
        if (steps > 10000){
            printArray(grid);
            process.exit(0);
            return false;
        }
    }
    return false;
}
function printArray(array){
    for (let i = 0; i < array.length; i++) {
        console.log(array[i].join(''));
    }
}
try {
    const data = fs.readFileSync('inputs/day6.txt', 'utf8');

    let rows = data.split("\r\n")
    let grid = [];
    let originalGrid = [];
    
    let position = {};
    
    let directions = ["up","right","down","left"];
    let direction = "up";
    height = rows.length;
    width = rows[0].length;
    let path = [];
    for (let i = 0; i < rows.length; i++) {
        let rowSplit = rows[i].split('');
        if (rowSplit.includes('^')) {
            const guard = (element) => element === '^';
            let x = rowSplit.findIndex(guard);
            position.x = x;
            position.y = i;
            startingPosition.x = x;
            startingPosition.y = i;
        }
        grid.push(rowSplit);
        originalGrid.push([...rowSplit]);
        
    }

    let withinBounds = true;
    while (withinBounds){
        grid[position.y][position.x] = "O";
        let nextPosition = {};
        switch (direction) {
            case "up":
                nextPosition.x = position.x;
                nextPosition.y = position.y - 1;
                break;
            case "right":
                nextPosition.x = position.x + 1;
                nextPosition.y = position.y;
                break;
            case "down":
                nextPosition.x = position.x;
                nextPosition.y = position.y + 1;
                break;
            case "left":
                nextPosition.x = position.x - 1;
                nextPosition.y = position.y;
                break;
        }
        path.push( {
            x: position.x,
            y: position.y,
            direction: direction,
        });
        if (grid[nextPosition.y] === undefined || grid[nextPosition.y][nextPosition.x] === undefined){
            break;
        }
        if (grid[nextPosition.y][nextPosition.x] === "#") {
            switch (direction) {
                case "up":
                    direction = "right";
                    break;
                case "right":
                    direction = "down";
                    break;
                case "down":
                    direction = "left";
                    break;
                case "left":
                    direction = "up";
                    break;
            }
        } else {
            position.y = nextPosition.y;
            position.x = nextPosition.x;
        }

        if ( position.x >= width || position.x < 0 || position.y >= height || position.y < 0) {
            withinBounds = false;
        }
    }
    let loops = 0;
    for (let i = 0; i < path.length; i++) {
        let newGrid =JSON.parse(JSON.stringify(originalGrid)); //clone grid
        
        let result = simulateGrid(newGrid,i);
        if (result){
            loops++;
        }
    }
    console.log("part 2",loops);
    // printArray(grid);
} catch (err) {
    console.error(err);
}
//part 1 4964 (copied output into a file and used find to count)
//part 2 2757 too high
// 2389 too high
// 2547 too high
// 2256 incorrect
// 2122 incorrect
// 2300 incorrect
// 1906
// 1740