const fs = require('node:fs');
var Math = require('mathjs');

var Hailstone = require('./library/Hailstone.js');

mapParseInt = function(x){
    return parseInt(x);
}
try {
    let data = fs.readFileSync('inputs/day24.txt', 'utf8');
  
    let lines = data.split("\n");
    let listHailstones = [];
    lines.forEach(function(line,index){
        let hailstone = Hailstone.parseLine(line,index);
        listHailstones.push(hailstone);
    });
    let rockA = listHailstones.pop();
    let rockB = listHailstones.pop();
    //Determined DX = -125
//DY = 25
// DZ = 272
    let rock_vx = -125;
    let rock_vy = 25;
    let rock_vz = 272;
    let slopeA = (rockA.vy - rock_vy)/(rockA.vx - rock_vx);
    let slopeB = (rockB.vy - rock_vy)/(rockB.vx - rock_vx);
    let constantA = rockA.y - (slopeA*rockA.x);
    let constantB = rockB.y - (slopeA*rockB.x);
    console.log(slopeA,slopeB,constantA,constantB)
    let xpos = parseInt((constantA - constantB) / (slopeA - slopeB));
    let ypos = parseInt((slopeA * xpos) + constantA);
    let time = (xpos - rockA.x) / (rockA.vx - rock_vx);
    let zpos = rockA.z + (rockA.vz-rock_vz) * time;
    console.log(xpos,ypos,zpos);
    console.log(xpos+ypos+zpos);
} catch (err) {
    console.error(err);
}
//part 2 401288647890626 too low