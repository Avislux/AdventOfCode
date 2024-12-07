const fs = require('node:fs');
function isLineSafe(line) {
    let length = line.length;
    for (let i = 0; i < length - 1; i++) {
        let diff = line[i] - line[i + 1];
        trend = diff >= 0; //bool positive = true;
        if (i == 0) {
            initialTrend = trend; //bool positive = true;
        }
        if (diff == 0) {
            // console.log(line.toString() + " is not safe cus of 0" )
            return false;
        }
        if (Math.abs(diff) > 3) {
            // console.log(line.toString() + " is not safe cus of high diff" )
            return false;
        }
        if (initialTrend != trend) {
            // console.log(line.toString() + " is not safe cus of diff trend" )
            return false;
        }
    }
    return true;
}
try {
    const data = fs.readFileSync('inputs/day2.txt', 'utf8');

    let lines = data.split("\r\n")
    let safeLines = 0;
    let parsedLines = [];
    lines.forEach(function(line,index){
        let lineNumbers = line.split(" ").map(value => parseInt(value));
        parsedLines.push(lineNumbers);
    })
    // console.log(parsedLines);
    
    // return;
    let numberOfLines = parsedLines.length;
    let unsafeLines = [];
    
    for ( let x = 0 ; x < numberOfLines ; x++ ){
        let line = parsedLines[x];
        // console.log(line);
        var trend = null;
        var initialTrend = null;
        let isSafe = true;
        isSafe = isLineSafe(line)
       
        if (isSafe){
            safeLines++;
        } else {
            unsafeLines.push(line);
            // console.log(unsafeLines);
        }
    }
    numberOfLines = unsafeLines.length;
    let newSafeLines = 0;
    for ( let x = 0 ; x < numberOfLines ; x++ ) {
        let line = unsafeLines[x];
        let lineLength = line.length;
        for (let y = 0; y < lineLength; y++ ) {
            let removedElement = line.splice(y, 1)[0];
            //do difference line thing
        }
        
    }
    console.log("Part 1: " + safeLines);
    console.log("new safe lines " + newSafeLines);
    let total = safeLines + newSafeLines;
    console.log("Part 2: " + total);

} catch (err) {
    console.error(err);
}
// Solved
// Part 1: 3714264
// Part 2: 18805872