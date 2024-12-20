const fs = require('node:fs');
var Math = require('mathjs');
const {type} = require("node:os");


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
/*
2 4 RegA mod 8 and store to regB
2215730797 mod 8 5

1 3 regB XOR 3 store to B
RegB 5n XOR 3n to reg B  6n

7 5 regA / (2 to the regB) to regB
2215730797 divide 2 to the 6 34620793.703125 34620793 in C

0 3 regA / (2^3)
RegA 276966349 divide 2 to the 3 276966349.625 276966349

4 3
RegB 6n XOR RegC 34620793n to reg B 34620799n

1 5
RegB 34620799n XOR 5n to reg B  34620794n

5 5
output 2
3 0
*/
    // we are testing 2215730797
    // We want a number that mod 8 = 5. 
    let regA = 276966349.625
    let regB = 2215730797n
    let regC = 34620793n;
    regB = regB ^ 5n
    regB = regB ^ regC;
    regA = regA * Math.pow(2, 3);
    let something = regC * BigInt(Math.pow(2, 6));
    regB = regB ^ 3n;
    //lastly registerA % 8 = 5
    console.log(regA,regB,regC,something);
    
} catch (err) {
    console.error(err);
}
//Part 1:  2,0,1,3,4,0,2,1,7