const fs = require('node:fs');
var Math = require('mathjs');
try {
    const data = fs.readFileSync('inputs/day7.txt', 'utf8');

    let lines = data.split("\r\n");
    let solution = 0;
    for (let i = 0; i < lines.length; i++) {
        let lineSplit = lines[i].split(": ")
        let theValue = parseInt(lineSplit[0]);
        let numbers = lineSplit[1].split(" ").map(function(v) { return parseInt(v)});
        let sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
        // console.log(theValue, numbers);
        if (sum === theValue) {
            solution += theValue;
            console.log(theValue, numbers, "sum");
            continue;
        }
      
        let product = numbers.reduce((accumulator, current) => accumulator * current, 1);
        
        if (product === theValue) {
            solution += theValue;
            console.log(theValue, numbers, "product");
            continue;
        }
       
        if (numbers.length === 2){
            continue;
        }
        let numOperatorSequences = Math.pow(2,numbers.length - 1);
        
        for (let x = 1; x <= numOperatorSequences; x++){
            let testValue = numbers[0];
            for (let j = 0; j < numbers.length - 1; j++) {
                let operatorPosition = j
                let mask = 1 << operatorPosition;
                let operation = (x & mask) !== 0 ? 1 : 0;
                // console.log(operation);
                if (operation === 1){
                    testValue *= numbers[j + 1];
                } else {
                    testValue += numbers[j + 1];
                }
                
            }
            if (testValue === theValue){
                solution += theValue
                console.log(theValue, numbers,numOperatorSequences);
                console.log(testValue, x.toString(3));
                break;
            }
           
        }
       
    }
    console.log("Part 1", solution);
  

} catch (err) {
    console.error(err);
}
//part 1 5751665305499 too low
//  5837374519342 correct