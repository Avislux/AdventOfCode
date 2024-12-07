const fs = require('node:fs');
const Hand = require("./library/Hand")
try {
    let data = fs.readFileSync('inputs/day7.txt', 'utf8');
    let lines = data.split("\r\n");
    let hands = []
    lines.forEach(function(line,index){

        let handData = line.split(/\s+/);
        let hand = new Hand(handData[0],handData[1]);
        hand.determineHandType();
        hands.push(hand)
    });
    hands.sort(Hand.sortByHand);
    //calculate the solution
    let sum = 0;
    hands.forEach(function(hand,index){
        let handValue = (index +1) * hand.bid;
        sum += (index +1) * hand.bid;
    })
    
    console.log(sum);
} catch(err){
    console.log(err);
}
//part 1 251029473