const fs = require('node:fs');
const util = require('util')

try {
    const data = fs.readFileSync('inputs/day8.txt', 'utf8');
    let dupes = 0;

    let lines = data.split("\r\n")
    let height = lines.length;
    let width = lines[0].length;
    let coords = {};
    let antiNodesCoordsPerFreq = {};
    lines.forEach(function(line,y){
        for (let x = 0; x < width; x++) {
            let char = line.charAt(x);
            if ( char !== "."){
                //char exist in the keys of coords object
                if (!coords.hasOwnProperty(char) ) {
                    coords[char] = [];
                }
                coords[char].push([y,x])
                
            }
        }
    })
    let antiNodes = [];
    let antiNodesPart2 = [];
    for (let frequency in coords) {
        let antennaLocs = coords[frequency];
        antennaLocs.forEach(function(location, index){
            antiNodesPart2.push(location);
            antennaLocs.forEach(function(compareToLocation, compareToIndex){
                if (compareToIndex !== index){
                    // console.log(location,compareToLocation)
                    let xDiff = compareToLocation[1] - location[1];
                    let yDiff = compareToLocation[0] - location[0];
                    let checkLocation = [location[0] - yDiff, location[1] - xDiff ];
                    
                    if (antiNodesCoordsPerFreq.hasOwnProperty(frequency) ) {
                        antiNodesCoordsPerFreq[frequency].push(checkLocation)
                    } else {
                        antiNodesCoordsPerFreq[frequency] = [];
                    }
                    
                    if (checkLocation[0] >= 0 && checkLocation[0] < height && checkLocation[1] >= 0 && checkLocation[1] < width) {
                        antiNodes.push(checkLocation);
                        antiNodesPart2.push(checkLocation);
                        
                        let inRange = true;
                        while (inRange){
                            let harmonicCoord = [checkLocation[0] - yDiff, checkLocation[1] - xDiff ];
                            if (harmonicCoord[0] >= 0 && harmonicCoord[0] < height && harmonicCoord[1] >= 0 && harmonicCoord[1] < width){
                                antiNodesPart2.push(harmonicCoord)
                                checkLocation = harmonicCoord;
                            } else {
                                inRange = false;
                            }
                        }
                        
                    }
                    checkLocation =  [compareToLocation[0] + yDiff,compareToLocation[1]+xDiff]
                    console.log(compareToLocation,yDiff,xDiff,checkLocation);
                    
                    if (checkLocation[0] >= 0 && checkLocation[0] < height && checkLocation[1] >= 0 && checkLocation[1] < width) {
                        antiNodesPart2.push(checkLocation);
                        let inRange = true;
                        while (inRange){
                            let harmonicCoord = [checkLocation[0] + yDiff, checkLocation[1] + xDiff ];
                            if (harmonicCoord[0] >= 0 && harmonicCoord[0] < height && harmonicCoord[1] >= 0 && harmonicCoord[1] < width){
                                antiNodesPart2.push(harmonicCoord)
                                checkLocation = harmonicCoord;
                            } else {
                                inRange = false;
                            }
                        }

                    }
                }
            })
        })
    }
    // console.log(coords);
    const sortFn =
        (a,b)=> {
            let yDiff = a[0] - b[0];
            if ( yDiff === 0) {
                let xDiff = a[1] - b[1];
                if (xDiff === 0){
                    dupes++;
                    // console.log("DUPLOL");
                }
                return xDiff;
            }
            return yDiff
        };
    antiNodes.sort(sortFn)
    const part1Dupes = dupes;
    let part2Dupes= 0;
    dupes = 0;
    antiNodesPart2.sort(sortFn)
    for (let i = 0; i < antiNodesPart2.length-1; i++) {
        if (antiNodesPart2[i][0] === antiNodesPart2[i+1][0] && antiNodesPart2[i][1] === antiNodesPart2[i+1][1]){
            part2Dupes++;
        }
    }
    // console.log(util.inspect(antiNodes, { maxArrayLength: null }))
    // console.log(antiNodesCoordsPerFreq);
   /* antiNodes.forEach(function(coord,index){
        console.log(coord);
    })*/
    console.log("part 2 ",antiNodesPart2.length,part2Dupes);
    let answer = antiNodes.length - part1Dupes;
    console.log("Part 1 " + answer )
    let part2Answer = antiNodesPart2.length - part2Dupes;
    console.log("Part 2 " + part2Answer )
    
} catch (err) {
    console.error(err);
}
//Part 1 159 not correct too low
//Part 1 278 correct
//p2 1036 too low
//p2 1399 too high
//718
// p2 1067 correct