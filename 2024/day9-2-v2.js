const fs = require('node:fs');
//Todo: incomplete
function diskState(array){
    let newDisk = []
    for (let i = 0 ; i < array.length ; i++) {
        let file = array[i];
        // console.log(file);
        let idChar = file.id;
        for (let j = 0; j < file.size; j++) {
            newDisk.push(idChar);
        }
    }
    return newDisk.join('');
}
try {
    const data = fs.readFileSync('inputs/day9.txt', 'utf8');
    // const data = "2333133121414131402";
    let disk = [];
    let diskArray = [];
    let id = 0;
    for (let i = 0; i < data.length; i++) {
        let digit = data.charAt(i);
        if (i % 2 === 1){
            diskArray.push({id:'.',size:parseInt(digit)})
            
            while (digit > 0){
                disk.push('.')
                digit--;
            }
        } else {
            diskArray.push({id:id,size:parseInt(digit)})
            
            while (digit > 0){
                disk.push(id)
                digit--;
            }
            
            id++;
        }
    }
    /*fs.writeFile('outputs/9-clean.json', JSON.stringify(diskArray,null,2), err => {
        if (err) {
            console.error(err);
        } else {
            // file written successfully
        }
    });*/
    // console.log(diskArray);
    let checksum = 0;
    let currentFileId = null;
    let currentFileSize = 0;
    let spaceIndex = null;
    // console.log(disk.join(''));
    let fileIndex = 0;
    for (let i = diskArray.length - 1; i >= 0; i--) {
        // console.log("i is now",i)
        // fs.writeFile('outputs/9/'+i+'.json',  JSON.stringify(diskArray,null,2), { flag: 'a' },err => {
        //     if (err) {
        //         console.error(err);
        //     } 
        // });
        let file = diskArray.at(i);
        if (file.id === '.') {
            continue;
        }
        // console.log("finding space for", file)
        for (let x = 0; x < i; x++) {

            let spaceFile = diskArray[x];
            if (spaceFile.id === '.') {
                if (spaceFile.size >= file.size) {
                    // console.log("found space at",x, spaceFile,spaceFile.size,file.size)
                    let fileId = file.id;
                    if (parseInt(spaceFile.size )=== parseInt(file.size)) {
                        spaceFile.id = fileId;
                            file.id = '.'
                            // console.log(fileId);
                    } else if (spaceFile.size > file.size) {
                        spaceFile.size = parseInt(spaceFile.size - file.size);
                        diskArray.splice(x, 0, {id:fileId,size:parseInt(file.size)});
                            file.id = '.'
                            // console.log(fileId);
                    }
                    let state = diskState(diskArray);
                    fs.writeFile('outputs/9/'+fileIndex +'.json', state, { flag: 'a' },err => {
                        if (err) {
                            console.error(err);
                        }
                    });
                    fileIndex++;
                    break;
                }
            }
        }
    }
    //JSON.stringify(diskArray,null,2)
    // console.log(diskArray);
    // fs.writeFile('outputs/9/9-3.json',  data, { flag: 'a' },err => {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         // file written successfully
    //     }
    // });
    let newDisk = ''
    for (let i = 0 ; i < diskArray.length ; i++) {
        let file = diskArray[i];
        // console.log(file);
        let idChar = file.id.toString();
        newDisk +=  idChar.repeat(file.size);
    }
    // console.log("newdisk",newDisk);
    for (let i = 0 ; i < newDisk.length ; i++) {
        let fileId = newDisk.charAt(i);
        if (fileId !== '.'){
            fileId = parseInt(fileId);
            checksum += fileId * i;
        }
    }
    console.log(checksum);

} catch (err) {
    console.error(err);
}
//Part 1 6435922584968
//part 2 87210923952 too low