const fs = require('node:fs');

try {
    const data = fs.readFileSync('inputs/day3.txt', 'utf8');
    // const re = new RegExp('mul\(\d+,\d+\)', "g");
    const re = /mul\((\d+),(\d+)\)/g;
    const re2 = /(do\(\))|(don't\(\))|mul\(\d+,\d+\)/g
    const array = [...data.matchAll(re)];
    const array2 = [...data.matchAll(re2)];
    
    // const array = data.matchAll(re);
    let total = 0;
    for ( let i = 0 ; i < array.length ; i++ ) {
        let item = array[i];
        let product = item[1] * item[2];
        total += product;
    }
    let results = [];
    let shouldCalc = true;
    let total2 = 0;
    for ( let i = 0 ; i < array2.length ; i++ ) {
        let operation = array2[i][0];
        results.push(array2[i][0]);
        if (operation == "do()"){
            shouldCalc = true;
        } else if (operation == "don't()") {
            shouldCalc = false;
        } else {
            if (shouldCalc){
               let numbers =  [...operation.matchAll(re)];
               console.log(numbers[0][1],numbers[0][2]);
                let product = numbers[0][1] * numbers[0][2];
                total2 += product;
            }
        }
        // let item = array[i];
        // let product = item[1] * item[2];
        // total += product;
    }
    // console.log(array[0]);
    console.log("Part 1: " + total);
    // console.log(results);
    // console.log("new safe lines " + newSafeLines);
    console.log("Part 2: " + total2);

} catch (err) {
    console.error(err);
}
