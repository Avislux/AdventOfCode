const fs = require('node:fs');

try {
    const data = fs.readFileSync('inputs/day5.txt', 'utf8');

    let lines = data.split("\r\n")
    let rules = {}; //For each key, the key has to come before any numbers in the array
    let invertedRules = {}; //For each key, the key has to come after any numbers in the array
    let updates = [];

    lines.forEach(function (line, index) {
        if (line.charAt(2) === "|") {
            let parts = line.split("|");
            let page1 = parseInt(parts[0])
            let page2 = parseInt(parts[1])

            if (!rules.hasOwnProperty(page1)) {
                rules[page1] = [];
            }
            rules[page1].push(page2);

            if (!invertedRules.hasOwnProperty(page2)) {
                invertedRules[page2] = [];
            }
            invertedRules[page2].push(page1);
        } else if (line.length == 0) {
        } else {
            let sequence = line.split(",").map(function (number) {
                return parseInt(number)
            });
            updates.push(sequence);
        }
    })
    let totalResult = 0;
    let badSequences = [];
    //For each sequence
    for (let i = 0; i < updates.length; i++) {
        let isVoid = false;
        let sequence = updates[i];
        let middleIndex = (sequence.length - 1) / 2;
        //for each number in sequence
        for (let j = 0; j < sequence.length; j++) {
            //For each number, 
            // check each number before it. 
            // Pull the array from rules. 
            //If number is in that key's array, sequence is void.
            // Check numbers ahead.
            //If number is in that inverted rules key's array, sequence is void.
            for (let k = 0; k < sequence.length; k++) {
                let numberChecking = sequence[k];
                if (k < j) {
                    let rulesArray = rules[sequence[j]];

                    if (rulesArray !== undefined && rulesArray.includes(numberChecking)) {
                        isVoid = true;
                        break;
                    }
                } else if (k > j) {
                    let rulesArray = invertedRules[sequence[j]];
                    if (rulesArray !== undefined && rulesArray.includes(numberChecking)) {
                        isVoid = true;
                        break;
                    }
                }
            }
            if (isVoid) {
                break;
            }
        }
        if (!isVoid) {
            // console.log(sequence,sequence[middleIndex])
            totalResult += sequence[middleIndex];
        } else {
            badSequences.push(sequence);
        }
        // console.log(sequence,middleIndex)

    }
    let part2Total = 0;
    for (let i = 0; i < badSequences.length; i++) {
        let sequence = badSequences[i];
        let sequenceOriginal = [...badSequences[i]];
        let middleIndex = (sequence.length - 1) / 2;
        let newSequence = [];
        //for each number in sequence
        while (sequence.length > 0) {
            let j = 0;
            let numberToSort = sequence[j];
            let rulesArray = rules[numberToSort];

            if (newSequence.length === 0 || rulesArray === undefined) {
                newSequence.push(numberToSort);
                sequence.splice(j, 1);
            } else {
                let isInserted = false;
                for (let k = 0; k < newSequence.length; k++) {
                    let numberToCompare = newSequence[k];
                    if (rulesArray.includes(numberToCompare)) {
                        newSequence.splice(k, 0, numberToSort);
                        isInserted = true;
                        break;
                    }
                }
                if (!isInserted) {
                    newSequence.push(numberToSort);
                }
                sequence.splice(j, 1);
            }
        }

        part2Total += newSequence[middleIndex];
        console.log(sequenceOriginal, "becomes", newSequence)
    }
    console.log("part 2", part2Total);
    // console.log(badSequences);
} catch (err) {
    console.error(err);
}
// part 1 7307
// part 2 4264 too low
// 5033 too high
// 4544 too low
// part 2 4713 correct