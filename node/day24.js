const fs = require('node:fs');
var Math = require('mathjs');

var Hailstone = require('./library/Hailstone.js');

mapParseInt = function(x){
    return parseInt(x);
}
try {
    // let data = fs.readFileSync('inputs/day24_example.txt', 'utf8');
    // let testArea = [7,27];
    let data = fs.readFileSync('inputs/day24.txt', 'utf8');
    let testArea = [200000000000000,400000000000000];
    let lines = data.split("\r\n");
    let allIntersections = 0;
    let filteredIntersections = 0;
    let listHailstones = [];
    lines.forEach(function(line,index){
        let hailstone = Hailstone.parseLine(line,index);
        listHailstones.push(hailstone);
        
    });
    let crossingHailstones = Array.from(listHailstones); //clone array
    listHailstones.forEach(function(hailstone){
        crossingHailstones.forEach(function(crossingHailstone,index2){
            let intersectionPoint = Hailstone.checkIntersection(hailstone, crossingHailstone);
            if (intersectionPoint != null){
                let xIntersect = intersectionPoint[0];
                if (hailstone.earlistXIntersect == null){
                    hailstone.earlistXIntersect = xIntersect;
                }
                if (crossingHailstone.earlistXIntersect == null ){
                    crossingHailstone.earlistXIntersect = xIntersect;
                }
                if (intersectionPoint[0] >= testArea[0] && intersectionPoint[0] <= testArea[1] &&
                    intersectionPoint[1] >= testArea[0] && intersectionPoint[1] <= testArea[1]){
                    allIntersections++;
                    
                    //Count intersections with respect to time. Meaning the intersect only makes sense if the x position is greater than initial for positive vx
                    // or x position is less for negative vx.
                    if ( (xIntersect > hailstone.x && hailstone.vx > 0 || xIntersect < hailstone.x && hailstone.vx < 0) &&
                         ( xIntersect > crossingHailstone.x && crossingHailstone.vx > 0 || xIntersect < crossingHailstone.x && crossingHailstone.vx < 0)
                    ){
                        filteredIntersections++;
                    }
                    
                }
            }
        })
        crossingHailstones.shift();
        
    })
    
    
    console.log ("Intersections ", allIntersections)
    // console.log("Flagged ids", flaggedIDs);
    console.log("Solution", filteredIntersections)
} catch (err) {
    console.error(err);
}
//part 1 34468 too high
//part 1 9112 too low,
//part 1 27328 correct