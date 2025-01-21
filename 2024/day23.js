const fs = require('node:fs');

try {
    const data = fs.readFileSync('inputs/day23.txt', 'utf8');

    let lines = data.split("\r\n")
    let groups = [];
    for (let line of lines) {
        let comps = line.split("-");
        let isGroupFound = false;
        for (let i =0; i < groups.length; i++) {
            let group = groups[i];
            if (group.includes(comps[0])){
                group.push(comps[1])
                isGroupFound = true;
            } else if (group.includes(comps[1])){
                group.push(comps[0])
                isGroupFound = true;
                
            }
        }
        if (!isGroupFound){
            groups.push([comps[0], comps[1]]);
            
        }
    }
    console.log(groups);
} catch (err) {
    console.error(err);
}
