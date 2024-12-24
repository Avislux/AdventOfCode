const fs = require('node:fs');
var Math = require('mathjs');


var registerA = 1;
var registerB = 0;
var registerC = 0;
var input = input = fs.readFileSync('inputs/day17.txt', 'utf8')
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
   
   
    let finalOutput = ""
    let multiply = false;
    // 103060592    611112160 to find 3,4,3,1,5,5,5,3,0,
    // 824,484,744  6111121610
    // 6,595,878,272 
    //6597450816 to find 50343155530
    // 52767026192
    // 52779609104 to find 7503
    //0 = 6
    //3,0 = 49 ---mod 8 is 1
    //530 = 393 ---mod 8 is 1              
    //5530 = 3145 ---mod 8 is 1             6111
    //55530 = 25161 ---mod 8 is 1           61111
    //155530 = 201290 ---mod 8 is 2         611112
    //3,1,5,5,5,3,0         1610321         6111121
    // starting from 12,882,568            
    //4,3,1,5,5,5,3,0 12882574              61111216
    //3,4,3,1,5,5,5,3,0,  .103060593          611112161
    //3,4,3,1,5,5,5,3,0,  .103060598          611112166
    //3,4,3,1,5,5,5,3,0,  .103085169          611172161
    //0,3,4,3,1,5,5,5,3,0   824484784         6111121660
    //0,3,4,3,1,5,5,5,3,0   824681392         6111721610
    
    //5,0,3,4,3,1,5,5,5,3,0     6595878274      61111216602     6595878277
    //5,0,3,4,3,1,5,5,5,3,0     6595878277      61111216605
    //5,0,3,4,3,1,5,5,5,3,0     6597451138      61117216602
    //7,5,0,3,4,3,1,5,5,5,3,0  starting from 52767026192....seems to break down
    //3,7,5,0,3,4,3,1,5,5,5,3,0 
    
    
    //2,4,1,3,7,5,0,3,4,3,1,5,5,5,3,0 
    //we are at 9 digits confirmed
    let regATest = 52779609104;
    
    while (finalOutput !== "7,5,0,3,4,3,1,5,5,5,3,0") {
    // while (finalOutput !== input) {
        
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
                  
                    output.push(result);
                    /*if (output.length >= 1 && output[0] !== 7){
                        continue;
                    }
                    if (output.length >= 2 && output[1] !== 5){
                        continue;
                    }
                    if (output.length >= 3 && output[2] !== 0){
                        continue;
                    }
                    if (output.length >= 4 && output[3] !== 3){
                        continue;
                    }
                    if (output.length >= 5 && output[4] !== 4){
                        continue;
                    }
                    if (output.length >= 6 && output[5] !== 3){
                        continue;
                    }
                    if (output.length >= 7 && output[5] !== 1){
                        continue;
                    }
                    if (output.length >= 8 && output[5] !== 5){
                        continue;
                    }
                    if (output.length >= 9 && output[5] !== 5){
                        continue;
                    }
                    if (output.length >= 10 && output[5] !== 5){
                        continue;
                    }
                    if (output.length > 10){
                        console.log(regATest,output.length, output);
                        // multiply = true;
                    }
                    if (output.length >= 11 && output[5] !== 3){
                        continue;
                    }
                    if (output.length >= 12 && output[5] !== 0){
                        continue;
                    }*/
                    // if (output.length > 11){
                    //     console.log(regATest,output.length, output);
                    //     // multiply = true;
                    // }
                   
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
        //the checker
       
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