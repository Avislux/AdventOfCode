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
    /*Fixing an axis, if you have two stones x1, x2 travelling with identical speeds dx, and you hit the stones at times t1, t2, then the speed dx' of our throw have to satisfy (dx' - dx) (t1 - t2) = x1 - x2.
    * */
    let vxArray = [];
    let dupeVXArray = [];
    let dupeVXCount = {};
    let vyArray = [];
    let dupeVYArray = [];
    let dupeVYCount = {};
    let vzArray = [];
    let dupeVZArray = [];
    let dupeVZCount = {};
    listHailstones.forEach(function(stone,index){
        if (!vxArray.includes(stone.vx)){
            vxArray.push(stone.vx);
        } else {
            dupeVXArray.push(stone.vx);
            dupeVXCount[stone.vx] = dupeVXCount[stone.vx] + 1 || 1;
        }
        
        if (!vyArray.includes(stone.vy)){
            vyArray.push(stone.vy);
        } else {
            dupeVYArray.push(stone.vy);
            dupeVYCount[stone.vy] = dupeVYCount[stone.vy] + 1 || 1;
        }

        if (!vzArray.includes(stone.vz)){
            vzArray.push(stone.vz);
        } else {
            dupeVZArray.push(stone.vz);
            dupeVZCount[stone.vz] = dupeVZCount[stone.vz] + 1 || 1;
        }
    });
    console.log("dupeVXArray", dupeVXArray)
    console.log("dupeVXCount", dupeVXCount)
    console.log("dupeVYArray", dupeVYArray)
    console.log("dupeVYCount", dupeVYCount)
    console.log("dupeVZArray", dupeVZArray)
    console.log("dupeVZCount", dupeVZCount)
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

/*
242632083944780, 325377174991042, 369509461030046 @ 5, -64, -31
277670947497460, 176140935580014, 370791351808746 @ 5, 164, -182
247902039565320, 286744641696110, 356448085275486 @ 5, -19, -30 
221337267596260, 322267878439734, 349373211752250 @ 5, -46, 40
251358345165730, 324665210972710, 392771385947283 @ 5, -71, -89
(dx' - dx) (t1 - t2) = x1 - x2.
(DistanceDifference % (RockVelocity-HailVelocity) = 0
*/