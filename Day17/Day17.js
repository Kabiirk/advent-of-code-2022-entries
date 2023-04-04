const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

console.log(input);


/*
The 5 Rocks

####

------

.#.
###
.#.

------

..#
..#
###

------

#
#
#
#

------

##
##
 */

// The Rock
class Dwayne{
    constructor(height, width, shape){
        this.height = height;
        this.width = width;
        this.shape = shape;
    }
    toString(){
        return this.shape
    }
}

var test = new Dwayne(1, 4, '####');
console.log(test);