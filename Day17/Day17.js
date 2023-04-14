const fs = require('fs');
const path = require('path');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('')

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

// Alt approach

var dwayne = [
    [
        ['#','#','#','#']
    ],
    [
        ['.','#','.'],
        ['#','#','#'],
        ['.','#','.']
    ],
    [
        ['.','.','#'],
        ['.','.','#'],
        ['#','#','#']
    ],
    [
        ['#'],
        ['#'],
        ['#'],
        ['#']
    ],
    [
        ['#','#'],
        ['#','#']
    ]
]

function collision(block, blockx, blocky){
    return block.some( (r, y) => {
            return r.some( (state, x) => {
                    return state == "#" && chamber[blocky+y][blockx+x] == "#"
                }
            )
        }
    )
}

let chamber = [["#", "#", "#", "#", "#", "#", "#", "#", "#"]]
let segment = ["#", ".", ".", ".", ".", ".", ".", ".", "#"]
let steps = 1000000000000;
let numBlocks = bloks.length
let numjets = input.length
let topIndex = 1
let jetIndex = 0

console.log(dwayne);
