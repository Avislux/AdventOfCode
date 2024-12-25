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
    function evaluate(){
        for (let i = 0; i < connections.length; i++) {
            let connection = connections[i];
            let result = null;
            let aValue = wires[connection.a];
            let bValue = wires[connection.b];
            if (aValue === undefined) {
                continue;
            }
            if (bValue === undefined) {
                continue;
            }
            switch(connection.op){
                case('AND'):
                    result = aValue & bValue;
                    break;
                case('OR'):
                    result  = aValue | bValue;
                    break;
                case('XOR'):
                    result  = aValue ^ bValue;
                    break;
            }
            wires[connection.out] = result;
        }
    }
   
    for (let i = 0; i < 50; i++) {
        evaluate();
    }
    console.log(wires);
    // wires.sort((a, b) => b.a.localeCompare(a.a));
   
    // console.log(wires);
    let solution = 0;
    let valueX = 0;
    let valueY = 0;
    for ( const key in wires){
        let value = wires[key];
        if (key.charAt(0) === 'z') {
            let bitPosition = parseInt(key.substring(1));
            if ( value === 1){
                solution += Math.pow(2, bitPosition);
            }
            // console.log(key,bitPosition,value)
        }
        if (key.charAt(0) === 'y') {
            let bitPosition = parseInt(key.substring(1));
            if ( value === 1){
                valueY += Math.pow(2, bitPosition);
            }
            // console.log(key,bitPosition,value)
        }
        if (key.charAt(0) === 'x') {
            let bitPosition = parseInt(key.substring(1));
            if ( value === 1){
                valueX += Math.pow(2, bitPosition);
            }
            // console.log(key,bitPosition,value)
        }
    }
    console.log("x",valueX)
    console.log("y",valueY);
    console.log("z",solution);
    console.log("e", valueX+valueY)
} catch (err) {
    console.error(err);
}
// 36035961805936 correct