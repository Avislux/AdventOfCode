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
/*
703 [ 2, 4 ]
703 [ 2, 4, 1 ]
6816 [ 2, 4, 1, 3 ]
6816 [ 2, 4, 1, 3, 7 ]
531104 [ 2, 4, 1, 3, 7, 5 ]
2215730797 is the earliest 9 I can see.
39805631 7
* [
  2, 4, 1, 3,
  7, 5, 0
] 63445664

* 2215730797 7
2215730797 8
2215730797 9
2215730879 7
2215730879 8
2215730879 9
2216000000
2217000000
2217827949 7
2217827949 8
2217827949 9
2217828031 7
2217828031 8
2217828031 9
2218000000
2219000000
2219925101 7
2219925101 8
2219925101 9
2219925183 7
2219925183 8
2219925183 9
2220000000
2220056173 7
2220056173 8
2220056173 9
2220056255 7
2220056255 8
2220056255 9
2220843711 7
2220843711 8
2220843711 9
2221000000
2222000000
2222022253 7
2222022253 8
2222022253 9
2222022335 7
2222022335 8
2222022335 9
2223000000
2224000000
2224119405 7
2224119405 8
2224119405 9
2224119487 7
2224119487 8
2224119487 9
2225000000
2226000000
2226216557 7
2226216557 8
2226216557 9
2226216639 7
2226216639 8
2226216639 9
2227000000
2228000000
2228313709 7
2228313709 8
2228313709 9
2228313791 7
2228313791 8
2228313791 9
2228444781 7
2228444781 8
2228444781 9
2228444863 7
2228444863 8
2228444863 9
2229000000
2230000000
2230410861 7
2230410861 8
2230410861 9
2230410943 7
2230410943 8
2230410943 9
2231000000
2232000000
2232508013 7
2232508013 8
2232508013 9
2232508095 7
2232508095 8
2232508095 9
2234605165 7
2234605247 7
2236702317 7
2236702399 7
2236833389 7
2236833471 7
2238799469 7
2238799551 7
2240896621 7
2240896703 7
2242993773 7
2242993773 8
2242993773 9
2242993855 7
2242993855 8
2242993855 9
2245090925 7
2245091007 7
2245156461 7
2245156543 7
2245221997 7
2245222079 7
2247188077 7
2247188077 8
2247188077 9
2247188159 7
2247188159 8
2247188159 9
2247253613 7
2247253613 8
2247253613 9
2247253695 7
2247253695 8
2247253695 9
2382895776 8
*/
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