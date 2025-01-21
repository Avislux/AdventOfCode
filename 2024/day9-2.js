const fs = require('node:fs');
//Todo: incomplete
try {
    // const data = fs.readFileSync('inputs/day9.txt', 'utf8');
    const data = "2333133121414131402";
    let disk = [];
    let diskArray = [];
    let id = 0;
    for (let i = 0; i < data.length; i++) {
        let digit = data.charAt(i);
        if (i % 2 === 1){
            diskArray.push({id:'.',size:digit})
            
            while (digit > 0){
                disk.push('.')
                digit--;
            }
        } else {
            diskArray.push({id:id,size:digit})
            
            while (digit > 0){
                disk.push(id)
                digit--;
            }
            
            id++;
        }
    }
    // console.log(diskArray);
    let checksum = 0;
    let currentFileId = null;
    let currentFileSize = 0;
    let spaceIndex = null;
    console.log(disk.join(''));
    for (let i =  disk.length - 1 ; i >= 0 ; i--){
        let digit = disk[i];
        
        if (typeof digit === "number"){
            currentFileId = digit;
            currentFileSize +=1;
        }
        if (currentFileId !== null && digit !== currentFileId){
            console.log("finding space for",currentFileId,'size',currentFileSize)
            //got to a space. break into space finding mode from the start
            let currentSpace = 0;
            
            for (let x = 0 ; x < i ; x++) {
                let forwardLookingDigit = disk[x];
                if (forwardLookingDigit === '.'){
                    if (currentSpace === 0){
                        spaceIndex = x;
                    }
                    currentSpace +=1;
                } 
                if (currentSpace >0 &&  forwardLookingDigit !== currentFileId ) {
                    //got to a file. check if the space is big enough for the file.
                    if (currentSpace >= currentFileSize ){
                        //splice that file into the space
                        let fileToSplice = (new Array(currentFileSize)).fill(currentFileId);
                        disk.splice(spaceIndex,currentFileSize,...fileToSplice);
                        console.log(disk.join(''));
                    }
                }

                if (forwardLookingDigit !== currentFileId) {
                    currentSpace = 0;
                    spaceIndex = null;
                }
            }
        }
        
    }
    for (let i = 0 ; i < disk.length ; i++) {
        checksum += disk[i] * i;
    }
    // console.log(disk.join(""));
    console.log(checksum);

} catch (err) {
    console.error(err);
}
//Part 1 6435922584968