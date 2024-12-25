const fs = require('node:fs');
// X = 17956531250595    1054 D4AA A5A3      0001 0000 0101 0100 1101 0100 1010 1010 1010 0101 1010 0011
// Y = 17941991112397    1051 7201 BECD      0001 0000 0101 0001 0111 0010 0000 0001 1011 1110 1100 1101
//EXP= 35898522362992    20A6 46AC 6470      0010 0000 1010 0110 0100 0110 1010 1100 0110 0100 0111 0000
// Z = 36035961805936    20C6 46B3 DC70      0010 0000 1100 0110 0100 0110 1011 0011 1101 1100 0111 0000
//z11 12 13 15 16 17 18 19 20 37 38
try {
    const data = fs.readFileSync('inputs/day24.txt', 'utf8');

    let sections = data.split("\r\n\r\n")
    let wiresInput = sections[0].split("\r\n");
    let connectionsInput = sections[1].split("\r\n");
    let wires = {};
    let connections = [];
    let outputs = {};
    for (let i = 0; i < wiresInput.length; i++) {
        let line = wiresInput[i].split(": ")
        wires[line[0]] = parseInt(line[1]);
    }
    let truthTable = [
        {a:0, b:0, carryIn:0, out:0, carryOut:0},
        {a:0, b:0, carryIn:1, out:1, carryOut:0},
        {a:0, b:1, carryIn:0, out:1, carryOut:0},
        {a:0, b:1, carryIn:1, out:0, carryOut:1},
        {a:1, b:0, carryIn:0, out:1, carryOut:0},
        {a:1, b:0, carryIn:1, out:0, carryOut:1},
        {a:1, b:1, carryIn:0, out:0, carryOut:1},
        {a:1, b:1, carryIn:1, out:1, carryOut:1},
        
    ]
    
    for (let i = 0; i < connectionsInput.length; i++) {
        let line = connectionsInput[i].split(" ")
        let connection = {
            a: line[0],
            b: line[2],
            op: line[1],
            out: line[4],
        }
        connections.push(connection);
    }
    connections.sort((a, b) => b.a.localeCompare(a.a));
    console.log(connections);
    
} catch (err) {
    console.error(err);
}
// 36035961805936 correct

/*
*  x00: 1,
  x01: 1,
  x02: 0,
  x03: 0,
  x04: 0,
  x05: 1,
  x06: 0,
  x07: 1,
  x08: 1,
  x09: 0,
  x10: 1,
  x11: 0,
  x12: 0,
  x13: 1,
  x14: 0,
  x15: 1,
  x16: 0,
  x17: 1,
  x18: 0,
  x19: 1,
  x20: 0,
  x21: 1,
  x22: 0,
  x23: 1,
  x24: 0,
  x25: 0,
  x26: 1,
  x27: 0,
  x28: 1,
  x29: 0,
  x30: 1,
  x31: 1,
  x32: 0,
  x33: 0,
  x34: 1,
  x35: 0,
  x36: 1,
  x37: 0,
  x38: 1,
  x39: 0,
  x40: 0,
  x41: 0,
  x42: 0,
  x43: 0,
  x44: 1,
  y00: 1,
  y01: 0,
  y02: 1,
  y03: 1,
  y04: 0,
  y05: 0,
  y06: 1,
  y07: 1,
  y08: 0,
  y09: 1,
  y10: 1,
  y11: 1,
  y12: 1,
  y13: 1,
  y14: 0,
  y15: 1,
  y16: 1,
  y17: 0,
  y18: 0,
  y19: 0,
  y20: 0,
  y21: 0,
  y22: 0,
  y23: 0,
  y24: 0,
  y25: 1,
  y26: 0,
  y27: 0,
  y28: 1,
  y29: 1,
  y30: 1,
  y31: 0,
  y32: 1,
  y33: 0,
  y34: 0,
  y35: 0,
  y36: 1,
  y37: 0,
  y38: 1,
  y39: 0,
  y40: 0,
  y41: 0,
  y42: 0,
  y43: 0,
  y44: 1,
*/