const fs = require('node:fs');
function prune (number){
    return number % 16777216;
}
function mix(number, newNumber){
    return parseInt(BigInt(number) ^ BigInt(newNumber));
}
try {
    const data = fs.readFileSync('inputs/day22.txt', 'utf8');

    let numbers = data.split("\r\n").map(value => parseInt(value));
    // let numbers = [1,10,100,2024]
    // numbers = [123];
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        let secretNumber = numbers[i];
        
        for (let x = 0; x < 2000; x++) {
            let product = secretNumber * 64;
            secretNumber = mix (secretNumber, product);
            secretNumber = prune(secretNumber);
            // console.log(secretNumber);
            let quotient = parseInt(secretNumber / 32)
            secretNumber = mix (secretNumber, quotient);
            secretNumber = prune(secretNumber);
            // console.log(secretNumber);
            
            product = secretNumber * 2048;
            secretNumber = mix (secretNumber, product);
            secretNumber = prune(secretNumber);
            // console.log(secretNumber);
        }
        // console.log(secretNumber);
        sum+=secretNumber
    }
    console.log(sum)
} catch (err) {
    console.error(err);
}
//14476723788