const fs = require('node:fs');

try {
    const data = fs.readFileSync('inputs/day5_ex.txt', 'utf8');

    let lines = data.split("\r\n")
    let rules = {}; //For each key, the key has to come before any numbers in the array
    let invertedRules = {}; //For each key, the key has to come after any numbers in the array
    let updates = [];
    
    lines.forEach(function(line,index){
        if (line.charAt(2) === "|"){
            let parts = line.split("|");
            let page1 = parseInt(parts[0])
            let page2 = parseInt(parts[1])
            
            if (!rules.hasOwnProperty(page1)){
                rules[page1] = [];
            }
            rules[page1].push(page2);

            if (!invertedRules.hasOwnProperty(page2)){
                invertedRules[page2] = [];
            }
            invertedRules[page2].push(page1);
        } else if (line.length == 0){
        } else {
            let sequence = line.split(",").map(function(number){ return parseInt(number)});
            updates.push(sequence);
        }
    })
    let totalResult = 0;
    let badSequences = [];
    //For each sequence
    for ( let i = 0; i < updates.length; i++ ){
        let isVoid = false;
        let sequence = updates[i];
        let middleIndex = (sequence.length - 1) / 2;
        //for each number in sequence
        for (let j = 0; j < sequence.length; j++){
            //For each number, 
            // check each number before it. 
            // Pull the array from rules. 
            //If number is in that key's array, sequence is void.
            // Check numbers ahead.
            //If number is in that inverted rules key's array, sequence is void.
            for (let k = 0; k < sequence.length; k++){
                let numberChecking = sequence[k];
                if (k < j){
                   let rulesArray = rules[sequence[j]];
                  
                   if (rulesArray !== undefined && rulesArray.includes(numberChecking)){
                       isVoid = true;
                       break;
                   }
                } else if (k > j) {
                    let rulesArray = invertedRules[sequence[j]];
                    if (rulesArray !== undefined && rulesArray.includes(numberChecking)){
                        isVoid = true;
                        break;
                    }
                }
            }
            if (isVoid){
                break;
            }
        }
        if (!isVoid){
            // console.log(sequence,sequence[middleIndex])
            totalResult += sequence[middleIndex];
        } else {
            badSequences.push(sequence);
        }
        // console.log(sequence,middleIndex)
        
    }
    let part2Total = 0;
    for ( let i = 0; i < badSequences.length; i++ ){
        let sequence = badSequences[i];
        let sequenceOriginal = [...badSequences[i]];
        let middleIndex = (sequence.length - 1) / 2;
        let newSequence = [];
        let isSorted = false;
        let iterations =0;
        while ( !isSorted ){
        // for (let x = 0; x < 6; x++) {
            console.log(sequence)
            iterations++;
            //for each number in sequence
            // for (let j = 0; j < sequence.length; j++){
            while(sequence.length>0) {
                let j = 0;
                // console.log(sequence, "while")
                let rulesArray = rules[sequence[j]];
                if (rulesArray === undefined){
                    newSequence.push(sequence[j]);
                    sequence.splice(j, 1);
                    continue;
                }
                let elementPushed = false;
                for (let k = j + 1; k < sequence.length; k++){
                    //if Index K is found in the inverted rules, pop it and add it to the new array.
                    // console.log(sequence, sequence[j],sequence[k],j,k);

                    if (rulesArray.includes(sequence[k])){
                        //there's an issue with this that doesn't sort properly. Maybe gotta add logic to put it behind something else.
                        if (newSequence.length > 1){
                            for (let index = 0; index < newSequence.length; index++){
                                let deezRules = rules[newSequence[index]];
                                if (deezRules.includes(sequence[k])){
                                    // newSequence.splice(index + 1, 0,sequence[k]);
                                    newSequence.push(sequence[k]);
                                    
                                    console.log(sequence[k], "put in front of ", newSequence[index] );
                                    break;
                                }
                            }
                            
                        } else if (newSequence.length == 1){
                            newSequence.splice(0,0,sequence[k]);
                            console.log(sequence[k], "found in rules, add before",newSequence[1] );
                            
                        } else {
                            newSequence.push(sequence[k]);
                            console.log(sequence[k], "found in rules, add to start", );
                        }
                        
                        sequence.splice(k, 1);
                        elementPushed = true;
                    }
                }
                
                newSequence.push(sequence[j]);
                // console.log(sequence[j], "added to new sequence" );
                
                sequence.splice(j, 1);
                if (!elementPushed){
                    // console.log("done with this")
                    isSorted = true;
                    
                }
            }
            sequence = newSequence;
            console.log(sequence);
            
        } //while
        part2Total+=sequence[middleIndex];
        console.log(sequenceOriginal,"becomes",newSequence)
    }
    console.log("part 2",part2Total);
    // console.log(badSequences);
} catch (err) {
    console.error(err);
}
// part 1 7307
// part 2 4264 too low
// 5033 too high
// 4544 too low