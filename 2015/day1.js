const fs = require('node:fs');

try {
    const data = fs.readFileSync('inputs/day1.txt', 'utf8');

    const re = /\(/g;
    const re2 = /\)/g;
    
    const array = [...data.matchAll(re)];
    const array2 = [...data.matchAll(re2)];
    let floor = array.length - array2.length;
    console.log(floor); //138
    let currentFloor = 0;
    for (let i = 0 ; i < data.length ; i++ ) {
        if (data.charAt(i) == "(") {
            currentFloor++;
        } else if (data.charAt(i) == ")") {
            currentFloor--;
        }
        if (currentFloor == -1) {
            console.log(i + 1); //1771
            break;
        }
    }
} catch (err) {
    console.error(err);
}
