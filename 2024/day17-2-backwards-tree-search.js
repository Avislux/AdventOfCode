const fs = require('node:fs');
var Math = require('mathjs');

/*The number to find is too large to brute force.
* Printing the first numbers that print the end of the substring creates a pattern
* it gradually reveals a number in base 8. 
* Basically once we find a number that prints the end, multiply the number by 8 and increase the search
* if that chain doesn't reach the next number, go back a node */
var registerA = 1;
var registerB = 0;
var registerC = 0;
var input = fs.readFileSync('inputs/day17.txt', 'utf8')

function getComboOperand(operand){
    switch(operand){
        case(0):
        case(1):
        case(2):
        case(3):
            return operand;
            break;
        case(4):
            return registerA;
            break;
        case(5):
            return registerB;
            break;
        case(6):
            return registerC;
            break;
        case(7):
            //reserved
            break;
    }
    return null;
}
function arraysEqual(arr1, arr2) {
    // Check if the lengths are different
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Check each element for equality
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
let numbersToSkip = [];
try {
    let lengthToFind = 9;
    let program = input.split(",").map((v) =>{return parseInt(v);});
    let output = []
    let instruction = 0
   
   
    let finalOutput = ""
    let multiply = false;
    
    let regATest = 0;
    
    let depth = 1;
    let nodes = [];
    let arrayToMatch = [];
    let unshiftIndex = -1;
    arrayToMatch.unshift(program.at(unshiftIndex));
    let timeAtNode = 0;
    while (finalOutput !== input) {
        output = [];
        instruction = 0;
        if (multiply){
            regATest *= 8;
            multiply = false;
            timeAtNode = 0;
        } else {
            regATest += 1;
            timeAtNode++;
        }
        registerA = regATest;
        registerB = 0;
        registerC = 0;
        if (numbersToSkip.includes(regATest)){
            continue;
        }
        if (regATest % 1000000 === 0){
            console.log(regATest)
        }
        while (program.length > instruction) {
            finalOutput = ""
            let opcode = program[instruction];
            instruction++;
            let operand = program[instruction];
            instruction++;
            // console.log(opcode,operand)
            let result = null;
            let comboOperand = getComboOperand(operand);
            switch (opcode) {
                case(0):
                    //division
                    //The numerator is the value in the A register. The denominator is found by raising 2 to the power of the instruction's combo operand.
                    // The result of the division operation is truncated to an integer and then written to the A register.
                    result = registerA / Math.pow(2, comboOperand)
                    registerA = parseInt(result);
                    break;
                case(1):
                    //bitwise XOR of register B and the instruction's literal operand, then stores the result in register B.
                    registerB = BigInt(registerB) ^ BigInt(operand);
                    break;
                case(2):
                    //calculates the value of its combo operand modulo 8 (thereby keeping only its lowest 3 bits), then writes that value to the B register.
                    registerB = comboOperand % 8;
                    break;
                case(3):
                    //jmp
                    if (registerA !== 0) {
                        instruction = operand;
                    }
                    break;
                case(4):
                    // bitwise XOR of register B and register C, then stores the result in register B
                    registerB = BigInt(registerB) ^ BigInt(registerC);
                    break;
                case(5):
                    //combo operand modulo 8, then outputs that value
                    if (typeof comboOperand === "bigint"){
                        comboOperand = parseInt(comboOperand);
                    }
                    result = comboOperand % 8;
                  
                    output.push(result);
                    
                    break;
                case(6):
                    //Same as 1 but store to B
                    if (typeof comboOperand === "bigint"){
                        comboOperand = parseInt(comboOperand);
                    }
                    result = registerA / Math.pow(2, comboOperand)
                    registerB = parseInt(result);
                    break;
                case(7):
                    if (typeof comboOperand === "bigint"){
                        comboOperand = parseInt(comboOperand);
                    }
                    result = registerA / Math.pow(2, comboOperand)
                    registerC = parseInt(result);
                    break;
            }
            if (opcode === 5) {
                if (arraysEqual(output, arrayToMatch)){
                    unshiftIndex--;
                    arrayToMatch.unshift(program.at(unshiftIndex));
                    multiply = true;
                    nodes.push(regATest);
                    console.log(regATest,output.length, JSON.stringify(output));
                }
            }
        }
        if (timeAtNode > 100000) {
            let skip = nodes.pop();
            numbersToSkip.push(skip);
            regATest = nodes.at(-1);
            arrayToMatch.shift();
            timeAtNode = 0;
            unshiftIndex++;
            console.log("back to", regATest, JSON.stringify(nodes) );
            
        }
        finalOutput = output.join(",");
       
        if (regATest % 1000000 === 0){
            // console.log(finalOutput, "is still not", input)
        }//            501010433232896
        if (regATest > 1911180991000000000000000000000000000){
            break;
        }
        
    }
    console.log("part 2", regATest);
    
    console.log(finalOutput);
} catch (err) {
    console.error(err);
}
//Part 1:  2,0,1,3,4,0,2,1,7
//Part 2 236580836040301
//in base 8 : 6 562 550 454 257 155