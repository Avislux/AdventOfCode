const fs = require('node:fs');
function arraysEqual(arr1, arr2) {
    // Check if the lengths are different
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Check each element for equality
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
try {
    const data = fs.readFileSync('inputs/day4.txt', 'utf8');
    let rows = data.split("\r\n")
    var grid = [];
    const re = /XMAS/g; //222
    const re2 = /SAMX/g //213
    let totalMatches = 0;
    let xmasVertMatches = 0;
    let xmasDownRightMatches = 0;
    let xmasDownLeftMatches = 0;
    let samxVertMatches = 0;
    let samxDownRightMatches = 0;
    let samxDownLeftMatches = 0;
    let xmasMatches = 0;
    let samxMatches = 0;
    let horMatches = 0; //435
    let crossMas = 0;
    
    for (let y = 0; y < rows.length; y++) {
        //Horizontal checks
        let row = rows[y];
        const array = [...row.matchAll(re)];
        const array2 = [...row.matchAll(re2)];
        let numberMatchesInRow = array.length + array2.length;
        xmasMatches += array.length;
        samxMatches += array2.length;

        horMatches += numberMatchesInRow;
        totalMatches += numberMatchesInRow;
        // console.log(totalMatches);

        for (let x = 0; x < row.length; x++) {
            if (row[x] === 'X') {
                //vertical case
                //
                if (y < rows.length - 3 && rows[y + 1][x] === "M" && rows[y + 2][x] === "A" && rows[y + 3][x] === "S") {
                    totalMatches++;
                    xmasVertMatches++; //229
                }
                //diag down right
                //
                if (y < rows.length - 3 && x <= row.length - 3 && rows[y + 1][x + 1] === "M" && rows[y + 2][x + 2] === "A" && rows[y + 3][x + 3] === "S") {
                    totalMatches++;
                    xmasDownRightMatches++; //371
                }

                //down left
                //
                if (y < rows.length - 3 && x > 2 && rows[y + 1][x - 1] === "M" && rows[y + 2][x - 2] === "A" && rows[y + 3][x - 3] === "S") {
                    totalMatches++;
                    xmasDownLeftMatches++; //371
                }

                //up left
                //
                if (y > 2 && x > 2 && rows[y - 1][x - 1] === "M" && rows[y - 2][x - 2] === "A" && rows[y - 3][x - 3] === "S") {
                    totalMatches++;
                    samxDownRightMatches++; //431
                }
                //up right
                //
                if (y > 2 && x <= row.length - 3 && rows[y - 1][x + 1] === "M" && rows[y - 2][x + 2] === "A" && rows[y - 3][x + 3] === "S") {
                    totalMatches++;
                    samxDownLeftMatches++; //409
                }
                //
                if (y > 2 && rows[y - 1][x] === "M" && rows[y - 2][x] === "A" && rows[y - 3][x] === "S") {
                    totalMatches++;
                    samxVertMatches++; //215
                }

            } else if ( (row[x] === 'A') ) {
                try {
                    let check1 = [ rows[y - 1][x - 1], rows[y + 1][x + 1] ];
                    let check2 = [ rows[y + 1][x - 1], rows[y - 1][x + 1] ];
                    check1.sort( );
                    check2.sort( );
                    if (arraysEqual(check1, ["M","S"]) && arraysEqual(check2, ["M","S"] ) ) {
                        crossMas++;
                    }
                } catch (e){
                    
                }
            }
        }

        // 

    }
    console.log(xmasMatches, samxMatches, xmasVertMatches, xmasDownRightMatches, xmasDownLeftMatches, samxVertMatches, samxDownRightMatches, samxDownLeftMatches);
    console.log(horMatches);
    console.log(totalMatches);
    console.log("Part2 " + crossMas);
    //1830 too low
    //2461 too low
    //2468 correct
    //part 2 432 too low
    //part 2 1864

} catch (err) {
    console.error(err);
}
//1830 too low
/*else if (row[y] === 'S') {
                //vertical case
                if (y < rows.length - 3 && rows[y + 1][x] === "A" && rows[y + 2][x] === "M" &&  rows[y + 3][x] === "X") {
                    totalMatches++;
                    samxVertMatches++; //125
                }
                //down right
                if (y < rows.length - 3 && x <= row.length - 3 && rows[y + 1][x + 1] === "A" && rows[y + 2][x + 2] === "M" &&  rows[y + 3][x + 3] === "X") {
                    totalMatches++;
                    samxDownRightMatches++; //156
                }
                //down left
                if (y < rows.length - 3 && x > 2 && rows[y + 1][x - 1] === "A" && rows[y + 2][x - 2] === "M" &&  rows[y + 3][x - 3] === "X") {
                    totalMatches++;
                    samxDownLeftMatches++; //143
                }
            }*/