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
    // console.log(connections);
    let maxBits = 45
    let adders = [];
    let carry = '';
    for (let i = 0; i < maxBits; i++) {
        let wireName = '';
        let stringNumber = i.toString();;
        if (i.toString().length === 1){
            stringNumber = "0" + i.toString();
        } 
        wireName = "x" + stringNumber;
        let filteredConnections = connections.filter((c) => { return c.a === wireName || c.b === wireName});
        let xor1 = filteredConnections.filter((c) => { return c.op === 'XOR'})[0];
        let and1 = filteredConnections.filter((c) => { return c.op === 'AND'})[0];
        let xor1Out = xor1.out;
        let xor1OutConnections = connections.filter((c) => { return c.a === xor1Out || c.b === xor1Out});
        let and1Out = and1.out;
        let and1OutConnections = connections.filter((c) => { return c.a === and1Out || c.b === and1Out});
        
        // console.log(and1OutConnections);
        if (i > 0 && xor1OutConnections.length !== 2 ) {
            console.log("xor1",i,xor1Out, "is not connected properly" , xor1OutConnections)
        }
        if (i > 0 && and1OutConnections.length !== 1 ) {
            console.log("and1",i,and1Out, "is not connected properly" , and1OutConnections)
        }
        if (carry.length > 0) {
            let carryConnections = connections.filter((c) => { return c.a === carry || c.b === carry});
            // console.log("carry in for bit" ,i , "carry" , carryXORConnections);
            if (carryConnections.length !== 2){
                console.log("carry",i,carry, "is not connected properly" , carryConnections)
            } else {
                let carryXOR = carryConnections.filter((c) => { return c.op === 'XOR'})[0];
                let carryAND = carryConnections.filter((c) => { return c.op === 'AND'})[0];
                if (carryXOR.length === 0) {
                    console.log("carryXOR",i,carry, "is not connected properly" )
                } else {
                    let expectedOutWire = "z" + stringNumber;
                    if (expectedOutWire !== carryXOR.out ){
                        console.log("carryXOR",i,carry, "has the wrong output", carryXOR,"expected", expectedOutWire, "got", carryXOR.out )
                    }
                    if (carryXOR.a === carry) {
                        if (carryXOR.b !== xor1Out) {
                            console.log("carryXOR",i,carry, "has the wrong b input", carryXOR, "expected", xor1Out, "got",  carryXOR.b )
                        }
                    }
                    if (carryXOR.b === carry) {
                        if (carryXOR.a !== xor1Out) {
                            console.log("carryXOR",i,carry, "has the wrong a input", carryXOR, "expected", xor1Out, "got",  carryXOR.a )
                        }
                    }
                }
                if (carryAND.length === 0) {
                    console.log("carryAND",i,carry, "is not connected properly" )
                } else {
                    if (carryAND.a === carry) {
                        if (carryAND.b !== xor1Out) {
                            console.log("carryAND",i,carry, "has the wrong b input", carryAND, "expected", xor1Out, "got",  carryAND.b )
                        }
                    }
                    if (carryAND.b === carry) {
                        if (carryAND.a !== xor1Out) {
                            console.log("carryAND",i,carry, "has the wrong a input", carryAND, "expected", xor1Out, "got",  carryAND.a )
                        }
                    }
                }
            }
        }
        if (and1OutConnections.length === 1){
            let connection = and1OutConnections[0];
            if (connection.op !== 'OR'){
                console.log(i,connection, "is a problem" )
            }
            let carryOut = connection.out;
            carry = connection.out;
            let carryOutConnections = connections.filter((c) => {return c.a === carryOut || c.b === carryOut});
            // console.log(carryOutConnections);
            if (carryOutConnections.length !== 2 && i < 44){
                console.log("carry",i,carryOut, "is not connected properly" , carryOutConnections)
                
            }
        }
    }
} catch (err) {
    console.error(err);
}
// 36035961805936 correct
//part 2 jqf,mdd,skh,wpd,wts,z11,z19,z37
/* pairs seem to be
* z11 wpd
z19 mdd
z37 wts
skh jqf*/
//all of the z wires have to be the outputs of XOR gates. rest of the wires are found from validating and inspecting.