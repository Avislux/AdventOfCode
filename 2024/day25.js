const fs = require('node:fs');

try {
    const data = fs.readFileSync('inputs/day25.txt', 'utf8');

    let sections = data.split("\r\n\r\n")
    console.log(sections);
    let locks = [];
    let keys = [];
    for (let section of sections) {
        let lines = section.split("\r\n");
        console.log(lines);
        let lengths = [];
        for (let i = 0; i < lines[0].length; i++) {
            let column = lines.map((row)=>{return row.charAt(i)});
            let height = column.filter(value => value === '#').length
            lengths.push(height);
        }
        if (lines[0].charAt(0) === '#') {
            locks.push(lengths);
        } else {
            keys.push(lengths);
        }
    }
    let lockLength = 5
    let lockHeight = 7
    let goodCount = 0;
    for (let lock of locks) {
        for (let key of keys) {
            let comboGood = true;
            for (let x = 0; x < lockLength; x++) {
                let matterHeight = lock[x] + key[x];
                if (matterHeight > lockHeight) {
                    comboGood = false;
                    break;
                }
            }
            if (comboGood) {
                goodCount++;
            }
        }
    }
    console.log(goodCount);
} catch (err) {
    console.error(err);
}
// part 1 3525