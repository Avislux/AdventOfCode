const fs = require('node:fs');
var Math = require('mathjs');
const {type} = require("node:os");

/*Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0
*/
/*var registerA = 729;
var registerB = 0;
var registerC = 0;
var input = "0,1,5,4,3,0"*/
// 117440
var registerA = 1;
var registerB = 0;
var registerC = 0;
var input  = fs.readFileSync('inputs/day17.txt', 'utf8')
// input = "0,3,5,4,3,0";

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
try {
    let lengthToFind = 9;
    let program = input.split(",").map((v) =>{return parseInt(v);});
    let output = []
    let instruction = 0
    // highest num tested   403000000  from 2^31 to 2400000000 jump 1911180991 15289600000-122335600000
    //2215730879 * 8 * 8 gets into a ballpark of 9s
    //tried  2215730879 * 8 * 8 to 141818000000
    let regATest = 1134586165920;
    //last number 1134521000000
    //1134589000000
    let finalOutput = ""
    let multiply = false;
    while (finalOutput !== input) {
        output = [];
        instruction = 0;
        if (multiply){
            regATest *= Math.pow(2, lengthToFind);
            multiply = false;
        } else {
            regATest += 1;
        }
        
        registerA = regATest;
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
                    if (result !== program[output.length]){
                        if (output.length >= 9){
                            console.log("combo",comboOperand, "registerB", registerB)
                            
                            console.log(regATest,registerA,output.join(''),result)
                        }
                        continue;
                    }
                    output.push(result)
                    if (output.length > 8){
                        console.log(regATest,output.length);
                        // multiply = true;
                    }
                    if (output.length > lengthToFind){
                        console.log(regATest,output);
                        multiply = true;
                        lengthToFind++;
                    }
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