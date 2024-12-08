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
//So for one of the examples 1 3 2 4 5, you would produce the difference array -2 1 -2 -1
// The second value is obviously bad because all the others are negatives/ascending
// So to skip it, you just do the bad value + one of the adjacent values
// Generically, it's the bad value + the value to its right, but one of the edge cases where the first value gets removed instead involves adding to the left
var count = 0;
function isLineSafe2(line){
    let length = line.length;
    let diffArray = [];
    let initialLineIsSafe = true;
    for (let i = 0; i < length - 1; i++) {
        let diff = line[i] - line[i + 1];
        trend = diff >= 0; //bool positive = true;
        if (i == 0) {
            initialTrend = trend; //bool positive = true;
        }
        diffArray.push(diff);
        if (diff == 0) {
            initialLineIsSafe = false;
        }
        if (Math.abs(diff) > 3) {
            initialLineIsSafe = false;

        }
        if (initialTrend != trend) {
            initialLineIsSafe = false;

        }
    }
    if (initialLineIsSafe){
        return true;
    }
    let isSafe = false;
    console.log(line + " double checking")
    for (let i = 0; i < length; i++) {
        let testArray = [];
        for (let x = 0; x < length; x++) {
            if (x !== i){
                testArray.push(line[x]);
            }
        }
        // console.log(testArray);
        if ( isLineSafe(testArray)){
            return true;
        }
    }
    return false;
}
/*  let diffArrayLength = diffArray.length;
    let errorCount = 0;
    for (let i = 0; i < diffArrayLength - 1; i++) {
        
        let value = diffArray[i];
        if (value > 3 || value === 0){
            errorCount++
            if (errorCount > 1){
                return false
            }
        }
        if (value > 3){
            let adjacentDiff = diffArray[i] + diffArray[i+1];
            if (Math.abs(adjacentDiff )> 3) {
                errorCount++
                console.log("error on " +  diffArray[i] + " " + diffArray[i+1])
                if (errorCount >1){
                    return false;
                }
               
            }
        }

} */
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
        // isSafe = isLineSafe(line)

        isSafe = isLineSafe2(line)
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
// Part 1: 334
// Part 2: 793 too high.
// Part 2: 400 correct