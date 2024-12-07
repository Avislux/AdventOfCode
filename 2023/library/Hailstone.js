var Math = require('mathjs');

/**
 * Hailstone
 * @constructor
 * @param {number} x - The x coordinate of the node on the grid.
 * @param {number} y - The y coordinate of the node on the grid.
 * @param {number} z -
 * @param {number} vx
 * @param {number} vy
 * @param {number} vz
 */
function Hailstone(x, y, z,vx,vy,vz,id) {
    this.id = id
    /**
     * The x coordinate of the node on the grid.
     * @type number
     */
    this.x = x;
    /**
     * The y coordinate of the node on the grid.
     * @type number
     */
    this.y = y;
    /**
     * Whether this node can be walked through.
     * @type boolean
     */
    this.z = z;
    this.vx = vx;
    this.vy = vy;
    this.vz= vz;
    this.slope = vy/vx;
    this.offset = y - ((vy/vx) * x); // (the B in y = mx + b
    this.earlistXIntersect = null;
}
Hailstone.parseLine = function(line,id){
    let splitLine = line.split(/\s+@\s+/);
    let position = splitLine[0].split(/\s+/).map(mapParseInt);
    let velocity = splitLine[1].split(/\s+/).map(mapParseInt);
    return new Hailstone(position[0],position[1],position[2],velocity[0],velocity[1],velocity[2],id);
}
Hailstone.checkIntersection = function(hailstone1,hailstone2){
    if (hailstone1.slope === hailstone2.slope){
        return null;
    }
    let xIntersect = (hailstone2.offset - hailstone1.offset) / (hailstone1.slope - hailstone2.slope); // x = (b2 - b1)/ (m1-m2)
    let yIntersect = hailstone1.slope * xIntersect + hailstone1.offset; //just y= mx+b
    return [xIntersect,yIntersect];
    
}
module.exports = Hailstone;
