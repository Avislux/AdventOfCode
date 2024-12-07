const fs = require('node:fs');


try {
    const data = fs.readFileSync('inputs/day1.txt', 'utf8');

    let lines = data.split("\r\n")
    let totalDistance = 0;
    let totalLines = lines.length;
    let array1 = [];
    let array2 = [];
    let array3 = [];
    let similarityScore = 0;
    lines.forEach(function(line,index){
        let parts = line.split("   ")
        array1.push(parts[0]);
        array2.push(parts[1]);
    })
    array1.sort((a,b) => a - b); //sorts smallest to biggest
    array2.sort((a,b) => a - b);
    array1.forEach(function(number,index){
       let distance = Math.abs( array1[index] - array2[index]);
        array3.push( distance );
        totalDistance+=distance;
        let valueToLookFor = array1[index]
        let occurrences = array2.filter((v) => (v === valueToLookFor)).length
        let similarity = valueToLookFor * occurrences;
        similarityScore +=similarity;
    })
    console.log(array1,array2,array3);
    console.log("Part 1: " + totalDistance);
    console.log("Part 2: " + similarityScore);

} catch (err) {
    console.error(err);
}
// Solved
// Part 1: 3714264
// Part 2: 18805872