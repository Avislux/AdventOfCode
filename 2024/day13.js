const fs = require('node:fs');

try {
    const data = fs.readFileSync('inputs/day13.txt', 'utf8');

    let sets = data.split("\r\n\r\n")
    let tokens = 0;
    for (let Index = 0; Index < sets.length; Index++) {
        let prizeSet = sets[Index];
        // console.log(Index,prizeSet);
        const reA = /A: X\+(\d+), Y\+(\d+)/g;
        const reB = /B: X\+(\d+), Y\+(\d+)/g;
        const rePrize = /Prize: X=(\d+), Y=(\d+)/g;
        
        const aMatch = [...prizeSet.matchAll(reA)];
        const bMatch = [...prizeSet.matchAll(reB)];
        const prizeMatch = [...prizeSet.matchAll(rePrize)];
        // console.log(array,array2,array3);

        let aX = aMatch[0][1];
        let aY = aMatch[0][2];
        let bX = bMatch[0][1];
        let bY = bMatch[0][2];
        //part 1
        // let prizeX = parseInt(prizeMatch[0][1]);
        // let prizeY = parseInt(prizeMatch[0][2]);
        //part 2
        let prizeX = parseInt(prizeMatch[0][1]) + 10000000000000;
        let prizeY = parseInt(prizeMatch[0][2]) + 10000000000000;
        
        // console.log(aX,aY,bX,bY,prizeX,prizeY);
        //Solve a set of equations:
        // aX*A + bX*B = prizeX
        // aY*A + bY*B = prizeY
        //TODO You coulda done linear algebra with matrixes!
        let numerator = prizeX*bY - prizeY*bX;
        let denominator = aX*bY - aY*bX;
        let aVal =numerator/ denominator
        let bVal = (prizeY - aY * aVal) / bY;
        // console.log(aVal, bVal, parseInt(aVal) == aVal, parseInt(bVal) == bVal);
        if (parseInt(aVal) === aVal && parseInt(bVal) === bVal) {
            tokens += 3*aVal + bVal;
        }
    }
    console.log(tokens);

} catch (err) {
    console.error(err);
}
//part 1 35997
//part 2 82510994362072