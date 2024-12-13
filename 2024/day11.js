const fs = require('node:fs');
function transform(number){
    if (number === 0){
       return [1];
    } else if (number.toString().length % 2 === 0){
        const middle = Math.ceil(number.toString().length / 2);
        const firstHalf = number.toString().slice(0, middle);
        const secondHalf = number.toString().slice(middle);

        return [parseInt(firstHalf),parseInt(secondHalf)]
    } else {
        return [number *= 2024];
    }
}
function project(number, iterations){
    if (number === 0){
        return 1
    }
    let count = 0;
    let subset = [number];
    let nextSubset = subset.map( function (){transform(number)} )
    return nextSubset.map(function(){project(number, iterations - 1)}).reduce((partialSum, a) => partialSum + a, 0);
}
try {
    const data = fs.readFileSync('inputs/day11_ex.txt', 'utf8');

    let stones = data.split(" ").map(function(number){ return parseInt(number)})

    let currentIteration = 0;
    let maxIterations = 6;
    // let answer = stones.map(function(number){project(number,maxIterations)}).reduce((partialSum, a) => partialSum + a, 0);
    // console.log(answer);
    while (currentIteration < maxIterations) {
        for (let x = 0; x < stones.length; x++) {
            let number =  stones[x];
            let newStones = transform(number);
            stones[x] = newStones[0];
            if (newStones[1]!== undefined) {
                stones.splice(x+ 1,0,newStones[1])
                x++;
            }
          
        }
        // console.log(stones)
        
        currentIteration++;
    }
    console.log(stones.length)
} catch (err) {
    console.error(err);
}
