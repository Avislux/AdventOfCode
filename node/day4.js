const fs = require('node:fs');
try {
    const data = fs.readFileSync('inputs/day4.txt', 'utf8');
    
    let lines = data.split("\r\n")
    let totalPoints = 0;
    let cardCopies = [];
    let totalLines = lines.length;

    lines.forEach(function(line,index){
        if (typeof cardCopies[index] === 'undefined'){
            cardCopies[index] = 0;
        }
        cardCopies[index]++; //Counts the original copy of the card
        let numbers = line.split(/:\s+/)[1];
        numbers = numbers.split(" | ");
        let winningNumbers = numbers[0].split(/\s+/);
        let drawnNumbers = numbers[1].split(/\s+/);
        let numberWinningNumbers = 0;
        winningNumbers.forEach(function(winningNumber){
            if (drawnNumbers.includes(winningNumber)){
                numberWinningNumbers++;
            }
        });
        let linePoints = 0;
        if (numberWinningNumbers > 0)
        {
            //part 1
            linePoints = Math.pow(2, (numberWinningNumbers -1));
            //part 2
            for (let x = 1; x <= numberWinningNumbers; x++){
                if (typeof cardCopies[index+x] === 'undefined'){
                    cardCopies[index+x] = 0;
                }
                cardCopies[index+x]+= 1 * cardCopies[index];
            }
            
        }
        totalPoints += linePoints;
        // console.log(matches,winningNumbers,drawnNumbers,numberWinningNumbers);
    }) 
    // console.log(cardCopies);
    console.log("Part 1: " + totalPoints);
    
    let trimmedArray = cardCopies.slice(0,lines.length )
    let arraySum = trimmedArray.reduce((partialSum, a) => partialSum + a, 0);
    console.log("Part 2: " + arraySum);
    
} catch (err) {
    console.error(err);
}
//Part 1: 25571
//Part 2: 8805731
