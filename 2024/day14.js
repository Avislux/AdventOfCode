const fs = require('node:fs');

try {
    const data = fs.readFileSync('inputs/day14.txt', 'utf8');
    let width = 101;
    let height = 103;

    /*const data = fs.readFileSync('inputs/day14_ex.txt', 'utf8');
    let width = 11;
    let height = 7;*/
    
    let lines = data.split("\r\n")
    const re = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/g;
    let robots = [];
    
    lines.forEach(function(line,index){
        let matchArray = [...line.matchAll(re)];
        let robot = {}
        robot.px = parseInt(matchArray[0][1])
        robot.py = parseInt(matchArray[0][2])
        robot.vx = parseInt(matchArray[0][3])
        robot.vy = parseInt(matchArray[0][4])
        robots.push(robot)
    })
    const seconds = 100;
    let quadTotals = [0,0,0,0];
    let widthMiddle = Math.round(width / 2 ) - 1; // minus 1 to acccount for 0-based array
    let heightMiddle = Math.round(height / 2) - 1;
    console.log("middles",widthMiddle,heightMiddle)
    for (let i = 0; i < robots.length; i++){
        let robot = robots[i];
        let finalX = (robot.vx * seconds + robot.px) % width;
        if (finalX < 0){
            finalX = width + finalX;
        }
        let finalY = (robot.vy * seconds + robot.py) % height;
        if (finalY < 0){
            finalY = height + finalY;
        }
        let quadrantIndex = null;
        if (finalY < heightMiddle) {
            if (finalX < widthMiddle) {
                quadrantIndex = 0;
            } else if (finalX > widthMiddle) {
                quadrantIndex = 1;
            }
        } else if (finalY > heightMiddle) {
            if (finalX < widthMiddle) {
                quadrantIndex = 2;

            } else if (finalX > widthMiddle) {
                quadrantIndex = 3;
            }
        }
        if (quadrantIndex != null){
            quadTotals[quadrantIndex] += 1;
        }
        if (i < 20){
            console.log(robot,finalX,finalY,quadrantIndex);
        }
    }
    console.log(quadTotals);
    console.log(quadTotals[0]*quadTotals[1]*quadTotals[2]*quadTotals[3]);
} catch (err) {
    console.error(err);
}
//part 1 117994968 incorrect
//part 1  87596418 incorrect
//part 1 78001440 too low