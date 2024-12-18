const fs = require('node:fs');
var Math = require('mathjs');

/*Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0
*/
/*var registerA = 729;
var registerB = 0;
var registerC = 0;
var input = "0,1,5,4,3,0"*/

var registerA = 22571680;
registerA = 2215730797;
var registerB = 0;
var registerC = 0;
var input = "2,4,1,3,7,5,0,3,4,3,1,5,5,5,3,0"
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
    let program = input.split(",").map((v) =>{return parseInt(v);});
    let output = []
    let instruction = 0
    let regBOriginal = null;
    while (program.length > instruction) {
        let opcode = program[instruction];
        instruction++;
        let operand =  program[instruction];
        instruction++;
        console.log(opcode,operand)
        let result = null;
        let comboOperand = getComboOperand(operand);
        // console.log("combo: ",comboOperand)
        switch (opcode){
            case(0):
                //division
                //The numerator is the value in the A register. The denominator is found by raising 2 to the power of the instruction's combo operand.
                // The result of the division operation is truncated to an integer and then written to the A register.
                result = registerA / Math.pow(2, comboOperand)
                registerA = parseInt(result);
                console.log("RegA", registerA,"divide 2 to the", comboOperand, result, parseInt(result)  )
                break;
            case(1):
                //bitwise XOR of register B and the instruction's literal operand, then stores the result in register B.
                regBOriginal = registerB;
                registerB = BigInt(registerB) ^ BigInt(operand);
                // console.log(regBOriginal, "XOR", operand, "to reg B", registerB)
                console.log("RegB",BigInt(regBOriginal), "XOR", BigInt(operand), "to reg B ", registerB)
                
                break;
            case(2):
                //calculates the value of its combo operand modulo 8 (thereby keeping only its lowest 3 bits), then writes that value to the B register.
                registerB = comboOperand % 8;
                console.log(comboOperand,"mod 8", registerB);
                break;
            case(3):
                //jmp
                if (registerA !== 0){
                    console.log("jump to",operand)
                    instruction = operand;
                } else {
                    console.log("pass");
                }
                
                break;
            case(4):
                // bitwise XOR of register B and register C, then stores the result in register B
                regBOriginal = registerB;
                registerB = BigInt(registerB) ^ BigInt(registerC);
                // console.log(regBOriginal, "XOR", registerC, "to reg B", registerB)
                console.log("RegB",BigInt(regBOriginal), "XOR RegC", BigInt(registerC), "to reg B", registerB)
                
                break;
            case(5):
                //combo operand modulo 8, then outputs that value
                if (typeof comboOperand === "bigint"){
                    comboOperand = parseInt(comboOperand);
                }
                result = comboOperand % 8;
                if (result !== program[output.length]){
                    continue;
                }
                output.push(result)
                console.log("output", output.join(','))
                
                if (output.length > 8){
                    // multiply = true;
                }
                break;
            case(6):
                //Same as 1 but store to B
                if (typeof comboOperand === "bigint"){
                    comboOperand = parseInt(comboOperand);
                }
                result = registerA / Math.pow(2, comboOperand)
                registerB = parseInt(result);
                console.log(registerA,"divide 2 to the", comboOperand, result, parseInt(result), "in B"  )

                break;
            case(7):
                if (typeof comboOperand === "bigint"){
                    comboOperand = parseInt(comboOperand);
                }
                result = registerA / Math.pow(2, comboOperand)
                registerC = parseInt(result);
                console.log(registerA,"divide 2 to the", comboOperand, result, parseInt(result), "in C"  )
                break;
        }
    }
    let finalOutput = output.join(",");
    console.log(finalOutput)
} catch (err) {
    console.error(err);
}
//Part 1:  2,0,1,3,4,0,2,1,7