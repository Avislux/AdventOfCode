class Hand {
    constructor(cardset,bid) {
        this.cardset = cardset;
        this.bid = parseInt(bid);
        this.type = null;
        this.cards = null;
    }
    
    static cardStrength = {'A': 13, 'K':12, 'Q':11, 'J':10, 'T':9, '9':8, '8':7, '7':6, '6':5, '5':4, '4':3, '3':2,  '2': 1}
    static FIVE_OF_A_KIND = 7;
    static FOUR_OF_A_KIND = 6;
    static FULL_HOUSE = 5;
    static THREE_OF_A_KIND = 4;
    static TWO_PAIR = 3;
    static PAIR = 2;
    static HIGH_CARD = 1;

    determineHandType() {
        let cards = this.cardset.split('');
        this.cards = cards;
        cards.sort(Hand.sortByValue);
        // console.log(cards)
        let cardsCompare = Array.from(cards);
        cardsCompare.shift();
        let numIdenticalCards = 1;
        let dupeCheckingCard = null;
        let duplicateArray = [];
        cards.forEach(function(card1, index){
            if (index === 0){
                dupeCheckingCard = card1;
                return;
            }
            if (dupeCheckingCard === card1){
                numIdenticalCards++;
            } else {
                //reset
                duplicateArray.push(numIdenticalCards);
                numIdenticalCards = 1;
                dupeCheckingCard = card1;
            }
        })
        duplicateArray.push(numIdenticalCards); //push last result
        duplicateArray.sort();
        // console.log(duplicateArray);
        if (duplicateArray.includes(5)){
            this.type = Hand.FIVE_OF_A_KIND;
        } else if (duplicateArray.includes(4)){
            this.type = Hand.FOUR_OF_A_KIND;
        } else if (JSON.stringify(duplicateArray) === JSON.stringify([2,3])){
            this.type = Hand.FULL_HOUSE;
        } else if (JSON.stringify(duplicateArray) === JSON.stringify([1,1,3])){
            this.type = Hand.THREE_OF_A_KIND;
        } else if (JSON.stringify(duplicateArray) === JSON.stringify([1,2,2])){
            this.type = Hand.TWO_PAIR;
        } else if (JSON.stringify(duplicateArray) === JSON.stringify([1,1,1,2])){
            this.type = Hand.PAIR;
        } else {
            this.type = Hand.HIGH_CARD;
        }
    }
    static sortByValue = function(a,b){
        if (Hand.cardStrength[a] > Hand.cardStrength[b]){
            return 1
        } else if (Hand.cardStrength[a] < Hand.cardStrength[b]){
            return -1
        }
        return 0;
    }
    static sortByHand = function(a,b){
        if (a.type > b.type){
            return 1
        } else if (a.type < b.type){
            return -1
        } else {
            return Hand.determineKicker(a,b);
        }
        return 0;
    }

    static determineKicker(a, b) {
        for(let index = 0; index < 5; index++) {
            let card =a.cardset[index];
            let bCard = b.cardset[index];
            if (Hand.cardStrength[card] > Hand.cardStrength[bCard]){
                return 1;
            } else if (Hand.cardStrength[card] < Hand.cardStrength[bCard]){
                return -1;
            } else {
                //moves on
            }
        }
        return 0;
    }
}   
module.exports = Hand;
