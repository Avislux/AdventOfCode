const fs = require('node:fs');

try {
    const data = fs.readFileSync('inputs/day9.txt', 'utf8');
    // const data = "2333133121414131402";
    let disk = [];
    let id = 0;
    for (let i = 0; i < data.length; i++) {
        let digit = data.charAt(i);
        if (i % 2 === 1){
            while (digit > 0){
                disk.push('.')
                digit--;
            }
        } else {
            while (digit > 0){
                disk.push(id)
                digit--;
            }
            id++;
        }
    }
    // console.log(disk.join(""));
    let checksum = 0;
    for (let i = 0 ; i < disk.length ; i++){
        let digit = disk[i];
        if (digit === "."){
            let popped = null;
            while (typeof popped !== "number"){
                popped = disk.pop()
            }
            disk[i] = popped;
        }
        checksum += disk[i] * i;
    }
    // console.log(disk.join(""));
    console.log(checksum);

} catch (err) {
    console.error(err);
}
//Part 1 6435922584968