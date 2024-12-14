const fs = require('node:fs');
const sharp = require('sharp');
imageWidth = 101;
imageHeight = 103;
async function processImage(robots, seconds){

    try {
        let sharpData = {
            create: {
                width: imageWidth,
                height: imageHeight,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha:1 }
            }
        }

        const {data, info} =await sharp(sharpData)
            .raw()
            .toBuffer({ resolveWithObject: true });
        const {width, height, channels} = info;
        for (let i = 0; i < robots.length; i++) {
            let robot = robots[i];
            let positionX = (robot.vx * seconds + robot.px) % width;
            if (positionX < 0){
                positionX = width + positionX;
            }
            let positionY = (robot.vy * seconds + robot.py) % height;
            if (positionY < 0){
                positionY = height + positionY;
            }
            
            
            let pixelIndex = (positionY * width + positionX) * channels;
            data[pixelIndex] = 255; // Red
            data[pixelIndex + 1] = 255; // Green
            data[pixelIndex + 2] = 255; // Blue
        }
        let subFolder = (Math.floor(seconds / 1000) * 1000).toString();
        // Save the modified image
        let path = "outputs/" + subFolder;
        if (!fs.existsSync(path)){
            fs.mkdirSync(path,(err)=>{
            });
        }
        
        await sharp(data, {raw: {width, height, channels}})
            .toFile("outputs/" + subFolder + "/" + seconds + '.png');
    } catch (e) {
        console.error(e);
    }
}
try {
    const data = fs.readFileSync('inputs/day14.txt', 'utf8');
    
    let lines = data.split("\r\n")
    const re = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/g;
    let robots = [];
    
    lines.forEach(function(line,index){
        let matchArray = [...line.matchAll(re)];
        let robot = {}
        robot.px = parseInt(matchArray[0][1])
        robot.py = parseInt(matchArray[0][2])
        robot.vx = parseInt(matchArray[0][3])
        robot.vy = parseInt(matchArray[0][4])
        robots.push(robot)
    })
    let start = 2000
    let maxIterations = 8000;
    for (let i =start; i < maxIterations; i++) {
         processImage(robots,i);
       
    }
   
} catch (err) {
    console.error(err);
}
//part 2 7520