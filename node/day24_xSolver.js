const fs = require('node:fs');
var Math = require('mathjs');

var Hailstone = require('./library/Hailstone.js');

mapParseInt = function(x){
    return parseInt(x);
}
let dupeDXs = [
    5,  162, -153,   38, 126,   38,   88,  -73, 138, 111,
    -22,   67,  -61,  -61, -26,   12,  -26,   18, -93, 119,
    41, -114,  131,   14, -40,   10, -106,    6,  13, -93,
    28, -154,   -9,  -43,  -8,   17,  -82,   12, 178,  41,
    5,  -10,   41,  138,  73,   20,   17,   53, 103,  18,
    5,   15,  -55,   23,  21,   28,   99,   44,   5,  36,
    -148,   15,  -39, -192, 106, -111,   65, -103, -26, -93,
    -95,  121,  -39,   10, -87,  101
];
let dupeDYs =  [
    168, -159, -102,   27, -31,  -73, -11,  27, -29,
    -92,  -30,  -23,  -11, -22, -170, -73, 198,  96,
    29,  -29,  -58, -138, -48, -184, -32,  29, 160,
    162,  -58, -551,  154, 128,   25, 128,  -5, -63,
    -114, -163,   67,   67, -71,  -63, -32,  36, -42,
    114,  114,  -17, -100, 111,   44, 113,  -5, 239,
    49, -256,   27,   27,  47,  -73, -55
];

let dupeDZs =  [
    125,  74, 125,  -29,  -75,  -74,  -50,  72,   52,
    49, -21,  23,   -8,  -32,  -48,   76, -20, -194,
    13, -31,  13,   76, -298,  361, -116, 119,   15,
    34, -34, 111,   34,  -42,  112,   38, 140,  -34,
    30,  11, 257,  -11,   40,  -20,  -86, -44,   87,
    177, -64, -40, -199,   35, -130,  112, -80,  -67,
    -181, -41, -23
];

try {
    let data = fs.readFileSync('inputs/day24.txt', 'utf8');
  
    let lines = data.split("\n");
    let listHailstones = [];
    lines.forEach(function(line,index){
        let hailstone = Hailstone.parseLine(line,index);
        listHailstones.push(hailstone);
    });
    
    let allVXCandidates = findVXCandidates(dupeDXs, listHailstones, 'vx','x');
    let allVYCandidates = findVXCandidates(dupeDYs, listHailstones, 'vy','y');
    let allVZCandidates = findVXCandidates(dupeDZs, listHailstones, 'vz','z');
    
    
    let vxCandidateArrays = Object.values(allVXCandidates);
    let vxCandidatesArrayPrime = vxCandidateArrays.shift();
    let currentFilteredArray = Array.from(vxCandidatesArrayPrime);
    
    //This checks the first array against each other array one at a time, doesn't filter down.
    /*vxCandidateArrays.forEach(function(dxArray,index){
        let filteredArray = vxCandidatesArrayPrime.filter(value => dxArray.includes(value));
        console.log(filteredArray);
    })*/

    //Find the common element in every array
    vxCandidateArrays.forEach(function(dxArray,index){
        let filteredArray = currentFilteredArray.filter(value => dxArray.includes(value));
        currentFilteredArray = filteredArray;
        
        console.log(filteredArray);
    })
    
    let vyCandidateArrays = Object.values(allVYCandidates);
    console.log("allVYCandidates",allVYCandidates);
    let vyCandidatesArrayPrime = vyCandidateArrays.shift();
    currentFilteredArray = Array.from(vyCandidatesArrayPrime);
    vyCandidateArrays.forEach(function(dyArray,index){
        let filteredArray = currentFilteredArray.filter(value => dyArray.includes(value));
        currentFilteredArray = filteredArray;
        console.log("vy velocity filter",filteredArray);
    })

    let vzCandidateArrays = Object.values(allVZCandidates);
    let vzCandidatesArrayPrime = vzCandidateArrays.shift();
    currentFilteredArray = Array.from(vzCandidatesArrayPrime);
    
    vzCandidateArrays.forEach(function(dzArray,index){
        let filteredArray = currentFilteredArray.filter(value => dzArray.includes(value));
        currentFilteredArray = filteredArray;
        console.log("vz velocity", filteredArray);
    })
} catch (err) {
    console.error(err);
}

function findVXCandidates(dupeVelocities, listHailstones, velocityProperty, positionProperty){
    let allVXCandidates = {};
    for(let dxArrayIndex = 0;dxArrayIndex < dupeVelocities.length; dxArrayIndex++ ){
        let hailDX = dupeVelocities[dxArrayIndex];
        let sameVXStones = [];
        listHailstones.forEach(function(stone,index){
            if (stone[velocityProperty] ==  hailDX){
                sameVXStones.push(stone);
            }
        })
        let hailstonePrime = sameVXStones.shift();
        let dxCandidatesArray = [];
        sameVXStones.forEach(function(stone,index){
            let xDifference = hailstonePrime[positionProperty] - stone[positionProperty];
            console.log (positionProperty, " Difference ", xDifference)
            let dxCandidates = [];
            //The magic math: Each hailstone at the same magnitude of velocity on an axis will intersect the line thrown by the rock as a multiple of its velocity + a constant because they are always equidistant to each other on that axis
            //For the two x positions for 2 rocks given vx of 5: 242632083944780 and 277670947497460.
            // the diff of this is -35,038,863,552,680
            // the velocity of the rock thrown minus the hailstone's velocity must be a multiple of this number
            
            for (let rockDX = -1000; rockDX <= 1000; rockDX++){
                let modulus = xDifference % (rockDX - hailDX);
                if (modulus == 0){
                    dxCandidates.push(rockDX);
                }
            }
            dxCandidatesArray.push(dxCandidates);
            console.log ("Possible dx ", dxCandidates)
        })
        let dxCandidatesPrime = dxCandidatesArray.shift();
        console.log("filtering");
        dxCandidatesArray.forEach(function(dxArray,index){
            let filteredArray = dxCandidatesPrime.filter(value => dxArray.includes(value));
            dxCandidatesPrime = filteredArray; //not sure if this works, but should get fewer and fewer matches with each loop.
            console.log(dxCandidatesPrime);
        })
        let velocityFilterArrayDXCandidates = dxCandidatesPrime;
        allVXCandidates[hailDX] = velocityFilterArrayDXCandidates;
    }
    return allVXCandidates;
}

//dx = 5
/* var data = "242632083944780, 325377174991042, 369509461030046 @ 5, -64, -31\n" +
    "277670947497460, 176140935580014, 370791351808746 @ 5, 164, -182\n" +
    "247902039565320, 286744641696110, 356448085275486 @ 5, -19, -30 \n" +
    "221337267596260, 322267878439734, 349373211752250 @ 5, -46, 40\n" +
    "251358345165730, 324665210972710, 392771385947283 @ 5, -71, -89";
//dx = 41
var data = "235192096408592, 179771957454298, 322420492023248 @ 41, 131, -21\n" +
    "334046048927216, 257480890983496, 145219548293276 @ 41, -30, 9\n" +
    "249153700279648, 171229437056956, 433225569105310 @ 41, 160, -246\n" +
    "225464507562464, 9726858818530, 201076490195036 @ 41, 351, 165";*/
/*
242632083944780, 325377174991042, 369509461030046 @ 5, -64, -31
277670947497460, 176140935580014, 370791351808746 @ 5, 164, -182
247902039565320, 286744641696110, 356448085275486 @ 5, -19, -30 
221337267596260, 322267878439734, 349373211752250 @ 5, -46, 40
251358345165730, 324665210972710, 392771385947283 @ 5, -71, -89

235192096408592, 179771957454298, 322420492023248 @ 41, 131, -21
334046048927216, 257480890983496, 145219548293276 @ 41, -30, 9
249153700279648, 171229437056956, 433225569105310 @ 41, 160, -246
225464507562464, 9726858818530, 201076490195036 @ 41, 351, 165

(dx' - dx) (t1 - t2) = x1 - x2.
(DistanceDifference % (RockVelocity-HailVelocity) = 0

DXs to check [
     5,  162, -153,   38, 126,   38,   88,  -73, 138, 111,
   -22,   67,  -61,  -61, -26,   12,  -26,   18, -93, 119,
    41, -114,  131,   14, -40,   10, -106,    6,  13, -93,
    28, -154,   -9,  -43,  -8,   17,  -82,   12, 178,  41,
     5,  -10,   41,  138,  73,   20,   17,   53, 103,  18,
     5,   15,  -55,   23,  21,   28,   99,   44,   5,  36,
  -148,   15,  -39, -192, 106, -111,   65, -103, -26, -93,
   -95,  121,  -39,   10, -87,  101
]

*/

/*
set for dX = 5 
[ -125, -60, -21, -8, -5,  0,   3,   4,  6,  7, 10,  15,  18, 31, 70, 135 ]
dx = 41
[
  -623, -291, -125, -42,  25,
    33,   37,   39,  40,  42,
    43,   45,   49,  57, 124,
   207,  373,  705
]

* */
//Determined DX = -125
//DY = 25
// DZ = 272