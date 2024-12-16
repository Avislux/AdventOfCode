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
        if (parseInt(numbers.join("")) === theValue) {
            solution += theValue;
            console.log(theValue, numbers, "concant");
            
            continue
        }
        if (numbers.length === 2){
            continue;
        }
        let numOperatorSequences = Math.pow(3,numbers.length - 1);
        
        // console.log(theValue, numbers,numOperatorSequences);
        for (let x = 1; x < numOperatorSequences; x++){
            let testValue = numbers[0];
            let operators = x.toString(3).split('').map(function(v) { return parseInt(v); });
            if (operators.length < numbers.length - 1){
                let numberToPrepend = numbers.length - 1 - operators.length;
                for (let i = 0; i < numberToPrepend; i++) {
                    operators.unshift(0);
                    
                }
            }
            // console.log(operators);
            for (let j = 0; j < numbers.length - 1; j++) {
                let operatorPosition = j
                let operation = operators[operatorPosition]
                // console.log(operation);
                if (operation === 2){
                    // console.log([testValue,numbers[j + 1]]);
                    testValue = parseInt([testValue,numbers[j + 1]].join(''));
                    // console.log(testValue);
                    
                } else if (operation === 1){
                    testValue *= numbers[j + 1];
                } else {
                    testValue += numbers[j + 1];
                }
                
            }
         /*   if (i === lines.length-1){
                console.log(numbers, operators, testValue,theValue);
                
            }*/
            if (testValue === theValue){
                solution += theValue
                // console.log(theValue, numbers,numOperatorSequences);
                console.log(testValue, x.toString(3));
                break;
            }
           
        }
       
    }
    console.log("Part 2", solution);
  

} catch (err) {
    console.error(err);
}

// part 2  492383931650959