const fs = require('node:fs');
let directionalKeypadObject = {
    'A': [2,0],
    '^': [1,0],

    '<': [0,1],
    'v': [1,1],
    '>': [2,1],
}

let horInputObject = {
    '-1': '<',
    '-2': '<<',
    '1': '>',
    '2': '>>',
    '0': ''
}
let vertInputObject = {
    '-1': '^',
    '-2': '^^',
    '-3': '^^^',
    '1': 'v',
    '2': 'vv',
    '3': 'vvv',
    '0': ''
}
function computeDirectionalPad(inputString,v =1){
    let directionalKeypadPosition = directionalKeypadObject['A'];
    let inceptionDirectionalInput = '';

    for (let j = 0; j < inputString.length; j++) {
        let nextDigit = inputString[j];
        let newPosition = directionalKeypadObject[nextDigit];
        let changeX = newPosition[0] - directionalKeypadPosition[0];
        let changeY = newPosition[1] - directionalKeypadPosition[1];

        let horInput =  horInputObject[changeX.toString()];
        let vertInput =  vertInputObject[changeY.toString()];
        // console.log(nextDigit, directionalKeypadPosition, newPosition, horInput,vertInput);
        let directions = ''.concat(horInput,vertInput);
        if (directions === "<<v"){
            directions = "v<<" //124560
            if (v === 2){
                directions = "<v<" //128248
            }
        } else if (directions === "<v" && directionalKeypadPosition[0] === 1 && directionalKeypadPosition[1] === 0 ){
            directions = "v<"
        }
        inceptionDirectionalInput = inceptionDirectionalInput.concat(directions, 'A');
        directionalKeypadPosition = newPosition;
    }
    return inceptionDirectionalInput;
}
try {
    const data = fs.readFileSync('inputs/day21.txt', 'utf8');

    let lines = data.split("\r\n")
    let numericalKeypad = 
        [
            [7,8,9],
            [4,5,6],
            [1,2,3],
            ['',0,'A']
        ]
    let numericalKeypadObject = {
        'A': [2,3],
        0: [1,3],
        1: [0,2],
        2: [1,2],
        3: [2,2],
        
        4: [0,1],
        5: [1,1],
        6: [2,1],

        7: [0,0],
        8: [1,0],
        9: [2,0],
    }
    
   
    let solution = 0;
    for (let i = 0; i < lines.length; i++) {
        let code = lines[i];
        let digits = code.split('');
        let numberKeypadPosition = numericalKeypadObject['A'];
        let directionalInput = '';
        for (let j = 0; j < digits.length; j++) {
            let nextDigit = digits[j];
            let newPosition = numericalKeypadObject[nextDigit];
            let changeX = newPosition[0] - numberKeypadPosition[0];
            let changeY = newPosition[1] - numberKeypadPosition[1];
            
            let horInput =  horInputObject[changeX.toString()];
            let vertInput =  vertInputObject[changeY.toString()];
            let directions = ''.concat(horInput,vertInput);
             if (directions === "<<^" && numberKeypadPosition[0] === 2 && numberKeypadPosition[1] === 3 ){
                directions = "^<<"
            } else  if (directions === "<^^" && numberKeypadPosition[0] === 1 && numberKeypadPosition[1] === 3 ){ 
                 directions = "^^<"
             }
            directionalInput = directionalInput.concat(directions, 'A');
            numberKeypadPosition = newPosition;
            
        }
        let inceptionDirectionalInput = computeDirectionalPad(directionalInput);
        let inception2DirectionalInput = computeDirectionalPad(inceptionDirectionalInput,2); //troubleshoot 4
       

     
        console.log(inception2DirectionalInput);
        console.log(inceptionDirectionalInput);
        console.log(directionalInput);
        console.log(code);

        digits.pop();
        let numericalPart = parseInt(digits.join(''))
        console.log(inception2DirectionalInput.length ,numericalPart )
        solution += inception2DirectionalInput.length * numericalPart;
    }
    //TODO: the blank block gives me a wrong solution
    console.log(solution);
} catch (err) {
    console.error(err);
}
//Part 1 233106 too high